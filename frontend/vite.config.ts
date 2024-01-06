import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
const PUBLIC_URL = process.env.PUBLIC_URL;
// https://vitejs.dev/config/

export default defineConfig({
  base: `${PUBLIC_URL}/`,
  server: {
    host: "0.0.0.0",
    port: 3000
  },
  define: {
    "process.env": process.env
  },
  plugins: [react()],
  build: {
    outDir: "build",
    sourcemap: true
  },

  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "src/setupTests",
    mockReset: true
  }
});
