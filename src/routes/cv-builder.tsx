import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { Download, Eye, FileText, Pencil, Plus, RotateCcw, Trash2 } from "lucide-react";
import { Button } from "@/components/site/ui";

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

type Template = "classic" | "modern" | "minimal";
type Experience = { id: number; title: string; company: string; from: string; to: string; description: string };
type Education = { id: number; degree: string; school: string; from: string; to: string };
type Skill = { id: number; name: string; level: number };
type Certification = { id: number; name: string; issuer: string };
type Cv = { template: Template; accent: string; name: string; title: string; email: string; phone: string; location: string; link: string; summary: string; languages: string; interests: string; experiences: Experience[]; education: Education[]; skills: Skill[]; certifications: Certification[] };

const accents = ["#2a7c6f", "#c8963e", "#1565c0", "#7b1fa2", "#c62828", "#2e7d32", "#0d0d0d"];
const demo: Cv = {
  template: "classic", accent: accents[0], name: "Bishal Khatri", title: "QA Engineer", email: "bishalkhatrichettri1@gmail.com", phone: "+977 9810116325", location: "Kathmandu, Nepal", link: "linkedin.com/in/qa-bishal-khatri",
  summary: "QA Engineer with 2+ years of experience delivering quality software across 80+ projects. Specialising in test automation, performance testing, and agile QA processes. Passionate about building quality-first engineering cultures.", languages: "English, Nepali, Hindi", interests: "Test Automation, Data Analysis, Agile, Mentoring",
  experiences: [{ id: 1, title: "QA Specialist", company: "Tech Company", from: "Jan 2022", to: "Present", description: "Led QA processes for 80+ web and mobile projects. Reduced testing cycle time by 25% through process automation." }],
  education: [{ id: 2, degree: "Bachelor of Computer Science", school: "Tribhuvan University", from: "2018", to: "2022" }],
  skills: [{ id: 3, name: "Manual Testing", level: 92 }, { id: 4, name: "Test Automation", level: 78 }, { id: 5, name: "Agile / Scrum", level: 90 }], certifications: [],
};
const KEY = "qa-cv-builder-v2";
const field = "w-full rounded-md border border-input bg-surface/70 px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary";
const labels: Record<string, string> = { experiences: "Experience", education: "Education", skills: "Skill", certifications: "Certification" };
const splitTags = (value: string) => value.split(",").map((item) => item.trim()).filter(Boolean);

