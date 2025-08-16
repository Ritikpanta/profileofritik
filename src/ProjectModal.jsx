export default function ProjectModal({ item, onClose }) {
  if (!item) return null;
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="close" onClick={onClose} aria-label="Close">×</button>
        <img className="modal-img" src={item.image} alt={item.title} />
        <h3>{item.title}</h3>
        <p className="muted">{item.long || item.description}</p>
        <div className="modal-actions">
          {item.live && <a className="btn primary" href={item.live} target="_blank">Live</a>}
          {item.code && <a className="btn ghost" href={item.code} target="_blank">Code</a>}
        </div>
      </div>
    </div>
  );
}
