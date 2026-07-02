import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { renderWithProviders } from "../../test/renderWithProviders";
import { AssetConfigurationPage } from "../AssetConfigurationPage";

describe("AssetConfigurationPage", () => {
  beforeEach(() => {
    // Start every color-mode test from the default light preference.
    window.localStorage.clear();
  });

  afterEach(() => {
    // Avoid leaking the persisted theme choice into later provider-based tests.
    window.localStorage.clear();
  });

  it("toggles and persists the color mode", async () => {
    const user = userEvent.setup();

    renderWithProviders(<AssetConfigurationPage />);

    const colorModeSwitch = screen.getByRole("switch", { name: /use dark theme/i });

    expect(colorModeSwitch).not.toBeChecked();

    // Persisting the choice keeps the demo feeling like a real application preference.
    await user.click(colorModeSwitch);

    expect(colorModeSwitch).toBeChecked();
    expect(window.localStorage.getItem("asset-config-color-mode")).toBe("dark");
  });
});
