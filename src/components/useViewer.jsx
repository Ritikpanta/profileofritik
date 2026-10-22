// src/components/useViewer.jsx
import { useCallback, useState } from "react";
import Viewer from "./Viewer.jsx";

export default function useViewer(items) {
  const [index, setIndex] = useState(null);
  const open = useCallback(
    (item) => setIndex(items.findIndex((i) => i.id === item.id)),
    [items]
  );
  const close = useCallback(() => setIndex(null), []);
  const viewer = (
    <Viewer items={items} index={index} onClose={close} onIndex={setIndex} />
  );
  return { open, viewer };
}
