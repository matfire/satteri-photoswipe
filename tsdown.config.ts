import { defineConfig } from "tsdown";

export default defineConfig({
  dts: true,
  exports: true,
  deps: {
    onlyBundle: ["@types/unist", "@types/hast"],
  },
});
