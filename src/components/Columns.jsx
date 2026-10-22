// src/components/Columns.jsx
// Hand-placed columns. CSS columns split taped items across the column break
// and leave one column hanging short, so this deals the items out by height,
// the way you'd lay prints on a table: each one goes on the shortest pile.
import { useLayoutEffect, useRef, useState } from "react";

function pickCount(width, steps) {
  for (const [min, n] of steps) if (width >= min) return n;
  return 1;
}

// steps: [[minWidth, columns], ...] largest first, measured on the container.
export function useColumnCount(steps) {
  const ref = useRef(null);
  const [n, setN] = useState(() => pickCount(typeof window === "undefined" ? 1200 : window.innerWidth - 40, steps));
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setN(pickCount(el.clientWidth, steps));
    update();
    if (typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
    // steps is a constant for each caller
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return [ref, n];
}

// height(item) is in column widths (an image's h / w plus its caption).
// offsets push a pile down before anything lands on it.
export function deal(items, n, height, offsets = []) {
  const piles = Array.from({ length: n }, (_, c) => ({ h: offsets[c] || 0, offset: offsets[c] || 0, items: [] }));
  items.forEach((item, index) => {
    let best = 0;
    for (let c = 1; c < n; c++) if (piles[c].h < piles[best].h - 0.01) best = c;
    piles[best].items.push({ item, index });
    piles[best].h += height(item);
  });
  return piles;
}

export const ratioOf = (item) => {
  if (item.w && item.h) return item.h / item.w;
  const [a, b] = String(item.ratio || "16/9").split("/").map(Number);
  return b / a;
};
