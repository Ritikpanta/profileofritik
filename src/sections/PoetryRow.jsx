// src/sections/PoetryRow.jsx
// Nepali poems, as pages torn out of a spiral notebook.
import { useState } from "react";
import PoetryReader from "../components/PoetryReader.jsx";
import { SubHead } from "../components/Heads.jsx";
import { tornTopClip } from "../lib/hand.js";
import Print from "../components/Print.jsx";
import useViewer from "../components/useViewer.jsx";
import { poemFilms } from "../data/work.js";

const firstLines = (text, n = 6) =>
  (text || "")
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .slice(0, n);

export default function PoetryRow({ items = [] }) {
  const [active, setActive] = useState(null);
  const { open, viewer } = useViewer(poemFilms);
  if (!items.length) return null;

  return (
    <section id="poems" className="block poems" aria-labelledby="poems-title">
      <SubHead id="poems-title" title="nepali poems" width={250} seed={121} note="I write my poems in Nepali. Here are a few of them.">
        <p className="poems-ne" lang="ne">कविता</p>
      </SubHead>

      {poemFilms.map((f) => (
        <article key={f.id} className="poem-film">
          <Print item={f} onOpen={open} angle={-0.5} tapeSeed={7} />
          <div className="poem-film-copy">
            <p className="film-credit">{f.tags.join(" · ")}</p>
            <h3 className="poem-film-ne" lang="ne">{f.titleNe}</h3>
            <p className="hand-title">{f.title}</p>
            <p className="typed">{f.desc}</p>
            <button type="button" className="text-link" onClick={() => open(f)}>
              watch the poem
            </button>
          </div>
        </article>
      ))}

      <ul className="torn-pages">
        {items.map((p, i) => (
          <li key={p.id} style={{ "--a": `${[-2.4, 1.6, -0.8][i % 3]}deg` }}>
            <button type="button" className="torn-page" style={{ clipPath: tornTopClip(i + 4) }} onClick={() => setActive(p)} aria-label={`Read ${p.title}`}>
              <span className="torn-page-title" lang="ne">{p.titleNe || p.title}</span>
              <span className="torn-page-gloss">{p.title}{p.meaning ? `, ${p.meaning.toLowerCase()}` : ""}</span>
              <span className="torn-page-lines" lang="ne">
                {firstLines(p.poem || p.body).map((l, k) => (
                  <span key={k}>{l}</span>
                ))}
              </span>
              <span className="torn-page-more">
                <span lang="ne">पूरा पढ्नुहोस्</span> (read the whole poem)
              </span>
            </button>
          </li>
        ))}
      </ul>
      {active && <PoetryReader poem={active} onClose={() => setActive(null)} />}
      {viewer}
    </section>
  );
}
