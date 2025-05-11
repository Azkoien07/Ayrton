'use client';
import { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import GET_PAYMENT_BY_ID from '@graphql/Querys/paymentById.graphql';

const Task = () => {
    const [paymentId, setPaymentId] = useState('');

    const { data, loading, error } = useQuery(GET_PAYMENT_BY_ID, {
        variables: { id: paymentId },
        skip: !paymentId, // No hacer la consulta hasta que el ID sea proporcionado
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const id = (e.target as any).paymentId.value;
        setPaymentId(id);
    };

    if (loading) return <div>Loading payment...</div>;
    if (error) return <div>Error: {error.message}</div>;

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

            {data?.paymentById?.data ? (
                <div>
                    <h3>Payment Information</h3>
                    <p><strong>Payment ID:</strong> {data.paymentById.data.id}</p>
                    <p><strong>Amount:</strong> ${data.paymentById.data.purchaseAmount}</p>
                    <p><strong>Method:</strong> {data.paymentById.data.paymentMethod}</p>
                    <p><strong>Date:</strong> {data.paymentById.date}</p>
                    <p><strong>Code:</strong> {data.paymentById.code}</p>
                    <p><strong>Message:</strong> {data.paymentById.message}</p>
                </div>
            ) : (
                <div>No payment found for this ID.</div>
            )}
        </div>
    );
};

export default Task;