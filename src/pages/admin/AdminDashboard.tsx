import { AdminLayout } from "@/components/admin/AdminLayout";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Eye, Plus } from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ total: 0, published: 0, drafts: 0 });

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from("blog_posts").select("published");
      const total = data?.length || 0;
      const published = (data || []).filter((p: any) => p.published).length;
      setStats({ total, published, drafts: total - published });
    })();
  }, []);

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">Panel de administración</h1>
      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        <Card className="p-5">
          <div className="text-sm text-muted-foreground">Posts totales</div>
          <div className="text-3xl font-bold">{stats.total}</div>
        </Card>
        <Card className="p-5">
          <div className="text-sm text-muted-foreground">Publicados</div>
          <div className="text-3xl font-bold text-primary">{stats.published}</div>
        </Card>
        <Card className="p-5">
          <div className="text-sm text-muted-foreground">Borradores</div>
          <div className="text-3xl font-bold text-muted-foreground">{stats.drafts}</div>
        </Card>
      </div>
      <div className="flex flex-wrap gap-3">
        <Link to="/admin/posts/new"><Button><Plus className="h-4 w-4 mr-2" />Nuevo post</Button></Link>
        <Link to="/admin/posts"><Button variant="outline"><FileText className="h-4 w-4 mr-2" />Gestionar posts</Button></Link>
        <Link to="/blog"><Button variant="ghost"><Eye className="h-4 w-4 mr-2" />Ver blog público</Button></Link>
      </div>
    </AdminLayout>
  );
}
