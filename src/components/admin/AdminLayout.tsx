import { ReactNode } from "react";
import { Navigate, Link, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, FileText, LogOut, Plus, ExternalLink } from "lucide-react";

export function AdminLayout({ children }: { children: ReactNode }) {
  const { user, isAdmin, loading, signOut } = useAuth();
  const loc = useLocation();

  if (loading) return <div className="min-h-screen bg-background" />;
  if (!user) return <Navigate to="/auth" replace state={{ from: loc }} />;
  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 text-center">
        <div>
          <h1 className="text-2xl font-bold mb-2">Acceso restringido</h1>
          <p className="text-muted-foreground mb-4">Tu cuenta no tiene permisos de administrador.</p>
          <Button onClick={signOut} variant="outline">Cerrar sesión</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/20">
      <aside className="fixed top-0 left-0 h-screen w-60 bg-primary text-primary-foreground p-4 hidden md:flex flex-col">
        <Link to="/" className="font-display font-bold text-lg mb-6">Electrinova Admin</Link>
        <nav className="flex flex-col gap-1 flex-1">
          <Link to="/admin" className="flex items-center gap-2 px-3 py-2 rounded hover:bg-primary-foreground/10">
            <LayoutDashboard className="h-4 w-4" />Dashboard
          </Link>
          <Link to="/admin/posts" className="flex items-center gap-2 px-3 py-2 rounded hover:bg-primary-foreground/10">
            <FileText className="h-4 w-4" />Posts del blog
          </Link>
          <Link to="/admin/posts/new" className="flex items-center gap-2 px-3 py-2 rounded hover:bg-primary-foreground/10">
            <Plus className="h-4 w-4" />Nuevo post
          </Link>
        </nav>
        <div className="space-y-2">
          <Link to="/blog" className="flex items-center gap-2 text-sm opacity-80 hover:opacity-100">
            <ExternalLink className="h-4 w-4" />Ver blog
          </Link>
          <Button onClick={signOut} variant="secondary" size="sm" className="w-full">
            <LogOut className="h-4 w-4 mr-2" />Salir
          </Button>
        </div>
      </aside>
      <header className="md:hidden bg-primary text-primary-foreground p-4 flex items-center justify-between">
        <Link to="/admin" className="font-bold">Electrinova Admin</Link>
        <div className="flex gap-2">
          <Link to="/admin/posts/new"><Button size="sm" variant="secondary"><Plus className="h-4 w-4" /></Button></Link>
          <Button size="sm" variant="secondary" onClick={signOut}><LogOut className="h-4 w-4" /></Button>
        </div>
      </header>
      <main className="md:ml-60 p-4 md:p-8">{children}</main>
    </div>
  );
}
