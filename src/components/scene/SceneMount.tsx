import { useEffect, useState, type ComponentType } from "react";

const sceneMod = typeof window === "undefined" ? null : import("./SceneCanvas");

export function SceneMount() {
  const [Canvas, setCanvas] = useState<ComponentType<{ fancy: boolean }> | null>(null);

  useEffect(() => {
    let cancelled = false;
    void (sceneMod ?? import("./SceneCanvas")).then((mod) => {
      if (!cancelled) setCanvas(() => mod.SceneCanvas);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!Canvas) return null;
  const fancy =
    window.matchMedia("(min-width: 760px)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  return <Canvas fancy={fancy} />;
}
