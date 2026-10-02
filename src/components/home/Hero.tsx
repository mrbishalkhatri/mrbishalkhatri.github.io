import { useEffect, useRef, useState } from "react";
import { ExternalButtonLink } from "@/components/site/ui";
import { heroChips, profile } from "@/lib/site-content";
import portraitAsset from "@/assets/bishalkhatri.jpeg.asset.json";

/**
 * Gravity-style hero: full-bleed monochrome portrait, drifting orbit rings,
 * a glowing orb that follows the pointer and a live coordinate readout.
 */
export function Hero() {
  const root = useRef<HTMLElement>(null);
  const orb = useRef<HTMLDivElement>(null);
  const portrait = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    let tx = 0, ty = 0, x = 0, y = 0, raf = 0;
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      tx = (e.clientX - r.left - r.width / 2) / r.width;
      ty = (e.clientY - r.top - r.height / 2) / r.height;
      setCoords({ x: Math.round(e.clientX - r.width / 2), y: Math.round(e.clientY - r.top) });
    };
    const leave = () => { tx = 0; ty = 0; };
    const tick = () => {
      x += (tx - x) * 0.06;
      y += (ty - y) * 0.06;
      const s = window.scrollY;
      if (orb.current) orb.current.style.transform = `translate3d(${x * 130}px, ${y * 100 + s * 0.22}px, 0) scale(${1 + s / 1400})`;
      if (portrait.current) {
        portrait.current.style.transform = `perspective(1100px) translate3d(${x * 22}px, ${y * 16}px, 0) rotateX(${-y * 7}deg) rotateY(${x * 10}deg) scale(1.035)`;
      }
      raf = requestAnimationFrame(tick);
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    raf = requestAnimationFrame(tick);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={root} id="home" className="relative flex min-h-[100svh] items-end overflow-hidden">
      <div ref={portrait} className="hero-portrait absolute inset-y-0 left-0 w-full md:left-1/2 md:w-[60%] md:-translate-x-1/2">
        <img
          src={portraitAsset.url}
          alt="Bishal Khatri — QA Engineer and Test Automation Specialist based in Nepal"
          fetchPriority="high"
          className="h-full w-full object-cover object-[50%_25%] opacity-55 grayscale"
        />
        <span className="portrait-sheen absolute inset-0" aria-hidden="true" />
      </div>
      <div className="absolute inset-0" style={{ background: "var(--gradient-vignette)" }} />

      {/* orbit rings */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <g className="orbit-spin" style={{ transformOrigin: "760px 450px" }}>
          <circle cx="760" cy="450" r="390" className="orbit-line" />
          <ellipse cx="760" cy="450" rx="315" ry="430" className="orbit-line opacity-60" />
        </g>
        <g className="orbit-spin-rev" style={{ transformOrigin: "850px 520px" }}>
          <ellipse cx="850" cy="520" rx="455" ry="285" className="orbit-line" />
          <ellipse cx="850" cy="520" rx="365" ry="230" className="orbit-line opacity-50" />
        </g>
        <g className="orbit-drift" style={{ transformOrigin: "800px 500px" }}>
          <circle cx="800" cy="500" r="245" className="orbit-line opacity-70" />
          <circle cx="800" cy="500" r="185" className="orbit-line opacity-40" />
          <ellipse cx="800" cy="500" rx="500" ry="175" className="orbit-line opacity-40" />
        </g>
      </svg>

      <div ref={orb} className="orb pointer-events-none absolute left-1/2 top-[38%] -ml-12 size-24" aria-hidden="true" />

      <div className="pointer-events-none absolute left-[12%] top-[38%] hidden font-mono text-[11px] leading-tight text-primary md:block">
        <span className="mr-1 inline-block size-1.5 rounded-full bg-primary" />
        {coords.x}, {coords.y}
        <br />
        <span className="pl-2.5">bugs 0.0</span>
      </div>

      <p className="animate-rise-in absolute right-[8%] top-[52%] hidden text-2xl tracking-wide text-primary md:block lg:text-3xl">
        {heroChips.join(" · ").toLowerCase()}
      </p>

      <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 pb-20 md:flex-row md:items-end md:justify-between">
        <div className="animate-rise-in flex flex-col gap-2">
          <h1 className="font-sans text-lg font-medium tracking-wide">{profile.name.toLowerCase()}</h1>
          <p className="tracking-wider text-muted-foreground">{profile.role.toLowerCase()}</p>
          <p className="mt-3 max-w-md text-sm text-muted-foreground">{profile.intro}</p>
        </div>
        <div className="flex gap-3">
          <ExternalButtonLink href="#contact" size="md">Work with me</ExternalButtonLink>
          <ExternalButtonLink href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer" variant="outline">
            LinkedIn
          </ExternalButtonLink>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center text-muted-foreground" aria-hidden="true">
        <span className="h-12 w-px bg-border" />
        <span className="scroll-dot mt-1 size-1.5 rounded-full bg-foreground" />
      </div>
    </section>
  );
}
