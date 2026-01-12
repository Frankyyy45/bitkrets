import { describe, it, expect } from "vitest";
import { blogPostFormSubmitType } from "../../../src/constants";
import { buildSubmitFormData } from "../../../src/frontend/buildSubmitFormData";

describe("buildSubmitFormData", () => {
  it("ska bygga formData för create", () => {
    const result = buildSubmitFormData(
      blogPostFormSubmitType.create,
      "", // blogId kan vara tom vid create
      "En titel",
      "En text"
    );

    expect(result).toEqual({
      blogId: "",
      blogTitle: "En titel",
      blogText: "En text",
      submitType: blogPostFormSubmitType.create,
    });
  });

  it("ska bygga formData för edit när blogId finns", () => {
    const result = buildSubmitFormData(
      blogPostFormSubmitType.edit,
      "abc123",
      "Ny titel",
      "Ny text"
    );

    expect(result).toEqual({
      blogId: "abc123",
      blogTitle: "Ny titel",
      blogText: "Ny text",
      submitType: blogPostFormSubmitType.edit,
    });
  });

  it("ska returnera undefined för ogiltig submitType", () => {
    const result = buildSubmitFormData(
      "invalid-type" as any,
      "abc123",
      "Titel",
      "Text"
    );

    expect(result).toBeUndefined();
  });
});
