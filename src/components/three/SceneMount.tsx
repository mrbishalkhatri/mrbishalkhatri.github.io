import { ClientOnly } from "@tanstack/react-router";
import { Suspense, lazy, useEffect, useState } from "react";

/** Loaded only in the browser: the module imports three.js. */
const LabScene = lazy(() => import("./LabScene"));

/**
 * Mounts the WebGL scene behind content.
 * Falls back to a static gradient when WebGL is unavailable or the visitor
 * prefers reduced motion — the page never depends on the canvas.
 */
export function SceneMount({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} aria-hidden="true">
      <ClientOnly fallback={<SceneFallback />}>
        <GatedScene />
      </ClientOnly>
    </div>
  );
}

function GatedScene() {
  const [enabled, setEnabled] = useState<boolean | null>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let webgl = false;
    try {
      const canvas = document.createElement("canvas");
      webgl = Boolean(canvas.getContext("webgl2") ?? canvas.getContext("webgl"));
    } catch {
      webgl = false;
    }
    setEnabled(webgl && !reduced);
  }, []);

  if (enabled !== true) return <SceneFallback />;

  return (
    <Suspense fallback={<SceneFallback />}>
      <LabScene />
    </Suspense>
  );
}

function SceneFallback() {
  return (
    <div className="absolute inset-0 lab-grid opacity-60">
      <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
    </div>
  );
}
