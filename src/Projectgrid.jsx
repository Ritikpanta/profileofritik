import { useState } from "react";
import ProjectModal from "./ProjectModal.jsx";

function ProjectCard({ item, onOpen }) {
  return (
    <article className="card" onClick={() => onOpen(item)}>
      <div className="thumb">
        <img src={item.image} alt={item.title} loading="lazy" />
      </div>
      <div className="card-body">
        <h3>{item.title}</h3>
        <p className="muted">{item.description}</p>
        <div className="tags">
          {(item.tags || []).map(t => <span className="tag" key={t}>{t}</span>)}
        </div>
      </div>
    </article>
  );
}

export default function ProjectGrid({ items }) {
  const [active, setActive] = useState(null);
  return (
    <>
      <div className="grid">
        {items.map(item => (
          <ProjectCard key={item.id} item={item} onOpen={setActive} />
        ))}
      </div>
      <ProjectModal item={active} onClose={() => setActive(null)} />
    </>
  );
}
