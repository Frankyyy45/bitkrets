import { blogPostFormSubmitType } from "../../constants";
import type { BlogPost, BlogPostFormData } from "../../types/bitkrets";
import { validateFrontendForm } from "../validateFrontendForm";
import { createBlogPostList } from "../createBlogPostList";
import { handleDelete } from "../handleDelete";
import { buildSubmitFormData } from "../buildSubmitFormData";

function html() {
  return `
        <div id="blog-page">
            <h1>Dashboard</h1>
            <div id="blog-posts" style="display:flex;gap:2em">
                Loading blog posts...
            </div>
            <h3>Write new blog post:</h3>
            <form method="post" id="blog-form" style="display:flex;flex-direction:column;">
                <input type="text" id="blog-id" value="" hidden>
                <label for="blog-title">Blog Title</label>
                <input type="text" name="blog-title" id="blog-title">
                <label for="blog-text">Blog Text</label>
                <textarea name="blog-text" id="blog-text" rows="4" cols="12"></textarea>
                <button id="submit-button" data-submit-type="create">Create Post</button>
            </form>
        </div>
    `;
}

async function logic() {
  const response = await fetch("http://localhost:3000/posts");
  const blogPosts: BlogPost[] = await response.json();
  console.log(blogPosts);

  const blogPostsDiv = document.getElementById("blog-posts");
  if (blogPostsDiv) {
    blogPostsDiv.innerHTML = createBlogPostList(blogPosts);
  } else {
    console.log("Could not find blogPostDiv");
  }

  // blog form inputs
  const blogForm = document.getElementById("blog-form") as HTMLFormElement;
  const blogId = document.getElementById("blog-id") as HTMLInputElement;
  const blogTitle = document.getElementById("blog-title") as HTMLInputElement;
  const blogText = document.getElementById("blog-text") as HTMLInputElement;
  const submitBtn = document.getElementById(
    "submit-button"
  ) as HTMLButtonElement;

  // delete post
  const deleteBtnList = document.querySelectorAll(
    "[data-delete]"
  ) as NodeListOf<HTMLButtonElement>;

  if (deleteBtnList) {
    deleteBtnList.forEach((deleteBtn) => {
      deleteBtn.addEventListener("click", async (event) => {
        event.preventDefault();
        const postId = deleteBtn.dataset["delete"];

        if (postId) {
          try {
            const fd = handleDelete(postId);

            console.log(fd);
            const res = await fetch("http://localhost:3000/dashboard", {
              method: "post",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify(fd),
            });

            console.log(await res.text());
            window.location.reload();
          } catch (error) {
            console.log(error);
          }
        }
      });
    });
  }

  // edit post
  if (blogForm && blogId && blogTitle && blogText && submitBtn) {
    const editBtnList = document.querySelectorAll(
      "[data-edit]"
    ) as NodeListOf<HTMLButtonElement>;

    if (editBtnList) {
      editBtnList.forEach((editBtn) => {
        editBtn.addEventListener("click", (event) => {
          event.preventDefault();
          const postId = editBtn.dataset["edit"];

          blogTitle.value =
            document.querySelector(`[data-title="${postId}"]`)?.innerHTML ||
            "Could not load the post";
          blogText.value =
            document.querySelector(`[data-text="${postId}"]`)?.innerHTML ||
            "Could't load the post";

          submitBtn.setAttribute("data-submit-type", "edit");
          submitBtn.innerText = "Save Post";
          blogId.value = postId || "Could not load the post";
        });
      });
    } else {
      console.log("Could not find etidBtnList");
    }
  }

  // save blog post (create/edit)
  blogForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!validateFrontendForm(blogTitle.value, blogText.value)) {
      console.log("Invalid form data (frontend)");
      return;
    }

    const submitType = submitBtn.getAttribute("data-submit-type");

    const formData = buildSubmitFormData(
      submitType,
      blogId.value,
      blogTitle.value,
      blogText.value
    );

    if (!formData) {
      console.log("Invalid submit type.");
      return;
    }

    console.log(formData);

    try {
      const response = await fetch("http://localhost:3000/dashboard", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      console.log(await response.text());

      // remove value from form
      blogTitle.value = "";
      blogText.value = "";

      // refresh page
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  });
}

export function DashboardPage() {
  return {
    html: html,
    logic: logic,
  };
}
