// src/components/Print.jsx
// A photo print taped to the page. Videos show a still and quietly play a
// short muted loop on hover (or when scrolled into view on a phone).
import { useEffect, useRef, useState } from "react";
import { useCanHover, useInView, useReducedMotion } from "../hooks.js";
import { Tape } from "./Hand.jsx";

export function useLoopPreview(item) {
  const ref = useRef(null);
  const vid = useRef(null);
  const canHover = useCanHover();
  const reduced = useReducedMotion();
  const centred = useInView(ref, { threshold: 0.7 });
  const [hover, setHover] = useState(false);
  const [armed, setArmed] = useState(false);
  const wantPlay = !reduced && !!item.loop && (canHover ? hover : centred);

  useEffect(() => {
    if (wantPlay) setArmed(true);
  }, [wantPlay]);

  useEffect(() => {
    const v = vid.current;
    if (!v) return;
    if (wantPlay) v.play()?.catch?.(() => {});
    else v.pause();
  }, [wantPlay, armed]);

  const handlers = {
    onPointerEnter: (e) => e.pointerType === "mouse" && setHover(true),
    onPointerLeave: () => setHover(false),
    onFocus: () => setHover(true),
    onBlur: () => setHover(false),
  };
  return { ref, vid, armed, wantPlay, handlers };
}

export function Media({ item, ratio, preview, rotateSideways = false }) {
  const { vid, armed } = preview || {};
  const isPlayable = item.kind === "video" || item.kind === "youtube";
  return (
    <span className={`media${rotateSideways ? " is-sideways" : ""}`} style={ratio ? { aspectRatio: ratio } : undefined}>
      <img
        src={item.cover || item.thumb}
        alt=""
        loading="lazy"
        decoding="async"
        onError={(e) => (e.currentTarget.style.visibility = "hidden")}
      />
      {armed && item.loop && (
        <video ref={vid} className="media-loop" src={item.loop} muted loop playsInline preload="auto" aria-hidden="true" tabIndex={-1} />
      )}
      {isPlayable && (
        <span className="media-play" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <path d="M8.2 5.6c.1-.6.7-.8 1.2-.5l9.2 6c.5.3.5 1 0 1.3l-9.3 6c-.5.3-1.1 0-1.1-.6z" />
          </svg>
        </span>
      )}
    </span>
  );
}

export default function Print({
  item,
  onOpen,
  angle = 0,
  tape = true,
  tapeSeed = 1,
  ratio,
  className = "",
  children,
  label,
}) {
  const preview = useLoopPreview(item);
  const isPlayable = item.kind === "video" || item.kind === "youtube";
  return (
    <figure className={`print ${className}${preview.wantPlay ? " is-playing" : ""}`} style={{ "--a": `${angle}deg` }}>
      {tape && <Tape seed={tapeSeed} w={96} angle={(tapeSeed % 2 ? -1 : 1) * (3 + (tapeSeed % 4))} className="print-tape" />}
      <button
        ref={preview.ref}
        type="button"
        className="print-hit"
        onClick={() => onOpen(item)}
        {...preview.handlers}
        aria-label={label || `${isPlayable ? "Play" : "Open"} ${item.title}`}
      >
        <Media item={item} ratio={ratio || item.ratio} preview={preview} />
      </button>
      {children && <figcaption className="print-cap">{children}</figcaption>}
    </figure>
  );
}
