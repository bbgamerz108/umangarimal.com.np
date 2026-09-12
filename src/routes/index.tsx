import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Loader, Nav } from "@/components/chrome/Chrome";
import { Portfolio } from "@/components/portfolio/Portfolio";
import { useScroll } from "@/lib/scroll";
export const Route = createFileRoute("/")({ component: Home });
function Home() {
  useEffect(()=>{const mq=matchMedia('(prefers-reduced-motion: reduce)');const update=()=>useScroll.getState().setReduced(mq.matches);update();mq.addEventListener('change',update);return()=>mq.removeEventListener('change',update);},[]);
  return <><a className="skip-link" href="#photography">Skip to photographs</a><Loader/><Nav/><Portfolio/></>;
}
