'use client';

import { ReactNode, useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { ApolloProvider } from '@apollo/client';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { store } from '@store/store'
import { Toaster } from 'sonner';
import { client } from '@lib/apollo-client';
import { loadUserFromStorage } from '@slice/authSlice';

const stripePromise = loadStripe("pk_test_51R8VDEP9jgUST7o04vyTrWUgJM4hWheO8acBRiiakoJor7T2CxdG7rqbvAlD4qgYlkMNUvreplmmyluRzF7n0dSY00QKEkfPg6");

function InitAuthLoader({ children }: { children: ReactNode }) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadUserFromStorage());
    }, [dispatch]);

    return <>{children}</>;
}

export function ApolloWrapper({ children }: { children: ReactNode }) {
    return (
        <Provider store={store}>
            <ApolloProvider client={client}>
                <Elements stripe={stripePromise}>
                    <InitAuthLoader>
                        <Toaster richColors position="top-center" />
                        {children}
                    </InitAuthLoader>
                </Elements>
            </ApolloProvider>
        </Provider>
    );
}