function CvBuilder() {
  const [cv, setCv] = useState<Cv>(demo);
  const [mobileView, setMobileView] = useState<"edit" | "preview">("edit");
  useEffect(() => { try { const saved = localStorage.getItem(KEY); if (saved) setCv({ ...demo, ...JSON.parse(saved) }); } catch { /* local browser storage is optional */ } }, []);
  useEffect(() => { try { localStorage.setItem(KEY, JSON.stringify(cv)); } catch { /* local browser storage is optional */ } }, [cv]);
  const set = (key: keyof Cv, value: Cv[keyof Cv]) => setCv((current) => ({ ...current, [key]: value }));
  const nextId = () => Date.now() + Math.floor(Math.random() * 1000);
  const add = (type: "experiences" | "education" | "skills" | "certifications") => setCv((current) => ({ ...current, [type]: [...current[type], type === "experiences" ? { id: nextId(), title: "", company: "", from: "", to: "", description: "" } : type === "education" ? { id: nextId(), degree: "", school: "", from: "", to: "" } : type === "skills" ? { id: nextId(), name: "", level: 80 } : { id: nextId(), name: "", issuer: "" }] }));
  const updateEntry = (type: "experiences" | "education" | "skills" | "certifications", id: number, key: string, value: string | number) => setCv((current) => ({ ...current, [type]: current[type].map((item) => item.id === id ? { ...item, [key]: value } : item) }));
  const removeEntry = (type: "experiences" | "education" | "skills" | "certifications", id: number) => setCv((current) => ({ ...current, [type]: current[type].filter((item) => item.id !== id) }));
  const accentStyle = { "--cv-accent": cv.accent } as CSSProperties;

  return (
    <main className="cv-builder-shell min-h-screen bg-background pb-20 pt-28 text-foreground" style={accentStyle}>
      <header className="mx-auto max-w-7xl px-5 pb-8 text-center print:hidden">
        <span className="eyebrow">Free professional tool</span><h1 className="mt-3 text-4xl sm:text-5xl">Advanced <span className="text-gradient">CV Builder</span></h1>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground">Build an ATS-friendly CV from three professional layouts. Your changes stay privately in this browser.</p>
      </header>
      <div className="mx-auto mb-5 flex max-w-7xl justify-center gap-2 px-5 lg:hidden print:hidden">
        <Button type="button" size="sm" variant={mobileView === "edit" ? "primary" : "outline"} onClick={() => setMobileView("edit")}><Pencil className="size-4" /> Edit</Button>
        <Button type="button" size="sm" variant={mobileView === "preview" ? "primary" : "outline"} onClick={() => setMobileView("preview")}><Eye className="size-4" /> Preview</Button>
      </div>
      <div className="mx-auto grid max-w-7xl gap-6 px-5 lg:grid-cols-[430px_minmax(0,1fr)] print:block print:p-0">
        <form className={`cv-editor panel max-h-[calc(100vh-9rem)] overflow-y-auto p-0 print:hidden ${mobileView === "preview" ? "hidden lg:block" : "block"}`} onSubmit={(event) => event.preventDefault()}>
          <div className="sticky top-0 z-10 border-b border-border bg-surface/95 p-5 backdrop-blur-xl"><div className="flex items-center justify-between"><div><h2 className="font-medium">Build your CV</h2><p className="text-xs text-muted-foreground">Preview updates instantly</p></div><FileText className="size-5 text-primary" /></div></div>
          <EditorSection title="Template and accent">
            <div className="grid grid-cols-3 gap-2">{(["classic","modern","minimal"] as Template[]).map((item) => <Button type="button" size="sm" variant={cv.template === item ? "primary" : "outline"} key={item} onClick={() => set("template", item)} className="capitalize">{item}</Button>)}</div>
            <div className="mt-4 flex flex-wrap gap-3">{accents.map((color) => <button type="button" key={color} aria-label={`Use accent ${color}`} onClick={() => set("accent", color)} className={`cv-color-swatch ${cv.accent === color ? "is-active" : ""}`} style={{ backgroundColor: color }} />)}</div>
          </EditorSection>
          <EditorSection title="Personal information"><div className="grid gap-3 sm:grid-cols-2"><Field label="Full name" value={cv.name} onChange={(v) => set("name", v)} /><Field label="Job title" value={cv.title} onChange={(v) => set("title", v)} /><Field label="Email" value={cv.email} onChange={(v) => set("email", v)} /><Field label="Phone" value={cv.phone} onChange={(v) => set("phone", v)} /><Field label="Location" value={cv.location} onChange={(v) => set("location", v)} /><Field label="LinkedIn / website" value={cv.link} onChange={(v) => set("link", v)} /></div><Field label="Professional summary" value={cv.summary} onChange={(v) => set("summary", v)} multiline /></EditorSection>
          <RepeatableSection title="Work experience" type="experiences" onAdd={add}>{cv.experiences.map((item) => <EntryCard key={item.id} onRemove={() => removeEntry("experiences", item.id)}><div className="grid gap-3 sm:grid-cols-2"><Field label="Job title" value={item.title} onChange={(v) => updateEntry("experiences", item.id, "title", v)} /><Field label="Company" value={item.company} onChange={(v) => updateEntry("experiences", item.id, "company", v)} /><Field label="From" value={item.from} onChange={(v) => updateEntry("experiences", item.id, "from", v)} /><Field label="To" value={item.to} onChange={(v) => updateEntry("experiences", item.id, "to", v)} /></div><Field label="Achievements" value={item.description} onChange={(v) => updateEntry("experiences", item.id, "description", v)} multiline /></EntryCard>)}</RepeatableSection>
          <RepeatableSection title="Education" type="education" onAdd={add}>{cv.education.map((item) => <EntryCard key={item.id} onRemove={() => removeEntry("education", item.id)}><div className="grid gap-3 sm:grid-cols-2"><Field label="Degree" value={item.degree} onChange={(v) => updateEntry("education", item.id, "degree", v)} /><Field label="Institution" value={item.school} onChange={(v) => updateEntry("education", item.id, "school", v)} /><Field label="From" value={item.from} onChange={(v) => updateEntry("education", item.id, "from", v)} /><Field label="To" value={item.to} onChange={(v) => updateEntry("education", item.id, "to", v)} /></div></EntryCard>)}</RepeatableSection>
          <RepeatableSection title="Skills" type="skills" onAdd={add}>{cv.skills.map((item) => <EntryCard key={item.id} onRemove={() => removeEntry("skills", item.id)}><div className="grid gap-3 sm:grid-cols-[1fr_110px]"><Field label="Skill" value={item.name} onChange={(v) => updateEntry("skills", item.id, "name", v)} /><Field label="Level 0–100" value={String(item.level)} onChange={(v) => updateEntry("skills", item.id, "level", Math.max(0, Math.min(100, Number(v) || 0)))} /></div></EntryCard>)}</RepeatableSection>
          <RepeatableSection title="Certifications" type="certifications" onAdd={add}>{cv.certifications.map((item) => <EntryCard key={item.id} onRemove={() => removeEntry("certifications", item.id)}><div className="grid gap-3 sm:grid-cols-2"><Field label="Certification" value={item.name} onChange={(v) => updateEntry("certifications", item.id, "name", v)} /><Field label="Issuer and year" value={item.issuer} onChange={(v) => updateEntry("certifications", item.id, "issuer", v)} /></div></EntryCard>)}</RepeatableSection>
          <EditorSection title="Languages and interests"><Field label="Languages, comma separated" value={cv.languages} onChange={(v) => set("languages", v)} /><Field label="Interests, comma separated" value={cv.interests} onChange={(v) => set("interests", v)} /></EditorSection>
          <div className="flex gap-3 p-5"><Button type="button" className="flex-1" onClick={() => window.print()}><Download className="size-4" /> Save PDF</Button><Button type="button" variant="outline" aria-label="Reset CV" title="Reset CV" onClick={() => setCv(demo)}><RotateCcw className="size-4" /></Button></div>
        </form>
        <section className={`cv-preview-stage print:block ${mobileView === "edit" ? "hidden lg:flex" : "flex"}`} aria-label="Live CV preview"><CvPaper cv={cv} /></section>
      </div>
    </main>
  );
}

