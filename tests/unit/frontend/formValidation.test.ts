
import { describe, it, expect } from "vitest";
import { validateFrontendForm } from "../../../src/frontend/validateFrontendForm";

describe("Frontend form validation", () => {
    it ("ska returnera false om titel är tom", () => {
        const result = validateFrontendForm("", "Någon text");
        expect (result).toBe(false);
    })
    
    it("ska returnera false om text är tom", () => {
    const result = validateFrontendForm("En titel", "");
    expect(result).toBe(false);
  });

  it("ska returnera true om både titel och text är ifyllda", () => {
    const result = validateFrontendForm("En titel", "Någon text");
    expect(result).toBe(true);
    
})
})