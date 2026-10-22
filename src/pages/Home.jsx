// src/pages/Home.jsx
import Hero from "../components/Hero.jsx";
import Films from "../sections/Films.jsx";
import DeanSeries from "../sections/DeanSeries.jsx";
import Reels from "../sections/Reels.jsx";
import Posters from "../sections/Posters.jsx";
import Photos from "../sections/Photos.jsx";
import PoetryRow from "../sections/PoetryRow.jsx";
import AboutSection from "../sections/AboutSection.jsx";
import Contact from "../sections/Contact.jsx";
import Footer from "../components/Footer.jsx";
import { poems } from "../data/poems.js";

export default function Home() {
  return (
    <>
      <Hero />
      <main id="main">
        <Films />
        <DeanSeries />
        <Reels />
        <Posters />
        <Photos />
        <PoetryRow items={poems} />
        <AboutSection />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
