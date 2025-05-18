import { useEffect } from 'react';
import { toast } from 'sonner';
import { ApolloError } from '@apollo/client';

type UseErrorToastOptions = {
    error?: unknown;
    customMessage?: string;
};

export function useErrorToast({ error, customMessage }: UseErrorToastOptions) {
    useEffect(() => {
        if (!error) return;

        // Si es ApolloError (usa tipo guarda)
        if (error instanceof ApolloError) {
            const messages = error.graphQLErrors.length
                ? error.graphQLErrors.map(err => err.message).join(', ')
                : error.message;

            toast.error(customMessage ?? `Error: ${messages}`);
            return;
        }

        // Si es error JS común (Error)
        if (error instanceof Error) {
            toast.error(customMessage ?? `Error: ${error.message}`);
            return;
        }

        // Si es string o cualquier otro tipo
        if (typeof error === 'string') {
            toast.error(customMessage ?? `Error: ${error}`);
            return;
        }

        // Fallback genérico
        toast.error(customMessage ?? 'Ha ocurrido un error desconocido');
    }, [error, customMessage]);
}
