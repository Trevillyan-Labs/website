import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

// Resolve the "@/..." path alias (tsconfig paths) for tests without an extra dep.
export default defineConfig({
  resolve: {
    alias: { "@": fileURLToPath(new URL(".", import.meta.url)) },
  },
  test: {
    environment: "node",
    include: ["lib/**/*.test.ts"],
  },
});
