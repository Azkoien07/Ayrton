'use client';

import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/client';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { store } from '@/app/Redux/store'
import { Toaster } from 'sonner';
import { client } from '@lib/apollo-client';
import { ReactNode } from 'react';

const stripePromise = loadStripe("pk_test_...");

export function ApolloWrapper({ children }: { children: ReactNode }) {
    return (
        <Provider store={store}>
            <ApolloProvider client={client}>
                <Elements stripe={stripePromise}>
                    <Toaster richColors position="top-center" />
                    {children}
                </Elements>
            </ApolloProvider>
        </Provider>
    );
}