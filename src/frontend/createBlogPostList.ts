import type { BlogPost } from "../types/bitkrets";

export function createBlogPostList(posts: BlogPost[]): string {
  return posts
    .map(
      (post) => `
        <div class="post">
          <h5 data-title="${post._id}">${post.blogTitle}</h5>
          <p data-text="${post._id}">${post.blogText}</p>
          <button data-edit="${post._id}">Edit</button>
          <button data-delete="${post._id}">Delete</button>
        </div>
      `
    )
    .join("");
}
