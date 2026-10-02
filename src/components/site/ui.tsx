import { Link } from "@tanstack/react-router";
import type { ComponentProps, ReactNode } from "react";

/** Shared button styling for links and buttons, driven by design tokens. */
const base =
  "inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-60";

const variants = {
  primary:
    "bg-primary text-primary-foreground shadow-soft hover:brightness-110",
  gold: "bg-gold text-gold-foreground shadow-soft hover:brightness-110",
  outline:
    "border border-border bg-transparent text-foreground hover:border-primary hover:text-primary",
  glass: "glass text-foreground hover:border-primary hover:text-primary",
  ghost: "text-muted-foreground hover:text-primary",
} as const;

const sizes = {
  sm: "h-9 px-4",
  md: "h-11 px-6",
  lg: "h-12 px-7 text-base",
} as const;

export type ActionVariant = keyof typeof variants;
export type ActionSize = keyof typeof sizes;

export function actionClass(variant: ActionVariant = "primary", size: ActionSize = "md") {
  return `${base} ${variants[variant]} ${sizes[size]}`;
}

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: ComponentProps<"button"> & { variant?: ActionVariant; size?: ActionSize }) {
  return <button data-3d-action className={`${actionClass(variant, size)} ${className}`} {...props} />;
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: ComponentProps<typeof Link> & { variant?: ActionVariant; size?: ActionSize }) {
  return <Link data-3d-action className={`${actionClass(variant, size)} ${className}`} {...props} />;
}

export function ExternalButtonLink({
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: ComponentProps<"a"> & { variant?: ActionVariant; size?: ActionSize }) {
  return <a data-3d-action className={`${actionClass(variant, size)} ${className}`} {...props} />;
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "center",
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "center" | "left";
}) {
  return (
    <div
      className={`reveal max-w-2xl ${align === "center" ? "mx-auto text-center" : ""} flex flex-col gap-4`}
    >
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="text-3xl sm:text-4xl md:text-[2.7rem]">{title}</h2>
      {lead ? <p className="text-muted-foreground">{lead}</p> : null}
    </div>
  );
}

export function Panel({
  className = "",
  children,
  ...props
}: ComponentProps<"div"> & { children: ReactNode }) {
  return (
    <div data-3d-action className={`panel hover-lift p-6 ${className}`} {...props}>
      {children}
    </div>
  );
}
