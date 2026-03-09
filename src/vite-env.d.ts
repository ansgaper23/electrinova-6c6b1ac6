/// <reference types="vite/client" />

// TypeScript module declarations for imagetools query imports

// Meta output (width/height)
declare module "*?as=meta" {
  const meta: { src: string; width: number; height: number; format?: string };
  export default meta;
}

declare module "*?*as=meta" {
  const meta: { src: string; width: number; height: number; format?: string };
  export default meta;
}

declare module "*?*as=meta*" {
  const meta: { src: string; width: number; height: number; format?: string };
  export default meta;
}

// Srcset output (string)
declare module "*?*as=srcset" {
  const srcset: string;
  export default srcset;
}

declare module "*?*as=srcset*" {
  const srcset: string;
  export default srcset;
}

declare module "*&as=srcset" {
  const srcset: string;
  export default srcset;
}

declare module "*&as=srcset*" {
  const srcset: string;
  export default srcset;
}


