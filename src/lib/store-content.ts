/**
 * QA Template Store catalogue — carried over verbatim from the original
 * templates.html and order.html. Update here, not in components.
 */
export type Category = "general" | "hrms" | "automation" | "jira" | "docs" | "career";

export const categories: { id: Category; label: string }[] = [
  { id: "hrms", label: "🏆 HRMS" },
  { id: "automation", label: "⚙️ Automation" },
  { id: "jira", label: "📊 Jira" },
  { id: "docs", label: "📄 Docs" },
  { id: "career", label: "🎓 Career" },
  { id: "general", label: "📋 General QA" },
];

export type Template = {
  id: number;
  slug?: string;
  tier: "free" | "paid";
  cat: Category;
  title: string;
  desc: string;
  tags: string[];
  formats: string[];
  price?: string;
  orig?: string;
  badge?: "hot" | "new" | "moat";
  download?: string;
};

export const templates: Template[] = [
  { id: 1, tier: "free", cat: "general", title: "Basic Test Case Template", desc: "Clean, ready-to-use test case template with all essential fields — ID, steps, expected results, status and priority. Dashboard, dropdowns, colour coding included.", tags: ["Manual Testing", "Excel", "Beginner", "Dashboard"], formats: ["Excel"], download: "/downloads/Basic_Test_Case_Template_FREE_BishalKhatri.xlsx" },
  { id: 2, tier: "free", cat: "general", title: "Simple Bug Report Form", desc: "Professional bug report capturing severity, steps to reproduce, environment details, and expected vs actual results. Dropdowns, colour coding, summary dashboard.", tags: ["Bug Tracking", "Excel", "Beginner"], formats: ["Excel"], download: "/downloads/Bug_Report_Tracker_FREE_BishalKhatri.xlsx" },
  { id: 3, tier: "free", cat: "general", title: "Web App QA Checklist — 50 Points", desc: "58-point checklist across 7 categories — UI, Navigation, Forms, Security, Performance, Cross-Browser, Accessibility. Priority labels and summary table included.", tags: ["Checklist", "Web Testing", "PDF", "Print-ready"], formats: ["PDF"], badge: "hot", download: "/downloads/Web_App_QA_Checklist_50pt_FREE_BishalKhatri.pdf" },
  { id: 4, tier: "free", cat: "general", title: "QA Test Plan — 1-Pager", desc: "Concise one-page test plan for small to medium projects. Covers scope, approach, resources, and schedule without the corporate bloat.", tags: ["Test Plan", "Agile", "Word"], formats: ["Word"], download: "/downloads/QA_Test_Plan_1Pager_FREE_BishalKhatri.docx" },
  { id: 5, tier: "free", cat: "career", title: "QA Interview Quick Guide — Top 30 Q&A", desc: "30 most-asked QA interview questions with model answers. A free taste of the full 500-question Interview Prep Kit — great for freshers.", tags: ["Interview", "Fresher", "PDF"], formats: ["PDF"], badge: "new", download: "/downloads/QA_Interview_Quick_Guide_30QA_FREE_BishalKhatri.pdf" },
  { id: 6, slug: "leave-pack", tier: "paid", cat: "hrms", title: "Leave Management Testing Pack", desc: "150+ test cases covering leave application, approval workflows, carry-forward rules, encashment, and leave balance calculations. Built from real HRMS implementation.", tags: ["HRMS", "150+ Cases", "Excel", "Leave"], formats: ["Excel", "CSV"], price: "$19", orig: "$35", badge: "moat" },
  { id: 7, slug: "payroll-pack", tier: "paid", cat: "hrms", title: "Payroll Testing Pack", desc: "200+ test cases for gross/net salary, tax deductions, overtime, bonuses, PF/ESI, and payslip generation. Covers edge cases most QA engineers miss.", tags: ["HRMS", "200+ Cases", "Payroll", "Tax"], formats: ["Excel", "CSV"], price: "$22", orig: "$40", badge: "hot" },
  { id: 8, slug: "attendance-pack", tier: "paid", cat: "hrms", title: "Attendance & Device Testing Pack", desc: "Test cases for ZKTeco biometric devices, manual attendance, shift management, overtime detection, and HRMS sync. Niche with almost zero competition.", tags: ["ZKTeco", "Biometric", "Attendance", "HRMS"], formats: ["Excel", "CSV"], price: "$19", orig: "$35", badge: "moat" },
  { id: 9, slug: "recruitment-pack", tier: "paid", cat: "hrms", title: "Recruitment & Onboarding Testing Pack", desc: "Test cases for job posting, applicant tracking, interview scheduling, offer letters, onboarding checklists, and document management workflows.", tags: ["Recruitment", "ATS", "Onboarding", "HRMS"], formats: ["Excel", "CSV"], price: "$17", orig: "$30" },
  { id: 10, slug: "appraisal-pack", tier: "paid", cat: "hrms", title: "Performance Appraisal Testing Pack", desc: "Test cases for KPI setup, 360-degree feedback, rating workflows, appraisal cycles, bell curve normalization, and increment calculations.", tags: ["Appraisal", "KPI", "360 Feedback"], formats: ["Excel", "CSV"], price: "$17", orig: "$30" },
  { id: 11, slug: "selenium-kit", tier: "paid", cat: "automation", title: "Selenium Automation Starter Kit", desc: "Complete Python framework with Page Object Model, logging, screenshots on failure, Excel/CSV data-driven testing, and HTML reporting. Saves junior QAs 2–3 days of setup.", tags: ["Python", "POM", "Data-Driven", "Reports"], formats: ["Python", "ZIP"], price: "$25", orig: "$45", badge: "hot" },
  { id: 12, slug: "permission-tool", tier: "paid", cat: "automation", title: "Permission Testing Automation Tool", desc: "Reads role-permission matrix, logs in automatically, checks menu/button visibility per role, and generates a pass/fail report. Built for HRMS with 100+ permissions.", tags: ["Permissions", "RBAC", "Python", "Report"], formats: ["Python", "Excel"], price: "$29", orig: "$55", badge: "moat" },
  { id: 13, slug: "release-notes", tier: "paid", cat: "automation", title: "Release Notes Generator", desc: "Feed Jira tickets, Excel sheet, or CSV export — get professionally formatted release notes with bug fix summary, feature summary, and known issues. Saves 2hrs every sprint.", tags: ["Jira", "CSV", "Sprint", "Word"], formats: ["Python", "Word"], price: "$22", orig: "$40", badge: "new" },
  { id: 14, slug: "migration-validator", tier: "paid", cat: "automation", title: "Employee Data Migration Validator", desc: "Validates CSV structure, checks required fields, flags duplicate records, verifies data types, and generates an error report. Essential before any HRMS bulk import.", tags: ["CSV", "Migration", "HRMS", "Validator"], formats: ["Python", "Excel"], price: "$19", orig: "$35" },
  { id: 15, slug: "zkteco-pack", tier: "paid", cat: "automation", title: "ZKTeco Attendance Utilities Pack", desc: "Three utilities: user backup tool, attendance log export formatter, and device health checker. HR companies using ZKTeco devices need these daily but rarely have technical staff.", tags: ["ZKTeco", "Biometric", "HR Utilities", "Python"], formats: ["Python", "ZIP"], price: "$24", orig: "$45", badge: "moat" },
  { id: 16, slug: "bug-trend", tier: "paid", cat: "jira", title: "Bug Trend Dashboard Template", desc: "Excel dashboard showing daily/weekly bug discovery and closure rates, defect aging, and severity breakdown. Perfect for weekly QA status reports.", tags: ["Jira", "Excel", "Charts", "Dashboard"], formats: ["Excel", "PDF"], price: "$15", orig: "$28" },
  { id: 17, slug: "sprint-dashboard", tier: "paid", cat: "jira", title: "Sprint Quality Dashboard", desc: "Track test coverage, pass/fail rates, defect injection rate, and sprint burndown across multiple sprints. Automated charts update as you paste data.", tags: ["Sprint", "Agile", "Excel", "Charts"], formats: ["Excel"], price: "$15", orig: "$28", badge: "hot" },
  { id: 18, slug: "defect-leakage", tier: "paid", cat: "jira", title: "Defect Leakage Dashboard", desc: "Measures how many defects escaped QA and reached production. Broken down by sprint, tester, and module. Essential metric for QA teams reporting to management.", tags: ["Defect Leakage", "KPI", "Excel"], formats: ["Excel"], price: "$15", orig: "$28" },
  { id: 19, slug: "release-readiness", tier: "paid", cat: "jira", title: "Release Readiness Dashboard", desc: "Go/no-go checklist + metrics dashboard for release decisions. Covers test coverage %, blocker count, sign-off status, and risk score. Managers love this.", tags: ["Release", "Go/No-Go", "Manager-ready"], formats: ["Excel", "PDF"], price: "$15", orig: "$28", badge: "new" },
  { id: 20, slug: "qa-docs-bundle", tier: "paid", cat: "docs", title: "QA Documentation Bundle", desc: "Five professionally formatted documents: Test Plan, Test Strategy, Requirements Traceability Matrix, Bug Report Template, and UAT Sign-off. Client-ready out of the box.", tags: ["Test Plan", "RTM", "UAT", "Word", "PDF"], formats: ["Word", "PDF"], price: "$29", orig: "$55", badge: "hot" },
  { id: 21, slug: "hr-formula", tier: "paid", cat: "docs", title: "HR Formula Library (Excel)", desc: "50+ Excel formulas for payroll, leave accrual, tax calculations, overtime, gratuity, and PF. Annotated with real use-case examples. HR software implementers use these daily.", tags: ["Excel", "Payroll", "Tax", "HR Formulas"], formats: ["Excel"], price: "$22", orig: "$40", badge: "moat" },
  { id: 22, slug: "interview-kit", tier: "paid", cat: "career", title: "QA Interview Prep Kit — 500 Q&A", desc: "500 QA interview questions with detailed answers across manual testing, automation, API, performance, and behavioral. Plus sample bug reports and Selenium practice projects.", tags: ["500 Questions", "Fresher", "Automation", "PDF"], formats: ["PDF", "Excel"], price: "$19", orig: "$35", badge: "hot" },
];

