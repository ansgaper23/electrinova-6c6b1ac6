export type LocalZone = {
  slug: string;
  city: string;
  region: string;
  title: string;
  metaDescription: string;
  heroHeading: string;
  intro: string;
  districts: string[];
  industries: string[];
};

export const localZones: LocalZone[] = [
  {
    slug: "canete-san-vicente",
    city: "Cañete y San Vicente",
    region: "Lima Sur",
    title: "Servicios Eléctricos Industriales en Cañete y San Vicente | ELECTRINOVA PERÚ",
    metaDescription:
      "Ingenieros eléctricos en Cañete y San Vicente de Cañete: pozos a tierra certificados, tableros MT-BT, subestaciones y levantamiento de observaciones ITSE para agroindustrias y empresas. Cotiza hoy.",
    heroHeading: "Servicios Eléctricos Industriales en Cañete y San Vicente de Cañete",
    intro:
      "Atendemos plantas agroindustriales, fundos, centros comerciales y empresas del valle de Cañete con cuadrillas propias desde Lima. Ejecutamos pozos a tierra certificados, montaje de tableros eléctricos MT-BT, mantenimiento de subestaciones y levantamiento de observaciones ITSE/INDECI con respuesta rápida en la zona.",
    districts: ["San Vicente de Cañete", "Imperial", "Quilmaná", "Lunahuaná", "Mala", "Asia", "Cerro Azul"],
    industries: ["Agroindustria y fundos", "Plantas de procesamiento", "Centros comerciales", "Hoteles y turismo", "Sector residencial"],
  },
  {
    slug: "chincha",
    city: "Chincha",
    region: "Ica",
    title: "Servicios Eléctricos Industriales en Chincha | ELECTRINOVA PERÚ",
    metaDescription:
      "Contratistas eléctricos en Chincha Alta y Chincha Baja: pozos a tierra, tableros eléctricos MT-BT, subestaciones, automatización y levantamiento de observaciones ITSE para industrias y comercios. Cotiza gratis.",
    heroHeading: "Servicios Eléctricos Industriales en Chincha",
    intro:
      "Brindamos servicios eléctricos industriales en Chincha Alta, Chincha Baja y el corredor industrial del sur de Ica. Nuestros ingenieros ejecutan instalaciones en media y baja tensión, pozos a tierra con certificado INDECI, mantenimiento de transformadores y regularización de observaciones ITSE para fábricas, bodegas y locales comerciales.",
    districts: ["Chincha Alta", "Chincha Baja", "Grocio Prado", "Pueblo Nuevo", "Sunampe", "Tambo de Mora"],
    industries: ["Industria manufacturera", "Bodegas y almacenes", "Agroexportación", "Comercios y mercados", "Sector salud"],
  },
  {
    slug: "pisco",
    city: "Pisco",
    region: "Ica",
    title: "Servicios Eléctricos Industriales en Pisco | ELECTRINOVA PERÚ",
    metaDescription:
      "Empresa de servicios eléctricos en Pisco y Paracas: pozos a tierra certificados, subestaciones eléctricas, tableros MT-BT y levantamiento de observaciones ITSE para hoteles, plantas pesqueras e industrias. Cotiza hoy.",
    heroHeading: "Servicios Eléctricos Industriales en Pisco y Paracas",
    intro:
      "Atendemos la provincia de Pisco y el corredor turístico de Paracas con soluciones eléctricas integrales: instalaciones industriales, pozos a tierra, mantenimiento de subestaciones y tableros eléctricos, y levantamiento de observaciones ITSE para hoteles, plantas pesqueras, vitivinícolas y comercios.",
    districts: ["Pisco", "Paracas", "San Andrés", "San Clemente", "Túpac Amaru", "Humay"],
    industries: ["Hoteles y turismo", "Plantas pesqueras", "Vitivinícolas y bodegas", "Industria y manufactura", "Comercios"],
  },
];
