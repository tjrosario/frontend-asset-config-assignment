import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import type { z } from "zod";

import { transformerSchema } from "../../domain/assetSchemas";
import { AssetType, CoolingType, type TransformerPayload } from "../../domain/assetTypes";

interface TransformerConfigurationFormProps {
  onSubmit: (payload: TransformerPayload) => void;
}

export function TransformerConfigurationForm({
  onSubmit,
}: TransformerConfigurationFormProps): React.JSX.Element {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<z.input<typeof transformerSchema>, unknown, TransformerPayload>({
    defaultValues: {
      assetType: AssetType.Transformer,
      coolingType: undefined,
      kvaRating: 0,
    },
    mode: "onSubmit",
    resolver: zodResolver(transformerSchema),
  });

  return (
    <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <Typography component="h2" variant="h6">
          Transformer Configuration
        </Typography>

        <Controller
          control={control}
          name="kvaRating"
          render={({ field }) => (
            <TextField
              {...field}
              error={Boolean(errors.kvaRating)}
              fullWidth
              helperText={errors.kvaRating?.message}
              label="KVA Rating"
              slotProps={{ htmlInput: { min: 0, step: 1 } }}
              type="number"
            />
          )}
        />

        <Controller
          control={control}
          name="coolingType"
          render={({ field }) => (
            <FormControl error={Boolean(errors.coolingType)} fullWidth>
              <InputLabel id="cooling-type-label">Cooling Type</InputLabel>
              <Select
                {...field}
                label="Cooling Type"
                labelId="cooling-type-label"
                // MUI Select wants a concrete value before the user has selected one.
                value={field.value ?? ""}
              >
                <MenuItem value={CoolingType.Onan}>{CoolingType.Onan}</MenuItem>
                <MenuItem value={CoolingType.Onaf}>{CoolingType.Onaf}</MenuItem>
              </Select>
              <FormHelperText>{errors.coolingType?.message}</FormHelperText>
            </FormControl>
          )}
        />

        <Button type="submit" variant="contained">
          Save Configuration
        </Button>
      </Stack>
    </Box>
  );
}
