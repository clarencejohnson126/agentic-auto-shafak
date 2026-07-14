# Remotion-Erklärvideo

## Komposition

- Composition-ID: `AgenticAutomotiveExplainer`
- Format: `1920 x 1080 px`
- Framerate: `30 fps`
- Dauer: `108 Sekunden`
- Ausgabe: `../assets/video/agentic-automotive-explainer.mp4`

## Assets

- Ursprüngliches Grid: `assets/images/remotion-agent-grid.png`
- Einzelcrops: `assets/images/remotion-grid/*.png`
- Kontaktübersicht: `assets/images/remotion-grid/contact-sheet.png`
- Remotion-Kopien: `remotion/public/images/remotion-grid/*.png`
- Crop-Manifest: `assets/images/remotion-grid/crop-manifest.md`

Das vollständige Grid wird im finalen Video nicht gezeigt. Jedes Motiv wird als Einzelbild über `Img` und `staticFile()` geladen.

## Crop-Koordinaten

Originalgröße: `1024 x 1536 px`, Raster `2 x 4`, interne Trennlinien ca. `2 px`.

| Nr. | Datei | Crop `x,y,w,h` | Videozeit | Fokus `x/y` |
| --- | --- | --- | --- | --- |
| 1 | `01-connected-vehicle.png` | `0,0,510,382` | `00:00-00:13.5` | `0.52 / 0.58` |
| 2 | `02-whatsapp-workshop-agent.png` | `514,0,510,382` | `00:13.5-00:27` | `0.67 / 0.55` |
| 3 | `03-defects-analysis-agent.png` | `0,386,510,382` | `00:27-00:40.5` | `0.58 / 0.52` |
| 4 | `04-parts-purchasing-agent.png` | `514,386,510,382` | `00:40.5-00:54` | `0.55 / 0.56` |
| 5 | `05-customer-return-agent.png` | `0,770,510,382` | `00:54-01:07.5` | `0.56 / 0.55` |
| 6 | `06-used-car-buying-agent.png` | `514,770,510,382` | `01:07.5-01:21` | `0.62 / 0.54` |
| 7 | `07-privacy-control-agent.png` | `0,1154,510,382` | `01:21-01:34.5` | `0.54 / 0.52` |
| 8 | `08-agentic-automotive-network.png` | `514,1154,510,382` | `01:34.5-01:48` | `0.50 / 0.52` |

## Szenen

| Zeit | Motiv | Text |
| --- | --- | --- |
| `00:00-00:13.5` | Vernetztes Fahrzeug | `Agentic Automotive` |
| `00:13.5-00:27` | Werkstattinhaber mit Smartphone | `WhatsApp wird zur Oberfläche` |
| `00:27-00:40.5` | Prüfbericht und Mängelanalyse | `Vom Mängelbericht zum Auftrag` |
| `00:40.5-00:54` | Bremsenteile und Vergleich | `Das richtige Teil zur richtigen Zeit` |
| `00:54-01:07.5` | Kundendaten und Rückholprozess | `Bestandskunden werden zu neuen Terminen` |
| `01:07.5-01:21` | Fahrzeugvergleich | `Vom Inserat zum geprüften Fahrzeug` |
| `01:21-01:34.5` | Datenschutz und Freigabe | `Der Mensch behält die Kontrolle` |
| `01:34.5-01:48` | Automotive-Ökosystem | `Welche Idee überlebt die Werkstattrealität?` |

## Bewegungslogik

- Jede Szene nutzt eine unscharfe Hintergrundkopie plus scharfes Vordergrundbild.
- Die Hauptbilder erhalten individuelle Fokuswerte, dezente Ken-Burns-Bewegung und leichte Pans.
- Datenlinien und Callouts werden framebasiert animiert.
- Alle Texte bleiben echte Remotion-Textelemente.
- Es gibt keine CSS-Keyframes oder CSS-Transitions in der Remotion-Komposition.

## Voiceover

Das deutsche Voiceover wird mit ElevenLabs erzeugt und lokal gespeichert:

```bash
cd remotion
ELEVENLABS_API_KEY=... npm run voice
```

Alternativ liest das Skript den API-Key aus stdin. Der Schlüssel wird nicht in Dateien gespeichert.

Ausgabe:

```text
remotion/public/audio/voiceover.mp3
```

## Hintergrundton

Der subtile lokale Hintergrundton wird ohne externe Dienste erzeugt:

```bash
cd remotion
npm run bed
```

Ausgabe:

```text
remotion/public/audio/bed.wav
```

## Rendering

```bash
cd remotion
npm run render
```

Das MP4 wird hierhin geschrieben:

```text
../assets/video/agentic-automotive-explainer.mp4
```
