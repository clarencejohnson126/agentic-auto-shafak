import React from "react";
import {
  AbsoluteFill,
  Easing,
  Img,
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
  panel: "rgba(7,17,30,0.76)",
  line: "rgba(255,255,255,0.16)",
  green: "#25d366",
  blue: "#2f6bff",
  orange: "#f59e0b",
};

const totalSeconds = 108;

const gridScenes = [
  {
    id: 1,
    from: 0,
    duration: 13.5,
    src: "images/remotion-grid/01-connected-vehicle.png",
    eyebrow: "Einstieg",
    title: "Agentic Automotive",
    body: "Nicht der nächste Chatbot ist spannend. Spannend ist ein Agent, der Fahrzeugdaten, Prozess und nächsten Schritt erkennt.",
    tags: ["Fahrzeugdaten", "Prozess", "nächster Schritt"],
    textSide: "left",
    accent: palette.green,
    focusX: 0.52,
    focusY: 0.58,
    scaleFrom: 1.02,
    scaleTo: 1.09,
    panX: -18,
    panY: 8,
    titleSize: 82,
    callouts: [
      {label: "Daten erkannt", x: 92, y: 92},
      {label: "Werkstattprozess", x: 620, y: 138},
      {label: "naechster Schritt", x: 420, y: 590},
    ],
  },
  {
    id: 2,
    from: 13.5,
    duration: 13.5,
    src: "images/remotion-grid/02-whatsapp-workshop-agent.png",
    eyebrow: "Oberflaeche",
    title: "WhatsApp wird zur Oberfläche",
    body: "Foto, Sprachnachricht, Dokument, Rückfrage und Freigabe bleiben dort, wo der Werkstattalltag ohnehin stattfindet.",
    tags: ["WhatsApp", "Rückfrage", "Freigabe"],
    textSide: "left",
    accent: palette.green,
    focusX: 0.67,
    focusY: 0.55,
    scaleFrom: 1.01,
    scaleTo: 1.08,
    panX: 14,
    panY: -8,
    titleSize: 68,
    callouts: [
      {label: "Sprachnachricht", x: 116, y: 126},
      {label: "Dokument", x: 488, y: 96},
      {label: "Freigabe", x: 566, y: 530},
    ],
  },
  {
    id: 3,
    from: 27,
    duration: 13.5,
    src: "images/remotion-grid/03-defects-analysis-agent.png",
    eyebrow: "Idee 1",
    title: "Vom Mängelbericht zum Auftrag",
    body: "Der Bericht wird strukturiert: Position, Preis, Rückfrage, Freigabe und Termin ergeben einen verständlichen Reparaturauftrag.",
    tags: ["Bericht", "Positionen", "Auftrag"],
    textSide: "right",
    accent: palette.blue,
    focusX: 0.58,
    focusY: 0.52,
    scaleFrom: 1.02,
    scaleTo: 1.10,
    panX: -20,
    panY: -4,
    titleSize: 66,
    callouts: [
      {label: "Bericht gelesen", x: 92, y: 520},
      {label: "Mängel gruppiert", x: 526, y: 170},
      {label: "Auftrag vorbereitet", x: 532, y: 452},
    ],
  },
  {
    id: 4,
    from: 40.5,
    duration: 13.5,
    src: "images/remotion-grid/04-parts-purchasing-agent.png",
    eyebrow: "Idee 2",
    title: "Das richtige Teil zur richtigen Zeit",
    body: "Preis, Lieferzeit, Qualität und Verfügbarkeit werden vergleichbar, bevor eine Fehlbestellung den Hof blockiert.",
    tags: ["Preis", "Lieferzeit", "Marge"],
    textSide: "left",
    accent: palette.blue,
    focusX: 0.55,
    focusY: 0.56,
    scaleFrom: 1.02,
    scaleTo: 1.09,
    panX: -8,
    panY: 10,
    titleSize: 68,
    callouts: [
      {label: "Preis", x: 498, y: 130},
      {label: "Verfügbarkeit", x: 646, y: 278},
      {label: "Qualität", x: 270, y: 574},
    ],
  },
  {
    id: 5,
    from: 54,
    duration: 13.5,
    src: "images/remotion-grid/05-customer-return-agent.png",
    eyebrow: "Idee 3",
    title: "Bestandskunden werden zu neuen Terminen",
    body: "Aus vorhandenen Anlässen entstehen rechtzeitige Rückfragen, planbare Termine und weniger verlorene Kunden.",
    tags: ["Anlass", "Kontakt", "Termin"],
    textSide: "right",
    accent: palette.green,
    focusX: 0.56,
    focusY: 0.55,
    scaleFrom: 1.01,
    scaleTo: 1.08,
    panX: 18,
    panY: -10,
    titleSize: 64,
    callouts: [
      {label: "Kundendaten", x: 118, y: 120},
      {label: "Rückholanlass", x: 468, y: 300},
      {label: "Terminfenster", x: 588, y: 520},
    ],
  },
  {
    id: 6,
    from: 67.5,
    duration: 13.5,
    src: "images/remotion-grid/06-used-car-buying-agent.png",
    eyebrow: "B2C-Idee",
    title: "Vom Inserat zum geprüften Fahrzeug",
    body: "Der Agent prüft Inserate, Verkäuferantworten und Dokumente, bevor ein Privatkäufer zur Besichtigung fährt.",
    tags: ["Inserat", "Vergleich", "Prüfung"],
    textSide: "left",
    accent: palette.green,
    focusX: 0.62,
    focusY: 0.54,
    scaleFrom: 1.01,
    scaleTo: 1.08,
    panX: -14,
    panY: 0,
    titleSize: 66,
    callouts: [
      {label: "Inserat", x: 310, y: 182},
      {label: "Vergleich", x: 600, y: 116},
      {label: "Checkliste", x: 646, y: 478},
    ],
  },
  {
    id: 7,
    from: 81,
    duration: 13.5,
    src: "images/remotion-grid/07-privacy-control-agent.png",
    eyebrow: "Kontrolle",
    title: "Der Mensch behält die Kontrolle",
    body: "Daten, Grenzen und Freigaben bleiben sichtbar. Keine Bestellung, keine Nachricht und kein Auftrag ohne erlaubte Kontrolle.",
    tags: ["Datenschutz", "Freigabe", "Grenzen"],
    textSide: "right",
    accent: palette.green,
    focusX: 0.54,
    focusY: 0.52,
    scaleFrom: 1.02,
    scaleTo: 1.10,
    panX: -16,
    panY: -4,
    titleSize: 68,
    callouts: [
      {label: "Einwilligung", x: 116, y: 276},
      {label: "Mensch bestätigt", x: 418, y: 214},
      {label: "Daten bleiben begrenzt", x: 522, y: 520},
    ],
  },
  {
    id: 8,
    from: 94.5,
    duration: 13.5,
    src: "images/remotion-grid/08-agentic-automotive-network.png",
    eyebrow: "Realitätscheck",
    title: "Welche Idee überlebt die Werkstattrealität?",
    body: "Die Vision zählt erst, wenn echte Werkstattgespräche die Engpässe bestätigen und die schwachen Hypothesen aussortieren.",
    tags: ["ehrlich prüfen", "Pilot", "Werkstattrealität"],
    textSide: "left",
    accent: palette.blue,
    focusX: 0.5,
    focusY: 0.52,
    scaleFrom: 1.08,
    scaleTo: 1.01,
    panX: 0,
    panY: 0,
    titleSize: 62,
    callouts: [
      {label: "Werkstatt", x: 614, y: 118},
      {label: "Fahrzeug", x: 420, y: 346},
      {label: "Agenten-Netz", x: 216, y: 562},
    ],
  },
];

