import { Award, CheckCircle2 } from "lucide-react";
import acerosArequipaLogo from "@/assets/clients/aceros-arequipa.png";
import suneduLogo from "@/assets/clients/sunedu.png";
import nestleLogo from "@/assets/clients/nestle.png";
import cruzDelSurLogo from "@/assets/clients/cruz-del-sur.png";

// Clientes reales (basado en el brochure)
export const clients = [
  {
    name: "Aceros Arequipa",
    category: "Sector Industrial",
    logo: acerosArequipaLogo,
  },
  {
    name: "SUNEDU",
    category: "Sector Institucional",
    logo: suneduLogo,
  },
  {
    name: "Nestlé",
    category: "Sector Industrial",
    logo: nestleLogo,
  },
  {
    name: "Cruz del Sur",
    category: "Sector Transporte",
    logo: cruzDelSurLogo,
  },
];

// Marcas y proveedores con los que trabajan
export const partners = [
  {
    name: "HUBELL",
    category: "Luminarias Industriales",
  },
  {
    name: "FLUKE",
    category: "Equipos de Medición",
  },
  {
    name: "Allen Bradley",
    category: "Automatización",
  },
  {
    name: "Schneider Electric",
    category: "Gestión de Energía",
  },
  {
    name: "Siemens",
    category: "Tecnología Industrial",
  },
  {
    name: "ABB",
    category: "Automatización y Energía",
  },
  {
    name: "Legrand",
    category: "Infraestructura Eléctrica",
  },
  {
    name: "Phoenix Contact",
    category: "Conectores Industriales",
  },
];

// Certificaciones
export const certifications = [
  {
    name: "ISO 9001:2015",
    description: "Certificación de Sistema de Gestión de Calidad",
    icon: Award,
  },
  {
    name: "OSCE Registrado",
    description: "Proveedor del Estado Peruano",
    icon: CheckCircle2,
  },
  {
    name: "Ingenieros Colegiados",
    description: "Personal con habilitación del CIP",
    icon: Award,
  },
  {
    name: "Certificación Técnica",
    description: "Técnicos electricistas certificados",
    icon: CheckCircle2,
  },
];

// Beneficios
export const benefits = [
  {
    title: "Equipos de Medición Certificados",
    description: "Utilizamos equipos FLUKE y telurómetros digitales debidamente certificados para garantizar mediciones precisas.",
  },
  {
    title: "Protocolos de Conformidad",
    description: "Entregamos protocolos de conformidad firmados por Ingeniero Electricista habilitado en el Colegio de Ingenieros.",
  },
  {
    title: "Software Especializado",
    description: "Utilizamos software profesional como Dialux para cálculos de iluminación y diseño de proyectos eléctricos.",
  },
  {
    title: "Normativas Vigentes",
    description: "Todos nuestros trabajos se realizan cumpliendo las normativas eléctricas vigentes en el Perú.",
  },
];
