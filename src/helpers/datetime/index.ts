import { format } from 'date-fns';

export function formatDate(date: string | number | Date) {
  return format(date, 'DD.MM.YYYY');
}
