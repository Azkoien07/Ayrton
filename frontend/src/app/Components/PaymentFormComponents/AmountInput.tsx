import React from 'react';
import clsx from 'clsx';

interface AmountInputProps {
    amountUSD: number;
    amountCOP: number;
    currency: 'USD' | 'COP';
    handleAmountChange: (value: number) => void;
    setCurrency: React.Dispatch<React.SetStateAction<'USD' | 'COP'>>;
    formatCurrency: (amount: number, currencyType: 'USD' | 'COP') => string;
    USD_TO_COP_RATE: number;
}

export default function AmountInput({
    amountUSD,
    amountCOP,
    currency,
    handleAmountChange,
    setCurrency,
    formatCurrency,
    USD_TO_COP_RATE
}: AmountInputProps) {
    return (
        <div className="space-y-3">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-semibold">
                Monto a pagar
            </label>

            {/* Selector de moneda */}
            <div className="flex bg-gray-100 dark:bg-gray-800 rounded-2xl p-1">
                <button
                    type="button"
                    onClick={() => setCurrency('USD')}
                    className={clsx(
                        'flex-1 py-2 px-4 rounded-xl text-sm font-medium transition-all duration-200',
                        currency === 'USD'
                            ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-md'
                            : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                    )}
                >
                    USD 🇺🇸
                </button>
                <button
                    type="button"
                    onClick={() => setCurrency('COP')}
                    className={clsx(
                        'flex-1 py-2 px-4 rounded-xl text-sm font-medium transition-all duration-200',
                        currency === 'COP'
                            ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-md'
                            : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                    )}
                >
                    COP 🇨🇴
                </button>
            </div>

            {/* Input de monto */}
            <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 font-medium">
                    {currency === 'USD' ? '$' : '$'}
                </span>
                <input
                    type="number"
                    disabled
                    className="w-full pl-8 pr-4 py-4 rounded-2xl border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-lg font-semibold focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900 transition-all duration-200"
                    value={currency === 'USD' ? amountUSD : amountCOP}
                    min={currency === 'USD' ? 0.01 : 1}
                    step={currency === 'USD' ? 0.01 : 1}
                    onChange={(e) => handleAmountChange(Number(e.target.value))}
                    placeholder={currency === 'USD' ? '0.00' : '0'}
                    required
                />
            </div>

            {/* Conversión automática */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-3">
                <div className="flex items-center justify-between text-sm">
                    <span className="text-blue-700 dark:text-blue-300 font-medium">
                        Equivalencia:
                    </span>
                    <span className="text-blue-800 dark:text-blue-200 font-semibold">
                        {currency === 'USD'
                            ? formatCurrency(amountCOP, 'COP')
                            : formatCurrency(amountUSD, 'USD')
                        }
                    </span>
                </div>
                <div className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                    Tasa: 1 USD = {USD_TO_COP_RATE.toLocaleString('es-CO')} COP
                </div>
            </div>
        </div>
    );
}
