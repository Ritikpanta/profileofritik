import PropTypes from "prop-types";
import ProjectCard from "../components/ProjectCard.jsx";
import projects from "../Projects.js"; // adjust path to your file

export default function AllProjects({ query = "" }) {
  const q = query.toLowerCase();
  const items = projects.filter((p) =>
    [p.title, p.description, ...(p.tags || [])]
      .join(" ")
      .toLowerCase()
      .includes(q)
  );

  return (
    <main className="ui">
      <h2>All Projects</h2>
      <div className="grid">
        {items.map((it) => (
          <ProjectCard key={it.id || it.title} item={it} />
        ))}
      </div>
    </main>
  );
}

AllProjects.propTypes = {
  query: PropTypes.string,
};
