import { client } from '@lib/apollo-client';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { initialState } from '@Types/slices/stripe';
import { ClientSecretResponse, PaymentInput } from '@/generated/graphql';
import { CREATE_STRIPE_PAYMENT_INTENT } from '@graphql/Stripe/createStripePaymentIntent';

export const createStripePaymentIntent = createAsyncThunk<
    string,
    PaymentInput,
    { rejectValue: string }
>(
    'stripePayment/createIntent',
    async (input, thunkAPI) => {
        // Solo ejecutar en cliente
        if (typeof window === 'undefined') {
            return thunkAPI.rejectWithValue('No se puede acceder al token desde SSR');
        }

        const token = localStorage.getItem('token');
        if (!token) {
            return thunkAPI.rejectWithValue('Token no encontrado');
        }

        try {
            const { data } = await client.mutate({
                mutation: CREATE_STRIPE_PAYMENT_INTENT,
                variables: { input },
                context: {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            });

            const res = data?.createStripePaymentIntent as ClientSecretResponse;

            if (!res?.clientSecret) {
                return thunkAPI.rejectWithValue('Stripe no devolvió un clientSecret válido');
            }

            return res.clientSecret;
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.message || 'Error al crear PaymentIntent');
        }
    }
);

const stripePaymentSlice = createSlice({
    name: 'stripePayment',
    initialState,
    reducers: {
        resetStripePayment: (state) => {
            state.clientSecret = null;
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createStripePaymentIntent.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createStripePaymentIntent.fulfilled, (state, action) => {
                state.loading = false;
                state.clientSecret = action.payload;
            })
            .addCase(createStripePaymentIntent.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? 'Error desconocido';
            });
    },
});

export const { resetStripePayment } = stripePaymentSlice.actions;

export default stripePaymentSlice.reducer;
