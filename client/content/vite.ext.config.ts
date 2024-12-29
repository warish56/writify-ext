import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import svgr from 'vite-plugin-svgr'


export default defineConfig({
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
    // Replace process.env with only the allowed environment variables
    'process.env.NODE_ENV': `"${process.env.NODE_ENV}"`,
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/main.tsx'),
      name: 'AIMagicText',
      fileName: 'content',
      formats: ['es'],
    },
    rollupOptions: {
      output: {
        entryFileNames: `[name].js`,
        chunkFileNames: `[name].js`,
        assetFileNames: `[name].[ext]`
      }
    },
    outDir: 'dist/ext',
    emptyOutDir: true,
    sourcemap: true,
    
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  }
}) 