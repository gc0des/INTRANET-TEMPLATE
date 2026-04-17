import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  esbuild: {
    drop: ["console", "debugger"],
    legalComments: "none",
  },
  build: {
    sourcemap: false,
    minify: "esbuild",
    cssMinify: true,
    target: "es2020",
  },
});
