import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { NAV, SITE } from "@/lib/content";
import * as Dialog from "@radix-ui/react-dialog";

export function Loader() {
  const [gone,setGone]=useState(false);
  useEffect(()=>{const timer=setTimeout(()=>setGone(true),1050);return()=>clearTimeout(timer);},[]);
  return gone?null:<div className="opening-curtain" aria-hidden="true"><img src="/brand/ru-wordmark-gold.svg" alt=""/><span>PHOTOGRAPHY · CINEMATOGRAPHY</span></div>;
}
export function Nav() {
  const [scrolled,setScrolled]=useState(false);
  const [open,setOpen]=useState(false);
  useEffect(()=>{const scroll=()=>setScrolled(window.scrollY>50);scroll();addEventListener('scroll',scroll,{passive:true});return()=>removeEventListener('scroll',scroll);},[]);
  return <nav className={`main-nav ${scrolled?'is-scrolled':''}`} aria-label="Main navigation">
    <a className="brand-link" href="#top" aria-label="R. Umanga home"><img src="/brand/ru-wordmark-ivory.svg" alt="R. Umanga"/></a>
    <div className="desktop-nav">{NAV.map(n=><a href={n.href} key={n.href}>{n.label}</a>)}</div>
    <Dialog.Root open={open} onOpenChange={setOpen}><Dialog.Trigger className="mobile-menu" aria-label="Open menu"><Menu size={24}/></Dialog.Trigger><Dialog.Portal><Dialog.Overlay className="menu-shade"/><Dialog.Content className="menu-panel" aria-describedby={undefined}><Dialog.Title className="sr-only">Navigation</Dialog.Title><Dialog.Close className="menu-close" aria-label="Close menu"><X/></Dialog.Close><img src="/brand/ru-wordmark-gold.svg" alt="R. Umanga"/>{NAV.map((n,i)=><a href={n.href} key={n.href} onClick={()=>setOpen(false)}><span>0{i+1}</span>{n.label}<ArrowUpRight size={22}/></a>)}<a className="menu-instagram" href={SITE.instagram} target="_blank" rel="noreferrer">{SITE.instagramHandle}</a></Dialog.Content></Dialog.Portal></Dialog.Root>
  </nav>;
}
