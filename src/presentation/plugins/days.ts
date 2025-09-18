import dayjs from 'dayjs';
import 'dayjs/locale/es';

dayjs.locale('es');

export const formatDate =(fechaISO: string | Date, format: string = 'MMMM DD, YYYY'): string => {
    const parsed = dayjs(fechaISO);

    if (!parsed.isValid()) {
      return 'Fecha no disponible';
    }
  
    const formateada = parsed.format('MMMM D, YYYY');
    return formateada.charAt(0).toUpperCase() + formateada.slice(1);
}
