// AllProjects.jsx
import { useLocation } from "react-router-dom";
import ProjectCard from "../components/ProjectCard.jsx";
import projects from "../Projects.js";

export default function AllProjects() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);

  const cat = params.get("cat")?.toLowerCase();  // e.g. graphics, videography
  const q   = params.get("q")?.toLowerCase();    // free-text search

  // base list
  let items = projects;

  // 1) filter by category (string or array)
  if (cat) {
    items = items.filter(p =>
      p.category?.toLowerCase() === cat ||
      p.categories?.map(c => c.toLowerCase()).includes(cat)
    );
  }

  // 2) optional text search across title/description/tags
  if (q) {
    items = items.filter(p =>
      [p.title, p.description, ...(p.tags || [])]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }

  return (
    <main className="ui">
      <h2>All Projects</h2>
      <div className="grid">
        {items.map(it => (
          <ProjectCard key={it.id || it.title} item={it} />
        ))}
      </div>
    </main>
  );
}
