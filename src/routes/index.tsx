import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/home/Hero";
import { SceneMount } from "@/components/three/SceneMount";
import { Manifest } from "@/components/home/Manifest";
import { About } from "@/components/home/About";
import { OrbitRing } from "@/components/home/OrbitRing";
import { Achievements } from "@/components/home/Achievements";
import { Testimonials } from "@/components/home/Testimonials";
import { BlogTeaser } from "@/components/home/BlogTeaser";
import { Contact } from "@/components/home/Contact";
import { HomeInteractions } from "@/components/home/HomeInteractions";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Bishal Khatri — QA Engineer & Test Automation Specialist" },
      { name: "description", content: "QA Engineer finding the bugs before your users do. Test automation, manual QA and data-driven testing." },
      { property: "og:title", content: "Bishal Khatri — QA Engineer" },
      { property: "og:description", content: "Crafting quality into every build. QA automation, data analysis, Agile." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="dark bg-background text-foreground">
      <div className="qa-lab-backdrop pointer-events-none fixed inset-0 z-0">
        <SceneMount />
      </div>
      <HomeInteractions>
        <div className="relative z-10">
          <Hero />
          <Manifest />
          <About />
          <OrbitRing />
          <Achievements />
          <Testimonials />
          <BlogTeaser />
          <Contact />
        </div>
      </HomeInteractions>
    </div>
  );
}
