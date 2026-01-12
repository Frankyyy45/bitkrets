import { blogPostFormSubmitType } from "../constants";
import type { BlogPostFormData } from "../types/bitkrets";

export function handleDelete(postId: string): BlogPostFormData {
  return {
    blogId: postId,
    blogTitle: "delete",
    blogText: "delete",
    submitType: blogPostFormSubmitType.delete,
  };
}
