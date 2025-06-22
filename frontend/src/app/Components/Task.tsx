'use client';
import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_PAYMENT_BY_ID } from '@graphql/Payments/paymentGraph';
import { useErrorToast } from '@utilities/useErrorToast';
import { toast } from 'sonner';

const Task = () => {
    const [paymentId, setPaymentId] = useState('');

    const { data, loading, error } = useQuery(GET_PAYMENT_BY_ID, {
        variables: { id: paymentId },
        skip: !paymentId, 
    });

   
    useErrorToast({ error });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const id = (e.target as any).paymentId.value.trim();

        if (!/^\d+$/.test(id)) {
            toast.error('Please enter a valid numeric ID');
            return;
        }

        setPaymentId(id);
    };

    return (
        <div>
            <h2>Payment Details</h2>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="paymentId"
                    placeholder="Enter Payment ID"
                    required
                />
                <button type="submit">Search Payment</button>
            </form>

            {loading && <div>Loading payment...</div>}

            {!loading && !data?.paymentById?.data && paymentId && (
                <div>No payment found for this ID.</div>
            )}

            {data?.paymentById?.data && (
                <div>
                    <h3>Payment Information</h3>
                    <p><strong>Payment ID:</strong> {data.paymentById.data.id}</p>
                    <p><strong>Amount:</strong> ${data.paymentById.data.purchaseAmount}</p>
                    <p><strong>Method:</strong> {data.paymentById.data.paymentMethod}</p>
                    <p><strong>Date:</strong> {data.paymentById.date}</p>
                    <p><strong>Code:</strong> {data.paymentById.code}</p>
                    <p><strong>Message:</strong> {data.paymentById.message}</p>
                </div>
            )}
        </div>
    );
};

export default Task;
