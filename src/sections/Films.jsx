import Print from "../components/Print.jsx";
import useViewer from "../components/useViewer.jsx";
import { SubHead } from "../components/Heads.jsx";
import { films } from "../data/work.js";

export default function Films() {
  const { open, viewer } = useViewer(films);
  return (
    <section id="films" className="block films" aria-labelledby="films-title">
      <SubHead id="films-title" title="films & stories" width={300} seed={41}
        note="Stories I have written, directed and made into films. Click a film to watch it and read a little about it." />
      <div className="selected-films">
        {films.map((film, i) => (
          <article key={film.id} className={i === 0 ? "selected-film selected-film--lead" : "selected-film"}>
            <Print item={film} onOpen={open} angle={i % 2 ? 0.6 : -0.6} tapeSeed={i + 3} />
            <div className="selected-film-copy">
              <p className="film-credit">{film.tags.join(" · ")}</p>
              <h3 className="hand-title">{film.title}</h3>
              <p>{film.desc}</p>
              <button type="button" className="text-link" onClick={() => open(film)}>watch {film.title} ↗</button>
            </div>
          </article>
        ))}
      </div>
      {viewer}
    </section>
  );
}
