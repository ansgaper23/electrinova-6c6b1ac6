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
  estimateReadingTime,
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
  const [content, setContent] = useState<BlogBlock[]>([]);
  const [published, setPublished] = useState(false);
  const [showSeo, setShowSeo] = useState(false);

  useEffect(() => {
    if (isNew) {
      // Start with one paragraph block to make it obvious where to write
      setContent([{ type: "paragraph", text: "" }]);
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
      setContent((data.content as BlogBlock[]) || []);
      setPublished(!!data.published);
      setLoading(false);
    })();
  }, [id, isNew, navigate]);

  // Auto-derive SEO defaults
  const effectiveSlug = slug || slugify(title);
  const effectiveMetaTitle = metaTitle || (title ? `${title} | Electrinova Perú`.slice(0, 65) : "");
  const effectiveMetaDescription =
    metaDescription || excerpt || blocksToPlainText(content).slice(0, 158);

  const onTitleChange = (v: string) => {
    setTitle(v);
    if (!slug || slug === slugify(title)) setSlug(slugify(v));
  };

  const postContext = useMemo(
    () => ({ title, subtitle, excerpt, category, blocks: content }),
    [title, subtitle, excerpt, category, content]
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
      content,
      reading_time: estimateReadingTime(content),
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

      <div className="max-w-3xl mx-auto space-y-6">
        {/* Hero inputs - mimic the article look */}
        <div className="space-y-3">
          <Input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Categoría (opcional, ej: Normativa)"
            className="border-0 px-0 text-xs uppercase tracking-widest text-muted-foreground focus-visible:ring-0 shadow-none h-7"
          />
          <Textarea
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            placeholder="Título del artículo"
            rows={2}
            className="border-0 px-0 text-3xl md:text-4xl font-display font-bold leading-tight focus-visible:ring-0 shadow-none resize-none"
          />
          <Textarea
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            placeholder="Subtítulo (opcional)"
            rows={2}
            className="border-0 px-0 text-lg text-muted-foreground focus-visible:ring-0 shadow-none resize-none"
          />
          <Textarea
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            placeholder="Resumen para el listado del blog y vista previa en Google (1-2 frases)"
            rows={2}
            className="text-sm"
          />
          <p className="text-xs text-muted-foreground">URL: <code>/blog/{effectiveSlug || "..."}</code></p>
        </div>

        {/* Cover image */}
        <Card className="p-4 space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-semibold">Imagen de portada</Label>
            <span className="text-xs text-muted-foreground">Se genera con el contexto del post</span>
          </div>
          <ImageBlockEditor
            block={cover}
            onUpdate={(p) => setCover({ ...cover, ...p })}
            context={postContext}
          />
        </Card>

        {/* Content */}
        <div>
          <Label className="text-sm font-semibold mb-3 block">Contenido</Label>
          <BlockEditor blocks={content} onChange={setContent} context={postContext} />
        </div>

        {/* SEO collapsible */}
        <Card className="p-4">
          <button
            type="button"
            onClick={() => setShowSeo((v) => !v)}
            className="flex items-center justify-between w-full text-left"
          >
            <div>
              <h3 className="font-semibold">SEO avanzado</h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Se rellena automáticamente. Solo edita si quieres personalizar.
              </p>
            </div>
            <ChevronDown className={`h-4 w-4 transition-transform ${showSeo ? "rotate-180" : ""}`} />
          </button>
          {showSeo && (
            <div className="mt-4 space-y-3">
              <div>
                <Label>Slug (URL)</Label>
                <Input value={slug} onChange={(e) => setSlug(e.target.value)} placeholder={slugify(title)} />
              </div>
              <div>
                <Label>
                  Meta título
                  <span className="text-xs text-muted-foreground ml-2">{(metaTitle || effectiveMetaTitle).length}/60</span>
                </Label>
                <Input
                  value={metaTitle}
                  onChange={(e) => setMetaTitle(e.target.value)}
                  placeholder={effectiveMetaTitle}
                  maxLength={70}
                />
              </div>
              <div>
                <Label>
                  Meta descripción
                  <span className="text-xs text-muted-foreground ml-2">{(metaDescription || effectiveMetaDescription).length}/160</span>
                </Label>
                <Textarea
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                  placeholder={effectiveMetaDescription}
                  rows={3}
                  maxLength={170}
                />
              </div>
              <div>
                <Label>Palabras clave (separadas por coma)</Label>
                <Input value={keywordsStr} onChange={(e) => setKeywordsStr(e.target.value)} placeholder="pozo a tierra, CNE, lima" />
              </div>
              <div>
                <Label>Autor</Label>
                <Input value={author} onChange={(e) => setAuthor(e.target.value)} />
              </div>
              <div className="flex items-center gap-2 sm:hidden">
                <Switch checked={published} onCheckedChange={setPublished} id="pub-mobile" />
                <Label htmlFor="pub-mobile">Publicado</Label>
              </div>
            </div>
          )}
        </Card>
      </div>
    </AdminLayout>
  );
}
