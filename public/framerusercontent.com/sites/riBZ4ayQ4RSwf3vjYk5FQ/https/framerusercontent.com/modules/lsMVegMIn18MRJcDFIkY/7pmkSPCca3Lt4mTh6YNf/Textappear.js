import { jsx as _jsx } from "react/jsx-runtime";
import { useRef, useEffect, useState } from "react";
import { addPropertyControls, ControlType, RenderTarget } from "framer";
export default function StickyBlurReveal(props) {
  const {
    text = "This text unblurs and fades in word by word as you scroll",
    color = "#000000",
    font = { fontFamily: "Inter", fontWeight: 400 },
    fontSize = 24,
    lineHeight = 1.5,
    fullRevealDistance = 1e3,
    useVhUnits = false,
    revealStartOffset = 0,
    initialBlur = 3,
    initialOpacity = 0.1,
    resetOnExit = false,
  } = props;
  const containerRef = useRef(null);
  const words = (text || "").trim().split(/\s+/);
  const isCanvas = RenderTarget.current() === RenderTarget.canvas; // progress + latch
  const [progress, setProgress] = useState(0);
  const hasCompletedRef = useRef(false); // cached metrics that don't break when sticky
  const metricsRef = useRef({
    startY: 0,
    height: 1,
    revealDistancePx: 1e3,
    startOffsetPx: 0,
  });
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const toPx = (val) => (useVhUnits ? (val / 100) * window.innerHeight : val);
  const computeMetrics = () => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    metricsRef.current = {
      startY: window.scrollY + rect.top,
      height: Math.max(1, rect.height),
      revealDistancePx: Math.max(1, toPx(fullRevealDistance)),
      startOffsetPx: toPx(revealStartOffset),
    };
  };
  const computeProgress = () => {
    const { startY, height, revealDistancePx, startOffsetPx } =
      metricsRef.current;
    const currentScroll = window.scrollY;
    const elementTop = startY - currentScroll;
    const visibleHeight = window.innerHeight - elementTop;
    const adjusted = visibleHeight - startOffsetPx;
    const raw = (adjusted - height) / (revealDistancePx - height);
    const p = clamp(raw, 0, 1);
    setProgress(p);
    if (p >= 1) hasCompletedRef.current = true;
  };
  useEffect(() => {
    if (isCanvas) return; // measure once it’s in the DOM
    computeMetrics();
    computeProgress();
    const onScroll = () => computeProgress();
    const onResize = () => {
      computeMetrics();
      computeProgress();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [fullRevealDistance, useVhUnits, revealStartOffset, isCanvas]);
  const effective = isCanvas
    ? 1
    : hasCompletedRef.current && !resetOnExit
    ? 1
    : progress;
  return /*#__PURE__*/ _jsx("div", {
    ref: containerRef,
    style: {
      position: "sticky",
      top: 0,
      color,
      fontFamily: font?.fontFamily,
      fontWeight: font?.fontWeight,
      fontSize: `${fontSize}px`,
      lineHeight,
      opacity: 1,
      textAlign: "left",
      willChange: "filter, opacity",
    },
    children: words.map((word, index) => {
      const wordProgress = (effective - index / words.length) * words.length;
      const p = clamp(wordProgress, 0, 1);
      const blurAmount = initialBlur * (1 - p);
      const wordOpacity = initialOpacity + (1 - initialOpacity) * p;
      return /*#__PURE__*/ _jsx(
        "span",
        {
          style: {
            display: "inline-block",
            marginRight: "0.25em",
            filter: `blur(${blurAmount}px)`,
            opacity: wordOpacity,
            transition: "filter 0.2s ease-out, opacity 0.2s ease-out",
          },
          children: word,
        },
        `${word}-${index}`
      );
    }),
  });
}
/* ------- Framer controls ------- */ StickyBlurReveal.defaultProps = {
  text: "This text unblurs and fades in word by word as you scroll",
  color: "#000000",
  font: { fontFamily: "Inter", fontWeight: 400 },
  fontSize: 24,
  lineHeight: 1.5,
  fullRevealDistance: 1e3,
  useVhUnits: false,
  revealStartOffset: 0,
  initialBlur: 3,
  initialOpacity: 0.1,
  resetOnExit: false,
};
addPropertyControls(StickyBlurReveal, {
  text: { type: ControlType.String, title: "Text" },
  color: { type: ControlType.Color, title: "Color" },
  font: { type: ControlType.Font, title: "Font" },
  fontSize: { type: ControlType.Number, title: "Font Size", min: 1, max: 160 },
  lineHeight: {
    type: ControlType.Number,
    title: "Line Height",
    min: 0.5,
    max: 3,
    step: 0.1,
  },
  fullRevealDistance: {
    type: ControlType.Number,
    title: "Full Reveal Distance",
    min: 10,
    max: 5e3,
    step: 10,
    displayStepper: true,
  },
  useVhUnits: {
    type: ControlType.Boolean,
    title: "Use Viewport Height (vh)",
    defaultValue: false,
  },
  revealStartOffset: {
    type: ControlType.Number,
    title: "Reveal Start Offset",
    min: 0,
    max: 2e3,
    step: 10,
    displayStepper: true,
  },
  initialBlur: {
    type: ControlType.Number,
    title: "Initial Blur",
    min: 0,
    max: 10,
    step: 0.5,
  },
  initialOpacity: {
    type: ControlType.Number,
    title: "Initial Opacity",
    min: 0,
    max: 1,
    step: 0.05,
  },
  resetOnExit: {
    type: ControlType.Boolean,
    title: "Reset On Exit",
    defaultValue: false,
  },
});
export const __FramerMetadata__ = {
  exports: {
    default: {
      type: "reactComponent",
      name: "StickyBlurReveal",
      slots: [],
      annotations: { framerContractVersion: "1" },
    },
    __FramerMetadata__: { type: "variable" },
  },
};
//# sourceMappingURL=./Textappear.map
