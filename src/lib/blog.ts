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
