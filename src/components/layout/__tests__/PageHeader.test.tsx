import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { renderWithProviders } from "../../../test/renderWithProviders";
import { PageHeader } from "../PageHeader";

describe("PageHeader", () => {
  it("renders the page title and supporting copy", () => {
    renderWithProviders(<PageHeader />);

    // The heading gives the page a stable accessible name for users and tests.
    expect(
      screen.getByRole("heading", { name: /dynamic asset configuration/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/select an asset type to render the matching validated configuration form/i),
    ).toBeInTheDocument();
  });
});
