// src/components/HeroScene.jsx
// A loose strip of film, the kind you'd hold up to a window, looping around
// Ritik's paper cut-out. Every frame on the strip is one of his films: hover a
// frame to see its name, click it to play it, drag the strip to spin it.
import { Suspense, memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { rng } from "../lib/hand.js";

const PORTRAIT_SRC = "/media/misc/hero-sticker.webp";
const PORTRAIT_ASPECT = 1160 / 1490;
const TEX_W = 4096;
const TEX_H = 300;
const BAND = 46;
const SEGMENTS = 260;

const easeOut = (t) => 1 - Math.pow(1 - t, 3);

function loadImage(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.decoding = "async";
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

function roundRect(g, x, y, w, h, r) {
  g.beginPath();
  g.moveTo(x + r, y);
  g.arcTo(x + w, y, x + w, y + h, r);
  g.arcTo(x + w, y + h, x, y + h, r);
  g.arcTo(x, y + h, x, y, r);
  g.arcTo(x, y, x + w, y, r);
  g.closePath();
}

// a wobbly marker line through a list of points
function markerPath(g, pts, r, wobble = 2.2) {
  g.beginPath();
  pts.forEach(([x, y], i) => {
    const jx = x + (r() - 0.5) * wobble;
    const jy = y + (r() - 0.5) * wobble;
    if (i === 0) g.moveTo(jx, jy);
    else g.lineTo(jx, jy);
  });
  g.stroke();
}

async function paintStrip(items) {
  const images = await Promise.all(items.map((it) => loadImage(it.cover)));
  try {
    await Promise.all([
      document.fonts?.load("40px 'Nanum Pen Script'"),
      document.fonts?.ready,
    ]);
  } catch {
    /* the strip still works without the pen font */
  }
  const r = rng(42);
  const n = images.length;
  const c = document.createElement("canvas");
  c.width = TEX_W;
  c.height = TEX_H;
  const g = c.getContext("2d");

  // film base: warm, not quite black, with faint streaks from handling
  g.fillStyle = "#2a1e17";
  g.fillRect(0, 0, TEX_W, TEX_H);
  for (let i = 0; i < 260; i++) {
    g.fillStyle = `rgba(${r() > 0.5 ? "255,236,210" : "0,0,0"},${(r() * 0.05).toFixed(3)})`;
    g.fillRect(r() * TEX_W, 0, 1 + r() * 3, TEX_H);
  }

  const slot = TEX_W / n;
  const padX = 10;
  const fy = BAND + 4;
  const fh = TEX_H - BAND * 2 - 8;
  const fw = slot - padX * 2;

  images.forEach((img, i) => {
    const x = i * slot + padX;
    g.fillStyle = "#3b2c22";
    g.fillRect(x, fy, fw, fh);
    if (img) {
      const s = Math.max(fw / img.width, fh / img.height);
      const dw = img.width * s;
      const dh = img.height * s;
      g.save();
      g.beginPath();
      g.rect(x, fy, fw, fh);
      g.clip();
      g.drawImage(img, x + (fw - dw) / 2, fy + (fh - dh) * 0.35, dw, dh);
      // a little vignette, like light falling off through old stock
      const v = g.createRadialGradient(x + fw / 2, fy + fh / 2, fh * 0.3, x + fw / 2, fy + fh / 2, fh * 0.85);
      v.addColorStop(0, "rgba(0,0,0,0)");
      v.addColorStop(1, "rgba(30,15,5,0.35)");
      g.fillStyle = v;
      g.fillRect(x, fy, fw, fh);
      g.restore();
    }
    // vertical scratches
    g.strokeStyle = "rgba(255,248,235,0.18)";
    g.lineWidth = 1;
    if (r() > 0.45) {
      const sx = x + r() * fw;
      markerPath(g, [[sx, fy], [sx + (r() - 0.5) * 6, fy + fh]], r, 1);
    }
  });

  // grease pencil: each film's name on its frame, and the odd note
  g.textBaseline = "alphabetic";
  const notes = { 0: "new!", 4: "ok!", 8: "take 2", 10: "keep" };
  for (let i = 0; i < n; i++) {
    const x = i * slot + padX;
    const name = (items[i].reelTitle || items[i].title || "").split(",")[0];
    g.font = "38px 'Nanum Pen Script', 'Comic Sans MS', cursive";
    g.fillStyle = "rgba(0,0,0,0.55)";
    g.fillText(name, x + 13, fy + fh - 13);
    g.fillStyle = "rgba(250,246,236,0.96)";
    g.fillText(name, x + 11, fy + fh - 15);
    if (notes[i] !== undefined) {
      g.font = "32px 'Nanum Pen Script', 'Comic Sans MS', cursive";
      g.fillStyle = "rgba(246,240,228,0.85)";
      g.fillText(notes[i], x + fw - 70, TEX_H - 12);
    }
  }

  // red marker: circle one frame, cross one out, like choosing takes
  g.lineCap = "round";
  g.lineJoin = "round";
  g.strokeStyle = "rgba(226,40,28,0.92)";
  g.lineWidth = 6;
  const circleAt = (i) => {
    const cx = i * slot + slot / 2;
    const cy = TEX_H / 2;
    const pts = [];
    for (let k = 0; k <= 40; k++) {
      const a = -0.6 + (k / 40) * Math.PI * 2.2;
      pts.push([cx + Math.cos(a) * (fw * 0.56 + (r() - 0.5) * 6), cy + Math.sin(a) * (fh * 0.56 + (r() - 0.5) * 6)]);
    }
    markerPath(g, pts, r, 1.5);
  };
  const crossAt = (i) => {
    const x = i * slot + padX + 8;
    markerPath(g, [[x, fy + 10], [x + fw * 0.5, fy + fh * 0.5], [x + fw - 16, fy + fh - 12]], r, 3);
    markerPath(g, [[x + fw - 18, fy + 14], [x + fw * 0.5, fy + fh * 0.52], [x + 4, fy + fh - 8]], r, 3);
  };
  circleAt(0);
  void crossAt;

  // perforations: four per frame, top and bottom
  g.globalCompositeOperation = "destination-out";
  const pitch = slot / 4;
  const hw = pitch * 0.44;
  const hh = 20;
  for (let k = 0; k < n * 4; k++) {
    const x = k * pitch + (pitch - hw) / 2;
    roundRect(g, x, 9, hw, hh, 4);
    g.fill();
    roundRect(g, x, TEX_H - 9 - hh, hw, hh, 4);
    g.fill();
  }
  g.globalCompositeOperation = "source-over";
  return c;
}

function useStripTextures(gl, items) {
  const [tex, setTex] = useState(null);
  useEffect(() => {
    let alive = true;
    let made = [];
    paintStrip(items).then((canvas) => {
      if (!alive) return;
      const aniso = Math.min(8, gl.capabilities.getMaxAnisotropy());
      const outer = new THREE.CanvasTexture(canvas);
      outer.colorSpace = THREE.SRGBColorSpace;
      outer.anisotropy = aniso;
      outer.wrapS = THREE.RepeatWrapping;
      const inner = outer.clone();
      inner.repeat.x = -1;
      inner.offset.x = 1;
      inner.needsUpdate = true;
      made = [outer, inner];
      setTex({ outer, inner });
    });
    return () => {
      alive = false;
      made.forEach((t) => t.dispose());
    };
  }, [gl, items]);
  return tex;
}

// A closed ribbon whose height, radius and twist drift over time.
function useRibbon(radius) {
  return useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array((SEGMENTS + 1) * 2 * 3);
    const uv = new Float32Array((SEGMENTS + 1) * 2 * 2);
    const idx = [];
    for (let i = 0; i <= SEGMENTS; i++) {
      uv[i * 4] = i / SEGMENTS;
      uv[i * 4 + 1] = 0;
      uv[i * 4 + 2] = i / SEGMENTS;
      uv[i * 4 + 3] = 1;
      if (i < SEGMENTS) {
        const a = i * 2;
        idx.push(a, a + 2, a + 1, a + 1, a + 2, a + 3);
      }
    }
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3).setUsage(THREE.DynamicDrawUsage));
    geo.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
    geo.setIndex(idx);
    const height = (2 * Math.PI * radius * TEX_H) / TEX_W;

    const tmpT = new THREE.Vector3();
    const tmpW = new THREE.Vector3();
    const up = new THREE.Vector3(0, 1, 0);
    const centre = (theta, t, amp, out) => {
      const rr = radius * (1 + 0.04 * amp * Math.sin(3 * theta + 0.3 * t));
      const h = amp * (0.2 * Math.sin(2 * theta + 0.55 * t) + 0.07 * Math.sin(5 * theta - 0.4 * t + 1.3));
      return out.set(Math.sin(theta) * rr, h, Math.cos(theta) * rr);
    };
    const p = new THREE.Vector3();
    const q = new THREE.Vector3();

    const update = (t, amp) => {
      for (let i = 0; i <= SEGMENTS; i++) {
        const theta = (i / SEGMENTS) * Math.PI * 2;
        centre(theta, t, amp, p);
        centre(theta + 0.002, t, amp, q);
        tmpT.subVectors(q, p).normalize();
        const twist = amp * 0.17 * Math.sin(2 * theta + 0.5 * t + 1);
        tmpW.copy(up).applyAxisAngle(tmpT, twist).multiplyScalar(height / 2);
        pos[i * 6] = p.x - tmpW.x;
        pos[i * 6 + 1] = p.y - tmpW.y;
        pos[i * 6 + 2] = p.z - tmpW.z;
        pos[i * 6 + 3] = p.x + tmpW.x;
        pos[i * 6 + 4] = p.y + tmpW.y;
        pos[i * 6 + 5] = p.z + tmpW.z;
      }
      geo.attributes.position.needsUpdate = true;
      geo.computeBoundingSphere();
    };
    update(0, 1);
    return { geo, update };
  }, [radius]);
}

