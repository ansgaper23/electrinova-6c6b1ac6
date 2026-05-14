import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function buildContextPrompt(input: {
  title?: string;
  subtitle?: string;
  excerpt?: string;
  category?: string;
  contentText?: string;
  prompt?: string;
  hint?: string;
}) {
  const parts: string[] = [];
  if (input.prompt && input.prompt.trim()) parts.push(input.prompt.trim());
  if (input.hint && input.hint.trim()) parts.push(`Enfoque visual: ${input.hint.trim()}`);
  if (input.title) parts.push(`Título del artículo: ${input.title}`);
  if (input.subtitle) parts.push(`Subtítulo: ${input.subtitle}`);
  if (input.category) parts.push(`Categoría: ${input.category}`);
  if (input.excerpt) parts.push(`Resumen: ${input.excerpt}`);
  if (input.contentText) {
    const trimmed = input.contentText.replace(/\s+/g, " ").slice(0, 1200);
    parts.push(`Contenido relevante: ${trimmed}`);
  }

  return [
    "Genera UNA fotografía editorial profesional, fotorrealista, alta calidad, iluminación natural, composición horizontal 16:9, lista para portada de blog técnico industrial eléctrico en Perú.",
    "Estilo: reportaje corporativo B2B, colores naturales, ambiente real de obra o planta industrial peruana.",
    "OBLIGATORIO de seguridad: si aparecen personas, deben usar EPP completo (casco, lentes, guantes, ropa ignífuga, calzado dieléctrico). Nunca mostrar prácticas inseguras, cables expuestos manipulados sin protección, ni manos descubiertas en tableros energizados.",
    "Prohibido: texto, letras, logos, marcas de agua, collages, ilustraciones tipo cartoon, manos deformes.",
    "Contexto del artículo a representar visualmente:",
    parts.join(" \n"),
  ].join("\n");
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY")!;
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      return new Response(JSON.stringify({ error: "AI key not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const userClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: userData, error: userError } = await userClient.auth.getUser();
    if (userError || !userData.user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const adminClient = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    const { data: roleRow } = await adminClient
      .from("user_roles")
      .select("role")
      .eq("user_id", userData.user.id)
      .eq("role", "admin")
      .maybeSingle();

    if (!roleRow) {
      return new Response(JSON.stringify({ error: "Forbidden" }), {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = await req.json();
    const { prompt, title, subtitle, excerpt, category, contentText, hint } = body || {};

    if (
      !prompt && !title && !subtitle && !excerpt && !contentText
    ) {
      return new Response(JSON.stringify({ error: "Falta contexto o prompt" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const finalPrompt = buildContextPrompt({
      prompt, title, subtitle, excerpt, category, contentText, hint,
    });

    if (finalPrompt.length > 8000) {
      return new Response(JSON.stringify({ error: "Contexto demasiado largo" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const aiRes = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash-image",
          messages: [{ role: "user", content: finalPrompt }],
          modalities: ["image", "text"],
        }),
      }
    );

    if (!aiRes.ok) {
      const t = await aiRes.text();
      console.error("AI error", aiRes.status, t);
      if (aiRes.status === 429) {
        return new Response(
          JSON.stringify({ error: "Límite de uso alcanzado, intenta luego." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (aiRes.status === 402) {
        return new Response(
          JSON.stringify({ error: "Créditos IA agotados." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      return new Response(JSON.stringify({ error: "AI error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const aiData = await aiRes.json();
    const imageUrl =
      aiData?.choices?.[0]?.message?.images?.[0]?.image_url?.url;
    if (!imageUrl || !imageUrl.startsWith("data:image")) {
      return new Response(JSON.stringify({ error: "No image generated" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const [meta, base64] = imageUrl.split(",");
    const mime = meta.match(/data:(.*?);base64/)?.[1] ?? "image/png";
    const ext = mime.split("/")[1] || "png";
    const binary = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));

    const filename = `${userData.user.id}/${Date.now()}-${crypto.randomUUID()}.${ext}`;
    const { error: upErr } = await adminClient.storage
      .from("blog-images")
      .upload(filename, binary, { contentType: mime, upsert: false });

    if (upErr) {
      console.error("upload error", upErr);
      return new Response(JSON.stringify({ error: "Upload failed" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { data: pub } = adminClient.storage
      .from("blog-images")
      .getPublicUrl(filename);

    return new Response(
      JSON.stringify({ url: pub.publicUrl, path: filename }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (e) {
    console.error(e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
