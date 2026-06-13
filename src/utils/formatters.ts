/** Formatea un número como euros en formato español: 1.234,56 € */
export function formatEuros(value: number, decimals = 0): string {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

/** Formatea un número como porcentaje en formato español: 32,5 % */
export function formatPercent(value: number, decimals = 1): string {
  return `${new Intl.NumberFormat('es-ES', {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
  }).format(value)} %`;
}

/** Formatea una fecha en español de España: 12 de junio de 2026 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}
