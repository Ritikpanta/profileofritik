// src/sections/PoetryRow.jsx
import { useState } from "react";
import PoetryReader from "../components/PoetryReader.jsx";

export default function PoetryRow({ items = [] }) {
  const [active, setActive] = useState(null);
  if (!items.length) return null;

  return (
    <section id="poems" className="poems" aria-labelledby="poems-title">
      <div className="poems-inner">
        <header className="section-head">
          <h2 id="poems-title" className="section-title">
            Poems <span lang="ne" className="poems-ne">कविता</span>
          </h2>
          <p className="section-note">
            I carry a notebook everywhere. These are a few pages from it, written in Nepali.
          </p>
        </header>

        <ul className="poem-list">
          {items.map((p, i) => (
            <li key={p.id} style={{ "--tilt": `${[-1.2, 0.8, -0.5][i % 3]}deg` }}>
              <button type="button" className="poem-card" onClick={() => setActive(p)}>
                <span className="poem-photo">
                  <img src={p.thumbnail} alt="" loading="lazy" />
                </span>
                <span className="poem-title" lang="ne">{p.titleNe || p.title}</span>
                <span className="poem-meaning">
                  {p.title}
                  {p.meaning ? `, ${p.meaning.toLowerCase()}` : ""}
                </span>
                <span className="poem-excerpt" lang="ne">{p.excerpt}</span>
                <span className="poem-read">Read the poem</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
      {active && <PoetryReader poem={active} onClose={() => setActive(null)} />}
    </section>
  );
}
