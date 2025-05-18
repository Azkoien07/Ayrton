'use client';

import { ApolloProvider } from '@apollo/client';
import { Toaster } from 'sonner';
import client from './Lib/apollo-client';
import { ReactNode } from 'react';

export function ApolloWrapper({ children }: { children: ReactNode }) {
    return (
        <ApolloProvider client={client}>
            <Toaster richColors position="top-center" />
            {children}
        </ApolloProvider>
    );
}
