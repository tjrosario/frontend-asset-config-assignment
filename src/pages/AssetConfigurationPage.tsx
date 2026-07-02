import { useState } from "react";
import { Container, FormControl, InputLabel, MenuItem, Paper, Select, Stack } from "@mui/material";

import { AssetConfigurationForm } from "../components/asset-configuration/AssetConfigurationForm";
import { SubmittedPayloadPreview } from "../components/asset-configuration/SubmittedPayloadPreview";
import { ColorModeToggle } from "../components/layout/ColorModeToggle";
import { PageHeader } from "../components/layout/PageHeader";
import { type AssetPayload, AssetType } from "../domain/assetTypes";

const assetTypeOptions = [AssetType.Breaker, AssetType.Section, AssetType.Transformer];

export function AssetConfigurationPage(): React.JSX.Element {
  const [assetType, setAssetType] = useState<AssetType>(AssetType.Transformer);
  const [submittedPayload, setSubmittedPayload] = useState<AssetPayload | null>(null);

  return (
    <Container maxWidth="sm" sx={{ pb: { md: 8, xs: 4 }, pt: { md: 4, xs: 2.5 } }}>
      <Stack spacing={3.5}>
        <ColorModeToggle />

        <PageHeader />

        <FormControl fullWidth>
          <InputLabel id="asset-type-label">Asset Type</InputLabel>
          <Select
            label="Asset Type"
            labelId="asset-type-label"
            onChange={(event) => {
              setAssetType(event.target.value as AssetType);
              // Keep the preview aligned with the currently visible form.
              setSubmittedPayload(null);
            }}
            value={assetType}
          >
            {assetTypeOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Paper sx={{ p: { sm: 3.5, xs: 2.5 } }}>
          {assetType === AssetType.Transformer && (
            <AssetConfigurationForm
              assetType={AssetType.Transformer}
              onSubmit={setSubmittedPayload}
            />
          )}
          {assetType === AssetType.Section && (
            <AssetConfigurationForm assetType={AssetType.Section} onSubmit={setSubmittedPayload} />
          )}
          {assetType === AssetType.Breaker && (
            <AssetConfigurationForm assetType={AssetType.Breaker} />
          )}
        </Paper>

        {submittedPayload && <SubmittedPayloadPreview payload={submittedPayload} />}
      </Stack>
    </Container>
  );
}
