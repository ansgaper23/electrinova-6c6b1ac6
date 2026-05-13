import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Trash2, Eye } from "lucide-react";
import { toast } from "sonner";
import { formatDate } from "@/lib/blog";

export default function AdminPosts() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("blog_posts")
      .select("id, slug, title, published, published_at, updated_at, category")
      .order("updated_at", { ascending: false });
    if (error) toast.error(error.message);
    setPosts(data || []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const remove = async (id: string) => {
    if (!confirm("¿Eliminar este post?")) return;
    const { error } = await supabase.from("blog_posts").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Post eliminado");
    load();
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Posts del blog</h1>
        <Link to="/admin/posts/new">
          <Button><Plus className="h-4 w-4 mr-2" />Nuevo post</Button>
        </Link>
      </div>

      {loading ? (
        <p className="text-muted-foreground">Cargando...</p>
      ) : posts.length === 0 ? (
        <Card className="p-8 text-center text-muted-foreground">
          Aún no hay posts. Crea el primero.
        </Card>
      ) : (
        <div className="space-y-3">
          {posts.map((p) => (
            <Card key={p.id} className="p-4 flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant={p.published ? "default" : "secondary"}>
                    {p.published ? "Publicado" : "Borrador"}
                  </Badge>
                  {p.category && <Badge variant="outline">{p.category}</Badge>}
                </div>
                <h3 className="font-semibold mt-1 truncate">{p.title}</h3>
                <p className="text-xs text-muted-foreground">
                  /blog/{p.slug} · Actualizado {formatDate(p.updated_at)}
                </p>
              </div>
              <div className="flex gap-2">
                {p.published && (
                  <Link to={`/blog/${p.slug}`} target="_blank">
                    <Button size="sm" variant="ghost"><Eye className="h-4 w-4" /></Button>
                  </Link>
                )}
                <Link to={`/admin/posts/${p.id}`}>
                  <Button size="sm" variant="outline"><Pencil className="h-4 w-4 mr-1" />Editar</Button>
                </Link>
                <Button size="sm" variant="ghost" onClick={() => remove(p.id)}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}