function Field({ label, value, onChange, multiline = false }: { label: string; value: string; onChange: (value: string) => void; multiline?: boolean }) { return <label className="mt-3 block text-xs font-medium text-muted-foreground"><span className="mb-1.5 block uppercase">{label}</span>{multiline ? <textarea rows={3} className={field} value={value} onChange={(event) => onChange(event.target.value)} /> : <input className={field} value={value} onChange={(event) => onChange(event.target.value)} />}</label>; }
function EditorSection({ title, children }: { title: string; children: ReactNode }) { return <fieldset className="border-b border-border p-5"><legend className="mb-3 font-medium">{title}</legend>{children}</fieldset>; }
function RepeatableSection({ title, type, onAdd, children }: { title: string; type: "experiences" | "education" | "skills" | "certifications"; onAdd: (type: "experiences" | "education" | "skills" | "certifications") => void; children: ReactNode }) { return <EditorSection title={title}><div className="space-y-3">{children}</div><Button type="button" variant="ghost" size="sm" className="mt-3" onClick={() => onAdd(type)}><Plus className="size-4" /> Add {labels[type]}</Button></EditorSection>; }
function EntryCard({ onRemove, children }: { onRemove: () => void; children: ReactNode }) { return <div className="relative rounded-md border border-border bg-background/40 p-3"><Button type="button" variant="ghost" size="sm" aria-label="Remove entry" title="Remove entry" onClick={onRemove} className="absolute right-1 top-1 size-8 px-0"><Trash2 className="size-4" /></Button><div className="pr-7">{children}</div></div>; }

function CvPaper({ cv }: { cv: Cv }) {
  const initials = cv.name.split(" ").filter(Boolean).map((part) => part[0]).join("").slice(0, 2).toUpperCase() || "CV";
  const tags = (items: string[]) => <div className="cv-tags">{items.map((item) => <span key={item}>{item}</span>)}</div>;
  const left = <><CvSection title="Skills">{cv.skills.map((item) => <div className="cv-skill" key={item.id}><div><span>{item.name || "Skill"}</span><small>{item.level}%</small></div><i><b style={{ width: `${item.level}%` }} /></i></div>)}</CvSection>{cv.certifications.length ? <CvSection title="Certifications">{cv.certifications.map((item) => <div className="cv-item compact" key={item.id}><strong>{item.name || "Certification"}</strong><span>{item.issuer}</span></div>)}</CvSection> : null}<CvSection title="Languages">{tags(splitTags(cv.languages))}</CvSection><CvSection title="Interests">{tags(splitTags(cv.interests))}</CvSection></>;
  const right = <><CvSection title="Profile"><p>{cv.summary}</p></CvSection><CvSection title="Experience">{cv.experiences.map((item) => <div className="cv-item" key={item.id}><div><strong>{item.title || "Job title"}</strong><time>{[item.from,item.to].filter(Boolean).join(" – ")}</time></div><span>{item.company}</span><p>{item.description}</p></div>)}</CvSection><CvSection title="Education">{cv.education.map((item) => <div className="cv-item" key={item.id}><div><strong>{item.degree || "Degree"}</strong><time>{[item.from,item.to].filter(Boolean).join(" – ")}</time></div><span>{item.school}</span></div>)}</CvSection></>;
  return <article className={`cv-paper cv-template-${cv.template}`}><header><div className="cv-avatar">{initials}</div><div><h2>{cv.name || "Your Name"}</h2><h3>{cv.title || "Your job title"}</h3><p>{[cv.email,cv.phone,cv.location,cv.link].filter(Boolean).join("  •  ")}</p></div></header><div className="cv-accent-line" /><div className="cv-columns">{cv.template === "minimal" ? <><div>{right}</div><div>{left}</div></> : <><div>{left}</div><div>{right}</div></>}</div></article>;
}
function CvSection({ title, children }: { title: string; children: ReactNode }) { return <section className="cv-section"><h4>{title}</h4>{children}</section>; }
