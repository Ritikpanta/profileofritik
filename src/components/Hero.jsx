// src/components/Hero.jsx
// The page is torn open and the film comes out of it.
import { Suspense, lazy, useCallback, useLayoutEffect, useMemo, useRef, useState } from "react";
import { hasWebGL, useInView, useReducedMotion } from "../hooks.js";
import { tornBlob } from "../lib/hand.js";
import { Ink, Note } from "./Hand.jsx";
import useViewer from "./useViewer.jsx";
import { animationProjects, clientWork, directorReels, films, poemFilms, reel, sliceOfLife } from "../data/work.js";

const HeroScene = lazy(() => import("./HeroScene.jsx"));

// the films printed on the roll, in the order they sit on it
const everything = [
  ...films,
  ...sliceOfLife,
  ...animationProjects,
  ...poemFilms,
  ...directorReels,
  ...clientWork.flatMap((c) => c.groups.flatMap((g) => g.items)),
];
const reelItems = reel
  .map((id) => everything.find((i) => i.id === id))
  .filter((i) => i && (i.kind === "video" || i.kind === "youtube") && i.cover && i.cover.startsWith("/"));

// A word that gets crossed out, underlined or highlighted with a real-looking pen stroke.
export function Marked({ children, kind = "strike", seed = 1, delay = 0, color = "var(--marker)", size = 5, animate }) {
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
        const ul = kind === "underline";
        const one = kind === "strike1";
        const ih = Math.round(hl ? box.h * 0.42 : ul ? box.h * 0.22 : one ? box.h * 0.46 : box.h * 0.62);
        const pad = size * 2;
        const top = hl ? box.h * 0.5 : ul ? box.h * 0.84 : one ? box.h * 0.27 : box.h * 0.2;
        return (
          <Ink
            kind={hl || ul ? "underline" : kind}
            w={box.w + 10}
            h={ih}
            color={color}
            size={size}
            seed={seed}
            draw={animate}
            delay={delay}
            duration={hl ? 0.55 : 0.45}
            className="marked-ink"
            style={{ left: -5 - pad, top: Math.round(top - pad) }}
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
  const { open, viewer } = useViewer(reelItems);
  const tag = useRef(null);
  const [hoverItem, setHoverItem] = useState(null);
  const onHover = useCallback((item, x, y) => {
    setHoverItem((prev) => (prev?.id === item?.id ? prev : item));
    const el = tag.current;
    if (el && item && x !== undefined) el.style.transform = `translate(${x + 16}px, ${y + 14}px)`;
  }, []);
  const onPick = useCallback(
    (item) => {
      setHoverItem(null);
      if (item) open(item);
    },
    [open]
  );
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
            <HeroScene
              active={inView}
              reduced={reduced}
              onReady={onReady}
              items={reelItems}
              onHover={onHover}
              onPick={onPick}
            />
          </Suspense>
        )}
        {webgl && (
          <span className="hero-hint">
            <Ink kind="arrow" w={60} h={40} size={3} seed={14} color="var(--biro)" className="hero-hint-arrow" />
            <span className="hint-hover">every frame is a film, click one to watch it</span>
            <span className="hint-touch">every frame is a film, tap one to watch it</span>
          </span>
        )}
        <span className="hero-me">
          <span lang="ne">म</span> (that’s me)
          <Ink kind="arrow" w={74} h={46} size={3.2} seed={9} color="var(--biro)" className="hero-me-arrow" />
        </span>
      </div>

      <div ref={tag} className={`reel-tag${hoverItem ? " is-on" : ""}`} aria-hidden="true">
        {hoverItem && (
          <>
            <span className="reel-tag-play">▶</span>
            <span className="reel-tag-title">{hoverItem.title}</span>
          </>
        )}
      </div>
      {viewer}

      <div className="hero-copy">
        <p className="hero-hello">Namaskar, I’m</p>
        <h1 id="hero-title" className="hero-name">
          <span className="hero-name-ne" lang="ne">ऋतिक पन्त</span>
          <span className="hero-name-en">Ritik Panta</span>
        </h1>

        <p className="hero-role">Filmmaker. Writer. Director.</p>
        <p className="hero-founder">Founder of <a href="#chitrakatha">ChitraKatha Production</a></p>

        <p className="hero-make">
          I make{" "}
          <Marked kind="strike1" seed={2} size={3.6} delay={0.9} animate={!reduced}>films</Marked>,{" "}
          <Marked kind="strike1" seed={5} size={3.6} delay={1.3} animate={!reduced}>posters</Marked>,{" "}
          <Marked kind="strike1" seed={8} size={3.6} delay={1.7} animate={!reduced}>songs</Marked>{" "}
          <Marked kind="highlight" seed={3} size={22} delay={2.15} color="var(--highlighter)" animate={!reduced}>
            stories
          </Marked>
          .
        </p>
        <Note color="biro" angle={-2} className="hero-make-note">
          <span lang="ne">चित्र</span> + <span lang="ne">कथा</span> = picture stories.
          <br />
          That’s where ChitraKatha comes from.
        </Note>

        <p className="hero-lede">
          I’m Ritik, from Nepal, currently in Sydney. I write stories and bring them to life
          through films. Some start in my notebook, some become songs, and some I get to
          make with my team at ChitraKatha. This is a little of that journey.
        </p>

        <ul className="hero-links">
          <li>
            <a href="#films">
              watch my films
              <Ink kind="underline" w={150} h={12} size={3.4} seed={21} color="var(--marker)" className="link-ink" />
            </a>
          </li>
          <li>
            <a href="#work">commercial work</a>
          </li>
          <li>
            <a href="#write">write to me</a>
          </li>
        </ul>
      </div>

    </section>
  );
}
