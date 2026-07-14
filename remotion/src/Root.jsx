import {Composition} from "remotion";
import {Explainer} from "./Explainer.jsx";

export const RemotionRoot = () => {
  return (
    <Composition
      id="AgenticAutomotiveExplainer"
      component={Explainer}
      durationInFrames={1800}
      fps={30}
      width={1920}
      height={1080}
      defaultProps={{
        title: "Agentic Automotive",
      }}
    />
  );
};
