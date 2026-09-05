import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";

export function Dslr() {
  const rec = useRef<THREE.MeshStandardMaterial>(null);

  const mats = useMemo(() => {
    const body = new THREE.MeshStandardMaterial({
      color: "#1a1612",
      roughness: 0.38,
      metalness: 0.72,
    });
    const leather = new THREE.MeshStandardMaterial({
      color: "#0e0c0a",
      roughness: 0.82,
      metalness: 0.08,
    });
    const gold = new THREE.MeshStandardMaterial({
      color: "#d4a94f",
      roughness: 0.28,
      metalness: 0.92,
    });
    const glass = new THREE.MeshStandardMaterial({
      color: "#071018",
      roughness: 0.06,
      metalness: 0.95,
    });
    const dark = new THREE.MeshStandardMaterial({
      color: "#090807",
      roughness: 0.5,
      metalness: 0.4,
    });
    const lcd = new THREE.MeshStandardMaterial({
      color: "#14110c",
      roughness: 0.2,
      metalness: 0.3,
      emissive: "#3a2a12",
      emissiveIntensity: 0.35,
    });
    return { body, leather, gold, glass, dark, lcd };
  }, []);

  useFrame((state) => {
    if (rec.current) {
      rec.current.emissiveIntensity = 0.45 + Math.sin(state.clock.elapsedTime * 4) * 0.4;
    }
  });

  const blades = 8;

  return (
    <group>
      <RoundedBox args={[1.72, 1.05, 0.82]} radius={0.06} smoothness={4} castShadow receiveShadow material={mats.body} />
      <RoundedBox args={[1.55, 0.72, 0.84]} radius={0.05} smoothness={4} position={[0.02, -0.08, 0]} material={mats.leather} />
      <RoundedBox args={[0.46, 1.08, 0.92]} radius={0.08} smoothness={4} position={[0.78, -0.04, 0.04]} castShadow material={mats.leather} />
      <RoundedBox args={[0.2, 0.55, 0.7]} radius={0.04} position={[0.92, 0.02, 0.08]} material={mats.body} />
      <RoundedBox args={[1.62, 0.14, 0.78]} radius={0.03} position={[0, 0.54, 0]} material={mats.body} />
      <RoundedBox args={[0.62, 0.38, 0.52]} radius={0.03} position={[-0.12, 0.72, -0.08]} material={mats.body} />

      <mesh position={[-0.12, 0.86, 0.18]} rotation={[0.4, 0, 0]} material={mats.dark}>
        <boxGeometry args={[0.5, 0.08, 0.28]} />
      </mesh>
      <mesh position={[-0.12, 0.94, -0.08]} material={mats.gold}>
        <boxGeometry args={[0.28, 0.06, 0.18]} />
      </mesh>
      <mesh position={[0.52, 0.66, -0.18]} rotation={[Math.PI / 2, 0, 0]} castShadow material={mats.dark}>
        <cylinderGeometry args={[0.13, 0.13, 0.08, 24]} />
      </mesh>
      <mesh position={[0.52, 0.71, -0.18]} rotation={[Math.PI / 2, 0, 0]} material={mats.gold}>
        <cylinderGeometry args={[0.09, 0.09, 0.02, 24]} />
      </mesh>
      <mesh position={[0.78, 0.64, 0.16]} rotation={[Math.PI / 2, 0, 0]} material={mats.gold}>
        <cylinderGeometry args={[0.055, 0.055, 0.05, 20]} />
      </mesh>
      <mesh position={[0.62, 0.58, 0.42]}>
        <sphereGeometry args={[0.025, 12, 12]} />
        <meshStandardMaterial ref={rec} color="#f2c869" emissive="#f2c869" emissiveIntensity={0.8} roughness={0.3} />
      </mesh>

      <group position={[0, -0.04, 0.42]}>
        <mesh position={[0, 0, 0.18]} rotation={[Math.PI / 2, 0, 0]} castShadow material={mats.body}>
          <cylinderGeometry args={[0.42, 0.46, 0.38, 48]} />
        </mesh>
        <mesh position={[0, 0, 0.4]} rotation={[Math.PI / 2, 0, 0]} material={mats.dark}>
          <cylinderGeometry args={[0.44, 0.44, 0.08, 48]} />
        </mesh>
        <mesh position={[0, 0, 0.48]} rotation={[Math.PI / 2, 0, 0]} material={mats.gold}>
          <torusGeometry args={[0.45, 0.028, 12, 48]} />
        </mesh>
        <mesh position={[0, 0, 0.62]} rotation={[Math.PI / 2, 0, 0]} castShadow material={mats.body}>
          <cylinderGeometry args={[0.4, 0.42, 0.28, 48]} />
        </mesh>
        <mesh position={[0, 0, 0.76]} rotation={[Math.PI / 2, 0, 0]} material={mats.gold}>
          <torusGeometry args={[0.4, 0.02, 10, 40]} />
        </mesh>
        <mesh position={[0, 0, 0.78]} rotation={[Math.PI / 2, 0, 0]} material={mats.glass}>
          <circleGeometry args={[0.36, 48]} />
        </mesh>
        <group position={[0, 0, 0.79]} rotation={[Math.PI / 2, 0, 0]}>
          {Array.from({ length: blades }).map((_, i) => (
            <mesh key={i} rotation={[0, 0, (i / blades) * Math.PI * 2]} material={mats.gold}>
              <boxGeometry args={[0.018, 0.22, 0.008]} />
            </mesh>
          ))}
        </group>
        <mesh position={[0, 0, 0.8]} rotation={[Math.PI / 2, 0, 0]} material={mats.gold}>
          <ringGeometry args={[0.36, 0.4, 48]} />
        </mesh>
      </group>

      <RoundedBox args={[0.78, 0.52, 0.03]} radius={0.02} position={[-0.12, -0.04, -0.42]} material={mats.lcd} />
      <mesh position={[-0.12, -0.04, -0.438]}>
        <planeGeometry args={[0.7, 0.44]} />
        <meshBasicMaterial color="#1c140c" />
      </mesh>
      <mesh position={[-0.12, 0.62, -0.38]} rotation={[Math.PI / 2, 0, 0]} material={mats.dark}>
        <cylinderGeometry args={[0.12, 0.14, 0.1, 20]} />
      </mesh>
      <mesh position={[-0.88, 0.32, 0]} rotation={[0, 0, Math.PI / 2]} material={mats.gold}>
        <torusGeometry args={[0.05, 0.014, 8, 16]} />
      </mesh>
      <mesh position={[0.88, 0.38, -0.1]} rotation={[0, 0, Math.PI / 2]} material={mats.gold}>
        <torusGeometry args={[0.05, 0.014, 8, 16]} />
      </mesh>
      <mesh position={[0.46, 0.28, -0.42]}>
        <circleGeometry args={[0.07, 24]} />
        <meshStandardMaterial color="#d4a94f" metalness={0.9} roughness={0.3} />
      </mesh>
    </group>
  );
}
