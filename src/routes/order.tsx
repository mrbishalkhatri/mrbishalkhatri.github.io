import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { KHALTI_NUMBER, ORDER_ENDPOINT, orderProducts } from "@/lib/store-content";

type Search = { product?: string | undefined };

export const Route = createFileRoute("/order")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    product: typeof s["product"] === "string" ? (s["product"] as string) : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Order QA Templates — Checkout | Bishal Khatri" },
      { name: "description", content: "Place your order for premium QA templates. Pay by card via Stripe link or Khalti wallet in Nepal." },
      { property: "og:title", content: "Order QA Templates — Bishal Khatri" },
      { property: "og:description", content: "Checkout for HRMS packs, automation kits, Jira dashboards and the complete QA bundle." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: OrderPage,
});

function OrderPage() {
  const { product } = Route.useSearch();
  const key = product && orderProducts[product] ? product : "mega-bundle";
  const p = orderProducts[key]!;
  const [method, setMethod] = useState<"card" | "khalti">("card");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const fd = new FormData(e.currentTarget);
    fd.set("product", p.name);
    fd.set("price", p.price);
    fd.set("payment_method", method === "khalti" ? "Khalti" : "Card (Stripe link)");
    try {
      const res = await fetch(ORDER_ENDPOINT, { method: "POST", body: fd, headers: { Accept: "application/json" } });
      setStatus(res.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  }

  const field = "w-full rounded-xl border border-input bg-surface/70 px-4 py-3 text-sm outline-none focus:border-primary";

  return (
    <div className="dark bg-background text-foreground">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 pb-20 pt-32 lg:grid-cols-[1fr_1.1fr]">
        <aside data-3d-action className="panel h-fit p-7">
          <span className="eyebrow">Your order</span>
          <h1 className="mt-3 text-3xl">{p.name}</h1>
          <p className="mt-3 text-sm text-muted-foreground">{p.desc}</p>
          <div className="mt-5 flex items-baseline gap-3">
            <span className="font-serif text-5xl text-accent">{p.price}</span>
            <span className="text-sm text-muted-foreground line-through">{p.orig}</span>
            <span className="text-sm text-primary">Save {p.savings}</span>
          </div>
          <ul className="mt-6 space-y-2 text-sm">
            {p.includes.map((i) => <li key={i}><span className="text-accent">✓</span> {i}</li>)}
          </ul>
          <Link to="/templates" className="mt-6 inline-block text-xs text-muted-foreground hover:text-primary">← Back to store</Link>
        </aside>

        <section className="panel p-7">
          {status === "done" ? (
            <div className="py-10 text-center">
              <div className="text-5xl">✓</div>
              <h2 className="mt-4 text-2xl">Order received!</h2>
              <p className="mx-auto mt-3 max-w-sm text-sm text-muted-foreground">
                {method === "khalti"
                  ? "Bishal verifies payment and emails your Google Drive download link within 2 hours."
                  : "Bishal will email you a personalised Stripe payment link within 30 minutes."}
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="flex flex-col gap-5">
              <h2 className="text-2xl">Checkout</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <input name="name" required placeholder="Full name" className={field} />
                <input name="email" type="email" required placeholder="Email address" className={field} />
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {([["card", "Card · Apple / Google Pay", "Visa, Mastercard via secure Stripe link"], ["khalti", "Khalti Wallet", "Nepal only · Pay in NPR"]] as const).map(([id, label, sub]) => (
                  <button key={id} type="button" onClick={() => setMethod(id)} data-3d-action
                    className={`rounded-xl border p-4 text-left ${method === id ? "border-primary bg-primary/10" : "border-border"}`}>
                    <div className="text-sm font-medium">{label}</div>
                    <div className="text-xs text-muted-foreground">{sub}</div>
                  </button>
                ))}
              </div>

              {method === "card" ? (
                <ol className="space-y-2 rounded-xl border border-border p-4 text-sm text-muted-foreground">
                  <li>1. Fill in your name and email and click "Place My Order". No card details needed here.</li>
                  <li>2. Bishal gets your order instantly and creates a personalised Stripe payment link — in your inbox within 30 minutes.</li>
                  <li>3. Open the secure link → pay with Visa, Mastercard, Apple Pay, or Google Pay.</li>
                  <li>4. Done — your Google Drive download link arrives typically within 1–2 hours of payment.</li>
                </ol>
              ) : (
                <div className="space-y-3 rounded-xl border border-border p-4 text-sm text-muted-foreground">
                  <p>1. Open Khalti app → Send Money → <span className="font-mono text-primary">{KHALTI_NUMBER}</span> (Bishal Khatri)</p>
                  <p>2. Send exactly <strong className="text-primary">{p.khaltiAmt}</strong> · Add your email in Remarks</p>
                  <p>3. Screenshot the confirmation, then enter your Transaction ID below.</p>
                  <input name="transaction_id" required placeholder="Khalti Transaction ID" className={field} />
                </div>
              )}

              <textarea name="message" rows={3} placeholder="Notes (optional)" className={field} />
              <button type="submit" disabled={status === "sending"} data-3d-action
                className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground disabled:opacity-60">
                {status === "sending" ? "Sending…" : `Place My Order — ${p.price}`}
              </button>
              {status === "error" ? <p className="text-sm text-destructive">Something went wrong. Please email bishalkhatrichettri1@gmail.com.</p> : null}
            </form>
          )}
        </section>
      </div>
    </div>
  );
}
