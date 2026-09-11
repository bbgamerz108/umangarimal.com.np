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
  const t = useScroll((s) => s.cameraT);
  const reduced = useScroll((s) => s.reduced);

  useFrame((_, delta) => {
    const g = group.current;
    if (!g) return;
    const d = Math.min(delta, 0.08);
    const k = 1 - Math.exp(-(reduced ? 6 : 9) * d);
    // Full 360 yaw + barrel + somersault — not a single-axis spin
    const targetY = reduced ? 0.3 : t * Math.PI * 2;
    const targetX = reduced ? -0.1 : Math.sin(t * Math.PI * 2) * 0.35 + t * Math.PI * 2;
    const targetZ = reduced ? 0 : Math.sin(t * Math.PI * 2) * 0.65;
    g.rotation.y = lerp(g.rotation.y, targetY, k);
    g.rotation.x = lerp(g.rotation.x, targetX, k);
    g.rotation.z = lerp(g.rotation.z, targetZ, k);
    const s = 1.18 + Math.sin(t * Math.PI) * 0.1;
    g.scale.setScalar(lerp(g.scale.x, s, k));
  });

  return (
    <group ref={group} position={[0, -0.05, 0]}>
      <pointLight position={[1.4, 1.3, 2.2]} intensity={14} color="#ffe6c4" distance={9} />
      <pointLight position={[-1.8, 0.6, -0.4]} intensity={6} color="#7ad4c8" distance={7} />
      <pointLight position={[0.2, -1.2, 1.4]} intensity={4} color="#e05a3a" distance={6} />
      <Dslr />
    </group>
  );
}

export function World({ fancy }: { fancy: boolean }) {
  const reduced = useScroll(s => s.reduced);
  return (
    <>


      <ambientLight intensity={1.1} color="#f0d8b8" />
      <spotLight
        position={[3.2, 5.4, 3.2]}
        intensity={fancy ? 55 : 38}
        color="#ffd28a"
        angle={0.42}
        penumbra={0.92}
      />
      <spotLight
        position={[-4, 2.2, 1]}
        intensity={18}
        color="#5aa0c8"
        angle={0.5}
        penumbra={1}
      />
      <CameraRig />
      {!reduced && <Dust count={fancy ? 90 : 25} />}
    </>
  );
}
