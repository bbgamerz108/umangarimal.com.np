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

const KEYS: Key[] = [
  { p: 0, pos: [2.45, 0.58, 4.55], look: [-0.35, 0.06, 0.12], fov: 34 },
  { p: 0.08, pos: [2.1, 0.5, 4.2], look: [-0.15, 0.04, 0.08], fov: 33 },
  { p: 0.14, pos: [-0.45, 0.32, 2.95], look: [0.85, 0.05, 0], fov: 31 },
  { p: 0.26, pos: [-1.85, 0.52, 3.15], look: [0.45, 0.06, 0], fov: 32 },
  { p: 0.34, pos: [0.15, 0.7, 6.2], look: [0, 0.08, -1.5], fov: 38 },
  { p: 0.48, pos: [0.2, 0.85, 9.0], look: [0, 0.1, -3.2], fov: 42 },
  { p: 0.62, pos: [1.2, 0.45, 6.4], look: [-0.3, 0, -1.8], fov: 38 },
  { p: 0.78, pos: [-1.4, 0.7, 5.2], look: [0.15, 0.08, -0.6], fov: 40 },
  { p: 1, pos: [0.3, 1.2, 7.4], look: [0, 0.15, 0], fov: 44 },
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
      mat.current.opacity = 0.55 * (1 - smoothstep(0.08, 0.22, progress));
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
      tmp.x += mouseX * 0.7;
      tmp.y += mouseY * 0.32;
    }
    const alpha = 1 - Math.exp(-3.2 * d);
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
    const study = smoothstep(0.1, 0.16, p) * (1 - smoothstep(0.3, 0.4, p));
    const after = smoothstep(0.3, 0.38, p);
    const turns = smoothstep(0.12, 0.34, p) * Math.PI * 4;
    const heroSpin = reduced ? 0.52 : 0.52 + Math.sin(state.clock.elapsedTime * 0.28) * 0.07;
    const y = (study > 0.02 ? 0.4 + turns : heroSpin) + orbit;
    g.rotation.y = lerp(g.rotation.y, y, 1 - Math.exp(-3 * d));
    g.rotation.x = lerp(g.rotation.x, -0.1 + Math.sin(state.clock.elapsedTime * 0.4) * 0.02, 1 - Math.exp(-3 * d));
    const scale = 1.12 * (1 - after);
    g.scale.setScalar(lerp(g.scale.x, Math.max(0.001, scale), 1 - Math.exp(-4 * d)));
    g.visible = after < 0.98;
  });

  return (
    <group ref={group}>
      <pointLight position={[0.6, 0.8, 1.6]} intensity={7} color="#f0d7a4" distance={6} />
      <Dslr />
    </group>
  );
}

export function World({ fancy }: { fancy: boolean }) {
  return (
    <>
      <color attach="background" args={["#060504"]} />
      <fog attach="fog" args={["#060504", 7, 26]} />
      <ambientLight intensity={0.12} color="#efe9dd" />
      <spotLight
        position={[4.5, 6.2, 4.2]}
        intensity={55}
        color="#e2c48a"
        angle={0.38}
        penumbra={0.85}
        castShadow
        shadow-mapSize-width={768}
        shadow-mapSize-height={768}
      />
      <spotLight position={[-5.2, 2.4, -1.5]} intensity={22} color="#7f93b8" angle={0.55} penumbra={1} />
      <pointLight position={[0.5, 0.15, 1.4]} intensity={6} color="#ffd9a0" distance={5} />
      <directionalLight position={[0, 3, -8]} intensity={0.35} color="#efe9dd" />

      <Rig />
      <CameraRig />
      <PhotoFrames />
      <Backdrop />
      <Dust count={fancy ? 320 : 130} />
      <Sparkles
        count={fancy ? 46 : 20}
        scale={[12, 5, 10]}
        size={2.4}
        speed={0.35}
        color="#f2c869"
        opacity={0.45}
      />
      <ContactShadows
        position={[0, -1.15, 0]}
        opacity={0.45}
        scale={12}
        blur={2.4}
        far={4}
        color="#000000"
      />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.16, 0]} receiveShadow>
        <circleGeometry args={[8, 48]} />
        <meshStandardMaterial color="#060504" roughness={0.9} metalness={0.2} />
      </mesh>

      {fancy ? (
        <EffectComposer multisampling={0} enableNormalPass={false}>
          <Bloom luminanceThreshold={0.4} intensity={0.68} mipmapBlur luminanceSmoothing={0.2} />
          <Vignette offset={0.26} darkness={0.7} />
          <Noise premultiply blendFunction={BlendFunction.OVERLAY} opacity={0.2} />
          <ChromaticAberration offset={[0.0008, 0.0005]} />
        </EffectComposer>
      ) : null}
    </>
  );
}
