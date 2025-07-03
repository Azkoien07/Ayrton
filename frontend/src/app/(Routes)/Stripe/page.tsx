'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, Menu, X } from 'lucide-react';
import PaymentForm from '@components/PaymentForm';
import { useSearchParams, useRouter } from 'next/navigation';

export default function PagoPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const price = searchParams.get('price');
    const initialAmount = price ? parseFloat(price) : 0;

    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const handleGoBack = () => {
        router.push('/Pay');
    };

    return (
        <div className="min-h-screen bg-light-background dark:bg-dark-background flex">
             
            )

            <main className="flex-1 flex flex-col min-w-0">
                {/* Header */}
                <header className="bg-light-surface dark:bg-dark-surface border-b border-light-border dark:border-dark-border">
                    <div className="px-4 py-4 sm:px-6 sm:py-6">
                        <div className="max-w-none lg:max-w-6xl xl:max-w-7xl mx-auto">
                            <div className="flex items-center gap-3 sm:gap-4">

                                <button
                                    onClick={handleGoBack}
                                    className="p-2 text-light-textSecondary dark:text-dark-textSecondary hover:text-light-text dark:hover:text-dark-text transition-colors rounded-lg hover:bg-light-border dark:hover:bg-dark-border"
                                >
                                    <ArrowLeft className="w-5 h-5" />
                                </button>

                                <div className="min-w-0 flex-1">
                                    <h1 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-light-text dark:text-dark-text truncate">
                                        Realiza tu Pago
                                    </h1>
                                    <p className="text-xs sm:text-sm lg:text-base text-light-textSecondary dark:text-dark-textSecondary mt-1 hidden sm:block">
                                        Completa los detalles de tu pago de forma segura
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="flex-1 flex items-center justify-center px-4 py-6 sm:px-6 lg:px-8">
                    <div className="w-full max-w-lg">
                        <PaymentForm initialAmount={initialAmount} initialCurrency="COP" />
                        <div className="mt-6 text-center">
                            <button
                                onClick={() => router.push('/Pay')}
                                className="text-light-textSecondary dark:text-dark-textSecondary hover:text-light-primary dark:hover:text-dark-primary transition-colors text-sm"
                            >
                                Volver a Planes de Suscripción
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
