// src/components/Nav.jsx
// A strip of paper along the top. The section you're in gets circled.
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLockScroll } from "../hooks.js";
import { Ink } from "./Hand.jsx";

const LINKS = [
  ["films", "films"],
  ["sketchbook", "sketch & animation"],
  ["work", "commercial work"],
  ["posters", "posters"],
  ["photos", "photos"],
  ["poems", "poems"],
  ["about", "about"],
  ["write", "write to me"],
];

function useCurrentSection(ids, enabled) {
  const [current, setCurrent] = useState(null);
  useEffect(() => {
    if (!enabled || typeof IntersectionObserver === "undefined") return;
    const seen = new Map();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => seen.set(e.target.id, e.isIntersecting ? e.intersectionRatio : 0));
        let best = null;
        let bestR = 0;
        seen.forEach((r, id) => {
          if (r > bestR) {
            best = id;
            bestR = r;
          }
        });
        setCurrent(best);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.01, 0.2] }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [ids, enabled]);
  return current;
}

const IDS = LINKS.map(([id]) => id);

export default function Nav() {
  const { pathname } = useLocation();
  const onHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const current = useCurrentSection(IDS, onHome);
  useLockScroll(open);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const item = ([id, label], i) => {
    const inner = (
      <>
        {label}
        {current === id && (
          <Ink kind="circle" w={label.length * 10 + 30} h={34} size={2.6} seed={i + 2} className="nav-circle" />
        )}
      </>
    );
    return onHome ? (
      <a key={id} href={`#${id}`} onClick={() => setOpen(false)} aria-current={current === id ? "location" : undefined}>
        {inner}
      </a>
    ) : (
      <Link key={id} to={{ pathname: "/", hash: `#${id}` }} onClick={() => setOpen(false)}>
        {inner}
      </Link>
    );
  };

  return (
    <>
      <header className={`nav${scrolled || !onHome ? " is-solid" : ""}${open ? " is-open" : ""}`}>
        <div className="nav-inner">
          {onHome ? (
            <a className="wordmark" href="#top" aria-label="Ritik Panta, back to top">
              <span lang="ne">ऋतिक</span>
              <span className="wordmark-en">ritik panta</span>
            </a>
          ) : (
            <Link className="wordmark" to="/" aria-label="Ritik Panta, home">
              <span lang="ne">ऋतिक</span>
              <span className="wordmark-en">ritik panta</span>
            </Link>
          )}

          <nav className="nav-links" aria-label="Sections">
            {LINKS.map(item)}
          </nav>

          <button
            type="button"
            className="nav-toggle"
            aria-expanded={open}
            aria-controls="nav-sheet"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "close" : "menu"}
          </button>
        </div>
      </header>

      {/* kept outside the header: its backdrop blur would trap a fixed child */}
      <nav id="nav-sheet" className="nav-sheet" aria-label="Sections" hidden={!open}>
        {LINKS.map(item)}
        <p className="nav-sheet-note" lang="ne">चित्रकथा</p>
      </nav>
    </>
  );
}
