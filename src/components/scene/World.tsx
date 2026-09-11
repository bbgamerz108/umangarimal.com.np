import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useScroll } from "@/lib/scroll";
import { Dslr } from "./Dslr";
import { Dust } from "./Dust";

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function CameraRig() {
  const group = useRef<THREE.Group>(null);
  const orbit = useScroll((s) => s.orbit);
  const reduced = useScroll((s) => s.reduced);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const d = Math.min(delta, 0.1);
    // Gentle idle rotation + user orbit
    const idle = reduced
      ? 0.4
      : 0.4 + Math.sin(state.clock.elapsedTime * 0.18) * 0.05;
    const targetY = idle + orbit;
    g.rotation.y = lerp(g.rotation.y, targetY, 1 - Math.exp(-2.5 * d));
    g.rotation.x = lerp(g.rotation.x, -0.08, 1 - Math.exp(-2 * d));
  });

  return (
    <group ref={group}>
      <pointLight
        position={[1.2, 1.2, 2]}
        intensity={12}
        color="#f8ecd8"
        distance={8}
      />
      <pointLight
        position={[-1.5, 0.8, -0.5]}
        intensity={4}
        color="#c8d8f0"
        distance={6}
      />
      <Dslr />
    </group>
  );
}

export function World({ fancy }: { fancy: boolean }) {
  return (
    <>
      <color attach="background" args={["#100e0c"]} />
      <ambientLight intensity={0.08} color="#ede0cc" />
      <spotLight
        position={[3.5, 5, 3.5]}
        intensity={fancy ? 50 : 35}
        color="#e8d090"
        angle={0.4}
        penumbra={0.9}
        castShadow={false}
      />
      <CameraRig />
      <Dust count={fancy ? 180 : 60} />
    </>
  );
}
