// src/sections/Films.jsx
// The films I wrote and directed, then the small slice-of-life pieces.
import Print from "../components/Print.jsx";
import useViewer from "../components/useViewer.jsx";
import { SubHead } from "../components/Heads.jsx";
import { directorReels, films, sliceOfLife } from "../data/work.js";

const all = [...films, ...sliceOfLife, ...directorReels];

export default function Films() {
  const { open, viewer } = useViewer(all);
  return (
    <section id="films" className="block films" aria-labelledby="films-title">
      <SubHead
        id="films-title"
        title="films & stories"
        width={300}
        seed={41}
        note="Stories I have written, directed and made into films. Click a film to watch it and read a little about it."
      />

      <div className="selected-films">
        {films.map((film, i) => (
          <article key={film.id} className={i === 0 ? "selected-film selected-film--lead" : "selected-film"}>
            <Print
              item={film}
              onOpen={open}
              angle={i === 0 ? -0.6 : 0}
              tape={i === 0}
              tapeSeed={i + 3}
              ratio={film.ratio === "9/16" ? "4/5" : film.ratio}
            />
            <div className="selected-film-copy">
              <p className="film-credit">{film.tags.join(" · ")}</p>
              <h3 className="hand-title">{film.title}</h3>
              <p>{film.desc}</p>
              <button type="button" className="text-link" onClick={() => open(film)}>
                watch {film.title}
              </button>
            </div>
          </article>
        ))}
      </div>

      {sliceOfLife.length > 0 && (
        <div className="slice">
          <header className="slice-head">
            <h3 className="slice-title">slice of life</h3>
            <p className="slice-note">Some small videos from my everyday life. Nothing big, just moments I wanted to keep.</p>
          </header>
          <div className="slice-grid">
            {sliceOfLife.map((f) => (
              <Print key={f.id} item={f} onOpen={open} tape={false}>
                <span className="slice-name">{f.title}</span>
                {f.titleNe && <span className="slice-ne" lang="ne">{f.titleNe}</span>}
                <span className="typed">{f.desc}</span>
              </Print>
            ))}
          </div>
        </div>
      )}
      {directorReels.length > 0 && (
        <div className="slice slice--director">
          <header className="slice-head">
            <h3 className="slice-title">behind the camera</h3>
            <p className="slice-note">Me as a director. How we plan, shoot and talk about our films.</p>
          </header>
          <div className="slice-grid slice-grid--four">
            {directorReels.map((f) => (
              <Print key={f.id} item={f} onOpen={open} tape={false} ratio="4/5">
                <span className="slice-name">{f.title}</span>
                <span className="typed">{f.desc}</span>
              </Print>
            ))}
          </div>
        </div>
      )}
      {viewer}
    </section>
  );
}
