import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import path from 'node:path';

test('build is a standalone static site with relative entry points and bundled images', () => {
  const html = readFileSync('dist/index.html', 'utf8');
  assert.ok(html.includes('id="root"'));
  assert.ok(!existsSync('dist/server'));
  const links = [...html.matchAll(/(?:src|href)="(\.\/assets\/[^"]+)"/g)].map(match => match[1]);
  assert.ok(links.length >= 2);
  for (const link of links) assert.ok(existsSync(path.join('dist', link)));
  const source = readFileSync('src/App.tsx', 'utf8');
  assert.doesNotMatch(source, /fetch\(|\/api\/inquiries|href="\/inquiries"|safely received|saved your enquiry/);
  const images = JSON.parse(readFileSync('src/lib/site-images.json', 'utf8'));
  for (const data of Object.values(images)) {
    assert.match(data, /^data:image\/(png|jpeg);base64,/);
    assert.ok(Buffer.from(data.split(',')[1], 'base64').length > 100);
  }
  const css = readdirSync('dist/assets').filter(file => file.endsWith('.css')).map(file => readFileSync(path.join('dist/assets', file), 'utf8')).join('\n');
  assert.match(css, /rotate\(1\.9deg\)/);
  assert.match(css, /rotate\(-2\.8deg\)/);
  const packageJson = JSON.parse(readFileSync('package.json', 'utf8'));
  for (const name of ['next', 'vinext', 'wrangler', 'drizzle-orm', '@cloudflare/vite-plugin']) {
    assert.ok(!packageJson.dependencies?.[name] && !packageJson.devDependencies?.[name]);
  }
});
