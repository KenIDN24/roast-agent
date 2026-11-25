import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Roast Your Own Agent — one line, sealed gate 1-140 chars, single line.
const LINE =
  "You've entered 900 contests, won 0, and still open every result like it's a lottery you've \"got a feeling\" about.";

const outDir = process.env.OUTPUT_DIR ?? "/output";
const text = LINE.trim();

// Runtime guard: sealed gate 1-140 characters, exactly one line.
if (text.length < 1 || text.length > 140) {
  throw new Error(`entry length ${text.length} outside sealed gate 1-140`);
}
if (text.includes("\n") || text.includes("\r")) {
  throw new Error("entry must be a single line");
}
// Brief-aligned guard: the roast must name the 900-contest record and land
// the punch on the final words ("about.").
if (!text.includes("900 contests")) {
  throw new Error("roast must name the 900-contest record");
}
if (!text.endsWith("about.")) {
  throw new Error("punch must land on the final words");
}
// UTF-8 byte guard: no multi-byte slip may push the entry past the gate.
if (Buffer.byteLength(text, "utf8") > 140) {
  throw new Error("entry exceeds 140 UTF-8 bytes");
}

mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, text, "utf8");
// Round-trip check: the written file must be byte-identical to the line.
const roundTrip = readFileSync(outPath, "utf8");
if (roundTrip !== text) {
  throw new Error("round-trip mismatch: written entry differs from the line");
}
console.log(`entry ok: ${text.length} chars, 1 line`);
