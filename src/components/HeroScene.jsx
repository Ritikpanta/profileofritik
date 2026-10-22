// src/components/HeroScene.jsx
// A strip of film carrying Ritik's posters loops around his cut-out portrait.
// Loaded lazily so the rest of the page never waits on three.js.
import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { reelFrames } from "../data/work.js";

const PORTRAIT_SRC = "/media/misc/hero-cutout.webp";
const PORTRAIT_ASPECT = 1080 / 1450;
const TEX_W = 4096;
const TEX_H = 320;
const BAND = 54; // sprocket band height in texture pixels

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

// Paint the whole strip (frames, edge print, perforations) onto one canvas.
async function paintStrip() {
  const images = await Promise.all(reelFrames.map(loadImage));
  try {
    await document.fonts?.ready;
  } catch {
    /* fonts are optional here */
  }
  const n = images.length;
  const c = document.createElement("canvas");
  c.width = TEX_W;
  c.height = TEX_H;
  const g = c.getContext("2d");

  g.fillStyle = "#16110f";
  g.fillRect(0, 0, TEX_W, TEX_H);

  const slot = TEX_W / n;
  const padX = 9;
  const fy = BAND + 6;
  const fh = TEX_H - BAND * 2 - 12;
  const fw = slot - padX * 2;

  images.forEach((img, i) => {
    const x = i * slot + padX;
    g.fillStyle = "#26201d";
    g.fillRect(x, fy, fw, fh);
    if (!img) return;
    const s = Math.max(fw / img.width, fh / img.height);
    const dw = img.width * s;
    const dh = img.height * s;
    g.save();
    g.beginPath();
    g.rect(x, fy, fw, fh);
    g.clip();
    g.drawImage(img, x + (fw - dw) / 2, fy + (fh - dh) * 0.3, dw, dh);
    g.restore();
  });

  // edge print, the way real stock carries its maker's name and frame numbers
  g.fillStyle = "rgba(244, 183, 64, 0.78)";
  g.font = "600 15px 'Instrument Sans', system-ui, sans-serif";
  g.textBaseline = "middle";
  for (let i = 0; i < n; i++) {
    const x = i * slot + padX + 2;
    g.fillText(`CHITRAKATHA  ${String(i + 1).padStart(2, "0")}`, x, BAND - 12);
    g.fillText("▸", x + fw - 14, TEX_H - BAND + 12);
  }

  // perforations: four per frame, top and bottom, punched fully transparent
  g.globalCompositeOperation = "destination-out";
  const pitch = slot / 4;
  const hw = pitch * 0.46;
  const hh = 24;
  for (let k = 0; k < n * 4; k++) {
    const x = k * pitch + (pitch - hw) / 2;
    roundRect(g, x, 8, hw, hh, 5);
    g.fill();
    roundRect(g, x, TEX_H - 8 - hh, hw, hh, 5);
    g.fill();
  }
  g.globalCompositeOperation = "source-over";
  return c;
}

