import { Helmet } from "react-helmet-async";
import { matchRoutes, useLocation } from "react-router-dom";

import { type AppRouteObject, appRoutes, type RouteMeta } from "./appRoutes";

function getRouteMeta(pathname: string): RouteMeta | undefined {
  const matches = matchRoutes(appRoutes, pathname);

  if (!matches) {
    return undefined;
  }

  for (const match of [...matches].reverse()) {
    const route = match.route as AppRouteObject;

    if (route.handle.meta) {
      return route.handle.meta;
    }
  }

  return undefined;
}

export function RouteMetadata(): React.JSX.Element | null {
  const { pathname } = useLocation();
  const meta = getRouteMeta(pathname);

  if (!meta) {
    return null;
  }

  return (
    <Helmet>
      <title>{meta.title}</title>
      <meta content={meta.description} name="description" />
      <link href={meta.canonicalPath} rel="canonical" />
    </Helmet>
  );
}
