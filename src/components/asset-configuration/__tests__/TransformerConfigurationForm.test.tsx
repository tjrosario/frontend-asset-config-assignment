import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { AssetType, CoolingType, type TransformerPayload } from "../../../domain/assetTypes";
import { TransformerConfigurationForm } from "../TransformerConfigurationForm";

describe("TransformerConfigurationForm", () => {
  it("shows validation errors for invalid transformer input", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn<(payload: TransformerPayload) => void>();

    render(<TransformerConfigurationForm onSubmit={onSubmit} />);

    await user.clear(screen.getByLabelText(/kva rating/i));
    await user.type(screen.getByLabelText(/kva rating/i), "-10");
    await user.click(screen.getByRole("button", { name: /save configuration/i }));

    // Invalid input should surface both field errors and keep the submit callback quiet.
    expect(await screen.findByText(/positive number/i)).toBeInTheDocument();
    expect(screen.getByText(/select a cooling type/i)).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("submits a typed transformer payload for valid input", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn<(payload: TransformerPayload) => void>();

    render(<TransformerConfigurationForm onSubmit={onSubmit} />);

    await user.clear(screen.getByLabelText(/kva rating/i));
    await user.type(screen.getByLabelText(/kva rating/i), "500");
    await user.click(screen.getByLabelText(/cooling type/i));
    await user.click(screen.getByRole("option", { name: CoolingType.Onan }));
    await user.click(screen.getByRole("button", { name: /save configuration/i }));

    // The schema should coerce the numeric input before the payload leaves the form.
    expect(onSubmit).toHaveBeenCalledWith(
      {
        assetType: AssetType.Transformer,
        coolingType: CoolingType.Onan,
        kvaRating: 500,
      },
      expect.anything(),
    );
  });
});
