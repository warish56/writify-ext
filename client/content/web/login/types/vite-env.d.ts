/// <reference types="vite-plugin-svgr/client" />

/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_URL: string
    // more env variables...
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }
