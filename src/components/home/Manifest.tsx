import { useEffect, useRef } from "react";
import { aboutParagraphs, heroStats, services } from "@/lib/site-content";

/** Big-type manifesto whose lines slide in from alternating sides with scroll. */
export function Manifest() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const el = ref.current;
      if (el) {
        const r = el.getBoundingClientRect();
        const p = Math.min(1, Math.max(0, 1 - r.top / window.innerHeight));
        el.querySelectorAll<HTMLElement>("[data-line]").forEach((line, i) => {
          const dir = i % 2 === 0 ? -1 : 1;
          line.style.transform = `translateX(${dir * (1 - p) * 30}vw)`;
          line.style.opacity = String(0.15 + p * 0.85);
        });
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const lines: [string, string][] = [
    ["Bugs", "before users."],
    [heroStats[0].value, heroStats[0].label + "."],
    [heroStats[1].value, heroStats[1].label + "."],
  ];

  return (
    <section ref={ref} id="about" className="black-stage relative overflow-hidden py-32">
      <div className="mx-auto max-w-7xl px-6">
        <span className="eyebrow">Manifest</span>
        <div className="mt-10 flex flex-col gap-2">
          {lines.map(([a, b], i) => (
            <p key={i} data-line className={`font-serif text-5xl leading-none will-change-transform sm:text-7xl lg:text-8xl ${i % 2 ? "text-right" : ""}`}>
              <span className="text-primary">{a}</span> {b}
            </p>
          ))}
        </div>
        <div className="mt-20 grid gap-10 text-muted-foreground md:grid-cols-2">
          {aboutParagraphs.map((p) => (
            <p key={p} className="text-lg leading-relaxed">{p}</p>
          ))}
        </div>
      </div>

      <div className="cyber-rule mt-24" aria-hidden="true" />
      <div className="marquee border-y border-border py-5 text-xl tracking-wide text-muted-foreground" aria-hidden="true">
        <div className="marquee-track">
          {[0, 1].map((k) => (
            <span key={k} className="flex shrink-0">
              {services.map((s) => (
                <span key={s.title} className="px-6">{s.title} <span className="text-primary">·</span></span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
