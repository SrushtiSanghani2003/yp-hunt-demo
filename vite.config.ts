import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          // CSS mate fixed name
          if (assetInfo.name?.endsWith(".css")) {
            return "assets/index.css";
          }

          // baki assets default j rahese
          return "assets/[name]-[hash][extname]";
        },
      },
    },
  },
});
