// src/sections/Sketchbook.jsx
// Photographs of notebook pages, laid on the desk the way they'd land.
import useViewer from "../components/useViewer.jsx";
import { SubHead } from "../components/Heads.jsx";
import { Tape } from "../components/Hand.jsx";
import Print from "../components/Print.jsx";
import { sketches, animationProjects } from "../data/work.js";
import { tilt } from "../lib/hand.js";
import { deal, ratioOf, useColumnCount } from "../components/Columns.jsx";

const STEPS = [
  [760, 3],
  [330, 2],
];

export default function Sketchbook() {
  const { open, viewer } = useViewer([...animationProjects, ...sketches]);
  const [ref, n] = useColumnCount(STEPS);
  const piles = deal(sketches, n, (s) => ratioOf(s) + 0.1, n === 3 ? [0, 0.12, 0.04] : [0, 0.1]);

  return (
    <section id="sketchbook" className="block sketchbook" aria-labelledby="sketchbook-title">
      <SubHead
        id="sketchbook-title"
        title="sketchbook & animation"
        width={450}
        seed={61}
        note="Some ideas stay in my notebook, some become songs or animation. These are the drawings and the stories I make from them."
      />

      <div className="animation-grid">
        {animationProjects.map((item, i) => (
          <Print key={item.id} item={item} onOpen={open} angle={i % 2 ? 1 : -1} tapeSeed={i + 40} ratio={item.ratio === "9/16" ? "4/5" : item.ratio}>
            <span className="hand-title">{item.title}</span>
            <span className="typed">{item.desc}</span>
          </Print>
        ))}
      </div>
      <h3 className="notebook-pages-title">a few pages behind the ideas</h3>
      <div className="desk cols" ref={ref}>
        {piles.map((pile, c) => (
          <ul key={c} className="col" style={{ paddingTop: `${(pile.offset / n) * 100}%` }}>
            {pile.items.map(({ item: s, index: i }) => (
              <li key={s.id} style={{ "--a": `${tilt(i, 3.2, 71)}deg` }}>
                <button type="button" className="page" onClick={() => open(s)} aria-label={`Open ${s.title}`}>
                  <img src={s.thumb} alt="" loading="lazy" decoding="async" width={s.w} height={s.h} />
                </button>
                {i % 3 !== 1 && (
                  <Tape seed={i + 30} w={84} angle={i % 2 ? 8 : -7} className={`page-tape${i % 2 ? " is-right" : ""}`} />
                )}
              </li>
            ))}
          </ul>
        ))}
      </div>
      {viewer}
    </section>
  );
}
