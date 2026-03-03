/**
 * Algoritmos de estimación para el Diagnóstico Energético.
 *
 * Basado en estándares del Ministerio de Energía y Minas del Perú (MINEM)
 * y guías de eficiencia energética de OSINERGMIN.
 *
 * Los porcentajes de ahorro son estimaciones conservadoras para
 * instalaciones industriales típicas en Perú.
 */

export interface DiagnosticInput {
  iluminacion: "incandescente" | "fluorescente" | "led";
  motorAntiguedad: "menos5" | "5a15" | "mas15";
  bancosCapacitores: boolean;
  horasOperacion: number; // horas/día
  consumoMensualKwh: number;
  tarifahkwh: number; // S/. por kWh (default ~0.60)
}

export interface DiagnosticResult {
  consumoActual: number;
  consumoOptimizado: number;
  ahorroEstimadoKwh: number;
  ahorroEstimadoSoles: number;
  ahorroPorcentaje: number;
  detalles: {
    categoria: string;
    ahorroKwh: number;
    ahorroPct: number;
    recomendacion: string;
  }[];
}

export function calcularDiagnostico(input: DiagnosticInput): DiagnosticResult {
  const detalles: DiagnosticResult["detalles"] = [];
  let ahorroTotalKwh = 0;

  // 1. Iluminación
  const ilumPct =
    input.iluminacion === "incandescente" ? 0.15
    : input.iluminacion === "fluorescente" ? 0.06
    : 0;
  if (ilumPct > 0) {
    const ahorro = input.consumoMensualKwh * ilumPct;
    ahorroTotalKwh += ahorro;
    detalles.push({
      categoria: "Iluminación",
      ahorroKwh: Math.round(ahorro),
      ahorroPct: Math.round(ilumPct * 100),
      recomendacion:
        input.iluminacion === "incandescente"
          ? "Migrar a tecnología LED para reducir hasta un 80% en iluminación."
          : "Actualizar de fluorescente a LED de alta eficiencia.",
    });
  }

  // 2. Motores
  const motorPct =
    input.motorAntiguedad === "mas15" ? 0.12
    : input.motorAntiguedad === "5a15" ? 0.05
    : 0;
  if (motorPct > 0) {
    const ahorro = input.consumoMensualKwh * motorPct;
    ahorroTotalKwh += ahorro;
    detalles.push({
      categoria: "Motores Eléctricos",
      ahorroKwh: Math.round(ahorro),
      ahorroPct: Math.round(motorPct * 100),
      recomendacion:
        input.motorAntiguedad === "mas15"
          ? "Reemplazar motores antiguos por motores IE3/IE4 de alta eficiencia y variadores de velocidad."
          : "Evaluar variadores de velocidad (VFD) para optimizar motores existentes.",
    });
  }

  // 3. Factor de potencia
  if (!input.bancosCapacitores) {
    const fpPct = 0.05;
    const ahorro = input.consumoMensualKwh * fpPct;
    ahorroTotalKwh += ahorro;
    detalles.push({
      categoria: "Factor de Potencia",
      ahorroKwh: Math.round(ahorro),
      ahorroPct: Math.round(fpPct * 100),
      recomendacion:
        "Instalar bancos de capacitores para corregir el factor de potencia y evitar penalizaciones tarifarias de OSINERGMIN.",
    });
  }

  // 4. Horas de operación (mayor uso → mayor potencial de optimización de horarios)
  if (input.horasOperacion > 16) {
    const horarioPct = 0.04;
    const ahorro = input.consumoMensualKwh * horarioPct;
    ahorroTotalKwh += ahorro;
    detalles.push({
      categoria: "Gestión de Horarios",
      ahorroKwh: Math.round(ahorro),
      ahorroPct: Math.round(horarioPct * 100),
      recomendacion:
        "Implementar sistemas de automatización y control horario (SCADA) para reducir consumo en horas punta.",
    });
  }

  if (detalles.length === 0) {
    detalles.push({
      categoria: "Estado General",
      ahorroKwh: 0,
      ahorroPct: 0,
      recomendacion:
        "Su instalación ya cuenta con buenas prácticas de eficiencia. Solicite una auditoría detallada para identificar mejoras puntuales.",
    });
  }

  const consumoOptimizado = input.consumoMensualKwh - ahorroTotalKwh;

  return {
    consumoActual: input.consumoMensualKwh,
    consumoOptimizado: Math.round(consumoOptimizado),
    ahorroEstimadoKwh: Math.round(ahorroTotalKwh),
    ahorroEstimadoSoles: Math.round(ahorroTotalKwh * input.tarifahkwh * 100) / 100,
    ahorroPorcentaje: Math.round((ahorroTotalKwh / input.consumoMensualKwh) * 100),
    detalles,
  };
}
