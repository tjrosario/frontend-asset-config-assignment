import { render, waitFor } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";

import { appRoutes } from "../appRoutes";
import { RouteMetadata } from "../RouteMetadata";

describe("RouteMetadata", () => {
  it("renders title, description, and canonical metadata for the current route", async () => {
    const homeMeta = appRoutes[0].handle.meta;

    // MemoryRouter lets the metadata component resolve route state without mounting the whole app.
    render(
      <HelmetProvider>
        <MemoryRouter initialEntries={[homeMeta.canonicalPath]}>
          <RouteMetadata />
        </MemoryRouter>
      </HelmetProvider>,
    );

    // Helmet applies document updates asynchronously, so wait for the title first.
    await waitFor(() => expect(document.title).toBe(homeMeta.title));
    expect(document.querySelector("meta[name='description']")).toHaveAttribute(
      "content",
      homeMeta.description,
    );
    expect(document.querySelector("link[rel='canonical']")).toHaveAttribute(
      "href",
      homeMeta.canonicalPath,
    );
  });
});
