import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { ImageBlockEditor } from "@/components/admin/BlockEditor";
import { RichEditor } from "@/components/admin/RichEditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import {
  type BlogBlock,
  blocksToHtml,
  estimateReadingTime,
  htmlToPlainText,
  slugify,
} from "@/lib/blog";
import { Save, ArrowLeft, ChevronDown, Eye } from "lucide-react";

export default function AdminPostEditor() {
  const { id } = useParams<{ id: string }>();
  const isNew = id === "new" || !id;
  const navigate = useNavigate();
  const { user } = useAuth();

  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [category, setCategory] = useState("");
  const [author, setAuthor] = useState("Equipo Electrinova Perú");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [keywordsStr, setKeywordsStr] = useState("");
  const [cover, setCover] = useState({ type: "image" as const, url: "", alt: "", caption: "" });
  const [contentHtml, setContentHtml] = useState<string>("");
  const [published, setPublished] = useState(false);
  const [showSeo, setShowSeo] = useState(false);

  useEffect(() => {
    if (isNew) {
      setContentHtml("<p></p>");
      return;
    }
    (async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("id", id!)
        .maybeSingle();
      if (error || !data) {
        toast.error("Post no encontrado");
        navigate("/admin/posts");
        return;
      }
      setTitle(data.title);
      setSlug(data.slug);
      setSubtitle(data.subtitle || "");
      setExcerpt(data.excerpt || "");
      setCategory(data.category || "");
      setAuthor(data.author || "Equipo Electrinova Perú");
      setMetaTitle(data.meta_title || "");
      setMetaDescription(data.meta_description || "");
      setKeywordsStr((data.keywords || []).join(", "));
      setCover({ type: "image", url: data.cover_image || "", alt: data.cover_image_alt || "", caption: "" });
      const blocks = (data.content as BlogBlock[]) || [];
      // If single html block use it directly; otherwise convert legacy blocks to html
      const html = blocks.length === 1 && blocks[0].type === "html"
        ? blocks[0].html
        : blocksToHtml(blocks);
      setContentHtml(html || "<p></p>");
      setPublished(!!data.published);
      setLoading(false);
    })();
  }, [id, isNew, navigate]);

  // Auto-derive SEO defaults
  const effectiveSlug = slug || slugify(title);
  const effectiveMetaTitle = metaTitle || (title ? `${title} | Electrinova Perú`.slice(0, 65) : "");
  const effectiveMetaDescription =
    metaDescription || excerpt || htmlToPlainText(contentHtml).slice(0, 158);

  const onTitleChange = (v: string) => {
    setTitle(v);
    if (!slug || slug === slugify(title)) setSlug(slugify(v));
  };

  const postContext = useMemo(
    () => ({ title, subtitle, excerpt, category }),
    [title, subtitle, excerpt, category]
  );

  const save = async (publish?: boolean) => {
    if (!title.trim()) return toast.error("El título es obligatorio");
    setSaving(true);
    const willPublish = publish ?? published;
    const finalSlug = slugify(slug || title);
    const payload: any = {
      title: title.trim(),
      slug: finalSlug,
      subtitle: subtitle.trim() || null,
      excerpt: excerpt.trim() || null,
      category: category.trim() || null,
      author: author.trim() || "Equipo Electrinova Perú",
      meta_title: (metaTitle.trim() || effectiveMetaTitle) || null,
      meta_description: (metaDescription.trim() || effectiveMetaDescription) || null,
      keywords: keywordsStr.split(",").map((k) => k.trim()).filter(Boolean),
      cover_image: cover.url || null,
      cover_image_alt: cover.alt || title || null,
      content: [{ type: "html", html: contentHtml } as BlogBlock],
      reading_time: estimateReadingTime([{ type: "html", html: contentHtml } as BlogBlock]),
      published: willPublish,
      published_at: willPublish ? (new Date()).toISOString() : null,
    };
    try {
      if (isNew) {
        payload.created_by = user?.id;
        const { data, error } = await supabase
          .from("blog_posts")
          .insert(payload)
          .select("id")
          .single();
        if (error) throw error;
        toast.success(willPublish ? "Post publicado" : "Borrador guardado");
        navigate(`/admin/posts/${data.id}`, { replace: true });
      } else {
        const { error } = await supabase.from("blog_posts").update(payload).eq("id", id!);
        if (error) throw error;
        toast.success(willPublish ? "Post publicado" : "Cambios guardados");
        setPublished(willPublish);
      }
    } catch (e: any) {
      toast.error(e.message || "Error al guardar");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <AdminLayout><p>Cargando...</p></AdminLayout>;

  return (
    <AdminLayout>
      {/* Sticky toolbar */}
      <div className="sticky top-0 -mx-4 md:-mx-8 -mt-4 md:-mt-8 mb-6 px-4 md:px-8 py-3 bg-background/90 backdrop-blur border-b z-10 flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2 min-w-0">
          <Button variant="ghost" size="icon" onClick={() => navigate("/admin/posts")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-lg font-bold truncate">{isNew ? "Nuevo post" : title || "Editar post"}</h1>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-2 mr-2">
            <Switch checked={published} onCheckedChange={setPublished} id="pub" />
            <Label htmlFor="pub" className="text-sm">Publicado</Label>
          </div>
          <Button variant="outline" size="sm" onClick={() => save(false)} disabled={saving}>
            <Save className="h-4 w-4 mr-2" />Borrador
          </Button>
          <Button size="sm" onClick={() => save(true)} disabled={saving}>
            <Eye className="h-4 w-4 mr-2" />{saving ? "Guardando..." : "Publicar"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Main Column: Editor */}
        <div className="lg:col-span-2 space-y-8">
          {/* Hero inputs - mimic the article look */}
          <div className="space-y-4">
            <div className="space-y-1">
              <Label className="text-xs uppercase tracking-widest text-muted-foreground ml-1">Categoría</Label>
              <Input
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Ej: Normativa, Ingeniería..."
                className="text-lg font-medium border-x-0 border-t-0 border-b rounded-none px-1 focus-visible:ring-0 shadow-none bg-transparent"
              />
            </div>
            
            <div className="space-y-1">
              <Label className="text-xs uppercase tracking-widest text-muted-foreground ml-1">Título</Label>
              <Textarea
                value={title}
                onChange={(e) => onTitleChange(e.target.value)}
                placeholder="Título del artículo"
                rows={2}
                className="text-3xl md:text-4xl font-display font-bold leading-tight border-x-0 border-t-0 border-b rounded-none px-1 focus-visible:ring-0 shadow-none resize-none bg-transparent min-h-[100px]"
              />
            </div>

            <div className="space-y-1">
              <Label className="text-xs uppercase tracking-widest text-muted-foreground ml-1">Subtítulo</Label>
              <Textarea
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="Una frase que complemente el título..."
                rows={2}
                className="text-xl text-muted-foreground border-x-0 border-t-0 border-b rounded-none px-1 focus-visible:ring-0 shadow-none resize-none bg-transparent min-h-[80px]"
              />
            </div>

            <div className="pt-2">
              <p className="text-xs text-muted-foreground">URL amigable: <span className="text-primary font-mono">/blog/{effectiveSlug || "..."}</span></p>
            </div>
          </div>

          {/* Cover image section */}
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-bold flex items-center gap-2">
                Imagen de Portada
              </Label>
            </div>
            <Card className="overflow-hidden border-2 border-dashed bg-muted/20">
              <ImageBlockEditor
                block={cover}
                onUpdate={(p) => setCover({ ...cover, ...p })}
                context={postContext}
              />
            </Card>
          </section>

          {/* Main Content Editor */}
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-bold">Cuerpo del Artículo</Label>
            </div>
            <RichEditor
              value={contentHtml}
              onChange={setContentHtml}
              context={postContext}
              placeholder="Empieza a escribir tu artículo técnico... usa el botón '+' para añadir elementos enriquecidos."
            />
          </section>
        </div>

        {/* Sidebar: SEO & Settings */}
        <div className="space-y-6 lg:sticky lg:top-24">
          {/* Status & Excerpt */}
          <Card className="p-5 space-y-4 shadow-sm border-primary/10">
            <h3 className="font-bold text-sm uppercase tracking-wider flex items-center gap-2">
              Configuración de Publicación
            </h3>
            <div className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="excerpt-side" className="text-xs font-semibold">Resumen SEO (Meta Description)</Label>
                <Textarea
                  id="excerpt-side"
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="Resumen corto para el listado y Google..."
                  rows={4}
                  className="text-sm resize-none"
                  maxLength={170}
                />
                <div className="flex justify-between items-center px-1">
                   <span className="text-[10px] text-muted-foreground">{excerpt.length}/160 caracteres</span>
                   {excerpt.length > 160 && <span className="text-[10px] text-destructive">Demasiado largo</span>}
                </div>
              </div>
              
              <div className="pt-2 flex items-center justify-between border-t border-border mt-4">
                <Label htmlFor="pub-side" className="text-sm font-medium">Estado: {published ? "Publicado" : "Borrador"}</Label>
                <Switch checked={published} onCheckedChange={setPublished} id="pub-side" />
              </div>
            </div>
          </Card>

          {/* SEO Advanced Panel */}
          <Card className="p-5 shadow-sm overflow-hidden">
            <button
              type="button"
              onClick={() => setShowSeo((v) => !v)}
              className="flex items-center justify-between w-full text-left"
            >
              <h3 className="font-bold text-sm uppercase tracking-wider">SEO Avanzado</h3>
              <ChevronDown className={`h-4 w-4 transition-transform ${showSeo ? "rotate-180" : ""}`} />
            </button>
            
            {showSeo && (
              <div className="mt-5 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">Slug Personalizado</Label>
                  <Input value={slug} onChange={(e) => setSlug(e.target.value)} placeholder={slugify(title)} className="h-8 text-xs" />
                </div>
                
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">
                    Meta Título
                  </Label>
                  <Input
                    value={metaTitle}
                    onChange={(e) => setMetaTitle(e.target.value)}
                    placeholder={effectiveMetaTitle}
                    maxLength={70}
                    className="h-8 text-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">Palabras Clave</Label>
                  <Input 
                    value={keywordsStr} 
                    onChange={(e) => setKeywordsStr(e.target.value)} 
                    placeholder="pozo a tierra, CNE, lima..." 
                    className="h-8 text-xs" 
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">Autor del Post</Label>
                  <Input value={author} onChange={(e) => setAuthor(e.target.value)} className="h-8 text-xs" />
                </div>
              </div>
            )}
          </Card>

          {/* SEO Checklist/Summary (Visual indicator) */}
          <Card className="p-5 bg-primary/5 border-none shadow-none">
            <h3 className="font-bold text-xs uppercase tracking-wider mb-3 text-primary">Análisis SEO</h3>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${title.length > 20 ? 'bg-green-500' : 'bg-yellow-500'}`} />
                <span>Título: {title.length > 0 ? (title.length > 20 ? 'Óptimo' : 'Muy corto') : 'Falta'}</span>
              </li>
              <li className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${excerpt.length > 50 && excerpt.length <= 160 ? 'bg-green-500' : 'bg-yellow-500'}`} />
                <span>Descripción: {excerpt.length > 50 ? (excerpt.length <= 160 ? 'Óptima' : 'Muy larga') : 'Muy corta'}</span>
              </li>
              <li className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${cover.url ? 'bg-green-500' : 'bg-red-500'}`} />
                <span>Imagen de portada: {cover.url ? 'Lista' : 'Falta'}</span>
              </li>
              <li className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${contentHtml.length > 500 ? 'bg-green-500' : 'bg-yellow-500'}`} />
                <span>Contenido: {contentHtml.length > 500 ? 'Extenso' : 'Poco contenido'}</span>
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
