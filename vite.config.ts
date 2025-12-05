import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import path from "path";
import { fileURLToPath } from "url";
import { componentTagger } from "lovable-tagger";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react({
      babel: {
        plugins: [
          [
            "babel-plugin-styled-components",
            {
              displayName: true,
              fileName: false,
            },
          ],
        ],
      },
    }),
    svgr({
      svgrOptions: {
        icon: true,
        exportType: "default",
      },
    }),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),

  define: {
    "process.env": process.env,
  },

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@ui": path.resolve(__dirname, "./src/ui"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@styles": path.resolve(__dirname, "./src/styles"),
      "@db": path.resolve(__dirname, "./src/db"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@layout": path.resolve(__dirname, "./src/layout"),
      "@fonts": path.resolve(__dirname, "./src/fonts"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@widgets": path.resolve(__dirname, "./src/widgets"),
      "@contexts": path.resolve(__dirname, "./src/contexts"),
      "@constants": path.resolve(__dirname, "./src/constants"),
      "@features": path.resolve(__dirname, "./src/features"),
    },
  },

  build: {
    target: "es2015",
    outDir: "dist",
    sourcemap: mode === "development",
    minify: mode === "production" ? "esbuild" : false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
        },
      },
    },
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  
  optimizeDeps: {
    include: ['styled-components', '@mui/material', '@mui/styled-engine-sc'],
  },

  server: {
    host: "::",
    port: 8080,
    strictPort: false,
    open: false,
    cors: true,
  },

  preview: {
    host: "::",
    port: 4173,
    strictPort: false,
    open: false,
  },
}));