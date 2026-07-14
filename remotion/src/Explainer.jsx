import React from "react";
import {
  AbsoluteFill,
  Easing,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {Audio} from "@remotion/media";

const palette = {
  ink: "#f8fafc",
  muted: "#aeb8c7",
  navy: "#07111e",
  charcoal: "#101820",
  panel: "rgba(255,255,255,0.085)",
  line: "rgba(255,255,255,0.16)",
  green: "#25d366",
  blue: "#2f6bff",
  orange: "#f59e0b",
  paper: "#f7f3ea",
};

const scenes = [
  {
    from: 0,
    duration: 8,
    eyebrow: "0-8 Sekunden",
    title: "Der Schatz liegt in Daten und Prozessen",
    body: "Autoland, Digitalisierung und Agentic Commerce zeigen: KI wird interessant, wenn sie echte Vorgänge weiterbringt.",
    tags: ["Autohandel", "Kundendaten", "Prozesse", "nächster Schritt"],
    mode: "network",
  },
  {
    from: 8,
    duration: 10,
    eyebrow: "8-18 Sekunden",
    title: "Ein Chatbot antwortet. Ein Agent erledigt.",
    body: "Der Agent nutzt erlaubte Daten, stellt Rückfragen, holt Freigaben ein und bringt den Prozess zum Ergebnis.",
    tags: ["erkennen", "prüfen", "freigeben", "ausführen"],
    mode: "compare",
  },
  {
    from: 18,
    duration: 10,
    eyebrow: "18-28 Sekunden",
    title: "WhatsApp als Werkstatt-Oberfläche",
    body: "Foto, Dokument, Sprachnachricht, Rückfrage und Freigabe: der Prozess beginnt dort, wo der Alltag schon stattfindet.",
    tags: ["Foto", "Sprachnachricht", "Analyse", "Freigabe"],
    mode: "phone",
  },
  {
    from: 28,
    duration: 5,
    eyebrow: "Idee 1",
    title: "Mängel werden zu Aufträgen",
    body: "Vom Prüfbericht zum verständlichen Reparaturauftrag.",
    tags: ["Bericht", "Positionen", "Preis", "Termin"],
    mode: "idea",
  },
  {
    from: 33,
    duration: 5,
    eyebrow: "Idee 2",
    title: "Teile werden richtig bestellt",
    body: "Lieferzeit, Preis, Marke und Marge in einer Entscheidung.",
    tags: ["Fahrzeug", "Teil", "Lieferant", "Marge"],
    mode: "parts",
  },
  {
    from: 38,
    duration: 5,
    eyebrow: "Idee 3",
    title: "Kunden kommen rechtzeitig zurück",
    body: "Vorhandene Anlässe werden zu planbaren Werkstattterminen.",
    tags: ["HU", "Inspektion", "Termin", "Einwilligung"],
    mode: "calendar",
  },
  {
    from: 43,
    duration: 5,
    eyebrow: "B2C-Idee",
    title: "Gebrauchtwagen besser prüfen",
    body: "Inserate, Verkäuferantworten und technische Prüfung vor der Besichtigung.",
    tags: ["Inserat", "Fragen", "Dokumente", "Prüfung"],
    mode: "used",
  },
  {
    from: 48,
    duration: 8,
    eyebrow: "Gemeinsamer Kern",
    title: "Reale Prozesse. Menschliche Freigabe. Datenschutz.",
    body: "Keine unnötige neue Software, keine blinden Entscheidungen, kein Zugriff ohne klare Grenzen.",
    tags: ["Werkstattprozess", "Freigabe", "Datenkontrolle", "Nutzen"],
    mode: "control",
  },
  {
    from: 56,
    duration: 4,
    eyebrow: "Frage an Shafaq",
    title: "Welche Idee überlebt die Werkstattrealität?",
    body: "Shafaq, jetzt brauche ich deine ehrliche Einschätzung.",
    tags: ["kritisieren", "sortieren", "verbessern"],
    mode: "final",
  },
];

const sec = (value, fps) => Math.round(value * fps);

const fade = (frame, durationInFrames, fps) => {
  const inValue = interpolate(frame, [0, sec(0.8, fps)], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });
  const outValue = interpolate(frame, [durationInFrames - sec(0.8, fps), durationInFrames], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.in(Easing.quad),
  });
  return Math.min(inValue, outValue);
};

