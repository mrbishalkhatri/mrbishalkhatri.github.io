import { SectionHeading } from "@/components/site/ui";
import { achievements } from "@/lib/site-content";

/** Key wins as a depth-staggered 3D timeline path. */
export function Achievements() {
  return (
    <section id="achievements" className="relative overflow-hidden py-24">
      <div className="pointer-events-none absolute inset-0 lab-grid opacity-40" aria-hidden="true" />
      <div className="relative mx-auto flex max-w-6xl flex-col gap-14 px-5">
        <SectionHeading
          eyebrow="Key Wins"
          title="Numbers that speak."
          lead="Every metric below is a real outcome delivered for real teams — not estimates."
        />

        <ol className="relative flex flex-col gap-6">
          <span
            className="absolute left-[1.35rem] top-2 bottom-2 w-px bg-border md:left-1/2"
            aria-hidden="true"
          />
          {achievements.map((win, index) => (
            <li
              key={win.id}
              className={`reveal relative md:w-[calc(50%-2rem)] ${
                index % 2 === 0 ? "md:self-start" : "md:self-end"
              }`}
              style={{ transitionDelay: `${index * 70}ms` }}
            >
              <span
                className={`absolute left-[1.35rem] top-8 size-3 -translate-x-1/2 rounded-full bg-primary shadow-glow md:top-10 ${
                  index % 2 === 0 ? "md:left-auto md:-right-8" : "md:-left-8"
                }`}
                aria-hidden="true"
              />
              <article data-3d-action className="panel ml-10 p-6 md:ml-0">
                <span className="font-mono text-xs text-gold">{win.id}</span>
                <p className="mt-3 text-sm text-muted-foreground">{win.body}</p>
                <p className="mt-4 font-serif text-lg text-primary">{win.metric}</p>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
