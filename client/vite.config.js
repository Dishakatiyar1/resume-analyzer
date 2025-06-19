import { defineConfig } from "vite";
import envCompatible from "vite-plugin-env-compatible";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [envCompatible(), tailwindcss()],
});
