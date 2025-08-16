// src/components/Lightbox.jsx
import { useEffect } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";

export default function Lightbox({ open, item, onClose }) {
  if (!open || !item) return null;

  // lock background scroll while open
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    const prevPad = document.body.style.paddingRight;

    // avoid layout shift from scrollbar removal
    const scrollbarW = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (scrollbarW > 0) document.body.style.paddingRight = `${scrollbarW}px`;

    const onKey = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPad;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const isVideo = Boolean(item.embed);
  const stop = (e) => e.stopPropagation();

  return createPortal(
    <div className="lightbox-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className={`lightbox ${isVideo ? "is-video" : "is-image"}`} onClick={stop}>
        {isVideo ? (
          <iframe
            src={`${item.embed}${item.embed.includes("?") ? "&" : "?"}autoplay=1&rel=0&modestbranding=1`}
            title={item.title || "video"}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <img className="lightbox-img" src={item.cover} alt={item.title || "media"} />
        )}
        <button className="lightbox-close" onClick={onClose} aria-label="Close">×</button>
      </div>
    </div>,
    document.body
  );
}

Lightbox.propTypes = {
  open: PropTypes.bool,
  item: PropTypes.object,
  onClose: PropTypes.func,
};
