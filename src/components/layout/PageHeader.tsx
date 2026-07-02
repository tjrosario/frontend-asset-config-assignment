import { Box, Typography } from "@mui/material";

export function PageHeader(): React.JSX.Element {
  return (
    <Box>
      {/* The smaller mobile size prevents the long assignment title from crowding the viewport. */}
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
  );
}
