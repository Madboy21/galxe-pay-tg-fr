import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
    rollupOptions: {
      input: "./index.html"  // ensures index.html is the entry
    }
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000", // local backend
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/api/, "")
      }
    }
  }
});
