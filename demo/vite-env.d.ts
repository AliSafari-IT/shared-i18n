/// <reference types="vite/client" />

declare module 'vite/client' {
  interface ImportMetaEnv {
    readonly BASE_URL: string
    readonly VITE_IDENTITY_API_URL?: string
  }
}