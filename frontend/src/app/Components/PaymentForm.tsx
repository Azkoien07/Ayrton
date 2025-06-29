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

export default function PaymentForm() {
    const dispatch = useDispatch<AppDispatch>();
    const stripe = useStripe();
    const elements = useElements();

    const { clientSecret, loading, error } = useSelector((state: RootState) => state.stripe);

    const [amountUSD, setAmountUSD] = useState<number>(0);
    const [amountCOP, setAmountCOP] = useState<number>(0);
    const [currency, setCurrency] = useState<'USD' | 'COP'>('USD');
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
        <div className="max-w-md mx-auto">
            <form
                onSubmit={handleSubmit}
                className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl shadow-2xl p-12 space-y-4"
            >
                <PaymentFormHeader />
                <AmountInput
                    amountUSD={amountUSD}
                    amountCOP={amountCOP}
                    currency={currency}
                    handleAmountChange={handleAmountChange}
                    setCurrency={setCurrency}
                    formatCurrency={formatCurrency}
                    USD_TO_COP_RATE={USD_TO_COP_RATE}
                />
                <PaymentMethodSelector method={method} setMethod={setMethod} />
                <CardInfoInput cardFocused={cardFocused} setCardFocused={setCardFocused} />
                <PaymentButton
                    loading={loading}
                    stripe={stripe}
                    amountUSD={amountUSD}
                    formatCurrency={formatCurrency}
                />
                <SecurityInfo />
                <PaymentErrorDisplay error={error} />
            </form>
        </div>
    );
}
