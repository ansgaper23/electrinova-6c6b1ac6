import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/seo/SEO";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { formatDate } from "@/lib/blog";
import { Calendar, Clock } from "lucide-react";

export default function Blog() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("blog_posts")
        .select("id, slug, title, subtitle, excerpt, cover_image, cover_image_alt, category, published_at, reading_time")
        .eq("published", true)
        .order("published_at", { ascending: false });
      setPosts(data || []);
      setLoading(false);
    })();
  }, []);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Blog técnico Electrinova Perú",
    url: "https://electrinovaperu.com/blog",
    description:
      "Artículos técnicos sobre instalaciones eléctricas industriales, normativa CNE, automatización y mantenimiento en Perú.",
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      url: `https://electrinovaperu.com/blog/${p.slug}`,
      datePublished: p.published_at,
      image: p.cover_image,
    })),
  };

  return (
    <Layout>
      <SEO
        title="Blog técnico eléctrico industrial | Electrinova Perú"
        description="Guías técnicas y normativas sobre pozos a tierra, tableros eléctricos, subestaciones, automatización industrial y mantenimiento eléctrico en Lima, Perú."
        path="/blog"
        jsonLd={jsonLd}
      />
      <section className="pt-32 pb-12 gradient-hero">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-primary-foreground mb-3">
            Blog técnico
          </h1>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            Conocimiento aplicado en ingeniería eléctrica, automatización y mantenimiento industrial.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          {loading ? (
            <p className="text-center text-muted-foreground">Cargando artículos...</p>
          ) : posts.length === 0 ? (
            <p className="text-center text-muted-foreground">Pronto publicaremos contenido técnico.</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((p) => (
                <Link key={p.id} to={`/blog/${p.slug}`}>
                  <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow group">
                    {p.cover_image && (
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={p.cover_image}
                          alt={p.cover_image_alt || p.title}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}
                    <div className="p-5 space-y-3">
                      {p.category && <Badge variant="secondary">{p.category}</Badge>}
                      <h2 className="text-lg font-bold leading-snug group-hover:text-primary transition-colors">
                        {p.title}
                      </h2>
                      {p.excerpt && (
                        <p className="text-sm text-muted-foreground line-clamp-3">{p.excerpt}</p>
                      )}
                      <div className="flex items-center gap-3 text-xs text-muted-foreground pt-2">
                        <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{formatDate(p.published_at)}</span>
                        {p.reading_time && <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{p.reading_time} min</span>}
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
