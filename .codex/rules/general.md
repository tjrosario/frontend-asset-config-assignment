# General Rules

This project is a frontend take-home assignment based on `frontend_interview_assignment.pdf`.

## Project Context

- Use Vite, React, and strict TypeScript.
- Use React Hook Form for form state.
- Use Zod for runtime validation.
- Use Material UI for form controls and validation presentation.
- Use Vitest and React Testing Library for tests.
- Keep the implementation focused on the assignment prompt.

## Supported Asset Types

- `TRANSFORMER`
  - `kvaRating`: positive number.
  - `coolingType`: select with `ONAN` and `ONAF`.
- `SECTION`
  - `groundedNeutral`: boolean switch or checkbox.
  - `conductorType`: string with a minimum length of 3.
- `BREAKER` is mentioned as an example, but no fields are specified. Do not invent breaker fields. Prefer an explicit unsupported state unless requirements are expanded.

## Review Priorities

- Correctness and type safety are more important than visual embellishment.
- Keep the UI clean, accessible, and easy to scan.
- Keep abstractions small and justified.
- Include clear run instructions for development, typecheck, tests, and build.
