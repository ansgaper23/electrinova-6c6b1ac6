import { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import { Link, useParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/seo/SEO";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowLeft, User } from "lucide-react";
import type { BlogPost, BlogBlock } from "@/lib/blog";
import { formatDate } from "@/lib/blog";

function Block({ b, isFirstParagraph }: { b: BlogBlock; isFirstParagraph?: boolean }) {
  switch (b.type) {
    case "heading":
      return (
        <h2 className="text-2xl md:text-3xl font-display font-bold mt-12 mb-4 text-foreground scroll-mt-24">
          {b.text}
        </h2>
      );
    case "subheading":
      return (
        <h3 className="text-xl md:text-2xl font-display font-semibold mt-8 mb-3 text-foreground">
          {b.text}
        </h3>
      );
    case "paragraph":
      return (
        <p
          className={`text-[1.075rem] md:text-lg leading-[1.8] mb-5 whitespace-pre-wrap text-foreground/90 ${
            isFirstParagraph ? "first-letter:text-5xl first-letter:font-display first-letter:font-bold first-letter:float-left first-letter:mr-2 first-letter:leading-[0.9] first-letter:text-primary" : ""
          }`}
        >
          {b.text}
        </p>
      );
    case "list":
      return (
        <ul className="list-disc pl-6 space-y-2 mb-6 text-[1.05rem] leading-relaxed text-foreground/90 marker:text-primary">
          {b.items.filter(Boolean).map((it, i) => <li key={i}>{it}</li>)}
        </ul>
      );
    case "quote":
      return (
        <blockquote className="border-l-4 border-primary bg-primary/5 pl-5 pr-4 py-4 my-8 rounded-r-lg">
          <p className="italic text-lg md:text-xl text-foreground/90">{b.text}</p>
          {b.cite && <footer className="text-sm not-italic text-muted-foreground mt-2">— {b.cite}</footer>}
        </blockquote>
      );
    case "image":
      return b.url ? (
        <figure className="my-10">
          <img
            src={b.url}
            alt={b.alt || ""}
            loading="lazy"
            className="w-full rounded-xl shadow-md aspect-video object-cover"
          />
          {b.caption && (
            <figcaption className="text-sm text-muted-foreground text-center mt-3 italic">
              {b.caption}
            </figcaption>
          )}
        </figure>
      ) : null;
    default:
      return null;
  }
}

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [related, setRelated] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { data } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug!)
        .eq("published", true)
        .maybeSingle();
      if (!data) { setNotFound(true); setLoading(false); return; }
      setPost(data as any);
      const { data: rel } = await supabase
        .from("blog_posts")
        .select("id, slug, title, cover_image, cover_image_alt, published_at")
        .eq("published", true)
        .neq("id", data.id)
        .order("published_at", { ascending: false })
        .limit(3);
      setRelated(rel || []);
      setLoading(false);
    })();
  }, [slug]);

  if (loading) return <Layout><div className="min-h-[60vh]" /></Layout>;
  if (notFound || !post) return (
    <Layout>
      <section className="section-padding pt-32 text-center">
        <h1 className="text-3xl font-bold mb-4">Artículo no encontrado</h1>
        <Link to="/blog"><Button variant="outline">Volver al blog</Button></Link>
      </section>
    </Layout>
  );

  const url = `https://electrinovaperu.com/blog/${post.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.meta_description || post.excerpt,
    image: post.cover_image ? [post.cover_image] : undefined,
    datePublished: post.published_at,
    dateModified: post.updated_at,
    author: { "@type": "Organization", name: post.author },
    publisher: {
      "@type": "Organization",
      name: "Electrinova Perú",
      logo: { "@type": "ImageObject", url: "https://electrinovaperu.com/logo-electrinova.png" },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    keywords: post.keywords?.join(", "),
  };

  return (
    <Layout>
      <SEO
        title={post.meta_title || `${post.title} | Electrinova Perú`}
        description={post.meta_description || post.excerpt || post.title}
        path={`/blog/${post.slug}`}
        ogImage={post.cover_image || undefined}
        jsonLd={jsonLd}
      />
      <article>
        <header className="pt-32 pb-8 gradient-hero">
          <div className="container-custom max-w-4xl">
            <Link to="/blog" className="text-primary-foreground/80 hover:text-primary-foreground inline-flex items-center gap-2 mb-4 text-sm">
              <ArrowLeft className="h-4 w-4" />Volver al blog
            </Link>
            {post.category && <Badge variant="secondary" className="mb-3">{post.category}</Badge>}
            <h1 className="text-3xl md:text-5xl font-display font-bold text-primary-foreground leading-tight">{post.title}</h1>
            {post.subtitle && <p className="mt-3 text-lg md:text-xl text-primary-foreground/80">{post.subtitle}</p>}
            <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-primary-foreground/80">
              <span className="flex items-center gap-1"><User className="h-4 w-4" />{post.author}</span>
              <span className="flex items-center gap-1"><Calendar className="h-4 w-4" />{formatDate(post.published_at)}</span>
              {post.reading_time && <span className="flex items-center gap-1"><Clock className="h-4 w-4" />{post.reading_time} min de lectura</span>}
            </div>
          </div>
        </header>

        {post.cover_image && (
          <div className="container-custom max-w-4xl -mt-6">
            <img src={post.cover_image} alt={post.cover_image_alt || post.title} className="w-full rounded-lg shadow-lg aspect-video object-cover" />
          </div>
        )}

        <div className="container-custom max-w-3xl py-12">
          {post.excerpt && (
            <p className="text-xl leading-relaxed text-muted-foreground border-l-4 border-primary pl-5 mb-10 font-light">
              {post.excerpt}
            </p>
          )}
          {(() => {
            let firstParagraphSeen = false;
            return post.content.map((b, i) => {
              const isFirst = b.type === "paragraph" && !firstParagraphSeen;
              if (isFirst) firstParagraphSeen = true;
              return <Block key={i} b={b} isFirstParagraph={isFirst} />;
            });
          })()}

          {post.keywords && post.keywords.length > 0 && (
            <div className="mt-12 pt-6 border-t flex flex-wrap gap-2">
              {post.keywords.map((k) => (
                <Badge key={k} variant="outline" className="text-xs">#{k}</Badge>
              ))}
            </div>
          )}

          <div className="mt-12 p-8 bg-gradient-to-br from-primary to-primary/80 rounded-xl text-center text-primary-foreground shadow-lg">
            <h3 className="text-2xl font-display font-bold mb-2">¿Necesitas asesoría eléctrica profesional?</h3>
            <p className="text-primary-foreground/90 mb-5">Cotiza tu proyecto con Electrinova Perú sin compromiso.</p>
            <Link to="/contacto"><Button size="lg" variant="secondary">Solicitar cotización</Button></Link>
          </div>
        </div>

        {related.length > 0 && (
          <section className="bg-muted/30 py-12">
            <div className="container-custom max-w-5xl">
              <h2 className="text-2xl font-bold mb-6">Artículos relacionados</h2>
              <div className="grid md:grid-cols-3 gap-4">
                {related.map((r) => (
                  <Link key={r.id} to={`/blog/${r.slug}`} className="group">
                    {r.cover_image && <img src={r.cover_image} alt={r.cover_image_alt || r.title} className="w-full aspect-video object-cover rounded-lg mb-3" loading="lazy" />}
                    <h3 className="font-semibold group-hover:text-primary transition-colors">{r.title}</h3>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </article>
    </Layout>
  );
}
