import { i as __toESM } from "../_runtime.mjs";
import { H as require_jsx_runtime, U as require_react } from "../_libs/@react-three/drei+[...].mjs";
import { t as create } from "../_libs/zustand.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BO-79rNs.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var useScroll = create((set) => ({
	progress: 0,
	y: 0,
	mouseX: 0,
	mouseY: 0,
	reduced: false,
	hovering: null,
	setProgress: (progress, y) => set({
		progress,
		y
	}),
	setMouse: (mouseX, mouseY) => set({
		mouseX,
		mouseY
	}),
	setReduced: (reduced) => set({ reduced }),
	setHovering: (hovering) => set({ hovering })
}));
var SITE = {
	name: "Umanga Rimal",
	role: "Photographer / Cinematographer",
	statement: "I capture stories through light, motion and perspective.",
	location: "Nepal",
	email: "r.umanga@outlook.com",
	phone: "+977 9712065867",
	phoneHref: "tel:+9779712065867",
	instagram: "https://instagram.com/r.umanga_",
	instagramHandle: "@r.umanga_"
};
var EQUIPMENT = [
	{
		idx: "01",
		name: "Canon EOS 850D",
		type: "Camera body"
	},
	{
		idx: "02",
		name: "Canon 18–55mm",
		type: "Kit lens"
	},
	{
		idx: "03",
		name: "Tripod",
		type: "Support"
	}
];
var PHOTO_CATEGORIES = [
	"All",
	"Portraits",
	"Street",
	"Events",
	"Experimental"
];
var PHOTOS = [
	{
		id: "window-i",
		title: "Window Study I",
		cat: "Portraits",
		size: "s1",
		src: "/photos/window-study.jpg",
		note: "Late light, quiet room"
	},
	{
		id: "durbar",
		title: "Durbar at Dusk",
		cat: "Street",
		size: "s3",
		src: "/photos/durbar-dusk.jpg",
		note: "Kathmandu · blue hour"
	},
	{
		id: "temple",
		title: "Courtyard Light",
		cat: "Experimental",
		size: "s2",
		src: "/photos/temple-light.jpg",
		note: "A single shaft of gold"
	},
	{
		id: "mandap",
		title: "Mandap, Evening",
		cat: "Events",
		size: "s3",
		src: "/photos/mandap.jpg",
		note: "Marigold and hanging light"
	},
	{
		id: "light-test",
		title: "Light Test 04",
		cat: "Experimental",
		size: "s2",
		src: "/photos/light-test.jpg",
		note: "Monochrome courtyard study"
	},
	{
		id: "window-ii",
		title: "Window Study II",
		cat: "Portraits",
		size: "s3",
		src: "/photos/window-study-ii.jpg",
		note: "Chair, curtain, residual gold"
	},
	{
		id: "square",
		title: "Evening Crowd",
		cat: "Street",
		size: "s4",
		src: "/photos/square-lights.jpg",
		note: "Temple lights as bokeh"
	},
	{
		id: "ceremony",
		title: "Ceremony Frame",
		cat: "Events",
		size: "s3",
		src: "/photos/ceremony.jpg",
		note: "Cloth, bloom, dusk"
	}
];
var FILMS = [{
	project: "Untitled Reel",
	year: "2026",
	camera: "Canon EOS 850D",
	lens: "18–55mm",
	frameRate: "24 FPS",
	role: "Cinematography · Editing · Color",
	still: "/photos/durbar-dusk.jpg"
}];
var DEV_PROJECTS = [{
	name: "This Portfolio",
	role: "Design & Development",
	desc: "A cinematic 3D personal site built around a black-and-gold, camera-inspired visual language — scroll-driven, WebGL at the core.",
	still: "/photos/temple-light.jpg"
}];
var CREATIVE_PROJECTS = [{
	name: "Lumetric Studio",
	tag: "Creative / studio identity",
	line: "Photography & visual projects",
	handle: "@lumetricstudio",
	swatches: [
		"#0a0908",
		"#26231f",
		"#b3915b"
	],
	url: "https://instagram.com/lumetricstudio"
}];
var JOURNEY = [
	{
		title: "Photography",
		note: "Where it started"
	},
	{
		title: "Cinematography",
		note: "Learning motion"
	},
	{
		title: "Editing & Color",
		note: "In progress"
	},
	{
		title: "Design",
		note: "Ongoing"
	},
	{
		title: "Development",
		note: "Ongoing"
	},
	{
		title: "Creative Business",
		note: "Lumetric Studio"
	}
];
var SOCIALS = [{
	name: "Instagram",
	handle: "@r.umanga_",
	url: "https://instagram.com/r.umanga_"
}, {
	name: "Lumetric Studio",
	handle: "@lumetricstudio",
	url: "https://instagram.com/lumetricstudio"
}];
var NAV = [
	{
		href: "#photography",
		label: "Photography"
	},
	{
		href: "#cinematography",
		label: "Cinematography"
	},
	{
		href: "#lab",
		label: "The Lab"
	},
	{
		href: "#about",
		label: "About"
	},
	{
		href: "#contact",
		label: "Contact"
	}
];
var FRAME_TEXTURES = [
	"/photos/durbar-dusk.jpg",
	"/photos/temple-light.jpg",
	"/photos/mandap.jpg",
	"/photos/window-study.jpg",
	"/photos/square-lights.jpg",
	"/photos/ceremony.jpg"
];
function SceneMount() {
	const [node, setNode] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		const fancy = window.matchMedia("(min-width: 760px)").matches && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		let cancelled = false;
		import("./SceneCanvas-BA4lE-1c.mjs").then((mod) => {
			if (cancelled) return;
			setNode(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(mod.SceneCanvas, { fancy }));
		});
		return () => {
			cancelled = true;
		};
	}, []);
	return node;
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function Loader() {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [gone, setGone] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const a = window.setTimeout(() => setOpen(true), 520);
		const b = window.setTimeout(() => setGone(true), 1600);
		return () => {
			window.clearTimeout(a);
			window.clearTimeout(b);
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("loader", open && "is-open", gone && "is-gone"),
		"aria-hidden": gone,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "aperture",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "loader-mark",
			children: "UMANGA RIMAL"
		})]
	});
}
function Grain() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grain",
		"aria-hidden": "true"
	});
}
function Corners() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: [
		"tl",
		"tr",
		"bl",
		"br"
	].map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"aria-hidden": "true",
		className: cn("pointer-events-none fixed z-40 hidden size-5 border-gold-dim md:block", c === "tl" && "top-4 left-4 border-t border-l", c === "tr" && "top-4 right-4 border-t border-r", c === "bl" && "bottom-4 left-4 border-b border-l", c === "br" && "bottom-4 right-4 border-b border-r")
	}, c)) });
}
function Hud() {
	const y = useScroll((s) => s.y);
	const frame = Math.min(999, Math.floor(y / 6) + 1).toString().padStart(3, "0");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pointer-events-none fixed top-20 right-0 left-0 z-40 hidden justify-between px-10 text-[10.5px] tracking-[0.14em] text-dim uppercase lg:flex",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-1.5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 text-gold-bright",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "hud-rec-dot" }), "REC"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: "CAM 01" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "tabular-nums",
					children: ["FRAME ", frame]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col items-end gap-1.5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: "24 FPS · 1/50 · F/2.8" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: "ISO 400 · 18–55MM" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: "FOCUS: LOCKED" })
			]
		})]
	});
}
function Cursor() {
	const dot = (0, import_react.useRef)(null);
	const ring = (0, import_react.useRef)(null);
	const hovering = useScroll((s) => s.hovering);
	const rx = (0, import_react.useRef)(0);
	const ry = (0, import_react.useRef)(0);
	const mx = (0, import_react.useRef)(0);
	const my = (0, import_react.useRef)(0);
	(0, import_react.useEffect)(() => {
		const onMove = (e) => {
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
			rx.current += (mx.current - rx.current) * .16;
			ry.current += (my.current - ry.current) * .16;
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref: dot,
		className: "cursor-dot"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref: ring,
		className: cn("cursor-ring", hovering && "is-on"),
		children: hovering
	})] });
}
function Nav() {
	const [scrolled, setScrolled] = (0, import_react.useState)(false);
	const [open, setOpen] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const onScroll = () => setScrolled(window.scrollY > 40);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
		className: cn("fixed top-0 right-0 left-0 z-50 flex items-center justify-between px-6 py-6 transition-[padding,background-color,border-color] duration-500 md:px-10", scrolled ? "border-b border-line bg-void/85 py-3.5 backdrop-blur-md" : "border-b border-transparent bg-gradient-to-b from-void/60 to-transparent"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "#top",
				className: "font-display text-[17px] tracking-wide text-ivory",
				children: SITE.name
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: cn("flex gap-8 text-xs tracking-[0.1em] uppercase", "max-md:fixed max-md:top-0 max-md:right-0 max-md:h-svh max-md:w-[72%] max-md:max-w-xs max-md:flex-col max-md:items-start max-md:justify-center max-md:gap-7 max-md:border-l max-md:border-line max-md:bg-near max-md:px-10 max-md:transition-transform max-md:duration-500", open ? "max-md:translate-x-0" : "max-md:translate-x-full"),
				children: NAV.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: n.href,
					onClick: () => setOpen(false),
					className: "text-ivory/80 transition-colors hover:text-gold-bright",
					children: n.label
				}, n.href))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				className: "relative z-50 flex flex-col gap-1.5 md:hidden",
				"aria-label": open ? "Close menu" : "Open menu",
				onClick: () => setOpen((v) => !v),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "block h-px w-5.5 bg-ivory" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "block h-px w-5.5 bg-ivory" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "block h-px w-5.5 bg-ivory" })
				]
			})
		]
	});
}
function useReveal() {
	(0, import_react.useEffect)(() => {
		const nodes = document.querySelectorAll(".reveal");
		const io = new IntersectionObserver((entries) => {
			for (const en of entries) if (en.isIntersecting) en.target.classList.add("in");
		}, { threshold: .14 });
		nodes.forEach((n) => io.observe(n));
		return () => io.disconnect();
	}, []);
}
function Hover({ label, children, className }) {
	const setHovering = useScroll((s) => s.setHovering);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className,
		onMouseEnter: () => setHovering(label),
		onMouseLeave: () => setHovering(null),
		children
	});
}
function Eyebrow({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "text-[11px] font-medium tracking-[0.22em] text-gold uppercase",
		children
	});
}
function Title({ children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
		className: cn("font-display text-[clamp(32px,5vw,60px)] leading-[1.08] font-normal tracking-tight text-balance", className),
		children
	});
}
function Wrap({ children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("mx-auto w-full max-w-6xl px-6 md:px-10", className),
		children
	});
}
function SectionHead({ eye, title, sub, center }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("reveal mb-16", center && "mx-auto text-center"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: eye }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {
				className: "mt-3.5",
				children: title
			}),
			sub ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3.5 max-w-md text-base leading-relaxed text-dim text-pretty",
				children: sub
			}) : null
		]
	});
}
function Hero() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		id: "top",
		className: "relative flex min-h-svh items-end overflow-hidden px-6 pt-36 pb-16 md:px-10 md:pb-20",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative z-10 w-full max-w-3xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-6 flex items-center gap-2.5 text-[11px] tracking-[0.2em] text-dim uppercase",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "hud-rec-dot" }), "Nepal · Visual Storytelling"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "font-display text-[clamp(48px,9vw,118px)] leading-[0.95] font-normal tracking-tight text-ivory",
					children: [
						"UMANGA",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						"RIMAL"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-5 text-[13px] tracking-[0.22em] text-gold uppercase",
					children: SITE.role
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "font-display mt-7 max-w-lg text-[clamp(18px,2.1vw,26px)] leading-snug text-dim italic",
					children: [
						"“",
						SITE.statement,
						"”"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-10 flex flex-wrap gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hover, {
						label: "Explore",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#photography",
							className: "inline-block border border-ivory bg-ivory px-8 py-3.5 text-[11.5px] tracking-[0.14em] text-void uppercase transition-transform hover:-translate-y-0.5",
							children: "Explore My Work"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hover, {
						label: "About",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#about",
							className: "inline-block border border-line-strong px-8 py-3.5 text-[11.5px] tracking-[0.14em] uppercase transition-colors hover:border-gold hover:text-gold-bright",
							children: "About Me"
						})
					})]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "pointer-events-none absolute right-10 bottom-8 hidden text-[10px] tracking-[0.14em] text-dim uppercase md:block",
			children: "Scroll to orbit the camera"
		})]
	});
}
function Filmstrip() {
	const strip = (0, import_react.useRef)(null);
	const drag = (0, import_react.useRef)({
		down: false,
		start: 0,
		left: 0
	});
	const frames = [...PHOTOS, ...PHOTOS.slice(0, 4)];
	(0, import_react.useEffect)(() => {
		const el = strip.current;
		if (!el) return;
		const onDown = (e) => {
			drag.current = {
				down: true,
				start: e.pageX,
				left: el.scrollLeft
			};
			el.setPointerCapture(e.pointerId);
		};
		const onUp = () => {
			drag.current.down = false;
		};
		const onMove = (e) => {
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "relative z-10 border-y border-line py-10",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			ref: strip,
			className: "filmstrip px-6 md:px-10",
			children: frames.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hover, {
				label: "Frame",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative h-[130px] w-[190px] shrink-0 overflow-hidden border border-line",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: p.src,
							alt: "",
							className: "h-full w-full object-cover",
							draggable: false
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-0 border-[6px] border-void" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "absolute right-2 bottom-2 text-[9px] tracking-[0.12em] text-ivory uppercase",
							children: ["FRM ", String(i + 1).padStart(2, "0")]
						})
					]
				})
			}, p.id + i))
		})
	});
}
function CameraStudy() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "camera",
		className: "relative z-10 h-[220vh]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "sticky top-0 grid h-svh grid-cols-1 items-center gap-8 px-6 md:grid-cols-2 md:px-10",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "hidden md:block" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-24 max-w-lg md:mt-0 md:justify-self-end",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "The camera that started it" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {
						className: "mt-4",
						children: "Canon EOS 850D"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 max-w-md text-[15px] leading-relaxed text-dim text-pretty",
						children: "This camera isn’t just equipment — it’s the tool through which I first learned to see. Every frame in this portfolio began with this body and this lens, and every technique I’m still learning traces back to figuring out what this setup could do."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8 border-t border-line",
						children: [
							["Body", "Canon EOS 850D"],
							["Primary Lens", "Canon 18–55mm"],
							["Role", "Primary tool — stills & motion"]
						].map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between border-b border-line py-3.5 text-[13px]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[11px] tracking-[0.06em] text-dim uppercase",
								children: k
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display italic",
								children: v
							})]
						}, k))
					})
				]
			})]
		})
	});
}
function Gear() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "gear",
		className: "relative z-10 bg-gradient-to-b from-transparent via-void to-void py-24 md:py-32",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Wrap, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHead, {
			eye: "Current setup",
			title: "The Camera Bag",
			sub: "What’s actually in the bag right now — no more, no less. This grows as the kit does."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "reveal grid grid-cols-1 gap-px bg-line md:grid-cols-3",
			children: EQUIPMENT.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-h-[220px] flex-col justify-between bg-void px-8 py-10 transition-colors hover:bg-near",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[11px] tracking-[0.14em] text-gold",
					children: item.idx
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-2xl font-normal",
					children: item.name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-[12.5px] tracking-[0.04em] text-dim uppercase",
					children: item.type
				})] })]
			}, item.idx))
		})] })
	});
}
function Lightbox({ photo, onClose }) {
	(0, import_react.useEffect)(() => {
		const onKey = (e) => {
			if (e.key === "Escape") onClose();
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [onClose]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-50 flex items-center justify-center bg-void/95 p-5 md:p-12",
		onClick: onClose,
		role: "dialog",
		"aria-modal": "true",
		"aria-label": photo.title,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			className: "absolute top-6 right-6 text-[11px] tracking-[0.14em] text-dim uppercase hover:text-gold-bright",
			children: "Close"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
			className: "relative max-h-[86svh] max-w-5xl",
			onClick: (e) => e.stopPropagation(),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: photo.src,
				alt: photo.title,
				className: "max-h-[78svh] w-full object-contain"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figcaption", {
				className: "mt-4 flex items-end justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-[10px] tracking-[0.14em] text-gold uppercase",
					children: photo.cat
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "font-display mt-1 text-xl italic",
					children: photo.title
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-[11px] text-dim",
					children: photo.note
				})]
			})]
		})]
	});
}
function Gallery() {
	const [cat, setCat] = (0, import_react.useState)("All");
	const [open, setOpen] = (0, import_react.useState)(null);
	const list = PHOTOS.filter((p) => cat === "All" || p.cat === cat);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "photography",
		className: "relative z-10 bg-void py-24 md:py-32",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Wrap, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHead, {
				eye: "Still Frames",
				title: "Moments frozen in time."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "reveal mb-11 flex flex-wrap gap-2.5",
				children: PHOTO_CATEGORIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setCat(c),
					className: cn("border px-4 py-2.5 text-[11px] tracking-[0.1em] uppercase transition-colors", cat === c ? "border-ivory bg-ivory text-void" : "border-line-strong text-dim hover:border-ivory hover:text-ivory"),
					children: c
				}, c))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "masonry reveal",
				children: list.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hover, {
					label: "View",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: cn("frame group relative overflow-hidden border border-line", cat === "All" ? p.size : "s2"),
						onClick: () => setOpen(p),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: p.src,
							alt: p.title,
							className: "frame-img"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "absolute inset-x-0 bottom-0 bg-gradient-to-t from-void/90 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[9.5px] tracking-[0.12em] text-gold-bright uppercase",
								children: p.cat
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-display mt-1 text-[15px] italic",
								children: p.title
							})]
						})]
					})
				}, p.id))
			})
		] }), open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lightbox, {
			photo: open,
			onClose: () => setOpen(null)
		}) : null]
	});
}
function Films() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "cinematography",
		className: "relative z-10 bg-void py-24 md:py-32",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Wrap, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHead, {
			eye: "Moving Frames",
			title: "Stories told through motion."
		}), FILMS.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "reveal grid grid-cols-1 gap-10 border-y border-line py-11 md:grid-cols-[1fr_1.3fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hover, {
				label: "Play",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative aspect-video overflow-hidden border border-line",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: f.still,
						alt: "",
						className: "h-full w-full object-cover"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute inset-0 flex items-center justify-center bg-void/20",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex size-12 items-center justify-center rounded-full border border-gold-dim",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
								width: "12",
								height: "12",
								viewBox: "0 0 12 12",
								"aria-hidden": "true",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
									d: "M2.5 1.2v9.6L10.5 6z",
									fill: "currentColor",
									className: "text-gold-bright"
								})
							})
						})
					})]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-[26px] font-normal",
					children: f.project
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-2.5 text-[11.5px] tracking-[0.1em] text-gold uppercase",
					children: f.role
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 flex flex-wrap gap-6",
					children: [
						["Year", f.year],
						["Camera", f.camera],
						["Lens", f.lens],
						["Frame Rate", f.frameRate]
					].map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-[10.5px] tracking-[0.1em] text-dim uppercase",
						children: [k, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
							className: "font-display mt-1 block text-sm font-normal tracking-normal text-ivory italic",
							children: v
						})]
					}, k))
				})
			] })]
		}, f.project))] })
	});
}
function StyleWords() {
	const ref = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const el = ref.current;
		if (!el) return;
		const words = el.querySelectorAll(".style-word");
		const io = new IntersectionObserver((entries) => {
			for (const en of entries) if (en.isIntersecting) words.forEach((w, i) => {
				window.setTimeout(() => w.classList.add("lit"), i * 240);
			});
		}, { threshold: .55 });
		io.observe(el);
		return () => io.disconnect();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "style",
		className: "relative z-10 bg-void py-24 md:py-32",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wrap, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			ref,
			className: "flex flex-col items-center py-8 text-center",
			children: [[
				"LIGHT",
				"MOTION",
				"COMPOSITION",
				"COLOR",
				"STORY"
			].map((w) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "style-word",
				"data-w": w,
				children: w
			}, w)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display mt-10 max-w-md text-lg text-dim italic",
				children: "Every frame is an experiment with light, composition and emotion."
			})]
		}) })
	});
}
function ColorGrade() {
	const box = (0, import_react.useRef)(null);
	const [pct, setPct] = (0, import_react.useState)(52);
	const drag = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		const el = box.current;
		if (!el) return;
		const setFrom = (clientX) => {
			const r = el.getBoundingClientRect();
			setPct(Math.min(100, Math.max(0, (clientX - r.left) / r.width * 100)));
		};
		const onMove = (e) => {
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "color",
		className: "relative z-10 bg-void py-24 md:py-32",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Wrap, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHead, {
				eye: "Color / Mood",
				title: "Before ← drag → After",
				center: true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				ref: box,
				className: "grade-box reveal",
				onPointerDown: (e) => {
					drag.current = true;
					const r = e.currentTarget.getBoundingClientRect();
					setPct(Math.min(100, Math.max(0, (e.clientX - r.left) / r.width * 100)));
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grade-layer",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "/photos/grade-original.jpg",
							alt: "Original grade"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "absolute top-4 left-4 text-[9.5px] tracking-[0.14em] text-dim uppercase",
							children: "Original"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grade-layer",
						style: { clipPath: `inset(0 ${100 - pct}% 0 0)` },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "/photos/grade-after.jpg",
							alt: "Cinematic grade"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "absolute top-4 right-4 text-[9.5px] tracking-[0.14em] text-dim uppercase",
							children: "Graded"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grade-handle",
						style: { left: `${pct}%` }
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-6 text-center text-[10.5px] tracking-[0.14em] text-dim uppercase",
				children: "Durbar Square — a study in gold versus daylight"
			})
		] })
	});
}
function Lab() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "lab",
		className: "relative z-10 bg-void py-24 md:py-32",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Wrap, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHead, {
			eye: "Where craft meets code",
			title: "The Lab"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "reveal grid grid-cols-1 gap-px bg-line md:grid-cols-2",
			children: [
				{
					idx: "01",
					name: "Photography",
					p: "Camera experiments and visual studies — testing light, exposure and framing outside of finished projects."
				},
				{
					idx: "02",
					name: "Cinematography",
					p: "Motion, framing and cinematic experiments — short tests in movement and pacing."
				},
				{
					idx: "03",
					name: "Design",
					p: "Visual identity, posters and digital design work built alongside the visual projects."
				},
				{
					idx: "04",
					name: "Development",
					p: "Websites, creative interfaces and digital projects — building the technology around the creative work."
				}
			].map((it) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-h-[230px] bg-void px-8 py-12 transition-colors hover:bg-near md:px-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[11px] tracking-[0.14em] text-gold",
						children: it.idx
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display mt-5 text-[26px] font-normal",
						children: it.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 max-w-xs text-[13.5px] leading-relaxed text-dim",
						children: it.p
					})
				]
			}, it.idx))
		})] })
	});
}
function Dev() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "dev",
		className: "relative z-10 bg-void py-24 md:py-32",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Wrap, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHead, {
			eye: "Development & Design",
			title: "Beyond the Frame",
			sub: "I can build what I imagine."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "reveal",
			children: DEV_PROJECTS.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 items-center gap-10 border-y border-line py-11 md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "aspect-[16/10] overflow-hidden border border-line",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: d.still,
						alt: "",
						className: "h-full w-full object-cover"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-2xl font-normal",
						children: d.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2.5 text-[11px] tracking-[0.1em] text-gold uppercase",
						children: d.role
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3.5 max-w-md text-[13.5px] leading-relaxed text-dim",
						children: d.desc
					})
				] })]
			}, d.name))
		})] })
	});
}
function Projects() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "projects",
		className: "relative z-10 bg-void py-24 md:py-32",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Wrap, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHead, {
			eye: "Selected creative projects",
			title: "Beyond the portfolio"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "reveal mx-auto grid max-w-xl grid-cols-1 gap-px bg-line",
			children: CREATIVE_PROJECTS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-h-[320px] flex-col justify-between bg-void px-10 py-12 transition-colors hover:bg-near",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[10px] tracking-[0.14em] text-dim uppercase",
						children: p.tag
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display mt-4 text-4xl font-normal",
						children: p.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-display mt-3.5 text-[15px] text-gold-bright italic",
						children: p.line
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 flex items-end justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex gap-1.5",
						children: p.swatches.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "size-4 rounded-full border border-line-strong",
							style: { background: c }
						}, c))
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: p.url,
						target: "_blank",
						rel: "noreferrer",
						className: "border-b border-line-strong pb-0.5 text-[11px] tracking-[0.1em] text-dim uppercase transition-colors hover:border-gold-bright hover:text-gold-bright",
						children: p.handle
					})]
				})]
			}, p.name))
		})] })
	});
}
function About() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "about",
		className: "relative z-10 bg-void py-24 md:py-32",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wrap, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "reveal grid grid-cols-1 gap-12 md:grid-cols-[0.9fr_1.1fr] md:gap-16",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative aspect-[3/4] overflow-hidden border border-line",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/photos/window-study.jpg",
					alt: "Studio light study",
					className: "h-full w-full object-cover"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "absolute bottom-4 left-4 text-[10px] tracking-[0.12em] text-dim uppercase",
					children: "Window study"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "Behind the Frame" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display mt-5 max-w-lg text-xl leading-snug text-ivory italic",
					children: "I’m Umanga Rimal, a young creative from Nepal — still early in this, still learning, still figuring out what my eye actually wants to say."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-5 max-w-lg text-[15.5px] leading-8 text-dim text-pretty",
					children: "Photography and cinematography are where I spend most of my attention right now: understanding light, working out how a frame should move, learning what a lens can and can’t do. Design and development sit alongside that — a way of building the digital spaces that hold the visual work, rather than leaving it stranded in a folder."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-5 max-w-lg text-[15.5px] leading-8 text-dim text-pretty",
					children: "None of this is polished into a finished career yet. It’s a practice — cameras, timelines, color panels and code editors, all pointed at the same question: how do you tell a story with what you can see?"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8 flex flex-wrap gap-2.5",
					children: [
						"Photography",
						"Cinematography",
						"Visual Storytelling",
						"Color Grading",
						"Design",
						"Web Development"
					].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "border border-line-strong px-4 py-2 text-[11px] tracking-[0.08em] text-dim uppercase",
						children: t
					}, t))
				})
			] })]
		}) })
	});
}
function Journey() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "journey",
		className: "relative z-10 bg-void py-24 md:py-32",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Wrap, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHead, {
			eye: "Creative journey",
			title: "How this is building up"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "reveal flex gap-0 overflow-x-auto pb-2",
			children: JOURNEY.map((j, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative min-w-[200px] shrink-0 pr-8",
				children: [
					i < JOURNEY.length - 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute top-2 right-0 h-px w-8 bg-line-strong" }) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "size-2.5 rounded-full border border-gold bg-void" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display mt-5 text-lg font-normal",
						children: j.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mt-2 block text-[10.5px] tracking-[0.1em] text-dim uppercase",
						children: j.note
					})
				]
			}, j.title))
		})] })
	});
}
function Socials() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "socials",
		className: "relative z-10 bg-void py-24 md:py-32",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Wrap, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHead, {
			eye: "Elsewhere",
			title: "Socials"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "reveal",
			children: SOCIALS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
				href: s.url,
				target: "_blank",
				rel: "noreferrer",
				className: "flex items-center justify-between border-t border-line py-6 transition-[padding] hover:pl-3.5 last:border-b",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-display text-[22px] transition-colors hover:text-gold-bright",
					children: s.name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[12.5px] tracking-wide text-dim",
					children: s.handle
				})]
			}, s.url))
		})] })
	});
}
function Contact() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "contact",
		className: "relative z-10 bg-void py-24 md:py-32",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Wrap, {
			className: "reveal text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {
					className: "mx-auto max-w-3xl",
					children: "Let’s create something worth remembering."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-5 mb-11 text-sm tracking-wide text-dim",
					children: "Photography · Cinematography · Creative Projects · Collaborations"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap justify-center gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hover, {
						label: "Instagram",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: SITE.instagram,
							target: "_blank",
							rel: "noreferrer",
							className: "inline-block border border-ivory bg-ivory px-8 py-3.5 text-[11.5px] tracking-[0.14em] text-void uppercase transition-transform hover:-translate-y-0.5",
							children: "Instagram"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hover, {
						label: "Email",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: `mailto:${SITE.email}`,
							className: "inline-block border border-line-strong px-8 py-3.5 text-[11.5px] tracking-[0.14em] uppercase transition-colors hover:border-gold hover:text-gold-bright",
							children: "Contact Me"
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-11 flex flex-col items-center gap-2.5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-3 text-[10px] tracking-[0.16em] text-gold uppercase",
							children: "Email"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: `mailto:${SITE.email}`,
							className: "text-[13px] text-dim hover:text-gold-bright",
							children: SITE.email
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-3 text-[10px] tracking-[0.16em] text-gold uppercase",
							children: "Phone"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: SITE.phoneHref,
							className: "text-[13px] text-dim hover:text-gold-bright",
							children: SITE.phone
						})
					]
				})
			]
		})
	});
}
function Footer() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "relative z-10 border-t border-line bg-void py-14 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "font-display text-[22px] tracking-wide",
				children: "UMANGA RIMAL"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 text-[10.5px] tracking-[0.16em] text-dim uppercase",
				children: "Photography · Cinematography · Design · Development"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-2 text-[10.5px] tracking-[0.16em] text-dim uppercase",
				children: "Nepal · 2026"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "font-display mt-6 text-sm text-gold italic",
				children: "Captured with intention."
			})
		]
	});
}
function Portfolio() {
	useReveal();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative z-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hero, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Filmstrip, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CameraStudy, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gear, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gallery, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Films, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StyleWords, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ColorGrade, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lab, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dev, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Projects, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(About, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Journey, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Socials, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Contact, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
}
var routes_exports = /* @__PURE__ */ __exportAll({ component: () => Home });
function Home() {
	const setProgress = useScroll((s) => s.setProgress);
	const setMouse = useScroll((s) => s.setMouse);
	const setReduced = useScroll((s) => s.setReduced);
	(0, import_react.useEffect)(() => {
		document.body.classList.add("has-cursor");
		const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		setReduced(reduced);
		const onScroll = () => {
			const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
			setProgress(Math.min(1, Math.max(0, window.scrollY / max)), window.scrollY);
		};
		const onMove = (e) => {
			const x = e.clientX / window.innerWidth * 2 - 1;
			const y = -(e.clientY / window.innerHeight) * 2 + 1;
			setMouse(x, y);
		};
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		window.addEventListener("resize", onScroll, { passive: true });
		window.addEventListener("mousemove", onMove, { passive: true });
		return () => {
			document.body.classList.remove("has-cursor");
			window.removeEventListener("scroll", onScroll);
			window.removeEventListener("resize", onScroll);
			window.removeEventListener("mousemove", onMove);
		};
	}, [
		setProgress,
		setMouse,
		setReduced
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Loader, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grain, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cursor, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Corners, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hud, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Nav, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SceneMount, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portfolio, {})
	] });
}
//#endregion
export { FRAME_TEXTURES as n, useScroll as r, routes_exports as t };
