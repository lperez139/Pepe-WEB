export type NavLink = {
  href: string;
  label: string;
};

export type ServiceItem = {
  id: string;
  title: string;
  description: string;
  capabilities: string[];
  applications: string[];
};

export type ClientLogo = {
  id: string;
  name: string;
  mark: string;
};

export const company = {
  name: "Simple Core",
  legalName: "Simple Core SpA",
  url: "https://www.simplecore.cl",
  phone: "+56 2 2987 5400",
  email: "contacto@simplecore.cl",
  location: "Santiago, Chile",
};

export const navLinks: NavLink[] = [
  { href: "#inicio", label: "Inicio" },
  { href: "#servicios", label: "Servicios" },
  { href: "#industrias", label: "Industrias" },
  { href: "#integracion", label: "Integración" },
  { href: "#clientes", label: "Clientes" },
  { href: "#nosotros", label: "Nosotros" },
  { href: "#contacto", label: "Contacto" },
];

export const trustPillars = [
  "Diseño e ingeniería",
  "Implementación",
  "Integración multiplataforma",
  "Soporte y mantenimiento",
];

export const services: ServiceItem[] = [
  {
    id: "videovigilancia-cctv",
    title: "Sistemas de Videovigilancia (CCTV)",
    description:
      "Arquitecturas de CCTV para empresas con videovigilancia IP, analítica avanzada y trazabilidad operacional.",
    capabilities: [
      "Diseño de arquitectura de CCTV",
      "Instalación de cámaras IP",
      "NVR y servidores de grabación",
      "Analítica de video e integración con VMS",
      "Soporte y mantenimiento preventivo",
    ],
    applications: [
      "Seguridad perimetral",
      "Control de accesos vehiculares",
      "Protección de activos",
      "Supervisión operativa",
    ],
  },
  {
    id: "control-acceso-biometrico",
    title: "Sistemas de Control de Acceso",
    description:
      "Control de acceso biométrico facial y huella con trazabilidad, auditoría y políticas de seguridad por zona.",
    capabilities: [
      "Lectores biométricos y credenciales",
      "Software de gestión de acceso",
      "Puertas, torniquetes y barreras",
      "Multi autenticación y reglas horarias",
      "Integración con CCTV y alarmas",
    ],
    applications: ["Edificios corporativos", "Industrias", "Condominios", "Infraestructura crítica"],
  },
  {
    id: "redes-telecomunicaciones",
    title: "Infraestructura de Redes y Telecomunicaciones",
    description:
      "Diseño e implementación de redes empresariales con cableado estructurado y fibra óptica para alta disponibilidad.",
    capabilities: [
      "Cableado estructurado cobre y fibra óptica",
      "Racks, gabinetes y distribución",
      "Switches y equipamiento core/acceso",
      "WiFi corporativo y segmentación",
      "Documentación de topología",
    ],
    applications: [
      "Redes corporativas",
      "Infraestructura para CCTV",
      "Conectividad de edificios",
      "Campus y parques industriales",
    ],
  },
  {
    id: "salas-monitoreo",
    title: "Salas de Control",
    description:
      "Diseño de salas de control con video wall, ergonomía operativa y continuidad para supervisión 24/7.",
    capabilities: [
      "Video walls y monitores profesionales",
      "Consolas de operador",
      "Software de visualización operativa",
      "Red dedicada y redundante",
      "Diseño de continuidad operacional",
    ],
    applications: [
      "Centros de operaciones",
      "Supervisión de seguridad",
      "Monitoreo logístico",
      "Control de procesos críticos",
    ],
  },
  {
    id: "consultoria",
    title: "Consultoría y Diseño de Proyectos Tecnológicos",
    description:
      "Consultoría técnica para definir alcance, arquitectura y presupuesto antes de ejecutar inversiones.",
    capabilities: [
      "Levantamiento técnico",
      "Evaluación de infraestructura existente",
      "Diseño de arquitectura y especificación",
      "Revisión de cotizaciones",
      "Documentación ejecutiva",
    ],
    applications: ["Preinversión", "Licitaciones", "Expansiones multisede", "Modernización de sistemas"],
  },
  {
    id: "soporte-infraestructura",
    title: "Gestión y Soporte de Infraestructura Tecnológica",
    description:
      "Servicios de monitoreo tecnológico y soporte de infraestructura para mantener disponibilidad y seguridad operacional.",
    capabilities: [
      "Monitoreo de redes y servicios",
      "Informes técnicos periódicos",
      "Firmware updates controlados",
      "Gestión de seguridad",
      "Soporte remoto y presencial",
    ],
    applications: ["Operación continua", "Mejora de performance", "Reducción de incidentes", "Cumplimiento y trazabilidad"],
  },
];

export const industries = [
  { name: "Corporativo", pain: "Control de accesos, trazabilidad y continuidad operativa en edificios de alto flujo." },
  { name: "Industrial", pain: "Visibilidad de procesos, seguridad perimetral y monitoreo en ambientes exigentes." },
  { name: "Condominios", pain: "Gestión de ingresos, seguridad comunitaria y soporte técnico confiable." },
  { name: "Retail", pain: "Prevención de pérdidas, analítica de afluencia y control operativo en tienda." },
  { name: "Centros Médicos", pain: "Control de áreas sensibles, continuidad de red y trazabilidad de eventos." },
  { name: "Infraestructura Crítica", pain: "Resiliencia, redundancia y respuesta rápida frente a incidentes operativos." },
  { name: "Campus", pain: "Cobertura multi edificio, movilidad segura y gestión centralizada." },
  { name: "Edificios Institucionales", pain: "Seguridad integral con operación simple y evidencia auditable." },
];

export const processSteps = [
  {
    title: "Diagnóstico",
    description: "Levantamiento técnico, análisis de riesgo y priorización de objetivos operativos.",
  },
  {
    title: "Ingeniería y diseño",
    description: "Arquitectura integral de sistemas, alcance por fases y documentación técnica.",
  },
  {
    title: "Implementación e integración",
    description: "Despliegue controlado, puesta en marcha y orquestación entre plataformas.",
  },
  {
    title: "Soporte y continuidad operacional",
    description: "Mantenimiento preventivo, monitoreo tecnológico y mejora continua.",
  },
];

export const differentiators = [
  "Integración multiplataforma con foco en operación real",
  "Diseño técnico antes de ejecutar equipamiento",
  "Soluciones escalables para crecimiento por etapas",
  "Soporte preventivo y correctivo con SLA acordado",
  "Experiencia en entornos corporativos e infraestructura crítica",
  "Documentación técnica y trazabilidad de punta a punta",
];

export const clientLogos: ClientLogo[] = [
  { id: "cliente-01", name: "Cliente 01", mark: "C01" },
  { id: "cliente-02", name: "Cliente 02", mark: "C02" },
  { id: "cliente-03", name: "Cliente 03", mark: "C03" },
  { id: "cliente-04", name: "Cliente 04", mark: "C04" },
  { id: "cliente-05", name: "Cliente 05", mark: "C05" },
  { id: "cliente-06", name: "Cliente 06", mark: "C06" },
];
