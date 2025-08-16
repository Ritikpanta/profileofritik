// src/components/Row.jsx
import { useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";
import ProjectCard from "./ProjectCard.jsx";
import Lightbox from "./Lightbox.jsx"; // <-- add this file if you don’t have it

export default function Row({ title, items = [], seeAllTo }) {
  const isVideoRow = title?.toLowerCase() === "videography";
  const [playingId, setPlayingId] = useState(null);
  const [activeItem, setActiveItem] = useState(null); // <-- for image expand

  const trackRef = useRef(null);
  const scrollByCards = (dir = 1) => {
    const el = trackRef.current;
    if (!el) return;
    const first = el.querySelector(".snap");
    const cardW = first ? first.getBoundingClientRect().width : 320;
    el.scrollBy({ left: dir * (cardW + 20) * 2, behavior: "smooth" });
  };

  useEffect(() => {
    if (!activeItem) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [activeItem]);

  const handleOpen = (item) => {
    if (isVideoRow) return; // videos play inline
    setActiveItem(item);
  };

  return (
    <section className="row">
      <header className="row-head">
        <h3>{title}</h3>
        {seeAllTo && <a className="see-all" href={seeAllTo}>See all →</a>}
      </header>

      <div className="tray">
        <div className="fade left" />
        <div className="fade right" />
        <button className="arrow left"  type="button" aria-label="Scroll left"  onClick={() => scrollByCards(-1)}>‹</button>
        <button className="arrow right" type="button" aria-label="Scroll right" onClick={() => scrollByCards(1)}>›</button>

        <div
          ref={trackRef}
          className="scroller"
          onWheel={(e) => {
            if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) {
              trackRef.current?.scrollBy({ left: e.deltaY, behavior: "auto" });
            }
          }}
        >
          {items.map((it) => (
            <div className="snap" key={it.id || it.title}>
              <ProjectCard
                item={it}
                mode={isVideoRow ? "video" : "image"}
                playing={isVideoRow && playingId === (it.id || it.title)}
                onPlay={isVideoRow ? () => setPlayingId(it.id || it.title) : undefined}
                onOpen={handleOpen} // <-- pass it
              />
            </div>
          ))}
        </div>
      </div>

      {!isVideoRow && (
        <Lightbox open={!!activeItem} item={activeItem} onClose={() => setActiveItem(null)} />
      )}
    </section>
  );
}

Row.propTypes = {
  title: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.object),
  seeAllTo: PropTypes.string,
};
