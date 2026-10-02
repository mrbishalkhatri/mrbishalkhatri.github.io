import { useEffect, useRef, useState } from "react";
import { SectionHeading } from "@/components/site/ui";
import { aboutParagraphs, skills, toolbelt } from "@/lib/site-content";

/** About + animated skill meters + hoverable tool objects. */
export function About() {
  return (
    <section id="toolkit" className="relative overflow-hidden bg-surface/70 py-24 backdrop-blur-sm">
      <div className="mx-auto grid max-w-6xl gap-14 px-5 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="flex flex-col gap-6">
          <SectionHeading
            eyebrow="About Me"
            title="Quality isn't an act, it's a habit."
            align="left"
          />
          {aboutParagraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 24)} className="reveal text-muted-foreground">
              {paragraph}
            </p>
          ))}

          <ul className="reveal mt-2 flex flex-wrap gap-2">
            {toolbelt.map((tool) => (
              <li
                key={tool.label}
                data-3d-action
                className="group relative rounded-xl border border-border bg-card/70 px-3 py-2 text-sm hover-lift hover:-translate-y-1 hover:border-primary hover:shadow-glow"
              >
                {tool.label}
                <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 rounded-md bg-foreground px-2 py-1 text-[0.68rem] text-background opacity-0 transition-opacity group-hover:opacity-100">
                  {tool.group}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <SkillMeters />
      </div>
    </section>
  );
}

function SkillMeters() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (!("IntersectionObserver" in window)) {
      setActive(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="panel reveal flex flex-col gap-5 p-7">
      <span className="eyebrow">Core Skills</span>
      {skills.map((skill) => (
        <div key={skill.name} className="flex flex-col gap-2">
          <div className="flex items-baseline justify-between text-sm">
            <span>{skill.name}</span>
            <span className="font-mono text-xs text-primary">{skill.value}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full transition-[width] duration-1000 ease-out"
              style={{
                width: active ? `${skill.value}%` : "0%",
                background: "var(--gradient-primary)",
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
