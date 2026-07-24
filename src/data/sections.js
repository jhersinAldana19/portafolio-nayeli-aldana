export const sections = [
  {
    id: 'home',
    kind: 'hero',
    eyebrow: 'Monitoreo y Ruteo',
    title: 'Nayeli\nAldana',
    subtitle: '3 años en Supply Chain, operaciones logísticas y consumo masivo.',
    cta: 'Descargar CV',
    download: true,
  },
  {
    id: 'about',
    kind: 'about',
    eyebrow: '01 — Sobre mí',
    title: 'Perfil Profesional',
    subtitle:
      'Experiencia en gestión de transporte, abastecimiento y coordinación operativa. Enfocada en el control de la ejecución del transporte, el monitoreo de rutas y el cumplimiento de protocolos para un servicio de calidad.',
    education: [
      {
        institution: 'SENATI',
        program: 'Administración Industrial',
        status: 'Egresada',
      },
      {
        institution: 'UPC',
        program: 'Administración de Empresas',
        status: 'Estudiante actual',
      },
    ],
  },
  {
    id: 'supply',
    kind: 'video',
  },
  {
    id: 'credentials',
    kind: 'credentials',
  },
  {
    id: 'experience',
    kind: 'experience',
    eyebrow: '02 — Experiencia',
    title: 'Supervisora de Operaciones Logísticas',
    company: 'BACKUS',
    employment: 'Jornada completa',
    period: 'jun. 2025 — may. 2026',
    duration: '1 año',
    location: 'Ate, Lima, Perú · Presencial',
    summary:
      'Supervisión y coordinación de operaciones de transporte para el abastecimiento entre la Planta Ate y las plantas y Centros de Distribución (CDS) de Backus a nivel nacional. Monitoreo de flota T1, control documentario, gestión de incidencias y seguimiento de KPIs para asegurar continuidad y eficiencia operativa.',
    signals: [
      { label: 'Monitoreo T1', detail: 'Frotcom · GPS' },
      { label: 'Programación', detail: 'Cargas y arrastres' },
      { label: 'Incidencias', detail: 'Gestión operativa' },
      { label: 'Plantas & CDS', detail: 'Red nacional' },
      { label: 'Ingreso / Salida', detail: 'Validación en planta' },
      { label: 'KPIs', detail: 'Indicadores operativos' },
      { label: 'SAP', detail: 'Gestión logística' },
      { label: 'Excel', detail: 'Control y reportes' },
    ],
  },
  {
    id: 'strategy',
    kind: 'stats',
    eyebrow: '03 — Monitoreo',
    title: 'Seguimiento en Tiempo Real',
    subtitle:
      'En Backus monitoreé flota T1 con visibilidad GPS para coordinar rutas, anticipar desvíos y mantener el servicio entre Planta Ate y la red nacional de CDS.',
    media: {
      src: 'seguimiento-tiempo-real',
      alt: 'Pantalla de monitoreo GPS en operaciones Backus',
      kicker: 'Backus',
      caption:
        'Sistema de GPS para ver en qué estado se encuentra la unidad y seguir su avance en tiempo real.',
    },
  },
  {
    id: 'operations',
    kind: 'stats',
    reverse: true,
    eyebrow: '04 — Ruteo y Protocolos',
    title: 'Operación Bajo Control',
    subtitle:
      'Elaboración de propuestas de rutas eficientes bajo parámetros de tiempo, distancia y capacidad de flota. Validación de protocolos operativos mediante auditoría de registros y aplicativos de gestión.',
    metrics: [
      { label: 'Años de Experiencia', value: '3+' },
      { label: 'Metodología Aplicada', value: '5S' },
    ],
  },
  {
    id: 'projects',
    kind: 'cta',
    eyebrow: '05 — Mejora Continua',
    title: 'Incidencias que Impulsan Mejora',
    subtitle:
      'Registro y consolidación de incidencias de entrega —rechazos, retornos y desvíos— para identificar alertas y proponer acciones de mejora que fortalezcan el servicio.',
    cta: 'Conversemos',
    link: '#contact',
  },
  {
    id: 'contact',
    kind: 'contact',
    eyebrow: '06 — Contacto',
    title: 'Lista para Aportar',
    subtitle:
      'Disponible para roles de control de transporte, monitoreo de rutas y coordinación operativa en entornos de alta exigencia.',
    channels: [
      {
        label: 'Correo',
        href: 'mailto:311nalleli112@gmail.com',
        detail: '311nalleli112@gmail.com',
        icon: 'mail',
      },
      {
        label: 'WhatsApp',
        href: 'https://wa.me/51928414225',
        detail: '+51 928 414 225',
        icon: 'phone',
      },
      {
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/in/nayeli-aldana-vento-117165265/',
        detail: 'nayeli-aldana-vento',
        icon: 'linkedin',
      },
      {
        label: 'CV',
        href: 'cv',
        detail: 'Descargar PDF',
        download: 'CV-Nayeli-Aldana-Vento.pdf',
        icon: 'download',
      },
    ],
  },
]
