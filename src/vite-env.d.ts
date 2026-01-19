/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PORT?: string
  readonly NODE_ENV?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
