import { useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/seo/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { FileText, ArrowLeft, ArrowRight, Download, MessageSquare, CheckCircle2 } from "lucide-react";

const ENSAYOS = [
  { value: "aislamiento", label: "Ensayo de Aislamiento" },
  { value: "pozo_tierra", label: "Pozo a Tierra" },
  { value: "continuidad", label: "Continuidad Eléctrica" },
];

interface FormData {
  cliente: string;
  ruc: string;
  direccion: string;
  tipoEnsayo: string;
  mediciones: string;
  firma: string;
  fecha: string;
}

const INITIAL: FormData = {
  cliente: "",
  ruc: "",
  direccion: "",
  tipoEnsayo: "aislamiento",
  mediciones: "",
  firma: "",
  fecha: new Date().toISOString().slice(0, 10),
};

export default function GeneradorProtocolos() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>(INITIAL);
  const [generated, setGenerated] = useState(false);

  const set = (key: keyof FormData, val: string) => setForm((p) => ({ ...p, [key]: val }));

  const canNext =
    step === 0 ? form.cliente.trim() && form.ruc.trim()
    : step === 1 ? !!form.tipoEnsayo
    : step === 2 ? form.mediciones.trim().length > 0
    : true;

  const generatePDF = async () => {
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF();
    const ensayoLabel = ENSAYOS.find((e) => e.value === form.tipoEnsayo)?.label ?? form.tipoEnsayo;

    // Header
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("ELECTRINOVA PERÚ S.A.C.", 105, 20, { align: "center" });
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("RUC: 20615527590 | Tel: 938 852 610", 105, 27, { align: "center" });

    doc.setDrawColor(0, 82, 155);
    doc.setLineWidth(0.8);
    doc.line(20, 32, 190, 32);

    // Title
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text(`PROTOCOLO DE ${ensayoLabel.toUpperCase()}`, 105, 42, { align: "center" });

    // Client info
    let y = 55;
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("DATOS DEL CLIENTE", 20, y);
    y += 7;
    doc.setFont("helvetica", "normal");
    doc.text(`Cliente: ${form.cliente}`, 20, y); y += 6;
    doc.text(`RUC: ${form.ruc}`, 20, y); y += 6;
    doc.text(`Dirección: ${form.direccion}`, 20, y); y += 6;
    doc.text(`Fecha: ${form.fecha}`, 20, y); y += 12;

    // Mediciones
    doc.setFont("helvetica", "bold");
    doc.text("MEDICIONES Y RESULTADOS", 20, y); y += 7;
    doc.setFont("helvetica", "normal");
    const lines = doc.splitTextToSize(form.mediciones, 170);
    doc.text(lines, 20, y);
    y += lines.length * 5 + 10;

    // Firma
    doc.setFont("helvetica", "bold");
    doc.text("RESPONSABLE", 20, y); y += 7;
    doc.setFont("helvetica", "normal");
    doc.text(form.firma || "________________________", 20, y); y += 15;

    // Footer
    doc.setFontSize(8);
    doc.setTextColor(128);
    doc.text("Documento generado por Electrinova Tools – electrinovaperu.com", 105, 285, { align: "center" });
    doc.text("Este protocolo es referencial. La validación oficial debe ser realizada por un ingeniero colegiado.", 105, 290, { align: "center" });

    doc.save(`protocolo-${form.tipoEnsayo}-${form.fecha}.pdf`);
    setGenerated(true);
  };

  const steps = ["Datos del Cliente", "Tipo de Ensayo", "Mediciones", "Firma y Generación"];

  return (
    <Layout>
      <SEO
        title="Generador de protocolos eléctricos en PDF | Electrinova Tools"
        description="Genera protocolos estandarizados: aislamiento, pozo a tierra y continuidad eléctrica. Exporta documentación técnica profesional en PDF."
        path="/tools/generador-protocolos"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "Generador de Protocolos Eléctricos",
          applicationCategory: "EngineeringApplication",
          operatingSystem: "Web",
          url: "https://electrinovaperu.com/tools/generador-protocolos",
          description:
            "Generador de protocolos de ensayo eléctrico estandarizados con exportación a PDF.",
          offers: { "@type": "Offer", price: "0", priceCurrency: "PEN" },
        }}
      />

      <section className="pt-24 pb-16 section-padding bg-secondary/30">
        <div className="container-custom max-w-3xl">
          <Link to="/tools" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
            <ArrowLeft className="h-4 w-4" /> Volver a Electrinova Tools
          </Link>

          <div className="flex items-center gap-3 mb-2">
            <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">Generador de Protocolos</h1>
          </div>
          <p className="text-muted-foreground mb-8">
            Documentación técnica estandarizada para entrega de proyectos eléctricos.
          </p>

          {/* Stepper */}
          <div className="flex items-center gap-1 mb-8 overflow-x-auto">
            {steps.map((s, i) => (
              <div key={s} className="flex items-center gap-1 flex-shrink-0">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${i <= step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                  {i < step ? <CheckCircle2 className="h-4 w-4" /> : i + 1}
                </div>
                <span className={`text-xs hidden sm:inline ${i <= step ? "text-foreground font-medium" : "text-muted-foreground"}`}>{s}</span>
                {i < steps.length - 1 && <div className={`w-6 h-0.5 ${i < step ? "bg-primary" : "bg-muted"}`} />}
              </div>
            ))}
          </div>

          <Card>
            <CardHeader><CardTitle className="text-lg">{steps[step]}</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {step === 0 && (
                <>
                  <div className="space-y-1.5"><Label>Nombre / Razón Social</Label><Input value={form.cliente} onChange={(e) => set("cliente", e.target.value)} placeholder="Empresa S.A.C." /></div>
                  <div className="space-y-1.5"><Label>RUC</Label><Input value={form.ruc} onChange={(e) => set("ruc", e.target.value)} placeholder="20XXXXXXXXX" maxLength={11} /></div>
                  <div className="space-y-1.5"><Label>Dirección</Label><Input value={form.direccion} onChange={(e) => set("direccion", e.target.value)} placeholder="Av. Industrial 123, Lima" /></div>
                </>
              )}
              {step === 1 && (
                <div className="space-y-1.5">
                  <Label>Tipo de Ensayo</Label>
                  <Select value={form.tipoEnsayo} onValueChange={(v) => set("tipoEnsayo", v)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {ENSAYOS.map((e) => <SelectItem key={e.value} value={e.value}>{e.label}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              )}
              {step === 2 && (
                <div className="space-y-1.5">
                  <Label>Mediciones y Resultados</Label>
                  <Textarea rows={6} value={form.mediciones} onChange={(e) => set("mediciones", e.target.value)} placeholder={"Punto 1: 5.2 Ω\nPunto 2: 3.8 Ω\nObservaciones: Valores dentro de rango normativo."} />
                </div>
              )}
              {step === 3 && (
                <>
                  <div className="space-y-1.5"><Label>Responsable / Firma</Label><Input value={form.firma} onChange={(e) => set("firma", e.target.value)} placeholder="Ing. Juan Pérez – CIP 123456" /></div>
                  <div className="space-y-1.5"><Label>Fecha</Label><Input type="date" value={form.fecha} onChange={(e) => set("fecha", e.target.value)} /></div>

                  <Button onClick={generatePDF} className="w-full bg-primary text-primary-foreground font-semibold">
                    <Download className="h-4 w-4 mr-2" /> Generar PDF
                  </Button>

                  {generated && (
                    <Card className="border-accent/30 bg-accent/5 mt-4">
                      <CardContent className="p-5">
                        <p className="text-sm text-muted-foreground mb-3">
                          ¿Necesitas un protocolo oficial con validación de un ingeniero colegiado?
                        </p>
                        <Button asChild className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-semibold">
                          <Link to="/contacto"><MessageSquare className="h-4 w-4 mr-2" /> Contactar a un Ingeniero</Link>
                        </Button>
                      </CardContent>
                    </Card>
                  )}
                </>
              )}

              <div className="flex justify-between pt-2">
                <Button variant="outline" disabled={step === 0} onClick={() => setStep(step - 1)}>
                  <ArrowLeft className="h-4 w-4 mr-1" /> Anterior
                </Button>
                {step < 3 && (
                  <Button disabled={!canNext} onClick={() => setStep(step + 1)}>
                    Siguiente <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          <p className="text-xs text-muted-foreground mt-8">
            * Los protocolos generados son referenciales. La validación oficial debe ser realizada por un ingeniero colegiado. Electrinova Perú S.A.C. – RUC 20615527590.
          </p>
        </div>
      </section>
    </Layout>
  );
}
