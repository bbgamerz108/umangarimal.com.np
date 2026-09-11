import * as Dialog from "@radix-ui/react-dialog";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import {
  EQUIPMENT,
  JOURNEY,
  PHOTOS,
  SITE,
  SOCIALS,
  WORDS,
  type Photo,
} from "@/lib/content";
import { useScroll } from "@/lib/scroll";
const SceneCanvas = lazy(() => import("@/components/scene/SceneCanvas").then(m => ({default:m.SceneCanvas})));

function Tape({ pos, tone = "mustard" }: { pos: "tl" | "tr" | "bl"; tone?: "rose" | "mustard" | "teal" }) {
  return <span className={`tape tape-${pos} ${tone}`} aria-hidden="true" />;
}

function Polaroid({
  photo,
  className,
  rotate,
  stamp,
  onClick,
}: {
  photo: Photo;
  className?: string;
  rotate: number;
  stamp?: boolean;
  onClick?: () => void;
}) {
  const Tag = onClick ? "button" : "div";
  return (
    <Tag
      type={onClick ? "button" : undefined}
      className={`collage-item ${className ?? ""}`}
      style={{ transform: `rotate(${rotate}deg)` }}
      onClick={onClick}
      aria-label={onClick ? photo.title : undefined}
    >
      {photo.tape !== "none" && className === "collage-a" && <Tape pos="tl" tone="mustard" />}
      
      <img src={photo.src} alt={photo.title} />
      {stamp && <img src="/brand/mark.jpg" alt="" className="stamp" style={{ right: 8, bottom: 6 }} />}
    </Tag>
  );
}

function Hero() {
  return <section id="top" className="hero">
    <div className="hero-topline"><span>INDEPENDENT VISUAL PRACTICE</span><span>KATHMANDU, NP — 27.71° N</span></div>
    <h1 className="hero-title">R. UMANGA<span className="hero-star">*</span></h1>
    <div className="hero-stage"><span className="ink-splash" aria-hidden="true"/>
      <div className="hero-side"><span className="issue">VOL. 01 / ONGOING</span><p>Photography.<br/>Motion.<br/><em>A different way<br/>of seeing.</em></p><a href="#album" className="round-link" aria-label="Explore the photobook">↘</a></div>
      <div className="collage">
        <Polaroid photo={PHOTOS[1]} className="collage-a" rotate={-7} />
        <Polaroid photo={PHOTOS[0]} className="collage-b" rotate={4} />
        <Polaroid photo={PHOTOS[2]} className="collage-c" rotate={-3} />
        <span className="hand-note">a little light goes a long way.</span>
      </div>
      <div className="hero-copy"><span className="small-label">BEHIND THE FRAMES</span><p>I'm Umanga, a photographer & filmmaker in Nepal. I capture stories through light, motion and perspective.</p><p className="hero-bio">Still learning. Always looking.<br/>Also exploring design & development.</p><a href={SITE.instagram} target="_blank" rel="noreferrer">{SITE.instagramHandle} ↗</a></div>
    </div>
    <div className="hero-bottom"><span>PHOTOGRAPHY / CINEMATOGRAPHY / DESIGN / DEVELOPMENT</span><span>SCROLL TO EXPLORE ↓</span></div>
  </section>;
}

function Manifesto() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    let frame = 0;
    const paint = () => {
      frame = 0;
      ref.current?.querySelectorAll<HTMLElement>('.word-block').forEach(el => {
        const rect = el.getBoundingClientRect();
        const t = Math.max(0, Math.min(1, (innerHeight * .88 - rect.top) / (innerHeight * .62)));
        el.style.setProperty('--fill', `${t * 100}%`);
      });
    };
    const scroll = () => { if (!frame) frame = requestAnimationFrame(paint); };
    paint(); addEventListener('scroll', scroll, {passive:true}); addEventListener('resize', scroll);
    return () => { cancelAnimationFrame(frame); removeEventListener('scroll', scroll); removeEventListener('resize', scroll); };
  }, []);
  return <section ref={ref} className="manifesto" aria-label="Creative philosophy"><div className="manifesto-aside"><span className="small-label">01 / THE WAY I SEE</span><p>Nothing ordinary.<br/><em>Only overlooked.</em></p></div><div className="manifesto-words">{WORDS.filter(w=>w.word!=='LIGHT').map(w=><div className="word-block" key={w.word}><h2>{w.word}</h2></div>)}<p className="word-caption">{SITE.statement}</p></div></section>;
}

