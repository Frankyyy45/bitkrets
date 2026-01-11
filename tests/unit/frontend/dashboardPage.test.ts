
import { expect, describe, it } from "vitest";
import { DashboardPage } from "../../../src/frontend/pages/dashboard";

describe("DashboardPage html()", () => {
  it('ska innehålla id="blog-page"', () => {
    const page = DashboardPage();
    const htmlString = page.html();

    expect(htmlString).toContain('id="blog-page"');
  });

  it('ska innehålla blog-posts container och blog-form', () => {
    const page = DashboardPage();
    const htmlString = page.html();

    expect(htmlString).toContain('id="blog-posts"');
    expect(htmlString).toContain('id="blog-form"');
  });

  it('ska ha submit-knapp med data-submit-type="create"', () => {
    const page = DashboardPage();
    const htmlString = page.html();

    expect(htmlString).toContain('id="submit-button"');
    expect(htmlString).toContain('data-submit-type="create"');
  });
});
