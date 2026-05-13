import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { BlockEditor, ImageBlockEditor } from "@/components/admin/BlockEditor";
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
import { Save, ArrowLeft } from "lucide-react";

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

  useEffect(() => {
    if (isNew) return;
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

  const onTitleBlur = () => {
    if (!slug && title) setSlug(slugify(title));
    if (!metaTitle && title) setMetaTitle(`${title} | Electrinova Perú`.slice(0, 60));
  };

  const save = async (publish?: boolean) => {
    if (!title.trim()) return toast.error("El título es obligatorio");
    if (!slug.trim()) return toast.error("El slug es obligatorio");
    setSaving(true);
    const willPublish = publish ?? published;
    const payload: any = {
      title: title.trim(),
      slug: slugify(slug),
      subtitle: subtitle.trim() || null,
      excerpt: excerpt.trim() || null,
      category: category.trim() || null,
      author: author.trim() || "Equipo Electrinova Perú",
      meta_title: metaTitle.trim() || null,
      meta_description: metaDescription.trim() || null,
      keywords: keywordsStr.split(",").map((k) => k.trim()).filter(Boolean),
      cover_image: cover.url || null,
      cover_image_alt: cover.alt || null,
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
        toast.success("Post creado");
        navigate(`/admin/posts/${data.id}`, { replace: true });
      } else {
        const { error } = await supabase.from("blog_posts").update(payload).eq("id", id!);
        if (error) throw error;
        toast.success("Cambios guardados");
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
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => navigate("/admin/posts")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">{isNew ? "Nuevo post" : "Editar post"}</h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Switch checked={published} onCheckedChange={setPublished} id="pub" />
            <Label htmlFor="pub">Publicado</Label>
          </div>
          <Button onClick={() => save()} disabled={saving}>
            <Save className="h-4 w-4 mr-2" />{saving ? "Guardando..." : "Guardar"}
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <Card className="p-4 space-y-3">
            <div>
              <Label>Título</Label>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} onBlur={onTitleBlur} placeholder="Título principal del post" />
            </div>
            <div>
              <Label>Subtítulo</Label>
              <Input value={subtitle} onChange={(e) => setSubtitle(e.target.value)} placeholder="Subtítulo o frase de apoyo" />
            </div>
            <div>
              <Label>Extracto / Resumen</Label>
              <Textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)} rows={3} placeholder="Breve resumen que aparecerá en el listado del blog" />
            </div>
          </Card>

          <Card className="p-4 space-y-2">
            <Label className="text-base font-semibold">Imagen de portada</Label>
            <ImageBlockEditor
              block={cover}
              onUpdate={(p) => setCover({ ...cover, ...p })}
            />
          </Card>

          <div>
            <h2 className="text-lg font-semibold mb-3">Contenido del post</h2>
            <BlockEditor blocks={content} onChange={setContent} />
          </div>
        </div>

        <aside className="space-y-4">
          <Card className="p-4 space-y-3">
            <h3 className="font-semibold">Publicación</h3>
            <div>
              <Label>Slug (URL)</Label>
              <Input value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="mi-articulo" />
              <p className="text-xs text-muted-foreground mt-1">/blog/{slug || "..."}</p>
            </div>
            <div>
              <Label>Categoría</Label>
              <Input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Ej: Normativa, Mantenimiento" />
            </div>
            <div>
              <Label>Autor</Label>
              <Input value={author} onChange={(e) => setAuthor(e.target.value)} />
            </div>
          </Card>

          <Card className="p-4 space-y-3">
            <h3 className="font-semibold">SEO</h3>
            <div>
              <Label>Meta título <span className="text-xs text-muted-foreground">({metaTitle.length}/60)</span></Label>
              <Input value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)} maxLength={70} />
            </div>
            <div>
              <Label>Meta descripción <span className="text-xs text-muted-foreground">({metaDescription.length}/160)</span></Label>
              <Textarea value={metaDescription} onChange={(e) => setMetaDescription(e.target.value)} rows={3} maxLength={170} />
            </div>
            <div>
              <Label>Palabras clave (separadas por coma)</Label>
              <Input value={keywordsStr} onChange={(e) => setKeywordsStr(e.target.value)} placeholder="pozo a tierra, CNE, lima" />
            </div>
          </Card>
        </aside>
      </div>
    </AdminLayout>
  );
}
