import { useEffect, useRef } from "react";
import { services } from "@/lib/site-content";

/**
 * 3D orbit of service cards (CSS 3D — works without WebGL).
 * Rotates with scroll and can be dragged, like gravity-design's "drag to orbit".
 */
export function OrbitRing() {
  const ring = useRef<HTMLDivElement>(null);
  const section = useRef<HTMLElement>(null);

  useEffect(() => {
    let drag = 0, vel = 0, last = 0, down = false, raf = 0, angle = 0, previous = performance.now();
    const s = section.current;
    if (!s) return;
    const onDown = (e: PointerEvent) => { down = true; last = e.clientX; };
    const onMove = (e: PointerEvent) => {
      if (!down) return;
      const dx = e.clientX - last; last = e.clientX;
      vel = dx * 0.25; drag += vel;
    };
    const onUp = () => { down = false; };
    s.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    const tick = (now: number) => {
      const delta = Math.min((now - previous) / 1000, 0.05);
      previous = now;
      if (!down) { vel *= Math.exp(-3.7 * delta); drag += vel * delta * 60; }
      const target = window.scrollY * 0.12 + drag;
      angle += (target - angle) * (1 - Math.exp(-5 * delta));
      if (ring.current) ring.current.style.transform = `translateZ(-460px) rotateX(-8deg) rotateY(${-angle}deg)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      s.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, []);

  const items = [...services, ...services];
  const step = 360 / items.length;

  return (
    <section ref={section} id="services" className="black-stage relative cursor-grab select-none overflow-hidden py-28 active:cursor-grabbing">
      <div className="mx-auto max-w-7xl px-6">
        <span className="eyebrow">Services</span>
        <h2 className="mt-4 text-4xl sm:text-6xl">
          Just solid quality.<span className="block text-xl text-muted-foreground sm:text-2xl">for products, teams and releases</span>
        </h2>
      </div>
      <div className="relative mx-auto mt-10 h-[460px]" style={{ perspective: "1400px" }}>
        <div ref={ring} className="absolute inset-0" style={{ transformStyle: "preserve-3d" }}>
          {items.map((s, i) => (
            <article
              key={i}
              className="absolute left-1/2 top-1/2 -ml-[140px] -mt-[170px] h-[340px] w-[280px]"
              style={{ transform: `rotateY(${i * step}deg) translateZ(460px)`, backfaceVisibility: "hidden" }}
            >
              <div data-3d-action className="panel flex h-full flex-col justify-between p-6">
                <span className="font-mono text-xs text-primary">0{(i % services.length) + 1}</span>
                <div>
                  <h3 className="text-2xl">{s.title}</h3>
                  <p className="mt-3 text-sm text-muted-foreground">{s.body}</p>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {s.tags.map((t) => (
                    <span key={t} className="rounded-full border border-border px-2 py-0.5 text-[11px] text-muted-foreground">{t}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
      <p className="mt-4 text-center font-mono text-xs tracking-[0.3em] text-muted-foreground">DRAG TO ORBIT</p>
    </section>
  );
}
