import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { categories, hrmsBundle, megaBundle, templates, type Category } from "@/lib/store-content";
import { actionClass } from "@/components/site/ui";

export const Route = createFileRoute("/templates")({
  head: () => ({
    meta: [
      { title: "QA Template Store — Free & Premium QA Templates | Bishal Khatri" },
      { name: "description", content: "Free and premium QA templates from 2+ years of real QA work — HRMS testing, automation, Jira dashboards and interview prep." },
      { property: "og:title", content: "QA Template Store — Bishal Khatri" },
      { property: "og:description", content: "Download 5 free QA templates or grab premium HRMS packs, automation kits and Jira dashboards." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TemplatesPage,
});

type Filter = "all" | "free" | "paid" | Category;

const badgeLabel = { hot: "🔥 Hot", new: "✨ New", moat: "🏆 Rare" } as const;

function TemplatesPage() {
  const [filter, setFilter] = useState<Filter>("all");
  const [q, setQ] = useState("");

  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    return templates.filter((t) => {
      if (filter === "free" || filter === "paid") { if (t.tier !== filter) return false; }
      else if (filter !== "all" && t.cat !== filter) return false;
      if (!s) return true;
      return (t.title + " " + t.desc + " " + t.tags.join(" ")).toLowerCase().includes(s);
    });
  }, [filter, q]);

  const chip = (id: Filter, label: string) => (
    <button
      key={id}
      type="button"
      onClick={() => setFilter(id)}
      className={`rounded-full border px-4 py-1.5 text-xs font-medium transition-colors ${
        filter === id ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground hover:border-primary hover:text-primary"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="dark bg-background text-foreground">
      <section className="black-stage relative overflow-hidden px-5 pb-16 pt-36 text-center">
        <div className="lab-grid pointer-events-none absolute inset-0 opacity-40" />
        <div className="relative mx-auto max-w-3xl">
          <span className="eyebrow">Built by a Real QA Engineer · Not a Designer Guessing</span>
          <h1 className="mt-5 text-4xl sm:text-6xl">
            QA Templates That Come From <span className="text-gradient">Real Experience</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-muted-foreground">
            25 free and premium templates born from 2+ years of real QA work — HRMS testing, automation frameworks, Jira dashboards, interview prep, and more. No fluff. No theory. Just tools that work.
          </p>
          <div className="glass mx-auto mt-8 inline-flex flex-wrap justify-center gap-6 rounded-full px-8 py-3">
            {[["25", "Templates"], ["5", "Free"], ["6", "Categories"], ["3", "Formats"]].map(([n, l]) => (
              <div key={l}><div className="font-serif text-2xl text-primary">{n}</div><div className="text-[0.65rem] uppercase tracking-widest text-muted-foreground">{l}</div></div>
            ))}
          </div>
          <div className="mx-auto mt-8 max-w-md">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search templates…"
              aria-label="Search templates"
              className="w-full rounded-full border border-input bg-surface/70 px-5 py-3 text-sm outline-none focus:border-primary"
            />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-5 py-12">
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Filter</span>
          {chip("all", "All")}{chip("free", "Free")}{chip("paid", "Paid")}
          {categories.map((c) => chip(c.id, c.label))}
          <span className="ml-auto text-xs text-muted-foreground">{list.length} templates</span>
        </div>

        {/* Mega bundle */}
        <div data-3d-action className="panel relative mt-10 grid gap-8 overflow-hidden p-8 md:grid-cols-[1fr_auto]">
          <div>
            <span className="eyebrow text-accent">⭐ Flagship Bundle · Best Value · Save 65%</span>
            <h2 className="mt-3 text-3xl">{megaBundle.title}</h2>
            <p className="mt-3 max-w-2xl text-sm text-muted-foreground">{megaBundle.desc}</p>
            <ul className="mt-5 grid gap-2 text-sm sm:grid-cols-2">
              {megaBundle.includes.map((i) => <li key={i}><span className="text-accent">✓</span> {i}</li>)}
            </ul>
          </div>
          <div className="flex flex-col items-start justify-center gap-2 md:items-center md:text-center">
            <div className="font-serif text-6xl text-accent">{megaBundle.price}</div>
            <div className="text-xs text-muted-foreground line-through">{megaBundle.orig}</div>
            <div className="text-xs text-primary">{megaBundle.savings}</div>
            <Link data-3d-action to="/order" search={{ product: "mega-bundle" }} className={`${actionClass("gold", "lg")} mt-3`}>Get Everything</Link>
            <span className="text-[0.7rem] text-muted-foreground">Instant download · All formats included</span>
          </div>
        </div>

        {/* HRMS bundle */}
        <div data-3d-action className="panel mt-6 flex flex-col gap-4 p-6 md:flex-row md:items-center">
          <div className="flex-1">
            <span className="eyebrow">🏆 HRMS QA Packs · Your biggest moat — nobody else sells these</span>
            <h3 className="mt-2 text-xl">{hrmsBundle.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{hrmsBundle.desc}</p>
          </div>
          <div className="text-center">
            <div className="font-serif text-3xl text-accent">{hrmsBundle.price}</div>
            <div className="text-xs text-muted-foreground">{hrmsBundle.orig} · {hrmsBundle.savings}</div>
          </div>
          <Link data-3d-action to="/order" search={{ product: "hrms-bundle" }} className={actionClass()}>Buy Bundle</Link>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((t) => (
            <article key={t.id} data-3d-action className="panel flex flex-col p-6">
              <div className="flex items-center justify-between gap-2">
                <span className={`rounded-full px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wider ${t.tier === "free" ? "bg-accent text-accent-foreground" : "bg-secondary text-secondary-foreground"}`}>
                  {t.tier === "free" ? "Free" : "Premium"}
                </span>
                {t.badge ? <span className="text-xs text-muted-foreground">{badgeLabel[t.badge]}</span> : null}
              </div>
              <h3 className="mt-4 text-lg">{t.title}</h3>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">{t.desc}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {t.tags.map((g) => <span key={g} className="rounded-md border border-border px-2 py-0.5 font-mono text-[0.65rem] text-muted-foreground">{g}</span>)}
              </div>
              <div className="mt-5 flex items-end justify-between border-t border-border pt-4">
                {t.tier === "free" ? (
                  <>
                    <div><div className="font-serif text-xl text-accent">Free</div><div className="text-[0.65rem] text-muted-foreground">No signup · Instant download</div></div>
                    <a href={t.download} download className="rounded-full bg-accent px-4 py-2 text-xs font-semibold text-accent-foreground">↓ Download Free</a>
                  </>
                ) : (
                  <>
                    <div>
                      <span className="mr-1 text-xs text-muted-foreground line-through">{t.orig}</span>
                      <span className="font-serif text-xl">{t.price}</span>
                      <div className="text-[0.65rem] text-muted-foreground">One-time · Instant</div>
                    </div>
                    <Link to="/order" search={{ product: t.slug ?? "" }} className="rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground">Buy Now</Link>
                  </>
                )}
              </div>
            </article>
          ))}
        </div>

        <div className="panel mt-14 p-8 text-center">
          <h2 className="text-2xl">Need something custom?</h2>
          <p className="mx-auto mt-2 max-w-lg text-sm text-muted-foreground">I build bespoke QA templates, automation scripts, and Jira dashboards tailored to your team's exact workflow.</p>
          <a href="/#contact" className="mt-5 inline-flex rounded-full border border-primary px-6 py-2.5 text-sm text-primary">Get in Touch</a>
        </div>
      </div>
    </div>
  );
}