const Background = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const sweep = interpolate(frame, [0, 60 * fps], [-300, 2200], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(circle at 20% 20%, rgba(47,107,255,0.22), transparent 28%), radial-gradient(circle at 80% 25%, rgba(37,211,102,0.12), transparent 30%), linear-gradient(135deg, #07111e, #101820 54%, #050a12)",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)",
          backgroundSize: "96px 96px",
          opacity: 0.42,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: sweep,
          width: 320,
          transform: "skewX(-18deg)",
          background: "linear-gradient(90deg, transparent, rgba(37,211,102,0.2), transparent)",
        }}
      />
      <CarSilhouette x={260} y={720} scale={1.1} opacity={0.18} />
    </AbsoluteFill>
  );
};

const CarSilhouette = ({x, y, scale = 1, opacity = 1}) => (
  <svg
    viewBox="0 0 900 260"
    style={{
      position: "absolute",
      left: x,
      top: y,
      width: 900 * scale,
      height: 260 * scale,
      opacity,
      overflow: "visible",
    }}
  >
    <path d="M70 170C120 70 230 40 370 40h155c120 0 230 42 305 130H70z" fill="#172536" stroke="#526070" strokeWidth="8" />
    <circle cx="235" cy="190" r="52" fill="#06111d" stroke="#f8fafc" strokeWidth="12" />
    <circle cx="660" cy="190" r="52" fill="#06111d" stroke="#f8fafc" strokeWidth="12" />
    <path d="M285 95h290" stroke={palette.green} strokeWidth="9" strokeLinecap="round" />
  </svg>
);

