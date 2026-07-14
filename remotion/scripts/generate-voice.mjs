import {mkdir, writeFile} from "node:fs/promises";
import {dirname, resolve} from "node:path";

const voiceoverText = `Agentic Automotive. Die Ausgangsfrage ist nicht: Bauen wir noch einen Chatbot?
Die bessere Frage ist: Wo verliert eine Werkstatt heute Zeit, Geld oder Vertrauen, weil ein Prozess nicht sauber weiterläuft?
Ein Agent erkennt nicht nur eine Nachricht. Er erkennt einen Vorgang, nutzt erlaubte Daten, stellt Rückfragen, holt Freigaben ein und bringt den nächsten Schritt in Bewegung.
Die Oberfläche muss dafür nicht neu erfunden werden. In vielen freien Werkstätten beginnt alles längst in WhatsApp: ein Foto, ein Dokument, eine Sprachnachricht, eine Rückfrage, eine Freigabe.
Daraus entstehen vier Hypothesen.
Erstens: Der Mängel-zu-Auftrag-Agent. Aus einem Prüfbericht wird ein strukturierter Reparaturauftrag, verständlich für Kunde und Werkstatt.
Zweitens: Der Teileeinkaufs-Agent. Preis, Lieferzeit, Qualität und Verfügbarkeit werden vergleichbar, bevor ein falsches Teil Zeit kostet.
Drittens: Der Kunden-Rückhol-Agent. Vorhandene Daten werden zu rechtzeitigen Terminen, statt dass Anlässe ungenutzt verschwinden.
Viertens: Der Gebrauchtwagen-Kaufagent. Ein Privatkäufer bekommt Hilfe, bevor er auf ein schlechtes Inserat, fehlende Dokumente oder falsche Versprechen hereinfällt.
Aber der Kern bleibt Kontrolle: Kundendaten, Freigaben und Grenzen müssen sichtbar bleiben. Keine heimliche Bestellung. Keine Nachricht ohne klare Erlaubnis. Kein Agent, dem die Werkstatt nicht vertraut.
Die Vision ist ein vernetztes Automotive-System aus Werkstätten, Fahrzeugen, Kunden und spezialisierten Agenten.
Heute zählt nur der Realitätscheck.
Welche Idee überlebt die Werkstattrealität? Und welche müssen wir sofort verwerfen?`;

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
