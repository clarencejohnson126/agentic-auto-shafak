# Agentic Auto Shafaq

Statische, offline-fähige Präsentationswebsite für ein Beratungsgespräch mit Shafaq über Agentic Commerce in der freien Werkstattwelt.

## Status

Die Umsetzung liegt auf dem Arbeitsbranch `codex/presentation-v1`.

## Dateistruktur

```text
.
├── index.html
├── styles.css
├── script.js
├── brief.md
├── plan.md
├── AGENTS.md
├── assets/
│   ├── graphics/
│   ├── icons/
│   ├── images/
│   │   ├── image-manifest.md
│   │   └── placeholders/
│   └── video/
└── remotion/
    ├── package.json
    ├── README.md
    ├── public/
    ├── scripts/
    └── src/
```

## Lokaler Start

```bash
python3 -m http.server 5173
```

Dann im Browser öffnen:

```text
http://127.0.0.1:5173
```

Die Website nutzt nur lokale Dateien und bleibt offline nutzbar.

## Präsentationssteuerung

- Scrollen: nächster oder vorheriger Abschnitt
- Pfeiltasten: Abschnitt wechseln
- Leertaste: nächster Abschnitt
- Shift + Leertaste: vorheriger Abschnitt
- Navigationspunkte: direkt zu Folien springen
- `Start`: zurück zum Anfang
- `Vollbild`: Präsentation im Vollbild zeigen

## Remotion

Der Remotion-Code liegt in `remotion/`. Das gerenderte Video wird nach `assets/video/agentic-automotive-explainer.mp4` geschrieben.

```bash
cd remotion
npm install
npm run render
```

Für die Sprecherstimme wird ein lokales Audio-Asset erzeugt. Der ElevenLabs-Key darf nicht in Dateien gespeichert oder committed werden.

## Bilder ersetzen

1. Bild mit ChatGPT generieren.
2. Exakten Dateinamen aus `assets/images/image-manifest.md` verwenden.
3. PNG im Ordner `assets/images/` ablegen.
4. Website neu laden.
5. Falls das Bild auch im Video verwendet wird, Video erneut rendern.

## Offline-Test

- Website über lokalen Server öffnen.
- Browser DevTools prüfen: keine externen Netzwerkaufrufe.
- Präsentation mit Tastatur bedienen.
- Video abspielen.
- Browserfenster bei 1440 x 900, 1920 x 1080 und 1366 x 768 prüfen.

## Bekannte Grenzen

- Die finalen Bildmotive sind aktuell hochwertige SVG-Platzhalter.
- Das Video hängt vom erfolgreichen lokalen Remotion-Rendering ab.
- Die Datenschutzbox ist eine Produkt- und Vertrauenslogik, keine juristische Beratung.
