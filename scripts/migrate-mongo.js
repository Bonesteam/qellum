#!/usr/bin/env node
const { MongoClient } = require('mongodb');
const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: path.resolve(process.cwd(), '.env') });

const argv = require('minimist')(process.argv.slice(2));

const SOURCE_URI = argv.source || process.env.SOURCE_URI || process.env.MONGODB_URI_SOURCE || process.env.MONGODB_URI;
const TARGET_URI = argv.target || process.env.TARGET_URI || process.env.MONGODB_URI_TARGET || process.env.TARGET_MONGODB_URI;
const DB_NAME = argv.db || process.env.TARGET_DB || process.env.MONGODB_DB || argv.database;
const DRY = argv['dry-run'] || argv.dry || false;
const TRANSFORMS_PATH = argv.transforms || path.resolve(process.cwd(), 'scripts', 'migration-transforms.js');

if (!SOURCE_URI || !TARGET_URI) {
  console.error('Provide source and target URIs via --source / --target or env vars.');
  process.exit(1);
}

let transforms = {};
if (fs.existsSync(TRANSFORMS_PATH)) {
  transforms = require(TRANSFORMS_PATH);
  console.log('Loaded transforms from', TRANSFORMS_PATH);
} else {
  console.log('No transforms file found, using identity transforms.');
}

async function migrate() {
  const sourceClient = new MongoClient(SOURCE_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  const targetClient = new MongoClient(TARGET_URI, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await sourceClient.connect();
    await targetClient.connect();

    const sourceDb = sourceClient.db(argv.db || undefined);
    const targetDb = targetClient.db(DB_NAME || sourceDb.databaseName);

    console.log('Source DB:', sourceDb.databaseName, 'Target DB:', targetDb.databaseName);

    const collections = await sourceDb.listCollections().toArray();

    for (const collInfo of collections) {
      const name = collInfo.name;
      console.log('\n=== Migrating collection:', name, '===');

      const sourceColl = sourceDb.collection(name);
      const targetColl = targetDb.collection(name);

      // create collection if missing
      const exists = await targetDb.listCollections({ name }).hasNext();
      if (!exists) {
        if (!DRY) await targetDb.createCollection(name);
        console.log('Created collection', name);
      }

      // copy indexes (skip _id_)
      try {
        const indexes = await sourceColl.indexes();
        const idxsToCreate = indexes.filter(i => i.name !== '_id_').map(i => {
          const { key, name, unique } = i;
          const spec = { key, name };
          if (unique) spec.unique = true;
          return spec;
        });
        if (idxsToCreate.length) {
          if (!DRY) await targetColl.createIndexes(idxsToCreate);
          console.log('Copied indexes:', idxsToCreate.map(i => i.name).join(', '));
        }
      } catch (err) {
        console.warn('Indexes copy failed for', name, err.message);
      }

      // stream documents and insert in batches
      const cursor = sourceColl.find({}, { batchSize: 1000 });
      const batchSize = 1000;
      let buffer = [];
      let count = 0;

      while (await cursor.hasNext()) {
        let doc = await cursor.next();
        // apply collection-specific and global transforms if provided
        try {
          if (transforms) {
            if (typeof transforms[name] === 'function') doc = transforms[name](doc);
            if (typeof transforms['*'] === 'function') doc = transforms['*'](doc);
          }
        } catch (e) { console.warn('Transform error for', name, e.message); }
        buffer.push(doc);
        if (buffer.length >= batchSize) {
          if (!DRY) await targetColl.insertMany(buffer, { ordered: false }).catch(e => console.warn('Insert many partial failure', e.message));
          count += buffer.length;
          console.log('Inserted', count, 'into', name);
          buffer = [];
        }
      }
      if (buffer.length) {
        if (!DRY) await targetColl.insertMany(buffer, { ordered: false }).catch(e => console.warn('Insert many partial failure', e.message));
        count += buffer.length;
        console.log('Inserted', count, 'into', name);
      }

      console.log('Finished collection', name, '- total migrated:', count);
    }

    console.log('\nMigration complete.');
    if (DRY) console.log('Dry run was used; no documents were written.');

  } finally {
    await sourceClient.close();
    await targetClient.close();
  }
}

migrate().catch(err => {
  console.error('Migration failed:', err);
  process.exit(1);
});
