// src/sections/Films.jsx
import Print from "../components/Print.jsx";
import useViewer from "../components/useViewer.jsx";
import { SubHead } from "../components/Heads.jsx";
import { Ink } from "../components/Hand.jsx";
import { earlierFilms, films } from "../data/work.js";
import { tilt } from "../lib/hand.js";
import { deal, ratioOf, useColumnCount } from "../components/Columns.jsx";

const STEPS = [
  [860, 3],
  [520, 2],
];
const OFFSETS = { 3: [0, 0.45, 0.15], 2: [0, 0.3] };
// portrait films are shown as 4:5 prints, they'd tower over the rest at 9:16
const shown = (f) => (f.ratio === "9/16" ? "4/5" : f.ratio);

const all = [...films, ...earlierFilms];

export default function Films() {
  const { open, viewer } = useViewer(all);
  const [lead, ...rest] = films;
  const [ref, n] = useColumnCount(STEPS);
  const piles = deal(rest, n, (f) => ratioOf({ ratio: shown(f) }) + 0.36, OFFSETS[n]);

  return (
    <section id="films" className="block films" aria-labelledby="films-title">
      <SubHead
        id="films-title"
        title="films"
        width={110}
        seed={41}
        note="Short films, an animation, a music visual and a few edits. Hover to see them move, click to watch."
      />

      <article className="film-lead">
        <Print item={lead} onOpen={open} angle={-1.2} tapeSeed={3} className="film-lead-print" />

        <ol className="storyboard" aria-label={`Frames from ${lead.title}`}>
          {(lead.frames || []).map((src, i) => (
            <li key={src} style={{ "--a": `${tilt(i, 2.2, 5)}deg` }}>
              <img src={src} alt="" loading="lazy" />
              <span className="storyboard-n">{i + 1}</span>
            </li>
          ))}
        </ol>

        <div className="film-lead-text">
          <h4 className="hand-title">{lead.title}</h4>
          <p className="film-lead-ne" lang="ne">{lead.titleNe}</p>
          <p className="typed">{lead.desc}</p>
          {lead.tags?.length > 0 && <p className="typed small">{lead.tags.join(", ")}</p>}
          <button type="button" className="hand-btn" onClick={() => open(lead)}>
            watch it
            <Ink kind="circle" w={128} h={50} size={3} seed={17} className="hand-btn-ink" />
          </button>
        </div>
      </article>

      <div className="film-scatter cols" ref={ref}>
        {piles.map((pile, c) => (
          <div key={c} className="col" style={{ paddingTop: `${(pile.offset / n) * 100}%` }}>
            {pile.items.map(({ item: f, index: i }) => (
              <Print key={f.id} item={f} onOpen={open} angle={tilt(i, 1.6, 21)} tapeSeed={i + 10} ratio={shown(f)}>
                <span className="hand-title">{f.title}</span>
                <span className="typed">{f.desc}</span>
              </Print>
            ))}
          </div>
        ))}
      </div>

      <div className="earlier">
        <h4 className="earlier-title">
          earlier, on YouTube
          <Ink kind="arrow" w={56} h={34} size={2.8} seed={52} color="var(--biro)" className="earlier-arrow" />
        </h4>
        <div className="earlier-row">
          {earlierFilms.map((f, i) => (
            <Print key={f.id} item={f} onOpen={open} angle={tilt(i, 2, 33)} tape={false} className="print--small">
              <span className="hand-title">{f.title}</span>
            </Print>
          ))}
        </div>
      </div>
      {viewer}
    </section>
  );
}
