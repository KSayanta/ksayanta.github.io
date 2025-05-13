import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  base: "/app/",
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        "chef-claude": resolve(__dirname, "chef-claude/index.html"),
        "meme-generator": resolve(__dirname, "meme-generator/index.html"),
        tenzies: resolve(__dirname, "tenzies/index.html"),
      },
    },
  },
});
