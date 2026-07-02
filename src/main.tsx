import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";

import { ColorModeProvider } from "./theme/ColorModeProvider";
import { App } from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>
      <ColorModeProvider>
        <App />
      </ColorModeProvider>
    </HelmetProvider>
  </StrictMode>,
);
