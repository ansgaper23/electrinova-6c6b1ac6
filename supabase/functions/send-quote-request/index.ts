import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// --- Rate limiting: max 5 requests per IP per 10 minutes ---
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  if (entry.count >= RATE_LIMIT_MAX) {
    return true;
  }
  entry.count++;
  return false;
}

// --- HTML escaping to prevent XSS/injection in email templates ---
function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// --- Phone sanitization: only digits, spaces, +, -, () ---
function sanitizePhone(phone: string): string {
  return phone.replace(/[^\d\s+\-()]/g, "");
}

interface QuoteRequest {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  message: string;
  utm_data?: Record<string, string>;
}


const handler = async (req: Request): Promise<Response> => {
  console.log("Received request to send-quote-request function");

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Rate limiting by IP
  const clientIp =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";

  if (isRateLimited(clientIp)) {
    console.warn("Rate limit exceeded for IP:", clientIp);
    return new Response(
      JSON.stringify({ success: false, error: "Demasiadas solicitudes. Intenta de nuevo más tarde." }),
      {
        status: 429,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }

  // Enforce max request body size (16 KB)
  const contentLength = req.headers.get("content-length");
  if (contentLength && parseInt(contentLength) > 16384) {
    return new Response(
      JSON.stringify({ success: false, error: "Solicitud demasiado grande." }),
      {
        status: 413,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }

  try {
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not configured");
      throw new Error("RESEND_API_KEY is not configured");
    }

    const resend = new Resend(RESEND_API_KEY);
    const { name, email, phone, projectType, message, utm_data }: QuoteRequest = await req.json();

    // Validate required fields
    if (!name || !email || !phone || !projectType || !message) {
      return new Response(
        JSON.stringify({ success: false, error: "Todos los campos son requeridos" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Server-side length validation
    if (name.length > 100 || email.length > 255 || phone.length > 20 || message.length > 1000) {
      return new Response(
        JSON.stringify({ success: false, error: "Uno o más campos exceden la longitud permitida" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Server-side email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ success: false, error: "Formato de email inválido" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Sanitize and HTML-escape all user inputs before embedding in email
    const safeName = escapeHtml(name.trim());
    const safeEmail = escapeHtml(email.trim());
    const safePhone = escapeHtml(sanitizePhone(phone.trim()));
    const safeProjectType = escapeHtml(projectType.trim());
    const safeMessage = escapeHtml(message.trim());

    // Safe phone digits only for tel/WhatsApp links (strip all non-digits)
    const phoneDigits = phone.replace(/\D/g, "");

    console.log("Processing quote request from:", safeName);

    // Send email to ventas@electrinovaperu.com
    const emailResponse = await resend.emails.send({
      from: "ELECTRINOVA PERÚ <noreply@correo.electrinovaperu.com>",
      to: ["ventas@electrinovaperu.com"],
      reply_to: email,
      subject: `Nueva Cotización: ${safeProjectType} - ${safeName}`,
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
                <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;">${safeName}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0; font-weight: bold;">Email:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;">
                  <a href="mailto:${safeEmail}" style="color: #1e3a5f;">${safeEmail}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0; font-weight: bold;">Teléfono:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0;">
                  <a href="tel:${safePhone}" style="color: #1e3a5f;">${safePhone}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0; font-weight: bold;">Tipo de Proyecto:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e0e0e0; color: #FFD700; font-weight: bold;">${safeProjectType}</td>
              </tr>
            </table>
            
            <h3 style="color: #1e3a5f; margin-top: 25px;">Mensaje del Cliente:</h3>
            <div style="background: white; padding: 15px; border-radius: 8px; border-left: 4px solid #FFD700;">
              <p style="margin: 0; white-space: pre-wrap;">${safeMessage}</p>
            </div>
            
            <div style="margin-top: 30px; padding: 15px; background: #1e3a5f; border-radius: 8px; text-align: center;">
              <p style="color: white; margin: 0;">
                <a href="https://wa.me/51${phoneDigits}" style="color: #25D366; text-decoration: none; font-weight: bold;">
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

    console.log("Email sent successfully");

    return new Response(JSON.stringify({ success: true, data: emailResponse }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: unknown) {
    console.error("Error in send-quote-request function:", error);
    return new Response(
      JSON.stringify({ success: false, error: "Error al procesar la solicitud. Intenta de nuevo." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