const sec = (value, fps) => Math.round(value * fps);

const fade = (frame, durationInFrames, fps) => {
  const fadeFrames = sec(0.75, fps);
  const inValue = interpolate(frame, [0, fadeFrames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });
  const outValue = interpolate(frame, [durationInFrames - fadeFrames, durationInFrames], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.in(Easing.quad),
  });
  return Math.min(inValue, outValue);
};

const Background = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const sweep = interpolate(frame, [0, totalSeconds * fps], [-420, 2320], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(circle at 18% 16%, rgba(47,107,255,0.18), transparent 28%), radial-gradient(circle at 82% 24%, rgba(37,211,102,0.13), transparent 30%), linear-gradient(135deg, #07111e, #101820 54%, #050a12)",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.038) 1px, transparent 1px)",
          backgroundSize: "96px 96px",
          opacity: 0.35,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: sweep,
          width: 300,
          transform: "skewX(-18deg)",
          background: "linear-gradient(90deg, transparent, rgba(37,211,102,0.18), transparent)",
        }}
      />
    </AbsoluteFill>
  );
};

const sceneVisual = (scene) => ({
  left: scene.textSide === "right" ? 130 : 770,
  top: 122,
  width: 1010,
  height: 758,
});

const sceneText = (scene) => ({
  left: scene.textSide === "right" ? 1090 : 140,
  top: 206,
  width: 650,
});

