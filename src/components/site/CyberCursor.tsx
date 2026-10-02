import { useEffect, useRef, useState } from "react";

/**
 * Custom cyber cursor: an instant precision dot plus a spring-trailed
 * holographic reticle that reacts to interactive elements and clicks.
 * Disabled on touch devices and when reduced motion is preferred.
 */
export function CyberCursor() {
  const [enabled, setEnabled] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setEnabled(fine && !calm);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let raf = 0;
    let visible = false;

    const interactiveSelector =
      'a, button, [data-3d-action], input, textarea, select, [role="button"], label';

    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (!visible) {
        visible = true;
        rx = mx;
        ry = my;
        document.body.classList.add("cyber-cursor-on");
      }
      const target = e.target as Element | null;
      const hot = !!target?.closest?.(interactiveSelector);
      ring.dataset["hot"] = hot ? "true" : "false";
    };

    const onDown = () => {
      ring.dataset["down"] = "true";
      const pulse = document.createElement("div");
      pulse.className = "cyber-cursor-pulse";
      pulse.style.left = `${mx}px`;
      pulse.style.top = `${my}px`;
      document.body.appendChild(pulse);
      window.setTimeout(() => pulse.remove(), 700);
    };
    const onUp = () => {
      ring.dataset["down"] = "false";
    };
    const onLeave = () => {
      visible = false;
      document.body.classList.remove("cyber-cursor-on");
    };

    const tick = () => {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      dot.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      raf = window.requestAnimationFrame(tick);
    };
    raf = window.requestAnimationFrame(tick);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("pointerleave", onLeave);
      document.body.classList.remove("cyber-cursor-on");
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div aria-hidden="true" className="cyber-cursor-layer">
      <div ref={ringRef} className="cyber-cursor-ring" data-hot="false" data-down="false">
        <span className="cyber-cursor-cross" />
      </div>
      <div ref={dotRef} className="cyber-cursor-dot" />
    </div>
  );
}