export const megaBundle = {
  slug: "mega-bundle",
  title: "The Complete QA Professional Bundle",
  desc: "Every single template in the store. HRMS test packs, Selenium kit, Jira dashboards, documentation bundle, HR formula library, interview prep kit, automation tools — all 20 paid products in one download.",
  includes: ["All 5 HRMS Packs", "Selenium Starter Kit", "Permission Testing Tool", "Release Notes Generator", "All 4 Jira Dashboards", "QA Docs Bundle", "HR Formula Library", "Migration Validator", "ZKTeco Utilities", "Interview Prep Kit 500Q"],
  price: "$99",
  orig: "$280+ separately",
  savings: "You save $181+",
};

export const hrmsBundle = {
  slug: "hrms-bundle",
  title: "Complete HRMS QA Bundle — All 5 Packs",
  desc: "Leave · Payroll · Attendance · Recruitment · Performance Appraisal. 750+ real test cases written from hands-on HRMS implementation experience. The most comprehensive HRMS testing resource available anywhere.",
  price: "$69",
  orig: "$94 separately",
  savings: "Save $25",
};

/** Order catalogue keyed by ?product= slug (verbatim from order.html). */
export type OrderProduct = { name: string; price: string; orig: string; savings: string; desc: string; includes: string[]; khaltiAmt: string };

