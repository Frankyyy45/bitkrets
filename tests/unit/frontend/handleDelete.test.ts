import { describe, it, expect } from "vitest";
import { blogPostFormSubmitType } from "../../../src/constants";
import type { BlogPostFormData } from "../../../src/types/bitkrets";
import { handleDelete } from "../../../src/frontend/handleDelete";

describe("handleDelete", () => {
  it("ska skapa korrekt BlogPostFormData för delete", () => {
    const postId = "abc123";

    const result = handleDelete(postId);

    const expected: BlogPostFormData = {
      blogId: postId,
      blogTitle: "delete",
      blogText: "delete",
      submitType: blogPostFormSubmitType.delete,
    };

    expect(result).toEqual(expected);
  });
});
