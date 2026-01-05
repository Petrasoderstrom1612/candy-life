interface ViteTypeOptions {
  strictImportMetaEnv: unknown;
}

interface ImportMetaEnv {
  readonly VITE_API_BASEURL: string;
  // add more env variables here:
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}