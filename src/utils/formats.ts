/**
 * Format a currency in the en locale
 *
 */
export const formatCurrency = (value: number) => {
  if (!value) return '';
  const locale = 'en',
    currency = 'USD';

  let formatted = Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency
  }).format(value);

  return formatted;
};