const DataLines = ({scene, frame}) => {
  const dash = interpolate(frame % 90, [0, 90], [0, -180], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const glow = 0.4 + Math.sin((frame + scene.id * 9) / 18) * 0.2;

  return (
    <svg viewBox="0 0 1010 758" style={{position: "absolute", inset: 0, opacity: 0.55}}>
      <path
        d="M80 540 C260 450, 365 288, 506 378 C650 470, 716 260, 926 210"
        fill="none"
        stroke={scene.accent}
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray="24 26"
        strokeDashoffset={dash}
      />
      <path
        d="M96 210 C306 174, 398 272, 518 230 C646 186, 760 350, 918 432"
        fill="none"
        stroke={scene.id % 2 ? palette.blue : palette.green}
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="16 24"
        strokeDashoffset={-dash * 0.55}
      />
      {[0.2, 0.45, 0.72].map((position, index) => (
        <circle
          key={position}
          cx={96 + position * 812}
          cy={index === 1 ? 384 : index === 2 ? 438 : 220}
          r={8 + glow * 5}
          fill={index === 1 ? palette.green : palette.blue}
          opacity={0.45 + glow * 0.35}
        />
      ))}
    </svg>
  );
};

const Callouts = ({scene, frame, fps, visual}) => (
  <>
    {scene.callouts.map((callout, index) => {
      const entrance = spring({
        frame: frame - sec(1.4 + index * 0.55, fps),
        fps,
        config: {damping: 180, stiffness: 95, mass: 0.6},
      });
      const pulse = 0.78 + Math.sin((frame + index * 24) / 22) * 0.1;
      return (
        <div
          key={callout.label}
          style={{
            position: "absolute",
            left: visual.left + callout.x,
            top: visual.top + callout.y,
            padding: "12px 16px",
            borderRadius: 999,
            background: "rgba(7,17,30,0.84)",
            border: `1px solid ${scene.accent}`,
            color: palette.ink,
            fontSize: 22,
            fontWeight: 800,
            boxShadow: `0 0 ${22 + pulse * 14}px ${scene.accent}44`,
            opacity: entrance,
            transform: `translateY(${(1 - entrance) * 18}px) scale(${0.94 + entrance * 0.06})`,
            whiteSpace: "nowrap",
          }}
        >
          {callout.label}
        </div>
      );
    })}
  </>
);

const ImageStage = ({scene, frame, fps, progress}) => {
  const visual = sceneVisual(scene);
  const imageScale = interpolate(progress, [0, 1], [scene.scaleFrom, scene.scaleTo], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const panX = interpolate(progress, [0, 1], [0, scene.panX], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const panY = interpolate(progress, [0, 1], [0, scene.panY], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const imageSrc = staticFile(scene.src);

  return (
    <>
      <Img
        src={imageSrc}
        style={{
          position: "absolute",
          inset: -26,
          width: "calc(100% + 52px)",
          height: "calc(100% + 52px)",
          objectFit: "cover",
          objectPosition: `${scene.focusX * 100}% ${scene.focusY * 100}%`,
          transform: `scale(${1.22 + progress * 0.04}) translate(${panX * -0.12}px, ${panY * -0.12}px)`,
          filter: "blur(28px)",
          opacity: 0.44,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            scene.textSide === "left"
              ? "linear-gradient(90deg, rgba(5,10,18,0.96) 0%, rgba(5,10,18,0.84) 34%, rgba(5,10,18,0.28) 58%, rgba(5,10,18,0.68) 100%)"
              : "linear-gradient(90deg, rgba(5,10,18,0.68) 0%, rgba(5,10,18,0.28) 42%, rgba(5,10,18,0.84) 66%, rgba(5,10,18,0.96) 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: visual.left,
          top: visual.top,
          width: visual.width,
          height: visual.height,
          borderRadius: 28,
          overflow: "hidden",
          border: "2px solid rgba(255,255,255,0.18)",
          boxShadow: "0 34px 90px rgba(0,0,0,0.46)",
          background: palette.charcoal,
        }}
      >
        <Img
          src={imageSrc}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: `${scene.focusX * 100}% ${scene.focusY * 100}%`,
            transformOrigin: `${scene.focusX * 100}% ${scene.focusY * 100}%`,
            transform: `translate(${panX}px, ${panY}px) scale(${imageScale})`,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.1), transparent 42%, rgba(0,0,0,0.36)), radial-gradient(circle at 50% 50%, transparent 54%, rgba(0,0,0,0.38))",
          }}
        />
        <DataLines scene={scene} frame={frame} />
      </div>
      <Callouts scene={scene} frame={frame} fps={fps} visual={visual} />
    </>
  );
};

