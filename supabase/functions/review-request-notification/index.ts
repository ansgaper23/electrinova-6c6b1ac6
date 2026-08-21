import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.7"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    )

    const { record, type } = await req.json()

    // Solo actuar si un post se publica (simulando finalización de proyecto o hito)
    // O si se dispara manualmente desde el admin para un cliente
    if (type === 'INSERT' || (type === 'UPDATE' && record.published)) {
      console.log(\`Post publicado: \${record.title}. Preparando notificación de reseña...\`)
      
      // Aquí se integraría Resend o WhatsApp API para enviar el link de Google Business
      // Por ahora, registramos la intención en logs.
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
