import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import type { AppDispatch, RootState } from "@/app/Redux/store";
import { AddPaymentMutationVariables, UpdatePaymentMutationVariables } from '@/generated/graphql'
import { fetchPayments, addPayment, updatePayment, deletePayment } from '@slice/paymentSlice';

// Fetch all Payments
const dispatch = useDispatch<AppDispatch>();
const { data, loading, totalItems } = useSelector(
    (state: RootState) => state.payment
);
const [page, setPage] = useState(0);
const itemsPerPage = 5;

useEffect(() => {
    dispatch(fetchPayments({ page: 0, size: 5 }))
}, [dispatch, page, itemsPerPage]);

// Handlers for payment operations
const handleAddPayment = async (data: AddPaymentMutationVariables["input"]) => {
    try {
        const result = await dispatch(addPayment(data));

        if (addPayment.rejected.match(result)) {
            const message =
                result.payload?.message ||
                result.error?.message ||
                "Error desconocido al registrar el pago";
            toast.error(`Error al registrar el pago: ${message}`);
            return false;
        }

        toast.success("Pago registrado exitosamente");
        return true;
    } catch (e: any) {
        toast.error(
            `Excepción no controlada al registrar el pago: ${e?.message || "Error desconocido"}`
        );
        return false;
    }
};

const handleUpdatePayment = async (data: UpdatePaymentMutationVariables) => {
    try {
        const result = await dispatch(updatePayment(data));

        if (updatePayment.rejected.match(result)) {
            const message =
                result.payload?.message ||
                result.error?.message ||
                "Error desconocido al actualizar el pago";
            toast.error(`Error al actualizar el pago: ${message}`);
            return false;
        }

        toast.success("Pago actualizado exitosamente");
        return true;
    } catch (e: any) {
        toast.error(
            `Excepción no controlada al actualizar el pago: ${e?.message || "Error desconocido"}`
        );
        return false;
    }
};

const handleDeletePayment = async (paymentId: string, paymentName: string) => {
    try {
        const result = await dispatch(deletePayment(paymentId));

        if (deletePayment.rejected.match(result)) {
            const message =
                result.payload?.message ||
                result.error?.message ||
                "Error desconocido al eliminar el pago";
            toast.error(`Error al eliminar el pago: ${message}`);
            return false;
        }

        toast.success("Pago eliminado exitosamente");
        return true;
    } catch (e: any) {
        toast.error(
            `Excepción no controlada al eliminar el pago: ${e?.message || "Error desconocido"}`
        );
        return false;
    }
};