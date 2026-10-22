// src/components/Hero.jsx
// The page is torn open and the film comes out of it.
import { Suspense, lazy, useCallback, useLayoutEffect, useMemo, useRef, useState } from "react";
import { recentClients } from "../data/work.js";
import { hasWebGL, useInView, useReducedMotion } from "../hooks.js";
import { tornBlob } from "../lib/hand.js";
import { Ink, Note } from "./Hand.jsx";

const HeroScene = lazy(() => import("./HeroScene.jsx"));

// A word that gets crossed out (or highlighted) with a real-looking pen stroke.
function Marked({ children, kind = "strike", seed = 1, delay = 0, color = "var(--marker)", size = 5, animate }) {
  const ref = useRef(null);
  const [box, setBox] = useState(null);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => setBox({ w: Math.round(el.offsetWidth), h: Math.round(el.offsetHeight) });
    measure();
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(measure) : null;
    ro?.observe(el);
    return () => ro?.disconnect();
  }, []);
  return (
    <span className={`marked marked--${kind}`} ref={ref}>
      {children}
      {box && box.w > 0 && (() => {
        const hl = kind === "highlight";
        const ih = Math.round(hl ? box.h * 0.42 : box.h * 0.62);
        const pad = size * 2;
        return (
          <Ink
            kind={hl ? "underline" : kind}
            w={box.w + 10}
            h={ih}
            color={color}
            size={size}
            seed={seed}
            draw={animate}
            delay={delay}
            duration={hl ? 0.55 : 0.45}
            className="marked-ink"
            style={{ left: -5 - pad, top: Math.round((hl ? box.h * 0.5 : box.h * 0.2) - pad) }}
          />
        );
      })()}
    </span>
  );
}

export default function Hero() {
  const reduced = useReducedMotion();
  const stageRef = useRef(null);
  const inView = useInView(stageRef, { threshold: 0.01 });
  const [webgl] = useState(() => hasWebGL());
  const [ready, setReady] = useState(false);
  const onReady = useCallback(() => setReady(true), []);
  const hole = useMemo(
    () => ({
      rim: tornBlob(1000, 1000, { seed: 4, jag: 26, wobble: 0.09 }),
      cut: tornBlob(1000, 1000, { seed: 4, jag: 16, wobble: 0.09, inset: 16 }),
    }),
    []
  );

  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero-stage" ref={stageRef} aria-hidden="true">
        <svg className="hero-hole" viewBox="0 0 1000 1000" preserveAspectRatio="none" focusable="false">
          <defs>
            <radialGradient id="holeLight" cx="50%" cy="58%" r="60%">
              <stop offset="0" stopColor="#3a1c14" />
              <stop offset="0.55" stopColor="#1d1513" />
              <stop offset="1" stopColor="#0e0d0d" />
            </radialGradient>
            <clipPath id="holeClip">
              <path d={hole.cut} />
            </clipPath>
            <filter id="holeBlur" x="-10%" y="-10%" width="120%" height="120%">
              <feGaussianBlur stdDeviation="14" />
            </filter>
          </defs>
          <path d={hole.rim} className="hole-rim" />
          <path d={hole.cut} fill="url(#holeLight)" />
          <path d={hole.cut} fill="none" stroke="#000" strokeOpacity="0.7" strokeWidth="46" filter="url(#holeBlur)" clipPath="url(#holeClip)" />
        </svg>
        <img
          className={`hero-fallback${ready ? " is-hidden" : ""}`}
          src="/media/misc/hero-sticker.webp"
          alt=""
          width="1160"
          height="1490"
          fetchPriority="high"
        />
        {webgl && (
          <Suspense fallback={null}>
            <HeroScene active={inView} reduced={reduced} onReady={onReady} />
          </Suspense>
        )}
        <span className="hero-me">
          <span lang="ne">म</span> (that’s me)
          <Ink kind="arrow" w={74} h={46} size={3.2} seed={9} color="var(--biro)" className="hero-me-arrow" />
        </span>
      </div>

      <div className="hero-copy">
        <p className="hero-hello">Namaskar, I’m</p>
        <h1 id="hero-title" className="hero-name">
          <span className="hero-name-ne" lang="ne">ऋतिक पन्त</span>
          <span className="hero-name-en">Ritik Panta</span>
        </h1>

        <p className="hero-make">
          I make{" "}
          <Marked seed={2} delay={0.7} animate={!reduced}>films</Marked>,{" "}
          <Marked seed={5} delay={1.05} animate={!reduced}>posters</Marked>,{" "}
          <Marked seed={8} delay={1.4} animate={!reduced}>songs</Marked>{" "}
          <br />
          <Marked kind="highlight" seed={3} delay={1.8} size={26} color="var(--highlighter)" animate={!reduced}>
            stories
          </Marked>
          .
          <Note color="biro" angle={-4} className="hero-make-note">
            <span lang="ne">चित्र</span> + <span lang="ne">कथा</span> = picture stories.
            <br />
            That’s where ChitraKatha comes from.
          </Note>
        </p>

        <p className="hero-lede">
          This all started with words in notebooks, the stories always meant something 
          to me, When those stories needed pictures, I picked up a camera. 
          Now I run ChitraKatha Production in Sydney, and I still fill notebooks.
        </p>

        <ul className="hero-links">
          <li>
            <a href="#art">
              see my own work
              <Ink kind="underline" w={150} h={12} size={3.4} seed={21} color="var(--marker)" className="link-ink" />
            </a>
          </li>
          <li>
            <a href="#work">work for others</a>
          </li>
          <li>
            <a href="#write">write to me</a>
          </li>
        </ul>
      </div>

      <p className="hero-tape">
        <span>recently for {recentClients.slice(0, -1).join(", ")} and {recentClients.at(-1)}</span>
      </p>
    </section>
  );
}
