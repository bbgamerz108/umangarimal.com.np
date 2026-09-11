import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import * as THREE from "three";
import { World } from "./World";

export function SceneCanvas({ fancy }: { fancy: boolean }) {
  return (
    <div className="scene-root" aria-hidden="true">
      <Canvas
        fallback={<p className="camera-fallback">Your browser does not support the 3D view.</p>}
        dpr={fancy ? [1, 1.5] : [1, 1.1]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: fancy ? "high-performance" : "default",
          stencil: false,
        }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.15;
        }}
        camera={{ fov: 38, near: 0.1, far: 80, position: [2.05, 0.48, 3.85] }}
      >
        <Suspense fallback={null}>
          <World fancy={fancy} />
        </Suspense>
      </Canvas>
    </div>
  );
}
