# Agentic Automotive

Statische, offline-fähige Präsentationswebsite über Agentic Commerce in der freien Werkstattwelt.

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

## Bilder ersetzen

1. Bild mit ChatGPT generieren.
2. Exakten Dateinamen aus `assets/images/image-manifest.md` verwenden.
3. PNG im Ordner `assets/images/` ablegen.
4. Website neu laden.
5. Website neu laden und die betroffene Folie prüfen.

## Offline-Test

- Website über lokalen Server öffnen.
- Browser DevTools prüfen: keine externen Netzwerkaufrufe.
- Präsentation mit Tastatur bedienen.
- Browserfenster bei 1440 x 900, 1920 x 1080 und 1366 x 768 prüfen.

## Aktuelle Bildlage

Für die neun Motive liegen lokale PNG-Kopien in `assets/images/`. Die SVG-Platzhalter in `assets/images/placeholders/` bleiben als Fallback erhalten, falls ein PNG später entfernt oder ersetzt wird.

## Bekannte Grenzen

- Die Datenschutzbox ist eine Produkt- und Vertrauenslogik, keine juristische Beratung.
