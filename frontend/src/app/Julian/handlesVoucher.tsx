import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import type { AppDispatch, RootState } from "@/app/Redux/store";
import { AddVoucherMutationVariables, UpdateVoucherMutationVariables } from "@/generated/graphql";
import { fetchVouchers, addVoucher, updateVoucher, deleteVoucher } from '@slice/voucherSlice';

// Fetch all Vouchers
const dispatch = useDispatch<AppDispatch>();
const { data, loading, totalItems } = useSelector(
    (state: RootState) => state.pqr
);
const [page, setPage] = useState(0);
const itemsPerPage = 5;

useEffect(() => {
    dispatch(fetchVouchers({ page, size: itemsPerPage }))
}, [dispatch, page, itemsPerPage]);

// Handlers for Voucher operations
const handleAddVocuher = async (data: AddVoucherMutationVariables["input"]) => {
    try {
        const result = await dispatch(addVoucher(data));

        if (addVoucher.rejected.match(result)) {
            const message =
                result.payload?.message ||
                result.error?.message ||
                "Error desconocido al registrar el voucher";
            toast.error(`Error al registrar el voucher: ${message}`);
            return false;
        }

        toast.success("Voucher registrado exitosamente");
        return true;
    } catch (e: any) {
        toast.error(
            `Excepción no controlada al registrar el voucher: ${e?.message || "Error desconocido"}`
        );
        return false;
    }
};

const handleUpdateVoucher = async (data: UpdateVoucherMutationVariables) => {
    try {
        const result = await dispatch(updateVoucher(data));

        if (updateVoucher.rejected.match(result)) {
            const message =
                result.payload?.message ||
                result.error?.message ||
                "Error desconocido al actualizar el voucher";
            toast.error(`Error al actualizar el voucher: ${message}`);
            return false;
        }

        toast.success("Voucher actualizado exitosamente");
        return true;
    } catch (e: any) {
        toast.error(
            `Excepción no controlada al actualizar el voucher: ${e?.message || "Error desconocido"}`
        );
        return false;
    }
};

const handleDeleteVoucher = async (voucherId: string, voucherName: string) => {
    try {
        const result = await dispatch(deleteVoucher(voucherId));

        if (deleteVoucher.rejected.match(result)) {
            const message =
                result.payload?.message ||
                result.error?.message ||
                "Error desconocido al eliminar el voucher";
            toast.error(`Error al eliminar el voucher: ${message}`);
            return false;
        }

        toast.success(`Voucher ${voucherName} eliminado exitosamente`);
        return true;
    } catch (e: any) {
        toast.error(
            `Excepción no controlada al eliminar el voucher: ${e?.message || "Error desconocido"}`
        );
        return false;
    }
};