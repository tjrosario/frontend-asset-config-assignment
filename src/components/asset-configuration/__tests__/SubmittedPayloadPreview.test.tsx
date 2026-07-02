import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { type AssetPayload, AssetType, CoolingType } from "../../../domain/assetTypes";
import { renderWithProviders } from "../../../test/renderWithProviders";
import { SubmittedPayloadPreview } from "../SubmittedPayloadPreview";

describe("SubmittedPayloadPreview", () => {
  it("renders a formatted asset payload", () => {
    const payload: AssetPayload = {
      assetType: AssetType.Transformer,
      coolingType: CoolingType.Onan,
      kvaRating: 500,
    };

    renderWithProviders(<SubmittedPayloadPreview payload={payload} />);

    // The preview should expose the exact typed payload the form submitted.
    expect(screen.getByText(/"assetType": "TRANSFORMER"/)).toBeInTheDocument();
    expect(screen.getByText(/"coolingType": "ONAN"/)).toBeInTheDocument();
    expect(screen.getByText(/"kvaRating": 500/)).toBeInTheDocument();
  });
});