function Lightbox({
  photos,
  index,
  onClose,
  onNav,
}: {
  photos: Photo[];
  index: number;
  onClose: () => void;
  onNav: (i: number) => void;
}) {
  const photo = photos[index];
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNav((index + 1) % photos.length);
      if (e.key === "ArrowLeft") onNav((index - 1 + photos.length) % photos.length);
    };
    window.addEventListener("keydown", fn);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", fn);
    };
  }, [index, onClose, onNav, photos.length]);

  if (!photo) return null;
  return (
    <Dialog.Root open onOpenChange={(open) => { if (!open) onClose(); }}><Dialog.Portal><Dialog.Overlay className="lightbox-shade"/><Dialog.Content className="lightbox" aria-describedby={undefined}><Dialog.Title className="sr-only">{photo.title}</Dialog.Title>
      <button type="button" className="lb-close" onClick={onClose} aria-label="Close">
        ✕
      </button>
      <button
        type="button"
        className="lb-nav lb-prev"
        onClick={(e) => {
          e.stopPropagation();
          onNav((index - 1 + photos.length) % photos.length);
        }}
        aria-label="Previous"
      >
        ‹
      </button>
      <button
        type="button"
        className="lb-nav lb-next"
        onClick={(e) => {
          e.stopPropagation();
          onNav((index + 1) % photos.length);
        }}
        aria-label="Next"
      >
        ›
      </button>
      <img src={photo.src} alt={photo.title} onClick={(e) => e.stopPropagation()} />
      <p style={{ marginTop: 14, fontFamily: "var(--font-serif)", fontSize: 18 }}>{photo.title}</p>
      <p style={{ opacity: 0.55, fontSize: 12, letterSpacing: "0.16em", textTransform: "uppercase" }}>
        {photo.cat} · {index + 1} / {photos.length}
      </p>
    </Dialog.Content></Dialog.Portal></Dialog.Root>
  );
}

