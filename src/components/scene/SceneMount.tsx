import { Component, lazy, Suspense, useEffect, useRef, useState, type ReactNode } from "react";
const SceneCanvas = lazy(() => import("./SceneCanvas").then(m=>({default:m.SceneCanvas})));
class SceneBoundary extends Component<{children:ReactNode},{failed:boolean}> {
  state={failed:false};
  static getDerivedStateFromError(){return {failed:true};}
  render(){return this.state.failed ? <p className="camera-fallback">The 3D study is unavailable on this device.</p> : this.props.children;}
}
export function SceneMount() {
  const host=useRef<HTMLDivElement>(null);
  const [loaded,setLoaded]=useState(false);
  const [active,setActive]=useState(false);
  useEffect(()=>{
    const el=host.current;if(!el)return;
    let inView=false;
    const visibility=()=>setActive(inView&&!document.hidden);
    const preload=new IntersectionObserver(([entry])=>{if(entry.isIntersecting){setLoaded(true);preload.disconnect();}},{rootMargin:"250px"});
    const observer=new IntersectionObserver(([entry])=>{inView=entry.isIntersecting;visibility();});
    preload.observe(el);observer.observe(el);document.addEventListener('visibilitychange',visibility);
    return ()=>{preload.disconnect();observer.disconnect();document.removeEventListener('visibilitychange',visibility);};
  },[]);
  return <div ref={host} className="scene-root" aria-hidden="true"><SceneBoundary><Suspense fallback={<span className="scene-loading">Preparing the camera study</span>}>{loaded&&<SceneCanvas active={active}/>}</Suspense></SceneBoundary></div>;
}