function useStripTextures(gl) {
  const [tex, setTex] = useState(null);
  useEffect(() => {
    let alive = true;
    let made = [];
    paintStrip().then((canvas) => {
      if (!alive) return;
      const aniso = Math.min(8, gl.capabilities.getMaxAnisotropy());
      const outer = new THREE.CanvasTexture(canvas);
      outer.colorSpace = THREE.SRGBColorSpace;
      outer.anisotropy = aniso;
      outer.wrapS = THREE.RepeatWrapping;
      // the inside of the loop gets a mirrored copy so posters read the right way round
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
  }, [gl]);
  return tex;
}

function dotTexture() {
  const c = document.createElement("canvas");
  c.width = c.height = 64;
  const g = c.getContext("2d");
  const grd = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  grd.addColorStop(0, "rgba(255,255,255,1)");
  grd.addColorStop(0.4, "rgba(255,255,255,0.35)");
  grd.addColorStop(1, "rgba(255,255,255,0)");
  g.fillStyle = grd;
  g.fillRect(0, 0, 64, 64);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

// Dust drifting through the projector light.
function Dust({ reduced, count = 140 }) {
  const ref = useRef();
  const { positions, speeds } = useMemo(() => {
    const p = new Float32Array(count * 3);
    const s = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 9;
      p[i * 3 + 1] = (Math.random() - 0.5) * 6;
      p[i * 3 + 2] = (Math.random() - 0.5) * 5;
      s[i] = 0.04 + Math.random() * 0.12;
    }
    return { positions: p, speeds: s };
  }, [count]);
  const map = useMemo(dotTexture, []);

  useFrame((_, dt) => {
    if (reduced || !ref.current) return;
    const a = ref.current.geometry.attributes.position;
    for (let i = 0; i < count; i++) {
      let y = a.array[i * 3 + 1] + speeds[i] * dt;
      if (y > 3) y = -3;
      a.array[i * 3 + 1] = y;
      a.array[i * 3] += Math.sin((y + i) * 0.7) * dt * 0.02;
    }
    a.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        map={map}
        size={0.06}
        sizeAttenuation
        color="#f4b740"
        transparent
        opacity={0.5}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function Portrait({ height, y, onLoaded, reduced }) {
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
    const t = reduced ? 1 : Math.min(1, (clock.elapsedTime - born.current) / 0.9);
    mat.current.opacity = easeOut(t);
  });

  return (
    <mesh position={[0, y, 0]} renderOrder={2}>
      <planeGeometry args={[height * PORTRAIT_ASPECT, height]} />
      <meshBasicMaterial
        ref={mat}
        map={map}
        transparent
        opacity={reduced ? 1 : 0}
        depthWrite={false}
        toneMapped={false}
      />
    </mesh>
  );
}

function FilmLoop({ radius, y, reduced, pointer }) {
  const { gl } = useThree();
  const tex = useStripTextures(gl);
  const tilt = useRef();
  const spin = useRef();
  const born = useRef(null);
  const height = (2 * Math.PI * radius * TEX_H) / TEX_W;

  useFrame(({ clock }, dt) => {
    if (!tex || !spin.current) return;
    if (born.current === null) born.current = clock.elapsedTime;
    const t = reduced ? 1 : Math.min(1, (clock.elapsedTime - born.current) / 2.2);
    const k = easeOut(t);
    if (!reduced) {
      // unspools fast on arrival, then settles into a slow turn
      const speed = 0.14 + 2.6 * Math.pow(1 - k, 2);
      spin.current.rotation.y += speed * dt;
    }
    const s = 0.82 + 0.18 * k;
    tilt.current.scale.set(s, s, s);
    tilt.current.rotation.x = 0.42 + pointer.current.y * 0.06;
    tilt.current.rotation.z = -0.1 + pointer.current.x * 0.04;
  });

  if (!tex) return null;
  return (
    <group ref={tilt} position={[0, y, 0]} rotation={[0.42, 0, -0.1]}>
      <group ref={spin} rotation={[0, -0.6, 0]}>
        <mesh renderOrder={1}>
          <cylinderGeometry args={[radius, radius, height, 200, 1, true]} />
          <meshBasicMaterial map={tex.outer} side={THREE.FrontSide} alphaTest={0.5} toneMapped={false} />
        </mesh>
        <mesh renderOrder={1}>
          <cylinderGeometry args={[radius * 0.999, radius * 0.999, height, 200, 1, true]} />
          <meshBasicMaterial
            map={tex.inner}
            side={THREE.BackSide}
            alphaTest={0.5}
            color="#9a8f8a"
            toneMapped={false}
          />
        </mesh>
      </group>
    </group>
  );
}

function Rig({ pointer, reduced, children }) {
  const group = useRef();
  const { viewport, size, camera } = useThree();
  const wide = size.width / size.height > 1.15;

  // fit the composition to whatever box the canvas has been given
  const vh = viewport.height;
  const vw = viewport.width;
  const scale = wide ? Math.min(1.0, vh / 5.2) : Math.min(vw / 4.9, vh / 5.1);
  const x = wide ? vw * 0.205 : 0;

  useFrame(() => {
    const tx = reduced ? 0 : pointer.current.x * 0.45;
    const ty = 0.1 + (reduced ? 0 : pointer.current.y * 0.22);
    camera.position.x += (tx - camera.position.x) * 0.05;
    camera.position.y += (ty - camera.position.y) * 0.05;
    camera.lookAt(x * 0.15, 0, 0);
  });

  return (
    <group ref={group} position={[x, 0, 0]} scale={scale}>
      {children({ vh: vh / scale })}
    </group>
  );
}

export default function HeroScene({ active = true, reduced = false, onReady }) {
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
    >
      <Rig pointer={pointer} reduced={reduced}>
        {({ vh }) => {
          const ph = 4.35;
          const py = -vh / 2 + ph / 2 - 0.04;
          return (
            <>
              <Suspense fallback={null}>
                <Portrait height={ph} y={py} reduced={reduced} onLoaded={markLoaded} />
              </Suspense>
              <FilmLoop radius={2.3} y={py + 0.12} reduced={reduced} pointer={pointer} />
              <Dust reduced={reduced} />
            </>
          );
        }}
      </Rig>
    </Canvas>
  );
}
