import { defineConfig } from "vite";
import { qwikVite } from "@builder.io/qwik/optimizer";
import { qwikCity } from "@builder.io/qwik-city/vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(() => {
  return {
    plugins: [
        qwikCity(),
        qwikVite(),
        tsconfigPaths()
    ],
    preview: {
      headers: {
        "Cache-Control": "public, max-age=600",
      },
    },
    ssr: {
      noExternal: [
        "@qwik-city-plan",
        "@builder.io/qwik-city",
        "@builder.io/qwik",
        "@qwikest/icons",
        "@qwikest/icons/lucide",
        "@qwikest/icons/heroicons",
        "@qwikest/icons/heroicons/solid",
        "@qwikest/icons/heroicons/outline",
        "@qwikest/icons/heroicons/mini",
        "@qwikest/icons/material-symbols",
        "@qwikest/icons/material-symbols/rounded",
        "@qwikest/icons/material-symbols/two-tone",
      ]
    }
  };
});
