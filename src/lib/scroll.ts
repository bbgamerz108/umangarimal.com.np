import { create } from "zustand";

type ScrollState = {
  progress: number;
  y: number;
  mouseX: number;
  mouseY: number;
  cameraT: number;
  reduced: boolean;
  hovering: string | null;
  albumHover: boolean;
  setProgress: (progress: number, y: number) => void;
  setMouse: (x: number, y: number) => void;
  setCameraT: (t: number) => void;
  setReduced: (reduced: boolean) => void;
  setHovering: (label: string | null) => void;
  setAlbumHover: (on: boolean) => void;
};

export const useScroll = create<ScrollState>((set) => ({
  progress: 0,
  y: 0,
  mouseX: 0,
  mouseY: 0,
  cameraT: 0,
  reduced: false,
  hovering: null,
  albumHover: false,
  setProgress: (progress, y) => set({ progress, y }),
  setMouse: (mouseX, mouseY) => set({ mouseX, mouseY }),
  setCameraT: (cameraT) => set({ cameraT }),
  setReduced: (reduced) => set({ reduced }),
  setHovering: (hovering) => set({ hovering }),
  setAlbumHover: (albumHover) => set({ albumHover }),
}));