const npr: Record<string, string> = { "$15": "NPR ~2,000 (≈ $15)", "$17": "NPR ~2,275 (≈ $17)", "$19": "NPR ~2,540 (≈ $19)", "$22": "NPR ~2,940 (≈ $22)", "$24": "NPR ~3,210 (≈ $24)", "$25": "NPR ~3,340 (≈ $25)", "$29": "NPR ~3,880 (≈ $29)" };

export const orderProducts: Record<string, OrderProduct> = {
  "mega-bundle": {
    name: "Complete QA Professional Bundle", price: "$99", orig: "$280+", savings: "$181+",
    desc: "Every template in the store — 20 paid products in one download. The ultimate QA toolkit built from real engineering experience.",
    includes: ["All 5 HRMS QA Packs (Leave, Payroll, Attendance, Recruitment, Appraisal)", "Selenium Python Automation Starter Kit", "Permission Testing Automation Tool", "Release Notes Generator (Python)", "Employee Data Migration Validator", "ZKTeco Attendance Utilities Pack", "All 4 Jira Dashboard Templates", "QA Documentation Bundle (5 Word docs)", "HR Formula Library (50+ Excel formulas)", "QA Interview Prep Kit — 500 Q&A"],
    khaltiAmt: "NPR ~13,200 (≈ $99)",
  },
  "hrms-bundle": {
    name: "Complete HRMS QA Bundle", price: "$69", orig: "$94", savings: "$25",
    desc: "All 5 HRMS test case packs — Leave, Payroll, Attendance, Recruitment & Performance Appraisal. 750+ real test cases from hands-on HRMS experience.",
    includes: ["Leave Management Testing Pack (150+ cases)", "Payroll Testing Pack (200+ cases)", "Attendance & Device Testing Pack (120+ cases)", "Recruitment & Onboarding Pack (130+ cases)", "Performance Appraisal Testing Pack (100+ cases)"],
    khaltiAmt: "NPR ~9,200 (≈ $69)",
  },
  ...Object.fromEntries(
    templates
      .filter((t) => t.slug && t.price && t.orig)
      .map((t) => {
        const p = Number(t.price!.slice(1));
        const o = Number(t.orig!.slice(1));
        return [t.slug!, { name: t.title, price: t.price!, orig: t.orig!, savings: `$${o - p}`, desc: t.desc, includes: t.tags, khaltiAmt: npr[t.price!] ?? t.price! }];
      }),
  ),
};

export const ORDER_ENDPOINT = "https://formspree.io/f/xwkgbywr";
export const KHALTI_NUMBER = "9810116325";
