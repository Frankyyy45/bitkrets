import { blogPostFormSubmitType } from "../constants";
import type { BlogPostFormData } from "../types/bitkrets";

export function buildSubmitFormData(
  submitType: string | null,
  blogId: string,
  blogTitle: string,
  blogText: string
): BlogPostFormData | undefined {
  if (submitType === blogPostFormSubmitType.create) {
    return {
      blogId: blogId ?? "",
      blogTitle,
      blogText,
      submitType: blogPostFormSubmitType.create,
    };
  }

  if (submitType === blogPostFormSubmitType.edit) {
    return {
      blogId,
      blogTitle,
      blogText,
      submitType: blogPostFormSubmitType.edit,
    };
  }

  return undefined;
}
