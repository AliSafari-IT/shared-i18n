/// <reference types="vite/client" />

declare module '*.json' {
  const value: any;
  export default value;
}

declare module '@asafarim/shared-i18n' {
  export function useTranslation(ns?: string): { t: (key: string) => string };
}