// Copies Banknote / includedInCollection from country-by-collection.json into the
// data embedded in index.html, so the page shows them even when opened as a local file.
// Run: node sync-collection.js
const fs = require("fs");
const path = require("path");
const dir = __dirname;
const htmlPath = path.join(dir, "index.html");
const coll = JSON.parse(fs.readFileSync(path.join(dir, "country-by-collection.json"), "utf8"));
const byName = new Map(coll.map(c => [c.country, c]));
const re = /(<script id="data" type="application\/json">)([\s\S]*?)(<\/script>)/;
const html = fs.readFileSync(htmlPath, "utf8");
const data = JSON.parse(html.match(re)[2]);
let updated = 0;
for (const r of data) {
  const c = byName.get(r.name);
  if (!c) continue;
  r.Banknote = String(c.Banknote ?? "0");
  r.includedInCollection = c.includedInCollection === true;
  updated++;
}
const unknown = coll.filter(c => !data.some(r => r.name === c.country)).map(c => c.country);
fs.writeFileSync(htmlPath, html.replace(re, (_, a, __, c) => a + JSON.stringify(data) + c));
console.log(`Synced ${updated} countries into index.html.`);
if (unknown.length) console.log("Not found in index.html:", unknown.join(", "));
