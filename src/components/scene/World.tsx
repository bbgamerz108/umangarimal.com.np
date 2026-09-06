import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { ContactShadows, Sparkles, useTexture } from "@react-three/drei";
import {
  EffectComposer,
  Bloom,
  Vignette,
  Noise,
  ChromaticAberration,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";
import { useScroll } from "@/lib/scroll";
import { Dslr } from "./Dslr";
import { PhotoFrames } from "./PhotoFrames";
import { Dust } from "./Dust";

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function clamp01(n: number) {
  return Math.min(1, Math.max(0, n));
}

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = clamp01((x - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
}

type Key = { p: number; pos: [number, number, number]; look: [number, number, number]; fov: number };

/**
 * Camera path redesign goals:
 *  p=0    → Clean 3/4 front-left view, camera close, model fills ~60% of frame
 *  p=0.08 → Subtle drift in, light mouse parallax
 *  p=0.14 → Begin CameraStudy orbit section — swing to right side showing grip detail
 *  p=0.28 → Full orbit pass showing rear LCD
 *  p=0.38 → Pull back to reveal model in wider context
 *  p=0.52 → Camera begins to fade as photo frames come in
 *  p=0.68 → Wide pull-back for gallery/filmstrip sections
 *  p=1    → Distant ambient — pure dust and sparkles backdrop
 *
 * Key fix: the model was disappearing too early (after > 0.98 at p=0.3).
 * We now gate visibility on a much higher threshold and keep the scale
 * above 0.05 so it never hard-pops out.
 */
const KEYS: Key[] = [
  // Hero — 3/4 front, slight left, intimate
  { p: 0,    pos: [1.6,  0.52, 3.8],  look: [-0.1,  0.06, 0.08], fov: 32 },
  { p: 0.06, pos: [1.3,  0.48, 3.5],  look: [-0.05, 0.04, 0.06], fov: 31 },
  // CameraStudy — swings around the body
  { p: 0.14, pos: [-0.4, 0.34, 2.8],  look: [0.6,   0.06, 0.0],  fov: 30 },
  { p: 0.24, pos: [-1.6, 0.5,  2.9],  look: [0.3,   0.06, 0.0],  fov: 31 },
  { p: 0.34, pos: [0.1,  0.6,  5.6],  look: [0.0,   0.08, -1.2], fov: 36 },
  // Pull back — gallery sections
  { p: 0.50, pos: [0.2,  0.8,  8.2],  look: [0.0,   0.1,  -2.8], fov: 40 },
  { p: 0.65, pos: [1.0,  0.42, 5.8],  look: [-0.2,  0.0,  -1.6], fov: 37 },
  { p: 0.80, pos: [-1.2, 0.65, 5.0],  look: [0.1,   0.08, -0.4], fov: 38 },
  // Footer — wide ambient
  { p: 1,    pos: [0.2,  1.1,  7.0],  look: [0.0,   0.14,  0.0], fov: 42 },
];

function sample(progress: number): Key {
  const p = clamp01(progress);
  let i = 0;
  while (i < KEYS.length - 1 && KEYS[i + 1].p < p) i++;
  const a = KEYS[i];
  const b = KEYS[Math.min(i + 1, KEYS.length - 1)];
  const span = b.p - a.p || 1;
  const t = smoothstep(0, 1, (p - a.p) / span);
  return {
    p,
    pos: [lerp(a.pos[0], b.pos[0], t), lerp(a.pos[1], b.pos[1], t), lerp(a.pos[2], b.pos[2], t)],
    look: [lerp(a.look[0], b.look[0], t), lerp(a.look[1], b.look[1], t), lerp(a.look[2], b.look[2], t)],
    fov: lerp(a.fov, b.fov, t),
  };
}

function Backdrop() {
  const tex = useTexture("/photos/durbar-dusk.webp");
  tex.colorSpace = THREE.SRGBColorSpace;
  const mat = useRef<THREE.MeshBasicMaterial>(null);
  const progress = useScroll((s) => s.progress);

  useFrame(() => {
    if (mat.current) {
      mat.current.opacity = 0.5 * (1 - smoothstep(0.06, 0.2, progress));
    }
  });

  return (
    <mesh position={[0, 0.4, -10]} scale={[22, 12.4, 1]}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial ref={mat} map={tex} transparent opacity={0.4} toneMapped={false} />
    </mesh>
  );
}

function Rig() {
  const look = useRef(new THREE.Vector3(0, 0, 0));
  const tmp = useMemo(() => new THREE.Vector3(), []);
  const progress = useScroll((s) => s.progress);
  const mouseX = useScroll((s) => s.mouseX);
  const mouseY = useScroll((s) => s.mouseY);
  const reduced = useScroll((s) => s.reduced);

  useFrame((state, delta) => {
    const d = Math.min(delta, 0.1);
    const k = sample(progress);
    tmp.set(k.pos[0], k.pos[1], k.pos[2]);
    if (!reduced) {
      tmp.x += mouseX * 0.55;
      tmp.y += mouseY * 0.24;
    }
    const alpha = 1 - Math.exp(-2.8 * d);
    state.camera.position.lerp(tmp, alpha);
    look.current.lerp(tmp.set(k.look[0], k.look[1], k.look[2]), alpha);
    state.camera.lookAt(look.current);
    const cam = state.camera as THREE.PerspectiveCamera;
    cam.fov = lerp(cam.fov, k.fov, alpha);
    cam.updateProjectionMatrix();
  });

  return null;
}

function CameraRig() {
  const group = useRef<THREE.Group>(null);
  const progress = useScroll((s) => s.progress);
  const reduced = useScroll((s) => s.reduced);
  const orbit = useScroll((s) => s.orbit);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const d = Math.min(delta, 0.1);
    const p = progress;

    // Study phase: scroll-driven orbit during CameraStudy section
    const study = smoothstep(0.1, 0.16, p) * (1 - smoothstep(0.28, 0.38, p));

    // Pull-out phase: model fades MUCH later (not until p=0.55+)
    const after = smoothstep(0.55, 0.65, p);

    const turns = smoothstep(0.12, 0.34, p) * Math.PI * 4;

    // Hero idle animation: gentle breathing rotation
    const heroSpin = reduced
      ? 0.38
      : 0.38 + Math.sin(state.clock.elapsedTime * 0.22) * 0.06;

    const targetY = (study > 0.02 ? 0.38 + turns : heroSpin) + orbit;
    g.rotation.y = lerp(g.rotation.y, targetY, 1 - Math.exp(-2.8 * d));

    // Subtle pitch float
    g.rotation.x = lerp(
      g.rotation.x,
      -0.08 + Math.sin(state.clock.elapsedTime * 0.38) * 0.015,
      1 - Math.exp(-2.8 * d),
    );

    // Scale: stays at 1.08 until well past the CameraStudy section,
    // then gently scales down. Never goes below 0.04 to avoid pop-in.
    const targetScale = Math.max(0.04, 1.08 * (1 - after));
    g.scale.setScalar(lerp(g.scale.x, targetScale, 1 - Math.exp(-3.5 * d)));

    // Visibility: only hide when truly gone (scale < 0.06) to prevent
    // the abrupt "wink out" that was happening at p≈0.3
    g.visible = g.scale.x > 0.055;
  });

  return (
    <group ref={group}>
      {/* Main fill light from front-right — warm tungsten-like */}
      <pointLight position={[0.8, 0.9, 1.8]} intensity={9} color="#f0d8a8" distance={7} />
      {/* Rim light from top-left — cooler, adds depth */}
      <pointLight position={[-1.2, 1.4, -0.5]} intensity={5} color="#a8c4e8" distance={6} />
      <Dslr />
    </group>
  );
}

