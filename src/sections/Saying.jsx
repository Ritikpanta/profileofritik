// src/sections/Saying.jsx
// The one line I keep coming back to. It sits right under the landing page,
// so it is the first thing anyone reads about the work.
import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "../hooks.js";
import { Marked } from "../components/Hero.jsx";
import { Ink, Note } from "../components/Hand.jsx";

export default function Saying() {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const inView = useInView(ref, { threshold: 0.45 });
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    if (inView) setSeen(true);
  }, [inView]);

  return (
    <section
      id="promise"
      ref={ref}
      className={`promise${seen || reduced ? " is-seen" : ""}`}
      aria-labelledby="promise-title"
    >
      <div className="wrap promise-inner">
        <p className="promise-kicker">I want to make something for you.</p>

        <h2 id="promise-title" className="promise-line">
          <span className="promise-row">Watch it today.</span>
          <span className="promise-row">
            Come back to it in{" "}
            <Marked kind="underline" seed={27} size={5} delay={0.35} animate={!reduced}>
              twenty years
            </Marked>
            .
          </span>
          <span className="promise-row">
            It should still feel like{" "}
            <Marked kind="highlight" seed={11} size={30} delay={1.05} color="var(--highlighter)" animate={!reduced}>
              the first time
            </Marked>
            .
          </span>
        </h2>

        <p className="promise-ne" lang="ne">
          बीस वर्षपछि फर्केर हेर्दा पनि, पहिलो पटक जस्तै लागोस्।
        </p>

        <div className="promise-foot">
          <p className="promise-sign">
            <span>- Ritik</span>
            <Ink kind="scribble" w={56} h={16} size={2.2} seed={33} color="var(--ink)" className="promise-sign-ink" />
          </p>
          <Note color="biro" angle={-3} className="promise-note">
            that’s the whole idea, every single time
          </Note>
        </div>
      </div>
    </section>
  );
}
