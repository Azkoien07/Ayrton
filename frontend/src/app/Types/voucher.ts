export interface VoucherEntity {
    id: string;
    code: string;
    paymentId: string;

}

export interface VoucherCreateRequest {
    code: string;
    paymentId: number;
}
