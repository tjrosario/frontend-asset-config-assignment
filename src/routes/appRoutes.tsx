import type { RouteObject } from "react-router-dom";

import { AssetConfigurationPage } from "../pages/AssetConfigurationPage";

export interface RouteMeta {
  canonicalPath: string;
  description: string;
  title: string;
}

export interface AppRouteObject extends Omit<RouteObject, "children" | "handle"> {
  children?: AppRouteObject[];
  handle: {
    meta: RouteMeta;
  };
}

export const appRoutes = [
  {
    element: <AssetConfigurationPage />,
    handle: {
      meta: {
        canonicalPath: "/",
        description:
          "Configure transformer and section assets with strict TypeScript payloads and validated React forms.",
        title: "Dynamic Asset Configuration",
      },
    },
    path: "/",
  },
] satisfies AppRouteObject[];
