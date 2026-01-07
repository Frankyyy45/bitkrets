import { describe, it, expect, vi } from "vitest";
import { dashboard } from "../../../src/backend/controllers/dashboardController";
import * as validateModule from "../../../src/utils/validate";


describe("dashboard controller", () => {
  it("ska returnera 400 när formData är ogiltig", async () => {
    // 1. mocka valideringsfunktionen så att den returnerar false
    vi.spyOn(validateModule, "validateBlogPostFormData").mockReturnValue(false);

    // 2. fejk request- och response-objekt
    const req: any = { body: {} };

    // här mockar vi res så att vi kan kolla vad som skickas
    const res: any = {
      status: vi.fn().mockReturnThis(),
      send: vi.fn(),
    };

    // 3. anropa controller-funktionen
    await dashboard(req, res);

    // 4. förväntningar → TDD
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith("Invalid form data!");
  });
});

