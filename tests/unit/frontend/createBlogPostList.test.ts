// tests/unit/frontend/createBlogPostList.test.ts
import { describe, it, expect } from "vitest";
import type { BlogPost } from "../../../src/types/bitkrets";
import { createBlogPostList } from "../../../src/frontend/createBlogPostList";

describe("createBlogPostList", () => {
  it("ska rendera en lista med blogginlägg med edit/delete-knappar", () => {
    const posts: BlogPost[] = [
      {
        _id: "abc123",
        blogTitle: "Titel 1",
        blogText: "Text 1",
      },
      {
       
        _id: "def456",
        blogTitle: "Titel 2",
        blogText: "Text 2",
      },
    ];

    const html = createBlogPostList(posts);

    expect(html).toContain("Titel 1");
    expect(html).toContain("Text 1");
    expect(html).toContain("Titel 2");
    expect(html).toContain("Text 2");

    // knappar / data-attribut
    expect(html).toContain('data-edit="abc123"');
    expect(html).toContain('data-delete="abc123"');
    expect(html).toContain('data-edit="def456"');
    expect(html).toContain('data-delete="def456"');
  });
});
