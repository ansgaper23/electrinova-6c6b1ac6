import { describe, expect, it } from "vitest";
import { localZones } from "./local-zones";
import { companyInfo } from "./company-info";

describe("Local service coverage", () => {
  it("includes Lurín within Lima service coverage", () => {
    expect(companyInfo.areaServed).toContain("Lurín");
    const zone = localZones.find((item) => item.slug === "lurin");
    expect(zone?.districts).toContain("Lurín");
    expect(zone?.region).toBe("Lima Sur");
  });

  it("preserves Lima and the southern coverage areas", () => {
    expect(companyInfo.areaServed).toEqual(expect.arrayContaining([
      "Lima", "Callao", "Cañete", "San Vicente de Cañete", "Chincha", "Pisco", "Sur Chico"
    ]));
  });
});