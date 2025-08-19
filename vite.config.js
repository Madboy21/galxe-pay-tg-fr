import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// DEV only proxy (optional). Set your local backend if you run locally.
// For production, frontend will call VITE_API_BASE directly.
const DEV_BACKEND = "http://localhost:3000"; // change if you run backend locally

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: DEV_BACKEND,
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/api/, "")
      }
    }
  }
});
