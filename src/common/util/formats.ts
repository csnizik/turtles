export const formatNumber = (number: string) => {
  if (!number) return '';
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
