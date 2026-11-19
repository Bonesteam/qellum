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
  const templatesDir = path.join(__dirname, '..', 'public', 'templates');
  await ensureDir(templatesDir);
  const templateCopies = [
    ['meal-plan-weight-loss.jpg', 'weight-loss.jpg'],
    ['meal-plan-weight-loss.jpg', 'weight-loss.png'],
    ['meal-plan-muscle-gain.jpg', 'muscle-gain.jpg'],
    ['meal-plan-muscle-gain.jpg', 'muscle-gain.png'],
    ['meal-plan-keto.jpg', 'keto-diet.jpg'],
    ['meal-plan-keto.jpg', 'keto-diet.png'],
    ['meal-plan-weight-loss.jpg', 'classic.png'],
    ['meal-plan-muscle-gain.jpg', 'modern.png'],
    ['meal-plan-keto.jpg', 'creative.png'],
  ];
  for (const [srcFile, dstFile] of templateCopies) {
    const srcPath = path.join(srcDir, srcFile);
    if (fs.existsSync(srcPath)) {
      try {
        await fs.promises.copyFile(srcPath, path.join(templatesDir, dstFile));
      } catch (e) {}
    }
  }
}

copyImages();
