const fs = require('fs');
const path = require('path');

async function ensureDir(dir) {
  try {
    await fs.promises.mkdir(dir, { recursive: true });
  } catch (e) {
    // ignore
  }
}

async function copyImages() {
  const srcDir = path.join(__dirname, '..', 'src', 'assets', 'images');
  const outDir = path.join(__dirname, '..', 'public', 'images');
  await ensureDir(outDir);
  let files = [];
  try {
    files = await fs.promises.readdir(srcDir);
  } catch (e) {
    return;
  }
  const exts = ['.jpg', '.jpeg', '.png', '.webp', '.svg'];
  await Promise.all(
    files
      .filter(f => exts.includes(path.extname(f).toLowerCase()))
      .map(async f => {
        const src = path.join(srcDir, f);
        const dest = path.join(outDir, f);
        try {
          await fs.promises.copyFile(src, dest);
        } catch (e) {
          // ignore individual copy errors
        }
      })
  );
}

copyImages();
