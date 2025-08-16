// src/components/Lightbox.jsx
import PropTypes from "prop-types";
import { useEffect } from "react";

export default function Lightbox({ open, item, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!open || !item) return null;

  const isVideo = Boolean(item.embed);
  const stop = (e) => e.stopPropagation();

  return (
    <div className="poem-modal" onClick={onClose} role="dialog" aria-modal="true">
      <div className={`lb-body ${isVideo ? "is-video" : "is-image"}`} onClick={stop}>
        {isVideo ? (
          <iframe
            src={`${item.embed}${item.embed.includes("?") ? "&" : "?"}autoplay=1&rel=0&modestbranding=1`}
            title={item.title || "video"}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <img className="lb-img" src={item.cover} alt={item.title || "preview"} />
        )}
        <button className="lb-close" onClick={onClose} aria-label="Close">×</button>
      </div>
    </div>
  );
}

Lightbox.propTypes = {
  open: PropTypes.bool,
  item: PropTypes.object,
  onClose: PropTypes.func,
};
