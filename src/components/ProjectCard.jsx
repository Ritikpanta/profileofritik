// src/components/ProjectCard.jsx
import PropTypes from "prop-types";

export default function ProjectCard({ item, mode = "image", playing, onPlay, onOpen }) {
  const isVideo = mode === "video" && Boolean(item?.embed);

  const handleClick = () => {
    if (isVideo) return onPlay?.();
    return onOpen?.(item);
  };

  const handleKey = (e) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    handleClick();
  };

  return (
    <article className="card" role="button" tabIndex={0} onClick={handleClick} onKeyDown={handleKey} style={{ cursor: "pointer" }}>
      {isVideo ? (
        <div className="media video">
          {playing ? (
            <iframe
              src={`${item.embed}${item.embed.includes("?") ? "&" : "?"}autoplay=1&rel=0&modestbranding=1`}
              title={item.title || "video"}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <>
              {item?.cover && <img src={item.cover} alt={item?.title || "cover"} />}
              <div className="play-badge" aria-hidden>▶</div>
            </>
          )}
        </div>
      ) : (
        <div className="thumb">
          {item?.cover && <img src={item.cover} alt={item?.title || "cover"} />}
        </div>
      )}

      <div className="meta">
        <div className="title">{item?.title}</div>
        <div className="desc">{item?.description}</div>
        <div className="tags">
          {Array.isArray(item?.tags) && item.tags.map((t) => (
            <span key={t} className="tag">{t}</span>
          ))}
        </div>
      </div>
    </article>
  );
}

ProjectCard.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    description: PropTypes.string,
    cover: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
    embed: PropTypes.string,
  }),
  mode: PropTypes.oneOf(["image", "video"]),
  playing: PropTypes.bool,
  onPlay: PropTypes.func,
  onOpen: PropTypes.func, // <-- added
};
