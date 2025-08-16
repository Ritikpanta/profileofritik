import { useState } from "react";
import PoetryReader from "./PoetryReader.jsx";

export default function PoetryMiniCard({ poem }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <article className="poetry-mini-card" onClick={() => setOpen(true)}>
        <div className="thumb">
          <img
            src={poem.thumbnail}
            alt={poem.title}
            loading="lazy"
            onError={(e) => (e.currentTarget.src = "/poetry/baato.png")}
          />
        </div>

        <div className="meta">
          <h3 className="title">{poem.title}</h3>
          <p className="excerpt">
            {poem.excerpt ?? poem.poem?.slice(0, 90) + "…"}
          </p>
          <button
            className="read-btn"
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setOpen(true);
            }}
          >
            Read
          </button>
        </div>
      </article>

      {open && <PoetryReader poem={poem} onClose={() => setOpen(false)} />}
    </>
  );
}
