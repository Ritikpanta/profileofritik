// src/components/PoetryReader.jsx
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useLockScroll } from "../hooks.js";

export default function PoetryReader({ poem, onClose }) {
  const closeRef = useRef(null);
  useLockScroll(true);

  useEffect(() => {
    const prev = document.activeElement;
    closeRef.current?.focus({ preventScroll: true });
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      prev?.focus?.({ preventScroll: true });
    };
  }, [onClose]);

  const text = (poem.poem || poem.body || "")
    .split("\n")
    .map((l) => l.trim())
    .join("\n")
    .trim();

  return createPortal(
    <div className="reader" role="dialog" aria-modal="true" aria-label={poem.title} onClick={onClose}>
      <article className="reader-sheet" onClick={(e) => e.stopPropagation()}>
        <button ref={closeRef} type="button" className="icon-btn reader-close" onClick={onClose} aria-label="Close poem">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
        </button>
        <header className="reader-head">
          <h2 className="reader-title" lang="ne">{poem.titleNe || poem.title}</h2>
          <p className="reader-by">
            {poem.title}
            {poem.author ? `, by ${poem.author}` : ""}
          </p>
        </header>
        <pre className="reader-body" lang="ne">{text}</pre>
      </article>
    </div>,
    document.body
  );
}
