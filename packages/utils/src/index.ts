export function formatDate(date: Date | string | number): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));
}

export function formatCurrency(amount: number, currency: string = 'ZAR'): string {
  return new Intl.NumberFormat('en-ZA', { // Using 'en-ZA' for South African Rand formatting
    style: 'currency',
    currency: currency,
  }).format(amount);
}

// Add more utility functions as needed
