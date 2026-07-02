import { Alert } from "@mui/material";

import { AssetType, type SectionPayload, type TransformerPayload } from "../domain/assetTypes";

import { SectionConfigurationForm } from "./SectionConfigurationForm";
import { TransformerConfigurationForm } from "./TransformerConfigurationForm";

interface TransformerFormProps {
  assetType: AssetType.Transformer;
  onSubmit: (payload: TransformerPayload) => void;
}

interface SectionFormProps {
  assetType: AssetType.Section;
  onSubmit: (payload: SectionPayload) => void;
}

interface UnsupportedFormProps {
  assetType: AssetType.Breaker;
  onSubmit?: never;
}

export function AssetConfigurationForm(
  props: TransformerFormProps | SectionFormProps | UnsupportedFormProps,
): React.JSX.Element {
  if (props.assetType === AssetType.Transformer) {
    // Key each concrete form by asset type so React discards old field state when the type changes.
    return <TransformerConfigurationForm key={props.assetType} onSubmit={props.onSubmit} />;
  }

  if (props.assetType === AssetType.Section) {
    // Keep each asset form isolated so one payload shape cannot leak into another.
    return <SectionConfigurationForm key={props.assetType} onSubmit={props.onSubmit} />;
  }

  return (
    <Alert component="output" severity="info">
      Configuration fields are not defined for {props.assetType}.
    </Alert>
  );
}
