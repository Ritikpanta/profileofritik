// src/sections/ArtIntro.jsx
import { PartHead } from "../components/Heads.jsx";
import { Ink, Note, Tape } from "../components/Hand.jsx";

export default function ArtIntro() {
  return (
    <section id="art" className="art-intro" aria-labelledby="art-title">
      <PartHead id="art-title" ne="चित्र" en="things I make for myself" seed={31} />

      <div className="art-intro-body">
        <div className="art-statement">
          <p>
            I’m a writer first. I carry a notebook everywhere, and for a long time the stories
            stayed on paper. When they needed pictures, I learned to draw them, shoot them, cut
            them and put music under them.
          </p>
          <p>
            This part of the site is that notebook. Films nobody paid for, pages from the
            sketchbook, posters for films that don’t exist yet, photographs, and poems in
            Nepali.
          </p>
          <p className="art-sign">
            <span>Ritik</span>
            <Ink kind="scribble" w={60} h={18} size={2.4} seed={13} color="var(--ink)" className="art-sign-ink" />
          </p>
        </div>

        <figure className="art-pinned">
          <Tape seed={7} w={120} angle={-6} className="art-pinned-tape" />
          <img src="/media/sketch/sketch-nepali.webp" alt="An open notebook: a pen drawing of a man on one page, handwritten Nepali on the other" loading="lazy" />
          <Note angle={5} className="art-note">cause creating is fun</Note>
        </figure>
      </div>
    </section>
  );
}
