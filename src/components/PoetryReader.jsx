import { useEffect } from "react";

export default function PoetryReader({ poem, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div className="poetry-reader-backdrop" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="poetry-reader" onClick={(e) => e.stopPropagation()}>
        <button className="close-x" aria-label="Close" onClick={onClose}>×</button>

        <img
          className="cover"
          src={poem.thumbnail}
          alt=""
          onError={(e) => (e.currentTarget.src = "/poetry/placeholder.jpg")}
        />

        <h3 className="reader-title">{poem.title}</h3>
        {poem.author && <p className="reader-author">by {poem.author}</p>}

        <article className="reader-body">
          <pre className="poem">{poem.poem || poem.body}</pre>
        </article>
      </div>
    </div>
  );
}
