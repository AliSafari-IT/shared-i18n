import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, '..', 'dist');
const compDistDir = path.join(distDir, 'components');

if (!fs.existsSync(compDistDir)) {
  fs.mkdirSync(compDistDir, { recursive: true });
}

// Copy component CSS files (LanguageSwitcher.module.css etc.)
const srcDir = path.join(__dirname, '..', 'components');
const files = fs.readdirSync(srcDir);
files.forEach((file) => {
  if (file.endsWith('.css')) {
    const src = path.join(srcDir, file);
    const dest = path.join(compDistDir, file);
    fs.copyFileSync(src, dest);
    console.log(`Copied ${file} to dist/components/`);
  }
});

// Copy country-language-selector stylesheet to dist root so consumers can do:
//   import '@asafarim/shared-i18n/country-language-selector.css'
const clsSrc = path.join(__dirname, '..', 'node_modules', '@asafarim', 'country-language-selector', 'dist', 'styles.css');
const clsDest = path.join(distDir, 'country-language-selector.css');
if (fs.existsSync(clsSrc)) {
  fs.copyFileSync(clsSrc, clsDest);
  console.log('Copied country-language-selector/styles.css to dist/country-language-selector.css');
} else {
  console.warn('WARNING: country-language-selector CSS not found at', clsSrc);
}
