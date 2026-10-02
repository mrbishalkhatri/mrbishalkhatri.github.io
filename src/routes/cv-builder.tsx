import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/cv-builder")({
  head: () => ({
    meta: [
      { title: "Free QA CV Builder — ATS-Friendly Resume | Bishal Khatri" },
      { name: "description", content: "Build a clean, ATS-friendly QA engineer CV in minutes. Live preview and print to PDF — free, no signup." },
      { property: "og:title", content: "Free QA CV Builder — Bishal Khatri" },
      { property: "og:description", content: "Create an ATS-friendly QA resume with live preview and PDF export." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: CvBuilder,
});

type Cv = { name: string; title: string; email: string; phone: string; location: string; summary: string; skills: string; experience: string; education: string; certs: string };

const empty: Cv = { name: "", title: "QA Engineer", email: "", phone: "", location: "", summary: "", skills: "", experience: "", education: "", certs: "" };
const KEY = "qa-cv-builder";

function CvBuilder() {
  const [cv, setCv] = useState<Cv>(empty);
  useEffect(() => {
    try { const s = localStorage.getItem(KEY); if (s) setCv({ ...empty, ...JSON.parse(s) }); } catch { /* ignore */ }
  }, []);
  useEffect(() => { localStorage.setItem(KEY, JSON.stringify(cv)); }, [cv]);

  const set = (k: keyof Cv) => (e: { target: { value: string } }) => setCv((c) => ({ ...c, [k]: e.target.value }));
  const field = "w-full rounded-xl border border-input bg-surface/70 px-4 py-2.5 text-sm outline-none focus:border-primary";
  const lines = (s: string) => s.split("\n").map((l) => l.trim()).filter(Boolean);

  return (
    <div className="dark bg-background text-foreground">
      <div className="mx-auto max-w-6xl px-5 pb-20 pt-32 print:p-0">
        <header className="mb-8 text-center print:hidden">
          <span className="eyebrow">Free Tool</span>
          <h1 className="mt-3 text-4xl sm:text-5xl">QA <span className="text-gradient">CV Builder</span></h1>
          <p className="mx-auto mt-3 max-w-lg text-sm text-muted-foreground">Fill in your details, watch your ATS-friendly CV build live, then print or save as PDF. Saved in your browser only.</p>
        </header>

        <div className="grid gap-8 lg:grid-cols-2">
          <form className="panel flex flex-col gap-3 p-6 print:hidden" onSubmit={(e) => e.preventDefault()}>
            <div className="grid gap-3 sm:grid-cols-2">
              <input className={field} placeholder="Full name" value={cv.name} onChange={set("name")} />
              <input className={field} placeholder="Job title" value={cv.title} onChange={set("title")} />
              <input className={field} placeholder="Email" value={cv.email} onChange={set("email")} />
              <input className={field} placeholder="Phone" value={cv.phone} onChange={set("phone")} />
            </div>
            <input className={field} placeholder="Location" value={cv.location} onChange={set("location")} />
            <textarea className={field} rows={3} placeholder="Professional summary" value={cv.summary} onChange={set("summary")} />
            <textarea className={field} rows={2} placeholder="Skills (comma separated) — Selenium, Postman, JIRA…" value={cv.skills} onChange={set("skills")} />
            <textarea className={field} rows={5} placeholder={"Experience — one line per item\nQA Engineer, Company (2023–Present)\n• Reduced regression time by 25%"} value={cv.experience} onChange={set("experience")} />
            <textarea className={field} rows={2} placeholder="Education — one per line" value={cv.education} onChange={set("education")} />
            <textarea className={field} rows={2} placeholder="Certifications — one per line" value={cv.certs} onChange={set("certs")} />
            <div className="flex gap-3 pt-2">
              <button type="button" data-3d-action onClick={() => window.print()} className="flex-1 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground">Print / Save PDF</button>
              <button type="button" onClick={() => setCv(empty)} className="rounded-full border border-border px-5 py-3 text-sm text-muted-foreground">Reset</button>
            </div>
          </form>

          {/* Preview — plain paper look for ATS/print */}
          <article className="cv-paper rounded-xl p-8 shadow-lift print:shadow-none">
            <h2 className="text-3xl">{cv.name || "Your Name"}</h2>
            <p className="mt-1 font-medium">{cv.title}</p>
            <p className="mt-2 text-xs opacity-70">{[cv.email, cv.phone, cv.location].filter(Boolean).join(" · ")}</p>
            {cv.summary ? <Sec t="Summary"><p>{cv.summary}</p></Sec> : null}
            {cv.skills ? <Sec t="Skills"><p>{cv.skills.split(",").map((s) => s.trim()).filter(Boolean).join(" · ")}</p></Sec> : null}
            {cv.experience ? <Sec t="Experience">{lines(cv.experience).map((l, i) => <p key={i} className={l.startsWith("•") ? "pl-3" : "mt-2 font-semibold"}>{l}</p>)}</Sec> : null}
            {cv.education ? <Sec t="Education">{lines(cv.education).map((l, i) => <p key={i}>{l}</p>)}</Sec> : null}
            {cv.certs ? <Sec t="Certifications">{lines(cv.certs).map((l, i) => <p key={i}>{l}</p>)}</Sec> : null}
          </article>
        </div>
      </div>
    </div>
  );
}

function Sec({ t, children }: { t: string; children: React.ReactNode }) {
  return (
    <section className="mt-5 text-sm">
      <h3 className="border-b pb-1 text-xs font-bold uppercase tracking-widest">{t}</h3>
      <div className="mt-2 space-y-0.5">{children}</div>
    </section>
  );
}
