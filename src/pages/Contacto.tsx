import { useState } from "react";
import { Zap, Phone, Mail, MapPin, Clock, Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Layout } from "@/components/layout/Layout";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

// Esquema de validación
const contactSchema = z.object({
  name: z.string().trim().min(2, "El nombre debe tener al menos 2 caracteres").max(100, "El nombre es muy largo"),
  email: z.string().trim().email("Ingresa un email válido").max(255, "El email es muy largo"),
  phone: z.string().trim().min(9, "Ingresa un teléfono válido").max(20, "El teléfono es muy largo"),
  projectType: z.string().min(1, "Selecciona un tipo de proyecto"),
  message: z.string().trim().min(10, "El mensaje debe tener al menos 10 caracteres").max(1000, "El mensaje es muy largo"),
});

type ContactFormData = z.infer<typeof contactSchema>;

// Tipos de proyecto
const projectTypes = [
  "Instalación Eléctrica Industrial",
  "Instalación Eléctrica Residencial",
  "Instalación Eléctrica Comercial",
  "Media Tensión",
  "Pozos a Tierra",
  "Mantenimiento de Transformadores",
  "Tableros Eléctricos",
  "Motores Eléctricos",
  "Mantenimiento Industrial",
  "CCTV / Videovigilancia",
  "Otro",
];

// Información de contacto
const contactInfo = [
  {
    icon: Phone,
    title: "Teléfono",
    details: ["934 014 639"],
    link: "tel:+51934014639",
  },
  {
    icon: Mail,
    title: "Email",
    details: ["ventas@electrinovaperu.com"],
    link: "mailto:ventas@electrinovaperu.com",
  },
  {
    icon: MapPin,
    title: "Dirección",
    details: ["Lima, Perú"],
    link: "https://maps.google.com",
  },
  {
    icon: Clock,
    title: "Horario",
    details: ["Lun - Vie: 8:00 AM - 6:00 PM", "Sáb: 9:00 AM - 1:00 PM"],
    link: null,
  },
];

