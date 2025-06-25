'use client';

import { Provider } from 'react-redux';
import { store } from '@/app/Redux/store'
import { ApolloProvider } from '@apollo/client';
import { Toaster } from 'sonner';
import { client } from '@lib/apollo-client';
import { ReactNode } from 'react';

export function ApolloWrapper({ children }: { children: ReactNode }) {
    return (
        <Provider store={store}>
            <ApolloProvider client={client}>
                <Toaster richColors position="top-center" />
                {children}
            </ApolloProvider>
        </Provider>
    );
}