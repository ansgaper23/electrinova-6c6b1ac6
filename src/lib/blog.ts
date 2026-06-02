export type BlogBlock =
  | { type: "heading"; text: string }
  | { type: "subheading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "quote"; text: string; cite?: string }
  | { type: "image"; url: string; alt?: string; caption?: string }
  | { type: "html"; html: string };

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  excerpt: string | null;
  cover_image: string | null;
  cover_image_alt: string | null;
  content: BlogBlock[];
  meta_title: string | null;
  meta_description: string | null;
  keywords: string[] | null;
  category: string | null;
  author: string;
  published: boolean;
  published_at: string | null;
  reading_time: number | null;
  created_at: string;
  updated_at: string;
}

export function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "")
    .slice(0, 80);
}

export function htmlToPlainText(html: string): string {
  if (typeof document === "undefined") return html.replace(/<[^>]+>/g, " ");
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  }[c] as string));
}

export function blocksToHtml(blocks: BlogBlock[] = []): string {
  return blocks
    .map((b) => {
      switch (b.type) {
        case "html": return b.html;
        case "heading": return `<h2>${escapeHtml(b.text)}</h2>`;
        case "subheading": return `<h3>${escapeHtml(b.text)}</h3>`;
        case "paragraph":
          return b.text
            .split(/\n{2,}/)
            .map((p) => `<p>${escapeHtml(p).replace(/\n/g, "<br/>")}</p>`)
            .join("");
        case "list":
          return `<ul>${b.items.filter(Boolean).map((i) => `<li>${escapeHtml(i)}</li>`).join("")}</ul>`;
        case "quote":
          return `<blockquote><p>${escapeHtml(b.text)}</p>${b.cite ? `<footer>— ${escapeHtml(b.cite)}</footer>` : ""}</blockquote>`;
        case "image":
          return b.url ? `<figure><img src="${b.url}" alt="${escapeHtml(b.alt || "")}"/>${b.caption ? `<figcaption>${escapeHtml(b.caption)}</figcaption>` : ""}</figure>` : "";
        default: return "";
      }
    })
    .join("\n");
}

export function estimateReadingTime(blocks: BlogBlock[]): number {
  const text = blocks
    .map((b) => {
      if (b.type === "html") return htmlToPlainText(b.html);
      if ("text" in b) return b.text;
      if (b.type === "list") return b.items.join(" ");
      return "";
    })
    .join(" ");
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export function formatDate(iso: string | null) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("es-PE", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

/**
 * Appends Supabase image transformation parameters to optimize loading.
 * Requires the project to have image transformations enabled.
 */
export function getOptimizedImageUrl(url: string | null, options: { width?: number; quality?: number } = {}) {
  if (!url) return "";
  // Check if it's a Supabase storage URL
  if (url.includes("storage.googleapis.com") || url.includes("supabase.co")) {
    const { width = 1200, quality = 80 } = options;
    const separator = url.includes("?") ? "&" : "?";
    // We use a common format that many CDNs (including Supabase if enabled) might pick up
    // but primarily we optimize for standard web performance.
    return `${url}${separator}width=${width}&quality=${quality}&format=webp`;
  }
  return url;
}
