// src/components/Hand.jsx
// Pen marks, tape and torn edges. Small, quiet pieces that make the page
// feel handled rather than generated.
import { useId, useMemo } from "react";
import { penMark, tapeClip, tornEdge } from "../lib/hand.js";

export function Ink({
  kind = "underline",
  w = 120,
  h = 24,
  color = "var(--marker)",
  size = 6,
  seed = 1,
  draw = false,
  delay = 0,
  duration = 0.5,
  className = "",
  style,
}) {
  const id = useId().replace(/:/g, "");
  const mark = useMemo(() => penMark(kind, w, h, { seed, size }), [kind, w, h, seed, size]);
  const pad = size * 2;
  return (
    <svg
      className={`ink ink--${kind} ${className}`}
      width={w + pad * 2}
      height={h + pad * 2}
      viewBox={`${-pad} ${-pad} ${w + pad * 2} ${h + pad * 2}`}
      style={style}
      aria-hidden="true"
      focusable="false"
    >
      {draw && (
        <defs>
          <mask id={`m${id}`} maskUnits="userSpaceOnUse" x={-pad} y={-pad} width={w + pad * 2} height={h + pad * 2}>
            {mark.centre.map((d, i) => (
              <path
                key={i}
                d={d}
                fill="none"
                stroke="#fff"
                strokeWidth={size * 3}
                strokeLinecap="round"
                strokeLinejoin="round"
                pathLength="1"
                className="ink-draw"
                style={{
                  animationDelay: `${delay + (i * duration) / mark.centre.length}s`,
                  animationDuration: `${duration / mark.centre.length}s`,
                }}
              />
            ))}
          </mask>
        </defs>
      )}
      <g fill={color} mask={draw ? `url(#m${id})` : undefined}>
        {mark.paths.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </g>
    </svg>
  );
}

export function Tape({ seed = 1, w = 110, angle = -4, className = "", style }) {
  const clip = useMemo(() => tapeClip(seed), [seed]);
  return (
    <span
      className={`tape ${className}`}
      aria-hidden="true"
      style={{ width: w, clipPath: clip, transform: `rotate(${angle}deg)`, ...style }}
    />
  );
}

// The page tears from one colour into another.
export function TornEdge({ seed = 5, from = "paper", to = "dark", flip = false, className = "" }) {
  const d = useMemo(() => tornEdge(1440, 46, { seed }), [seed]);
  return (
    <div className={`torn torn--${from}-${to}${flip ? " is-flip" : ""} ${className}`} aria-hidden="true">
      <svg viewBox="0 0 1440 46" preserveAspectRatio="none" focusable="false">
        <path d={d} className="torn-fibre" transform="translate(0,-3)" />
        <path d={d} className="torn-fill" />
      </svg>
    </div>
  );
}

export function Note({ children, angle = -3, color = "yellow", className = "", style }) {
  return (
    <span className={`note note--${color} ${className}`} style={{ transform: `rotate(${angle}deg)`, ...style }}>
      {children}
    </span>
  );
}
