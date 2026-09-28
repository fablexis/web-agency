import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://fablexis.github.io",
  base: "/web-agency",
  server: { port: 4321, host: true },
});
