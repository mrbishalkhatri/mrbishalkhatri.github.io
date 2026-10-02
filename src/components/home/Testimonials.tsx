import { SectionHeading } from "@/components/site/ui";
import { useReveal } from "@/hooks/use-reveal";
import { testimonials } from "@/lib/site-content";

export function Testimonials() {
  const ref = useReveal<HTMLElement>();
  return (
    <section id="testimonials" ref={ref} className="relative py-28">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading eyebrow="Reviews" title="What clients say" />
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {testimonials.map((t, i) => (
            <figure
              key={t.name}
              data-3d-action
              className="reveal glass hover-lift rounded-3xl p-8 hover:shadow-glow"
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <span className="font-serif text-6xl leading-none text-primary">“</span>
              <blockquote className="mt-2 text-lg text-foreground">{t.quote}</blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span className="grid size-11 place-items-center rounded-full bg-primary font-medium text-primary-foreground">
                  {t.initials}
                </span>
                <span>
                  <span className="block font-medium">{t.name}</span>
                  <span className="text-sm text-muted-foreground">{t.title}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
