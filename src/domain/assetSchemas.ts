import { z } from "zod";

import { AssetType, CoolingType } from "./assetTypes";

export const coolingTypeSchema = z.enum(CoolingType, {
  error: "Select a cooling type",
});

export const transformerSchema = z.object({
  assetType: z.literal(AssetType.Transformer),
  coolingType: coolingTypeSchema,
  // Browser number inputs still emit strings; coerce here so consumers receive a typed payload.
  kvaRating: z.coerce
    .number({ error: "KVA rating is required" })
    .positive("KVA rating must be a positive number"),
});

export const sectionSchema = z.object({
  assetType: z.literal(AssetType.Section),
  // Trim before validating so accidental surrounding spaces do not count as meaningful input.
  conductorType: z.string().trim().min(3, "Conductor type must be at least 3 characters"),
  groundedNeutral: z.boolean(),
});
