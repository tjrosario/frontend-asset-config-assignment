import { useState } from "react";
import {
  Box,
  Container,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Switch,
  Typography,
} from "@mui/material";

import { AssetConfigurationForm } from "../components/AssetConfigurationForm";
import { AssetType, type SectionPayload, type TransformerPayload } from "../domain/assetTypes";
import { useColorMode } from "../theme/ColorModeProvider";

const assetTypeOptions = [AssetType.Breaker, AssetType.Section, AssetType.Transformer];

export function AssetConfigurationPage(): React.JSX.Element {
  const [assetType, setAssetType] = useState<AssetType>(AssetType.Transformer);
  const [submittedPayload, setSubmittedPayload] = useState<
    TransformerPayload | SectionPayload | null
  >(null);
  const { mode, toggleColorMode } = useColorMode();

  return (
    <Container maxWidth="sm" sx={{ pb: { md: 8, xs: 4 }, pt: { md: 4, xs: 2.5 } }}>
      <Stack spacing={3.5}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <FormControlLabel
            control={
              <Switch
                checked={mode === "dark"}
                onChange={toggleColorMode}
                slotProps={{ input: { "aria-label": "Use dark theme" } }}
              />
            }
            label="Dark"
            sx={{ flexShrink: 0, ml: 0 }}
          />
        </Box>

        <Box>
          <Typography
            color="primary.dark"
            component="h1"
            sx={{ fontSize: { sm: "2rem", xs: "1.625rem" } }}
            variant="h4"
          >
            Dynamic Asset Configuration
          </Typography>
          <Typography color="text.secondary" sx={{ mt: 1 }}>
            Select an asset type to render the matching validated configuration form.
          </Typography>
        </Box>

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

        {submittedPayload && (
          <Paper
            component="pre"
            sx={{
              backgroundColor: "#0f2438",
              color: "#e6f1fb",
              m: 0,
              overflowX: "auto",
              p: 2,
            }}
          >
            {JSON.stringify(submittedPayload, null, 2)}
          </Paper>
        )}
      </Stack>
    </Container>
  );
}
