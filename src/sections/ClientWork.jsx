// src/sections/ClientWork.jsx
// Work for others, on the dark side of the page. Grouped by who it was for.
import { useMemo } from "react";
import { PartHead } from "../components/Heads.jsx";
import { Media, useLoopPreview } from "../components/Print.jsx";
import useViewer from "../components/useViewer.jsx";
import { clientWork } from "../data/work.js";

function Thumb({ item, onOpen }) {
  const preview = useLoopPreview(item);
  const r = item.kind === "image" ? `${item.w}/${item.h}` : item.ratio;
  const isPlayable = item.kind === "video";
  return (
    <li className={`thumb${preview.wantPlay ? " is-playing" : ""}`} style={{ "--r": r }}>
      <button
        ref={preview.ref}
        type="button"
        className="thumb-hit"
        onClick={() => onOpen(item)}
        {...preview.handlers}
        aria-label={`${isPlayable ? "Play" : "Open"} ${item.title}`}
      >
        <Media item={item} ratio={r} preview={preview} />
      </button>
      <span className="thumb-cap">{item.title}</span>
    </li>
  );
}

function Client({ client }) {
  const items = useMemo(
    () => client.groups.flatMap((g) => g.items.map((it) => ({ ...it, client: client.name }))),
    [client]
  );
  const { open, viewer } = useViewer(items);
  const byId = useMemo(() => Object.fromEntries(items.map((i) => [i.id, i])), [items]);

  return (
    <article className="client" aria-labelledby={`c-${client.id}`}>
      <header className="client-head">
        <h3 id={`c-${client.id}`} className="client-name">{client.name}</h3>
        <p className="client-short">{client.short}</p>
        <p className="client-note">{client.note}</p>
      </header>
      {client.groups.map((g, gi) => (
        <div key={gi} className="client-group">
          {g.label && <p className="client-group-label">{g.label}</p>}
          <ul className="thumbs">
            {g.items.map((it) => (
              <Thumb key={it.id} item={byId[it.id]} onOpen={open} />
            ))}
          </ul>
        </div>
      ))}
      {viewer}
    </article>
  );
}

export default function ClientWork() {
  return (
    <section id="work" className="client-work" aria-labelledby="work-title">
      <div className="client-work-inner">
        <PartHead id="work-title" ne="काम" en="work for others" seed={141} tone="dark" />
        <p className="client-intro">
          Commissions, mostly through ChitraKatha Production: a college, a festival stall, a
          driving school, musicians and event organisers. Same notebook, different brief.
        </p>
        {clientWork.map((c) => (
          <Client key={c.id} client={c} />
        ))}
      </div>
    </section>
  );
}
