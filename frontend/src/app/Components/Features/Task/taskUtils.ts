import { Priority } from '@/generated/graphql';

/** Formatea fecha ISO a "YYYY-MM-DDTHH:mm:ss" */
export const formatToLocalDateTime = (value: string) =>
    new Date(value).toISOString().slice(0, 19);

export const calcularTiempoTranscurrido = (fechaCreacion: string) => {
    const ahora = new Date();
    const fechaInicio = new Date(fechaCreacion);
    const diferencia = ahora.getTime() - fechaInicio.getTime();

    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    if (dias > 0) return `${dias} día${dias > 1 ? 's' : ''} ${horas}h`;
    if (horas > 0) return `${horas} hora${horas > 1 ? 's' : ''}`;

    const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
    return `${minutos} min`;
};

export const esVencida = (fExpiration: string) =>
    new Date(fExpiration) < new Date();

export const getPrioridadColor = (priority: Priority): string => {
    const colors = {
        [Priority.Alta]: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
        [Priority.Media]: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
        [Priority.Baja]: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
    };
    return colors[priority] || 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
};

export const mapStateToStatus = (state: boolean): 'completada' | 'pendiente' =>
    state ? 'completada' : 'pendiente';

export const getEstadoColor = (status: 'completada' | 'pendiente'): string => {
    const colors = {
        completada: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
        pendiente: 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400',
    };
    return colors[status] || 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
};
