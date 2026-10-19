import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "node:path";

export default defineConfig({
  base: "./", // funciona no GitHub Pages
  plugins: [tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        index: resolve(import.meta.dirname, "index.html"),
        cambio: resolve(import.meta.dirname, "cambio.html"),
        emprestimos: resolve(import.meta.dirname, "emprestimos.html"),
        // adicione dashboard e login aqui quando tiverem conteúdo
      },
    },
  },
});