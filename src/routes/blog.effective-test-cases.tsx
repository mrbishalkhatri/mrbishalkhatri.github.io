import { createFileRoute } from "@tanstack/react-router";
import { ArticleLayout } from "@/components/blog/ArticleLayout";

export const Route = createFileRoute("/blog/effective-test-cases")({
  head: () => ({ meta: [
    { title: "Tips for Writing Effective Test Cases — Bishal Khatri" },
    { name: "description", content: "Learn how to write clear, effective test cases that catch bugs early and make your QA process reproducible, with six practical principles and examples." },
    { property: "og:title", content: "Tips for Writing Effective Test Cases" },
    { property: "og:description", content: "Six practical principles for writing test cases that are clear, atomic, and actually useful." },
    { property: "og:type", content: "article" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: EffectiveTestCasesArticle,
});

const principles = [
  ["Keep each test case atomic", "Each test case should verify exactly one thing. Complex, multi-purpose test cases become impossible to diagnose when they fail. If a test case needs a long ‘and also...’ — split it."],
  ["Use descriptive, specific names", "Bad: Test_Login_001. Good: Login_InvalidPassword_ShowsErrorMessage. The name should tell any team member exactly what scenario is being validated without opening the case itself."],
  ["Define preconditions explicitly", "State exactly what must be true before the test begins — user account state, test data, environment config. Ambiguous preconditions are the number-one cause of ‘works on my machine’ failures in QA."],
  ["Cover positive and negative scenarios", "For every happy path, write at least one negative test. What happens with empty inputs? Invalid formats? Boundary values? Most production bugs live in the negative paths that developers didn't consider."],
  ["Write unambiguous expected results", "Expected results must be verifiable and objective. ‘System should work correctly’ is not a valid expected result. ‘Error message Invalid email format is displayed below the email field’ is."],
  ["Review, refine, and keep them alive", "Test cases decay. As features evolve, outdated test cases become noise that slows teams down. Build peer review into your process and deprecate stale cases aggressively."],
];

function EffectiveTestCasesArticle() {
  return (
    <ArticleLayout category="QA Best Practices" title="Tips for Writing" accentTitle="Effective Test Cases" date="March 3, 2024" readingTime="6 min read" topic="Test Design" lead="Test cases are the backbone of any QA process. Well-written ones save hours of debugging, reduce ambiguity between teams, and make your entire testing suite reproducible. Here's how to write them right." toc={[{id:"requirements",label:"Understand Requirements"},{id:"tips",label:"Six Principles"},{id:"naming",label:"Good vs Bad Naming"},{id:"structure",label:"Anatomy of a Test Case"}]} relatedTo="/blog/automated-testing" relatedTitle="The Importance of Automated Testing in Software Development">
      <blockquote><strong>The rule of thumb:</strong> if two different testers run the same test case and get different results, the test case is broken — not the software.</blockquote>
      <h2 id="requirements">1. Understand the Requirements First</h2>
      <p>Before writing a single test case, make sure you deeply understand what you're testing. A test case written against a misunderstood requirement is worse than no test at all — it gives false confidence. Read the specs, ask clarifying questions, and map every acceptance criterion to at least one test scenario.</p>
      <h2 id="tips">Six Principles for Effective Test Cases</h2>
      <p>These principles have shaped how I approach test design across 80+ projects:</p>
      <div className="blog-principles">{principles.map(([title,body],index) => <div key={title}><span>{String(index + 1).padStart(2,"0")}</span><div><h3>{title}</h3><p>{body}</p></div></div>)}</div>
      <h2 id="naming">Good vs. Bad: Naming Examples</h2>
      <p>Here's the difference clear naming makes in practice:</p>
      <div className="blog-compare"><div><strong>Unclear</strong><code>TC_001<br/>TC_Login_Test<br/>Check_Form<br/>User_Test_3</code></div><div><strong>Descriptive</strong><code>Login_ValidCreds_RedirectsToDashboard<br/>Login_EmptyPassword_BlocksSubmit<br/>Form_MaxLength_TruncatesInput<br/>User_Delete_RemovesFromDB</code></div></div>
      <h2 id="structure">Anatomy of a Great Test Case</h2>
      <p>Every test case I write follows this structure consistently:</p>
      <ul>
        <li><strong>ID & Title:</strong> Unique identifier + descriptive name using the convention above.</li><li><strong>Preconditions:</strong> Environment, data, and state required before execution.</li><li><strong>Test Steps:</strong> Numbered, granular actions. Each step = one user action.</li><li><strong>Test Data:</strong> Exact inputs — never vague like “enter a valid email.”</li><li><strong>Expected Result:</strong> Observable, binary outcome. Pass or fail, no grey area.</li><li><strong>Priority:</strong> Critical / High / Medium / Low — helps triage under time pressure.</li><li><strong>Tags:</strong> Feature area, regression flag, automation candidate label.</li>
      </ul>
      <div className="blog-conclusion"><h2>The Bottom Line</h2><p>Well-written test cases aren't just documentation — they're your safety net, your team's shared language, and your first line of defence against regressions. Invest time in getting them right upfront; you'll save tenfold later in debugging and re-runs.</p><p>The best test suite isn't the biggest one — it's the one every tester can run confidently and every developer can read and trust.</p></div>
    </ArticleLayout>
  );
}