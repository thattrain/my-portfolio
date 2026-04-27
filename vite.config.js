import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import blogMarkdown from "./src/plugins/vite-plugin-blog-markdown";

// https://vite.dev/config/
export default defineConfig({
  base: '/my-portfolio/',
  plugins: [blogMarkdown(), react(), tailwindcss()],
});
