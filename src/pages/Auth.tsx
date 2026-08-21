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
  const [mode, setMode] = useState<"login" | "signup" | "reset">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!loading && user && mode !== "reset") navigate("/admin", { replace: true });
  }, [user, loading, navigate, mode]);

  const [newPassword, setNewPassword] = useState("");
  const isRecovery = new URLSearchParams(window.location.search).get("type") === "recovery";

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isRecovery) {
      if (newPassword.length < 8) {
        toast.error("La contraseña debe tener al menos 8 caracteres");
        return;
      }
      setBusy(true);
      try {
        const { error } = await supabase.auth.updateUser({ password: newPassword });
        if (error) throw error;
        toast.success("Contraseña actualizada correctamente");
        navigate("/admin", { replace: true });
      } catch (err: any) {
        toast.error(err.message || "Error al actualizar contraseña");
      } finally {
        setBusy(false);
      }
      return;
    }

    if (mode === "reset") {
      if (!email || !email.includes("@")) {
        toast.error("Ingresa un correo válido");
        return;
      }
      setBusy(true);
      try {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/auth?type=recovery`,
        });
        if (error) throw error;
        toast.success("Enlace de recuperación enviado a tu correo");
        setMode("login");
      } catch (err: any) {
        toast.error(err.message || "Error al enviar correo de recuperación");
      } finally {
        setBusy(false);
      }
      return;
    }

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
            {mode === "login" ? "Iniciar sesión" : mode === "signup" ? "Crear cuenta" : "Recuperar contraseña"}
          </h1>
          <p className="text-muted-foreground mb-6">
            {mode === "reset" 
              ? "Ingresa tu correo para recibir un enlace de recuperación."
              : "Acceso restringido al equipo de Electrinova Perú."}
          </p>
          <form onSubmit={submit} className="space-y-4">
            <div>
              <Label htmlFor="email">Correo</Label>
              <Input id="email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            {mode !== "reset" && (
              <div>
                <Label htmlFor="password">Contraseña</Label>
                <Input id="password" type="password" autoComplete={mode === "login" ? "current-password" : "new-password"} required value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
            )}
            <Button type="submit" className="w-full" disabled={busy}>
              {busy ? "Procesando..." : mode === "login" ? "Entrar" : mode === "signup" ? "Crear cuenta" : "Enviar enlace"}
            </Button>
          </form>
          
          <div className="mt-6 flex flex-col gap-2">
            {mode === "login" && (
              <button 
                type="button" 
                onClick={() => setMode("reset")} 
                className="text-sm text-primary hover:underline w-fit"
              >
                ¿Olvidaste tu contraseña?
              </button>
            )}
            
            <button 
              type="button" 
              onClick={() => setMode(mode === "login" ? "signup" : "login")} 
              className="text-sm text-primary hover:underline w-fit"
            >
              {mode === "login" ? "¿No tienes cuenta? Regístrate" : "Regresar al inicio de sesión"}
            </button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