function Album() {
  const track = useRef<HTMLDivElement>(null);
  const hovering = useRef(false);
  const setAlbumHover = useScroll((s) => s.setAlbumHover);
  const [lb, setLb] = useState<number | null>(null);

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (!hovering.current) return;
      const el = track.current;
      if (!el) return;
      if (e.ctrlKey) return;
      const delta = (Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY) * (e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? el.clientWidth : 1);
      const next = Math.max(0, Math.min(el.scrollWidth - el.clientWidth, el.scrollLeft + delta));
      if (Math.abs(next - el.scrollLeft) < 1) return;
      e.preventDefault();
      el.scrollLeft = next;
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <section id="album" className="album">
      <div className="album-head">
        <p className="kicker" >
          02 / SELECTED FRAMES
        </p>
        <h2>The photo<span>book.</span></h2>
        <p className="album-hint">Hover the pictures and scroll — leave the strip to keep moving down the page</p>
      </div>
      <div
        ref={track}
        className="album-track" tabIndex={0} role="region" aria-label="Photobook — scroll or use arrow keys"
        onMouseEnter={() => {
          hovering.current = true;
          setAlbumHover(true);
        }}
        onMouseLeave={() => {
          hovering.current = false;
          setAlbumHover(false);
        }}
      >
        {PHOTOS.map((p, i) => (
          <figure
            key={p.id}
            className="album-card"
            style={{ transform: `rotate(${p.rotate}deg)` }}
          >
            {i === 1 || i === 5 ? <Tape pos="tl" /> : null}
            <button
              type="button"
              onClick={() => setLb(i)}
              style={{ all: "unset", cursor: "pointer", display: "block", width: "100%" }}
            >
              <img src={p.src} alt={p.title} loading="lazy" decoding="async" />
            </button>
            <span className="photo-signature">r. umanga</span>
            <figcaption>
              <h3>{p.title}</h3>
              <p>
                {p.cat} · {p.note}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>
      {lb !== null && (
        <Lightbox photos={PHOTOS} index={lb} onClose={() => setLb(null)} onNav={setLb} />
      )}
    </section>
  );
}

function CameraSection() {
  const pin = useRef<HTMLElement>(null);
  const setCameraT = useScroll((s) => s.setCameraT);
  const cameraT = useScroll((s) => s.cameraT);
  const [visible, setVisible] = useState(false);
  const [fancy, setFancy] = useState(false);

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
    const el = pin.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), {
      threshold: 0,
      rootMargin: "200px",
    });
    io.observe(el);
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const total = Math.max(1, el.offsetHeight - window.innerHeight);
      const t = Math.min(1, Math.max(0, -rect.top / total));
      setCameraT(t);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [setCameraT]);

  const fade = 1 - Math.min(1, cameraT * 1.6);

  return (
    <section id="camera" ref={pin} className="camera-pin">
      <div className="camera-sticky">
        {visible && (
          <Suspense fallback={null}>
            <SceneCanvas fancy={fancy} />
          </Suspense>
        )}
        <div className="camera-polaroid" style={{ opacity: fade, transform: `rotate(7deg) translateY(${cameraT * -40}px)` }}>
          <Tape pos="tl" />
          <img src="/photos/window-study.webp" alt="" />
          <span>First light. Still learning to see.</span>
        </div>
        <div className="camera-copy" style={{ opacity: 0.7 + fade * 0.3 }}>
          <p className="kicker" >
            The instrument
          </p>
          <h2>CANON EOS 850D</h2>
          <p>
            A small instrument. An endless way of seeing.
          </p>
        </div>
        <div className="camera-progress">FRM {String(Math.round(cameraT * 24)).padStart(2, "0")} / 24</div>
      </div>
    </section>
  );
}

function About() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="about" className="section about">
      <div className="splash-layer" style={{ opacity: 0.18 }} />
      <div className="wrap about-grid">
        <div>
          <p className="label">About</p>
          <h2>A curious eye. An unfinished story.</h2>
          <p className="about-body">
            {SITE.name} is based in {SITE.location}. Photography came first — windows,
            courtyards, blue hour in the square. Cinematography followed. Editing and
            color are in progress. Design and code are the rooms the pictures live in.
            Lumetric Studio is the practice forming around all of it.
          </p>
          <p className="about-body" style={{ marginTop: 16 }}>
            Gear is simple on purpose: {EQUIPMENT.map((e) => e.name).join(" · ")}.
          </p>
        </div>
        <div className="journey">
          {JOURNEY.map((j, i) => (
            <button key={j.title} aria-expanded={open === i} type="button" onClick={() => setOpen(open === i ? null : i)}>
              <span className="idx">{String(i + 1).padStart(2, "0")}</span>
              <span>
                <strong>{j.title}</strong>
                {open === i && (
                  <span style={{ display: "block", marginTop: 6, fontSize: 13, opacity: 0.7 }}>
                    {j.note}
                  </span>
                )}
              </span>
              <span>{open === i ? "−" : "+"}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="section contact">
      <div className="wrap">
        <p className="label">Contact</p>
        <h2>Have a story in mind?</h2>
        <div className="contact-row">
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          <a href={SITE.phoneHref}>{SITE.phone}</a>
          {SOCIALS.map((s) => (
            <a key={s.url} href={s.url} target="_blank" rel="noreferrer">
              {s.handle}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <span className="footer-wordmark">r. umanga*</span>
      <span>{SITE.location} · 2026</span>
      <span>{SITE.statement}</span>
    </footer>
  );
}

export function Portfolio() {
  return (
    <div>
      <Hero />
      <Manifesto />
      <Album />
      <CameraSection />
      <About />
      <Contact />
      <Footer />
    </div>
  );
}
