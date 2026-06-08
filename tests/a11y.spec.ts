import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import fs from "fs";

type Routes = { routes: string[] };

function readRoutes(): string[] {
  const raw = fs.readFileSync("public/__routes.json", "utf-8");
  const data = JSON.parse(raw) as Routes;
  return data.routes;
}

const routes = readRoutes();
const AXE_EXCLUDED_SELECTORS = [".a11y-ignore-color-contrast"];

for (const route of routes) {
  test.describe(`a11y: ${route}`, () => {
    test(`axe serious/critical only`, async ({ page }) => {
      await page.goto(route, { waitUntil: "networkidle" });

      const builder = new AxeBuilder({ page }).withTags([
        "wcag2a",
        "wcag2aa",
        "wcag22aa",
      ]);

      for (const selector of AXE_EXCLUDED_SELECTORS) {
        builder.exclude(selector);
      }

      const results = await builder.analyze();

      // filter to serious/critical
      const issues = results.violations.filter(v =>
        ["serious", "critical"].includes(v.impact || "")
      );

      if (issues.length) {
        // Print a compact summary to help debugging in CI logs
        console.log(`---- ${route} serious/critical violations ----`);
        for (const v of issues) {
          console.log(`Rule: ${v.id} | Impact: ${v.impact} | Nodes: ${v.nodes.length}`);
          console.log(`Help: ${v.help} | More: ${v.helpUrl}`);
        }
      }

      expect(issues, `Serious/Critical a11y violations on ${route}`).toHaveLength(0);
    });
  });
}
