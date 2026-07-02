import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    coverage: {
      exclude: [
        "src/**/__tests__/**",
        "src/test/**",
        "src/App.tsx",
        "src/main.tsx",
        "src/**/*.d.ts",
      ],
      include: ["src/components/**/*.{ts,tsx}", "src/domain/assetSchemas.ts"],
      provider: "istanbul",
      reporter: ["text", "text-summary", "html", "lcov"],
      thresholds: {
        branches: 100,
        functions: 100,
        lines: 100,
        statements: 100,
      },
    },
    environment: "jsdom",
    fileParallelism: false,
    globals: true,
    setupFiles: "./src/test/setup.ts",
    testTimeout: 10000,
  },
});
