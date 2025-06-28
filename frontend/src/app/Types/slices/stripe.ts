export interface StripePaymentState {
    clientSecret: string | null;
    loading: boolean;
    error: string | null;
}

export const initialState: StripePaymentState = {
    clientSecret: null,
    loading: false,
    error: null,
};