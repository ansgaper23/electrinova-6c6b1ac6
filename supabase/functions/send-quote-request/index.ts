import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface QuoteRequest {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  console.log("Received request to send-quote-request function");

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not configured");
      throw new Error("RESEND_API_KEY is not configured");
    }

    const resend = new Resend(RESEND_API_KEY);
    const { name, email, phone, projectType, message }: QuoteRequest = await req.json();

    console.log("Processing quote request from:", name, email);

    // Validate required fields
    if (!name || !email || !phone || !projectType || !message) {
      console.error("Missing required fields");
      throw new Error("Todos los campos son requeridos");
    }

    // Send email to ventas@electrinovaperu.com
    const emailResponse = await resend.emails.send({
      // Importante: Resend exige que el dominio del remitente (parte después de @)
      // coincida con un dominio verificado.
      from: "ELECTRINOVA PERÚ <noreply@correo.electrinovaperu.com>",
      to: ["ventas@electrinovaperu.com"],
      reply_to: email,
      subject: `Nueva Cotización: ${projectType} - ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #1e3a5f 0%, #0a1628 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: #FFD700; margin: 0; font-size: 24px;">⚡ Nueva Solicitud de Cotización</h1>
          </div>
          
          <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e0e0e0; border-top: none;">
            <h2 style="color: #1e3a5f; margin-top: 0;">Datos del Cliente</h2>
            
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0; font-weight: bold; width: 140px;">Nombre:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0; font-weight: bold;">Email:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;">
                  <a href="mailto:${email}" style="color: #1e3a5f;">${email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0; font-weight: bold;">Teléfono:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;">
                  <a href="tel:${phone}" style="color: #1e3a5f;">${phone}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0; font-weight: bold;">Tipo de Proyecto:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0; color: #FFD700; font-weight: bold;">${projectType}</td>
              </tr>
            </table>
            
            <h3 style="color: #1e3a5f; margin-top: 25px;">Mensaje del Cliente:</h3>
            <div style="background: white; padding: 15px; border-radius: 8px; border-left: 4px solid #FFD700;">
              <p style="margin: 0; white-space: pre-wrap;">${message}</p>
            </div>
            
            <div style="margin-top: 30px; padding: 15px; background: #1e3a5f; border-radius: 8px; text-align: center;">
              <p style="color: white; margin: 0;">
                <a href="https://wa.me/51${phone.replace(/\D/g, '')}" style="color: #25D366; text-decoration: none; font-weight: bold;">
                  📱 Responder por WhatsApp
                </a>
              </p>
            </div>
          </div>
          
          <p style="text-align: center; color: #888; font-size: 12px; margin-top: 20px;">
            Este mensaje fue enviado desde el formulario de contacto de electrinovaperu.com
          </p>
        </body>
        </html>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, data: emailResponse }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: unknown) {
    console.error("Error in send-quote-request function:", error);
    const errorMessage = error instanceof Error ? error.message : "Error desconocido";
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
