import React from 'react';
import { CardElement } from '@stripe/react-stripe-js';
import clsx from 'clsx';

interface CardInfoInputProps {
    cardFocused: boolean;
    setCardFocused: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CardInfoInput({ cardFocused, setCardFocused }: CardInfoInputProps) {
    return (
        <div className="space-y-3">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-semibold">
                Información de la Tarjeta
            </label>
            <div 
                className={clsx(
                    'px-4 py-4 border-2 rounded-2xl bg-white dark:bg-gray-800 transition-all duration-200',
                    cardFocused 
                        ? 'border-blue-500 dark:border-blue-400 ring-4 ring-blue-100 dark:ring-blue-900' 
                        : 'border-gray-200 dark:border-gray-600'
                )}
            >
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#374151',
                                fontWeight: '500',
                                fontFamily: 'system-ui, sans-serif',
                                '::placeholder': {
                                    color: '#9CA3AF',
                                },
                            },
                            invalid: {
                                color: '#EF4444',
                            },
                        },
                    }}
                    onFocus={() => setCardFocused(true)}
                    onBlur={() => setCardFocused(false)}
                />
            </div>
        </div>
    );
}
