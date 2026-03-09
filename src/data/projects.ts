// Importar imágenes de proyectos (responsive)
import acerosArequipaUrl from "@/assets/projects/aceros-arequipa.jpg?url";
import acerosArequipaMeta from "@/assets/projects/aceros-arequipa.jpg?as=meta";
import acerosArequipaSrcSetWebp from "@/assets/projects/aceros-arequipa.jpg?w=480;768;1024;1280;1536&format=webp&as=srcset";
import acerosArequipaSrcSetAvif from "@/assets/projects/aceros-arequipa.jpg?w=480;768;1024;1280;1536&format=avif&as=srcset";

import suneduUrl from "@/assets/projects/sunedu.jpg?url";
import suneduMeta from "@/assets/projects/sunedu.jpg?as=meta";
import suneduSrcSetWebp from "@/assets/projects/sunedu.jpg?w=480;768;1024;1280;1536&format=webp&as=srcset";
import suneduSrcSetAvif from "@/assets/projects/sunedu.jpg?w=480;768;1024;1280;1536&format=avif&as=srcset";

import nestleUrl from "@/assets/projects/nestle.jpg?url";
import nestleMeta from "@/assets/projects/nestle.jpg?as=meta";
import nestleSrcSetWebp from "@/assets/projects/nestle.jpg?w=480;768;1024;1280;1536&format=webp&as=srcset";
import nestleSrcSetAvif from "@/assets/projects/nestle.jpg?w=480;768;1024;1280;1536&format=avif&as=srcset";

import cruzDelSurUrl from "@/assets/projects/cruz-del-sur.jpg?url";
import cruzDelSurMeta from "@/assets/projects/cruz-del-sur.jpg?as=meta";
import cruzDelSurSrcSetWebp from "@/assets/projects/cruz-del-sur.jpg?w=480;768;1024;1280;1536&format=webp&as=srcset";
import cruzDelSurSrcSetAvif from "@/assets/projects/cruz-del-sur.jpg?w=480;768;1024;1280;1536&format=avif&as=srcset";

import sunedu2Url from "@/assets/projects/sunedu-2.jpg?url";
import sunedu2Meta from "@/assets/projects/sunedu-2.jpg?as=meta";
import sunedu2SrcSetWebp from "@/assets/projects/sunedu-2.jpg?w=480;768;1024;1280;1536&format=webp&as=srcset";
import sunedu2SrcSetAvif from "@/assets/projects/sunedu-2.jpg?w=480;768;1024;1280;1536&format=avif&as=srcset";

import nestle2Url from "@/assets/projects/nestle-2.jpg?url";
import nestle2Meta from "@/assets/projects/nestle-2.jpg?as=meta";
import nestle2SrcSetWebp from "@/assets/projects/nestle-2.jpg?w=480;768;1024;1280;1536&format=webp&as=srcset";
import nestle2SrcSetAvif from "@/assets/projects/nestle-2.jpg?w=480;768;1024;1280;1536&format=avif&as=srcset";

import cruzDelSur2Url from "@/assets/projects/cruz-del-sur-2.jpg?url";
import cruzDelSur2Meta from "@/assets/projects/cruz-del-sur-2.jpg?as=meta";
import cruzDelSur2SrcSetWebp from "@/assets/projects/cruz-del-sur-2.jpg?w=480;768;1024;1280;1536&format=webp&as=srcset";
import cruzDelSur2SrcSetAvif from "@/assets/projects/cruz-del-sur-2.jpg?w=480;768;1024;1280;1536&format=avif&as=srcset";

import utpTransformadoresUrl from "@/assets/projects/utp-transformadores.jpg?url";
import utpTransformadoresMeta from "@/assets/projects/utp-transformadores.jpg?as=meta";
import utpTransformadoresSrcSetWebp from "@/assets/projects/utp-transformadores.jpg?w=480;768;1024;1280;1536&format=webp&as=srcset";
import utpTransformadoresSrcSetAvif from "@/assets/projects/utp-transformadores.jpg?w=480;768;1024;1280;1536&format=avif&as=srcset";

