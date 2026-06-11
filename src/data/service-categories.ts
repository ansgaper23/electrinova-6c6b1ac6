import { services } from "./services";

export interface ServiceCategory {
  id: string;
  title: string;
  description: string;
  icon: string; // lucide icon name
  serviceIndices: number[]; // indices into the services array
}

export const serviceCategories: ServiceCategory[] = [
  {
    id: "ingenieria",
    title: "Ingeniería Eléctrica",
    description: "Diseño, fabricación e implementación de sistemas eléctricos industriales con ingeniería de detalle.",
    icon: "Cpu",
    serviceIndices: [5, 6, 8], // Cableado, Automatización, Tableros
  },
  {
    id: "montaje",
    title: "Montaje Industrial",
    description: "Instalación profesional de infraestructura eléctrica para plantas industriales y proyectos de gran envergadura.",
    icon: "Wrench",
    serviceIndices: [4, 7, 9], // Bandejas, Instalaciones, Tuberías Conduit
  },
  {
    id: "eficiencia",
    title: "Eficiencia Energética",
    description: "Optimización del consumo energético, climatización y sistemas HVAC para reducir costos operativos.",
    icon: "Gauge",
    serviceIndices: [0, 3], // Aire Acondicionado, Pozos a Tierra
  },
  {
    id: "mantenimiento",
    title: "Mantenimiento Preventivo y Correctivo",
    description: "Programas de mantenimiento integral para sub estaciones, tableros MT/BT y equipos eléctricos críticos.",
    icon: "Shield",
    serviceIndices: [1, 2, 10], // Sub Estaciones, Tableros MT-BT, ITSE/INDECI
  },
];

export function getServicesForCategory(category: ServiceCategory) {
  return category.serviceIndices.map((i) => services[i]).filter(Boolean);
}