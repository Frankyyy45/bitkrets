import { expect, test } from "vitest";
import { createBlogPost } from "../../../src/backend/services/dashboardService";
import { invalidCreateBlogPostFormData, validCreateBlogPostFormData } from "../../data/formData";

// theses tests are not functioning as expected
// we refactor in next iteration

test("test create blog post", async () => {
    // test invalidCreateBlogPostFormData
    // this will not fail at the moment since we do not have any db integrity...
    expect(await createBlogPost(invalidCreateBlogPostFormData[0])).toBe(undefined);


    // test validCreateBlogPostFormData
    expect(await createBlogPost(validCreateBlogPostFormData)).toContain(
        {
            "blogTitle": validCreateBlogPostFormData.blogTitle,
            "blogText": validCreateBlogPostFormData.blogText
        }
    );
})


// test edit blog post 

// test delete blog post 

// https://mongoosejs.com/