// src/components/Nav.jsx
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLockScroll } from "../hooks.js";

const LINKS = [
  ["films", "Films"],
  ["dean", "Dean series"],
  ["reels", "Reels"],
  ["posters", "Posters"],
  ["photos", "Photos"],
  ["poems", "Poems"],
  ["about", "About"],
  ["contact", "Contact"],
];

export default function Nav() {
  const { pathname } = useLocation();
  const onHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
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

  const item = ([id, label]) =>
    onHome ? (
      <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>
        {label}
      </a>
    ) : (
      <Link
        key={id}
        to={{ pathname: "/", hash: `#${id}` }}
        onClick={() => setOpen(false)}
      >
        {label}
      </Link>
    );

  return (
    <>
      <header
        className={`nav${scrolled || !onHome ? " is-solid" : ""}${open ? " is-open" : ""}`}
      >
        <div className="nav-inner">
          {onHome ? (
            <a
              className="wordmark"
              href="#top"
              aria-label="Ritik Panta, back to top"
            >
              Ritik Panta
            </a>
          ) : (
            <Link className="wordmark" to="/" aria-label="Ritik Panta, home">
              Ritik Panta
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
            <span className="visually-hidden">
              {open ? "Close menu" : "Open menu"}
            </span>
            <span className="bars" aria-hidden="true" />
          </button>
        </div>
      </header>

      {/* kept outside the header: its backdrop blur would trap a fixed child */}
      <nav
        id="nav-sheet"
        className="nav-sheet"
        aria-label="Sections"
        hidden={!open}
      >
        {LINKS.map(item)}
        <p className="nav-sheet-note" lang="ne">
          चित्रकथा
        </p>
      </nav>
    </>
  );
}
