import React from 'react';
import clsx from 'clsx';
import { StripeElements, Stripe, PaymentIntent } from '@stripe/stripe-js';

interface PaymentButtonProps {
    loading: boolean;
    stripe: Stripe | null;
    amountUSD: number;
    formatCurrency: (amount: number, currencyType: 'USD' | 'COP') => string;
}

export default function PaymentButton({ loading, stripe, amountUSD, formatCurrency }: PaymentButtonProps) {
    return (
        <button
            type="submit"
            disabled={!stripe || loading || amountUSD <= 0}
            className={clsx(
                'w-full py-4 rounded-2xl font-bold text-lg transition-all duration-200 transform',
                loading || !stripe || amountUSD <= 0
                    ? 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]'
            )}
        >
            {loading ? (
                <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Procesando...</span>
                </div>
            ) : (
                <div className="flex items-center justify-center space-x-2">
                    <span>Pagar {formatCurrency(amountUSD, 'USD')}</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 3 0 00-2 2v6a2 3 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                </div>
            )}
        </button>
    );
}