export function World({ fancy }: { fancy: boolean }) {
  return (
    <>
      <color attach="background" args={["#060504"]} />
      <fog attach="fog" args={["#060504", 8, 28]} />
      <ambientLight intensity={0.1} color="#ede8de" />
      <spotLight
        position={[4.2, 6.0, 4.0]}
        intensity={60}
        color="#dcc07a"
        angle={0.36}
        penumbra={0.88}
        castShadow
        shadow-mapSize-width={768}
        shadow-mapSize-height={768}
      />
      {/* Cool back-fill for nice rim separation */}
      <spotLight
        position={[-5.0, 2.2, -1.8]}
        intensity={24}
        color="#6f88b2"
        angle={0.52}
        penumbra={1}
      />
      <pointLight position={[0.4, 0.1, 1.3]} intensity={5} color="#ffd8a0" distance={5} />
      <directionalLight position={[0, 3, -9]} intensity={0.3} color="#ede8de" />

      <Rig />
      <CameraRig />
      <PhotoFrames />
      <Backdrop />
      <Dust count={fancy ? 360 : 140} />
      <Sparkles
        count={fancy ? 52 : 22}
        scale={[14, 6, 11]}
        size={2.6}
        speed={0.3}
        color="#f2c869"
        opacity={0.42}
      />
      <ContactShadows
        position={[0, -1.18, 0]}
        opacity={0.5}
        scale={12}
        blur={2.6}
        far={4.5}
        color="#000000"
      />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.18, 0]} receiveShadow>
        <circleGeometry args={[9, 52]} />
        <meshStandardMaterial color="#060504" roughness={0.92} metalness={0.18} />
      </mesh>

      {fancy ? (
        <EffectComposer multisampling={0} enableNormalPass={false}>
          <Bloom luminanceThreshold={0.38} intensity={0.72} mipmapBlur luminanceSmoothing={0.18} />
          <Vignette offset={0.24} darkness={0.72} />
          <Noise premultiply blendFunction={BlendFunction.OVERLAY} opacity={0.22} />
          <ChromaticAberration offset={[0.0006, 0.0004]} />
        </EffectComposer>
      ) : null}
    </>
  );
}
