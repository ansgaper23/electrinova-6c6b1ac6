import * as React from "react";

export type ResponsiveImageProps = Omit<
  React.ImgHTMLAttributes<HTMLImageElement>,
  "src" | "srcSet" | "width" | "height"
> & {
  src: string;
  width: number;
  height: number;
  /** Preferred modern formats */
  srcSetAvif?: string;
  srcSetWebp?: string;
  /**
   * The `sizes` attribute for responsive images.
   * Example: "(min-width: 1024px) 33vw, 100vw"
   */
  sizes?: string;
  /** Optional className for the wrapping <picture> */
  pictureClassName?: string;
};

export function ResponsiveImage({
  src,
  srcSetAvif,
  srcSetWebp,
  sizes,
  width,
  height,
  alt,
  loading = "lazy",
  decoding = "async",
  pictureClassName,
  ...imgProps
}: ResponsiveImageProps) {
  return (
    <picture className={["block", pictureClassName].filter(Boolean).join(" ")}> 
      {srcSetAvif && (
        <source type="image/avif" srcSet={srcSetAvif} sizes={sizes} />
      )}
      {srcSetWebp && (
        <source type="image/webp" srcSet={srcSetWebp} sizes={sizes} />
      )}
      <img
        src={src}
        width={width}
        height={height}
        alt={alt}
        loading={loading}
        decoding={decoding}
        {...imgProps}
      />
    </picture>
  );
}
