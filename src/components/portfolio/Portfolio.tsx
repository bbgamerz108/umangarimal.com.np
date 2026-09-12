import * as Dialog from "@radix-ui/react-dialog";
import { ArrowUpRight, ArrowDown, ArrowLeft, ArrowRight, Pause, Play, X } from "lucide-react";
import { SceneMount } from "@/components/scene/SceneMount";
import { useEffect, useRef, useState, type ReactNode } from "react";
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
    <span className="text-xs font-medium tracking-[0.22em] text-gold uppercase">
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
      {sub ? (
        <p className="mt-3.5 max-w-md text-base leading-relaxed text-dim text-pretty">{sub}</p>
      ) : null}
    </div>
  );
}

export function Hero() {
  return <header id="top" className="cinema-hero">
    <img className="hero-image" src="/photos/durbar-dusk.webp" alt="Temple rooftops and the evening streets of Kathmandu" fetchPriority="high"/>
    <div className="hero-shade"/>
    <div className="hero-top"><span>INDEPENDENT IMAGE MAKER</span><span>BASED IN NEPAL · AVAILABLE FOR STORIES</span></div>
    <div className="hero-heading"><span className="hero-pretitle">Photography & cinematography</span><h1><span>R. UMANGA</span></h1><p>Life, through a different lens.</p></div>
    <div className="hero-bottom"><div><span className="section-index">01 — A PERSONAL PERSPECTIVE</span><p>I'm Umanga. I capture stories through light,<br className="desktop-break"/> motion and perspective.</p></div><a className="hero-explore" href="#photography"><span>ENTER THE<br/>PHOTOBOOK</span><ArrowDown size={24}/></a><span className="hero-coordinate">KATHMANDU, NEPAL<br/>27°42′ N · 85°19′ E</span></div>
  </header>;
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
              <span className="absolute right-2 bottom-2 text-xs tracking-[0.12em] text-ivory uppercase">
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
  const section = useRef<HTMLElement>(null);
  const meter = useRef<HTMLSpanElement>(null);
  useEffect(()=>{
    const el=section.current;if(!el)return;
    let raf=0;
    const update=()=>{raf=0;const rect=el.getBoundingClientRect();const distance=Math.max(1,el.offsetHeight-innerHeight);const t=Math.max(0,Math.min(1,-rect.top/distance));useScroll.getState().setCameraT(t);if(meter.current)meter.current.textContent=String(Math.round(t*360)).padStart(3,'0');};
    const schedule=()=>{if(!raf)raf=requestAnimationFrame(update);};
    update();window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',schedule);
    return()=>{cancelAnimationFrame(raf);window.removeEventListener('scroll',schedule);window.removeEventListener('resize',schedule);};
  },[]);
  return <section id="camera" ref={section} className="camera-study"><div className="camera-pin">
    <div className="camera-heading"><span className="section-index">03 — THE INSTRUMENT</span><h2>It starts<br/>with <em>seeing.</em></h2></div>
    <div className="camera-viewport"><SceneMount/></div>
    <div className="camera-note"><span className="section-index">LIGHT. GLASS. POSSIBILITY.</span><p>A camera is only the beginning.<br/>The perspective is yours.</p><a href="#gear">Inside my camera bag <ArrowDown size={15}/></a></div>
    <div className="camera-footer"><span>SCROLL TO EXPLORE THE FORM</span><span><span ref={meter}>000</span>° / 360°</span></div>
  </div></section>;
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
              <span className="text-xs tracking-[0.14em] text-gold">{item.idx}</span>
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

function Gallery() {
  const [cat,setCat]=useState<(typeof PHOTO_CATEGORIES)[number]>("All");
  const [open,setOpen]=useState<number|null>(null);
  const track=useRef<HTMLDivElement>(null);
  const lastTrigger=useRef<HTMLButtonElement|null>(null);
  const [page,setPage]=useState(1);
  const list=PHOTOS.filter(p=>cat==="All"||p.cat===cat);
  useEffect(()=>{
    const el=track.current;if(!el)return;
    const wheel=(e:WheelEvent)=>{
      if(e.ctrlKey||e.target instanceof Element&&e.target.closest('button.album-control'))return;
      const multiplier=e.deltaMode===1?16:e.deltaMode===2?el.clientWidth:1;
      const delta=(Math.abs(e.deltaX)>Math.abs(e.deltaY)?e.deltaX:e.deltaY)*multiplier;
      const next=Math.max(0,Math.min(el.scrollWidth-el.clientWidth,el.scrollLeft+delta));
      if(Math.abs(next-el.scrollLeft)<1)return;
      e.preventDefault();el.scrollLeft=next;
    };
    const scroll=()=>{const first=el.querySelector<HTMLElement>('.book-frame');if(first)setPage(Math.min(list.length,Math.max(1,Math.round(el.scrollLeft/(first.offsetWidth+40))+1)));};
    el.addEventListener('wheel',wheel,{passive:false});el.addEventListener('scroll',scroll,{passive:true});
    el.scrollLeft=0;setPage(1);
    return()=>{el.removeEventListener('wheel',wheel);el.removeEventListener('scroll',scroll);};
  },[cat,list.length]);
  const move=(direction:number)=>{const el=track.current;if(el)el.scrollBy({left:direction*(el.querySelector<HTMLElement>('.book-frame')!.offsetWidth+40),behavior:useScroll.getState().reduced?'instant':'smooth'});};
  const photo=open===null?null:list[open];
  return <section id="photography" className="photobook">
    <div className="book-heading"><div><span className="section-index">02 — SELECTED PHOTOGRAPHS</span><h2>The art of<br/><em>paying attention.</em></h2></div><div className="book-intro"><img src="/brand/ru-wordmark-dark.svg" alt="R. Umanga"/><p>People, places and the moments between.<br/>A collection, still unfolding.</p></div></div>
    <div className="book-toolbar"><div className="book-filters">{PHOTO_CATEGORIES.map(c=><button key={c} type="button" aria-pressed={cat===c} onClick={()=>setCat(c)}>{c}</button>)}</div><span className="book-count">{String(page).padStart(2,'0')} / {String(list.length).padStart(2,'0')}</span></div>
    <div ref={track} className="book-track" tabIndex={0} role="region" aria-label="Photobook: scroll horizontally through photographs" onKeyDown={e=>{if(e.target!==e.currentTarget)return;if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();move(e.key==='ArrowRight'?1:-1);}}}>
      {list.map((p,i)=><figure className="book-frame" key={p.id}><div className="book-photo-mount"><button type="button" onClick={e=>{lastTrigger.current=e.currentTarget;setOpen(i);}} aria-label={`Open ${p.title}`}><img src={p.src} alt={p.title} loading="lazy" decoding="async"/></button><span className="book-edition">R. UMANGA / VISUAL ARCHIVE</span></div><figcaption><div><span>{String(i+1).padStart(2,'0')} — {p.cat}</span><h3>{p.title}</h3></div><p>{p.note}</p></figcaption></figure>)}
    </div>
    <div className="book-bottom"><p><span className="desktop-hint">Scroll over the photographs to browse. </span><span className="mobile-hint">Swipe the photographs to browse. </span>Click a frame to look closer.</p><div><button className="album-control" type="button" aria-label="Previous photograph" onClick={()=>move(-1)}><ArrowLeft size={20}/></button><button className="album-control" type="button" aria-label="Next photograph" onClick={()=>move(1)}><ArrowRight size={20}/></button></div></div>
    <Dialog.Root open={photo!==null} onOpenChange={value=>{if(!value)setOpen(null);}}><Dialog.Portal><Dialog.Overlay className="photo-dialog-overlay"/><Dialog.Content className="photo-dialog" aria-describedby={undefined} onCloseAutoFocus={e=>{e.preventDefault();lastTrigger.current?.focus();}} onKeyDown={e=>{if(e.key==='ArrowRight'){e.preventDefault();setOpen(i=>i===null?0:(i+1)%list.length);}if(e.key==='ArrowLeft'){e.preventDefault();setOpen(i=>i===null?0:(i-1+list.length)%list.length);}}}>
      <Dialog.Title className="sr-only">{photo?.title}</Dialog.Title><Dialog.Close className="photo-close" aria-label="Close photograph"><X/></Dialog.Close>
      {photo&&<><img className="dialog-photo" src={photo.src} alt={photo.title}/><div className="dialog-caption"><div><h3>{photo.title}</h3><p>{photo.note}</p></div><div><button aria-label="Previous photo" onClick={()=>setOpen(i=>i===null?0:(i-1+list.length)%list.length)}><ArrowLeft/></button><button aria-label="Next photo" onClick={()=>setOpen(i=>i===null?0:(i+1)%list.length)}><ArrowRight/></button></div></div></>}
    </Dialog.Content></Dialog.Portal></Dialog.Root>
  </section>;
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
            <a href={SITE.instagram} target="_blank" rel="noreferrer" aria-label="View moving-image work on Instagram">
              <div className="relative aspect-video overflow-hidden border border-line">
                <img
                  src={f.still}
                  alt=""
                  className="h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-void/20">
                  <span className="film-link-label">VIEW ON INSTAGRAM <ArrowUpRight size={18}/></span>
                </div>
              </div>
            </a>
            <div>
              <h3 className="font-display text-[26px] font-normal">{f.project}</h3>
              <div className="mt-2.5 text-xs tracking-[0.1em] text-gold uppercase">
                {f.role}
              </div>
              <div className="mt-6 flex flex-wrap gap-6">
                {[
                  ["Year", f.year],
                  ["Camera", f.camera],
                  ["Lens", f.lens],
                  ["Frame Rate", f.frameRate],
                ].map(([k, v]) => (
                  <div key={k} className="text-xs tracking-[0.1em] text-dim uppercase">
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
  const [pct,setPct]=useState(52);
  return <section id="color" className="relative z-10 bg-void py-24 md:py-32"><Wrap><SectionHead eye="Color / Mood" title="A change in feeling." center/><div className="grade-box reveal">
    <div className="grade-layer"><img src="/photos/grade-original.webp" alt="Original daylight color study" loading="lazy" decoding="async"/></div>
    <div className="grade-layer" style={{clipPath:`inset(0 ${100-pct}% 0 0)`}}><img src="/photos/grade-after.webp" alt="Warm cinematic color study" loading="lazy" decoding="async"/></div>
    <span className="grade-label graded-label">GRADED</span><span className="grade-label original-label">ORIGINAL</span><div className="grade-handle" style={{left:`${pct}%`}}/>
    <input className="grade-range" type="range" min="0" max="100" value={pct} onChange={e=>setPct(Number(e.target.value))} aria-label="Compare graded and original photo" aria-valuetext={`${pct}% graded image`}/>
    </div><p className="grade-caption">Drag to compare · Durbar Square, a study in gold versus daylight</p></Wrap></section>;
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
              <span className="text-xs tracking-[0.14em] text-gold">{it.idx}</span>
              <h3 className="font-display mt-5 text-[26px] font-normal">{it.name}</h3>
              <p className="mt-3 max-w-xs text-base leading-relaxed text-dim">{it.p}</p>
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
                <div className="mt-2.5 text-xs tracking-[0.1em] text-gold uppercase">
                  {d.role}
                </div>
                <p className="mt-3.5 max-w-md text-base leading-relaxed text-dim">{d.desc}</p>
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
                <span className="text-xs tracking-[0.14em] text-dim uppercase">{p.tag}</span>
                <h3 className="font-display mt-4 text-4xl font-normal">{p.name}</h3>
                <div className="font-display mt-3.5 text-base text-gold-bright italic">
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
                  className="border-b border-line-strong pb-0.5 text-xs tracking-[0.1em] text-dim uppercase transition-colors hover:border-gold-bright hover:text-gold-bright"
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
            <span className="absolute bottom-4 left-4 text-xs tracking-[0.12em] text-dim uppercase">
              Window study
            </span>
          </div>
          <div>
            <Eyebrow>Behind the Frame</Eyebrow>
            <p className="font-display mt-5 max-w-lg text-xl leading-snug text-ivory italic">
              I’m Umanga Rimal, a young creative from Nepal — still early in this, still
              learning, still figuring out what my eye actually wants to say.
            </p>
            <p className="mt-5 max-w-lg text-base leading-8 text-dim text-pretty">
              Photography and cinematography are where I spend most of my attention right now:
              understanding light, working out how a frame should move, learning what a lens can
              and can’t do. Design and development sit alongside that — a way of building the
              digital spaces that hold the visual work, rather than leaving it stranded in a
              folder.
            </p>
            <p className="mt-5 max-w-lg text-base leading-8 text-dim text-pretty">
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
                  className="border border-line-strong px-4 py-2 text-xs tracking-[0.08em] text-dim uppercase"
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
  const [paused,setPaused]=useState(false);
  return <section id="journey" className="journey-section"><div className="journey-heading"><div><span className="section-index">CREATIVE JOURNEY</span><h2>Always <em>becoming.</em></h2><p>How this is building up.</p></div><button type="button" className="journey-toggle" aria-pressed={paused} aria-label={paused?'Resume creative journey':'Pause creative journey'} onClick={()=>setPaused(p=>!p)}>{paused?<Play size={17}/>:<Pause size={17}/>}<span>{paused?'Resume':'Pause'}</span></button></div><div className={`journey-window ${paused?'is-paused':''}`}><div className="journey-belt">{[0,1].map(copy=><div className="journey-set" key={copy} aria-hidden={copy===1}>{JOURNEY.map((j,i)=><article key={j.title}><span className="journey-number">0{i+1}</span><h3>{j.title}</h3><p>{j.note}</p></article>)}</div>)}</div></div></section>;
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
        <p className="mt-5 mb-11 text-sm tracking-wide text-dim">
          Photography · Cinematography · Creative Projects · Collaborations
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Hover label="Instagram">
            <a
              href={SITE.instagram}
              target="_blank"
              rel="noreferrer"
              className="inline-block border border-ivory bg-ivory px-8 py-3.5 text-xs tracking-[0.14em] text-void uppercase transition-transform hover:-translate-y-0.5"
            >
              Instagram
            </a>
          </Hover>
          <Hover label="Email">
            <a
              href={`mailto:${SITE.email}`}
              className="inline-block border border-line-strong px-8 py-3.5 text-xs tracking-[0.14em] uppercase transition-colors hover:border-gold hover:text-gold-bright"
            >
              Contact Me
            </a>
          </Hover>
        </div>
        <div className="mt-11 flex flex-col items-center gap-2.5">
          <span className="mt-3 text-xs tracking-[0.16em] text-gold uppercase">Email</span>
          <a href={`mailto:${SITE.email}`} className="text-[13px] text-dim hover:text-gold-bright">
            {SITE.email}
          </a>
          <span className="mt-3 text-xs tracking-[0.16em] text-gold uppercase">Phone</span>
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
      <img className="footer-logo" src="/brand/ru-wordmark-gold.svg" alt="R. Umanga"/>
      <div className="mt-3 text-xs tracking-[0.16em] text-dim uppercase">
        Photography · Cinematography · Design · Development
      </div>
      <div className="mt-2 text-xs tracking-[0.16em] text-dim uppercase">Nepal · 2026</div>
      <div className="font-display mt-6 text-sm text-gold italic">Captured with intention.</div>
    </footer>
  );
}

export function Portfolio() {
  useReveal();
  return (
    <div className="relative z-10">
      <Hero />
      <Gallery />
      <CameraStudy />
      <Gear />
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
