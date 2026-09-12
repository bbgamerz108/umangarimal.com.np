import { Canvas } from "@react-three/fiber";
import { World } from "./World";

export function SceneCanvas({ active }: { active: boolean }) {
  return <Canvas
    frameloop={active ? "demand" : "never"}
    dpr={[1, 1.25]}
    gl={{antialias:true,alpha:true,powerPreference:"low-power",stencil:false}}
    shadows={false}
    camera={{fov:36,near:0.1,far:20,position:[0.5,0.25,5.4]}}
    fallback={<p className="camera-fallback">The 3D study isn't supported in this browser.</p>}
  ><World active={active}/></Canvas>;
}
