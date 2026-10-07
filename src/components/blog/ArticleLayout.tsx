import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { ArrowLeft, Clock3, Linkedin } from "lucide-react";
import { profile } from "@/lib/site-content";

type TocItem = { id: string; label: string };

export function ArticleLayout({
  category,
  title,
  accentTitle,
  date,
  readingTime,
  topic,
  lead,
  toc,
  relatedTo,
  relatedTitle,
  children,
}: {
  category: string;
  title: string;
  accentTitle: string;
  date: string;
  readingTime: string;
  topic: string;
  lead: string;
  toc: TocItem[];
  relatedTo: "/blog/automated-testing" | "/blog/effective-test-cases";
  relatedTitle: string;
  children: ReactNode;
}) {
  return (
    <main className="blog-article min-h-screen bg-background text-foreground">
      <section className="blog-article-hero relative overflow-hidden px-5 pb-14 pt-36 sm:pb-20 sm:pt-44">
        <div className="mx-auto max-w-4xl">
          <Link to="/" hash="blog" className="mb-10 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary">
            <ArrowLeft className="size-4" /> Back to portfolio
          </Link>
          <span className="eyebrow">{category}</span>
          <h1 className="mt-5 max-w-4xl text-4xl leading-tight sm:text-6xl">
            {title} <span className="text-gradient">{accentTitle}</span>
          </h1>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Bishal Khatri</span>
            <span>{date}</span>
            <span className="inline-flex items-center gap-2"><Clock3 className="size-4" /> {readingTime}</span>
            <span>{topic}</span>
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 lg:grid-cols-[minmax(0,1fr)_260px]">
        <article className="blog-prose min-w-0">
          <p className="blog-lead">{lead}</p>
          {children}
        </article>
        <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
          <div className="blog-side-panel">
            <p className="eyebrow mb-5">In this article</p>
            <nav className="flex flex-col gap-3">
              {toc.map((item) => <a key={item.id} href={`#${item.id}`} className="text-sm text-muted-foreground transition-colors hover:text-primary">{item.label}</a>)}
            </nav>
          </div>
          <div className="blog-side-panel text-center">
            <div className="mx-auto grid size-14 place-items-center rounded-full border border-primary/50 bg-primary/10 font-semibold text-primary">BK</div>
            <p className="mt-4 font-medium">Bishal Khatri</p>
            <p className="mt-1 text-xs text-muted-foreground">QA Engineer · Nepal</p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">2+ years shipping quality software. Passionate about automation, data-driven testing, and building QA cultures from the ground up.</p>
            <a href={profile.socials.linkedin} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 text-sm text-primary"><Linkedin className="size-4" /> LinkedIn</a>
          </div>
          <div className="blog-side-panel">
            <p className="eyebrow mb-3">Related reading</p>
            <Link to={relatedTo} className="text-sm font-medium leading-relaxed transition-colors hover:text-primary">{relatedTitle}</Link>
          </div>
        </aside>
      </div>
    </main>
  );
}