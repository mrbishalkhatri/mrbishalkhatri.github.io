import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { navLinks } from "@/lib/site-content";
import { useTheme } from "@/hooks/use-theme";

/** Floating glass navigation shared by every page. */
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggle } = useTheme();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <nav
        aria-label="Main"
        className={`glass mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-4 py-2.5 transition-all duration-500 sm:px-6 ${
          scrolled ? "shadow-lift" : ""
        }`}
      >
        <Link to="/" className="font-serif text-lg tracking-tight">
          Bishal<span className="text-primary">.</span>
        </Link>

        <div className="hidden items-center gap-6 lg:flex">
          {navLinks.map((item) => (
            <a
              key={item.label}
              href={`/#${item.hash}`}
              className="text-[0.72rem] font-medium uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-primary"
            >
              {item.label}
            </a>
          ))}
          <Link to="/templates" className="text-[0.72rem] font-medium uppercase tracking-[0.16em] text-accent transition-colors hover:text-primary">Store</Link>
          <Link to="/cv-builder" className="text-[0.72rem] font-medium uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-primary">CV Builder</Link>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggle}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            className="flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-all hover:rotate-12 hover:border-primary hover:text-primary"
          >
            <span aria-hidden="true">{theme === "dark" ? "☀" : "☾"}</span>
          </button>

          <a
            href="/#contact"
            className="hidden rounded-full bg-primary px-5 py-2 text-xs font-medium uppercase tracking-[0.14em] text-primary-foreground transition-all hover:-translate-y-0.5 hover:brightness-110 sm:inline-flex"
          >
            Hire Me
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label="Toggle navigation"
            className="flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground lg:hidden"
          >
            <span aria-hidden="true">{open ? "✕" : "☰"}</span>
          </button>
        </div>
      </nav>

      {open ? (
        <div
          id="mobile-menu"
          className="glass animate-rise-in mx-auto mt-2 flex max-w-6xl flex-col gap-1 rounded-2xl p-3 lg:hidden"
        >
          {navLinks.map((item) => (
            <a
              key={item.label}
              href={`/#${item.hash}`}
              className="rounded-xl px-4 py-2.5 text-sm text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              {item.label}
            </a>
          ))}
          <Link to="/templates" className="rounded-xl px-4 py-2.5 text-sm text-accent">QA Template Store</Link>
          <Link to="/cv-builder" className="rounded-xl px-4 py-2.5 text-sm text-foreground">CV Builder</Link>
          <a
            href="/#contact"
            className="rounded-xl bg-primary px-4 py-2.5 text-center text-sm text-primary-foreground"
          >
            Hire Me
          </a>
        </div>
      ) : null}
    </header>
  );
}
