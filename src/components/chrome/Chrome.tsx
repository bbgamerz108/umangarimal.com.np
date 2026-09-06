import { useEffect, useRef, useState } from "react";
import { NAV, SITE } from "@/lib/content";
import { useScroll } from "@/lib/scroll";
import { cn } from "@/lib/cn";

export function Loader() {
  const [open, setOpen] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const a = window.setTimeout(() => setOpen(true), 380);
    const b = window.setTimeout(() => setGone(true), 1180);
    return () => {
      window.clearTimeout(a);
      window.clearTimeout(b);
    };
  }, []);

  return (
    <div
      className={cn("loader", open && "is-open", gone && "is-gone")}
      aria-hidden={gone}
    >
      <div className="aperture">
        <span />
      </div>
      <div className="loader-mark gold-foil">UMANGA RIMAL</div>
    </div>
  );
}

export function Grain() {
  return (
    <>
      {/* Fine animated film grain — drifts via CSS keyframes in styles.css */}
      <div className="grain" aria-hidden="true" />
      {/* Coarse warm gold-dust overlay — colour-dodge, brightens highlights only */}
      <div className="gold-dust" aria-hidden="true" />
    </>
  );
}

export function Corners() {
  return (
    <>
      {(["tl", "tr", "bl", "br"] as const).map((c) => (
        <div
          key={c}
          aria-hidden="true"
          className={cn(
            "pointer-events-none fixed z-40 hidden size-5 border-gold-dim md:block",
            c === "tl" && "top-4 left-4 border-t border-l",
            c === "tr" && "top-4 right-4 border-t border-r",
            c === "bl" && "bottom-4 left-4 border-b border-l",
            c === "br" && "bottom-4 right-4 border-b border-r",
          )}
        />
      ))}
    </>
  );
}

export function Hud() {
  const y = useScroll((s) => s.y);
  const frame = Math.min(999, Math.floor(y / 6) + 1)
    .toString()
    .padStart(3, "0");

  return (
    <div className="pointer-events-none fixed top-20 right-0 left-0 z-40 hidden justify-between px-10 text-[10.5px] tracking-[0.14em] text-dim uppercase lg:flex">
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-2 text-gold-bright">
          <span className="hud-rec-dot" />
          REC
        </div>
        <div>CAM 01</div>
        <div className="tabular-nums">FRAME {frame}</div>
      </div>
      <div className="flex flex-col items-end gap-1.5">
        <div>24 FPS · 1/50 · F/2.8</div>
        <div>ISO 400 · 18–55MM</div>
        <div>FOCUS: LOCKED</div>
      </div>
    </div>
  );
}

export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const hovering = useScroll((s) => s.hovering);
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
      rx.current += (mx.current - rx.current) * 0.16;
      ry.current += (my.current - ry.current) * 0.16;
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

  return (
    <>
      <div ref={dot} className="cursor-dot" />
      <div ref={ring} className={cn("cursor-ring", hovering && "is-on")}>
        {hovering}
      </div>
    </>
  );
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 right-0 left-0 z-50 flex items-center justify-between px-6 py-6 transition-[padding,background-color,border-color] duration-500 md:px-10",
        scrolled
          ? "border-b border-line bg-void/85 py-3.5 backdrop-blur-md"
          : "border-b border-transparent bg-gradient-to-b from-void/60 to-transparent",
      )}
    >
      <a href="#top" className="font-display text-[17px] tracking-wide text-ivory">
        {SITE.name}
      </a>
      <div
        className={cn(
          "flex gap-8 text-xs tracking-[0.1em] uppercase",
          "max-md:fixed max-md:top-0 max-md:right-0 max-md:h-svh max-md:w-[72%] max-md:max-w-xs max-md:flex-col max-md:items-start max-md:justify-center max-md:gap-7 max-md:border-l max-md:border-line max-md:bg-near max-md:px-10 max-md:transition-transform max-md:duration-500",
          open ? "max-md:translate-x-0" : "max-md:translate-x-full",
        )}
      >
        {NAV.map((n) => (
          <a
            key={n.href}
            href={n.href}
            onClick={() => setOpen(false)}
            className="text-ivory/80 transition-colors hover:text-gold-bright"
          >
            {n.label}
          </a>
        ))}
      </div>
      <button
        type="button"
        className="relative z-50 flex flex-col gap-1.5 md:hidden"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="block h-px w-5.5 bg-ivory" />
        <span className="block h-px w-5.5 bg-ivory" />
        <span className="block h-px w-5.5 bg-ivory" />
      </button>
    </nav>
  );
}
