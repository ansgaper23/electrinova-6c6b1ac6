/**
 * Fórmulas de Ingeniería Eléctrica basadas en el Código Nacional de Electricidad (CNE) del Perú.
 *
 * Referencias:
 *  - NTP 370.252 (Conductores de cobre y aluminio)
 *  - CNE Utilización – Sección 050 (Caída de tensión máxima permitida: 2.5% en alimentadores, 1.5% en circuitos derivados)
 *  - IEEE Std 141 (Red Book) para factores de potencia y corrección
 *
 * Resistividades a 75 °C (Ω·mm²/m):
 *   Cobre:   0.01786
 *   Aluminio: 0.02941
 */

// ─── Tabla de conductores AWG / kcmil ─────────────────────────────
export interface ConductorEntry {
  awg: string;
  sectionMm2: number;
  ampacityCu: number;   // Ampacidad en cobre (75 °C, conduit)
  ampacityAl: number;   // Ampacidad en aluminio (75 °C, conduit)
}

export const CONDUCTOR_TABLE: ConductorEntry[] = [
  { awg: "14 AWG",  sectionMm2: 2.08,   ampacityCu: 15,  ampacityAl: 0  },
  { awg: "12 AWG",  sectionMm2: 3.31,   ampacityCu: 20,  ampacityAl: 15 },
  { awg: "10 AWG",  sectionMm2: 5.26,   ampacityCu: 30,  ampacityAl: 25 },
  { awg: "8 AWG",   sectionMm2: 8.37,   ampacityCu: 40,  ampacityAl: 30 },
  { awg: "6 AWG",   sectionMm2: 13.30,  ampacityCu: 55,  ampacityAl: 40 },
  { awg: "4 AWG",   sectionMm2: 21.15,  ampacityCu: 70,  ampacityAl: 55 },
  { awg: "2 AWG",   sectionMm2: 33.62,  ampacityCu: 95,  ampacityAl: 75 },
  { awg: "1/0 AWG", sectionMm2: 53.49,  ampacityCu: 125, ampacityAl: 100 },
  { awg: "2/0 AWG", sectionMm2: 67.43,  ampacityCu: 145, ampacityAl: 115 },
  { awg: "3/0 AWG", sectionMm2: 85.01,  ampacityCu: 165, ampacityAl: 130 },
  { awg: "4/0 AWG", sectionMm2: 107.2,  ampacityCu: 195, ampacityAl: 155 },
  { awg: "250 kcmil", sectionMm2: 126.7, ampacityCu: 215, ampacityAl: 170 },
  { awg: "350 kcmil", sectionMm2: 177.3, ampacityCu: 260, ampacityAl: 210 },
  { awg: "500 kcmil", sectionMm2: 253.4, ampacityCu: 320, ampacityAl: 260 },
];

// ─── Tabla de disyuntores estándar ────────────────────────────────
export const BREAKER_RATINGS = [6, 10, 16, 20, 25, 32, 40, 50, 63, 80, 100, 125, 160, 200, 250, 315, 400, 500, 630];

// ─── Resistividad (Ω·mm²/m) a 75 °C ─────────────────────────────
const RESISTIVITY: Record<string, number> = {
  cobre: 0.01786,
  aluminio: 0.02941,
};

export interface CalcInput {
  tipo: "monofasica" | "trifasica";
  voltaje: number;      // V
  carga: number;        // kW
  material: "cobre" | "aluminio";
  longitud: number;     // metros
  factorPotencia?: number; // default 0.9
}

export interface CalcResult {
  corriente: number;          // A
  conductorRecomendado: string;
  seccionMm2: number;
  caidaTension: number;       // %
  caidaTensionV: number;      // V
  disyuntorSugerido: number;  // A
  cumpleCNE: boolean;
  limiteCNE: number;          // % máximo según CNE
}

/**
 * Calcula corriente, conductor mínimo, caída de tensión y disyuntor.
 *
 * Corriente:
 *   Monofásica:  I = P / (V × FP)
 *   Trifásica:   I = P / (√3 × V × FP)
 *
 * Caída de tensión (%):
 *   Monofásica:  ΔV% = (2 × ρ × L × I) / (S × V) × 100
 *   Trifásica:   ΔV% = (√3 × ρ × L × I) / (S × V) × 100
 */
export function calcularConductor(input: CalcInput): CalcResult {
  const fp = input.factorPotencia ?? 0.9;
  const rho = RESISTIVITY[input.material];

  // 1. Corriente nominal
  const corriente =
    input.tipo === "monofasica"
      ? (input.carga * 1000) / (input.voltaje * fp)
      : (input.carga * 1000) / (Math.sqrt(3) * input.voltaje * fp);

  // 2. Seleccionar conductor por ampacidad (corriente × 1.25 por seguridad CNE)
  const corrienteDiseno = corriente * 1.25;
  const ampKey = input.material === "cobre" ? "ampacityCu" : "ampacityAl";

  let conductor = CONDUCTOR_TABLE[CONDUCTOR_TABLE.length - 1];
  for (const entry of CONDUCTOR_TABLE) {
    if (entry[ampKey] >= corrienteDiseno) {
      conductor = entry;
      break;
    }
  }

  // 3. Caída de tensión
  const factor = input.tipo === "monofasica" ? 2 : Math.sqrt(3);
  const caidaV = (factor * rho * input.longitud * corriente) / conductor.sectionMm2;
  const caidaPct = (caidaV / input.voltaje) * 100;

  // 4. Disyuntor sugerido
  const breakerMin = corrienteDiseno;
  let breaker = BREAKER_RATINGS[BREAKER_RATINGS.length - 1];
  for (const b of BREAKER_RATINGS) {
    if (b >= breakerMin) {
      breaker = b;
      break;
    }
  }

  // 5. Cumplimiento CNE (2.5% alimentadores como referencia general)
  const limiteCNE = 2.5;

  return {
    corriente: Math.round(corriente * 100) / 100,
    conductorRecomendado: conductor.awg,
    seccionMm2: conductor.sectionMm2,
    caidaTension: Math.round(caidaPct * 100) / 100,
    caidaTensionV: Math.round(caidaV * 100) / 100,
    disyuntorSugerido: breaker,
    cumpleCNE: caidaPct <= limiteCNE,
    limiteCNE,
  };
}
