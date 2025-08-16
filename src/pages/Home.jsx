// Home.jsx
import Hero from "../components/Hero.jsx";
import Row from "../components/Row.jsx";
import AboutSection from "../sections/AboutSection.jsx";
import projects from "../Projects.js";

// helper: works with either `category` (string) or `categories` (array)
const pick = (cat) =>
  projects.filter(p => p.category === cat || p.categories?.includes(cat));

export default function Home() {
  const graphics    = pick("graphics");
  const video       = pick("videography");
  const photo       = pick("photography");
  const programming = pick("programming");
  const poems       = pick("poetry");

  return (
    <>
      {/* HERO */}
      <section id="hero" className="hero-landing">
        <Hero />
      </section>

      {/* ABOUT */}
      <section id="about" className="ui">
        <AboutSection />
      </section>

      {/* WORKS */}
      <main className="ui">
        <section id="works">
          <Row title="Graphics"     items={graphics}    seeAllTo="/work?cat=graphics" />
          <Row title="Videography"  items={video}       seeAllTo="/work?cat=videography" />
          <Row title="Photography"  items={photo}       seeAllTo="/work?cat=photography" />
          <Row title="Programming"  items={programming} seeAllTo="/work?cat=programming" />
        </section>

        <section id="poetries">
          <Row title="Poetries" items={poems} seeAllTo="/work?cat=poetry" />
        </section>

        <section id="contact">{/* contact content */}</section>
      </main>
    </>
  );
}
