// Home.jsx
import Hero from "../components/Hero.jsx";
import Row from "../components/Row.jsx";
import AboutSection from "../sections/AboutSection.jsx";
import projects from "../Projects.js";

export default function Home() {
    const graphics    = projects.filter(p => p.tags?.includes("Design"));
    const video       = projects.filter(p => p.tags?.includes("Videography"));
    const photo       = projects.filter(p => p.tags?.includes("Photography"));
    const programming = projects.filter(p => p.tags?.includes("Programming"));
    const poems       = projects.filter(p => p.tags?.includes("Poetry"));

  return (
    <>
      {/* HERO (no anchor target here) */}
      <section id="hero" className="hero-landing">
        <Hero />
      </section>

      {/* ABOUT (nav target) */}
      <section id="about" className="ui">
        <AboutSection />
      </section>

      {/* WORKS */}
      <main className="ui">
        <section id="works">
          <Row title="Graphics"     items={graphics}    seeAllTo="/work?cat=Design" />
          <Row title="Videography"  items={video}       seeAllTo="/work?cat=Videography" />
          <Row title="Photography"  items={photo}       seeAllTo="/work?cat=Photography" />
          <Row title="Programming"  items={programming} seeAllTo="/work?cat=Programming" />
        </section>

        <section id="poetries">
          <Row title="Poetries" items={poems} seeAllTo="/work?cat=Poetry"  />
        </section>

        <section id="contact">{/* contact content */}</section>
      </main>
    </>
  );
}
