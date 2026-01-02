import type { Request, Response } from "express";
import type { BlogPost, CreateBlogPostFormData } from "../../types/bitkrets";
import { validateCreateBlogPostFormData } from "../../utils/validate";
import { collections, DatabaseConnection } from "../db";
import { ObjectId, type InsertOneResult, type OptionalId } from "mongodb";


// function that creates the blog object, and return the newly created object 
export async function createBlogPost(
  createBlogPostFormData: CreateBlogPostFormData
) {
  try {
    // we are switching to mongoose in next iteration
    const insertResult: InsertOneResult<OptionalId<BlogPost>> | undefined =
      await DatabaseConnection.posts.insertOne({
        blogTitle: createBlogPostFormData.blogTitle,
        blogText: createBlogPostFormData.blogText,
      });
    if (!insertResult) {
      // if failed to add to db
      console.error("Failed to create blogPost with insertOne.");
      return undefined;
    }
    // get newly created blogId
    const blogId = insertResult.insertedId;
    // get newly creted blog post with insertedId 
    const newlyCreatedBlogPost = await DatabaseConnection.posts.findOne({ _id: new ObjectId(blogId) })
    // return the newly created blog post...
    return newlyCreatedBlogPost;
  } catch (error) {
    console.error("Failed to save blog post to db: ", error);
    return undefined;
  }
}

// create blog post service
export async function createBlogPostService(
  res: Response,
  req: Request,
  createBlogPostFormData: CreateBlogPostFormData
) {
  // validate form data
  if (!validateCreateBlogPostFormData(createBlogPostFormData)) {
    return res.status(400).send("Invalid Form Data.");
  }
  // try add to db

  // prepare return object
  let blogPost: InsertOneResult<OptionalId<BlogPost>> | undefined;
  try {
    // try insert into to db
    blogPost = await collections.blogPosts?.insertOne({
      blogTitle: createBlogPostFormData.blogTitle,
      blogText: createBlogPostFormData.blogText,
    });
    if (blogPost) {
      // return successfully to client
      return res.status(200).send(blogPost);
    } else {
      // return error message
      return res.status(500).send("Failed to save blog post to db.");
    }
  } catch (error) {
    // log error
    console.error("Failed to save blog post to db: ", error);
    // return error message
    return res.status(500).send("Failed to save blog post to db.");
  }
}

// edit blog post

// delete blog post
