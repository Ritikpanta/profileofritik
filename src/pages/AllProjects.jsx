// src/pages/AllProjects.jsx
// The full archive: every film, reel, poster and photo on one page, by category.
import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Films from "../sections/Films.jsx";
import DeanSeries from "../sections/DeanSeries.jsx";
import Reels from "../sections/Reels.jsx";
import Posters from "../sections/Posters.jsx";
import Photos from "../sections/Photos.jsx";
import Footer from "../components/Footer.jsx";

const TABS = [
  ["films", "Films"],
  ["dean", "Dean series"],
  ["reels", "Reels"],
  ["posters", "Posters"],
  ["photos", "Photos"],
];

// links from the old site used these names
const ALIASES = { graphics: "posters", videography: "films", photography: "photos" };

export default function AllProjects() {
  const [params, setParams] = useSearchParams();
  const raw = (params.get("cat") || "films").toLowerCase();
  const cat = ALIASES[raw] || (TABS.some(([id]) => id === raw) ? raw : "films");

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [cat]);

  return (
    <>
      <main className="archive" id="top">
        <header className="archive-head">
          <h1 className="section-title">Archive</h1>
          <p className="section-note">
            Everything in one place. <Link to="/">Back to the home page</Link>
          </p>
          <div className="tabs" role="tablist" aria-label="Categories">
            {TABS.map(([id, label]) => (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={cat === id}
                className={`tab${cat === id ? " is-active" : ""}`}
                onClick={() => setParams({ cat: id })}
              >
                {label}
              </button>
            ))}
          </div>
        </header>

        {cat === "films" && <Films />}
        {cat === "dean" && <DeanSeries />}
        {cat === "reels" && <Reels />}
        {cat === "posters" && <Posters showAll />}
        {cat === "photos" && <Photos showAll />}
      </main>
      <Footer />
    </>
  );
}
