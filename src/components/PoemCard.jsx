// src/components/PoemCard.jsx
import PropTypes from "prop-types";

export default function PoemCard({ item }) {
  return (
    <article className="card" role="article" aria-label={item.title}>
      <div className="meta">
        <div className="title">{item.title}</div>
        <div className="desc" style={{ opacity: .85, maxHeight: 80, overflow: "hidden" }}>
          {item.poem?.slice(0, 140) || "—"}
        </div>
        <div className="read" style={{ marginTop: 8, opacity: .7 }}>Read →</div>
      </div>
    </article>
  );
}

PoemCard.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string.isRequired,
    poem: PropTypes.string,
  }).isRequired,
};
