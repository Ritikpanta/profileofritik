import PropTypes from "prop-types";

export default function ProjectCard({
  item,
  mode = "image",
  playing,
  onPlay,
  onOpen,
}) {
  const isVideo = mode === "video" && (item?.videoSrc || item?.embed);

  const isYouTube =
    typeof item?.embed === "string" &&
    (item.embed.includes("youtube.com") || item.embed.includes("youtu.be"));

  const handleClick = () => {
    if (isVideo) return onPlay?.();        // parent toggles `playing`
    return onOpen?.(item);
  };

  const handleKey = (e) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    handleClick();
  };

  return (
    <article
      className="card"
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKey}
      style={{ cursor: "pointer" }}
    >
      {isVideo ? (
        <div
          className="media video"
          // Default 9/16 for MP4s; 16/9 for YouTube unless overridden per item.
          style={{ ["--ratio"]: item?.ratio || (isYouTube ? "16/9" : "9/16") }}
        >
          {playing ? (
            item?.videoSrc ? (
              // Clean MP4 playback (e.g., TikTok cuts you host in /public)
              <div className="video-wrapper">
                <video
                  src={item.videoSrc}
                  autoPlay
                  muted
                  playsInline
                  controls
                />
              </div>
            ) : (
              // YouTube embed
              <div className="video-wrapper">
                <iframe
                  src={`${item.embed}${
                    item.embed.includes("?") ? "&" : "?"
                  }autoplay=1&rel=0&modestbranding=1`}
                  title={item.title || "video"}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )
          ) : (
            <>
              {item?.cover && (
                <img src={item.cover} alt={item?.title || "cover"} />
              )}
              <div className="play-badge" aria-hidden>
                ▶
              </div>
            </>
          )}
        </div>
      ) : (
        <div className="thumb">
          {item?.cover && (
            <img src={item.cover} alt={item?.title || "cover"} />
          )}
        </div>
      )}

      <div className="meta">
        <div className="title">{item?.title}</div>
        <div className="desc">{item?.description}</div>
        <div className="tags">
          {Array.isArray(item?.tags) &&
            item.tags.map((t) => (
              <span key={t} className="tag">
                {t}
              </span>
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
    embed: PropTypes.string,     // YouTube (optional)
    videoSrc: PropTypes.string,  // MP4 path (recommended for TikTok cuts)
    ratio: PropTypes.string,     // e.g., "9/16" or "16/9"
  }),
  mode: PropTypes.oneOf(["image", "video"]),
  playing: PropTypes.bool,
  onPlay: PropTypes.func,
  onOpen: PropTypes.func,
};
