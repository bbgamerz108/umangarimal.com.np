export const SITE = {
  name: "Umanga Rimal",
  role: "Photographer / Cinematographer",
  statement: "Every frame is an experiment with light, composition and emotion.",
  location: "Kathmandu, Nepal",
  email: "r.umanga@outlook.com",
  phone: "+977 9712065867",
  phoneHref: "tel:+9779712065867",
  instagram: "https://instagram.com/r.umanga_",
  instagramHandle: "@r.umanga_",
};

export const PHOTO_CATEGORIES = [
  "All",
  "Portraits",
  "Street",
  "Events",
  "Experimental",
] as const;

export type Photo = {
  id: string;
  title: string;
  cat: (typeof PHOTO_CATEGORIES)[number];
  src: string;
  note: string;
  rotate: number;
  tape: "rose" | "mustard" | "teal" | "none";
};

export const PHOTOS: Photo[] = [
  {
    id: "window-i",
    title: "Window Study I",
    cat: "Portraits",
    src: "/photos/window-study.webp",
    note: "Late light, quiet room",
    rotate: -3.5,
    tape: "rose",
  },
  {
    id: "durbar",
    title: "Durbar at Dusk",
    cat: "Street",
    src: "/photos/durbar-dusk.webp",
    note: "Kathmandu · blue hour",
    rotate: 2.2,
    tape: "mustard",
  },
  {
    id: "temple",
    title: "Courtyard Light",
    cat: "Experimental",
    src: "/photos/temple-light.webp",
    note: "A single shaft of gold",
    rotate: -1.4,
    tape: "teal",
  },
  {
    id: "mandap",
    title: "Mandap, Evening",
    cat: "Events",
    src: "/photos/mandap.webp",
    note: "Marigold and hanging light",
    rotate: 4.1,
    tape: "rose",
  },
  {
    id: "light-test",
    title: "Light Test 04",
    cat: "Experimental",
    src: "/photos/light-test.webp",
    note: "Monochrome courtyard study",
    rotate: -2.8,
    tape: "none",
  },
  {
    id: "window-ii",
    title: "Window Study II",
    cat: "Portraits",
    src: "/photos/window-study-ii.webp",
    note: "Chair, curtain, residual gold",
    rotate: 1.6,
    tape: "mustard",
  },
  {
    id: "square",
    title: "Evening Crowd",
    cat: "Street",
    src: "/photos/square-lights.webp",
    note: "Temple lights as bokeh",
    rotate: -4.2,
    tape: "teal",
  },
  {
    id: "ceremony",
    title: "Ceremony Frame",
    cat: "Events",
    src: "/photos/ceremony.webp",
    note: "Cloth, bloom, dusk",
    rotate: 3.3,
    tape: "rose",
  },
];

export const WORDS = [
  { word: "LIGHT", color: "#e8b84a", wash: "#3a2a10" },
  { word: "MOTION", color: "#e05a3a", wash: "#3a1610" },
  { word: "COMPOSITION", color: "#2a9f94", wash: "#0e2a28" },
  { word: "COLOR", color: "#d43b78", wash: "#3a1024" },
  { word: "STORY", color: "#4d62c9", wash: "#14183a" },
] as const;

export const JOURNEY = [
  { title: "Photography", note: "Where it started — still frames, late light." },
  { title: "Cinematography", note: "Learning motion, 24 frames a second." },
  { title: "Editing & Color", note: "In progress — grade, cut, feel." },
  { title: "Design", note: "Form as another kind of framing." },
  { title: "Development", note: "Building the rooms the pictures live in." },
  { title: "Lumetric Studio", note: "A creative practice, unfolding." },
];

export const SOCIALS = [
  {
    name: "Instagram",
    handle: "@r.umanga_",
    url: "https://instagram.com/r.umanga_",
  },
  {
    name: "Lumetric Studio",
    handle: "@lumetricstudio",
    url: "https://instagram.com/lumetricstudio",
  },
];

export const NAV = [
  { href: "#top", label: "Intro" },
  { href: "#album", label: "Album" },
  { href: "#camera", label: "Camera" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
] as const;

export const EQUIPMENT = [
  { idx: "01", name: "Canon EOS 850D", type: "Camera body" },
  { idx: "02", name: "Canon 18–55mm", type: "Kit lens" },
  { idx: "03", name: "Tripod", type: "Support" },
] as const;
