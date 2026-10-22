// src/sections/DeanSeries.jsx
import MediaCard from "../components/MediaCard.jsx";
import useViewer from "../components/useViewer.jsx";
import { deanSeries } from "../data/work.js";

const weekly = deanSeries.episodes.filter((e) => e.ratio === "9/16");
const opener = deanSeries.episodes.find((e) => e.ratio !== "9/16");
const [artwork, story, portrait] = deanSeries.stills;
const all = [...weekly, opener, artwork, story, portrait];

export default function DeanSeries() {
  const { open, viewer } = useViewer(all);

  return (
    <section id="dean" className="dean" aria-labelledby="dean-title">
      <div className="perfs" aria-hidden="true" />
      <div className="dean-inner">
        <div className="dean-copy">
          <p className="dean-client">For {deanSeries.client}</p>
          <h2 id="dean-title" className="section-title dean-title">{deanSeries.title}</h2>
          <p className="dean-intro">{deanSeries.intro}</p>
          <button type="button" className="btn btn-line" onClick={() => open(weekly[0])}>
            Watch an episode
          </button>
        </div>

        <div className="dean-work">
          <ol className="dean-episodes">
            {weekly.map((ep) => (
              <li key={ep.id}>
                <MediaCard item={{ ...ep, client: undefined }} onOpen={() => open(ep)} variant="episode" />
                <p className="ep-desc">{ep.desc}</p>
              </li>
            ))}
          </ol>

          <ul className="dean-extras">
            <li>
              <MediaCard item={{ ...opener, client: undefined }} onOpen={() => open(opener)} variant="square" />
            </li>
            {[artwork, portrait].map((s) => (
              <li key={s.id}>
                <button type="button" className="card card--square" onClick={() => open(s)} aria-label={`Open ${s.title}`}>
                  <span className="card-media" style={{ aspectRatio: "1/1" }}>
                    <img src={s.thumb} alt="" loading="lazy" />
                  </span>
                  <span className="card-meta">
                    <span className="card-title">{s.title}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="perfs perfs--bottom" aria-hidden="true" />
      {viewer}
    </section>
  );
}
