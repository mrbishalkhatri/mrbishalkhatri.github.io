/**
 * Single source of truth for portfolio copy.
 * All text is carried over verbatim from the original mrbishalkhatri.github.io site.
 * Nothing here is invented — update this file instead of editing components.
 */

export const profile = {
  name: "Bishal Khatri",
  role: "QA Engineer & Test Automation Specialist",
  tagline: "Crafting Quality Into Every Build.",
  intro:
    "Hi, I'm Bishal Khatri — a QA Engineer who finds the bugs before your users do. 2+ years breaking software so yours can be unbreakable.",
  email: "bishalkhatrichettri1@gmail.com",
  phone: "+977 9810116325",
  phoneHref: "+9779810116325",
  location: "Nepal · Remote Worldwide",
  availability: "Open to new opportunities",
  socials: {
    linkedin: "https://www.linkedin.com/in/qa-bishal-khatri",
    github: "https://github.com/BishalKhatriChettri",
    twitter: "https://twitter.com/ProjectCraftman",
  },
} as const;

export const heroStats = [
  { value: "80+", label: "Projects Delivered" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "2+", label: "Years Experience" },
] as const;

export const heroChips = ["QA Automation", "Data Analysis", "Agile / Scrum"] as const;

export const aboutParagraphs = [
  "I'm Bishal Khatri, a QA Specialist who believes flawless software is a craft, not a checkbox. I bring a meticulous eye for edge cases, a data-driven approach to continuous improvement, and the communication skills to bridge dev and business teams seamlessly.",
  "With 2 years of hands-on experience, I've led QA processes across 80+ web projects and 2 mobile apps — each delivered with zero tolerance for production defects. My specialty lies in transforming manual, error-prone workflows into efficient, automated pipelines that give teams confidence to ship fast.",
  "When I'm not hunting bugs, I write about QA best practices and mentor aspiring engineers on building quality-first mindsets.",
] as const;

export const skills = [
  { name: "Manual Testing", value: 92 },
  { name: "Test Automation", value: 78 },
  { name: "Regression Testing", value: 88 },
  { name: "Performance Testing", value: 72 },
  { name: "Agile / Scrum", value: 90 },
  { name: "Data Analysis", value: 80 },
] as const;

/** Tooling shown as floating objects in the About lab scene. */
export const toolbelt = [
  { label: "Selenium", group: "Automation" },
  { label: "Pytest", group: "Automation" },
  { label: "Playwright", group: "Automation" },
  { label: "Postman", group: "API" },
  { label: "JMeter", group: "Performance" },
  { label: "GitHub Actions", group: "CI/CD" },
  { label: "JIRA", group: "Process" },
  { label: "TestRail", group: "Process" },
] as const;

export const achievements = [
  {
    id: "01",
    body: "Engineered a streamlined QA process that slashed testing cycle time while maintaining zero compromise on quality standards.",
    metric: "⬇ 25% Cycle Time",
  },
  {
    id: "02",
    body: "Led a product quality overhaul in response to user feedback, driving satisfaction to near-perfect levels across the user base.",
    metric: "98% Satisfaction Rate",
  },
  {
    id: "03",
    body: "Championed agile adoption across a cross-functional team, yielding measurable gains in on-time project delivery.",
    metric: "⬆ 20% Efficiency",
  },
  {
    id: "04",
    body: "Identified and resolved a critical performance bottleneck in a high-traffic application, dramatically improving end-user experience.",
    metric: "⬆ 40% Response Speed",
  },
  {
    id: "05",
    body: "Facilitated tighter dev-QA collaboration by introducing structured communication protocols that minimized costly rework cycles.",
    metric: "⬇ 30% Rework",
  },
  {
    id: "06",
    body: "Converted a fully manual testing suite into an automated pipeline, reducing human error and increasing accuracy consistency.",
    metric: "⬆ 15% Accuracy",
  },
] as const;

export const services = [
  {
    title: "QA Consulting",
    body: "Strategic quality consulting to identify gaps in your current QA workflow and design a roadmap for measurable improvement.",
    tags: ["Process Audit", "Roadmap", "Strategy"],
  },
  {
    title: "Test Automation",
    body: "Building scalable automated test suites that run on every commit — catching regressions before they reach production.",
    tags: ["Regression", "CI/CD", "Scripting"],
  },
  {
    title: "Performance Testing",
    body: "Load and stress testing to reveal how your system behaves under real-world pressure — before launch day surprises you.",
    tags: ["Load Testing", "Stress Test", "Benchmarks"],
  },
  {
    title: "QA Training",
    body: "Hands-on workshops and training programs designed to upskill your QA team and embed quality thinking across your org.",
    tags: ["Workshops", "Mentoring", "Best Practices"],
  },
  {
    title: "Process Improvement",
    body: "Redesigning testing workflows using agile principles to reduce cycle times and increase team velocity without sacrificing coverage.",
    tags: ["Agile", "Workflow", "Efficiency"],
  },
  {
    title: "Data-Driven QA",
    body: "Leveraging analytics and bug trend data to prioritize testing efforts intelligently — so the highest-risk areas get the most attention.",
    tags: ["Analytics", "Bug Trends", "Reporting"],
  },
] as const;

export const testimonials = [
  {
    quote:
      "Bishal is a true expert in QA. His attention to detail and commitment to quality is unmatched. Our project benefitted greatly from his insights and suggestions — he caught issues we would never have noticed.",
    name: "Rajniti Gurung",
    title: "Project Stakeholder",
    initials: "RG",
  },
  {
    quote:
      "Bishal went above and beyond with deep research, thorough testing, and actionable suggestions. His continuous dedication to fixing and improving our web development project was genuinely impressive.",
    name: "Ayesh Singh",
    title: "Web Development Client",
    initials: "AS",
  },
] as const;

export const blogPosts = [
  {
    slug: "automated-testing",
    category: "Test Automation",
    title: "The Importance of Automated Testing in Software Development",
    excerpt:
      "Automated testing is no longer a luxury — it's the foundation of every reliable CI/CD pipeline. Here's why every team should prioritize it from day one.",
  },
  {
    slug: "effective-test-cases",
    category: "QA Best Practices",
    title: "Tips for Writing Effective Test Cases",
    excerpt:
      "Test cases are the backbone of any QA process. Well-written test cases save time, reduce ambiguity, and make your entire testing process reproducible and reliable.",
  },
] as const;

/**
 * In-page navigation for the home experience.
 * Additional pages (templates, CV builder, order, blog articles) are added here
 * as their routes are built.
 */
export type NavLink = { label: string; hash: string };

export const navLinks: NavLink[] = [
  { label: "About", hash: "about" },
  { label: "Wins", hash: "achievements" },
  { label: "Services", hash: "services" },
  { label: "Reviews", hash: "testimonials" },
  { label: "Blog", hash: "blog" },
];
