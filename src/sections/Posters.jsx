// src/sections/Posters.jsx
import { useState } from "react";
import useViewer from "../components/useViewer.jsx";
import { SubHead } from "../components/Heads.jsx";
import { Ink, Tape } from "../components/Hand.jsx";
import { posters } from "../data/work.js";
import { tilt } from "../lib/hand.js";
import { deal, ratioOf, useColumnCount } from "../components/Columns.jsx";

const STEPS = [
  [900, 4],
  [600, 3],
  [0, 2],
];

const FIRST = 12;

export default function Posters({ showAll = false }) {
  const [all, setAll] = useState(showAll);
  const list = all ? posters : posters.slice(0, FIRST);
  const { open, viewer } = useViewer(posters);
  const [ref, n] = useColumnCount(STEPS);
  const piles = deal(list, n, (p) => ratioOf(p) + 0.3);

  return (
    <section id="posters" className="block posters" aria-labelledby="posters-title">
      <SubHead
        id="posters-title"
        title="posters"
        width={150}
        seed={81}
        note="Posters for my films and songs, some for films that are still in my head, and a few designs I made."
      />

      <div className="wall cols" ref={ref}>
        {piles.map((pile, c) => (
          <ul key={c} className="col">
            {pile.items.map(({ item: p, index: i }) => (
              <li key={p.id} style={{ "--a": `${tilt(i, 1.8, 91)}deg` }}>
                <Tape seed={i + 50} w={78} angle={tilt(i, 9, 3)} className="wall-tape" />
                <button type="button" className="wall-poster" onClick={() => open(p)} aria-label={`Open ${p.title}`}>
                  <img src={p.thumb} alt="" loading="lazy" decoding="async" width={p.w} height={p.h} />
                </button>
                <span className="wall-cap">{p.title}</span>
              </li>
            ))}
          </ul>
        ))}
      </div>

      {!all && posters.length > FIRST && (
        <p className="more">
          <button type="button" className="hand-btn" onClick={() => setAll(true)}>
            see more posters
            <Ink kind="underline" w={190} h={12} size={3.4} seed={88} className="hand-btn-under" />
          </button>
        </p>
      )}
      {viewer}
    </section>
  );
}
