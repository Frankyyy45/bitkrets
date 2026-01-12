
// @vitest-environment jsdom

import { describe, it, expect } from "vitest";
import { enterEditMode } from "../../../src/frontend/enterEditMode";

describe("enterEditMode", () => {
  it("ska fylla formuläret korrekt när edit-läge aktiveras", () => {
    // Fake DOM
    document.body.innerHTML = `
      <h5 data-title="123">Min titel</h5>
      <p data-text="123">Min text</p>

      <input id="blog-title" />
      <textarea id="blog-text"></textarea>
      <input id="blog-id" />
      <button id="submit-button">Create Post</button>
    `;

    const blogTitle = document.getElementById("blog-title") as HTMLInputElement;
    const blogText = document.getElementById("blog-text") as HTMLTextAreaElement;
    const blogId = document.getElementById("blog-id") as HTMLInputElement;
    const submitBtn = document.getElementById("submit-button") as HTMLButtonElement;

    enterEditMode("123", blogTitle, blogText, blogId, submitBtn);

    expect(blogTitle.value).toBe("Min titel");
    expect(blogText.value).toBe("Min text");
    expect(blogId.value).toBe("123");
    expect(submitBtn.getAttribute("data-submit-type")).toBe("edit");
    expect(submitBtn.innerText).toBe("Save Post");
  });
});
