import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/seo/SEO";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { formatDate } from "@/lib/blog";
import { Calendar, Clock, ArrowRight, Search, Tag } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function Blog() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await supabase
        .from("blog_posts")
        .select("id, slug, title, subtitle, excerpt, cover_image, cover_image_alt, category, published_at, reading_time")
        .eq("published", true)
        .order("published_at", { ascending: false });
      setPosts(data || []);
      setLoading(false);
    };
    fetchPosts();
  }, []);

  const categories = useMemo(() => {
    const cats = posts.map(p => p.category).filter(Boolean);
    return Array.from(new Set(cats));
  }, [posts]);

  const filteredPosts = useMemo(() => {
    return posts.filter(p => {
      const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.excerpt?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !selectedCategory || p.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [posts, searchQuery, selectedCategory]);

  const featuredPost = useMemo(() => {
    return selectedCategory || searchQuery ? null : posts[0];
  }, [posts, selectedCategory, searchQuery]);

  const regularPosts = useMemo(() => {
    if (featuredPost) return filteredPosts.filter(p => p.id !== featuredPost.id);
    return filteredPosts;
  }, [filteredPosts, featuredPost]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Blog técnico Electrinova Perú",
    url: "/blog",
    description: "Artículos técnicos sobre instalaciones eléctricas industriales, normativa CNE, automatización y mantenimiento en Perú.",
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      url: `/blog/${p.slug}`,
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
      
      <section className="pt-32 pb-20 gradient-hero overflow-hidden relative">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        </div>
        <div className="container-custom relative z-10 text-center">
          <Badge variant="outline" className="mb-4 text-primary-foreground border-primary-foreground/30 px-4 py-1">
            Conocimiento Especializado
          </Badge>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-primary-foreground mb-6 tracking-tight animate-fade-in-up">
            Blog Técnico <span className="text-accent italic">Industrial</span>
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto leading-relaxed animate-fade-in-up [animation-delay:200ms]">
            Explora las últimas tendencias en ingeniería eléctrica, automatización y normativas vigentes en el sector industrial peruano.
          </p>
          
          <div className="mt-10 max-w-lg mx-auto relative group animate-fade-in-up [animation-delay:400ms]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5 group-focus-within:text-primary transition-colors" />
            <Input 
              placeholder="Buscar guías o artículos técnicos..." 
              className="pl-12 py-6 bg-white/95 border-none shadow-xl focus-visible:ring-accent text-foreground text-lg rounded-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </section>

      <div className="bg-background/80 backdrop-blur-md border-b">
        <div className="container-custom py-4 flex flex-wrap items-center gap-3 overflow-x-auto no-scrollbar">
          <Tag className="h-4 w-4 text-muted-foreground mr-2 shrink-0" />
          <Button 
            variant={selectedCategory === null ? "default" : "outline"} 
            size="sm" 
            className="rounded-full shrink-0"
            onClick={() => setSelectedCategory(null)}
          >
            Todos
          </Button>
          {categories.map(cat => (
            <Button 
              key={cat}
              variant={selectedCategory === cat ? "default" : "outline"} 
              size="sm" 
              className="rounded-full shrink-0"
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </Button>
          ))}
        </div>
      </div>

      <section className="section-padding bg-background">
        <div className="container-custom">
          {loading ? (
            <>
              <SEO 
                title=\"Cargando blog... | Electrinova Perú\" 
                description=\"Explora nuestros artículos técnicos sobre ingeniería eléctrica e industrial.\" 
                path=\"/blog\" 
              />
              <div className=\"grid md:grid-cols-2 lg:grid-cols-3 gap-8\">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="space-y-4">
                  <Skeleton className="aspect-video w-full rounded-xl" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ))}
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-20">
              <div className="bg-muted w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-2xl font-bold mb-2">No se encontraron artículos</h3>
              <p className="text-muted-foreground">Prueba con otros términos de búsqueda o categorías.</p>
              <Button 
                variant="link" 
                className="mt-4 text-primary"
                onClick={() => {setSearchQuery(""); setSelectedCategory(null);}}
              >
                Limpiar filtros
              </Button>
            </div>
          ) : (
            <>
              {featuredPost && (
                <div className="mb-16 animate-fade-in-up">
                  <Link to={`/blog/${featuredPost.slug}`} className="group block">
                    <Card className="overflow-hidden border-none shadow-2xl hover:shadow-primary/10 transition-all duration-500 rounded-3xl">
                      <div className="grid lg:grid-cols-2">
                        <div className="aspect-[16/10] lg:aspect-square overflow-hidden relative">
                          {featuredPost.cover_image ? (
                            <img
                              src={featuredPost.cover_image}
                              alt={featuredPost.cover_image_alt || featuredPost.title}
                              loading="eager"
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                          ) : (
                            <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                              <span className="text-primary/20 font-display text-4xl">Electrinova</span>
                            </div>
                          )}
                          <div className="absolute top-6 left-6">
                            <Badge className="bg-accent text-accent-foreground px-4 py-1.5 text-sm font-bold shadow-lg">
                              DESTACADO
                            </Badge>
                          </div>
                        </div>
                        <div className="p-8 lg:p-12 flex flex-col justify-center bg-card">
                          <div className="space-y-6">
                            {featuredPost.category && (
                              <Badge variant="secondary" className="px-3 py-1 bg-primary/5 text-primary border-primary/10">
                                {featuredPost.category}
                              </Badge>
                            )}
                            <h2 className="text-3xl md:text-5xl font-display font-bold leading-tight group-hover:text-primary transition-colors">
                              {featuredPost.title}
                            </h2>
                            {featuredPost.excerpt && (
                              <p className="text-lg text-muted-foreground line-clamp-4 leading-relaxed">
                                {featuredPost.excerpt}
                              </p>
                            )}
                            <div className="flex items-center gap-6 text-sm text-muted-foreground pt-4">
                              <span className="flex items-center gap-2"><Calendar className="h-4 w-4 text-primary/60" />{formatDate(featuredPost.published_at)}</span>
                              {featuredPost.reading_time && <span className="flex items-center gap-2"><Clock className="h-4 w-4 text-primary/60" />{featuredPost.reading_time} min</span>}
                            </div>
                            <div className="pt-4">
                              <span className="inline-flex items-center gap-2 font-bold text-primary group-hover:gap-3 transition-all underline underline-offset-8">
                                Leer artículo completo <ArrowRight className="h-5 w-5" />
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                </div>
              )}

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 stagger-children animate">
                {regularPosts.map((p) => (
                  <Link key={p.id} to={`/blog/${p.slug}`} className="group">
                    <Card className="overflow-hidden h-full border-none bg-card shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 rounded-2xl flex flex-col">
                      <div className="aspect-video overflow-hidden relative">
                        {p.cover_image ? (
                          <img
                            src={p.cover_image}
                            alt={p.cover_image_alt || p.title}
                            loading="lazy"
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                        ) : (
                          <div className="w-full h-full bg-primary/5 flex items-center justify-center" />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </div>
                      <div className="p-6 flex flex-col flex-grow">
                        <div className="flex items-center justify-between mb-4">
                          {p.category && <Badge variant="secondary" className="bg-primary/5 text-primary border-none text-[10px] uppercase tracking-widest">{p.category}</Badge>}
                          <span className="text-[10px] font-medium text-muted-foreground flex items-center gap-1 uppercase tracking-wider">
                            <Clock className="h-3 w-3" /> {p.reading_time || 5} min
                          </span>
                        </div>
                        <h3 className="text-xl font-bold leading-tight mb-3 group-hover:text-primary transition-colors line-clamp-2">
                          {p.title}
                        </h3>
                        {p.excerpt && (
                          <p className="text-sm text-muted-foreground line-clamp-3 mb-6 flex-grow leading-relaxed">
                            {p.excerpt}
                          </p>
                        )}
                        <div className="flex items-center justify-between mt-auto pt-4 border-t border-muted">
                          <span className="text-xs text-muted-foreground">{formatDate(p.published_at)}</span>
                          <span className="text-primary font-bold text-xs inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                            Leer más <ArrowRight className="h-3 w-3" />
                          </span>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <section className="bg-primary py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-[120px] -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-electric-blue/10 rounded-full blur-[120px] -ml-48 -mb-48" />
        <div className="container-custom text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
            Mantente a la vanguardia <span className="text-accent italic">técnica</span>
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto mb-10 text-lg">
            Suscríbete para recibir mensualmente las actualizaciones normativas y guías técnicas más importantes del sector eléctrico industrial.
          </p>
          <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
            <Input placeholder="Tu correo electrónico" className="bg-white/10 border-white/20 text-white placeholder:text-white/40 h-12" />
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold px-8">Suscribirse</Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
