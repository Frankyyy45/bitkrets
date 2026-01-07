import { describe, it, expect } from "vitest";
import { validateBlogPostFormData } from "../../../src/utils/validate";

describe("validateBlogPostFormData", () => {
  it("returnerar true när både titel och text är icke-tomma strängar", () => {
    const formData = {
      blogTitle: "Min titel",
      blogText: "Lite innehåll",
    };

    const result = validateBlogPostFormData(formData as any);

    expect(result).toBe(true);
  });

  it("returnerar false när titel är tom men text har innehåll", () => {
    const formData = {
      blogTitle: "",
      blogText: "Lite innehåll",
    };

    const result = validateBlogPostFormData(formData as any);

    expect(result).toBe(false);
  });

  it("borde returnera false när text inte är en sträng (bugg jag vill hitta)", () => {
    const formData = {
      blogTitle: "Titel",
      blogText: 123,
    };

    const result = validateBlogPostFormData(formData as any);

    expect(result).toBe(false);
  });
});
