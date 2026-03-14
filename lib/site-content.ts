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

export type FaqItem = {
  question: string;
  answer: string;
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
  { href: "#proyectos", label: "Proyectos" },
  { href: "#nosotros", label: "Nosotros" },
  { href: "#faq", label: "FAQ" },
  { href: "#contacto", label: "Contacto" },
];

export const trustPillars = [
  "Diseño e ingeniería",
  "Implementación",
  "Integración multiplataforma",
  "Soporte y mantenimiento",
];

export const compatiblePlatforms = ["Hikvision", "HikCentral", "MagicINFO", "LG SuperSign", "Xibo", "4Yousee"];

export const services: ServiceItem[] = [
  {
    id: "videovigilancia-cctv",
    title: "Sistemas de Videovigilancia (CCTV)",
    description:
      "Arquitecturas de CCTV para empresas con videovigilancia IP, analítica avanzada y monitoreo centralizado.",
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
    id: "carteleria-digital",
    title: "Cartelería Digital",
    description:
      "Soluciones de digital signage con operación centralizada para comunicación interna, retail y experiencia de cliente.",
    capabilities: [
      "Pantallas profesionales y players",
      "CMS y programación de contenidos",
      "Integración con MagicINFO, SuperSign, Xibo y 4Yousee",
      "Arriendo o servicio gestionado",
      "Monitoreo de disponibilidad",
    ],
    applications: ["Edificios corporativos", "Retail", "Centros médicos", "Salas de espera"],
  },
  {
    id: "integracion-sistemas",
    title: "Integración de Sistemas Tecnológicos",
    description:
      "Integración de sistemas de seguridad para orquestar eventos en tiempo real y operar desde una sola plataforma.",
    capabilities: [
      "Integración CCTV + control de acceso",
      "Integración con alarmas",
      "Automatización de eventos",
      "Correlación de alertas",
      "Gestión centralizada",
    ],
    applications: [
      "Alarma abre video en sala de control",
      "Acceso biométrico registrado en CCTV",
      "Eventos automáticos con analítica",
      "Trazabilidad completa de incidentes",
    ],
  },
  {
    id: "salas-monitoreo",
    title: "Salas de Control y Monitoreo",
    description:
      "Diseño de salas de control con video wall, ergonomía operativa y continuidad para monitoreo 24/7.",
    capabilities: [
      "Video walls y monitores profesionales",
      "Consolas de operador",
      "Software de monitoreo central",
      "Red dedicada y redundante",
      "UPS y respaldo energético",
    ],
    applications: [
      "Centros de operaciones",
      "Supervisión de seguridad",
      "Monitoreo logístico",
      "Control de procesos críticos",
    ],
  },
  {
    id: "energia-respaldo",
    title: "Energía y Respaldo Eléctrico",
    description:
      "Dimensionamiento de UPS online y respaldo eléctrico para proteger infraestructura tecnológica crítica.",
    capabilities: [
      "UPS online de doble conversión",
      "Bancos de baterías",
      "PDUs y distribución en racks",
      "Diseño de autonomía energética",
      "Plan de continuidad",
    ],
    applications: ["Data rooms y salas de control", "Sistemas de videovigilancia", "Redes de acceso crítico", "Operaciones continuas"],
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
  { name: "Retail", pain: "Prevención de pérdidas, analítica de afluencia y comunicación digital en tienda." },
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

export const projectHighlights = [
  {
    title: "Modernización de CCTV y control de acceso en corporativo multisede",
    result: "Centralización de 6 sedes, reducción de tiempos de respuesta y mayor trazabilidad de accesos.",
    scope: ["CCTV IP", "Control biométrico", "Integración VMS"],
  },
  {
    title: "Sala de control para operación industrial 24/7",
    result: "Monitoreo unificado con respaldo energético y visibilidad continua de eventos críticos.",
    scope: ["Video wall", "UPS online", "Correlación de alertas"],
  },
  {
    title: "Digital signage gestionado para red de centros médicos",
    result: "Comunicación centralizada con actualización remota y reportes de disponibilidad.",
    scope: ["CMS", "Players", "Soporte gestionado"],
  },
];

export const faqs: FaqItem[] = [
  {
    question: "¿Qué incluye un sistema de videovigilancia para empresas?",
    answer:
      "Incluye diseño de cobertura, cámaras IP, grabación en NVR o servidores, monitoreo, políticas de retención y soporte. En proyectos B2B se suma integración con control de acceso, alarmas y red para lograr trazabilidad completa.",
  },
  {
    question: "¿Qué diferencia hay entre CCTV tradicional y videovigilancia IP?",
    answer:
      "La videovigilancia IP ofrece mejor escalabilidad, gestión remota, analítica de video y mayor calidad de evidencia. CCTV tradicional puede cubrir necesidades básicas, pero limita la integración de sistemas y la evolución del proyecto.",
  },
  {
    question: "¿Qué soluciones de control de acceso existen para edificios e industrias?",
    answer:
      "Se implementan lectores biométricos, tarjetas, QR y esquemas de multi autenticación en puertas, torniquetes y barreras. Todo puede gestionarse por software con perfiles por área, horarios, auditoría y reportes.",
  },
  {
    question: "¿Cómo integrar control de acceso con cámaras y alarmas?",
    answer:
      "Se conectan eventos de acceso con video asociado y reglas de alarma. Por ejemplo, ante intento no autorizado se dispara grabación prioritaria y se notifica a sala de control con evidencia contextual.",
  },
  {
    question: "¿Qué se necesita para implementar una sala de control y monitoreo?",
    answer:
      "Se requiere diseño ergonómico, video wall o monitores, software de gestión, red segmentada, respaldo energético UPS y procedimientos de operación. La clave es un flujo operativo claro para respuesta rápida.",
  },
  {
    question: "¿Qué ventajas tiene una red bien diseñada para sistemas de seguridad?",
    answer:
      "Una red bien diseñada mejora estabilidad, latencia y disponibilidad de CCTV para empresas, control de acceso y monitoreo tecnológico. También reduce caídas, facilita escalamiento y simplifica soporte.",
  },
  {
    question: "¿La empresa realiza mantención y soporte técnico?",
    answer:
      "Sí. Se ofrecen planes preventivos y correctivos, monitoreo remoto, visitas programadas, actualización de firmware y reportes técnicos para asegurar continuidad operacional.",
  },
  {
    question: "¿Implementan cartelería digital para oficinas, retail y centros médicos?",
    answer:
      "Sí. Se implementan soluciones de digital signage con CMS, players y pantallas profesionales en oficinas, retail, clínicas y centros médicos, con operación centralizada por sedes.",
  },
  {
    question: "¿Pueden diseñar proyectos antes de la compra de equipamiento?",
    answer:
      "Sí. El servicio de consultoría y diseño define arquitectura, especificaciones, fases y presupuesto estimado para tomar decisiones con menos riesgo técnico y financiero.",
  },
  {
    question: "¿Trabajan soluciones a medida para múltiples sedes?",
    answer:
      "Sí. Se diseñan arquitecturas estandarizadas y escalables para múltiples sucursales, integrando gestión central, políticas unificadas y soporte por niveles.",
  },
];

export const integrationNodes = [
  "CCTV",
  "Control de acceso",
  "Alarmas",
  "Red y telecom",
  "Monitoreo central",
  "Respaldo energético",
  "Cartelería digital",
];
