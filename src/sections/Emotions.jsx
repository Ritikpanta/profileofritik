// src/sections/Emotions.jsx
// "I capture emotions": proposals, graduations, family days. Shot like small
// films, so the people in them can come back years later and feel it again.
// It opens the dark side of the page, just before the commercial shelves.
import { PartHead } from "../components/Heads.jsx";
import { Media, useLoopPreview } from "../components/Print.jsx";
import useViewer from "../components/useViewer.jsx";
import { Shelf, Thumb } from "./ClientWork.jsx";
import { emotionFilms, emotionStills } from "../data/work.js";

function EmotionFilm({ film, n, lead, onOpen }) {
  const preview = useLoopPreview(film);
  return (
    <article className={`emotion${lead ? " emotion--lead" : ""}${preview.wantPlay ? " is-playing" : ""}`}>
      <button
        ref={preview.ref}
        type="button"
        className="emotion-hit"
        onClick={() => onOpen(film)}
        {...preview.handlers}
        aria-label={`Play ${film.title}`}
      >
        <Media item={film} ratio={film.ratio} preview={preview} />
      </button>
      <div className="emotion-copy">
        <p className="emotion-n" aria-hidden="true">0{n}</p>
        <p className="emotion-tags">{film.tags.join(" · ")}</p>
        <h3 className="emotion-title">{film.title}</h3>
        <p className="emotion-desc">{film.desc}</p>
        {lead && (
          <button type="button" className="emotion-watch" onClick={() => onOpen(film)}>
            watch it with sound
          </button>
        )}
      </div>
    </article>
  );
}

export default function Emotions() {
  const films = useViewer(emotionFilms);
  const stills = useViewer(emotionStills);
  const [lead, ...rest] = emotionFilms;
  const items = emotionStills;

  return (
    <section id="emotions" className="client-work emotions" aria-labelledby="emotions-title">
      <div className="client-work-inner">
        <PartHead id="emotions-title" ne="भावना" en="I capture emotions" seed={127} tone="dark" />
        <p className="client-intro emotions-intro">
          Some days only happen once. A proposal by the harbour, a graduation, a baby’s
          first milk shower. I don’t just film what happened, I try to keep how it felt,
          so the people in it can come back in twenty years and feel it all again.
        </p>

        <div className="emotion-films">
          {lead && <EmotionFilm film={lead} n={1} lead onOpen={films.open} />}
          {rest.length > 0 && (
            <div className="emotion-pair">
              {rest.map((f, i) => (
                <EmotionFilm key={f.id} film={f} n={i + 2} onOpen={films.open} />
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="emotion-stills">
            <header className="emotion-stills-head">
              <h3 className="emotion-stills-title">photography</h3>
              <p className="emotion-stills-note">
                I photograph these days too, so you get the film and the photos to keep. These are
                from the same shoots. Click any one to see it bigger.
              </p>
            </header>
            <Shelf label="Photographs from proposals and graduations" id="emotion-stills">
              {items.map((it) => (
                <Thumb key={it.id} item={it} onOpen={stills.open} />
              ))}
            </Shelf>
          </div>
        )}
      </div>
      {films.viewer}
      {stills.viewer}
    </section>
  );
}
