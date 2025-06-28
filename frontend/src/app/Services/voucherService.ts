import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { PaginationParams } from '@Types/pagination';
import { VoucherEntity, VoucherCreateRequest } from '@Types/voucher';
import { GET_ALL_VOUCHERS, GET_VOUCHER_BY_ID, ADD_VOUCHER, UPDATE_VOUCHER, DELETE_VOUCHER } from '@graphql/Vouchers/vouchersGraph';
import {
    VoucherInput,
    VoucherUpdateInput,
    GetAllVouchersQuery,
    GetAllVouchersQueryVariables,
    GetVoucherByIdQuery,
    GetVoucherByIdQueryVariables,
    AddVoucherMutation,
    AddVoucherMutationVariables,
    UpdateVoucherMutation,
    UpdateVoucherMutationVariables,
    DeleteVoucherMutation,
    DeleteVoucherMutationVariables
} from '@/generated/graphql';

class VoucherService {
    private client: ApolloClient<NormalizedCacheObject>;

    constructor(client: ApolloClient<NormalizedCacheObject>) {
        this.client = client;
    }

    async getVouchers(pagination: PaginationParams): Promise<VoucherEntity[]> {
        try {
            const { data } = await this.client.query<GetAllVouchersQuery, GetAllVouchersQueryVariables>({
                query: GET_ALL_VOUCHERS,
                variables: { page: pagination.page, size: pagination.size },
                fetchPolicy: 'network-only'
            });
            return data.allVouchers as VoucherEntity[];
        } catch (error) {
            console.error('Error en getVouchers:', error);
            throw error;
        }
    }

    async getVoucherById(id: string): Promise<VoucherEntity> {
        try {
            const { data } = await this.client.query<GetVoucherByIdQuery, GetVoucherByIdQueryVariables>({
                query: GET_VOUCHER_BY_ID,
                variables: { id },
                fetchPolicy: 'network-only'
            });
            if (!data.voucherById) {
                throw new Error(`Voucher con ID ${id} no encontrado`);
            }
            return data.voucherById as VoucherEntity;
        } catch (error) {
            console.error('Error en getVoucherById:', error);
            throw error;
        }
    }

    async createVoucher(voucher: VoucherCreateRequest): Promise<VoucherEntity> {
        try {
            const { data } = await this.client.mutate<AddVoucherMutation, AddVoucherMutationVariables>({
                mutation: ADD_VOUCHER,
                variables: { input: voucher as VoucherInput }
            });
            if (!data?.addVoucher) {
                throw new Error("Failed to add voucher");
            }
            return data.addVoucher as VoucherEntity;
        } catch (error) {
            console.error('Error en createVoucher:', error);
            throw error;
        }
    }

    async updateVoucher(id: string, voucher: Partial<VoucherCreateRequest>): Promise<VoucherEntity> {
        try {
            const { data } = await this.client.mutate<UpdateVoucherMutation, UpdateVoucherMutationVariables>({
                mutation: UPDATE_VOUCHER,
                variables: { id, input: voucher as VoucherUpdateInput }
            });
            if (!data?.updateVoucher) {
                throw new Error("Failed to update voucher");
            }
            return data.updateVoucher as VoucherEntity;
        } catch (error) {
            console.error('Error en updateVoucher:', error);
            throw error;
        }
    }

    async deleteVoucher(id: string): Promise<void> {
        try {
            const { data } = await this.client.mutate<DeleteVoucherMutation, DeleteVoucherMutationVariables>({
                mutation: DELETE_VOUCHER,
                variables: { id }
            });
            if (!data?.deleteVoucher) {
                throw new Error("Failed to delete voucher");
            }
        } catch (error) {
            console.error('Error en deleteVoucher:', error);
            throw error;
        }
    }

    // No hay un equivalente directo para getVoucherPayments en el esquema GraphQL proporcionado.
    // async getVoucherPayments(id: number): Promise<PaymentEntity[]> {
    //     // Implementación con fetch si es necesario, o añadir query GraphQL
    //     throw new Error("getVoucherPayments no implementado con Apollo Client");
    // }
}

export default VoucherService;
