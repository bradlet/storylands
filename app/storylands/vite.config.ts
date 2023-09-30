import { defineConfig } from "vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import svgr from "vite-plugin-svgr";
import react from "@vitejs/plugin-react";

export default defineConfig({
	plugins: [react(), nodePolyfills(), svgr()],
	css: {
		modules: {
			localsConvention: "camelCaseOnly",
		},
	},
});
