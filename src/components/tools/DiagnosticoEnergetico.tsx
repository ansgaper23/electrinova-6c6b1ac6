import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { BarChart3, ArrowLeft, MessageSquare, Zap, TrendingDown } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { calcularDiagnostico, type DiagnosticInput, type DiagnosticResult } from "@/lib/energy-diagnostic";

export default function DiagnosticoEnergetico() {
  const [form, setForm] = useState<DiagnosticInput>({
    iluminacion: "fluorescente",
    motorAntiguedad: "5a15",
    bancosCapacitores: false,
    horasOperacion: 12,
    consumoMensualKwh: 5000,
    tarifahkwh: 0.60,
  });
  const [result, setResult] = useState<DiagnosticResult | null>(null);

  const handleCalc = () => setResult(calcularDiagnostico(form));

  const chartData = result
    ? [
        { name: "Consumo Actual", value: result.consumoActual, color: "hsl(var(--primary))" },
        { name: "Consumo Optimizado", value: result.consumoOptimizado, color: "hsl(var(--accent))" },
      ]
    : [];

  return (
    <Layout>
      <Helmet>
        <title>Diagnóstico Energético | Ahorro de Energía Industrial – Electrinova Tools</title>
        <meta name="description" content="Analiza tu consumo eléctrico industrial y descubre oportunidades de ahorro energético. Estimación basada en normas MINEM y OSINERGMIN. Electrinova Perú." />
      </Helmet>

      <section className="pt-24 pb-16 section-padding bg-secondary/30">
        <div className="container-custom max-w-4xl">
          <Link to="/tools" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
            <ArrowLeft className="h-4 w-4" /> Volver a Electrinova Tools
          </Link>

          <div className="flex items-center gap-3 mb-2">
            <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center">
              <BarChart3 className="h-5 w-5 text-primary" />
            </div>
            <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">Diagnóstico Energético</h1>
          </div>
          <p className="text-muted-foreground mb-8 max-w-2xl">
            Análisis de consumo y recomendaciones de eficiencia energética para instalaciones industriales.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader><CardTitle className="text-lg">Datos de tu Instalación</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1.5">
                  <Label>Tipo de Iluminación</Label>
                  <Select value={form.iluminacion} onValueChange={(v) => setForm({ ...form, iluminacion: v as DiagnosticInput["iluminacion"] })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="incandescente">Incandescente / Halógena</SelectItem>
                      <SelectItem value="fluorescente">Fluorescente</SelectItem>
                      <SelectItem value="led">LED</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label>Antigüedad de Motores</Label>
                  <Select value={form.motorAntiguedad} onValueChange={(v) => setForm({ ...form, motorAntiguedad: v as DiagnosticInput["motorAntiguedad"] })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="menos5">Menos de 5 años</SelectItem>
                      <SelectItem value="5a15">5 a 15 años</SelectItem>
                      <SelectItem value="mas15">Más de 15 años</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <Label>¿Tiene bancos de capacitores?</Label>
                  <Switch checked={form.bancosCapacitores} onCheckedChange={(v) => setForm({ ...form, bancosCapacitores: v })} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label>Horas de operación/día</Label>
                    <Input type="number" min={1} max={24} value={form.horasOperacion} onChange={(e) => setForm({ ...form, horasOperacion: Number(e.target.value) })} />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Consumo mensual (kWh)</Label>
                    <Input type="number" min={100} value={form.consumoMensualKwh} onChange={(e) => setForm({ ...form, consumoMensualKwh: Number(e.target.value) })} />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label>Tarifa eléctrica (S/./kWh)</Label>
                  <Input type="number" min={0.1} step={0.01} value={form.tarifahkwh} onChange={(e) => setForm({ ...form, tarifahkwh: Number(e.target.value) })} />
                </div>

                <Button onClick={handleCalc} className="w-full bg-primary text-primary-foreground font-semibold">
                  <Zap className="h-4 w-4 mr-2" /> Analizar
                </Button>
              </CardContent>
            </Card>

            <div className="space-y-4">
              {result ? (
                <>
                  {/* Chart */}
                  <Card>
                    <CardHeader><CardTitle className="text-lg">Consumo Actual vs. Potencial</CardTitle></CardHeader>
                    <CardContent>
                      <div className="h-48">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={chartData} barSize={60}>
                            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                            <YAxis tick={{ fontSize: 12 }} />
                            <Tooltip formatter={(val: number) => `${val.toLocaleString()} kWh`} />
                            <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                              {chartData.map((entry, idx) => (
                                <Cell key={idx} fill={entry.color} />
                              ))}
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="flex items-center gap-2 mt-3 p-3 rounded-lg bg-accent/10 text-accent font-semibold text-sm">
                        <TrendingDown className="h-4 w-4" />
                        Ahorro potencial: {result.ahorroPorcentaje}% ({result.ahorroEstimadoKwh.toLocaleString()} kWh / S/. {result.ahorroEstimadoSoles.toLocaleString()}/mes)
                      </div>
                    </CardContent>
                  </Card>

                  {/* Recommendations */}
                  <Card>
                    <CardHeader><CardTitle className="text-lg">Recomendaciones</CardTitle></CardHeader>
                    <CardContent className="space-y-3">
                      {result.detalles.map((d) => (
                        <div key={d.categoria} className="border-b border-border/50 pb-3 last:border-0 last:pb-0">
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-semibold text-sm text-foreground">{d.categoria}</span>
                            {d.ahorroKwh > 0 && <span className="text-xs text-accent font-medium">-{d.ahorroPct}%</span>}
                          </div>
                          <p className="text-xs text-muted-foreground">{d.recomendacion}</p>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  <Card className="border-accent/30 bg-accent/5">
                    <CardContent className="p-5">
                      <p className="text-sm text-muted-foreground mb-3">
                        ¿Necesitas una auditoría energética profesional o la ejecución de estas mejoras?
                      </p>
                      <Button asChild className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-semibold">
                        <Link to="/contacto"><MessageSquare className="h-4 w-4 mr-2" /> Contactar a un Ingeniero</Link>
                      </Button>
                    </CardContent>
                  </Card>
                </>
              ) : (
                <Card className="border-dashed">
                  <CardContent className="p-8 text-center text-muted-foreground">
                    <BarChart3 className="h-12 w-12 mx-auto mb-3 opacity-30" />
                    <p>Completa los datos de tu instalación y presiona <strong>Analizar</strong>.</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          <p className="text-xs text-muted-foreground mt-8">
            * Estimaciones basadas en estándares del MINEM y OSINERGMIN. Los resultados son referenciales. Para un diagnóstico completo, solicite una auditoría con nuestro equipo. Electrinova Perú S.A.C. – RUC 20615527590.
          </p>
        </div>
      </section>
    </Layout>
  );
}
