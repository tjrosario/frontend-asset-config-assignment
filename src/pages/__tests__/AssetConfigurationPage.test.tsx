import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { renderWithProviders } from "../../test/renderWithProviders";
import { AssetConfigurationPage } from "../AssetConfigurationPage";

describe("AssetConfigurationPage", () => {
  it("composes the layout controls, header, and asset form", () => {
    renderWithProviders(<AssetConfigurationPage />);

    // Page-level coverage ensures the extracted layout pieces are still wired together.
    expect(screen.getByRole("switch", { name: /use dark theme/i })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /dynamic asset configuration/i }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/asset type/i)).toBeInTheDocument();
  });
});
