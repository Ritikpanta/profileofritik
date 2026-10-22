// src/sections/AboutSection.jsx
import { PartHead } from "../components/Heads.jsx";
import { Ink, Tape } from "../components/Hand.jsx";

const crafts = [
  ["Film", "I write, direct and edit, for my own stories and for clients. DaVinci Resolve and After Effects."],
  ["Design", "Posters and key art. A founding member of Chautari, where I made the event posters."],
  ["Music", "Guitar, flute, harmonica, songwriting. I sing a little, even if the vocals aren’t singer-perfect."],
  ["Code", "Part of my studies, and another way to make things. Learning web development and machine learning."],
];

const path = [
  ["2020", "Finished school. Good at science and maths, and started playing with design."],
  ["2022", "+2 in Computer Science, mostly from my room during Covid. Picked up the guitar. Over 85%."],
  ["2023", "Studying IT in Australia while running ChitraKatha Production. Still a boy with a dream."],
];

export default function AboutSection() {
  return (
    <section id="about" className="block about" aria-labelledby="about-title">
      <PartHead id="about-title" ne="म" en="about me" seed={161} />

      <div className="about-grid">
        <figure className="polaroid" style={{ "--a": "-2.5deg" }}>
          <Tape seed={17} w={110} angle={4} className="polaroid-tape" />
          <img src="/media/misc/about-portrait.webp" alt="Ritik Panta outdoors, arms crossed" loading="lazy" width="2552" height="3829" />
          <figcaption>
            <span lang="ne">नेपालबाट, सिड्नीमा</span>
            <small>from Nepal, in Sydney</small>
          </figcaption>
        </figure>

        <div className="about-copy">
          <p className="typed lede">
            I’m from Nepal and live in Sydney. I love to capture and create things, and I found
            designing, writing, filmmaking and coding to be the ways I do that. I run ChitraKatha
            Production, where we make music videos, event films and content for brands. I also
            play music.
          </p>

          <ul className="crafts">
            {crafts.map(([k, v], i) => (
              <li key={k}>
                <Ink kind="tick" w={22} h={20} size={3.4} seed={i + 5} color="var(--marker)" className="craft-tick" />
                <strong>{k}.</strong> {v}
              </li>
            ))}
          </ul>

          <div className="so-far">
            <p className="hand-label">so far</p>
            <Ink kind="underline" w={560} h={22} size={3} seed={177} color="var(--ink)" className="so-far-line" />
            <ol className="so-far-list">
              {path.map(([y, v]) => (
                <li key={y}>
                  <span className="so-far-year">{y}</span>
                  <span className="typed">{v}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
