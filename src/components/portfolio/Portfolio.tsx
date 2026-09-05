import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import {
  CREATIVE_PROJECTS,
  DEV_PROJECTS,
  EQUIPMENT,
  FILMS,
  JOURNEY,
  PHOTOS,
  PHOTO_CATEGORIES,
  SITE,
  SOCIALS,
  type Photo,
} from "@/lib/content";
import { useScroll } from "@/lib/scroll";
import { cn } from "@/lib/cn";

// Deterministic scatter of tilt angles for the mood-board gallery —
// each frame sits slightly askew like a pinned print, not a clean grid.
const TILT_ANGLES = [-2.6, 1.9, -1.1, 2.7, -3.1, 1.4, -1.8, 2.3, -2.1, 1.1];

// A loose, hand-drawn brushstroke used as a divider/underline instead of
// a plain straight line — one of the few purely decorative flourishes.
function Brushstroke({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 220 14"
      className={cn("block h-3 w-40 text-gold", className)}
      aria-hidden="true"
    >
      <path
        d="M2 8.5C22 3 44 11.5 66 7 90 2 112 12 138 6.5 162 1.5 184 10 218 5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function useReveal() {
  useEffect(() => {
    const nodes = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        for (const en of entries) {
          if (en.isIntersecting) en.target.classList.add("in");
        }
      },
      { threshold: 0.14 },
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);
}

function Hover({
  label,
  children,
  className,
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  const setHovering = useScroll((s) => s.setHovering);
  return (
    <div
      className={className}
      onMouseEnter={() => setHovering(label)}
      onMouseLeave={() => setHovering(null)}
    >
      {children}
    </div>
  );
}

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="text-[11px] font-medium tracking-[0.22em] text-gold uppercase">
      {children}
    </span>
  );
}

function Title({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <h2
      className={cn(
        "font-display text-[clamp(32px,5vw,60px)] leading-[1.08] font-normal tracking-tight text-balance",
        className,
      )}
    >
      {children}
    </h2>
  );
}

function Wrap({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("mx-auto w-full max-w-6xl px-6 md:px-10", className)}>{children}</div>
  );
}

function SectionHead({
  eye,
  title,
  sub,
  center,
}: {
  eye: string;
  title: string;
  sub?: string;
  center?: boolean;
}) {
  return (
    <div className={cn("reveal mb-16", center && "mx-auto text-center")}>
      <Eyebrow>{eye}</Eyebrow>
      <Title className="mt-3.5">{title}</Title>
      <Brushstroke className={cn("mt-4", center && "mx-auto")} />
      {sub ? (
        <p className="mt-3.5 max-w-md text-base leading-relaxed text-dim text-pretty">{sub}</p>
      ) : null}
    </div>
  );
}

export function Hero() {
  return (
    <header
      id="top"
      className="relative flex min-h-svh items-end overflow-hidden px-6 pt-36 pb-16 md:px-10 md:pb-20"
    >
      <div className="relative z-10 w-full max-w-3xl">
        <div className="mb-6 flex items-center gap-2.5 text-[11px] tracking-[0.2em] text-dim uppercase">
          <span className="hud-rec-dot" />
          Nepal · Visual Storytelling
        </div>
        <h1 className="font-display gold-foil text-[clamp(48px,9vw,118px)] leading-[0.95] font-medium tracking-tight">
          UMANGA
          <br />
          RIMAL
        </h1>
        <div className="mt-5 text-[13px] tracking-[0.22em] text-gold uppercase">{SITE.role}</div>
        <p className="font-display mt-7 max-w-lg text-[clamp(18px,2.1vw,26px)] leading-snug text-dim italic">
          “{SITE.statement}”
        </p>
        <Brushstroke className="mt-4 ml-1" />
        <div className="mt-10 flex flex-wrap gap-4">
          <Hover label="Explore">
            <a
              href="#photography"
              className="inline-block border border-ivory bg-ivory px-8 py-3.5 text-[11.5px] tracking-[0.14em] text-void uppercase transition-transform hover:-translate-y-0.5"
            >
              Explore My Work
            </a>
          </Hover>
          <Hover label="About">
            <a
              href="#about"
              className="inline-block border border-line-strong px-8 py-3.5 text-[11.5px] tracking-[0.14em] uppercase transition-colors hover:border-gold hover:text-gold-bright"
            >
              About Me
            </a>
          </Hover>
        </div>
      </div>
      <p className="pointer-events-none absolute right-10 bottom-8 hidden text-[10px] tracking-[0.14em] text-dim uppercase md:block">
        Scroll to orbit · drag the camera
      </p>
    </header>
  );
}

