import { TypePqr } from '@/generated/graphql';

export interface Pqr {
    userEmail: string;
    userName: string;
    id: string;
    typePqr: TypePqr;
    title: string;
    description: string;
    argument: string;
    state: boolean; // Coincide con GraphQL
    answer: string; // Ahora es obligatorio para coincidir con GraphQL
}

export interface PqrFormData {
    typePqr: TypePqr;
    title: string;
    description: string;
    argument: string;
    userName: string;
    userEmail: string;
    userPhone: string;
    state?: boolean; // Añadido para el modal de edición
    answer?: string; // Añadido para el modal de edición
}

export interface FormErrors {
    typePqr?: string;
    title?: string;
    description?: string;
    argument?: string;
    userName?: string;
    userEmail?: string;
    userPhone?: string;
    state?: string;
    answer?: string;
}

export interface PqrTypeConfig {
    type: TypePqr;
    title: string;
    description: string;
    iconName: 'FileText' | 'AlertCircle' | 'MessageSquare';
    color: string;
}

export const pqrTypesConfig: PqrTypeConfig[] = [
    {
        type: TypePqr.Peticion,
        title: 'Petición',
        description: 'Solicitud de información, servicios o trámites',
        iconName: 'FileText',
        color: 'border-blue-300 bg-blue-50 text-blue-700 dark:border-blue-600 dark:bg-blue-900/20 dark:text-blue-300'
    },
    {
        type: TypePqr.Queja,
        title: 'Queja',
        description: 'Manifestación de inconformidad por un servicio',
        iconName: 'AlertCircle',
        color: 'border-yellow-300 bg-yellow-50 text-yellow-700 dark:border-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-300'
    },
    {
        type: TypePqr.Reclamo,
        title: 'Reclamo',
        description: 'Exigencia de reparación o compensación por un daño',
        iconName: 'MessageSquare',
        color: 'border-red-300 bg-red-50 text-red-700 dark:border-red-600 dark:bg-red-900/20 dark:text-red-300'
    }
];
