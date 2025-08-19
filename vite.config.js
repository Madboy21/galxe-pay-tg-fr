import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  root: ".", // frontend folder root
  plugins: [react()],
  build: {
    outDir: "dist", // Vercel এর জন্য dist folder
    rollupOptions: {
      input: "/index.html"
    }
  }
});