export function Filmstrip() {
  const strip = useRef<HTMLDivElement>(null);
  const drag = useRef({ down: false, start: 0, left: 0 });
  const frames = [
    ...PHOTOS,
    ...PHOTOS.slice(0, 4),
  ];

  useEffect(() => {
    const el = strip.current;
    if (!el) return;
    const onDown = (e: PointerEvent) => {
      drag.current = { down: true, start: e.pageX, left: el.scrollLeft };
      el.setPointerCapture(e.pointerId);
    };
    const onUp = () => {
      drag.current.down = false;
    };
    const onMove = (e: PointerEvent) => {
      if (!drag.current.down) return;
      el.scrollLeft = drag.current.left - (e.pageX - drag.current.start) * 1.35;
    };
    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointerleave", onUp);
    el.addEventListener("pointermove", onMove);
    return () => {
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointerleave", onUp);
      el.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div className="relative z-10 border-y border-line py-10">
      <div ref={strip} className="filmstrip px-6 md:px-10">
        {frames.map((p, i) => (
          <Hover key={p.id + i} label="Frame">
            <div className="relative h-[130px] w-[190px] shrink-0 overflow-hidden border border-line">
              <img
                src={p.src}
                alt=""
                className="h-full w-full object-cover"
                draggable={false}
                loading="lazy"
                decoding="async"
              />
              <div className="pointer-events-none absolute inset-0 border-[6px] border-void" />
              <span className="absolute right-2 bottom-2 text-[9px] tracking-[0.12em] text-ivory uppercase">
                FRM {String(i + 1).padStart(2, "0")}
              </span>
            </div>
          </Hover>
        ))}
      </div>
    </div>
  );
}

export function CameraStudy() {
  const addOrbit = useScroll((s) => s.addOrbit);
  const drag = useRef({ on: false, x: 0 });

  return (
    <section id="camera" className="relative z-10 h-[220vh]">
      <div className="sticky top-0 grid h-svh grid-cols-1 items-center gap-8 px-6 md:grid-cols-2 md:px-10">
        <div
          className="hidden h-full cursor-ew-resize md:block"
          onPointerDown={(e) => {
            drag.current = { on: true, x: e.clientX };
            (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
          }}
          onPointerUp={() => {
            drag.current.on = false;
          }}
          onPointerMove={(e) => {
            if (!drag.current.on) return;
            addOrbit((e.clientX - drag.current.x) * 0.008);
            drag.current.x = e.clientX;
          }}
        >
          <div className="flex h-full items-end pb-16">
            <span className="text-[10px] tracking-[0.16em] text-dim uppercase">
              Drag to orbit
            </span>
          </div>
        </div>
        <div className="mt-24 max-w-lg md:mt-0 md:justify-self-end">
          <Eyebrow>The camera that started it</Eyebrow>
          <Title className="mt-4">Canon EOS 850D</Title>
          <Brushstroke className="mt-4" />
          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-dim text-pretty">
            This camera isn’t just equipment — it’s the tool through which I first learned to
            see. Every frame in this portfolio began with this body and this lens, and every
            technique I’m still learning traces back to figuring out what this setup could do.
          </p>
          <div className="mt-8 border-t border-line">
            {[
              ["Body", "Canon EOS 850D"],
              ["Primary Lens", "Canon 18–55mm"],
              ["Role", "Primary tool — stills & motion"],
            ].map(([k, v]) => (
              <div
                key={k}
                className="flex items-center justify-between border-b border-line py-3.5 text-[13px]"
              >
                <span className="text-[11px] tracking-[0.06em] text-dim uppercase">{k}</span>
                <span className="font-display italic">{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Gear() {
  return (
    <section id="gear" className="relative z-10 bg-gradient-to-b from-transparent via-void to-void py-24 md:py-32">
      <Wrap>
        <SectionHead
          eye="Current setup"
          title="The Camera Bag"
          sub="What’s actually in the bag right now — no more, no less. This grows as the kit does."
        />
        <div className="reveal grid grid-cols-1 gap-px bg-line md:grid-cols-3">
          {EQUIPMENT.map((item) => (
            <div
              key={item.idx}
              className="flex min-h-[220px] flex-col justify-between bg-void px-8 py-10 transition-colors hover:bg-near"
            >
              <span className="text-[11px] tracking-[0.14em] text-gold">{item.idx}</span>
              <div>
                <h3 className="font-display text-2xl font-normal">{item.name}</h3>
                <p className="mt-2 text-[12.5px] tracking-[0.04em] text-dim uppercase">
                  {item.type}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Wrap>
    </section>
  );
}

function Lightbox({
  photo,
  onClose,
}: {
  photo: Photo;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-void/95 p-5 md:p-12"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={photo.title}
    >
      <button
        type="button"
        className="absolute top-6 right-6 text-[11px] tracking-[0.14em] text-dim uppercase hover:text-gold-bright"
      >
        Close
      </button>
      <figure
        className="relative max-h-[86svh] max-w-5xl"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={photo.src}
          alt={photo.title}
          className="max-h-[78svh] w-full object-contain"
          decoding="async"
        />
        <figcaption className="mt-4 flex items-end justify-between gap-4">
          <div>
            <div className="text-[10px] tracking-[0.14em] text-gold uppercase">{photo.cat}</div>
            <div className="font-display mt-1 text-xl italic">{photo.title}</div>
          </div>
          <div className="text-[11px] text-dim">{photo.note}</div>
        </figcaption>
      </figure>
    </div>
  );
}

function Gallery() {
  const [cat, setCat] = useState<(typeof PHOTO_CATEGORIES)[number]>("All");
  const [open, setOpen] = useState<Photo | null>(null);
  const list = PHOTOS.filter((p) => cat === "All" || p.cat === cat);

  return (
    <section id="photography" className="relative z-10 bg-void py-24 md:py-32">
      <Wrap>
        <SectionHead eye="Still Frames" title="Moments frozen in time." />
        <div className="reveal mb-11 flex flex-wrap gap-2.5">
          {PHOTO_CATEGORIES.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCat(c)}
              className={cn(
                "border px-4 py-2.5 text-[11px] tracking-[0.1em] uppercase transition-colors",
                cat === c
                  ? "border-ivory bg-ivory text-void"
                  : "border-line-strong text-dim hover:border-ivory hover:text-ivory",
              )}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="masonry reveal">
          {list.map((p, i) => (
            <Hover key={p.id} label="View">
              <button
                type="button"
                className={cn(
                  "frame group relative overflow-hidden border border-line",
                  cat === "All" ? p.size : "s2",
                )}
                style={{ "--tilt": `${TILT_ANGLES[i % TILT_ANGLES.length]}deg` } as CSSProperties}
                onClick={() => setOpen(p)}
              >
                <img
                  src={p.src}
                  alt={p.title}
                  className="frame-img"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-void/90 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="text-[9.5px] tracking-[0.12em] text-gold-bright uppercase">
                    {p.cat}
                  </div>
                  <div className="font-display mt-1 text-[15px] italic">{p.title}</div>
                </div>
              </button>
            </Hover>
          ))}
        </div>
      </Wrap>
      {open ? <Lightbox photo={open} onClose={() => setOpen(null)} /> : null}
    </section>
  );
}

function Films() {
  return (
    <section id="cinematography" className="relative z-10 bg-void py-24 md:py-32">
      <Wrap>
        <SectionHead eye="Moving Frames" title="Stories told through motion." />
        {FILMS.map((f) => (
          <div
            key={f.project}
            className="reveal grid grid-cols-1 gap-10 border-y border-line py-11 md:grid-cols-[1fr_1.3fr]"
          >
            <Hover label="Play">
              <div className="relative aspect-video overflow-hidden border border-line">
                <img
                  src={f.still}
                  alt=""
                  className="h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-void/20">
                  <div className="flex size-12 items-center justify-center rounded-full border border-gold-dim">
                    <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
                      <path d="M2.5 1.2v9.6L10.5 6z" fill="currentColor" className="text-gold-bright" />
                    </svg>
                  </div>
                </div>
              </div>
            </Hover>
            <div>
              <h3 className="font-display text-[26px] font-normal">{f.project}</h3>
              <div className="mt-2.5 text-[11.5px] tracking-[0.1em] text-gold uppercase">
                {f.role}
              </div>
              <div className="mt-6 flex flex-wrap gap-6">
                {[
                  ["Year", f.year],
                  ["Camera", f.camera],
                  ["Lens", f.lens],
                  ["Frame Rate", f.frameRate],
                ].map(([k, v]) => (
                  <div key={k} className="text-[10.5px] tracking-[0.1em] text-dim uppercase">
                    {k}
                    <b className="font-display mt-1 block text-sm font-normal tracking-normal text-ivory italic">
                      {v}
                    </b>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </Wrap>
    </section>
  );
}

function StyleWords() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const words = el.querySelectorAll(".style-word");
    const io = new IntersectionObserver(
      (entries) => {
        for (const en of entries) {
          if (en.isIntersecting) {
            words.forEach((w, i) => {
              window.setTimeout(() => w.classList.add("lit"), i * 240);
            });
          }
        }
      },
      { threshold: 0.55 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="style" className="relative z-10 bg-void py-24 md:py-32">
      <Wrap>
        <div ref={ref} className="flex flex-col items-center py-8 text-center">
          {["LIGHT", "MOTION", "COMPOSITION", "COLOR", "STORY"].map((w) => (
            <div key={w} className="style-word" data-w={w}>
              {w}
            </div>
          ))}
          <p className="font-display mt-10 max-w-md text-lg text-dim italic">
            Every frame is an experiment with light, composition and emotion.
          </p>
        </div>
      </Wrap>
    </section>
  );
}

function ColorGrade() {
  const box = useRef<HTMLDivElement>(null);
  const [pct, setPct] = useState(52);
  const drag = useRef(false);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const setFrom = (clientX: number) => {
      const r = el.getBoundingClientRect();
      setPct(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
    };
    const onMove = (e: PointerEvent) => {
      if (drag.current) setFrom(e.clientX);
    };
    const onUp = () => {
      drag.current = false;
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, []);

  return (
    <section id="color" className="relative z-10 bg-void py-24 md:py-32">
      <Wrap>
        <SectionHead eye="Color / Mood" title="Before ← drag → After" center />
        <div
          ref={box}
          className="grade-box reveal"
          onPointerDown={(e) => {
            drag.current = true;
            const r = e.currentTarget.getBoundingClientRect();
            setPct(Math.min(100, Math.max(0, ((e.clientX - r.left) / r.width) * 100)));
          }}
        >
          <div className="grade-layer">
            <img src="/photos/grade-original.webp" alt="Original grade" loading="lazy" decoding="async" />
            <span className="absolute top-4 left-4 text-[9.5px] tracking-[0.14em] text-dim uppercase">
              Original
            </span>
          </div>
          <div
            className="grade-layer"
            style={{ clipPath: `inset(0 ${100 - pct}% 0 0)` }}
          >
            <img src="/photos/grade-after.webp" alt="Cinematic grade" loading="lazy" decoding="async" />
            <span className="absolute top-4 right-4 text-[9.5px] tracking-[0.14em] text-dim uppercase">
              Graded
            </span>
          </div>
          <div className="grade-handle" style={{ left: `${pct}%` }} />
        </div>
        <p className="mt-6 text-center text-[10.5px] tracking-[0.14em] text-dim uppercase">
          Durbar Square — a study in gold versus daylight
        </p>
      </Wrap>
    </section>
  );
}

function Lab() {
  const items = [
    {
      idx: "01",
      name: "Photography",
      p: "Camera experiments and visual studies — testing light, exposure and framing outside of finished projects.",
    },
    {
      idx: "02",
      name: "Cinematography",
      p: "Motion, framing and cinematic experiments — short tests in movement and pacing.",
    },
    {
      idx: "03",
      name: "Design",
      p: "Visual identity, posters and digital design work built alongside the visual projects.",
    },
    {
      idx: "04",
      name: "Development",
      p: "Websites, creative interfaces and digital projects — building the technology around the creative work.",
    },
  ];
  return (
    <section id="lab" className="relative z-10 bg-void py-24 md:py-32">
      <Wrap>
        <SectionHead eye="Where craft meets code" title="The Lab" />
        <div className="reveal grid grid-cols-1 gap-px bg-line md:grid-cols-2">
          {items.map((it) => (
            <div
              key={it.idx}
              className="min-h-[230px] bg-void px-8 py-12 transition-colors hover:bg-near md:px-10"
            >
              <span className="text-[11px] tracking-[0.14em] text-gold">{it.idx}</span>
              <h3 className="font-display mt-5 text-[26px] font-normal">{it.name}</h3>
              <p className="mt-3 max-w-xs text-[13.5px] leading-relaxed text-dim">{it.p}</p>
            </div>
          ))}
        </div>
      </Wrap>
    </section>
  );
}

function Dev() {
  return (
    <section id="dev" className="relative z-10 bg-void py-24 md:py-32">
      <Wrap>
        <SectionHead
          eye="Development & Design"
          title="Beyond the Frame"
          sub="I can build what I imagine."
        />
        <div className="reveal">
          {DEV_PROJECTS.map((d) => (
            <div
              key={d.name}
              className="grid grid-cols-1 items-center gap-10 border-y border-line py-11 md:grid-cols-2"
            >
              <div className="aspect-[16/10] overflow-hidden border border-line">
                <img
                  src={d.still}
                  alt=""
                  className="h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div>
                <h3 className="font-display text-2xl font-normal">{d.name}</h3>
                <div className="mt-2.5 text-[11px] tracking-[0.1em] text-gold uppercase">
                  {d.role}
                </div>
                <p className="mt-3.5 max-w-md text-[13.5px] leading-relaxed text-dim">{d.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Wrap>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" className="relative z-10 bg-void py-24 md:py-32">
      <Wrap>
        <SectionHead eye="Selected creative projects" title="Beyond the portfolio" />
        <div className="reveal mx-auto grid max-w-xl grid-cols-1 gap-px bg-line">
          {CREATIVE_PROJECTS.map((p) => (
            <div
              key={p.name}
              className="flex min-h-[320px] flex-col justify-between bg-void px-10 py-12 transition-colors hover:bg-near"
            >
              <div>
                <span className="text-[10px] tracking-[0.14em] text-dim uppercase">{p.tag}</span>
                <h3 className="font-display mt-4 text-4xl font-normal">{p.name}</h3>
                <div className="font-display mt-3.5 text-[15px] text-gold-bright italic">
                  {p.line}
                </div>
              </div>
              <div className="mt-8 flex items-end justify-between">
                <div className="flex gap-1.5">
                  {p.swatches.map((c) => (
                    <span
                      key={c}
                      className="size-4 rounded-full border border-line-strong"
                      style={{ background: c }}
                    />
                  ))}
                </div>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noreferrer"
                  className="border-b border-line-strong pb-0.5 text-[11px] tracking-[0.1em] text-dim uppercase transition-colors hover:border-gold-bright hover:text-gold-bright"
                >
                  {p.handle}
                </a>
              </div>
            </div>
          ))}
        </div>
      </Wrap>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="relative z-10 bg-void py-24 md:py-32">
      <Wrap>
        <div className="reveal grid grid-cols-1 gap-12 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
          <div className="relative aspect-[3/4] overflow-hidden border border-line">
            <img
              src="/photos/window-study.webp"
              alt="Studio light study"
              className="h-full w-full object-cover"
              loading="lazy"
              decoding="async"
            />
            <span className="absolute bottom-4 left-4 text-[10px] tracking-[0.12em] text-dim uppercase">
              Window study
            </span>
          </div>
          <div>
            <Eyebrow>Behind the Frame</Eyebrow>
            <p className="font-display mt-5 max-w-lg text-xl leading-snug text-ivory italic">
              I’m Umanga Rimal, a young creative from Nepal — still early in this, still
              learning, still figuring out what my eye actually wants to say.
            </p>
            <p className="mt-5 max-w-lg text-[15.5px] leading-8 text-dim text-pretty">
              Photography and cinematography are where I spend most of my attention right now:
              understanding light, working out how a frame should move, learning what a lens can
              and can’t do. Design and development sit alongside that — a way of building the
              digital spaces that hold the visual work, rather than leaving it stranded in a
              folder.
            </p>
            <p className="mt-5 max-w-lg text-[15.5px] leading-8 text-dim text-pretty">
              None of this is polished into a finished career yet. It’s a practice — cameras,
              timelines, color panels and code editors, all pointed at the same question: how do
              you tell a story with what you can see?
            </p>
            <div className="mt-8 flex flex-wrap gap-2.5">
              {[
                "Photography",
                "Cinematography",
                "Visual Storytelling",
                "Color Grading",
                "Design",
                "Web Development",
              ].map((t) => (
                <span
                  key={t}
                  className="border border-line-strong px-4 py-2 text-[11px] tracking-[0.08em] text-dim uppercase"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Wrap>
    </section>
  );
}

function Journey() {
  return (
    <section id="journey" className="relative z-10 bg-void py-24 md:py-32">
      <Wrap>
        <SectionHead eye="Creative journey" title="How this is building up" />
        <div className="reveal flex gap-0 overflow-x-auto pb-2">
          {JOURNEY.map((j, i) => (
            <div
              key={j.title}
              className="relative min-w-[200px] shrink-0 pr-8"
            >
              {i < JOURNEY.length - 1 ? (
                <span className="absolute top-2 right-0 h-px w-8 bg-line-strong" />
              ) : null}
              <div className="size-2.5 rounded-full border border-gold bg-void" />
              <h3 className="font-display mt-5 text-lg font-normal">{j.title}</h3>
              <span className="mt-2 block text-[10.5px] tracking-[0.1em] text-dim uppercase">
                {j.note}
              </span>
            </div>
          ))}
        </div>
      </Wrap>
    </section>
  );
}

function Socials() {
  return (
    <section id="socials" className="relative z-10 bg-void py-24 md:py-32">
      <Wrap>
        <SectionHead eye="Elsewhere" title="Socials" />
        <div className="reveal">
          {SOCIALS.map((s) => (
            <a
              key={s.url}
              href={s.url}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between border-t border-line py-6 transition-[padding] hover:pl-3.5 last:border-b"
            >
              <span className="font-display text-[22px] transition-colors hover:text-gold-bright">
                {s.name}
              </span>
              <span className="text-[12.5px] tracking-wide text-dim">{s.handle}</span>
            </a>
          ))}
        </div>
      </Wrap>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="relative z-10 bg-void py-24 md:py-32">
      <Wrap className="reveal text-center">
        <Title className="mx-auto max-w-3xl">Let’s create something worth remembering.</Title>
        <Brushstroke className="mx-auto mt-5 mb-2" />
        <p className="mt-5 mb-11 text-sm tracking-wide text-dim">
          Photography · Cinematography · Creative Projects · Collaborations
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Hover label="Instagram">
            <a
              href={SITE.instagram}
              target="_blank"
              rel="noreferrer"
              className="inline-block border border-ivory bg-ivory px-8 py-3.5 text-[11.5px] tracking-[0.14em] text-void uppercase transition-transform hover:-translate-y-0.5"
            >
              Instagram
            </a>
          </Hover>
          <Hover label="Email">
            <a
              href={`mailto:${SITE.email}`}
              className="inline-block border border-line-strong px-8 py-3.5 text-[11.5px] tracking-[0.14em] uppercase transition-colors hover:border-gold hover:text-gold-bright"
            >
              Contact Me
            </a>
          </Hover>
        </div>
        <div className="mt-11 flex flex-col items-center gap-2.5">
          <span className="mt-3 text-[10px] tracking-[0.16em] text-gold uppercase">Email</span>
          <a href={`mailto:${SITE.email}`} className="text-[13px] text-dim hover:text-gold-bright">
            {SITE.email}
          </a>
          <span className="mt-3 text-[10px] tracking-[0.16em] text-gold uppercase">Phone</span>
          <a href={SITE.phoneHref} className="text-[13px] text-dim hover:text-gold-bright">
            {SITE.phone}
          </a>
        </div>
      </Wrap>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative z-10 border-t border-line bg-void py-14 text-center">
      <div className="font-display text-[22px] tracking-wide">UMANGA RIMAL</div>
      <div className="mt-3 text-[10.5px] tracking-[0.16em] text-dim uppercase">
        Photography · Cinematography · Design · Development
      </div>
      <div className="mt-2 text-[10.5px] tracking-[0.16em] text-dim uppercase">Nepal · 2026</div>
      <div className="font-display mt-6 text-sm text-gold italic">Captured with intention.</div>
    </footer>
  );
}

export function Portfolio() {
  useReveal();
  return (
    <div className="relative z-10">
      <Hero />
      <Filmstrip />
      <CameraStudy />
      <Gear />
      <Gallery />
      <Films />
      <StyleWords />
      <ColorGrade />
      <Lab />
      <Dev />
      <Projects />
      <About />
      <Journey />
      <Socials />
      <Contact />
      <Footer />
    </div>
  );
}
