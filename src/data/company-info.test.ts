import { describe, expect, it } from "vitest";
import { companyInfo } from "./company-info";

describe("Official business identity", () => {
  it("uses the official company legal name", () => {
    expect(companyInfo.legalName).toBe("ELECTRINOVA PERÚ S.A.C.");
  });
});