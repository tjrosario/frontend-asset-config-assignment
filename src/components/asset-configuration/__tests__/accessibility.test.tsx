import { axe } from "jest-axe";
import { describe, expect, it, vi } from "vitest";

import {
  AssetType,
  type SectionPayload,
  type TransformerPayload,
} from "../../../domain/assetTypes";
import { renderWithProviders } from "../../../test/renderWithProviders";
import { AssetConfigurationForm } from "../AssetConfigurationForm";
import { SectionConfigurationForm } from "../SectionConfigurationForm";
import { TransformerConfigurationForm } from "../TransformerConfigurationForm";

describe("component accessibility", () => {
  it("has no axe violations for the transformer form", async () => {
    const onSubmit = vi.fn<(payload: TransformerPayload) => void>();
    const { container } = renderWithProviders(<TransformerConfigurationForm onSubmit={onSubmit} />);

    // Axe catches structural regressions that interaction-focused tests can miss.
    expect((await axe(container)).violations).toHaveLength(0);
  });

  it("has no axe violations for the section form", async () => {
    const onSubmit = vi.fn<(payload: SectionPayload) => void>();
    const { container } = renderWithProviders(<SectionConfigurationForm onSubmit={onSubmit} />);

    // Keep the alternate supported form under the same accessibility guard.
    expect((await axe(container)).violations).toHaveLength(0);
  });

  it("has no axe violations for the unsupported asset state", async () => {
    const { container } = renderWithProviders(
      <AssetConfigurationForm assetType={AssetType.Breaker} />,
    );

    // The unsupported fallback is user-facing, so it should meet the same baseline.
    expect((await axe(container)).violations).toHaveLength(0);
  });
});
