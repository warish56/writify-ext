import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import svgr from 'vite-plugin-svgr'

const cssToJS = () => {
  let css = ''
  return {
    name: 'css-to-js',
    apply: 'build',
    enforce: 'post',
    generateBundle(_, bundle) {
      // Collect all CSS
      Object.entries(bundle).forEach(([fileName, chunk]) => {
        if (fileName.endsWith('.css')) {
          if ('source' in chunk) {
            css += chunk.source
            // Remove the CSS chunk since we'll include it in JS
            delete bundle[fileName]
          }
        }
      })

      // Create a new JS chunk with the CSS
      bundle['style.js'] = {
        fileName: 'style.js',
        type: 'chunk',
        code: `const AppStyles = ${JSON.stringify(css)};`,
        moduleSideEffects: false,
      }
    }
  }
}

export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        icon: true,
      },
      include: "**/*.svg?react",
    }),
    cssToJS()
  ],
  css: {
    modules: {
      localsConvention: 'camelCase',
      scopeBehavior: 'local',
    }
  },
  define: {
    'process.env': {
      'NODE_ENV': 'production',
    }
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/main.tsx'),
      name: 'WriteAI',
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
    outDir: 'dist',
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  }
}) 