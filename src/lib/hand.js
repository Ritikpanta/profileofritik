// src/lib/hand.js
// Small helpers for things that should look made by hand: pen strokes,
// torn paper edges and tape. Everything is seeded so a mark looks the same
// on every visit instead of jittering on each render.
import { getStroke } from "perfect-freehand";

export function rng(seed = 1) {
  let a = Math.floor(seed * 9301 + 49297) >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const jit = (r, n) => (r() - 0.5) * 2 * n;

// Turn the outline polygon from perfect-freehand into an SVG path.
function outlineToPath(points) {
  if (!points.length) return "";
  const d = points.reduce(
    (acc, [x0, y0], i, arr) => {
      const [x1, y1] = arr[(i + 1) % arr.length];
      acc.push(x0.toFixed(1), y0.toFixed(1), ((x0 + x1) / 2).toFixed(1), ((y0 + y1) / 2).toFixed(1));
      return acc;
    },
    ["M", ...points[0].map((v) => v.toFixed(1)), "Q"]
  );
  d.push("Z");
  return d.join(" ");
}

// Centre lines for each kind of mark, in a w x h box.
function lines(kind, w, h, r) {
  const pts = [];
  const out = [pts];
  switch (kind) {
    case "underline": {
      const n = 14;
      for (let i = 0; i <= n; i++) {
        const t = i / n;
        pts.push([t * w + jit(r, 1.5), h * 0.55 + Math.sin(t * 3.1 + r() * 2) * h * 0.18 + jit(r, 1), 0.4 + 0.6 * Math.sin(Math.PI * t)]);
      }
      if (r() > 0.4) {
        // a quick return stroke, the way a marker underline often doubles back
        const back = [];
        for (let i = 0; i <= 8; i++) {
          const t = 1 - i / 8;
          back.push([t * w * 0.92 + w * 0.04 + jit(r, 1.5), h * 0.78 + jit(r, 1.2), 0.35 + 0.4 * Math.sin(Math.PI * t)]);
        }
        out.push(back);
      }
      break;
    }
    case "strike": {
      // crossing a word out: three or four loose passes
      const passes = 3 + Math.round(r());
      for (let p = 0; p < passes; p++) {
        const y = h * (0.35 + (p / passes) * 0.35) + jit(r, 2);
        const fromLeft = p % 2 === 0;
        for (let i = 0; i <= 10; i++) {
          const t = i / 10;
          const x = fromLeft ? t * w : (1 - t) * w;
          pts.push([x + jit(r, 2), y + (t - 0.5) * h * 0.25 * (fromLeft ? 1 : -1) + jit(r, 1.2), 0.5 + 0.5 * Math.sin(Math.PI * t)]);
        }
      }
      break;
    }
    case "circle": {
      const cx = w / 2;
      const cy = h / 2;
      const turns = 1.12 + r() * 0.12;
      const start = r() * Math.PI * 2;
      const n = 46;
      const tilt = jit(r, 0.12);
      for (let i = 0; i <= n; i++) {
        const t = i / n;
        const a = start + t * Math.PI * 2 * turns;
        const wob = 1 + jit(r, 0.035) + Math.sin(a * 2 + start) * 0.03;
        const x = Math.cos(a) * (w / 2 - 4) * wob;
        const y = Math.sin(a) * (h / 2 - 4) * wob;
        pts.push([cx + x * Math.cos(tilt) - y * Math.sin(tilt), cy + x * Math.sin(tilt) + y * Math.cos(tilt), 0.45 + 0.55 * Math.sin(Math.PI * t)]);
      }
      break;
    }
    case "arrow": {
      // curved shaft from bottom-left to top-right, then the head as its own stroke
      const n = 16;
      const bend = 0.25 + r() * 0.2;
      let last = [0, 0];
      let prev = [0, 0];
      for (let i = 0; i <= n; i++) {
        const t = i / n;
        const x = t * (w - 6) + 3;
        const y = h - 3 - t * (h - 6) - Math.sin(Math.PI * t) * h * bend;
        prev = last;
        last = [x + jit(r, 0.8), y + jit(r, 0.8)];
        pts.push([...last, 0.5 + 0.4 * t]);
      }
      const ang = Math.atan2(last[1] - prev[1], last[0] - prev[0]);
      const len = Math.min(w, h) * 0.28 + 6;
      const head = [];
      head.push([last[0] - Math.cos(ang - 0.5) * len, last[1] - Math.sin(ang - 0.5) * len, 0.4]);
      head.push([last[0], last[1], 0.9]);
      head.push([last[0] - Math.cos(ang + 0.55) * len, last[1] - Math.sin(ang + 0.55) * len, 0.4]);
      out.push(head);
      break;
    }
    case "tick": {
      pts.push([w * 0.05, h * 0.55, 0.4], [w * 0.22, h * 0.7, 0.8], [w * 0.38, h * 0.95, 1], [w * 0.62, h * 0.5, 0.8], [w * 0.95, h * 0.05, 0.3]);
      break;
    }
    case "cross": {
      pts.push([w * 0.08, h * 0.1, 0.5], [w * 0.5, h * 0.52, 1], [w * 0.92, h * 0.94, 0.5]);
      out.push([
        [w * 0.9, h * 0.12, 0.5],
        [w * 0.48, h * 0.5, 1],
        [w * 0.1, h * 0.9, 0.5],
      ]);
      break;
    }
    case "star": {
      for (let k = 0; k < 4; k++) {
        const a = (k / 4) * Math.PI + jit(r, 0.15);
        const s = [
          [w / 2 - Math.cos(a) * w * 0.45, h / 2 - Math.sin(a) * h * 0.45, 0.4],
          [w / 2, h / 2, 1],
          [w / 2 + Math.cos(a) * w * 0.45, h / 2 + Math.sin(a) * h * 0.45, 0.4],
        ];
        if (k === 0) pts.push(...s);
        else out.push(s);
      }
      break;
    }
    case "scribble": {
      // a loose looping scrawl, like testing a pen
      const n = 40;
      for (let i = 0; i <= n; i++) {
        const t = i / n;
        pts.push([t * w + Math.cos(t * 22) * w * 0.04, h / 2 + Math.sin(t * 22) * h * 0.35 + jit(r, 1), 0.6]);
      }
      break;
    }
    default:
      break;
  }
  return out.filter((l) => l.length > 1);
}

export function penMark(kind, w, h, { seed = 1, size = 6 } = {}) {
  const r = rng(seed);
  const strokes = lines(kind, w, h, r);
  const paths = strokes.map((s) =>
    outlineToPath(
      getStroke(s, {
        size,
        thinning: 0.55,
        smoothing: 0.6,
        streamline: 0.35,
        simulatePressure: false,
        start: { taper: size * 1.5, cap: true },
        end: { taper: size * 2.5, cap: true },
      })
    )
  );
  // centre lines too, for the draw-on mask
  const centre = strokes.map((s) => "M " + s.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join(" L "));
  const length = strokes.reduce((sum, s) => {
    let l = 0;
    for (let i = 1; i < s.length; i++) l += Math.hypot(s[i][0] - s[i - 1][0], s[i][1] - s[i - 1][1]);
    return sum + l;
  }, 0);
  return { paths, centre, length };
}

// A closed blob with a torn edge, for holes ripped in the page.
export function tornBlob(w, h, { seed = 3, jag = 7, wobble = 0.1, points = 150, inset = 0 } = {}) {
  const r = rng(seed);
  const cx = w / 2;
  const cy = h / 2;
  const phase = [r() * 6.28, r() * 6.28, r() * 6.28];
  const pts = [];
  for (let i = 0; i < points; i++) {
    const a = (i / points) * Math.PI * 2;
    const low =
      1 +
      wobble * (Math.sin(a * 2 + phase[0]) * 0.6 + Math.sin(a * 3 + phase[1]) * 0.3 + Math.sin(a * 5 + phase[2]) * 0.2);
    const tooth = (r() - 0.35) * jag;
    const rx = (w / 2 - jag - inset) * low + tooth;
    const ry = (h / 2 - jag - inset) * low + tooth;
    pts.push([cx + Math.cos(a) * rx, cy + Math.sin(a) * ry]);
  }
  return "M" + pts.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join("L") + "Z";
}

// A horizontal torn edge for the boundary between two sections.
// Returns a path that fills everything below the tear in a w x h box.
export function tornEdge(w, h, { seed = 5, step = 9, jag = 0.35 } = {}) {
  const r = rng(seed);
  const pts = [];
  let y = h * 0.5;
  for (let x = 0; x <= w + step; x += step * (0.6 + r() * 0.8)) {
    y += (r() - 0.5) * h * jag;
    y = Math.max(h * 0.12, Math.min(h * 0.88, y + (h * 0.5 - y) * 0.15));
    pts.push([Math.min(x, w), y]);
  }
  return (
    `M0,${h} L` +
    pts.map(([x, yy]) => `${x.toFixed(1)},${yy.toFixed(1)}`).join(" L") +
    ` L${w},${h} Z`
  );
}

// Polygon for a strip of masking tape with ragged torn ends (CSS clip-path).
export function tapeClip(seed = 1) {
  const r = rng(seed);
  const left = [];
  const right = [];
  for (let i = 0; i <= 6; i++) {
    const y = (i / 6) * 100;
    left.push(`${(r() * 7).toFixed(1)}% ${y.toFixed(0)}%`);
    right.push(`${(93 + r() * 7).toFixed(1)}% ${(100 - y).toFixed(0)}%`);
  }
  return `polygon(${left.join(",")},${right.join(",")})`;
}

// Deterministic little tilt for item i, in degrees.
export function tilt(i, spread = 1.6, seed = 11) {
  const r = rng(seed + i * 7.31);
  return +((r() - 0.5) * 2 * spread).toFixed(2);
}

// Clip-path for a page torn out of a notebook: ragged along the top edge.
export function tornTopClip(seed = 1) {
  const r = rng(seed);
  const top = [];
  for (let i = 0; i <= 24; i++) top.push(`${((i / 24) * 100).toFixed(1)}% ${(r() * 2.6).toFixed(2)}%`);
  return `polygon(${top.join(",")},100% 100%,0% 100%)`;
}
