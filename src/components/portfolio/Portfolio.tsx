import {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  CREATIVE_PROJECTS,
  DEV_PROJECTS,
  EQUIPMENT,
  FILMS,
  JOURNEY,
  PHOTO_CATEGORIES,
  PHOTOS,
  SITE,
  SOCIALS,
  type Photo,
} from "@/lib/content";
import { useScroll } from "@/lib/scroll";
import { cn } from "@/lib/cn";

/* ─── Lazy 3-D canvas — only loads when CameraSection is on screen ─── */
const SceneCanvas = lazy(() =>
  import("@/components/scene/SceneCanvas").then((m) => ({
    default: m.SceneCanvas,
  })),
);

/* ─── Reveal hook ────────────────────────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<Element>(".reveal, .stagger");
    const io = new IntersectionObserver(
      (entries) => {
        for (const en of entries) {
          if (en.isIntersecting) {
            en.target.classList.add("in");
            io.unobserve(en.target);
          }
        }
      },
      { threshold: 0.07 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ─── Helpers ────────────────────────────────────────────────────── */
function Hover({
  label,
  children,
  className,
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  const set = useScroll((s) => s.setHovering);
  return (
    <div
      className={className}
      onMouseEnter={() => set(label)}
      onMouseLeave={() => set(null)}
    >
      {children}
    </div>
  );
}

function L({ children }: { children: ReactNode }) {
  return <span className="label">{children}</span>;
}

function Wrap({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-screen-xl px-6 md:px-12 lg:px-16",
        className,
      )}
    >
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   HERO
═══════════════════════════════════════════════════════════════════ */
function Hero() {
  const mouseX = useScroll((s) => s.mouseX);
  const mouseY = useScroll((s) => s.mouseY);
  const reduced = useScroll((s) => s.reduced);
  const px = reduced ? 0 : mouseX * 12;
  const py = reduced ? 0 : mouseY * 8;

  return (
    <section
      id="top"
      style={{
        position: "relative",
        minHeight: "100svh",
        background: "var(--color-bg)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Background image — right side, desktop only + subtle parallax */}
      <div
        className="hidden md:block"
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          bottom: 0,
          width: "45%",
          zIndex: 0,
          overflow: "hidden",
        }}
      >
        <img
          src="/photos/durbar-dusk.webp"
          alt=""
          aria-hidden="true"
          style={{
            width: "110%",
            height: "110%",
            objectFit: "cover",
            filter: "brightness(0.6) saturate(0.85)",
            display: "block",
            transform: `translate(${px}px, ${py}px)`,
            transition: reduced ? "none" : "transform 0.45s cubic-bezier(0.2,0.8,0.2,1)",
            willChange: "transform",
          }}
        />
        {/* Gradient fade on left edge */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to right, var(--color-bg) 0%, transparent 30%)",
          }}
        />
      </div>

      {/* Vertical rule separating left/right on desktop */}
      <div
        className="hidden md:block"
        style={{
          position: "absolute",
          left: "55%",
          top: "10%",
          bottom: "10%",
          width: "1px",
          background: "var(--color-rule)",
          zIndex: 1,
        }}
      />

      {/* Top bar */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "28px 32px 0",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 12,
            letterSpacing: "0.12em",
            color: "var(--color-ink-muted)",
          }}
        >
          {SITE.name}
        </span>
        <span
          style={{
            fontSize: 9,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "var(--color-ink-muted)",
          }}
        >
          Nepal · 2026
        </span>
      </div>

      {/* Main content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 32px",
          maxWidth: "58%",
          paddingLeft: 32,
        }}
        className="max-w-full md:max-w-[58%]"
      >
        <div className="stagger">
          <div style={{ marginBottom: 8 }}>
            <L>Photographer · Cinematographer</L>
          </div>
          <h1
            className="display"
            style={{
              fontSize: "clamp(64px, 11vw, 152px)",
              lineHeight: 0.88,
              marginBottom: 28,
              color: "var(--color-ink)",
            }}
          >
            {SITE.name}
          </h1>
          <p
            style={{
              fontSize: 14,
              lineHeight: 1.75,
              color: "var(--color-ink-muted)",
              maxWidth: 340,
              marginBottom: 40,
            }}
          >
            {SITE.statement}
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a href="#photography" className="btn-primary">
              View Work
            </a>
            <a href="#contact" className="btn-ghost">
              Get in Touch
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 32px 28px",
        }}
      >
        <div style={{ display: "flex", gap: 20 }}>
          {["Photography", "Cinematography", "Color"].map((t) => (
            <span
              key={t}
              style={{
                fontSize: 9,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "var(--color-ink-muted)",
              }}
            >
              {t}
            </span>
          ))}
        </div>
        <span
          style={{
            fontSize: 11,
            color: "var(--color-ink-muted)",
            letterSpacing: "0.1em",
          }}
        >
          Scroll ↓
        </span>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   OPENING IMAGES  (asymmetric editorial grid)
═══════════════════════════════════════════════════════════════════ */
function OpeningImages() {
  return (
    <section aria-label="Portfolio images">
      {/* Desktop: CSS grid layout */}
      <div className="photo-grid photo-grid-main hidden md:grid">
        <div className="pg-a">
          <img
            src="/photos/durbar-dusk.webp"
            alt="Durbar at Dusk — Kathmandu"
            loading="lazy"
          />
        </div>
        <div className="pg-b">
          <img
            src="/photos/temple-light.webp"
            alt="Courtyard Light"
            loading="lazy"
          />
        </div>
        <div className="pg-c">
          <img
            src="/photos/ceremony.webp"
            alt="Ceremony Frame"
            loading="lazy"
          />
        </div>
      </div>

      {/* Mobile: stacked */}
      <div className="flex flex-col gap-[3px] md:hidden">
        {[
          { src: "/photos/durbar-dusk.webp", alt: "Durbar at Dusk" },
          { src: "/photos/temple-light.webp", alt: "Courtyard Light" },
          { src: "/photos/ceremony.webp", alt: "Ceremony Frame" },
        ].map(({ src, alt }) => (
          <div key={src} style={{ height: 280, overflow: "hidden" }}>
            <img
              src={src}
              alt={alt}
              loading="lazy"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   INTRO  (center-aligned editorial quote)
═══════════════════════════════════════════════════════════════════ */
function Intro() {
  return (
    <section
      style={{
        padding: "88px 32px",
        background: "var(--color-bg)",
        textAlign: "center",
      }}
    >
      <div className="reveal" style={{ maxWidth: 640, margin: "0 auto" }}>
        <blockquote
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(22px, 3.5vw, 36px)",
            fontWeight: 300,
            fontStyle: "italic",
            lineHeight: 1.45,
            letterSpacing: "-0.01em",
            color: "var(--color-ink)",
            marginBottom: 32,
          }}
        >
          "Light is not something you find — it's something you wait for, then
          recognise."
        </blockquote>
        <div
          style={{
            width: 48,
            height: 1,
            background: "var(--color-accent)",
            margin: "0 auto",
          }}
        />
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   CONTACT SHEET  (horizontal drag-scroll filmstrip)
═══════════════════════════════════════════════════════════════════ */
function ContactSheet() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ on: false, x: 0, scrollLeft: 0 });

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    const el = scrollRef.current;
    if (!el) return;
    drag.current = { on: true, x: e.clientX, scrollLeft: el.scrollLeft };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!drag.current.on) return;
    const el = scrollRef.current;
    if (!el) return;
    const dx = (e.clientX - drag.current.x) * 1.5;
    el.scrollLeft = drag.current.scrollLeft - dx;
  }, []);

  const onPointerUp = useCallback(() => {
    drag.current.on = false;
  }, []);

  // Build the filmstrip: all photos + repeating to fill
  const frames = [...PHOTOS, ...PHOTOS.slice(0, 4)];

  return (
    <section
      style={{
        background: "var(--color-camera-bg)",
        padding: "0",
        overflow: "hidden",
      }}
    >
      {/* Header row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "20px 24px 14px",
          borderBottom: "1px solid rgb(255 255 255 / 0.06)",
        }}
      >
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "var(--color-accent)",
            display: "inline-block",
            flexShrink: 0,
          }}
        />
        <span
          style={{
            fontSize: 9,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "rgba(240,232,216,0.5)",
          }}
        >
          Contact Sheet · Roll 01
        </span>
        <span
          style={{
            marginLeft: "auto",
            fontSize: 9,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "rgba(240,232,216,0.25)",
          }}
        >
          {frames.length} frames
        </span>
      </div>

      {/* Scrollable strip */}
      <div
        ref={scrollRef}
        className="film-scroll"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        style={{ padding: "12px 0 16px" }}
      >
        {frames.map((p, i) => (
          <div
            key={`${p.id}-${i}`}
            className="film-frame"
            style={{ width: 172, height: 116 }}
          >
            <img src={p.src} alt={p.title} draggable={false} loading="lazy" />
            {/* Frame number */}
            <div
              style={{
                position: "absolute",
                bottom: 4,
                left: 5,
                fontSize: 8,
                letterSpacing: "0.18em",
                color: "rgba(240,232,216,0.35)",
                fontVariantNumeric: "tabular-nums",
                pointerEvents: "none",
              }}
            >
              {String(i + 1).padStart(2, "0")}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   CAMERA SECTION  ← KEY FIX: canvas inside section, not fixed
═══════════════════════════════════════════════════════════════════ */
function CameraSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [fancy, setFancy] = useState(false);
  const [flash, setFlash] = useState(false);
  const [shot, setShot] = useState<string | null>(null);
  const addOrbit = useScroll((s) => s.addOrbit);
  const drag = useRef({ on: false, x: 0 });
  const shotTimer = useRef<number | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setFancy(mq.matches && !reduced.matches);
    update();
    mq.addEventListener("change", update);
    reduced.addEventListener("change", update);
    return () => {
      mq.removeEventListener("change", update);
      reduced.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const fireShutter = useCallback(() => {
    if (flash) return;
    setFlash(true);
    const frames = [
      "/photos/durbar-dusk.webp",
      "/photos/temple-light.webp",
      "/photos/mandap.webp",
      "/photos/window-study.webp",
      "/photos/square-lights.webp",
      "/photos/ceremony.webp",
    ];
    const pick = frames[Math.floor(Math.random() * frames.length)];
    setShot(pick);
    try {
      const AC =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      const ctx = new AC();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = 180;
      osc.type = "square";
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.07);
    } catch {
      /* AudioContext may be blocked */
    }
    window.setTimeout(() => setFlash(false), 120);
    if (shotTimer.current) window.clearTimeout(shotTimer.current);
    shotTimer.current = window.setTimeout(() => setShot(null), 2200);
  }, [flash]);

  return (
    <section
      id="camera"
      ref={sectionRef}
      style={{
        position: "relative",
        height: "100vh",
        minHeight: 500,
        background: "var(--color-camera-bg)",
        overflow: "hidden",
      }}
    >
      {/* ── 3-D Canvas — absolute inside section, desktop only ── */}
      <div
        className="hidden md:block"
        style={{ position: "absolute", inset: 0, zIndex: 0 }}
      >
        {visible && (
          <Suspense fallback={null}>
            <SceneCanvas fancy={fancy} />
          </Suspense>
        )}
      </div>

      {/* ── Film texture overlay ── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 5,
          pointerEvents: "none",
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: "200px 200px",
          opacity: 0.08,
          mixBlendMode: "overlay" as const,
        }}
      />

      {/* ── Drag-to-orbit zone (desktop) ── */}
      <div
        className="absolute inset-0 hidden md:block"
        style={{ cursor: "ew-resize", zIndex: 6 }}
        onPointerDown={(e) => {
          drag.current = { on: true, x: e.clientX };
          (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
        }}
        onPointerUp={() => {
          drag.current.on = false;
        }}
        onPointerMove={(e) => {
          if (!drag.current.on) return;
          addOrbit((e.clientX - drag.current.x) * 0.006);
          drag.current.x = e.clientX;
        }}
      />

      {/* Flash overlay */}
      <div aria-hidden="true" className={`cam-flash ${flash ? "is-on" : ""}`} />

      {/* Captured shot preview */}
      {shot && (
        <div className="cam-shot" aria-hidden="true">
          <img src={shot} alt="" />
          <span>FRAME CAPTURED</span>
        </div>
      )}

      {/* ── Text — bottom left ── */}
      <div
        style={{
          position: "absolute",
          bottom: 48,
          left: 40,
          zIndex: 10,
          maxWidth: 380,
          pointerEvents: "none",
        }}
      >
        <L>The Instrument</L>
        <h2
          className="display"
          style={{
            fontSize: "clamp(28px, 4vw, 52px)",
            marginTop: 10,
            marginBottom: 12,
            color: "#f0e8d8",
          }}
        >
          Canon EOS 850D
        </h2>
        <p
          style={{
            fontSize: 13,
            lineHeight: 1.8,
            color: "rgba(240,232,216,0.55)",
          }}
        >
          Not just equipment — the tool through which I first learned to see.
        </p>
        <p
          className="hidden md:block"
          style={{
            marginTop: 16,
            fontSize: 9,
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: "rgba(240,232,216,0.35)",
          }}
        >
          ← Drag to orbit · Click shutter to shoot →
        </p>
      </div>

      {/* Shutter button */}
      <Hover label="Shoot">
        <button
          type="button"
          className="cam-shutter"
          onClick={fireShutter}
          aria-label="Fire shutter"
        >
          <span className="cam-shutter-ring" />
          <span className="cam-shutter-dot" />
        </button>
      </Hover>

      {/* ── Specs — bottom right (desktop) ── */}
      <div
        className="absolute hidden flex-col gap-3 text-right md:flex"
        style={{
          bottom: 48,
          right: 40,
          zIndex: 10,
          pointerEvents: "none",
        }}
      >
        {(
          [
            ["Body", "Canon EOS 850D"],
            ["Lens", "EF-S 18–55mm STM"],
            ["Sensor", "24.1 MP APS-C"],
          ] as const
        ).map(([k, v]) => (
          <div key={k}>
            <span
              style={{
                fontSize: 8,
                letterSpacing: "0.24em",
                textTransform: "uppercase",
                color: "rgba(240,232,216,0.35)",
                display: "block",
              }}
            >
              {k}
            </span>
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 13,
                fontStyle: "italic",
                color: "rgba(240,232,216,0.75)",
              }}
            >
              {v}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   LIGHTBOX
═══════════════════════════════════════════════════════════════════ */
function Lightbox({
  photos,
  index,
  onClose,
  onNavigate,
}: {
  photos: Photo[];
  index: number;
  onClose: () => void;
  onNavigate: (nextIndex: number) => void;
}) {
  const photo = photos[index];
  const startY = useRef(0);
  const startX = useRef(0);
  const [dir, setDir] = useState<"left" | "right" | null>(null);

  const go = useCallback(
    (delta: number) => {
      if (photos.length <= 1) return;
      const next = (index + delta + photos.length) % photos.length;
      setDir(delta > 0 ? "right" : "left");
      // brief direction flash for polish, then clear
      window.setTimeout(() => setDir(null), 280);
      onNavigate(next);
    },
    [index, photos.length, onNavigate],
  );

  // Keyboard: Escape, arrows
  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" || e.key === "ArrowDown") go(1);
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") go(-1);
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose, go]);

  // Prevent body scroll while open
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  if (!photo) return null;

  return (
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={photo.title}
      onClick={onClose}
      onTouchStart={(e) => {
        startY.current = e.touches[0].clientY;
        startX.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        const dy = e.changedTouches[0].clientY - startY.current;
        const dx = e.changedTouches[0].clientX - startX.current;
        if (Math.abs(dy) > Math.abs(dx) && dy > 70) onClose();
        else if (Math.abs(dx) > 60) go(dx < 0 ? 1 : -1);
      }}
    >
      {/* Close */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="lb-close"
      >
        ✕
      </button>

      {/* Prev / Next arrows */}
      {photos.length > 1 && (
        <>
          <button
            type="button"
            className="lb-nav lb-prev"
            onClick={(e) => {
              e.stopPropagation();
              go(-1);
            }}
            aria-label="Previous photo"
          >
            ‹
          </button>
          <button
            type="button"
            className="lb-nav lb-next"
            onClick={(e) => {
              e.stopPropagation();
              go(1);
            }}
            aria-label="Next photo"
          >
            ›
          </button>
        </>
      )}

      {/* Image + caption */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`lb-stage ${dir ? `lb-stage-${dir}` : ""}`}
      >
        <img
          key={photo.id}
          src={photo.src}
          alt={photo.title}
          className="lb-img"
          draggable={false}
        />
        <div className="lb-caption">
          <span className="lb-cat">{photo.cat}</span>
          <p className="lb-title">{photo.title}</p>
          <p className="lb-note">{photo.note}</p>
          {photos.length > 1 && (
            <p className="lb-counter">
              {index + 1} / {photos.length}
            </p>
          )}
        </div>
        <button
          type="button"
          onClick={onClose}
          className="lb-close-mobile md:hidden"
        >
          Close
        </button>
      </div>

      {/* Mini film-strip thumbnails */}
      {photos.length > 1 && (
        <div className="lb-strip" onClick={(e) => e.stopPropagation()}>
          {photos.map((p, i) => (
            <button
              key={p.id}
              type="button"
              className={`lb-thumb ${i === index ? "is-active" : ""}`}
              onClick={() => onNavigate(i)}
              aria-label={`Go to ${p.title}`}
            >
              <img src={p.src} alt="" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   GALLERY  (masonry, filterable)
═══════════════════════════════════════════════════════════════════ */
function Gallery() {
  const [active, setActive] = useState<(typeof PHOTO_CATEGORIES)[number]>("All");
  const [lbIndex, setLbIndex] = useState<number | null>(null);

  const filtered =
    active === "All" ? PHOTOS : PHOTOS.filter((p) => p.cat === active);

  const counts = useMemo(() => {
    const c: Record<string, number> = { All: PHOTOS.length };
    for (const p of PHOTOS) c[p.cat] = (c[p.cat] ?? 0) + 1;
    return c;
  }, []);

  const openAt = (photo: Photo) => {
    const i = filtered.findIndex((p) => p.id === photo.id);
    setLbIndex(i >= 0 ? i : 0);
  };

  return (
    <section
      id="photography"
      style={{ background: "var(--color-bg)", padding: "88px 0 64px" }}
    >
      <Wrap>
        {/* Section header */}
        <div style={{ marginBottom: 40 }}>
          <L>Still Frames</L>
          <h2
            className="display reveal"
            style={{ fontSize: "clamp(32px,5vw,64px)", marginTop: 8, marginBottom: 24 }}
          >
            Photography
          </h2>

          {/* Category filter — interactive with counts */}
          <div
            className="stagger filter-bar"
            style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}
          >
            {PHOTO_CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  setActive(cat);
                  setLbIndex(null);
                }}
                className={`filter-pill ${active === cat ? "is-active" : ""}`}
              >
                {cat}
                <span className="filter-count">{counts[cat] ?? 0}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Masonry grid */}
        <div className="masonry">
          {filtered.map((photo, i) => (
            <Hover key={photo.id} label="View">
              <button
                type="button"
                className="masonry-item"
                onClick={() => openAt(photo)}
                aria-label={`Open ${photo.title}`}
                style={{
                  width: "100%",
                  background: "none",
                  border: "none",
                  padding: 0,
                  textAlign: "left",
                  animationDelay: `${Math.min(i * 0.04, 0.4)}s`,
                }}
              >
                <img src={photo.src} alt={photo.title} loading="lazy" />
                <div className="masonry-overlay">
                  <span
                    style={{
                      fontSize: 8,
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      color: "rgba(240,232,216,0.6)",
                      display: "block",
                      marginBottom: 2,
                    }}
                  >
                    {photo.cat}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: 14,
                      color: "rgba(240,232,216,0.9)",
                    }}
                  >
                    {photo.title}
                  </span>
                </div>
              </button>
            </Hover>
          ))}
        </div>
      </Wrap>

      {/* Lightbox with nav + film strip */}
      {lbIndex !== null && filtered[lbIndex] && (
        <Lightbox
          photos={filtered}
          index={lbIndex}
          onClose={() => setLbIndex(null)}
          onNavigate={setLbIndex}
        />
      )}
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   FILMS  (dark, film-archive treatment)
═══════════════════════════════════════════════════════════════════ */
function Films() {
  return (
    <section
      id="cinematography"
      style={{
        background: "var(--color-camera-bg)",
        padding: "88px 0 64px",
      }}
    >
      <Wrap>
        <div style={{ marginBottom: 48 }}>
          <L>Motion</L>
          <h2
            className="display reveal"
            style={{
              fontSize: "clamp(32px,5vw,64px)",
              marginTop: 8,
              color: "#f0e8d8",
            }}
          >
            Cinematography
          </h2>
        </div>

        {FILMS.map((film, i) => (
          <div key={i} style={{ marginBottom: 64 }}>
            {/* Still image — full width */}
            <div
              style={{
                position: "relative",
                overflow: "hidden",
                aspectRatio: "16/9",
                marginBottom: 24,
              }}
            >
              <img
                src={film.still}
                alt={film.project}
                loading="lazy"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  filter: "brightness(0.75) saturate(0.7)",
                  display: "block",
                  transition: "transform 0.8s var(--ease-out)",
                }}
              />
              {/* "FILM" watermark */}
              <div
                style={{
                  position: "absolute",
                  top: 20,
                  left: 20,
                  fontSize: 9,
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color: "rgba(240,232,216,0.4)",
                }}
              >
                {film.year} · {film.camera}
              </div>
            </div>

            {/* Metadata row */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "16px 40px",
                padding: "20px 0",
                borderTop: "1px solid rgb(255 255 255 / 0.08)",
              }}
            >
              <div>
                <span
                  style={{
                    fontSize: 8,
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                    color: "rgba(240,232,216,0.3)",
                    display: "block",
                    marginBottom: 4,
                  }}
                >
                  Project
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 22,
                    fontWeight: 300,
                    color: "#f0e8d8",
                    fontStyle: "italic",
                  }}
                >
                  {film.project}
                </span>
              </div>
              {[
                ["Frame Rate", film.frameRate],
                ["Lens", film.lens],
                ["Role", film.role],
              ].map(([k, v]) => (
                <div key={k}>
                  <span
                    style={{
                      fontSize: 8,
                      letterSpacing: "0.25em",
                      textTransform: "uppercase",
                      color: "rgba(240,232,216,0.3)",
                      display: "block",
                      marginBottom: 4,
                    }}
                  >
                    {k}
                  </span>
                  <span
                    style={{
                      fontSize: 12,
                      color: "rgba(240,232,216,0.7)",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {v}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Coming soon note */}
        <div
          style={{
            padding: "40px 0",
            borderTop: "1px solid rgb(255 255 255 / 0.06)",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(14px,2vw,18px)",
              fontStyle: "italic",
              color: "rgba(240,232,216,0.3)",
              letterSpacing: "0.02em",
            }}
          >
            More in progress — motion work takes time.
          </p>
        </div>
      </Wrap>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   STYLE WORDS  (scroll-activated typography)
═══════════════════════════════════════════════════════════════════ */
const WORDS = [
  "Deliberate.",
  "Quiet.",
  "Honest.",
  "Grounded.",
  "Iterative.",
];

function StyleWords() {
  const refs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    refs.current.forEach((el) => {
      if (!el) return;
      const io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            el.classList.add("lit");
          } else {
            el.classList.remove("lit");
          }
        },
        { threshold: 0.5 },
      );
      io.observe(el);
      observers.push(io);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <section
      style={{
        background: "var(--color-bg)",
        padding: "88px 32px",
        textAlign: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
          marginBottom: 56,
        }}
      >
        {WORDS.map((w, i) => (
          <span
            key={w}
            ref={(el) => {
              refs.current[i] = el;
            }}
            className="style-word"
          >
            {w}
          </span>
        ))}
      </div>
      <div
        className="reveal"
        style={{ maxWidth: 440, margin: "0 auto" }}
      >
        <blockquote
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(16px, 2vw, 20px)",
            fontStyle: "italic",
            fontWeight: 300,
            color: "var(--color-ink-muted)",
            lineHeight: 1.6,
          }}
        >
          "I'm not trying to make images that impress. I'm trying to make
          images that stay."
        </blockquote>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   COLOR GRADE  (before / after slider)
═══════════════════════════════════════════════════════════════════ */
function ColorGrade() {
  const [split, setSplit] = useState(50);
  const boxRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const setFromEvent = useCallback(
    (clientX: number) => {
      const box = boxRef.current;
      if (!box) return;
      const rect = box.getBoundingClientRect();
      const pct = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
      setSplit(pct);
    },
    [],
  );

  return (
    <section
      id="color"
      style={{
        background: "var(--color-surface)",
        padding: "88px 0 64px",
      }}
    >
      <Wrap>
        <div style={{ marginBottom: 32 }}>
          <L>Color Grading</L>
          <h2
            className="display reveal"
            style={{ fontSize: "clamp(28px,4vw,52px)", marginTop: 8 }}
          >
            Before / After
          </h2>
        </div>

        {/* Grade slider — robust pointer drag */}
        <div
          ref={boxRef}
          className="grade-box reveal"
          onPointerDown={(e) => {
            dragging.current = true;
            (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
            setFromEvent(e.clientX);
          }}
          onPointerMove={(e) => {
            if (!dragging.current) return;
            setFromEvent(e.clientX);
          }}
          onPointerUp={() => {
            dragging.current = false;
          }}
          onPointerCancel={() => {
            dragging.current = false;
          }}
        >
          {/* After (full width, background) */}
          <div className="grade-layer">
            <img
              src="/photos/grade-after.webp"
              alt="After color grade"
              draggable={false}
            />
          </div>

          {/* Before (clipped to left of handle) */}
          <div
            className="grade-layer"
            style={{ clipPath: `inset(0 ${100 - split}% 0 0)` }}
          >
            <img
              src="/photos/grade-original.webp"
              alt="Before color grade"
              draggable={false}
            />
          </div>

          {/* Handle */}
          <div
            className="grade-handle"
            style={{ left: `${split}%` }}
            aria-hidden="true"
          />

          {/* Labels */}
          <div
            style={{
              position: "absolute",
              top: 14,
              left: 16,
              fontSize: 8,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: "rgba(240,232,216,0.5)",
              pointerEvents: "none",
            }}
          >
            Original
          </div>
          <div
            style={{
              position: "absolute",
              top: 14,
              right: 16,
              fontSize: 8,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: "rgba(240,232,216,0.5)",
              pointerEvents: "none",
            }}
          >
            Graded
          </div>
        </div>

        <p
          style={{
            marginTop: 20,
            fontSize: 11,
            color: "var(--color-ink-muted)",
            fontStyle: "italic",
          }}
        >
          Drag the handle to compare the ungraded and graded frames.
        </p>
      </Wrap>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   ABOUT
═══════════════════════════════════════════════════════════════════ */
function About() {
  return (
    <section
      id="about"
      style={{ background: "var(--color-bg)", padding: "88px 0 64px" }}
    >
      <Wrap>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: 48,
          }}
          className="md:grid-cols-[5fr_7fr]"
        >
          {/* Portrait */}
          <div className="reveal">
            <div
              style={{
                aspectRatio: "3/4",
                overflow: "hidden",
                background: "var(--color-surface)",
              }}
            >
              <img
                src="/photos/window-study.webp"
                alt={`${SITE.name} — portrait`}
                loading="lazy"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  filter: "saturate(0.85)",
                  display: "block",
                }}
              />
            </div>
          </div>

          {/* Text */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <div className="stagger">
              <L>About</L>
              <h2
                className="display"
                style={{
                  fontSize: "clamp(32px,5vw,60px)",
                  marginTop: 12,
                  marginBottom: 28,
                  whiteSpace: "pre-line",
                }}
              >
                {"Still learning\nto see."}
              </h2>
              <p
                style={{
                  fontSize: 15,
                  lineHeight: 1.8,
                  color: "var(--color-ink-muted)",
                  marginBottom: 20,
                  maxWidth: 520,
                }}
              >
                I'm {SITE.name}, a photographer and cinematographer based in{" "}
                {SITE.location}. I work with natural light and honest moments —
                documenting the quiet poetry of everyday life.
              </p>
              <p
                style={{
                  fontSize: 15,
                  lineHeight: 1.8,
                  color: "var(--color-ink-muted)",
                  marginBottom: 36,
                  maxWidth: 520,
                }}
              >
                Everything I do is in progress. I'm learning composition,
                colour, motion, and how to make things that last. This site is
                part of that process.
              </p>

              {/* Skill tags */}
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {[
                  "Photography",
                  "Cinematography",
                  "Color",
                  "Editing",
                  "Design",
                ].map((s) => (
                  <span
                    key={s}
                    style={{
                      border: "1px solid var(--color-rule-hi)",
                      padding: "5px 12px",
                      fontSize: 9,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "var(--color-ink-muted)",
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Wrap>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   THE LAB  (experimental / dev projects)
═══════════════════════════════════════════════════════════════════ */
const LAB_ITEMS = [
  {
    num: "01",
    title: "This Portfolio",
    desc: "A cinematic 3D personal site — scroll-driven, WebGL, art-directed.",
  },
  {
    num: "02",
    title: "Color Tooling",
    desc: "Experiments in browser-based LUT application and grade visualisation.",
  },
  {
    num: "03",
    title: "Light Studies",
    desc: "A personal archive of light experiments and notes on natural light.",
  },
];

function Lab() {
  return (
    <section
      id="lab"
      style={{ background: "var(--color-surface)", padding: "88px 0 64px" }}
    >
      <Wrap>
        <div style={{ marginBottom: 48 }}>
          <L>Experiments</L>
          <h2
            className="display reveal"
            style={{ fontSize: "clamp(32px,5vw,64px)", marginTop: 8 }}
          >
            The Lab
          </h2>
        </div>

        <div>
          {LAB_ITEMS.map((item) => (
            <div
              key={item.num}
              className="reveal"
              style={{
                display: "grid",
                gridTemplateColumns: "56px 1fr auto",
                gap: "0 24px",
                padding: "28px 0",
                borderTop: "1px solid var(--color-rule)",
                alignItems: "start",
                transition: "padding-left 0.3s var(--ease-out)",
                cursor: "default",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.paddingLeft = "10px";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.paddingLeft = "0";
              }}
            >
              <span
                style={{
                  fontSize: 10,
                  letterSpacing: "0.2em",
                  color: "var(--color-accent)",
                  paddingTop: 4,
                }}
              >
                {item.num}
              </span>
              <div>
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 20,
                    fontWeight: 300,
                    marginBottom: 6,
                    color: "var(--color-ink)",
                  }}
                >
                  {item.title}
                </p>
                <p
                  style={{
                    fontSize: 13,
                    lineHeight: 1.7,
                    color: "var(--color-ink-muted)",
                  }}
                >
                  {item.desc}
                </p>
              </div>
              <span
                style={{
                  fontSize: 18,
                  color: "var(--color-rule-hi)",
                  paddingTop: 2,
                }}
              >
                →
              </span>
            </div>
          ))}
          {/* Last border */}
          <div
            style={{ borderTop: "1px solid var(--color-rule)", height: 1 }}
          />
        </div>
      </Wrap>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   EQUIPMENT
═══════════════════════════════════════════════════════════════════ */
function Equipment() {
  return (
    <section
      id="gear"
      style={{ background: "var(--color-bg)", padding: "88px 0 64px" }}
    >
      <Wrap>
        <div style={{ marginBottom: 40 }}>
          <L>Gear</L>
          <h2
            className="display reveal"
            style={{ fontSize: "clamp(28px,4vw,52px)", marginTop: 8 }}
          >
            Equipment
          </h2>
        </div>

        <div className="stagger">
          {EQUIPMENT.map((item) => (
            <div key={item.idx} className="equip-row">
              <span
                style={{
                  fontSize: 9,
                  letterSpacing: "0.2em",
                  color: "var(--color-accent)",
                  paddingTop: 3,
                }}
              >
                {item.idx}
              </span>
              <div>
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 18,
                    fontWeight: 300,
                    marginBottom: 3,
                  }}
                >
                  {item.name}
                </p>
                <p
                  style={{
                    fontSize: 10,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "var(--color-ink-muted)",
                  }}
                >
                  {item.type}
                </p>
              </div>
            </div>
          ))}
          <div
            style={{
              borderTop: "1px solid var(--color-rule)",
              height: 1,
            }}
          />
        </div>
      </Wrap>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   PROJECTS  (dev + creative)
═══════════════════════════════════════════════════════════════════ */
function Projects() {
  return (
    <section
      id="projects"
      style={{ background: "var(--color-surface)", padding: "88px 0 64px" }}
    >
      <Wrap>
        <div style={{ marginBottom: 48 }}>
          <L>Work</L>
          <h2
            className="display reveal"
            style={{ fontSize: "clamp(32px,5vw,64px)", marginTop: 8 }}
          >
            Projects
          </h2>
        </div>

        {/* Dev projects — two-col cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 3,
            marginBottom: 48,
          }}
        >
          {DEV_PROJECTS.map((proj) => (
            <div
              key={proj.name}
              className="reveal"
              style={{
                background: "var(--color-bg)",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  aspectRatio: "16/9",
                  overflow: "hidden",
                }}
              >
                <img
                  src={proj.still}
                  alt={proj.name}
                  loading="lazy"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    filter: "saturate(0.8)",
                    display: "block",
                    transition: "transform 0.6s var(--ease-out)",
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLImageElement).style.transform =
                      "scale(1.04)")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLImageElement).style.transform =
                      "none")
                  }
                />
              </div>
              <div style={{ padding: "24px" }}>
                <span
                  style={{
                    fontSize: 8,
                    letterSpacing: "0.24em",
                    textTransform: "uppercase",
                    color: "var(--color-accent)",
                    display: "block",
                    marginBottom: 6,
                  }}
                >
                  {proj.role}
                </span>
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 20,
                    fontWeight: 300,
                    marginBottom: 10,
                  }}
                >
                  {proj.name}
                </p>
                <p
                  style={{
                    fontSize: 13,
                    lineHeight: 1.7,
                    color: "var(--color-ink-muted)",
                  }}
                >
                  {proj.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Creative projects — full-width row with big type */}
        {CREATIVE_PROJECTS.map((cp) => (
          <a
            key={cp.name}
            href={cp.url}
            target="_blank"
            rel="noopener noreferrer"
            className="reveal"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "32px 0",
              borderTop: "1px solid var(--color-rule)",
              borderBottom: "1px solid var(--color-rule)",
              textDecoration: "none",
              gap: 24,
              flexWrap: "wrap",
              transition: "padding-left 0.25s var(--ease-out)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.paddingLeft = "8px";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.paddingLeft = "0";
            }}
          >
            <div>
              <span
                style={{
                  fontSize: 8,
                  letterSpacing: "0.28em",
                  textTransform: "uppercase",
                  color: "var(--color-accent)",
                  display: "block",
                  marginBottom: 4,
                }}
              >
                {cp.tag}
              </span>
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(24px, 4vw, 48px)",
                  fontWeight: 300,
                  color: "var(--color-ink)",
                }}
              >
                {cp.name}
              </p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ display: "flex", gap: 5 }}>
                {cp.swatches.map((s) => (
                  <span
                    key={s}
                    style={{
                      width: 14,
                      height: 14,
                      borderRadius: 2,
                      background: s,
                      display: "inline-block",
                    }}
                  />
                ))}
              </div>
              <span
                style={{
                  fontSize: 9,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--color-ink-muted)",
                }}
              >
                {cp.handle}
              </span>
              <span style={{ fontSize: 18, color: "var(--color-ink-muted)" }}>
                ↗
              </span>
            </div>
          </a>
        ))}
      </Wrap>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   JOURNEY  (timeline)
═══════════════════════════════════════════════════════════════════ */
function Journey() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      style={{ background: "var(--color-bg)", padding: "88px 0 64px" }}
    >
      <Wrap>
        <div style={{ marginBottom: 48 }}>
          <L>Path</L>
          <h2
            className="display reveal"
            style={{ fontSize: "clamp(32px,5vw,64px)", marginTop: 8 }}
          >
            Journey
          </h2>
          <p
            style={{
              marginTop: 12,
              fontSize: 13,
              color: "var(--color-ink-muted)",
              maxWidth: 420,
            }}
          >
            Click any step to expand. Still unfolding.
          </p>
        </div>

        <div style={{ maxWidth: 560 }}>
          <div className="timeline reveal">
            {JOURNEY.map((j, i) => {
              const isOpen = open === i;
              return (
                <button
                  key={i}
                  type="button"
                  className={`timeline-item timeline-btn ${isOpen ? "is-open" : ""}`}
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                >
                  <div className="timeline-head">
                    <span className="timeline-idx">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="timeline-title">{j.title}</p>
                    <span className="timeline-chevron" aria-hidden="true">
                      {isOpen ? "−" : "+"}
                    </span>
                  </div>
                  <div
                    className="timeline-body"
                    style={{
                      maxHeight: isOpen ? 80 : 0,
                      opacity: isOpen ? 1 : 0,
                    }}
                  >
                    <p className="timeline-note">{j.note}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </Wrap>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SOCIALS  (link rows)
═══════════════════════════════════════════════════════════════════ */
function Socials() {
  return (
    <section
      style={{ background: "var(--color-surface)", padding: "64px 0" }}
    >
      <Wrap>
        <div style={{ marginBottom: 32 }}>
          <L>Follow</L>
        </div>
        <div className="stagger">
          {SOCIALS.map((s) => (
            <a
              key={s.url}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="link-row"
            >
              <div>
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 18,
                    fontWeight: 300,
                    marginBottom: 2,
                  }}
                >
                  {s.name}
                </p>
                <p
                  style={{
                    fontSize: 10,
                    letterSpacing: "0.16em",
                    color: "var(--color-ink-muted)",
                  }}
                >
                  {s.handle}
                </p>
              </div>
              <span
                style={{
                  fontSize: 18,
                  color: "var(--color-ink-muted)",
                }}
              >
                ↗
              </span>
            </a>
          ))}
        </div>
      </Wrap>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   CONTACT
═══════════════════════════════════════════════════════════════════ */
function Contact() {
  return (
    <section
      id="contact"
      style={{ background: "var(--color-bg)", padding: "88px 0 80px" }}
    >
      <Wrap>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "48px 80px",
            alignItems: "center",
          }}
          className="md:grid-cols-2"
        >
          {/* Left: big headline */}
          <div className="reveal">
            <h2
              className="display"
              style={{
                fontSize: "clamp(40px, 7vw, 96px)",
                lineHeight: 0.9,
                marginBottom: 12,
              }}
            >
              Let's make
              <br />
              something.
            </h2>
            <div
              style={{
                width: 32,
                height: 1,
                background: "var(--color-accent)",
                marginTop: 24,
              }}
            />
          </div>

          {/* Right: description + CTAs */}
          <div className="stagger">
            <p
              style={{
                fontSize: 15,
                lineHeight: 1.8,
                color: "var(--color-ink-muted)",
                marginBottom: 36,
                maxWidth: 400,
              }}
            >
              Whether it's a photo project, video work, or just a conversation
              about light — I'm open. Reach out and let's talk.
            </p>
            <div
              style={{
                display: "flex",
                gap: 12,
                flexWrap: "wrap",
                marginBottom: 36,
              }}
            >
              <a href={`mailto:${SITE.email}`} className="btn-primary">
                Send an Email
              </a>
              <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                Instagram
              </a>
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", gap: 8 }}
            >
              <a
                href={`mailto:${SITE.email}`}
                style={{
                  fontSize: 12,
                  color: "var(--color-ink-muted)",
                  textDecoration: "none",
                  letterSpacing: "0.04em",
                }}
              >
                {SITE.email}
              </a>
              <a
                href={SITE.phoneHref}
                style={{
                  fontSize: 12,
                  color: "var(--color-ink-muted)",
                  textDecoration: "none",
                  letterSpacing: "0.04em",
                }}
              >
                {SITE.phone}
              </a>
            </div>
          </div>
        </div>
      </Wrap>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   FOOTER
═══════════════════════════════════════════════════════════════════ */
function Footer() {
  return (
    <footer
      style={{
        background: "var(--color-ink)",
        padding: "24px 32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 12,
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 13,
          fontWeight: 300,
          color: "rgba(240,232,216,0.7)",
          letterSpacing: "0.04em",
        }}
      >
        {SITE.name}
      </span>
      <span
        style={{
          fontSize: 9,
          letterSpacing: "0.24em",
          textTransform: "uppercase",
          color: "rgba(240,232,216,0.3)",
        }}
      >
        Nepal · 2026
      </span>
      <span
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 12,
          fontStyle: "italic",
          color: "rgba(240,232,216,0.35)",
        }}
      >
        {SITE.statement}
      </span>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   PORTFOLIO  (root export)
═══════════════════════════════════════════════════════════════════ */
export function Portfolio() {
  useReveal();

  return (
    <div style={{ position: "relative", zIndex: 10 }}>
      <Hero />
      <OpeningImages />
      <Intro />
      <ContactSheet />
      <CameraSection />
      <Gallery />
      <Films />
      <StyleWords />
      <ColorGrade />
      <About />
      <Lab />
      <Equipment />
      <Projects />
      <Journey />
      <Socials />
      <Contact />
      <Footer />
    </div>
  );
}