import abbSalasElectricasUrl from "@/assets/projects/abb-salas-electricas.jpg?url";
import abbSalasElectricasMeta from "@/assets/projects/abb-salas-electricas.jpg?as=meta";
import abbSalasElectricasSrcSetWebp from "@/assets/projects/abb-salas-electricas.jpg?w=480;768;1024;1280;1536&format=webp&as=srcset";
import abbSalasElectricasSrcSetAvif from "@/assets/projects/abb-salas-electricas.jpg?w=480;768;1024;1280;1536&format=avif&as=srcset";

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

  /** Fallback URL */
  image: string;
  /** Intrinsic dimensions to prevent CLS */
  imageWidth: number;
  imageHeight: number;
  /** Responsive srcsets */
  imageSrcSetWebp?: string;
  imageSrcSetAvif?: string;

  activities?: string[];
}

// Proyectos reales extraídos del brochure
export const projects: Project[] = [
  {
    id: 1,
    title: "Aceros Arequipa",
    description:
      "Automatización de sistema de iluminación LED, proyecto de alumbrado en luminarias tipo T8 – HUBELL, automatización de sistema de frío y fabricación de CCM en BT.",
    sector: "Industrial",
    service: "Automatización",
    location: "Arequipa, Perú",
    year: "2024",
    image: acerosArequipaUrl,
    imageWidth: acerosArequipaMeta.width,
    imageHeight: acerosArequipaMeta.height,
    imageSrcSetWebp: acerosArequipaSrcSetWebp,
    imageSrcSetAvif: acerosArequipaSrcSetAvif,
    activities: [
      "Automatización de sistema de iluminación tipo LED",
      "Proyecto de alumbrado en luminarias tipo T8 – HUBELL",
      "Automatización de sistema de frío",
      "Fabricación de CCM en BT",
    ],
  },
  {
    id: 2,
    title: "SUNEDU",
    description:
      "Cableado estructurado, pruebas de fibra óptica multimodo y monomodo, fabricación de tableros de fuerza para sistema de bombas y montaje de grupo electrógeno.",
    sector: "Institucional",
    service: "Cableado Estructurado",
    location: "Lima, Perú",
    year: "2024",
    image: suneduUrl,
    imageWidth: suneduMeta.width,
    imageHeight: suneduMeta.height,
    imageSrcSetWebp: suneduSrcSetWebp,
    imageSrcSetAvif: suneduSrcSetAvif,
    activities: [
      "Cableado y estructurado",
      "Pruebas de fibra ópticas multimodo, monomodo",
      "Fabricación de tableros de fuerza para sistema de bombas",
      "Montaje de grupo electrógeno y tablero de transferencia",
      "Desarrollo del sistema a través del programa Dialux",
    ],
  },
  {
    id: 3,
    title: "Nestlé",
    description:
      "Mantenimiento integral de sub estación eléctrica, incluyendo inspección, pruebas mecánicas, eléctricas y dieléctricas de equipos.",
    sector: "Industrial",
    service: "Mantenimiento de Sub Estaciones",
    location: "Lima, Perú",
    year: "2024",
    image: nestleUrl,
    imageWidth: nestleMeta.width,
    imageHeight: nestleMeta.height,
    imageSrcSetWebp: nestleSrcSetWebp,
    imageSrcSetAvif: nestleSrcSetAvif,
    activities: [
      "Mantenimiento preventivo de sub estación",
      "Verificación de condiciones físicas de componentes",
      "Pruebas mecánicas, eléctricas y dieléctricas",
    ],
  },
  {
    id: 4,
    title: "Cruz del Sur - Servicios Generales",
    description:
      "Servicios integrales de mantenimiento incluyendo pintado de columnas, mantenimiento de aires acondicionados, portones y resane de humedad.",
    sector: "Comercial",
    service: "Servicios Generales",
    location: "Lima, Perú",
    year: "2024",
    image: cruzDelSurUrl,
    imageWidth: cruzDelSurMeta.width,
    imageHeight: cruzDelSurMeta.height,
    imageSrcSetWebp: cruzDelSurSrcSetWebp,
    imageSrcSetAvif: cruzDelSurSrcSetAvif,
    activities: [
      "Pintado de columnas del área de control de monitoreo",
      "Mantenimiento de aire acondicionado área cocina",
      "Mantenimiento de portones Zona Eco y Administrativa",
      "Resane de humedad área logística y almacén",
    ],
  },
  {
    id: 5,
    title: "SUNEDU - Sistema Eléctrico",
    description:
      "Instalación completa del sistema eléctrico incluyendo grupo electrógeno, tableros de transferencia y sistemas de iluminación calculados con software Dialux.",
    sector: "Institucional",
    service: "Instalaciones Eléctricas",
    location: "Lima, Perú",
    year: "2024",
    image: sunedu2Url,
    imageWidth: sunedu2Meta.width,
    imageHeight: sunedu2Meta.height,
    imageSrcSetWebp: sunedu2SrcSetWebp,
    imageSrcSetAvif: sunedu2SrcSetAvif,
    activities: [
      "Montaje de grupo electrógeno",
      "Instalación de tablero de transferencia",
      "Cálculos de iluminación con Dialux",
    ],
  },
  {
    id: 6,
    title: "Nestlé - Tableros MT/BT",
    description:
      "Mantenimiento preventivo y correctivo de tableros de media y baja tensión, con inspección del equipamiento eléctrico para detectar posibles problemas.",
    sector: "Industrial",
    service: "Tableros Eléctricos",
    location: "Lima, Perú",
    year: "2024",
    image: nestle2Url,
    imageWidth: nestle2Meta.width,
    imageHeight: nestle2Meta.height,
    imageSrcSetWebp: nestle2SrcSetWebp,
    imageSrcSetAvif: nestle2SrcSetAvif,
    activities: [
      "Mantenimiento preventivo de tableros MT-BT",
      "Mantenimiento correctivo de tableros",
      "Inspección de equipamiento eléctrico",
    ],
  },
  {
    id: 7,
    title: "Cruz del Sur - Climatización",
    description:
      "Mantenimiento de sistemas de aire acondicionado incluyendo sistemas HVAC y equipos industriales tipo chiller R410 y R22.",
    sector: "Comercial",
    service: "Aire Acondicionado",
    location: "Lima, Perú",
    year: "2024",
    image: cruzDelSur2Url,
    imageWidth: cruzDelSur2Meta.width,
    imageHeight: cruzDelSur2Meta.height,
    imageSrcSetWebp: cruzDelSur2SrcSetWebp,
    imageSrcSetAvif: cruzDelSur2SrcSetAvif,
    activities: [
      "Mantenimiento de sistema HVAC",
      "Sistemas industriales chiller R410, R22",
      "Mantenimiento preventivo de aires acondicionados",
    ],
  },
  {
    id: 8,
    title: "Universidad Tecnológica del Perú (UTP)",
    description:
      "Implementación integral del sistema eléctrico de distribución y fuerza para aire acondicionado, mantenimiento preventivo de transformadores y valorización de equipos eléctricos.",
    sector: "Institucional",
    service: "Instalaciones Eléctricas",
    location: "Lima, Perú",
    year: "2024",
    image: utpTransformadoresUrl,
    imageWidth: utpTransformadoresMeta.width,
    imageHeight: utpTransformadoresMeta.height,
    imageSrcSetWebp: utpTransformadoresSrcSetWebp,
    imageSrcSetAvif: utpTransformadoresSrcSetAvif,
    activities: [
      "Implementación del sistema eléctrico de distribución y fuerza",
      "Sistema de aire acondicionado industrial",
      "Mantenimiento preventivo de transformadores",
      "Valorización de equipamiento eléctrico",
    ],
  },
  {
    id: 9,
    title: "ABB - Implementación de Salas Eléctricas",
    description:
      "Diseño e implementación de salas eléctricas industriales de alta tecnología, incluyendo montaje de tableros, cableado estructurado y sistemas de control automatizado.",
    sector: "Industrial",
    service: "Instalaciones Eléctricas",
    location: "Lima, Perú",
    year: "2024",
    image: abbSalasElectricasUrl,
    imageWidth: abbSalasElectricasMeta.width,
    imageHeight: abbSalasElectricasMeta.height,
    imageSrcSetWebp: abbSalasElectricasSrcSetWebp,
    imageSrcSetAvif: abbSalasElectricasSrcSetAvif,
    activities: [
      "Implementación de salas eléctricas industriales",
      "Montaje de tableros de fuerza y control",
      "Cableado estructurado de alta capacidad",
      "Sistemas de automatización y control",
    ],
  },
];

export const sectors: Sector[] = [
  "Todos",
  "Industrial",
  "Comercial",
  "Institucional",
];

