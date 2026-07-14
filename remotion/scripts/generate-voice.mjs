import {mkdir, writeFile} from "node:fs/promises";
import {dirname, resolve} from "node:path";

const voiceoverText = `Agentic Automotive. Ausgangspunkt: Autoland spricht über Digitalisierung, Kundendaten und Agentic Commerce.
Der Schatz liegt nicht im nächsten Chatbot, sondern in Prozessen, die wirklich Geld oder Zeit bewegen.
Ein Chatbot erklärt. Ein Agent erledigt.
Er erkennt einen Vorgang, nutzt erlaubte Daten, fragt nach, holt Freigaben ein und bringt den Prozess zum nächsten Schritt.
Für freie Werkstätten muss die Oberfläche einfach sein: WhatsApp, Foto, Dokument, Sprachnachricht.
Daraus entstehen vier Hypothesen: Mängel werden zu Aufträgen. Teile werden richtig bestellt. Bestandskunden kommen rechtzeitig zurück. Privatkunden kaufen Gebrauchtwagen besser vorbereitet.
Wichtig bleibt: menschliche Freigabe, Datenschutz, kein unnötiges neues System.
Shafaq, welche Idee überlebt die Werkstattrealität?`;

async function readStdin() {
  if (process.stdin.isTTY) {
    return "";
  }

  let input = "";
  for await (const chunk of process.stdin) {
    input += chunk;
  }
  return input.trim();
}

const apiKey = (process.env.ELEVENLABS_API_KEY || (await readStdin())).trim();

if (!apiKey) {
  throw new Error("Missing ELEVENLABS_API_KEY. Provide it via env var or stdin.");
}

const voiceId = process.env.ELEVENLABS_VOICE_ID || "JBFqnCBsd6RMkjVDRZzb";
const outputPath = resolve("public/audio/voiceover.mp3");
const endpoint = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}?output_format=mp3_44100_128`;

const response = await fetch(endpoint, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "xi-api-key": apiKey,
  },
  body: JSON.stringify({
    text: voiceoverText,
    model_id: "eleven_multilingual_v2",
    voice_settings: {
      stability: 0.5,
      similarity_boost: 0.75,
      style: 0.18,
      use_speaker_boost: true,
    },
  }),
});

if (!response.ok) {
  const message = await response.text();
  throw new Error(`ElevenLabs request failed: ${response.status} ${message}`);
}

const arrayBuffer = await response.arrayBuffer();
await mkdir(dirname(outputPath), {recursive: true});
await writeFile(outputPath, Buffer.from(arrayBuffer));
console.log(`Wrote ${outputPath}`);
