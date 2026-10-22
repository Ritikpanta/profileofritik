// src/sections/Reels.jsx
import { useRef } from "react";
import MediaCard from "../components/MediaCard.jsx";
import useViewer from "../components/useViewer.jsx";
import { reels } from "../data/work.js";

export default function Reels() {
  const { open, viewer } = useViewer(reels);
  const track = useRef(null);

  const nudge = (dir) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector("li");
    const step = card ? card.getBoundingClientRect().width + 20 : 280;
    el.scrollBy({ left: dir * step * 2, behavior: "smooth" });
  };

  return (
    <section id="reels" className="section reels" aria-labelledby="reels-title">
      <header className="section-head section-head--row">
        <div>
          <h2 id="reels-title" className="section-title">Reels &amp; brand work</h2>
          <p className="section-note">
            Vertical edits for brands, colleges and events, plus a few of my own.
          </p>
        </div>
        <div className="scroll-btns">
          <button type="button" className="icon-btn" onClick={() => nudge(-1)} aria-label="Scroll reels left">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" /></svg>
          </button>
          <button type="button" className="icon-btn" onClick={() => nudge(1)} aria-label="Scroll reels right">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      </header>

      <ul className="reel-track" ref={track}>
        {reels.map((r) => (
          <li key={r.id}>
            <MediaCard item={r} onOpen={open} variant="reel" />
          </li>
        ))}
      </ul>
      {viewer}
    </section>
  );
}
