import { Helmet } from "react-helmet-async";

const SITE_NAME = "ELECTRINOVA PERÚ";
const DEFAULT_OG_IMAGE = "/og-electrinova.png";

type JsonLd = Record<string, unknown> | Array<Record<string, unknown>>;

export type SEOProps = {
  title: string;
  description: string;
  /** Path starting with / (e.g. /proyectos). Use / for home. */
  path: string;
  ogImage?: string;
  ogType?: "website" | "article";
  noindex?: boolean;
  jsonLd?: JsonLd;
};

function useAbsoluteUrl() {
  const origin = typeof window !== "undefined" ? window.location.origin : "https://electrinovaperu.com";
  
  return (pathOrUrl: string) => {
    if (!pathOrUrl) return origin;
    if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
    const cleanPath = pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`;
    return `${origin}${cleanPath}`;
  };
}

export function SEO({ title, description, path, ogImage, ogType = "website", noindex, jsonLd }: SEOProps) {
  const toAbsoluteUrl = useAbsoluteUrl();
  const canonical = toAbsoluteUrl(path);
  const image = toAbsoluteUrl(ogImage || DEFAULT_OG_IMAGE);

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      {noindex && <meta name="robots" content="noindex, follow" />}

      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="es_PE" />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Helmet>
  );
}
