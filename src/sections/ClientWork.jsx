// src/sections/ClientWork.jsx
// Work for others, on the dark side of the page. One client at a time, one
// shelf at a time: each client's work is split into tabs so the page stays calm.
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { PartHead } from "../components/Heads.jsx";
import { Media, useLoopPreview } from "../components/Print.jsx";
import useViewer from "../components/useViewer.jsx";
import { clientWork } from "../data/work.js";

const CATEGORIES = [
  ["college", "College marketing"],
  ["music", "ChitraKatha, music videos & promos"],
  ["events", "Event coverage"],
  ["brands", "Promotional content"],
];

const hasWork = (c) => c.groups?.some((g) => g.items?.length);
const PAIRED = new Set(["events"]);
const isBig = (c) => c.groups.filter((g) => g.items?.length).length > 1;

function Thumb({ item, onOpen }) {
  const preview = useLoopPreview(item);
  const r = item.kind === "image" ? `${item.w}/${item.h}` : item.ratio;
  const isPlayable = ["video", "youtube", "drive"].includes(item.kind);
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
      {item.cap !== false && <span className="thumb-cap">{item.title}</span>}
    </li>
  );
}

// A shelf that scrolls sideways, with quiet arrows when there is more to see.
function Shelf({ children, label, id }) {
  const ref = useRef(null);
  const [edges, setEdges] = useState({ left: false, right: false });
  const measure = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    setEdges({
      left: el.scrollLeft > 4,
      right: el.scrollLeft + el.clientWidth < el.scrollWidth - 4,
    });
  }, []);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    measure();
    el.scrollLeft = 0;
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(measure) : null;
    ro?.observe(el);
    el.addEventListener("scroll", measure, { passive: true });
    return () => {
      ro?.disconnect();
      el.removeEventListener("scroll", measure);
    };
  }, [measure, id]);
  const nudge = (dir) => ref.current?.scrollBy({ left: dir * ref.current.clientWidth * 0.8, behavior: "smooth" });

  return (
    <div className={`shelf${edges.right ? " has-more" : ""}${edges.left ? " has-before" : ""}`}>
      <ul ref={ref} className="thumbs" aria-label={label}>
        {children}
      </ul>
      {(edges.left || edges.right) && (
        <div className="shelf-arrows">
          <button type="button" className="shelf-arrow" onClick={() => nudge(-1)} disabled={!edges.left} aria-label="Scroll back">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" /></svg>
          </button>
          <button type="button" className="shelf-arrow" onClick={() => nudge(1)} disabled={!edges.right} aria-label="See more">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      )}
    </div>
  );
}

function Client({ client, wide }) {
  const groups = useMemo(() => client.groups.filter((g) => g.items?.length), [client]);
  const [tab, setTab] = useState(0);
  const group = groups[Math.min(tab, groups.length - 1)];
  const items = useMemo(
    () => (group ? group.items.map((it) => ({ ...it, client: client.name })) : []),
    [group, client.name]
  );
  const { open, viewer } = useViewer(items);
  if (!group) return null;
  const tabsId = `tabs-${client.id}`;

  return (
    <article id={client.id} className={`client${wide ? " is-wide" : ""}`} aria-labelledby={`c-${client.id}`}>
      <header className="client-head">
        <div className="client-who">
          <h3 id={`c-${client.id}`} className="client-name">{client.name}</h3>
          <p className="client-short">{client.short}</p>
        </div>
        <p className="client-note">{client.note}</p>
      </header>

      {groups.length > 1 && (
        <div className="client-tabs" role="tablist" aria-label={`${client.name}, choose a set`}>
          {groups.map((g, i) => (
            <button
              key={g.label || i}
              type="button"
              role="tab"
              id={`${tabsId}-${i}`}
              aria-selected={i === tab}
              aria-controls={`${tabsId}-panel`}
              className={`client-tab${i === tab ? " is-on" : ""}`}
              onClick={() => setTab(i)}
            >
              {g.label || "work"}
            </button>
          ))}
        </div>
      )}

      <div
        id={`${tabsId}-panel`}
        role={groups.length > 1 ? "tabpanel" : undefined}
        aria-labelledby={groups.length > 1 ? `${tabsId}-${tab}` : undefined}
      >
        <Shelf label={group.label || client.name} id={`${client.id}-${tab}`}>
          {items.map((it) => (
            <Thumb key={it.id} item={it} onOpen={open} />
          ))}
        </Shelf>
      </div>
      {viewer}
    </article>
  );
}

export default function ClientWork() {
  const cats = CATEGORIES.map(([id, label]) => [id, label, clientWork.filter((c) => c.category === id && hasWork(c))]).filter(
    ([, , list]) => list.length
  );
  return (
    <section id="work" className="client-work" aria-labelledby="work-title">
      <div className="client-work-inner">
        <PartHead id="work-title" ne="काम" en="commercial work" seed={141} tone="dark" />
        <p className="client-intro">
          My work as a Marketing Ambassador, the music videos we make at ChitraKatha,
          and the events we cover. Each one asks for something different, and I enjoy that.
        </p>
        <nav className="work-index" aria-label="Commercial work categories">
          {cats.map(([id, label], i) => (
            <a key={id} href={`#${id}`}>
              <span>0{i + 1}</span> {label.toLowerCase()}
            </a>
          ))}
        </nav>
        {cats.map(([id, label, list], i) => (
          <section key={id} id={id} className="work-category" aria-labelledby={`${id}-title`}>
            <h2 id={`${id}-title`} className="work-category-title">
              <span>0{i + 1}</span> {label}
            </h2>
            {PAIRED.has(id) ? (
              // smaller clients sit side by side, the bigger ones take the full width
              <div className="client-pairs">
                {[...list.filter(isBig), ...list.filter((c) => !isBig(c))].map((c) => (
                  <Client key={c.id} client={c} wide={isBig(c)} />
                ))}
              </div>
            ) : (
              list.map((c) => <Client key={c.id} client={c} />)
            )}
          </section>
        ))}
      </div>
    </section>
  );
}
