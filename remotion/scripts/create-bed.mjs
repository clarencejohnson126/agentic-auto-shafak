import {mkdir, writeFile} from "node:fs/promises";
import {dirname, resolve} from "node:path";

const sampleRate = 44100;
const seconds = 60;
const channels = 1;
const bitsPerSample = 16;
const totalSamples = sampleRate * seconds;
const dataSize = totalSamples * channels * (bitsPerSample / 8);
const buffer = Buffer.alloc(44 + dataSize);

function writeString(offset, value) {
  buffer.write(value, offset, value.length, "ascii");
}

writeString(0, "RIFF");
buffer.writeUInt32LE(36 + dataSize, 4);
writeString(8, "WAVE");
writeString(12, "fmt ");
buffer.writeUInt32LE(16, 16);
buffer.writeUInt16LE(1, 20);
buffer.writeUInt16LE(channels, 22);
buffer.writeUInt32LE(sampleRate, 24);
buffer.writeUInt32LE(sampleRate * channels * (bitsPerSample / 8), 28);
buffer.writeUInt16LE(channels * (bitsPerSample / 8), 32);
buffer.writeUInt16LE(bitsPerSample, 34);
writeString(36, "data");
buffer.writeUInt32LE(dataSize, 40);

for (let i = 0; i < totalSamples; i += 1) {
  const t = i / sampleRate;
  const fadeIn = Math.min(1, t / 2.5);
  const fadeOut = Math.min(1, (seconds - t) / 3);
  const envelope = Math.max(0, Math.min(fadeIn, fadeOut));
  const low = Math.sin(2 * Math.PI * 82 * t) * 0.18;
  const mid = Math.sin(2 * Math.PI * 164 * t + 0.6) * 0.05;
  const pulse = Math.sin(2 * Math.PI * 0.18 * t) * 0.04;
  const sample = (low + mid + pulse) * envelope * 0.32;
  buffer.writeInt16LE(Math.max(-1, Math.min(1, sample)) * 32767, 44 + i * 2);
}

const outputPath = resolve("public/audio/bed.wav");
await mkdir(dirname(outputPath), {recursive: true});
await writeFile(outputPath, buffer);
console.log(`Wrote ${outputPath}`);
