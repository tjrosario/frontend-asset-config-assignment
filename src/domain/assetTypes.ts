// These string values double as the UI options and the discriminants for typed form payloads.
export enum AssetType {
  Breaker = "BREAKER",
  Section = "SECTION",
  Transformer = "TRANSFORMER",
}

export enum CoolingType {
  Onaf = "ONAF",
  Onan = "ONAN",
}

export interface TransformerPayload {
  assetType: AssetType.Transformer;
  coolingType: CoolingType;
  kvaRating: number;
}

export interface SectionPayload {
  assetType: AssetType.Section;
  conductorType: string;
  groundedNeutral: boolean;
}
