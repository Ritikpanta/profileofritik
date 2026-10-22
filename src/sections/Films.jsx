// src/sections/Films.jsx
import MediaCard from "../components/MediaCard.jsx";
import useViewer from "../components/useViewer.jsx";
import { films } from "../data/work.js";

export default function Films() {
  const { open, viewer } = useViewer(films);
  const recent = films.filter((f) => !f.earlier);
  const earlier = films.filter((f) => f.earlier);
  const [lead, ...rest] = recent;

  return (
    <section id="films" className="section films" aria-labelledby="films-title">
      <header className="section-head">
        <h2 id="films-title" className="section-title">Films &amp; music videos</h2>
        <p className="section-note">
          Short films I’ve written and directed, music videos, and the event films we shoot at
          ChitraKatha. Hover to preview, click to watch.
        </p>
      </header>

      <article className="film-lead">
        <MediaCard item={lead} onOpen={open} variant="lead" />
        <div className="film-lead-text">
          {lead.tags && <p className="film-lead-tags">{lead.tags.join(", ")}</p>}
          <h3 className="film-lead-title">{lead.title}</h3>
          {lead.titleNe && <p className="film-lead-ne" lang="ne">{lead.titleNe}</p>}
          <p className="film-lead-desc">{lead.desc}</p>
          <button type="button" className="btn btn-solid" onClick={() => open(lead)}>
            Watch the film
          </button>
        </div>
      </article>

      <div className="film-grid">
        {rest.map((f) => (
          <MediaCard key={f.id} item={f} onOpen={open} variant="film" />
        ))}
      </div>

      {earlier.length > 0 && (
        <>
          <h3 className="sub-title">Earlier short films</h3>
          <div className="film-grid film-grid--small">
            {earlier.map((f) => (
              <MediaCard key={f.id} item={f} onOpen={open} variant="small" />
            ))}
          </div>
        </>
      )}
      {viewer}
    </section>
  );
}
