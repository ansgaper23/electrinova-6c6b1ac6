import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/seo/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const schema = z.object({
  email: z.string().trim().email("Correo inválido").max(255),
  password: z.string().min(8, "Mínimo 8 caracteres").max(72),
});

export default function Auth() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!loading && user) navigate("/admin", { replace: true });
  }, [user, loading, navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse({ email, password });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setBusy(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email: parsed.data.email,
          password: parsed.data.password,
          options: { emailRedirectTo: `${window.location.origin}/admin` },
        });
        if (error) throw error;
        toast.success("Cuenta creada. Iniciando sesión...");
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: parsed.data.email,
          password: parsed.data.password,
        });
        if (error) throw error;
        toast.success("Sesión iniciada");
      }
      navigate("/admin", { replace: true });
    } catch (err: any) {
      toast.error(err.message || "Error de autenticación");
    } finally {
      setBusy(false);
    }
  };

  return (
    <Layout>
      <SEO
        title="Acceso administrador | Electrinova Perú"
        description="Acceso al panel administrativo del blog Electrinova Perú."
        path="/auth"
        noindex
      />
      <section className="section-padding pt-32">
        <div className="container-custom max-w-md">
          <h1 className="text-3xl font-display font-bold mb-2">
            {mode === "login" ? "Iniciar sesión" : "Crear cuenta"}
          </h1>
          <p className="text-muted-foreground mb-6">
            Acceso restringido al equipo de Electrinova Perú.
          </p>
          <form onSubmit={submit} className="space-y-4">
            <div>
              <Label htmlFor="email">Correo</Label>
              <Input id="email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="password">Contraseña</Label>
              <Input id="password" type="password" autoComplete={mode === "login" ? "current-password" : "new-password"} required value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <Button type="submit" className="w-full" disabled={busy}>
              {busy ? "Procesando..." : mode === "login" ? "Entrar" : "Crear cuenta"}
            </Button>
          </form>
          <button type="button" onClick={() => setMode(mode === "login" ? "signup" : "login")} className="mt-4 text-sm text-primary hover:underline">
            {mode === "login" ? "¿No tienes cuenta? Regístrate" : "Ya tengo cuenta"}
          </button>
        </div>
      </section>
    </Layout>
  );
}
