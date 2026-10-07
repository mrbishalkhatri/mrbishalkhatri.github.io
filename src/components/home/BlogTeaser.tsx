import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/site/ui";
import { useReveal } from "@/hooks/use-reveal";
import { blogPosts } from "@/lib/site-content";

export function BlogTeaser() {
  const ref = useReveal<HTMLElement>();
  return (
    <section id="blog" ref={ref} className="relative py-28">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading eyebrow="Blog" title="Notes from the QA lab" />
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {blogPosts.map((p, i) => (
            <Link
              key={p.slug}
              to={p.slug === "automated-testing" ? "/blog/automated-testing" : "/blog/effective-test-cases"}
              data-3d-action
              className="reveal panel hover-lift group block p-8 hover:border-primary"
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <span className="eyebrow">{p.category}</span>
              <h3 className="mt-4 text-2xl transition-colors group-hover:text-primary">{p.title}</h3>
              <p className="mt-3 text-muted-foreground">{p.excerpt}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm text-primary">Read article <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
