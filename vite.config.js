import { defineConfig, loadEnv } from "vite";
import { fileURLToPath, URL } from "node:url";
import vue from "@vitejs/plugin-vue";
import { quasar, transformAssetUrls } from "@quasar/vite-plugin";
import UnoCSS from "unocss/vite";

import pkg from "./package.json";

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  const { VITE_FWB_BASE_URL } = process.env;

  return defineConfig({
    base: VITE_FWB_BASE_URL,
    server: {
      port: 9006,
      cors: true,
      origin: `http://localhost:9006`,
    },
    plugins: [
      vue({
        template: { transformAssetUrls },
      }),
      quasar({
        sassVariables: "src/quasar-variables.sass",
      }),
      UnoCSS(),
    ],
    resolve: {
      alias: [
        {
          find: "@",
          replacement: fileURLToPath(new URL("./src", import.meta.url)),
        },
      ],
    },
    build: {
      outDir: "output",
      rollupOptions: {
        output: {
          assetFileNames: (assetInfo) => {
            // console.log(assetInfo)
            let extType = assetInfo.name.split(".").at(1);
            if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
              extType = "img";
            }
            return `assets/${extType}/[name]-[hash][extname]`;
          },

          chunkFileNames: (chunkInfo) => {
            return `assets/js/[name]-[hash].js`;
          },

          entryFileNames: (chunkInfo) => {
            return `assets/js/[name]-[hash].js`;
          },
        },
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "src/styles/global.scss";`,
        },
      },
    },
    define: {
      "process.env": {},
    },
  });
};
