import { useEffect, useRef, type ReactNode } from "react";

const ACTION_SELECTOR = "[data-3d-action]";

/** Adds pointer-aware tilt and press depth to opted-in homepage elements. */
export function HomeInteractions({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = root.current;
    if (!node || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const reset = (target: HTMLElement) => {
      target.style.setProperty("--tilt-x", "0deg");
      target.style.setProperty("--tilt-y", "0deg");
      target.style.setProperty("--lift-z", "0px");
      target.removeAttribute("data-3d-pressed");
    };

    const findTarget = (event: PointerEvent) => {
      const origin = event.target;
      return origin instanceof Element ? origin.closest<HTMLElement>(ACTION_SELECTOR) : null;
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      const target = findTarget(event);
      if (!target) return;
      const bounds = target.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;
      target.style.setProperty("--tilt-x", `${(-y * 7).toFixed(2)}deg`);
      target.style.setProperty("--tilt-y", `${(x * 9).toFixed(2)}deg`);
      target.style.setProperty("--lift-z", "10px");
    };

    const onOut = (event: PointerEvent) => {
      const target = findTarget(event);
      if (!target) return;
      const next = event.relatedTarget;
      if (next instanceof Node && target.contains(next)) return;
      reset(target);
    };

    const onDown = (event: PointerEvent) => {
      const target = findTarget(event);
      if (!target) return;
      const bounds = target.getBoundingClientRect();
      target.style.setProperty("--click-x", `${event.clientX - bounds.left}px`);
      target.style.setProperty("--click-y", `${event.clientY - bounds.top}px`);
      target.setAttribute("data-3d-pressed", "true");
      target.style.setProperty("--lift-z", "-5px");
    };

    const onUp = (event: PointerEvent) => {
      const target = findTarget(event);
      if (!target) return;
      target.removeAttribute("data-3d-pressed");
      target.setAttribute("data-3d-rebound", "true");
      target.style.setProperty("--lift-z", "16px");

      const burst = document.createElement("span");
      burst.className = "click-burst";
      burst.setAttribute("aria-hidden", "true");
      burst.innerHTML = "<i></i><i></i><i></i><i></i>";
      target.appendChild(burst);

      window.setTimeout(() => {
        burst.remove();
        target.removeAttribute("data-3d-rebound");
        target.style.setProperty("--lift-z", "10px");
      }, 620);
    };

    node.addEventListener("pointermove", onMove);
    node.addEventListener("pointerout", onOut);
    node.addEventListener("pointerdown", onDown);
    node.addEventListener("pointerup", onUp);
    node.addEventListener("pointercancel", onUp);
    return () => {
      node.removeEventListener("pointermove", onMove);
      node.removeEventListener("pointerout", onOut);
      node.removeEventListener("pointerdown", onDown);
      node.removeEventListener("pointerup", onUp);
      node.removeEventListener("pointercancel", onUp);
    };
  }, []);

  return (
    <div ref={root} className="home-interactions">
      {children}
    </div>
  );
}