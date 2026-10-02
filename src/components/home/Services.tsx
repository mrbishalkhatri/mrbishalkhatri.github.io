import { useState } from "react";
import { ButtonLink, SectionHeading } from "@/components/site/ui";
import { services } from "@/lib/site-content";

/** Services as a control-center of expandable modules. */
export function Services() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <section id="services" className="relative bg-surface/50 py-24">
      <div className="mx-auto flex max-w-6xl flex-col gap-14 px-5">
        <SectionHeading
          eyebrow="What I Do"
          title="Services I offer."
          lead="Comprehensive quality engineering services — from strategic consulting to hands-on test execution."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const isOpen = open === service.title;
            return (
              <article
                key={service.title}
                className={`panel reveal group relative flex flex-col gap-4 p-6 transition-all duration-500 hover:-translate-y-2 hover:shadow-glow ${
                  isOpen ? "shadow-glow" : ""
                }`}
                style={{ transitionDelay: `${index * 60}ms` }}
              >
                <span className="font-mono text-xs text-muted-foreground">
                  MODULE {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-xl">{service.title}</h3>
                <p className="text-sm text-muted-foreground">{service.body}</p>

                <ul className="flex flex-wrap gap-2">
                  {service.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-border px-2.5 py-0.5 text-[0.7rem] text-muted-foreground"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : service.title)}
                  className="mt-auto w-fit text-xs uppercase tracking-[0.14em] text-primary transition-opacity hover:opacity-80"
                >
                  {isOpen ? "Close details" : "View details"}
                </button>

                {isOpen ? (
                  <div className="animate-rise-in rounded-xl border border-border bg-background/70 p-4 text-sm text-muted-foreground">
                    <p>
                      Typical engagement: a short discovery call, a written plan, then delivery in
                      focused sprints with clear reporting at each step.
                    </p>
                    <ButtonLink to="/" hash="contact" size="sm" className="mt-4">
                      Discuss {service.title}
                    </ButtonLink>
                  </div>
                ) : null}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
