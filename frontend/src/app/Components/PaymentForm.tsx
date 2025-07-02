'use client';

import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/Redux/store';
import { createStripePaymentIntent, resetStripePayment } from '@slice/stripePaymentSlice';
import { PaymentInput, PaymentMethod } from '@/generated/graphql';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import clsx from 'clsx';
import PaymentFormHeader from './PaymentFormComponents/PaymentFormHeader';
import AmountInput from './PaymentFormComponents/AmountInput';
import PaymentMethodSelector from './PaymentFormComponents/PaymentMethodSelector';
import CardInfoInput from './PaymentFormComponents/CardInfoInput';
import PaymentButton from './PaymentFormComponents/PaymentButton';
import SecurityInfo from './PaymentFormComponents/SecurityInfo';
import PaymentErrorDisplay from './PaymentFormComponents/PaymentErrorDisplay';

const USD_TO_COP_RATE = 4200;

interface PaymentFormProps {
    initialAmount?: number;
    initialCurrency?: 'USD' | 'COP';
}

export default function PaymentForm({ initialAmount = 0, initialCurrency = 'USD' }: PaymentFormProps) {
    const dispatch = useDispatch<AppDispatch>();
    const stripe = useStripe();
    const elements = useElements();

    const { clientSecret, loading, error } = useSelector((state: RootState) => state.stripe);

    const [amountUSD, setAmountUSD] = useState<number>(initialCurrency === 'USD' ? initialAmount : Number((initialAmount / USD_TO_COP_RATE).toFixed(2)));
    const [amountCOP, setAmountCOP] = useState<number>(initialCurrency === 'COP' ? initialAmount : Math.round(initialAmount * USD_TO_COP_RATE));
    const [currency, setCurrency] = useState<'USD' | 'COP'>(initialCurrency);
    const [method, setMethod] = useState<PaymentMethod>(PaymentMethod.TarjetaCredito);
    const [cardFocused, setCardFocused] = useState(false);

    useEffect(() => {
        if (currency === 'USD') {
            setAmountCOP(Math.round(amountUSD * USD_TO_COP_RATE));
        } else {
            setAmountUSD(Number((amountCOP / USD_TO_COP_RATE).toFixed(2)));
        }
    }, [amountUSD, amountCOP, currency]);

    const handleAmountChange = (value: number) => {
        if (currency === 'USD') {
            setAmountUSD(value);
        } else {
            setAmountCOP(value);
        }
    };

    const toggleCurrency = () => {
        setCurrency(prev => prev === 'USD' ? 'COP' : 'USD');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        if (amountUSD <= 0) {
            toast.error(' El monto debe ser mayor a cero');
            return;
        }

        const input: PaymentInput = {
            purchaseAmount: amountUSD, 
            paymentMethod: method,
        };

        const res = await dispatch(createStripePaymentIntent(input));
        if (createStripePaymentIntent.rejected.match(res)) {
            toast.error(' Error creando PaymentIntent');
            return;
        }

        if (!clientSecret) {
            toast.error(' clientSecret no disponible');
            return;
        }

        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)!,
            },
        });

        if (result.error) {
            toast.error(` Pago fallido: ${result.error.message}`);
        } else if (result.paymentIntent?.status === 'succeeded') {
            toast.success(' ¡Pago exitoso!');
            dispatch(resetStripePayment());
            setAmountUSD(0);
            setAmountCOP(0);
        }
    };

    const formatCurrency = (amount: number, currencyType: 'USD' | 'COP') => {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: currencyType,
            minimumFractionDigits: currencyType === 'COP' ? 0 : 2,
            maximumFractionDigits: currencyType === 'COP' ? 0 : 2,
        }).format(amount);
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#F9FAFB' }}>
           
            
            <div className="w-full max-w-lg">
                <form
                    onSubmit={handleSubmit}
                    className="rounded-2xl shadow-lg border p-8 space-y-6"
                    style={{ 
                        backgroundColor: '#FFFFFF',
                        borderColor: '#D1D5DB',
                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                    }}
                >
                    {/* Header Section */}
                    <div className="text-center pb-4 border-b" style={{ borderColor: '#E5E9F3' }}>
                        <h2 className="text-2xl font-bold mb-2" style={{ color: '#374151' }}>
                            Procesar Pago
                        </h2>
                        <p className="text-sm" style={{ color: '#6B7280' }}>
                            Complete la información para realizar su pago de forma segura
                        </p>
                    </div>

                    {/* Amount Section */}
                    <div className="space-y-4">
                        <AmountInput
                            amountUSD={amountUSD}
                            amountCOP={amountCOP}
                            currency={currency}
                            handleAmountChange={handleAmountChange}
                            setCurrency={setCurrency}
                            formatCurrency={formatCurrency}
                            USD_TO_COP_RATE={USD_TO_COP_RATE}
                        />
                    </div>

                    {/* Payment Method Section */}
                    <div className="space-y-4">
                        <PaymentMethodSelector method={method} setMethod={setMethod} />
                    </div>

                    {/* Card Information Section */}
                    <div className="space-y-4">
                        <CardInfoInput cardFocused={cardFocused} setCardFocused={setCardFocused} />
                    </div>

                    {/* Action Button */}
                    <div className="pt-4">
                        <PaymentButton
                            loading={loading}
                            stripe={stripe}
                            amountUSD={amountUSD}
                            formatCurrency={formatCurrency}
                        />
                    </div>

                    {/* Security Info */}
                    <div className="pt-2">
                        <SecurityInfo />
                    </div>

                    {/* Error Display */}
                    {error && (
                        <div className="pt-2">
                            <PaymentErrorDisplay error={error} />
                        </div>
                    )}
                </form>

                {/* Additional Security Badge */}
                <div className="mt-6 flex items-center justify-center space-x-4 text-xs" style={{ color: '#6B7280' }}>
                    <div className="flex items-center space-x-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                        <span>Cifrado SSL</span>
                    </div>
                    <div className="flex items-center space-x-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Pagos Seguros</span>
                    </div>
                    <div className="flex items-center space-x-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Verificado</span>
                    </div>
                </div>
            </div>
        </div>
    );
}