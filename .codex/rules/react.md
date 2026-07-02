# React And TypeScript Rules

## Strict TypeScript

- Keep `strict` TypeScript enabled.
- Do not use `any`.
- Define explicit TypeScript interfaces for form payloads.
- Model payloads as discriminated unions using `assetType`.
- Type `onSubmit` so the payload is selected by the active `assetType`.
- Keep Zod schemas aligned with payload interfaces through compile-time checks or equivalent type-safe structure.
- Ensure submissions include only fields for the active asset type.

## Form And Validation

- Define Zod schemas per supported asset type.
- Select the active schema from the `assetType` prop.
- Integrate schemas through `zodResolver`.
- Use `z.coerce.number()` for numeric text inputs that must submit as numbers.
- Use MUI error states consistently: `error`, `helperText`, and accessible labels.
- Reset, remount, or reinitialize form state when `assetType` changes so stale fields cannot leak into the next payload.
- Use `Controller` only where MUI integration needs it.

## Performance

- Define schemas at module scope, or memoize schema selection if a factory is needed.
- Avoid creating new resolver/schema objects on every render unless needed.
- Prefer React Hook Form's low-rerender model.
- Avoid broad React state updates for individual field changes.
- Avoid unnecessary dependencies or abstractions for this small assignment.
