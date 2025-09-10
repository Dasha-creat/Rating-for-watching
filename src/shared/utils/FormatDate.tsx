export const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  return `${year}-${month}-${day}`;
};

export const formatDateRange = (range: [Date, Date] | null): string => {
  if (!Array.isArray(range) || range.length !== 2) return '';

  const [start, end] = range;
  return `${formatDate(start)} - ${formatDate(end)}`;
};