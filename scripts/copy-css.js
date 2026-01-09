import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const srcDir = path.join(__dirname, '..', 'components');
const distDir = path.join(__dirname, '..', 'dist', 'components');

if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

const files = fs.readdirSync(srcDir);
files.forEach((file) => {
  if (file.endsWith('.css')) {
    const src = path.join(srcDir, file);
    const dest = path.join(distDir, file);
    fs.copyFileSync(src, dest);
    console.log(`Copied ${file} to dist/components/`);
  }
});
