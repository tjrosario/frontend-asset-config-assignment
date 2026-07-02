import { BrowserRouter, useRoutes } from "react-router-dom";

import { appRoutes } from "./routes/appRoutes";
import { RouteMetadata } from "./routes/RouteMetadata";

function AppRoutes(): React.JSX.Element | null {
  return useRoutes(appRoutes);
}

export function App(): React.JSX.Element {
  return (
    <BrowserRouter>
      <RouteMetadata />
      <AppRoutes />
    </BrowserRouter>
  );
}