const Contacto = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof ContactFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, projectType: value }));
    if (errors.projectType) {
      setErrors(prev => ({ ...prev, projectType: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      // Validar datos
      const validatedData = contactSchema.parse(formData);
      
      // Simular envío (aquí se integraría con un backend real)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsSuccess(true);
      toast({
        title: "¡Mensaje enviado!",
        description: "Nos pondremos en contacto contigo pronto.",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        projectType: "",
        message: "",
      });

      // Reset success state after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {};
        error.errors.forEach(err => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as keyof ContactFormData] = err.message;
          }
        });
        setErrors(fieldErrors);
      } else {
        toast({
          title: "Error",
          description: "Hubo un problema al enviar el mensaje. Intenta de nuevo.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-16 gradient-hero">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 text-accent font-semibold mb-4">
              <Zap className="h-5 w-5" />
              Estamos para Ayudarte
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
              <span className="text-gradient-accent">Contáctanos</span>
            </h1>
            <p className="text-lg text-primary-foreground/80">
              ¿Tienes un proyecto en mente? Cuéntanos sobre tus necesidades eléctricas 
              y te brindaremos una cotización personalizada sin compromiso.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  Información de Contacto
                </h2>
                <p className="text-muted-foreground">
                  Estamos disponibles para atender tus consultas. No dudes en comunicarte 
                  con nosotros por cualquiera de estos medios.
                </p>
              </div>

              <div className="space-y-4">
                {contactInfo.map((info) => (
                  <Card key={info.title} className="border border-border/50">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <info.icon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground mb-1">{info.title}</h3>
                          {info.details.map((detail, index) => (
                            info.link ? (
                              <a 
                                key={index}
                                href={info.link}
                                className="block text-sm text-muted-foreground hover:text-accent transition-colors"
                              >
                                {detail}
                              </a>
                            ) : (
                              <p key={index} className="text-sm text-muted-foreground">{detail}</p>
                            )
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* WhatsApp CTA */}
              <Card className="border-0 bg-green-500 text-white">
                <CardContent className="p-6 text-center">
                  <h3 className="font-semibold text-lg mb-2">¿Prefieres WhatsApp?</h3>
                  <p className="text-white/90 text-sm mb-4">
                    Escríbenos directamente y te responderemos lo antes posible.
                  </p>
                  <a
                    href={`https://wa.me/51934014639?text=${encodeURIComponent("Hola, me gustaría solicitar información sobre los servicios eléctricos de ELECTRINOVA PERÚ.")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-white text-green-600 font-semibold px-6 py-3 rounded-lg hover:bg-white/90 transition-colors"
                  >
                    Escribir por WhatsApp
                  </a>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="border border-border/50 shadow-lg">
                <CardContent className="p-8">
                  {isSuccess ? (
                    <div className="text-center py-12">
                      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 text-green-600 mb-6">
                        <CheckCircle2 className="h-10 w-10" />
                      </div>
                      <h3 className="text-2xl font-bold text-foreground mb-2">¡Mensaje Enviado!</h3>
                      <p className="text-muted-foreground">
                        Gracias por contactarnos. Nos comunicaremos contigo pronto.
                      </p>
                    </div>
                  ) : (
                    <>
                      <h2 className="text-2xl font-bold text-foreground mb-6">
                        Solicita tu Cotización
                      </h2>
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="name">Nombre Completo *</Label>
                            <Input
                              id="name"
                              name="name"
                              placeholder="Tu nombre"
                              value={formData.name}
                              onChange={handleChange}
                              className={errors.name ? "border-destructive" : ""}
                            />
                            {errors.name && (
                              <p className="text-sm text-destructive">{errors.name}</p>
                            )}
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email *</Label>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              placeholder="tu@email.com"
                              value={formData.email}
                              onChange={handleChange}
                              className={errors.email ? "border-destructive" : ""}
                            />
                            {errors.email && (
                              <p className="text-sm text-destructive">{errors.email}</p>
                            )}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="phone">Teléfono *</Label>
                            <Input
                              id="phone"
                              name="phone"
                              placeholder="+51 999 999 999"
                              value={formData.phone}
                              onChange={handleChange}
                              className={errors.phone ? "border-destructive" : ""}
                            />
                            {errors.phone && (
                              <p className="text-sm text-destructive">{errors.phone}</p>
                            )}
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="projectType">Tipo de Proyecto *</Label>
                            <Select value={formData.projectType} onValueChange={handleSelectChange}>
                              <SelectTrigger className={errors.projectType ? "border-destructive" : ""}>
                                <SelectValue placeholder="Selecciona una opción" />
                              </SelectTrigger>
                              <SelectContent>
                                {projectTypes.map((type) => (
                                  <SelectItem key={type} value={type}>
                                    {type}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            {errors.projectType && (
                              <p className="text-sm text-destructive">{errors.projectType}</p>
                            )}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="message">Mensaje *</Label>
                          <Textarea
                            id="message"
                            name="message"
                            placeholder="Cuéntanos sobre tu proyecto o consulta..."
                            rows={5}
                            value={formData.message}
                            onChange={handleChange}
                            className={errors.message ? "border-destructive" : ""}
                          />
                          {errors.message && (
                            <p className="text-sm text-destructive">{errors.message}</p>
                          )}
                        </div>

                        <Button 
                          type="submit" 
                          size="lg" 
                          className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-semibold"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <>
                              <div className="h-5 w-5 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                              Enviando...
                            </>
                          ) : (
                            <>
                              <Send className="h-5 w-5 mr-2" />
                              Enviar Mensaje
                            </>
                          )}
                        </Button>

                        <p className="text-sm text-muted-foreground text-center">
                          Al enviar este formulario, aceptas nuestra política de privacidad.
                        </p>
                      </form>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section (placeholder) */}
      <section className="h-96 bg-muted relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              Aquí se mostrará el mapa de ubicación
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contacto;
