import type { RenderOptions, RenderResult } from "@testing-library/react";
import { render } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";

import { ColorModeProvider } from "../theme/ColorModeProvider";

interface RenderWithProvidersOptions extends Omit<RenderOptions, "wrapper"> {
  helmetContext?: object;
}

export function renderWithProviders(
  ui: React.ReactElement,
  { helmetContext = {}, ...options }: RenderWithProvidersOptions = {},
): RenderResult {
  // Tests render through the same app-level providers so MUI and Helmet behave like they do in App.
  return render(
    <HelmetProvider context={helmetContext}>
      <ColorModeProvider>{ui}</ColorModeProvider>
    </HelmetProvider>,
    options,
  );
}
