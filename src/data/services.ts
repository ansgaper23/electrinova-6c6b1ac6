// Importar imágenes de servicios
import aireAcondicionadoImg from "@/assets/services/aire-acondicionado.jpg";
import subestacionesImg from "@/assets/services/subestaciones.jpg";
import tablerosMtBtImg from "@/assets/services/tableros-mt-bt.jpg";
import pozosTierraImg from "@/assets/services/pozos-tierra.jpg";
import bandejasImg from "@/assets/services/bandejas.jpg";
import cableadoImg from "@/assets/services/cableado.jpg";
import automatizacionImg from "@/assets/services/automatizacion.jpg";
import instalacionesElectricasImg from "@/assets/services/instalaciones-electricas.jpg";
import tablerosElectricosImg from "@/assets/services/tableros-electricos.jpg";
import tuberiasConduitImg from "@/assets/services/tuberias-conduit.jpg";
import indeciImg from "@/assets/services/indeci-itse.jpg";

export interface Service {
  title: string;
  description: string;
  image: string;
  features?: string[];
}

// Servicios reales extraídos del brochure
export const services: Service[] = [
  {
    title: "Mantenimiento de Aire Acondicionado",
    description: "Trabajamos con el sistema HVAC y sistemas industriales tipo chiller R410 y R22.",
    image: aireAcondicionadoImg,
    features: [
      "Sistema HVAC (ventilación y climatización)",
      "Sistemas industriales chiller R410, R22"
    ]
  },
  {
    title: "Mantenimiento de Sub Estaciones",
    description: "Mantenimientos preventivos y correctivos con pruebas mecánicas, eléctricas y dieléctricas.",
    image: subestacionesImg,
    features: [
      "Mantenimiento preventivo y correctivo",
      "Lubricación y verificación de componentes",
      "Pruebas mecánicas, eléctricas y dieléctricas",
      "Mantenimiento de transformadores de media tensión"
    ]
  },
  {
    title: "Mantenimiento de Tableros MT - BT",
    description: "Inspecciones del equipamiento eléctrico para detectar problemas y aplicar acciones correctivas.",
    image: tablerosMtBtImg,
    features: [
      "Mantenimiento preventivo y correctivo",
      "Inspección del equipamiento eléctrico",
      "Detección y corrección de problemas",
      "Reparación de tableros eléctricos industriales urgencias"
    ]
  },
  {
    title: "Mantenimiento de Pozos a Tierra",
    description: "Mantenimiento, reactivación, diseño y construcción de pozos a tierra con protocolos certificados.",
    image: pozosTierraImg,
    features: [
      "Mantenimiento y reactivación de pozos",
      "Medición con telurómetro digital certificado",
      "Protocolos firmados por Ing. Electricista habilitado",
      "Certificado de operatividad de pozo a tierra"
    ]
  },
  {
    title: "Montaje de Bandejas",
    description: "Montaje de tuberías conduit, ductos y bandejas portacables para instalaciones industriales.",
    image: bandejasImg,
    features: [
      "Tuberías conduit livianas y pesadas",
      "Tuberías anti-explosión",
      "Ductos de concreto y tubos guías"
    ]
  },
  {
    title: "Conexionado y Cableado Estructurado",
    description: "Cableado de distribución, fuerza, control e instrumentación con certificación.",
    image: cableadoImg,
    features: [
      "Cableado de distribución y fuerza",
      "Red profibus PA y DP, fibra óptica",
      "Sistema clase D ISO/IEC 11801 Cat 5e, 6A, 7"
    ]
  },
  {
    title: "Automatización",
    description: "Programación de PLC Allen Bradley, Siemens y desarrollo de proyectos de automatización.",
    image: automatizacionImg,
    features: [
      "CompactLogix and ControlLogix",
      "SLC, Micrologix, PLC 5",
      "Panel View Plus, redes Ethernet/ControlNet"
    ]
  },
  {
    title: "Instalaciones Eléctricas",
    description: "Instalaciones industriales, montaje de bandejas, tableros de control y paneles de instrumentación.",
    image: instalacionesElectricasImg,
    features: [
      "Iluminación industrial, almacenes, minería",
      "Montaje de bandejas portacables",
      "Tableros de fuerza, control y autosoportados"
    ]
  },
  {
    title: "Fabricación de Tableros Eléctricos",
    description: "Fabricación, montaje y conexionado de tableros eléctricos con pruebas finales.",
    image: tablerosElectricosImg,
    features: [
      "Montaje de equipos según planos",
      "Conexionado y cableado de PLC",
      "Pruebas finales con el cliente"
    ]
  },
  {
    title: "Montaje de Tuberías Conduit",
    description: "Instalación de tubos galvanizados, accesorios a prueba de explosión según normativas.",
    image: tuberiasConduitImg,
    features: [
      "Tubos galvanizados metálicos",
      "Accesorios a prueba de explosión",
      "Instalación según normativas vigentes"
    ]
  },
  {
    title: "Levantamiento de Observaciones ITSE / INDECI en Lima",
    description: "Servicio especializado en levantamiento de observaciones ITSE e INDECI para industrias y comercios en Lima. Aseguramos su certificado de seguridad con peritajes eléctricos certificados.",

    image: indeciImg,
    features: [
      "Levantamiento de observaciones eléctricas y de seguridad",
      "Mantenimiento de sistemas de protección y pozos a tierra",
      "Implementación de luces de emergencia y señalización",
      "Expediente técnico para riesgo alto y muy alto",
      "Certificación por ingeniero electricista habilitado",
      "Solución a observaciones de Defensa Civil"
    ]
  },
];