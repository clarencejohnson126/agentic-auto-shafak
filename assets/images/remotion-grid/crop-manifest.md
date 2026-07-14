# Remotion Grid Crop Manifest

## Original

- Datei: `assets/images/remotion-agent-grid.png`
- Originalgröße: `1024 x 1536 px`
- Raster: `2 Spalten x 4 Zeilen`
- Interne Trennlinien: ca. `2 px` zwischen den Spalten und Zeilen
- Crop-Größe je Motiv: `510 x 382 px`
- Ausgabeformat: PNG, ohne Farb- oder Kontraständerung

## Crop-Koordinaten

| Nr. | Datei | Motiv | Crop `x,y,w,h` | Videozeit | Fokus `x/y` | Animation |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | `01-connected-vehicle.png` | Vernetztes Fahrzeug und digitale Prozesse | `0,0,510,382` | `00:00-00:13.5` | `0.52 / 0.58` | langsamer Push-in, leichter Pan nach links/unten, Datenlinien |
| 2 | `02-whatsapp-workshop-agent.png` | Werkstattinhaber mit Smartphone und Agentenkommunikation | `514,0,510,382` | `00:13.5-00:27` | `0.67 / 0.55` | Fokus auf Smartphone, Chat-/Freigabe-Callouts |
| 3 | `03-defects-analysis-agent.png` | Prüfbericht und digitale Mängelanalyse | `0,386,510,382` | `00:27-00:40.5` | `0.58 / 0.52` | Kamerafahrt vom Bericht zur Analyse, Mängel-Callouts |
| 4 | `04-parts-purchasing-agent.png` | Bremsenteile und digitaler Vergleich | `514,386,510,382` | `00:40.5-00:54` | `0.55 / 0.56` | Push-in auf Teile und Vergleichskarten |
| 5 | `05-customer-return-agent.png` | Kundendaten und Rückholprozess | `0,770,510,382` | `00:54-01:07.5` | `0.56 / 0.55` | Datenfluss Richtung Terminbestätigung |
| 6 | `06-used-car-buying-agent.png` | Fahrzeugvergleich auf dem Smartphone | `514,770,510,382` | `01:07.5-01:21` | `0.62 / 0.54` | horizontaler Pan durch Fahrzeugoptionen |
| 7 | `07-privacy-control-agent.png` | Datenschutz, Freigabe und geschützte Prozesse | `0,1154,510,382` | `01:21-01:34.5` | `0.54 / 0.52` | Zoom auf Schutz- und Freigabesymbole |
| 8 | `08-agentic-automotive-network.png` | Vernetztes Automotive-Ökosystem | `514,1154,510,382` | `01:34.5-01:48` | `0.50 / 0.52` | langsamer Zoom-out zum Gesamtsystem |

## Prüfung

- Kontaktübersicht: `assets/images/remotion-grid/contact-sheet.png`
- Remotion-Pfade: `remotion/public/images/remotion-grid/*.png`
- Das vollständige Grid wird im finalen Video nicht gezeigt; jedes Motiv wird einzeln über `Img` und `staticFile()` eingebunden.
