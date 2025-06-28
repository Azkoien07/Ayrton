import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import type { AppDispatch, RootState } from "@/app/Redux/store";
import { AddPqrMutationVariables, UpdatePqrMutationVariables } from "@/generated/graphql";
import { fetchPqrs, addPqr, updatePqr, deletePqr } from '@slice/pqrSlice';

const dispatch = useDispatch<AppDispatch>();
const { data, loading, totalItems } = useSelector(
    (state: RootState) => state.pqr
);
const [page, setPage] = useState(0);
const itemsPerPage = 5;


useEffect(() => {
    dispatch(fetchPqrs({ page, size: itemsPerPage }));
}, [dispatch, page, itemsPerPage]);

// Handlers for PQR operations
const handleAddPqr = async (data: AddPqrMutationVariables["input"]) => {
    try {
        const result = await dispatch(addPqr(data));

        if (addPqr.rejected.match(result)) {
            const message =
                result.payload?.message ||
                result.error?.message ||
                "Error desconocido al registrar la PQR";
            toast.error(`Error al registrar la PQR: ${message}`);
            return false;
        }

        toast.success("PQR registrada exitosamente");
        return true;
    } catch (e: any) {
        toast.error(
            `Excepción no controlada al registrar la PQR: ${e?.message || "Error desconocido"}`
        );
        return false;
    }
};

const handleUpdatePqr = async (data: UpdatePqrMutationVariables) => {
    try {
        const result = await dispatch(updatePqr(data));

        if (updatePqr.rejected.match(result)) {
            const message =
                result.payload?.message ||
                result.error?.message ||
                "Error desconocido al actualizar la PQR";
            toast.error(`Error al actualizar la PQR: ${message}`);
            return false;
        }

        toast.success("PQR actualizada exitosamente");
        return true;
    } catch (e: any) {
        toast.error(
            `Excepción no controlada al actualizar la PQR: ${e?.message || "Error desconocido"}`
        );
        return false;
    }
};

const handleDeletePqr = async (pqrId: string, pqrName: string) => {
    try {
        const result = await dispatch(deletePqr(pqrId));

        if (deletePqr.rejected.match(result)) {
            const message =
                result.payload?.message ||
                result.error?.message ||
                "Error desconocido al eliminar la PQR";
            toast.error(`Error al eliminar la PQR: ${message}`);
            return false;
        }

        toast.success(`PQR "${pqrName}" eliminada exitosamente`);
        return true;
    } catch (e: any) {
        toast.error(
            `Excepción no controlada al eliminar la PQR: ${e?.message || "Error desconocido"}`
        );
        return false;
    }
};