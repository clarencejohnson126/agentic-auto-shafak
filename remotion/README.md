# Remotion-Erklärvideo

## Gelesener Skill

- Skill: `remotion-best-practices`
- Pfad: `/Users/clarence/Desktop/Video Skills in Claude Code/.agents/skills/remotion-best-practices/SKILL.md`
- Regeldateien: Alle in `SKILL.md` referenzierten Dateien unter `rules/` wurden gelesen.

## Übernommene Regeln

- Assets liegen lokal im `public/`-Ordner und werden über `staticFile()` referenziert.
- Bildinhalte in Remotion werden mit Remotion-Komponenten oder React/SVG-artigen Elementen gerendert, nicht über externe URLs.
- Audio wird lokal abgelegt und mit `<Audio>` aus `@remotion/media` eingebunden.
- Alle Videobewegungen werden über `useCurrentFrame()`, `useVideoConfig()`, `interpolate()` und `spring()` gesteuert.
- Keine CSS-Transitions oder CSS-Keyframe-Animationen innerhalb der Remotion-Komposition.
- Die Komposition ist fest auf 1920 x 1080 Pixel, 30 fps und 60 Sekunden ausgelegt.
- Szenen werden mit `<Sequence>` organisiert.
- Keine externen Fonts; die Komposition nutzt Systemschriften.

## Abhängigkeiten

- `remotion`
- `@remotion/cli`
- `@remotion/media`
- `@remotion/transitions`

## Voiceover

Das Voiceover wird aus deutschem Text mit ElevenLabs erzeugt und lokal gespeichert:

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
npm install
npm run render
```

Das MP4 wird hierhin geschrieben:

```text
../assets/video/agentic-automotive-explainer.mp4
```

## Späterer Bildwechsel

Die Komposition arbeitet aktuell mit selbst erstellten Formen, Typografie und lokalen Audiodateien. Falls finale PNG-Bilder im Video verwendet werden sollen, diese nach `remotion/public/images/` kopieren und in `src/Explainer.jsx` über `Img` und `staticFile()` referenzieren.
