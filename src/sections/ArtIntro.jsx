// src/sections/ArtIntro.jsx
import { PartHead } from "../components/Heads.jsx";
import { Ink, Note, Tape } from "../components/Hand.jsx";

export default function ArtIntro() {
  return (
    <section id="art" className="art-intro" aria-labelledby="art-title">
      <PartHead id="art-title" ne="चित्र" en="stories I want to tell" seed={31} />

      <div className="art-intro-body">
        <div className="art-statement">
          <p>
            I have always liked writing stories. Sometimes I see a character in my head,
            sometimes it starts with a few lines in a notebook. Making a film is how I try
            to give those ideas a life outside the page.
          </p>
          <p>
            Here are my short films, along with the drawings, songs and poems I make around
            them. Some are finished, some are still growing. Phool, for example, has 5 chapters
            and 5 songs, and there is still a lot I want to do with it.
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
