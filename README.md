# Frontend Asset Configuration Assignment

Dynamic React form for configuring electrical assets. The app renders a validated form based on the selected
`assetType` and returns a strictly typed payload for supported assets.

## Stack

- React 19 with TypeScript
- Vite for local development, preview, and production builds
- React Router for app routing
- React Hook Form for form state
- Zod for schema validation
- `@hookform/resolvers` to connect Zod with React Hook Form
- Material UI with Emotion for UI components and styling
- Persisted Material UI light/dark color mode
- Vitest, React Testing Library, Testing Library user-event, and jest-axe for tests
- Istanbul coverage through `@vitest/coverage-istanbul`
- Oxfmt for formatting
- Oxlint and ESLint for linting
- `eslint-plugin-simple-import-sort` for import/export ordering
- Lefthook for Git hooks
- Commitlint with the conventional commit config

## Requirements Covered

- `TRANSFORMER` renders `kvaRating` and `coolingType`.
- `SECTION` renders `groundedNeutral` and `conductorType`.
- `BREAKER` is intentionally shown as unsupported because the assignment mentions it as an example but does
  not define fields for it.
- The exported form uses typed props so `onSubmit` receives the payload shape for the active `assetType`.
- Zod schemas validate positive transformer ratings, required cooling type, and minimum section conductor
  length.
- Tests cover invalid input, valid submit payloads, asset switching behavior, unsupported assets, and
  accessibility.
- A persisted light/dark theme switcher demonstrates centralized Material UI theming.

## Project Structure

```text
docs/
  architecture.md                   Architecture and implementation notes.
  frontend_interview_assignment.pdf Original assignment prompt.
src/
  components/
    asset-configuration/ Feature components and tests for asset forms.
    layout/              Shared page framing controls.
  domain/                Asset enums, payload interfaces, and Zod schemas.
  pages/                 Page-level composition for the assignment UI.
  routes/                Route definitions and metadata management.
  test/                  Shared test setup and provider-aware render helper.
  theme/                 Material UI theme configuration.
```

Additional architecture notes live in `docs/architecture.md`.

## Local Setup

Install dependencies:

```bash
npm install
```

Start the Vite dev server:

```bash
npm run dev
```

Build and preview the production bundle:

```bash
npm run build
npm run preview
```

## Scripts

| Script                  | Purpose                                                  |
| ----------------------- | -------------------------------------------------------- |
| `npm run dev`           | Starts the local Vite dev server.                        |
| `npm run build`         | Runs TypeScript project checking, then builds with Vite. |
| `npm run preview`       | Serves the production build locally.                     |
| `npm run lint`          | Runs Oxlint and ESLint against the project.              |
| `npm run lint:fix`      | Applies available Oxlint and ESLint fixes.               |
| `npm run fmt`           | Formats files with Oxfmt.                                |
| `npm run fmt:check`     | Checks formatting with Oxfmt without writing changes.    |
| `npm run typecheck`     | Runs `tsc -b` for strict TypeScript checking.            |
| `npm run test`          | Starts Vitest in watch mode.                             |
| `npm run test:run`      | Runs the Vitest suite once.                              |
| `npm run test:coverage` | Runs Vitest with Istanbul coverage.                      |

## Quality Checks

Run the full local verification set before handing off changes:

```bash
npm run fmt:check
npm run lint
npm run typecheck
npm run test:run
npm run test:coverage
npm run build
```

Coverage is configured in `vitest.config.ts` with 100% thresholds for statements, branches, functions, and
lines across the covered component and schema files.

## Formatting

Formatting is handled by Oxfmt.

- Config: `.oxfmtrc.json`
- Check command: `npm run fmt:check`
- Write command: `npm run fmt`

## Linting

Linting is split between Oxlint and ESLint.

- Oxlint provides fast correctness, suspicious-code, React, accessibility, import, promise, and Vitest linting.
- ESLint is used for TypeScript-aware parsing and import/export sorting through
  `eslint-plugin-simple-import-sort`.
- Config files: `.oxlintrc.json` and `eslint.config.js`
- Main command: `npm run lint`
- Fix command: `npm run lint:fix`

## Testing

Tests use Vitest with the `jsdom` environment.

- Component tests use React Testing Library.
- Interaction tests use `@testing-library/user-event`.
- Accessibility checks use `jest-axe`.
- Layout component tests cover the page header and color-mode toggle.
- Schema tests exercise the Zod validation layer directly.
- Route metadata tests verify document title, description, and canonical tags.
- Shared providers are supplied by `src/test/renderWithProviders.tsx`.
- Global jest-dom matchers are loaded from `src/test/setup.ts`.

Coverage output includes text, text-summary, HTML, and lcov reports.

## Git Hooks

This project uses Lefthook. The hook definitions live in `lefthook.yml`, which is committed so every developer
gets the same checks after hooks are installed.

Hooks are installed by the `postinstall` script when the folder is inside a Git repository:

```bash
npm install
```

You can also install them manually:

```bash
npm exec lefthook -- install
```

### `pre-commit`

Runs on staged files before a commit is created:

- `npm exec oxfmt -- {staged_files}` and re-stages formatting fixes
- `npm exec oxlint -- --fix {staged_files}` and re-stages safe lint fixes
- `npm exec eslint -- --fix {staged_files}` and re-stages import sorting fixes

### `commit-msg`

Validates the commit message with Commitlint:

```bash
npm exec commitlint -- --edit {1}
```

Commit messages must follow the conventional commit format, for example:

```bash
feat: add dynamic asset configuration form
fix: preserve section switch payload
test: cover transformer validation
docs: expand project setup guide
```

### `pre-push`

Runs the full push gate:

```bash
npm run typecheck
npm run test:run
npm run test:coverage
npm run build
```

Both `test:run` and `test:coverage` run before push by design. `test:coverage` also executes the tests, but
keeping both commands makes the push gate explicit.

## Git Notes

Generated folders are ignored:

- `node_modules`
- `dist`
- `coverage`
- `*.tsbuildinfo`

The `.git/hooks` files themselves are local-only and are not committed. Lefthook recreates them from
`lefthook.yml`.
