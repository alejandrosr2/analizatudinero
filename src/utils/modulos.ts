/**
 * Módulos incluidos en la plantilla gratuita "Controla tu dinero en 30 días".
 * Fuente única para la landing de plantillas, la página de producto y las
 * páginas SEO de módulos. El `id` es el anchor en /plantillas/controla-tu-dinero.
 */
export interface Modulo {
  id: string;
  nombre: string;
  problema: string;
  relacionada: { label: string; href: string };
}

export const PRODUCTO = {
  nombre: 'Controla tu dinero en 30 días',
  url: '/plantillas/controla-tu-dinero',
} as const;

/**
 * Descarga directa de la plantilla: archivo Excel editable y gratuito,
 * con datos de ejemplo. Sin registro, sin email y sin checkout.
 */
export const DESCARGA = {
  url: '/descargas/plantilla-controla-tu-dinero.xlsx',
  label: 'Descargar plantilla gratis',
  aviso: 'Archivo .xlsx · Editable · Sin registro · Datos de ejemplo incluidos',
} as const;

export const MODULOS: Modulo[] = [
  {
    id: 'dashboard',
    nombre: 'Dashboard mensual',
    problema:
      'Ver la foto completa del mes de un vistazo: ingresos, gastos, dinero disponible, mayor gasto y estado general, sin bucear entre hojas.',
    relacionada: { label: 'Calculadora de presupuesto mensual', href: '/calculadoras/presupuesto-mensual' },
  },
  {
    id: 'ingresos',
    nombre: 'Registro de ingresos',
    problema:
      'Saber cuánto entra de verdad cada mes: nómina, pagas extra e ingresos irregulares, para no presupuestar sobre cifras infladas.',
    relacionada: { label: 'Guía: cómo organizar tu primer sueldo', href: '/guias/como-organizar-tu-primer-sueldo' },
  },
  {
    id: 'gastos',
    nombre: 'Registro de gastos',
    problema:
      'Responder a la pregunta "¿dónde se me va el dinero?" con un registro por categorías que alimenta el resto de módulos automáticamente.',
    relacionada: { label: 'Guía: errores al organizar tu dinero', href: '/guias/errores-al-organizar-tu-dinero' },
  },
  {
    id: 'presupuesto',
    nombre: 'Presupuesto mensual',
    problema:
      'Comparar lo que pensabas gastar con lo que has gastado de verdad, categoría a categoría, con estado visual de cada desvío.',
    relacionada: { label: 'Calculadora de presupuesto mensual', href: '/calculadoras/presupuesto-mensual' },
  },
  {
    id: 'objetivos',
    nombre: 'Objetivos de ahorro',
    problema:
      'Pasar de "quiero ahorrar" a objetivos con cifra, fecha y ahorro mensual necesario: emergencias, mudanza, formación, viajes.',
    relacionada: { label: 'Guía: cómo calcular tu capacidad de ahorro', href: '/guias/como-calcular-tu-capacidad-de-ahorro' },
  },
  {
    id: 'fondo-emergencia',
    nombre: 'Fondo de emergencia',
    problema:
      'Dimensionar tu colchón para imprevistos según tus gastos esenciales y hacer seguimiento del progreso sin perder el hilo.',
    relacionada: { label: 'Calculadora de fondo de emergencia', href: '/calculadoras/fondo-emergencia' },
  },
  {
    id: 'alquiler',
    nombre: 'Simulador de alquiler',
    problema:
      'Comprobar cuánto pesaría un alquiler concreto sobre tu sueldo y cuánto te quedaría para vivir antes de comprometerte.',
    relacionada: { label: 'Calculadora de alquiler máximo', href: '/calculadoras/alquiler-maximo' },
  },
  {
    id: 'mudanza',
    nombre: 'Simulador de mudanza',
    problema:
      'Calcular el coste total de entrada de una mudanza —fianza, primer mes, transporte, muebles, colchón— antes de firmar nada.',
    relacionada: { label: 'Calculadora de coste de mudanza', href: '/calculadoras/coste-mudanza' },
  },
  {
    id: 'vivir-solo-compartir',
    nombre: 'Vivir solo vs compartir piso',
    problema:
      'Comparar el coste total mensual y anual de cada opción con tus números, y ver qué parte del sueldo se lleva cada escenario.',
    relacionada: { label: 'Calculadora vivir solo vs compartir', href: '/calculadoras/vivir-solo-compartir' },
  },
  {
    id: 'revision',
    nombre: 'Revisión mensual guiada',
    problema:
      'Cerrar cada mes en diez minutos con preguntas concretas y dejar el presupuesto del mes siguiente ajustado a tu realidad.',
    relacionada: { label: 'Guía: cómo crear un presupuesto mensual', href: '/guias/como-crear-un-presupuesto-mensual' },
  },
];
