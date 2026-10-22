// src/sections/Photos.jsx
import { useState } from "react";
import useViewer from "../components/useViewer.jsx";
import { photos } from "../data/work.js";

const FIRST = 14;

export default function Photos({ showAll = false }) {
  const [all, setAll] = useState(showAll);
  const list = all ? photos : photos.slice(0, FIRST);
  const { open, viewer } = useViewer(photos);

  return (
    <section id="photos" className="section photos" aria-labelledby="photos-title">
      <header className="section-head">
        <h2 id="photos-title" className="section-title">Photographs</h2>
        <p className="section-note">
          Stills from shoots and events, and the everyday moments I can’t walk past.
        </p>
      </header>

      <ul className="photo-rows">
        {list.map((p) => {
          const r = p.w / p.h;
          return (
            <li key={p.id} style={{ "--r": r }}>
              <button type="button" className="photo" onClick={() => open(p)} aria-label={`Open ${p.title}, ${p.shoot}`}>
                <i style={{ paddingBottom: `${(1 / r) * 100}%` }} aria-hidden="true" />
                <img src={p.thumb} alt="" loading="lazy" decoding="async" />
                <span className="photo-cap">{p.shoot}</span>
              </button>
            </li>
          );
        })}
      </ul>

      {!all && photos.length > FIRST && (
        <div className="more">
          <button type="button" className="btn btn-line" onClick={() => setAll(true)}>
            Show all {photos.length} photographs
          </button>
        </div>
      )}
      {viewer}
    </section>
  );
}
