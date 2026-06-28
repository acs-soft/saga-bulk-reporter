// Print width×height of PNG files from their IHDR chunk.
const fs = require('fs');
for (const f of process.argv.slice(2)) {
  try {
    const b = fs.readFileSync(f);
    const w = b.readUInt32BE(16), h = b.readUInt32BE(20);
    console.log(`${w}x${h}\t${(b.length/1024).toFixed(0)}KB\t${f}`);
  } catch (e) { console.log(`ERR\t${f}\t${e.message}`); }
}
