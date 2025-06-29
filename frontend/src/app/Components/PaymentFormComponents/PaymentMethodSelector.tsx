import React from 'react';
import { PaymentMethod } from '@/generated/graphql';

interface PaymentMethodSelectorProps {
    method: PaymentMethod;
    setMethod: React.Dispatch<React.SetStateAction<PaymentMethod>>;
}

export default function PaymentMethodSelector({ method, setMethod }: PaymentMethodSelectorProps) {
    return (
        <div className="space-y-3">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-semibold">
                Método de Pago
            </label>
            <div className="relative">
                <select
                    className="w-full px-4 py-4 pr-10 rounded-2xl border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 font-medium focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900 transition-all duration-200 appearance-none"
                    value={method}
                    onChange={(e) => setMethod(e.target.value as PaymentMethod)}
                >
                    <option value={PaymentMethod.TarjetaCredito}>💳 Tarjeta de Crédito</option>
                    <option value={PaymentMethod.TarjetaDebito}>💳 Tarjeta de Débito</option>
                    <option value={PaymentMethod.Paypal}>📱 PayPal</option>
                </select>
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>
        </div>
    );
}
