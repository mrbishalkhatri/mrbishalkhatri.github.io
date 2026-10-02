import { useState, type FormEvent } from "react";
import { Button, ExternalButtonLink, SectionHeading } from "@/components/site/ui";
import { useReveal } from "@/hooks/use-reveal";
import { profile } from "@/lib/site-content";

export function Contact() {
  const ref = useReveal<HTMLElement>();
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  function submit(e: FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio inquiry from ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  }

  const field =
    "w-full rounded-xl border border-input bg-background/60 px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/30";

  return (
    <section id="contact" ref={ref} className="black-stage relative overflow-hidden py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 lg:grid-cols-2">
        <div className="flex flex-col gap-6">
          <SectionHeading
            align="left"
            eyebrow="Contact"
            title={<>Let's ship something <span className="text-gradient">bug-free.</span></>}
            lead={profile.location}
          />
          <div className="reveal flex flex-wrap gap-3">
            <ExternalButtonLink href={`mailto:${profile.email}`} variant="glass">
              {profile.email}
            </ExternalButtonLink>
            <ExternalButtonLink href={`tel:${profile.phoneHref}`} variant="glass">
              {profile.phone}
            </ExternalButtonLink>
          </div>
        </div>
        <form data-3d-action onSubmit={submit} className="reveal glass flex flex-col gap-4 rounded-xl p-8">
          <input required placeholder="Your name" className={field} value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <input required type="email" placeholder="Your email" className={field} value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <textarea required rows={5} placeholder="Tell me about your project" className={field}
            value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
          <Button type="submit" size="lg">Send Message</Button>
        </form>
      </div>
    </section>
  );
}
