import { describe, expect, it } from "vitest";

import { sectionSchema, transformerSchema } from "../assetSchemas";
import { AssetType, CoolingType } from "../assetTypes";

describe("assetSchemas", () => {
  it("coerces and validates transformer payloads", () => {
    const result = transformerSchema.safeParse({
      assetType: AssetType.Transformer,
      coolingType: CoolingType.Onan,
      kvaRating: "500",
    });

    expect(result.success).toBe(true);

    if (!result.success) {
      throw result.error;
    }

    // Number inputs arrive as strings, so the schema should own the coercion boundary.
    expect(result.data).toEqual({
      assetType: AssetType.Transformer,
      coolingType: CoolingType.Onan,
      kvaRating: 500,
    });
  });

  it("rejects transformer payloads with non-positive ratings", () => {
    const result = transformerSchema.safeParse({
      assetType: AssetType.Transformer,
      coolingType: CoolingType.Onaf,
      kvaRating: 0,
    });

    expect(result.success).toBe(false);

    if (result.success) {
      throw new Error("Expected transformer payload validation to fail");
    }

    // Keep the domain-level error aligned with the message shown by the form.
    expect(result.error.issues[0]?.message).toBe("KVA rating must be a positive number");
  });

  it("trims and validates section payloads", () => {
    const result = sectionSchema.safeParse({
      assetType: AssetType.Section,
      conductorType: " Copper ",
      groundedNeutral: true,
    });

    expect(result.success).toBe(true);

    if (!result.success) {
      throw result.error;
    }

    // Surrounding whitespace should not make it into the typed submit payload.
    expect(result.data).toEqual({
      assetType: AssetType.Section,
      conductorType: "Copper",
      groundedNeutral: true,
    });
  });

  it("rejects section payloads with short conductor types", () => {
    const result = sectionSchema.safeParse({
      assetType: AssetType.Section,
      conductorType: "AB",
      groundedNeutral: false,
    });

    expect(result.success).toBe(false);

    if (result.success) {
      throw new Error("Expected section payload validation to fail");
    }

    // This mirrors the UI validation while proving the rule exists outside the component.
    expect(result.error.issues[0]?.message).toBe("Conductor type must be at least 3 characters");
  });
});
