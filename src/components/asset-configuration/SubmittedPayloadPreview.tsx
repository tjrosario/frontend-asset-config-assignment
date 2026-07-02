import { Paper } from "@mui/material";

import type { AssetPayload } from "../../domain/assetTypes";

interface SubmittedPayloadPreviewProps {
  payload: AssetPayload;
}

export function SubmittedPayloadPreview({
  payload,
}: SubmittedPayloadPreviewProps): React.JSX.Element {
  return (
    // Render the typed payload as formatted JSON so submissions are easy to inspect during review.
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
      {JSON.stringify(payload, null, 2)}
    </Paper>
  );
}
