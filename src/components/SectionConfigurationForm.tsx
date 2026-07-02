import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, FormControlLabel, Stack, Switch, TextField, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import type { z } from "zod";

import { sectionSchema } from "../domain/assetSchemas";
import { AssetType, type SectionPayload } from "../domain/assetTypes";

interface SectionConfigurationFormProps {
  onSubmit: (payload: SectionPayload) => void;
}

export function SectionConfigurationForm({
  onSubmit,
}: SectionConfigurationFormProps): React.JSX.Element {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<z.input<typeof sectionSchema>, unknown, SectionPayload>({
    defaultValues: {
      assetType: AssetType.Section,
      conductorType: "",
      groundedNeutral: false,
    },
    mode: "onSubmit",
    resolver: zodResolver(sectionSchema),
  });

  return (
    <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <Typography component="h2" variant="h6">
          Section Configuration
        </Typography>

        <Controller
          control={control}
          name="groundedNeutral"
          render={({ field }) => (
            <FormControlLabel
              control={
                <Switch
                  checked={field.value}
                  onBlur={field.onBlur}
                  // Switch exposes checked separately, so pass the boolean through directly.
                  onChange={(_, checked) => field.onChange(checked)}
                  slotProps={{ input: { ref: field.ref } }}
                />
              }
              label="Grounded Neutral"
            />
          )}
        />

        <Controller
          control={control}
          name="conductorType"
          render={({ field }) => (
            <TextField
              {...field}
              error={Boolean(errors.conductorType)}
              fullWidth
              helperText={errors.conductorType?.message}
              label="Conductor Type"
            />
          )}
        />

        <Button type="submit" variant="contained">
          Save Configuration
        </Button>
      </Stack>
    </Box>
  );
}
