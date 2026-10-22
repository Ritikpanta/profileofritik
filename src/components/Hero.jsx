// src/components/Hero.jsx
import { Suspense, lazy, useCallback, useEffect, useRef, useState } from "react";
import { clients } from "../data/work.js";
import { hasWebGL, useInView, useReducedMotion } from "../hooks.js";

const HeroScene = lazy(() => import("./HeroScene.jsx"));

const WORDS = [".FILMMAKER", ".DIRECTOR", ".DESIGNER", ".WRITER", ".MUSICIAN"];

function useTyping(words, enabled) {
  const [w, setW] = useState(0);
  const [len, setLen] = useState(enabled ? 0 : words[0].length);
  const [del, setDel] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    const word = words[w];
    if (!del && len === word.length) {
      const t = setTimeout(() => setDel(true), 1400);
      return () => clearTimeout(t);
    }
    if (del && len === 0) {
      setDel(false);
      setW((i) => (i + 1) % words.length);
      return;
    }
    const t = setTimeout(() => setLen((n) => n + (del ? -1 : 1)), del ? 55 : 120);
    return () => clearTimeout(t);
  }, [len, del, w, words, enabled]);

  return words[w].slice(0, len);
}

export default function Hero() {
  const reduced = useReducedMotion();
  const typed = useTyping(WORDS, !reduced);
  const stageRef = useRef(null);
  const inView = useInView(stageRef, { threshold: 0.01 });
  const [webgl] = useState(() => hasWebGL());
  const [ready, setReady] = useState(false);
  const onReady = useCallback(() => setReady(true), []);

  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero-stage" ref={stageRef} aria-hidden="true">
        <div className="hero-glow" />
        <img
          className={`hero-fallback${ready ? " is-hidden" : ""}`}
          src="/media/misc/hero-cutout.webp"
          alt=""
          width="1080"
          height="1450"
          fetchPriority="high"
        />
        {webgl && (
          <Suspense fallback={null}>
            <HeroScene active={inView} reduced={reduced} onReady={onReady} />
          </Suspense>
        )}
      </div>

      <div className="hero-copy">
        <p className="hero-type" aria-hidden="true">
          <span>{typed}</span>
          <span className="caret" />
        </p>
        <h1 id="hero-title" className="hero-name">
          Namaskar, I’m Ritik Panta.
          <span className="visually-hidden"> Filmmaker, director, designer, writer and musician.</span>
        </h1>
        <p className="hero-name-ne" lang="ne">नमस्कार, म ऋतिक पन्त</p>
        <p className="hero-lede">
          I write, direct and edit films, music videos and stories for brands, and I run
          ChitraKatha Production here in Sydney.
        </p>
        <div className="hero-actions">
          <a className="btn btn-solid" href="#films">See my work</a>
          <a className="btn btn-line" href="#contact">Get in touch</a>
        </div>
      </div>

      <p className="hero-clients">
        Recent work for{" "}
        {clients.map((c, i) => (
          <span key={c}>
            <b>{c}</b>
            {i < clients.length - 2 ? ", " : i === clients.length - 2 ? " and " : "."}
          </span>
        ))}
      </p>
    </section>
  );
}
