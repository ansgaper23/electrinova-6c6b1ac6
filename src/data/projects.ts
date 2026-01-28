// Importar imágenes de proyectos
import acerosArequipaImg from "@/assets/projects/aceros-arequipa.jpg";
import suneduImg from "@/assets/projects/sunedu.jpg";
import nestleImg from "@/assets/projects/nestle.jpg";
import cruzDelSurImg from "@/assets/projects/cruz-del-sur.jpg";
import sunedu2Img from "@/assets/projects/sunedu-2.jpg";
import nestle2Img from "@/assets/projects/nestle-2.jpg";
import cruzDelSur2Img from "@/assets/projects/cruz-del-sur-2.jpg";

// Tipos de proyectos
export type Sector = "Todos" | "Industrial" | "Comercial" | "Institucional";
export type ServiceType = 
  | "Automatización" 
  | "Tableros Eléctricos" 
  | "Mantenimiento de Sub Estaciones"
  | "Cableado Estructurado"
  | "Instalaciones Eléctricas"
  | "Aire Acondicionado"
  | "Servicios Generales";

export interface Project {
  id: number;
  title: string;
  description: string;
  sector: Exclude<Sector, "Todos">;
  service: ServiceType;
  location: string;
  year: string;
  image: string;
  activities?: string[];
}

// Proyectos reales extraídos del brochure
export const projects: Project[] = [
  {
    id: 1,
    title: "Aceros Arequipa",
    description: "Automatización de sistema de iluminación LED, proyecto de alumbrado en luminarias tipo T8 – HUBELL, automatización de sistema de frío y fabricación de CCM en BT.",
    sector: "Industrial",
    service: "Automatización",
    location: "Arequipa, Perú",
    year: "2024",
    image: acerosArequipaImg,
    activities: [
      "Automatización de sistema de iluminación tipo LED",
      "Proyecto de alumbrado en luminarias tipo T8 – HUBELL",
      "Automatización de sistema de frío",
      "Fabricación de CCM en BT"
    ]
  },
  {
    id: 2,
    title: "SUNEDU",
    description: "Cableado estructurado, pruebas de fibra óptica multimodo y monomodo, fabricación de tableros de fuerza para sistema de bombas y montaje de grupo electrógeno.",
    sector: "Institucional",
    service: "Cableado Estructurado",
    location: "Lima, Perú",
    year: "2024",
    image: suneduImg,
    activities: [
      "Cableado y estructurado",
      "Pruebas de fibra ópticas multimodo, monomodo",
      "Fabricación de tableros de fuerza para sistema de bombas",
      "Montaje de grupo electrógeno y tablero de transferencia",
      "Desarrollo del sistema a través del programa Dialux"
    ]
  },
  {
    id: 3,
    title: "Nestlé",
    description: "Mantenimiento integral de sub estación eléctrica, incluyendo inspección, pruebas mecánicas, eléctricas y dieléctricas de equipos.",
    sector: "Industrial",
    service: "Mantenimiento de Sub Estaciones",
    location: "Lima, Perú",
    year: "2024",
    image: nestleImg,
    activities: [
      "Mantenimiento preventivo de sub estación",
      "Verificación de condiciones físicas de componentes",
      "Pruebas mecánicas, eléctricas y dieléctricas"
    ]
  },
  {
    id: 4,
    title: "Cruz del Sur - Servicios Generales",
    description: "Servicios integrales de mantenimiento incluyendo pintado de columnas, mantenimiento de aires acondicionados, portones y resane de humedad.",
    sector: "Comercial",
    service: "Servicios Generales",
    location: "Lima, Perú",
    year: "2024",
    image: cruzDelSurImg,
    activities: [
      "Pintado de columnas del área de control de monitoreo",
      "Mantenimiento de aire acondicionado área cocina",
      "Mantenimiento de portones Zona Eco y Administrativa",
      "Resane de humedad área logística y almacén"
    ]
  },
  {
    id: 5,
    title: "SUNEDU - Sistema Eléctrico",
    description: "Instalación completa del sistema eléctrico incluyendo grupo electrógeno, tableros de transferencia y sistemas de iluminación calculados con software Dialux.",
    sector: "Institucional",
    service: "Instalaciones Eléctricas",
    location: "Lima, Perú",
    year: "2024",
    image: sunedu2Img,
    activities: [
      "Montaje de grupo electrógeno",
      "Instalación de tablero de transferencia",
      "Cálculos de iluminación con Dialux"
    ]
  },
  {
    id: 6,
    title: "Nestlé - Tableros MT/BT",
    description: "Mantenimiento preventivo y correctivo de tableros de media y baja tensión, con inspección del equipamiento eléctrico para detectar posibles problemas.",
    sector: "Industrial",
    service: "Tableros Eléctricos",
    location: "Lima, Perú",
    year: "2024",
    image: nestle2Img,
    activities: [
      "Mantenimiento preventivo de tableros MT-BT",
      "Mantenimiento correctivo de tableros",
      "Inspección de equipamiento eléctrico"
    ]
  },
  {
    id: 7,
    title: "Cruz del Sur - Climatización",
    description: "Mantenimiento de sistemas de aire acondicionado incluyendo sistemas HVAC y equipos industriales tipo chiller R410 y R22.",
    sector: "Comercial",
    service: "Aire Acondicionado",
    location: "Lima, Perú",
    year: "2024",
    image: cruzDelSur2Img,
    activities: [
      "Mantenimiento de sistema HVAC",
      "Sistemas industriales chiller R410, R22",
      "Mantenimiento preventivo de aires acondicionados"
    ]
  },
];

export const sectors: Sector[] = ["Todos", "Industrial", "Comercial", "Institucional"];
