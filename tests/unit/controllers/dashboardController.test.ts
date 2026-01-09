import { describe, it, expect, vi, beforeEach } from "vitest";
import { dashboard } from "../../../src/backend/controllers/dashboardController";
import * as validateModule from "../../../src/utils/validate";
import { collections } from "../../../src/backend/db";

describe("dashboard controller", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("ska returnera 400 när formData är ogiltig", async () => {
    vi.spyOn(validateModule, "validateBlogPostFormData").mockReturnValue(false);

    const req: any = { body: {} };
    const res: any = { status: vi.fn().mockReturnThis(), send: vi.fn() };

    await dashboard(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith("Invalid form data!");
  });

  it("ska skapa blogginlägg när formData är giltig (create)", async () => {
    vi.spyOn(validateModule, "validateBlogPostFormData").mockReturnValue(true);

    const insertOne = vi.fn().mockResolvedValue({ acknowledged: true });
    (collections as any).blogPosts = { insertOne };

    const req: any = {
      body: { blogTitle: "Titel", blogText: "Text", submitType: "create" },
    };
    const res: any = { status: vi.fn().mockReturnThis(), send: vi.fn() };

    await dashboard(req, res);

    expect(insertOne).toHaveBeenCalled();
    expect(res.send).toHaveBeenCalledWith("created blog post");
  });

  it("ska uppdatera blogginlägg när formData är giltig (edit)", async () => {
    vi.spyOn(validateModule, "validateBlogPostFormData").mockReturnValue(true);

    const updateOne = vi.fn().mockResolvedValue({ acknowledged: true });
    (collections as any).blogPosts = { updateOne };

    const req: any = {
      body: {
        blogId: "507f1f77bcf86cd799439011", // giltig ObjectId-sträng
        blogTitle: "Ny titel",
        blogText: "Ny text",
        submitType: "edit",
      },
    };
    const res: any = { status: vi.fn().mockReturnThis(), send: vi.fn() };

    await dashboard(req, res);

    expect(updateOne).toHaveBeenCalled();
    expect(res.send).toHaveBeenCalledWith("updated to db");
  });

  it("ska ta bort blogginlägg när formData är giltig (delete)", async () => {
    vi.spyOn(validateModule, "validateBlogPostFormData").mockReturnValue(true);

    const deleteOne = vi.fn().mockResolvedValue({ acknowledged: true });
    (collections as any).blogPosts = { deleteOne };

    const req: any = {
      body: {
        blogId: "507f1f77bcf86cd799439011", // giltig ObjectId-sträng
        submitType: "delete",
      },
    };
    const res: any = { status: vi.fn().mockReturnThis(), send: vi.fn() };

    await dashboard(req, res);

    expect(deleteOne).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith("deleted blog post");
  });
});
