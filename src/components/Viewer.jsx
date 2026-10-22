// src/components/Viewer.jsx
// One viewer for everything: hosted video, YouTube, posters and photos.
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useLockScroll } from "../hooks.js";

function ratioOf(item) {
  if (item.kind === "image" && item.w && item.h) return item.w / item.h;
  const [a, b] = String(item.ratio || "16/9").split("/").map(Number);
  return a / b;
}

export default function Viewer({ items, index, onClose, onIndex }) {
  const open = index !== null && index !== undefined && items[index];
  const closeRef = useRef(null);
  const lastFocus = useRef(null);
  useLockScroll(!!open);

  useEffect(() => {
    if (!open) return;
    lastFocus.current = document.activeElement;
    closeRef.current?.focus({ preventScroll: true });
    return () => lastFocus.current?.focus?.({ preventScroll: true });
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (items.length > 1 && e.key === "ArrowRight") onIndex((index + 1) % items.length);
      if (items.length > 1 && e.key === "ArrowLeft") onIndex((index - 1 + items.length) % items.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, index, items.length, onClose, onIndex]);

  if (!open) return null;
  const item = items[index];
  const r = ratioOf(item);
  const shape = r > 1.2 ? "wide" : r < 0.85 ? "tall" : "square";
  const many = items.length > 1;

  return createPortal(
    <div className="viewer" role="dialog" aria-modal="true" aria-label={item.title}>
      <div className="viewer-backdrop" onClick={onClose} />

      <figure className={`viewer-stage is-${shape}`} style={{ "--r": r }}>
        {item.kind === "video" && (
          <video
            key={item.id}
            src={item.src}
            poster={item.cover}
            controls
            autoPlay
            playsInline
            preload="metadata"
          />
        )}
        {item.kind === "youtube" && (
          <iframe
            key={item.id}
            src={`${item.embed}?autoplay=1&rel=0&modestbranding=1`}
            title={item.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
        {item.kind === "image" && (
          <img key={item.id} src={item.src} alt={item.title} width={item.w} height={item.h} />
        )}
      </figure>

      <aside className="viewer-info">
        {(item.client || item.shoot) && (
          <p className="viewer-client">{item.client || item.shoot}</p>
        )}
        <h2 className="viewer-title">{item.title}</h2>
        {item.titleNe && <p className="viewer-title-ne" lang="ne">{item.titleNe}</p>}
        {item.desc && <p className="viewer-desc">{item.desc}</p>}
        {item.tags?.length > 0 && (
          <ul className="tags">
            {item.tags.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        )}
        {many && (
          <p className="viewer-count">
            {index + 1} of {items.length}
          </p>
        )}
      </aside>

      <div className="viewer-controls">
        {many && (
          <>
            <button
              type="button"
              className="icon-btn"
              onClick={() => onIndex((index - 1 + items.length) % items.length)}
              aria-label="Previous"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" /></svg>
            </button>
            <button
              type="button"
              className="icon-btn"
              onClick={() => onIndex((index + 1) % items.length)}
              aria-label="Next"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" /></svg>
            </button>
          </>
        )}
        <button ref={closeRef} type="button" className="icon-btn" onClick={onClose} aria-label="Close">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
        </button>
      </div>
    </div>,
    document.body
  );
}
