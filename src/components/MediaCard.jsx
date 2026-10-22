// src/components/MediaCard.jsx
// Cover image that quietly plays a short muted loop on hover (or when scrolled
// into view on touch screens). Clicking opens the full piece in the viewer.
import { useEffect, useRef, useState } from "react";
import { useCanHover, useInView, useReducedMotion } from "../hooks.js";

export default function MediaCard({ item, onOpen, variant = "film", label }) {
  const ref = useRef(null);
  const vid = useRef(null);
  const canHover = useCanHover();
  const reduced = useReducedMotion();
  const centred = useInView(ref, { threshold: 0.75 });
  const [hover, setHover] = useState(false);
  const [armed, setArmed] = useState(false);

  const wantPlay = !reduced && !!item.loop && (canHover ? hover : centred);

  useEffect(() => {
    if (wantPlay) setArmed(true);
  }, [wantPlay]);

  useEffect(() => {
    const v = vid.current;
    if (!v) return;
    if (wantPlay) {
      const p = v.play();
      if (p?.catch) p.catch(() => {});
    } else {
      v.pause();
    }
  }, [wantPlay, armed]);

  const isPlayable = item.kind === "video" || item.kind === "youtube";

  return (
    <button
      ref={ref}
      type="button"
      className={`card card--${variant}${wantPlay ? " is-playing" : ""}`}
      onClick={() => onOpen(item)}
      onPointerEnter={(e) => e.pointerType === "mouse" && setHover(true)}
      onPointerLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
      aria-label={`${isPlayable ? "Play" : "Open"} ${item.title}${item.client ? `, ${item.client}` : ""}`}
    >
      <span className="card-media" style={{ aspectRatio: item.ratio || "16/9" }}>
        <img
          src={item.cover || item.thumb}
          alt=""
          loading="lazy"
          decoding="async"
          onError={(e) => (e.currentTarget.style.visibility = "hidden")}
        />
        {armed && item.loop && (
          <video
            ref={vid}
            className="card-loop"
            src={item.loop}
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
            tabIndex={-1}
          />
        )}
        {isPlayable && (
          <span className="card-play" aria-hidden="true">
            <svg viewBox="0 0 24 24"><path d="M8 5.5v13l11-6.5z" /></svg>
          </span>
        )}
        {label && <span className="card-label">{label}</span>}
      </span>
      {variant !== "lead" && (
        <span className="card-meta">
          {item.client && <span className="card-client">{item.client}</span>}
          <span className="card-title">{item.title}</span>
          {variant === "film" && item.tags?.length > 0 && (
            <span className="card-tags">{item.tags.join(", ")}</span>
          )}
        </span>
      )}
    </button>
  );
}
