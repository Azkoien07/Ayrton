'use client';

import PaymentForm from '@components/PaymentForm';

export default function PagoPage() {
    return (
        <div className="min-h-screen bg-light-background dark:bg-dark-background flex items-center justify-center px-4">
            <div className="w-full max-w-lg">
                <h1 className="text-3xl font-bold text-light-primary dark:text-dark-primary mb-6 text-center">
                    Realiza tu Pago
                </h1>
                <PaymentForm />
            </div>
        </div>
    );
}