const TextPanel = ({scene, frame, fps}) => {
  const text = sceneText(scene);
  const titleEntrance = spring({
    frame: frame - sec(0.25, fps),
    fps,
    config: {damping: 170, stiffness: 90, mass: 0.65},
  });
  const bodyOpacity = interpolate(frame, [sec(0.9, fps), sec(1.6, fps)], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        left: text.left,
        top: text.top,
        width: text.width,
        transform: `translateY(${(1 - titleEntrance) * 36}px)`,
      }}
    >
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 14,
          color: scene.accent,
          fontSize: 25,
          fontWeight: 900,
          textTransform: "uppercase",
          letterSpacing: 0,
          marginBottom: 24,
          opacity: titleEntrance,
        }}
      >
        <span
          style={{
            display: "inline-flex",
            width: 44,
            height: 44,
            borderRadius: 999,
            alignItems: "center",
            justifyContent: "center",
            background: scene.accent,
            color: "#06140a",
          }}
        >
          {scene.id}
        </span>
        {scene.eyebrow}
      </div>
      <div
        style={{
          color: palette.ink,
          fontSize: scene.titleSize,
          lineHeight: 0.98,
          fontWeight: 950,
          letterSpacing: 0,
          opacity: titleEntrance,
        }}
      >
        {scene.title}
      </div>
      <div
        style={{
          marginTop: 34,
          color: palette.muted,
          fontSize: 32,
          lineHeight: 1.28,
          opacity: bodyOpacity,
        }}
      >
        {scene.body}
      </div>
      <div style={{display: "flex", flexWrap: "wrap", gap: 14, marginTop: 42}}>
        {scene.tags.map((tag, index) => {
          const chipOpacity = interpolate(frame, [sec(1.65 + index * 0.28, fps), sec(2.1 + index * 0.28, fps)], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          return (
            <div
              key={tag}
              style={{
                padding: "12px 18px",
                borderRadius: 999,
                color: index === 0 ? "#06140a" : palette.ink,
                background: index === 0 ? scene.accent : "rgba(255,255,255,0.1)",
                border: `1px solid ${index === 0 ? scene.accent : palette.line}`,
                fontSize: 23,
                fontWeight: 780,
                opacity: chipOpacity,
                transform: `translateY(${(1 - chipOpacity) * 14}px)`,
              }}
            >
              {tag}
            </div>
          );
        })}
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

  return (
    <AbsoluteFill style={{opacity}}>
      <div style={{position: "absolute", left: 104, top: 88, right: 104, bottom: 78, border: `2px solid ${palette.line}`, borderRadius: 30}} />
      <ImageStage scene={scene} frame={frame} fps={fps} progress={progress} />
      <TextPanel scene={scene} frame={frame} fps={fps} />
      <div
        style={{
          position: "absolute",
          right: 138,
          bottom: 96,
          color: "rgba(248,250,252,0.62)",
          fontSize: 24,
          fontWeight: 760,
        }}
      >
        {String(scene.id).padStart(2, "0")} / 08
      </div>
    </AbsoluteFill>
  );
};

export const Explainer = () => {
  const {fps} = useVideoConfig();

  return (
    <AbsoluteFill style={{fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', sans-serif"}}>
      <Background />
      <Audio src={staticFile("audio/bed.wav")} volume={0.08} />
      <Audio src={staticFile("audio/voiceover.mp3")} volume={0.96} />
      {gridScenes.map((scene) => (
        <Sequence key={scene.id} from={sec(scene.from, fps)} durationInFrames={sec(scene.duration, fps)} premountFor={fps}>
          <Scene scene={scene} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
