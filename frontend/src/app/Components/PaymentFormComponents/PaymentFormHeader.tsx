import React from 'react';

export default function PaymentFormHeader() {
    return (
        <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-16 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-white dark:to-gray-200 bg-clip-text text-transparent">
                Información del Pago
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
                Completa los datos para procesar tu pago
            </p>
        </div>
    );
}
