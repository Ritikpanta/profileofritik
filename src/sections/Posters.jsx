// src/sections/Posters.jsx
import { useState } from "react";
import useViewer from "../components/useViewer.jsx";
import { posters } from "../data/work.js";

const FIRST = 16;

export default function Posters({ showAll = false }) {
  const [all, setAll] = useState(showAll);
  const list = all ? posters : posters.slice(0, FIRST);
  const { open, viewer } = useViewer(posters);

  return (
    <section id="posters" className="section posters" aria-labelledby="posters-title">
      <header className="section-head">
        <h2 id="posters-title" className="section-title">Posters &amp; design</h2>
        <p className="section-note">
          Key art for our releases, my movie poster collection, and design for events and
          small businesses.
        </p>
      </header>

      <ul className="poster-wall">
        {list.map((p) => (
          <li key={p.id}>
            <button type="button" className="poster" onClick={() => open(p)} aria-label={`Open ${p.title}`}>
              <img src={p.thumb} alt="" loading="lazy" decoding="async" width={p.w} height={p.h} />
              <span className="poster-cap">
                <span className="poster-title">{p.title}</span>
                {p.client && <span className="poster-client">{p.client}</span>}
              </span>
            </button>
          </li>
        ))}
      </ul>

      {!all && posters.length > FIRST && (
        <div className="more">
          <button type="button" className="btn btn-line" onClick={() => setAll(true)}>
            Show all {posters.length} posters
          </button>
        </div>
      )}
      {viewer}
    </section>
  );
}
