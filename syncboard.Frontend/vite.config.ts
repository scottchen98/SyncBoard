import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const ASPNETCORE_API_URL = "http://127.0.0.1:5222";

export default defineConfig({
  server: {
    proxy: {
      "/api": ASPNETCORE_API_URL,
      "/r": {
        target: ASPNETCORE_API_URL,
        ws: true,
      },
    },
  },
  plugins: [react()],
});
