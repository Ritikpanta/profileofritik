// src/pages/Home.jsx
import Hero from "../components/Hero.jsx";
import Row from "../components/Row.jsx";
import AboutSection from "../sections/AboutSection.jsx";
import PoetryRow from "../sections/PoetryRow.jsx";   // ⟵ new compact poetry row
import projects from "../Projects.js";

// helper: works with either `category` or `categories`
const pick = (cat) =>
  projects.filter((p) =>
    (typeof p.category === "string" && p.category.toLowerCase() === cat) ||
    (Array.isArray(p.categories) && p.categories.map((c) => c.toLowerCase()).includes(cat))
  );

export default function Home() {
  const graphics    = pick("graphics");
  const video       = pick("videography");
  const photo       = pick("photography");
  const programming = pick("programming");
  const poems       = pick("poetry"); // poetry items live in Projects.js

  return (
    <>
      <section id="hero" className="hero-landing">
        <Hero />
      </section>

      <section id="about" className="ui">
        <AboutSection />
      </section>

      <main className="ui">
        <section id="works">
          <Row title="Graphics"     items={graphics}    seeAllTo="/work?cat=graphics" />
          <Row title="Videography"  items={video}       seeAllTo="/work?cat=videography" />
          <Row title="Photography"  items={photo}       seeAllTo="/work?cat=photography" />
          <Row title="Programming"  items={programming} seeAllTo="/work?cat=programming" />
        </section>

        {/* Compact poetry cards + modal reader */}
        <PoetryRow items={poems} />

        <section id="contact">{/* contact content */}</section>
      </main>
    </>
  );
}
