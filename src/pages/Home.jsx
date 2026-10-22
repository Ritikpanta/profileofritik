// src/pages/Home.jsx
import Hero from "../components/Hero.jsx";
import { TornEdge } from "../components/Hand.jsx";
import ArtIntro from "../sections/ArtIntro.jsx";
import Films from "../sections/Films.jsx";
import Sketchbook from "../sections/Sketchbook.jsx";
import Posters from "../sections/Posters.jsx";
import Photos from "../sections/Photos.jsx";
import PoetryRow from "../sections/PoetryRow.jsx";
import ClientWork from "../sections/ClientWork.jsx";
import AboutSection from "../sections/AboutSection.jsx";
import Contact from "../sections/Contact.jsx";
import Footer from "../components/Footer.jsx";
import { poems } from "../data/poems.js";

export default function Home() {
  return (
    <>
      <Hero />
      <main id="main">
        <div className="wrap">
          <ArtIntro />
          <Films />
          <Sketchbook />

        </div>
        <TornEdge seed={7} from="paper" to="dark" />
        <ClientWork />
        <TornEdge seed={19} from="dark" to="paper" flip />
        <div className="wrap">
          <Posters />
          <Photos />
          <PoetryRow items={poems} />
          <AboutSection />
          <Contact />
        </div>
      </main>
      <Footer />
    </>
  );
}
