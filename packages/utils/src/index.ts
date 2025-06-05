/**
 * Formats a date into a string (e.g., "January 1, 2025").
 * @param date The date to format (Date object, string, or number).
 * @returns A string representation of the date.
 * @remarks If an invalid date string is provided, the behavior of `new Date(date)`
 *          can be inconsistent or throw an error. Consider adding more robust
 *          error handling or validation if needed for your use case.
 */
export function formatDate(date: Date | string | number): string {
  try {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(new Date(date));
  } catch (error) {
    console.warn(`Error formatting date: ${date}`, error);
    return String(date); // Fallback to string representation of input
  }
}

/**
 * Formats a number as currency (e.g., "R1,234.56").
 * Defaults to ZAR (South African Rand).
 * @param amount The numeric amount to format.
 * @param currency The ISO currency code (e.g., 'USD', 'EUR'). Defaults to 'ZAR'.
 * @returns A string representation of the currency.
 */
export function formatCurrency(amount: number, currency: string = 'ZAR'): string {
  return new Intl.NumberFormat('en-ZA', { // Using 'en-ZA' for South African Rand formatting
    style: 'currency',
    currency: currency,
  }).format(amount);
}

// Add more utility functions as needed
// For example:
// export function capitalizeFirstLetter(string: string): string {
//   if (!string) return '';
//   return string.charAt(0).toUpperCase() + string.slice(1);
// }
