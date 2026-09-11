import { useEffect, useRef, useState } from "react";
import { NAV, SITE } from "@/lib/content";
import { useScroll } from "@/lib/scroll";
import { cn } from "@/lib/cn";

export function Loader() {
  const [open, setOpen] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const a = window.setTimeout(() => setOpen(true), 120);
    const b = window.setTimeout(() => setGone(true), 980);
    return () => {
      window.clearTimeout(a);
      window.clearTimeout(b);
    };
  }, []);

  return (
    <div className={cn("loader", open && "is-open", gone && "is-gone")} aria-hidden={gone}>
      <span className="loader-wordmark">r. umanga*</span>
      <p className="loader-name">{SITE.name}</p>
      <span className="loader-sub">est. Kathmandu</span>
    </div>
  );
}

export function Grain() {
  return <div className="grain" aria-hidden="true" />;
}

export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const hovering = useScroll((s) => s.hovering);
  const albumHover = useScroll((s) => s.albumHover);
  const rx = useRef(0);
  const ry = useRef(0);
  const mx = useRef(0);
  const my = useRef(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mx.current = e.clientX;
      my.current = e.clientY;
      if (dot.current) {
        dot.current.style.left = `${e.clientX}px`;
        dot.current.style.top = `${e.clientY}px`;
      }
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    let raf = 0;
    const loop = () => {
      rx.current += (mx.current - rx.current) * 0.12;
      ry.current += (my.current - ry.current) * 0.12;
      if (ring.current) {
        ring.current.style.left = `${rx.current}px`;
        ring.current.style.top = `${ry.current}px`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  const label = albumHover ? "SCROLL ALBUM" : hovering;

  return (
    <>
      <div ref={dot} className="cursor-dot" />
      <div ref={ring} className={cn("cursor-ring", label && "is-on")}>
        {label}
      </div>
    </>
  );
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const setHover = useScroll((s) => s.setHovering);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      <nav className={cn("site-nav", scrolled && "is-scrolled")}>
        <a href="#top" className="nav-brand" onMouseEnter={() => setHover("Home")} onMouseLeave={() => setHover(null)}>
          <span className="wordmark">r. umanga*</span>
        </a>
        <div className="nav-links">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              onMouseEnter={() => setHover(n.label)}
              onMouseLeave={() => setHover(null)}
            >
              {n.label}
            </a>
          ))}
        </div>
        <button
          type="button"
          className="nav-burger"
          aria-expanded={open} aria-controls="navigation-drawer" aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span style={{ transform: open ? "translateY(6px) rotate(45deg)" : "none" }} />
          <span style={{ opacity: open ? 0 : 1 }} />
          <span style={{ transform: open ? "translateY(-6px) rotate(-45deg)" : "none" }} />
        </button>
      </nav>
      <div id="navigation-drawer" inert={!open} className={cn("nav-drawer", open && "is-open")} aria-hidden={!open}>
        {NAV.map((n) => (
          <a key={n.href} href={n.href} onClick={() => setOpen(false)}>
            {n.label}
          </a>
        ))}
        <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
      </div>
    </>
  );
}
