// Downloads every tech logo into public/tech/ so the site is fully self-hosted.
// Run once with internet:  npm run logos
import { mkdir, writeFile } from 'node:fs/promises';
import { GROUPS, fileName } from '../src/techData.js';

await mkdir(new URL('../public/tech/', import.meta.url), { recursive: true });
let ok = 0;
const missed = [];
for (const g of GROUPS) {
  for (const t of g.tech) {
    let saved = false;
    for (const url of t.s) {
      try {
        const res = await fetch(url);
        if (!res.ok) continue;
        const body = await res.text();
        if (!body.includes('<svg')) continue;
        await writeFile(new URL(`../public/tech/${fileName(t.n)}.svg`, import.meta.url), body);
        saved = true; ok += 1;
        console.log('✓', t.n);
        break;
      } catch { /* try next source */ }
    }
    if (!saved) { missed.push(t.n); console.log('✗', t.n); }
  }
}
console.log(`\n${ok} logos saved to public/tech/` + (missed.length ? `  ·  missing: ${missed.join(', ')} (letter badge is shown for these)` : ''));
