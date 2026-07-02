# Testing Rules

Use Vitest with React Testing Library.

Follow the assignment's test-driven intent: every form change should be covered by tests that first prove invalid inputs show the expected validation feedback, then prove valid inputs call `onSubmit` with the exact typed payload for the selected `assetType`.

## Test Requirements

- Use the `jsdom` test environment.
- Test user-visible behavior rather than implementation details.
- Prefer `@testing-library/user-event` for interactions.
- Test invalid inputs and visible validation messages for each supported asset form.
- Test valid submissions and exact payload shape for each supported asset form.
- Type submit mocks as payload callbacks, such as `vi.fn<(payload: TransformerPayload) => void>()`.
- Assert enum-backed payload values with the domain enums instead of raw string literals.
- Assert `onSubmit` is not called when validation fails.
- Do not use `any` in test payloads, mock callback signatures, or helper data.

## Test File Layout

- Place component specs in a `__tests__` folder inside the component folder.
- Keep implementation files at the component folder root.
- Use imports from `__tests__` back to the component, such as `../AssetConfigurationForm`.

## Required Coverage

- Invalid transformer `kvaRating` shows a positive-number validation error.
- Missing transformer `coolingType` shows a select validation error.
- Valid transformer submission calls `onSubmit` with `assetType`, `coolingType`, and a numeric `kvaRating`.
- Invalid section `conductorType` shows a minimum-length validation error.
- Valid section submission calls `onSubmit` with `assetType`, `conductorType`, and `groundedNeutral`.
- Switching asset types does not submit stale fields from the previous asset type.
- Unsupported `BREAKER` state does not invent fields.

## Verification

Run these before considering the assignment complete:

```bash
npm run lint
npm run fmt:check
npm run typecheck
npm run test:run
npm run test:coverage
npm run build
```
