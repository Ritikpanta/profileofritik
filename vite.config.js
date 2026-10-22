// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    hmr: { overlay: true }, // show runtime errors instead of a blank screen
  },
  build: {
    // three.js lives in its own lazy chunk (the 3D hero), so a large chunk is expected
    chunkSizeWarningLimit: 1000,
  },
});
