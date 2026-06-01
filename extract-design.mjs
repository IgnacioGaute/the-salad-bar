import { readFileSync, writeFileSync } from 'fs';
import { gunzipSync } from 'zlib';

const binPath = String.raw`C:\Users\nachi\.claude\projects\c--Users-nachi-Projects-salad-bar-website\fbffd49f-307a-4f82-b963-ef47929dbc5b\tool-results\webfetch-1779743567031-ddt9fv.bin`;
const buf = readFileSync(binPath);
const data = gunzipSync(buf);

let offset = 0;
const files = [];
while (offset < data.length - 512) {
  const header = data.slice(offset, offset + 512);
  const name = header.slice(0, 100).toString('utf8').replace(/\x00/g, '').trim();
  if (!name) { offset += 512; continue; }
  const sizeOctal = header.slice(124, 136).toString('utf8').replace(/\x00/g, '').trim();
  const size = parseInt(sizeOctal, 8) || 0;
  offset += 512;
  if (size > 0 && name.match(/\.(tsx|css|md|ts|json)$/)) {
    const content = data.slice(offset, offset + size).toString('utf8');
    files.push({ name, content });
  }
  offset += Math.ceil(size / 512) * 512;
}

// Write all to a single readable file
const out = files.map(f => `\n${'='.repeat(60)}\n FILE: ${f.name}\n${'='.repeat(60)}\n${f.content}`).join('\n');
writeFileSync('design-extracted.txt', out);
console.log('Files extracted:', files.map(f => f.name).join('\n'));
