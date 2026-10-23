// src/sections/Photos.jsx
// A contact sheet: strips of frames, portrait shots lying on their side the way
// they do on a real sheet, and the favourites circled in red.
import useViewer from "../components/useViewer.jsx";
import { SubHead } from "../components/Heads.jsx";
import { Ink } from "../components/Hand.jsx";
import { photos } from "../data/work.js";

const PER_STRIP = 6;

export default function Photos() {
  const { open, viewer } = useViewer(photos);
  const strips = [];
  for (let i = 0; i < photos.length; i += PER_STRIP) strips.push(photos.slice(i, i + PER_STRIP));

  return (
    <section id="photos" className="block photos" aria-labelledby="photos-title">
      <SubHead
        id="photos-title"
        title="photographs"
        width={250}
        seed={101}
        note="Photos I took of friends, strangers (I asked first) and places I liked. Click any one to see it bigger."
      />

      <div className="sheet">
        <p className="sheet-note">the circled ones are my favourites</p>
        {strips.map((strip, s) => (
          <ol key={s} className="strip" style={{ "--a": `${[-0.5, 0.35, -0.2][s % 3]}deg` }}>
            {strip.map((p, i) => {
              const n = s * PER_STRIP + i;
              const tall = p.h > p.w;
              return (
                <li key={p.id}>
                  <button type="button" className={`frame${tall ? " is-tall" : ""}`} onClick={() => open(p)} aria-label={`Open ${p.title}`}>
                    <img src={p.thumb} alt="" loading="lazy" decoding="async" />
                  </button>
                  <span className="frame-n" aria-hidden="true">
                    {n + 1}
                    <small>{n + 1}A</small>
                  </span>
                  {p.pick && <Ink kind="circle" w={180} h={128} size={4.5} seed={n + 3} className="frame-pick" />}
                </li>
              );
            })}
          </ol>
        ))}
      </div>
      {viewer}
    </section>
  );
}
