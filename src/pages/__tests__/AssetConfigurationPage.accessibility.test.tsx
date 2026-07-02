import { axe } from "jest-axe";
import { describe, expect, it } from "vitest";

import { renderWithProviders } from "../../test/renderWithProviders";
import { AssetConfigurationPage } from "../AssetConfigurationPage";

describe("AssetConfigurationPage accessibility", () => {
  it("has no axe violations", async () => {
    const { container } = renderWithProviders(<AssetConfigurationPage />);

    // Run the full page through providers to exercise the same rendered tree users receive.
    expect((await axe(container)).violations).toHaveLength(0);
  });
});
