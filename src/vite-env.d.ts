/// <reference types="vite/client" />

// Minimal module declarations for vite-imagetools query imports
declare module "*?*as=meta*" {
  const meta: {
    src: string;
    width: number;
    height: number;
    format?: string;
  };
  export default meta;
}

declare module "*?*as=srcset*" {
  const srcset: string;
  export default srcset;
}


