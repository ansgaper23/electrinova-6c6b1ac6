import { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import { Link, useParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/seo/SEO";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar, Clock, ArrowLeft, ArrowRight, User, Tag } from "lucide-react";
import { trackEvent } from "@/components/analytics/Analytics";
import type { BlogPost, BlogBlock } from "@/lib/blog";
import { formatDate, getOptimizedImageUrl } from "@/lib/blog";


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
            src={getOptimizedImageUrl(b.url, { width: 1000 })}
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
    case "html":
      return (
        <div
          className="prose prose-lg max-w-none
            prose-headings:font-display prose-headings:text-foreground
            prose-h2:text-2xl md:prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-4
            prose-h3:text-xl md:prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-3
            prose-p:text-[1.075rem] md:prose-p:text-lg prose-p:leading-[1.8] prose-p:text-foreground/90 prose-p:mb-5
            prose-a:text-primary hover:prose-a:underline
            prose-strong:text-foreground
            prose-ul:my-5 prose-ol:my-5 prose-li:my-1 prose-li:text-foreground/90 marker:text-primary
            prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-primary/5
            prose-blockquote:not-italic prose-blockquote:py-3 prose-blockquote:px-5 prose-blockquote:rounded-r-lg
            prose-img:rounded-xl prose-img:shadow-md prose-img:my-8
            prose-figure:my-10 prose-figcaption:text-center prose-figcaption:italic"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(b.html) }}
        />
      );
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
      
      // Track view_item event for the blog post
      trackEvent('view_item', {
        items: [{
          item_id: data.id,
          item_name: data.title,
          item_category: data.category,
          item_list_name: 'Blog'
        }]
      });
    })();

  }, [slug]);

  if (loading) return (
    <Layout>
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-pulse text-primary font-display font-bold text-xl">Electrinova</div>
      </div>
    </Layout>
  );

  if (notFound || !post) return (
    <Layout>
      <section className="section-padding pt-32 text-center">
        <h1 className="text-3xl font-bold mb-4">Artículo no encontrado</h1>
        <Link to="/blog"><Button variant="outline">Volver al blog</Button></Link>
      </section>
    </Layout>
  );

  const url = `/blog/${post.slug}`;
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
      logo: { "@type": "ImageObject", url: "/logo-electrinova.png" },
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
        ogType="article"
        jsonLd={jsonLd}
      />
      <article>
        <header className="pt-40 pb-20 gradient-hero relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
          </div>
          <div className="container-custom max-w-4xl relative z-10">
            <Link to="/blog" className="text-primary-foreground/80 hover:text-accent inline-flex items-center gap-2 mb-8 text-sm font-medium transition-colors group">
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />Volver al listado de artículos
            </Link>
            <div className="flex flex-wrap items-center gap-3 mb-6 animate-fade-in-up">
              {post.category && <Badge className="bg-accent text-accent-foreground hover:bg-accent/90 px-3 py-1 border-none font-bold uppercase tracking-wider text-[10px]">{post.category}</Badge>}
              <span className="text-primary-foreground/60 text-xs font-medium uppercase tracking-widest flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" /> {post.reading_time || 5} min de lectura
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-primary-foreground leading-[1.1] tracking-tight animate-fade-in-up [animation-delay:100ms] mb-8">
              {post.title}
            </h1>
            {post.subtitle && <p className="text-xl md:text-2xl text-primary-foreground/80 font-light leading-relaxed animate-fade-in-up [animation-delay:200ms] mb-10 max-w-3xl border-l-2 border-accent/30 pl-6">{post.subtitle}</p>}
            <div className="flex flex-wrap items-center gap-8 text-sm text-primary-foreground/70 animate-fade-in-up [animation-delay:300ms] py-6 border-t border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center border border-accent/30">
                  <User className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="text-xs text-primary-foreground/50 uppercase tracking-widest font-bold">Escrito por</p>
                  <p className="text-primary-foreground font-semibold">{post.author || "Electrinova Perú"}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                  <Calendar className="h-5 w-5 text-primary-foreground/60" />
                </div>
                <div>
                  <p className="text-xs text-primary-foreground/50 uppercase tracking-widest font-bold">Publicado el</p>
                  <p className="text-primary-foreground font-semibold">{formatDate(post.published_at)}</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {post.cover_image && (
          <div className="container-custom max-w-5xl -mt-16 relative z-20 px-4 sm:px-6 lg:px-8 animate-fade-in-up [animation-delay:400ms]">
            <div className="rounded-3xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] overflow-hidden border-8 border-background bg-background">
              <img 
                src={getOptimizedImageUrl(post.cover_image, { width: 1400 })} 
                alt={post.cover_image_alt || post.title} 
                className="w-full aspect-[21/9] object-cover hover:scale-[1.02] transition-transform duration-1000" 
              />
            </div>
          </div>
        )}

        <div className="container-custom max-w-3xl py-16 md:py-24">
          {post.excerpt && (
            <div className="mb-16">
              <p className="text-2xl md:text-3xl leading-relaxed text-foreground/70 font-display italic">
                "{post.excerpt}"
              </p>
            </div>
          )}
          
          <div className="article-content">
            {(() => {
              let firstParagraphSeen = false;
              return post.content.map((b, i) => {
                const isFirst = b.type === "paragraph" && !firstParagraphSeen;
                if (isFirst) firstParagraphSeen = true;
                return <Block key={i} b={b} isFirstParagraph={isFirst} />;
              });
            })()}
          </div>

          {post.keywords && post.keywords.length > 0 && (
            <div className="mt-20 pt-10 border-t flex flex-wrap gap-3">
              <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground w-full mb-2 flex items-center gap-2">
                <Tag className="h-3 w-3" /> Etiquetas del artículo
              </span>
              {post.keywords.map((k) => (
                <Badge key={k} variant="secondary" className="px-4 py-1.5 text-xs font-medium bg-muted/50 hover:bg-primary hover:text-white transition-colors cursor-default border-none rounded-full">
                  {k}
                </Badge>
              ))}
            </div>
          )}

          <div className="mt-20 p-10 md:p-16 bg-gradient-to-br from-primary via-primary/95 to-primary/90 rounded-[2.5rem] text-center text-primary-foreground shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-[80px] -mr-32 -mt-32 transition-transform duration-700 group-hover:scale-110" />
            <div className="relative z-10">
              <Badge className="bg-accent text-accent-foreground mb-6">ASESORÍA ESPECIALIZADA</Badge>
              <h3 className="text-3xl md:text-5xl font-display font-bold mb-6 leading-tight">¿Tienes un proyecto <span className="text-accent italic">eléctrico</span> en mente?</h3>
              <p className="text-primary-foreground/80 mb-10 text-lg md:text-xl max-w-xl mx-auto font-light leading-relaxed">
                Nuestro equipo de ingenieros está listo para brindarte la mejor solución técnica bajo los más altos estándares de seguridad.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/contacto">
                  <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold px-10 py-7 text-lg rounded-full shadow-lg hover:shadow-accent/20 transition-all">
                    Solicitar cotización gratis
                  </Button>
                </Link>
                <a href="https://wa.me/519XXXXXXXX" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 px-10 py-7 text-lg rounded-full">
                    Consultar por WhatsApp
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <section className="bg-muted/30 py-24 border-t">
            <div className="container-custom max-w-6xl">
              <div className="flex items-end justify-between mb-12">
                <div>
                  <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Sigue <span className="text-primary">leyendo</span></h2>
                  <p className="text-muted-foreground text-lg">Artículos que podrían interesarte según tus intereses.</p>
                </div>
                <Link to="/blog">
                  <Button variant="ghost" className="hidden sm:flex items-center gap-2 group font-bold">
                    Ver todo el blog <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                {related.map((r) => (
                  <Link key={r.id} to={`/blog/${r.slug}`} className="group flex flex-col h-full">
                    <Card className="border-none shadow-sm hover:shadow-xl transition-all duration-500 rounded-2xl overflow-hidden flex-grow flex flex-col bg-card">
                      <div className="aspect-[16/10] overflow-hidden">
                        {r.cover_image && (
                          <img 
                            src={getOptimizedImageUrl(r.cover_image, { width: 600 })} 

                            alt={r.cover_image_alt || r.title} 
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                            loading="lazy" 
                          />
                        )}
                      </div>
                      <div className="p-6 flex flex-col flex-grow">
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-3">{formatDate(r.published_at)}</span>
                        <h3 className="text-lg font-bold group-hover:text-primary transition-colors leading-snug line-clamp-2">{r.title}</h3>
                        <div className="mt-auto pt-6 flex items-center text-primary text-xs font-bold gap-2">
                          LEER MÁS <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </Card>
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
