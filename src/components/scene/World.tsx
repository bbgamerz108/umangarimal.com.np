import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useScroll } from "@/lib/scroll";
import { Dslr } from "./Dslr";

// The model moves; the viewing camera stays fixed. No pointer orbit or whole-page timing.
function CameraRig({ active }: { active: boolean }) {
  const group = useRef<THREE.Group>(null);
  const invalidate = useThree(s => s.invalidate);
  const started = useRef(false);
  useEffect(() => {
    if (active) invalidate();
    return useScroll.subscribe((next, previous) => {
      if (active && (next.cameraT !== previous.cameraT || next.reduced !== previous.reduced)) invalidate();
    });
  }, [active, invalidate]);
  useFrame((_, dt) => {
    if (!active || !group.current) return;
    const { cameraT: t, reduced } = useScroll.getState();
    const x = reduced ? -0.12 : -0.12 + t * Math.PI * 2;
    const y = reduced ? -0.35 : -0.35 + t * Math.PI * 2;
    const z = reduced ? 0 : Math.sin(t * Math.PI * 2) * 0.32;
    const r = group.current.rotation;
    const alpha = reduced || !started.current ? 1 : 1 - Math.exp(-15 * Math.min(dt, 0.05));
    r.set(THREE.MathUtils.lerp(r.x, x, alpha), THREE.MathUtils.lerp(r.y, y, alpha), THREE.MathUtils.lerp(r.z, z, alpha));
    started.current = true;
    if (Math.abs(r.x - x) + Math.abs(r.y - y) + Math.abs(r.z - z) > 0.001) invalidate();
  });
  return <group ref={group} position={[0,-0.1,0]}><Dslr /></group>;
}

export function World({ active }: { active: boolean }) {
  return <>
    <ambientLight intensity={1.1} color="#eee9df" />
    <directionalLight position={[3,4,5]} intensity={3.5} color="#f4dfb2" />
    <directionalLight position={[-4,1,2]} intensity={2} color="#bcc7dd" />
    <directionalLight position={[0,2,-4]} intensity={4} color="#d8bd7c" />
    <CameraRig active={active} />
  </>;
}
