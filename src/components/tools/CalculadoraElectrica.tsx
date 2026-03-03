import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, CheckCircle2, AlertTriangle, Zap, ArrowLeft, MessageSquare } from "lucide-react";
import { calcularConductor, type CalcInput, type CalcResult } from "@/lib/electrical-formulas";

export default function CalculadoraElectrica() {
  const [form, setForm] = useState<CalcInput>({
    tipo: "trifasica",
    voltaje: 380,
    carga: 10,
    material: "cobre",
    longitud: 30,
    factorPotencia: 0.9,
  });
  const [result, setResult] = useState<CalcResult | null>(null);

  const handleCalc = () => {
    setResult(calcularConductor(form));
  };

  return (
    <Layout>
      <Helmet>
        <title>Calculadora Eléctrica | Dimensionamiento de Conductores CNE Perú – Electrinova Tools</title>
        <meta name="description" content="Calcula el calibre de conductor, caída de tensión y disyuntor según el Código Nacional de Electricidad del Perú. Herramienta gratuita de Electrinova Perú S.A.C." />
      </Helmet>

      <section className="pt-24 pb-16 section-padding bg-secondary/30">
        <div className="container-custom max-w-4xl">
          <Link to="/tools" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
            <ArrowLeft className="h-4 w-4" /> Volver a Electrinova Tools
          </Link>

          <div className="flex items-center gap-3 mb-2">
            <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center">
              <Calculator className="h-5 w-5 text-primary" />
            </div>
            <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">Calculadora Eléctrica</h1>
          </div>
          <p className="text-muted-foreground mb-8 max-w-2xl">
            Dimensionamiento de conductores, caída de tensión y protecciones basado en el Código Nacional de Electricidad (CNE) del Perú.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Formulario */}
            <Card>
              <CardHeader><CardTitle className="text-lg">Parámetros de Instalación</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label>Tipo</Label>
                    <Select value={form.tipo} onValueChange={(v) => setForm({ ...form, tipo: v as CalcInput["tipo"] })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="monofasica">Monofásica</SelectItem>
                        <SelectItem value="trifasica">Trifásica</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label>Voltaje (V)</Label>
                    <Select value={String(form.voltaje)} onValueChange={(v) => setForm({ ...form, voltaje: Number(v) })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="220">220V</SelectItem>
                        <SelectItem value="380">380V</SelectItem>
                        <SelectItem value="440">440V</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label>Carga (kW)</Label>
                  <Input type="number" min={0.1} step={0.1} value={form.carga} onChange={(e) => setForm({ ...form, carga: Number(e.target.value) })} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label>Material</Label>
                    <Select value={form.material} onValueChange={(v) => setForm({ ...form, material: v as CalcInput["material"] })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cobre">Cobre</SelectItem>
                        <SelectItem value="aluminio">Aluminio</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label>Longitud (m)</Label>
                    <Input type="number" min={1} value={form.longitud} onChange={(e) => setForm({ ...form, longitud: Number(e.target.value) })} />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label>Factor de Potencia</Label>
                  <Input type="number" min={0.5} max={1} step={0.01} value={form.factorPotencia} onChange={(e) => setForm({ ...form, factorPotencia: Number(e.target.value) })} />
                </div>

                <Button onClick={handleCalc} className="w-full bg-primary text-primary-foreground font-semibold">
                  <Zap className="h-4 w-4 mr-2" /> Calcular
                </Button>
              </CardContent>
            </Card>

            {/* Resultado */}
            <div className="space-y-4">
              {result ? (
                <>
                  <Card>
                    <CardHeader><CardTitle className="text-lg">Resultado del Cálculo</CardTitle></CardHeader>
                    <CardContent className="space-y-3">
                      <Row label="Corriente nominal" value={`${result.corriente} A`} />
                      <Row label="Conductor recomendado" value={result.conductorRecomendado} highlight />
                      <Row label="Sección" value={`${result.seccionMm2} mm²`} />
                      <Row label="Caída de tensión" value={`${result.caidaTension}% (${result.caidaTensionV} V)`} />
                      <Row label="Disyuntor sugerido" value={`${result.disyuntorSugerido} A`} />

                      <div className={`flex items-center gap-2 mt-4 p-3 rounded-lg text-sm font-medium ${result.cumpleCNE ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-700"}`}>
                        {result.cumpleCNE ? <CheckCircle2 className="h-4 w-4" /> : <AlertTriangle className="h-4 w-4" />}
                        {result.cumpleCNE
                          ? `Cumple con el límite del ${result.limiteCNE}% del CNE`
                          : `Excede el límite del ${result.limiteCNE}% del CNE. Considere un conductor de mayor sección.`}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-accent/30 bg-accent/5">
                    <CardContent className="p-5">
                      <p className="text-sm text-muted-foreground mb-3">
                        ¿Necesitas un diseño detallado o una cotización formal basada en este resultado?
                      </p>
                      <Button asChild className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-semibold">
                        <Link to="/contacto">
                          <MessageSquare className="h-4 w-4 mr-2" /> Contactar a un Ingeniero
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </>
              ) : (
                <Card className="border-dashed">
                  <CardContent className="p-8 text-center text-muted-foreground">
                    <Calculator className="h-12 w-12 mx-auto mb-3 opacity-30" />
                    <p>Ingresa los parámetros y presiona <strong>Calcular</strong> para obtener el resultado.</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          <p className="text-xs text-muted-foreground mt-8">
            * Cálculos basados en el Código Nacional de Electricidad (CNE) del Perú – Utilización. Los resultados son referenciales y no reemplazan el diseño de un ingeniero colegiado. Electrinova Perú S.A.C. – RUC 20615527590.
          </p>
        </div>
      </section>
    </Layout>
  );
}

function Row({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex justify-between items-center py-1.5 border-b border-border/50 last:border-0">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className={`text-sm font-semibold ${highlight ? "text-primary" : "text-foreground"}`}>{value}</span>
    </div>
  );
}
