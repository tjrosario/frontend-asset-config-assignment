import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import {
  AssetType,
  type SectionPayload,
  type TransformerPayload,
} from "../../../domain/assetTypes";
import { AssetConfigurationForm } from "../AssetConfigurationForm";

describe("AssetConfigurationForm", () => {
  it("does not submit stale transformer fields after switching to section", async () => {
    const onTransformerSubmit = vi.fn<(payload: TransformerPayload) => void>();
    const onSectionSubmit = vi.fn<(payload: SectionPayload) => void>();
    const { rerender } = render(
      <AssetConfigurationForm assetType={AssetType.Transformer} onSubmit={onTransformerSubmit} />,
    );

    expect(screen.getByLabelText(/kva rating/i)).toBeInTheDocument();

    // Simulate the parent swapping asset types without unmounting the wrapper component.
    rerender(<AssetConfigurationForm assetType={AssetType.Section} onSubmit={onSectionSubmit} />);

    fireEvent.change(screen.getByLabelText(/conductor type/i), { target: { value: "Steel" } });
    fireEvent.click(screen.getByRole("button", { name: /save configuration/i }));

    // The new section form should own submission after the switch.
    expect(onTransformerSubmit).not.toHaveBeenCalled();
    await waitFor(() =>
      expect(onSectionSubmit).toHaveBeenCalledWith(
        {
          assetType: AssetType.Section,
          conductorType: "Steel",
          groundedNeutral: false,
        },
        expect.anything(),
      ),
    );
  });

  it("renders an unsupported state for breaker without inventing fields", () => {
    render(<AssetConfigurationForm assetType={AssetType.Breaker} />);

    // Breaker is intentionally unsupported instead of silently rendering a partial form.
    expect(
      screen.getByText(/configuration fields are not defined for breaker/i),
    ).toBeInTheDocument();
  });
});