function Portrait({ height, y, onLoaded, reduced, onBlock }) {
  const map = useLoader(THREE.TextureLoader, PORTRAIT_SRC);
  const mat = useRef();
  const born = useRef(null);
  useEffect(() => {
    map.colorSpace = THREE.SRGBColorSpace;
    map.anisotropy = 4;
    map.needsUpdate = true;
    onLoaded?.();
  }, [map, onLoaded]);

  useFrame(({ clock }) => {
    if (!mat.current) return;
    if (born.current === null) born.current = clock.elapsedTime;
    const t = reduced ? 1 : Math.min(1, (clock.elapsedTime - born.current) / 0.8);
    mat.current.opacity = easeOut(t);
  });

  return (
    <group position={[0, y, 0]}>
      <mesh renderOrder={2}>
        <planeGeometry args={[height * PORTRAIT_ASPECT, height]} />
        <meshBasicMaterial ref={mat} map={map} transparent opacity={reduced ? 1 : 0} depthWrite={false} toneMapped={false} />
      </mesh>
      {/* an invisible card over his body, so frames hidden behind him can't be clicked */}
      <mesh
        position={[0, -height * 0.05, 0.001]}
        onPointerMove={(e) => {
          e.stopPropagation();
          onBlock?.();
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <planeGeometry args={[height * PORTRAIT_ASPECT * 0.62, height * 0.86]} />
        <meshBasicMaterial colorWrite={false} depthWrite={false} />
      </mesh>
    </group>
  );
}

// Brightens the frame under the pointer and dims the rest, with a faint
// projector flicker. Works for both faces since it reads the texture coordinate.
function useFrameMaterial(map, uniforms, extra) {
  return useMemo(() => {
    const m = new THREE.MeshBasicMaterial({ map, alphaTest: 0.5, toneMapped: false, ...extra });
    m.onBeforeCompile = (shader) => {
      Object.assign(shader.uniforms, uniforms);
      shader.fragmentShader = shader.fragmentShader
        .replace("void main() {", "uniform float uHover;\nuniform float uN;\nuniform float uTime;\nvoid main() {")
        .replace(
          "#include <map_fragment>",
          `#include <map_fragment>
          float fi = floor(fract(vMapUv.x) * uN);
          float on = step(-0.5, uHover);
          float isH = 1.0 - step(0.5, abs(fi - uHover));
          float flick = 1.0 + 0.03 * sin(uTime * 21.0 + fi * 7.3) * sin(uTime * 3.1 + fi);
          diffuseColor.rgb *= flick * mix(1.0, mix(0.55, 1.28, isH), on);`
        );
    };
    return m;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map]);
}

function FilmLoop({ radius, y, reduced, pointer, items, onHover, onPick }) {
  const { gl, invalidate } = useThree();
  const tex = useStripTextures(gl, items);
  const { geo, update } = useRibbon(radius);
  const tilt = useRef();
  const spin = useRef();
  const born = useRef(null);
  const clockT = useRef(0);
  const vel = useRef(0.09);
  const amp = useRef(1);
  const hovered = useRef(-1);
  const drag = useRef(null);
  const dragAcc = useRef(0);
  const down = useRef(null);
  const n = items.length;
  const uniforms = useMemo(() => ({ uHover: { value: -1 }, uN: { value: n }, uTime: { value: 0 } }), [n]);
  const outerMat = useFrameMaterial(tex?.outer, uniforms, { side: THREE.FrontSide });
  const innerMat = useFrameMaterial(tex?.inner, uniforms, { side: THREE.BackSide, color: new THREE.Color("#a89a90") });

  useEffect(() => {
    if (tex) invalidate();
  }, [tex, invalidate]);

  const frameAt = (e) => {
    const u = e.uv ? e.uv.x : 0;
    const tu = e.object.userData.inner ? 1 - u : u;
    return Math.min(n - 1, Math.max(0, Math.floor((((tu % 1) + 1) % 1) * n)));
  };
  const setHover = (i, e) => {
    hovered.current = i;
    uniforms.uHover.value = i;
    gl.domElement.style.cursor = i < 0 ? "" : drag.current ? "grabbing" : "pointer";
    const ne = e?.nativeEvent;
    onHover?.(i < 0 ? null : items[i], ne?.clientX, ne?.clientY);
    invalidate();
  };

  // drag the strip with a mouse to spin it; it keeps a little momentum
  useEffect(() => {
    const move = (e) => {
      if (!drag.current) return;
      const dx = e.clientX - drag.current.x;
      drag.current.x = e.clientX;
      drag.current.moved += Math.abs(dx);
      dragAcc.current += dx * 0.0065;
    };
    const up = () => {
      if (!drag.current) return;
      drag.current = null;
      gl.domElement.style.cursor = hovered.current < 0 ? "" : "pointer";
    };
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerup", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
  }, [gl]);

  const handlers = {
    onPointerMove: (e) => {
      e.stopPropagation();
      const i = frameAt(e);
      if (i !== hovered.current) setHover(i, e);
      else onHover?.(items[i], e.nativeEvent.clientX, e.nativeEvent.clientY);
    },
    onPointerOut: () => setHover(-1),
    onPointerDown: (e) => {
      e.stopPropagation();
      const ne = e.nativeEvent;
      down.current = { x: ne.clientX, y: ne.clientY };
      if (ne.pointerType === "mouse" && !reduced) {
        drag.current = { x: ne.clientX, moved: 0 };
        gl.domElement.style.cursor = "grabbing";
      }
    },
    onClick: (e) => {
      e.stopPropagation();
      const d = down.current;
      const ne = e.nativeEvent;
      if (d && Math.hypot(ne.clientX - d.x, ne.clientY - d.y) > 8) return;
      onPick?.(items[frameAt(e)]);
    },
  };

  useFrame(({ clock }, dt) => {
    if (!tex || !spin.current) return;
    uniforms.uTime.value = clock.elapsedTime;
    if (born.current === null) born.current = clock.elapsedTime;
    const k = reduced ? 1 : easeOut(Math.min(1, (clock.elapsedTime - born.current) / 2.6));
    if (!reduced) {
      clockT.current += dt;
      const isHover = hovered.current >= 0;
      if (drag.current) {
        const d = dragAcc.current;
        dragAcc.current = 0;
        spin.current.rotation.y += d;
        vel.current = d / Math.max(dt, 1 / 120);
      } else {
        // slows right down under the pointer so a frame is easy to catch
        const target = isHover ? 0.015 : 0.09;
        vel.current += (target - vel.current) * Math.min(1, dt * 2.2);
        spin.current.rotation.y += (vel.current + 1.5 * Math.pow(1 - k, 2)) * dt;
      }
      amp.current += ((isHover || drag.current ? 0.45 : 1) - amp.current) * Math.min(1, dt * 2.5);
      update(clockT.current, amp.current + 1.3 * (1 - k));
    }
    const s = (0.88 + 0.12 * k) * (hovered.current >= 0 ? 1.015 : 1);
    tilt.current.scale.lerp(new THREE.Vector3(s, s, s), 0.15);
    tilt.current.rotation.x = 0.36 + pointer.current.y * 0.05;
    tilt.current.rotation.z = -0.08 + pointer.current.x * 0.04;
  });

  if (!tex) return null;
  return (
    <group ref={tilt} position={[0, y, 0]} rotation={[0.36, 0, -0.08]}>
      <group ref={spin} rotation={[0, -0.5, 0]}>
        <mesh geometry={geo} material={outerMat} renderOrder={1} {...handlers} />
        <mesh geometry={geo} material={innerMat} renderOrder={1} userData={{ inner: true }} {...handlers} />
      </group>
    </group>
  );
}

function Rig({ pointer, reduced, children }) {
  const { viewport, size, camera } = useThree();
  const wide = size.width / size.height > 1.15;
  const vh = viewport.height;
  const vw = viewport.width;
  const scale = wide ? Math.min(0.92, vh / 5.7) : Math.min(vw / 5.0, vh / 5.15);
  const x = 0;

  useFrame(() => {
    const tx = reduced ? 0 : pointer.current.x * 0.35;
    const ty = 0.1 + (reduced ? 0 : pointer.current.y * 0.18);
    camera.position.x += (tx - camera.position.x) * 0.05;
    camera.position.y += (ty - camera.position.y) * 0.05;
    camera.lookAt(x * 0.15, 0, 0);
  });

  return (
    <group position={[x, 0, 0]} scale={scale}>
      {children({ vh: vh / scale })}
    </group>
  );
}

function HeroScene({ active = true, reduced = false, onReady, items, onHover, onPick }) {
  const pointer = useRef({ x: 0, y: 0 });
  const [portraitLoaded, setPortraitLoaded] = useState(false);
  const markLoaded = useCallback(() => setPortraitLoaded(true), []);

  useEffect(() => {
    if (reduced) return;
    const move = (e) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [reduced]);

  useEffect(() => {
    if (portraitLoaded) onReady?.();
  }, [portraitLoaded, onReady]);

  return (
    <Canvas
      className="hero-canvas"
      flat
      dpr={[1, 1.75]}
      frameloop={active ? (reduced ? "demand" : "always") : "never"}
      camera={{ position: [0, 0.1, 9.5], fov: 30, near: 0.1, far: 50 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
      onPointerMissed={() => onHover?.(null)}
    >
      <Rig pointer={pointer} reduced={reduced}>
        {({ vh }) => {
          const ph = 4.55;
          const py = -vh / 2 + ph / 2 - 0.06;
          return (
            <>
              <Suspense fallback={null}>
                <Portrait height={ph} y={py} reduced={reduced} onLoaded={markLoaded} />
              </Suspense>
              {items?.length > 0 && (
                <FilmLoop
                  radius={2.35}
                  y={py + 0.2}
                  reduced={reduced}
                  pointer={pointer}
                  items={items}
                  onHover={onHover}
                  onPick={onPick}
                />
              )}
            </>
          );
        }}
      </Rig>
    </Canvas>
  );
}

export default memo(HeroScene);
