'use client';

import PaymentForm from '@components/PaymentForm';
import { useSearchParams, useRouter } from 'next/navigation';

export default function PagoPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const price = searchParams.get('price');
    const initialAmount = price ? parseFloat(price) : 0;

    return (
        <div className="min-h-screen bg-light-background dark:bg-dark-background flex items-center justify-center px-4">
            <div className="w-full max-w-lg">
                <h1 className="text-3xl font-bold text-light-primary dark:text-dark-primary mb-6 text-center">
                    Realiza tu Pago
                </h1>
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
    );
}
