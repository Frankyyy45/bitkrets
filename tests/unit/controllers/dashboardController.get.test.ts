
import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  getBlogPosts,
  getBlogPost,
} from "../../../src/backend/controllers/dashboardController";
import { collections } from "../../../src/backend/db";

describe("GET controllers", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  describe("getBlogPosts", () => {
    it("ska returnera 200 och en lista med blogginlägg", async () => {
      const fakePosts = [
        { blogTitle: "A", blogText: "a", submitType: "create" },
        { blogTitle: "B", blogText: "b", submitType: "create" },
      ];

      // Mocka: collections.blogPosts.find({}).toArray()
      const toArray = vi.fn().mockResolvedValue(fakePosts);
      const find = vi.fn().mockReturnValue({ toArray });

      (collections as any).blogPosts = { find };

      const req: any = {};
      const res: any = {
        status: vi.fn().mockReturnThis(),
        send: vi.fn(),
      };

      await getBlogPosts({ req, res });

      expect(find).toHaveBeenCalledWith({});
      expect(toArray).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith(fakePosts);
    });
  });

  describe("getBlogPost", () => {
    it("ska returnera en post när blogId är giltig och finns", async () => {
      const fakePost = { blogTitle: "Hej", blogText: "Värld" };

      const findOne = vi.fn().mockResolvedValue(fakePost);
      (collections as any).blogPosts = { findOne };

      const req: any = {
        params: { blogId: "507f1f77bcf86cd799439011" }, // giltig ObjectId-sträng
      };
      const res: any = { send: vi.fn() };

      await getBlogPost({ req, res });

      expect(findOne).toHaveBeenCalled();
      expect(res.send).toHaveBeenCalledWith(fakePost);
    });
  });
});



