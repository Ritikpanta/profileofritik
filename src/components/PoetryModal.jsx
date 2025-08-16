import { useEffect, useRef } from "react";

export default function PoetryModal({ poem, onClose }) {
  const dialogRef = useRef(null);

  // close on ESC & lock scroll
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose?.();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div className="poetry-modal" role="dialog" aria-modal="true" ref={dialogRef} onClick={onClose}>
      <div className="poetry-sheet" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" aria-label="Close" onClick={onClose}>×</button>
        <header className="sheet-head">
          <img
            className="sheet-cover"
            src={poem.thumbnail}
            alt=""
            onError={(e) => (e.currentTarget.src = "/poetry/placeholder.jpg")}
          />
          <h3 className="sheet-title">{poem.title}</h3>
        </header>
        <article className="sheet-body">
          <pre className="poem">{poem.body}</pre>
        </article>
      </div>
    </div>
  );
}
