import { useState, useId } from "react";
import PoetryModal from "./PoetryModal";

export default function PoetryCard({ poem }) {
  const [open, setOpen] = useState(false);
  const imgId = useId();

  return (
    <>
      <article className="poetry-card" onClick={() => setOpen(true)}>
        <div className="thumb-wrap">
          <img
            src={poem.thumbnail}
            alt={poem.title}
            loading="lazy"
            onError={(e) => (e.currentTarget.src = "/poetry/placeholder.jpg")}
          />
        </div>
        <div className="poetry-meta">
          <h3 className="poetry-title">{poem.title}</h3>
          <p className="poetry-excerpt">{poem.excerpt}</p>
          <div className="poetry-tags">
            {(poem.tags || []).map((t) => (
              <span key={`${imgId}-${t}`} className="chip">{t}</span>
            ))}
          </div>
        </div>
      </article>

      {open && <PoetryModal poem={poem} onClose={() => setOpen(false)} />}
    </>
  );
}
