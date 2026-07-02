import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { AssetType, type SectionPayload } from "../../domain/assetTypes";
import { SectionConfigurationForm } from "../SectionConfigurationForm";

describe("SectionConfigurationForm", () => {
  it("shows validation errors for invalid section input", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn<(payload: SectionPayload) => void>();

    render(<SectionConfigurationForm onSubmit={onSubmit} />);

    await user.type(screen.getByLabelText(/conductor type/i), "AB");
    await user.click(screen.getByRole("button", { name: /save configuration/i }));

    // Short conductor names should fail validation and block submission.
    expect(await screen.findByText(/at least 3 characters/i)).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("submits a typed section payload for valid input", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn<(payload: SectionPayload) => void>();

    render(<SectionConfigurationForm onSubmit={onSubmit} />);

    await user.click(screen.getByLabelText(/grounded neutral/i));
    await user.type(screen.getByLabelText(/conductor type/i), "Copper");
    await user.click(screen.getByRole("button", { name: /save configuration/i }));

    // The switch state should be reflected as a boolean in the submitted payload.
    expect(onSubmit).toHaveBeenCalledWith(
      {
        assetType: AssetType.Section,
        conductorType: "Copper",
        groundedNeutral: true,
      },
      expect.anything(),
    );
  });
});
