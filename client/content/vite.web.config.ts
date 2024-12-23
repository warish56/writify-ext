import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
  base: '/content/dist/web',
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        icon: true,
      },
      include: "**/*.svg?react",
    }),
  ],
  css: {
    modules: {
      localsConvention: 'camelCase',
      scopeBehavior: 'local',
    }
  },
  define: {
    'process.env.NODE_ENV': `"${process.env.NODE_ENV}"`,
  },
  build: {
    rollupOptions: {
      input: resolve(__dirname, 'web/login/index.html'),
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: 'chunks/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash][extname]'
      }
    },
    outDir: 'dist/web',
    emptyOutDir: true,
    sourcemap: false,
    target: 'es2015', 
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  }
}) 