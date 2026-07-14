import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./src/setupTests.ts"],
    globals: true,
    css: false,
    coverage: {
      reporter: ["text", "lcov"],
      exclude: ["node_modules/", "src/setupTests.ts", "src/routeTree.gen.ts"],
    },
  },
});
