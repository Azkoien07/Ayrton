'use client';

import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/Redux/store';
import { createStripePaymentIntent, resetStripePayment } from '@slice/stripePaymentSlice';
import { PaymentInput, PaymentMethod } from '@/generated/graphql';
import { useState } from 'react';
import { toast } from 'sonner';
import clsx from 'clsx';

export default function PaymentForm() {
    const dispatch = useDispatch<AppDispatch>();
    const stripe = useStripe();
    const elements = useElements();

    const { clientSecret, loading, error } = useSelector((state: RootState) => state.stripe);

    const [amount, setAmount] = useState<number>(0);
    const [method, setMethod] = useState<PaymentMethod>(PaymentMethod.TarjetaCredito);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        const input: PaymentInput = {
            purchaseAmount: amount,
            paymentMethod: method,
        };

        const res = await dispatch(createStripePaymentIntent(input));
        if (createStripePaymentIntent.rejected.match(res)) {
            toast.error('❌ Error creando PaymentIntent');
            return;
        }

        if (!clientSecret) {
            toast.error('⚠️ clientSecret no disponible');
            return;
        }

        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)!,
            },
        });

        if (result.error) {
            toast.error(`❌ Pago fallido: ${result.error.message}`);
        } else if (result.paymentIntent?.status === 'succeeded') {
            toast.success('✅ ¡Pago exitoso!');
            dispatch(resetStripePayment());
            setAmount(0); // limpiar
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-2xl shadow p-6 space-y-6"
        >
            <h2 className="text-xl font-semibold text-light-primary dark:text-dark-primary">Información del Pago</h2>

            <div>
                <label className="block text-light-text dark:text-dark-text mb-1 font-medium">Monto (USD)</label>
                <input
                    type="number"
                    className="w-full px-4 py-2 rounded-xl border border-light-border dark:border-dark-border bg-white dark:bg-dark-background text-light-text dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary"
                    value={amount}
                    min={1}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    required
                />
            </div>

            <div>
                <label className="block text-light-text dark:text-dark-text mb-1 font-medium">Método de Pago</label>
                <select
                    className="w-full px-4 py-2 rounded-xl border border-light-border dark:border-dark-border bg-white dark:bg-dark-background text-light-text dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary"
                    value={method}
                    onChange={(e) => setMethod(e.target.value as PaymentMethod)}
                >
                    <option value={PaymentMethod.TarjetaCredito}>Tarjeta de Crédito</option>
                    <option value={PaymentMethod.TarjetaDebito}>Tarjeta de Débito</option>
                    <option value={PaymentMethod.Paypal}>PayPal</option>
                </select>
            </div>

            <div>
                <label className="block text-light-text dark:text-dark-text mb-1 font-medium">Tarjeta</label>
                <div className="px-4 py-3 border border-light-border dark:border-dark-border rounded-xl bg-white dark:bg-dark-background">
                    <CardElement
                        options={{
                            style: {
                                base: {
                                    fontSize: '16px',
                                    color: '#374151',
                                    '::placeholder': {
                                        color: '#9CA3AF',
                                    },
                                },
                                invalid: {
                                    color: '#EF4444',
                                },
                            },
                        }}
                    />
                </div>
            </div>

            <button
                type="submit"
                disabled={!stripe || loading}
                className={clsx(
                    'w-full py-3 rounded-xl text-white font-semibold transition',
                    loading
                        ? 'bg-light-accent dark:bg-dark-accent cursor-not-allowed'
                        : 'bg-light-primary hover:bg-light-secondary dark:bg-dark-primary dark:hover:bg-dark-secondary'
                )}
            >
                {loading ? 'Procesando...' : 'Pagar'}
            </button>

            {error && (
                <p className="text-light-error dark:text-dark-error text-sm text-center">
                    ⚠️ {error}
                </p>
            )}
        </form>
    );
}
