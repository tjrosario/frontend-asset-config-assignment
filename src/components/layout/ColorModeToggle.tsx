import { Box, FormControlLabel, Switch } from "@mui/material";

import { useColorMode } from "../../theme/ColorModeProvider";

export function ColorModeToggle(): React.JSX.Element {
  const { mode, toggleColorMode } = useColorMode();

  return (
    // Keep the theme preference separate from the page heading so layout remains full-width.
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
  );
}
