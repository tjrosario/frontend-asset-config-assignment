# Architecture Notes

This app is intentionally small, but the folders separate concerns the same way a larger asset-management
frontend would.

## Domain Rules

`src/domain` contains the asset vocabulary and validation rules:

- `assetTypes.ts` defines the supported asset discriminants and submit payload shapes.
- `assetSchemas.ts` defines the runtime validation rules for each supported payload.

Keeping these rules outside the form components makes the UI easier to change without rewriting the asset
model. It also lets tests exercise the validation layer directly.

## Dynamic Forms

`AssetConfigurationForm` is the public switching component. It accepts an `assetType` prop and delegates to
the concrete form for that type.

Each concrete form owns its own React Hook Form instance. The rendered form is keyed by asset type so React
throws away stale field state when the user switches from one asset shape to another.

## Unsupported Assets

`BREAKER` is represented explicitly, but no breaker fields were provided in the assignment. The app renders a
clear unsupported state instead of inventing fields or silently submitting an incomplete payload.

## Validation Boundary

Zod is the boundary between browser input and typed payloads. For example, `kvaRating` starts as a browser
input string, then the transformer schema coerces it to a number before `onSubmit` receives the payload.

## Theme Boundary

`ColorModeProvider` owns Material UI theme creation and persisted light/dark mode state. Pages can consume the
toggle behavior without knowing how the MUI theme object is built.

## Testing Strategy

The test suite covers the form behavior from two angles:

- Component tests verify user-visible validation errors and submitted payloads.
- Schema tests verify the validation and coercion rules without the UI.

Accessibility tests use `jest-axe` to keep the supported and unsupported form states under the same baseline.
