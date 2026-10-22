// src/sections/AboutSection.jsx
import { PartHead } from "../components/Heads.jsx";
import { Ink, Tape } from "../components/Hand.jsx";

const crafts = [
  ["Writing and directing", "I write stories, direct them and work on the edit. Short films are where I started, and they are still close to me."],
  ["ChitraKatha Production", "I am the founder. With our team, I work on music videos, films, promos and event coverage."],
  ["College marketing", "I work as a Marketing Ambassador at APIC, creating videos about students, campus life and the Dean’s series."],
  ["Away from the shoot", "I draw, design posters, write poems and make music. A lot of those ideas end up in my films."],
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
            I’m from Nepal and live in Sydney. Writing was where it started for me. I would
            imagine a story and want to see how it looked on screen, so I started making films.
            Now I write, direct and run ChitraKatha Production with a team of people I enjoy
            creating with. I’m still learning, and every project teaches me something.
          </p>

          <ul className="crafts">
            {crafts.map(([k, v], i) => (
              <li key={k}>
                <Ink kind="tick" w={22} h={20} size={3.4} seed={i + 5} color="var(--marker)" className="craft-tick" />
                <strong>{k}.</strong> {v}
              </li>
            ))}
          </ul>


        </div>
      </div>
    </section>
  );
}
