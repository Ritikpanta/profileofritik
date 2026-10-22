// src/components/Heads.jsx
import { Ink } from "./Hand.jsx";

// Big part titles: a Nepali word in brush, with a handwritten gloss beside it.
export function PartHead({ id, ne, en, seed = 1, tone = "paper" }) {
  return (
    <header className={`part-head part-head--${tone}`}>
      <h2 id={id} className="part-title">
        <span className="part-ne" lang="ne">{ne}</span>
        <span className="part-en">
          <Ink kind="arrow" w={70} h={40} size={3} seed={seed} color="currentColor" className="part-arrow" />
          {en}
        </span>
      </h2>
    </header>
  );
}

// Smaller headings inside a part: typed, underlined in marker.
export function SubHead({ id, title, note, seed = 1, width = 180, children }) {
  return (
    <header className="sub-head">
      <h3 id={id} className="sub-title">
        {title}
        <Ink kind="underline" w={width} h={14} size={4.5} seed={seed} className="sub-ink" />
      </h3>
      {note && <p className="sub-note">{note}</p>}
      {children}
    </header>
  );
}
