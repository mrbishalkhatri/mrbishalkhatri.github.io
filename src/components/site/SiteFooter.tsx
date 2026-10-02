import { Link } from "@tanstack/react-router";
import { navLinks, profile } from "@/lib/site-content";

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-border bg-background">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-3">
          <Link to="/" className="font-serif text-xl">
            Bishal<span className="text-primary">.</span>
          </Link>
          <p className="max-w-xs text-sm text-muted-foreground">
            {profile.role} — based in Kathmandu, Nepal. Available remotely worldwide.
          </p>
        </div>

        <nav aria-label="Sections" className="flex flex-col gap-2 text-sm">
          <span className="eyebrow">Sections</span>
          {navLinks.map((item) => (
            <a
              key={item.hash}
              href={`/#${item.hash}`}
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              {item.label}
            </a>
          ))}
          <Link to="/templates" className="text-muted-foreground transition-colors hover:text-primary">QA Template Store</Link>
          <Link to="/order" search={{ product: "mega-bundle" }} className="text-muted-foreground transition-colors hover:text-primary">Order</Link>
          <Link to="/cv-builder" className="text-muted-foreground transition-colors hover:text-primary">CV Builder</Link>
        </nav>

        <div className="flex flex-col gap-2 text-sm">
          <span className="eyebrow">Contact</span>
          <a
            href={`mailto:${profile.email}`}
            className="break-all text-muted-foreground transition-colors hover:text-primary"
          >
            {profile.email}
          </a>
          <a
            href={`tel:${profile.phoneHref}`}
            className="text-muted-foreground transition-colors hover:text-primary"
          >
            {profile.phone}
          </a>
          <span className="text-muted-foreground">{profile.location}</span>
        </div>

        <div className="flex flex-col gap-2 text-sm">
          <span className="eyebrow">Elsewhere</span>
          <a
            href={profile.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-colors hover:text-primary"
          >
            LinkedIn
          </a>
          <a
            href={profile.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-colors hover:text-primary"
          >
            GitHub
          </a>
          <a
            href={profile.socials.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-colors hover:text-primary"
          >
            X / Twitter
          </a>
        </div>
      </div>

      <div className="border-t border-border px-5 py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} {profile.name} · QA Engineer · Built with precision &amp; care.
      </div>
    </footer>
  );
}