const Phone = ({progress}) => {
  const messages = [
    "Sprachnachricht empfangen",
    "Foto oder Bericht erkannt",
    "Analyse läuft...",
    "Rückfrage gestellt",
    "Freigabe eingeholt",
  ];
  return (
    <div
      style={{
        width: 330,
        height: 610,
        borderRadius: 42,
        background: "#07111e",
        border: `8px solid ${palette.paper}`,
        padding: 22,
        boxShadow: "0 30px 70px rgba(0,0,0,0.42)",
      }}
    >
      <div style={{height: 66, borderRadius: 20, background: "#10251d", color: palette.ink, padding: 14, fontWeight: 800}}>
        Werkstatt-Agent
        <div style={{fontSize: 20, color: "#9fdab8", fontWeight: 500}}>Mock-up</div>
      </div>
      <div style={{display: "flex", flexDirection: "column", gap: 14, marginTop: 22}}>
        {messages.map((message, index) => {
          const shown = progress > index * 0.17;
          return (
            <div
              key={message}
              style={{
                alignSelf: index % 2 === 0 ? "flex-start" : "flex-end",
                maxWidth: "90%",
                borderRadius: 20,
                padding: "14px 16px",
                background: index % 2 === 0 ? palette.paper : "#d9fdd3",
                color: palette.charcoal,
                fontSize: 22,
                lineHeight: 1.2,
                opacity: shown ? 1 : 0,
                transform: `translateY(${shown ? 0 : 18}px)`,
              }}
            >
              {message}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const SceneGraphic = ({mode, progress}) => {
  if (mode === "phone") {
    return <Phone progress={progress} />;
  }

  if (mode === "compare") {
    return (
      <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: 26, width: 760}}>
        {["Chatbot", "Agent"].map((label, index) => (
          <div
            key={label}
            style={{
              height: 420,
              borderRadius: 24,
              padding: 34,
              border: `2px solid ${index ? "rgba(37,211,102,0.55)" : palette.line}`,
              background: index ? "rgba(37,211,102,0.15)" : palette.panel,
              transform: `translateY(${(1 - progress) * (index ? 30 : 10)}px)`,
            }}
          >
            <div style={{fontSize: 30, color: index ? palette.green : palette.muted, fontWeight: 850}}>{label}</div>
            <div style={{fontSize: 58, fontWeight: 900, marginTop: 46, lineHeight: 1}}>
              {index ? "erledigt" : "erklärt"}
            </div>
            <div style={{marginTop: 42, color: palette.muted, fontSize: 25, lineHeight: 1.35}}>
              {index ? "Freigabe, Systeme und nächster Schritt." : "Antwort, Text und Empfehlung."}
            </div>
          </div>
        ))}
      </div>
    );
  }

  const cards = {
    network: ["Daten", "Prozess", "Agent", "Ergebnis"],
    idea: ["Bericht", "Mängel", "Auftrag", "Termin"],
    parts: ["Teil", "Preis", "Lieferung", "Marge"],
    calendar: ["Anlass", "Kontakt", "Termin", "Buchung"],
    used: ["Inserat", "Fragen", "Dokumente", "Prüfung"],
    control: ["Einwilligung", "Grenzen", "Freigabe", "Übergabe"],
    final: ["Problem", "Quatsch", "Pilot", "Realität"],
  }[mode] ?? ["Daten", "Agent", "Freigabe", "Ergebnis"];

  return (
    <div style={{position: "relative", width: 760, height: 520}}>
      <CarSilhouette x={-50} y={300} scale={0.82} opacity={0.48} />
      {cards.map((card, index) => {
        const angle = (index / cards.length) * Math.PI * 2 - Math.PI / 2;
        const radius = 190;
        const cx = 380 + Math.cos(angle) * radius;
        const cy = 240 + Math.sin(angle) * radius;
        const scale = spring({
          frame: progress * 90 - index * 6,
          fps: 30,
          config: {damping: 200},
        });
        return (
          <React.Fragment key={card}>
            <div
              style={{
                position: "absolute",
                left: 380,
                top: 250,
                width: Math.max(0, progress) * radius,
                height: 3,
                transformOrigin: "0 0",
                transform: `rotate(${angle}rad)`,
                background: index % 2 ? palette.blue : palette.green,
                opacity: 0.65,
              }}
            />
            <div
              style={{
                position: "absolute",
                left: cx - 92,
                top: cy - 46,
                width: 184,
                height: 92,
                borderRadius: 18,
                background: index === 0 ? palette.paper : palette.panel,
                color: index === 0 ? palette.charcoal : palette.ink,
                border: `2px solid ${palette.line}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 28,
                fontWeight: 850,
                transform: `scale(${scale})`,
              }}
            >
              {card}
            </div>
          </React.Fragment>
        );
      })}
      <div
        style={{
          position: "absolute",
          left: 270,
          top: 150,
          width: 220,
          height: 220,
          borderRadius: "50%",
          background: `linear-gradient(135deg, ${palette.green}, ${palette.blue})`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#06140a",
          fontSize: 42,
          fontWeight: 950,
          transform: `scale(${0.85 + progress * 0.15})`,
        }}
      >
        Agent
      </div>
    </div>
  );
};

const Scene = ({scene}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const durationInFrames = sec(scene.duration, fps);
  const opacity = fade(frame, durationInFrames, fps);
  const progress = interpolate(frame, [0, durationInFrames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const textY = interpolate(frame, [0, sec(1.2, fps)], [40, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });

  return (
    <AbsoluteFill style={{opacity}}>
      <div style={{position: "absolute", left: 115, top: 116, right: 105, bottom: 96, border: `2px solid ${palette.line}`, borderRadius: 28}} />
      <div style={{position: "absolute", left: 160, top: 170, width: 780, transform: `translateY(${textY}px)`}}>
        <div style={{color: palette.green, fontSize: 28, fontWeight: 900, textTransform: "uppercase", marginBottom: 26}}>
          {scene.eyebrow}
        </div>
        <div style={{color: palette.ink, fontSize: scene.mode === "final" ? 88 : 74, lineHeight: 0.98, fontWeight: 950, letterSpacing: 0}}>
          {scene.title}
        </div>
        <div style={{color: palette.muted, fontSize: 34, lineHeight: 1.28, marginTop: 36, width: 720}}>
          {scene.body}
        </div>
        <div style={{display: "flex", flexWrap: "wrap", gap: 14, marginTop: 44}}>
          {scene.tags.map((tag, index) => (
            <div
              key={tag}
              style={{
                padding: "12px 18px",
                borderRadius: 999,
                color: index === 0 ? "#06140a" : palette.ink,
                background: index === 0 ? palette.green : "rgba(255,255,255,0.1)",
                border: `1px solid ${palette.line}`,
                fontSize: 24,
                fontWeight: 760,
                opacity: progress > index * 0.12 ? 1 : 0,
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
      <div style={{position: "absolute", right: 150, top: 205}}>
        <SceneGraphic mode={scene.mode} progress={progress} />
      </div>
    </AbsoluteFill>
  );
};

export const Explainer = () => {
  const {fps} = useVideoConfig();

  return (
    <AbsoluteFill style={{fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', sans-serif"}}>
      <Background />
      <Audio src={staticFile("audio/bed.wav")} volume={0.09} />
      <Audio src={staticFile("audio/voiceover.mp3")} volume={0.96} />
      {scenes.map((scene) => (
        <Sequence key={scene.title} from={sec(scene.from, fps)} durationInFrames={sec(scene.duration, fps)} premountFor={fps}>
          <Scene scene={scene} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
