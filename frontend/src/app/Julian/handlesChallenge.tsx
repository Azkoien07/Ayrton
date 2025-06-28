import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { fetchChallenges, addChallenge, updateChallenge, deleteChallenge } from '@slice/challengeSlice'
import type { AppDispatch, RootState } from "@/app/Redux/store";
import { AddChallengeMutationVariables, UpdateChallengeMutationVariables } from "@/generated/graphql";

// Fetch allChallenges
const dispatch = useDispatch<AppDispatch>();
const { data, loading, totalItems } = useSelector(
    (state: RootState) => state.challenge
);
const [page, setPage] = useState(0);
const itemsPerPage = 5;

useEffect(() => {
    dispatch(fetchChallenges({ page, size: itemsPerPage }));
}), [dispatch, page, itemsPerPage]

// Handlers for challenge operations
const handleAddChallenge = async (data: AddChallengeMutationVariables["input"]) => {
    try {
        const result = await dispatch(addChallenge(data));

        if (addChallenge.rejected.match(result)) {
            const message =
                result.payload?.message ||
                result.error?.message ||
                "Error desconocido al registrar el desafío";
            toast.error(`Error al registrar el desafío: ${message}`);
            return false;
        }

        toast.success("Desafío registrado exitosamente");
        return true;
    } catch (e: any) {
        toast.error(
            `Excepción no controlada al registrar el desafío: ${e?.message || "Error desconocido"}`
        );
        return false;
    }
};

const handleUpdateChallenge = async (data: UpdateChallengeMutationVariables) => {
    try {
        const result = await dispatch(updateChallenge(data));

        if (updateChallenge.rejected.match(result)) {
            const message =
                result.payload?.message ||
                result.error?.message ||
                "Error desconocido al actualizar el desafío";
            toast.error(`Error al actualizar el desafío: ${message}`);
            return false;
        }

        toast.success("Desafío actualizado exitosamente");
        return true;
    } catch (e: any) {
        toast.error(
            `Excepción no controlada al actualizar el desafío: ${e?.message || "Error desconocido"}`
        );
        return false;
    }
};

const handleDeleteChallenge = async (challengeId: string, challengeName: string) => {
    try {
        const result = await dispatch(deleteChallenge(challengeId));

        if (deleteChallenge.rejected.match(result)) {
            const message =
                result.payload?.message ||
                result.error?.message ||
                "Error desconocido al eliminar el desafío";
            toast.error(`Error al eliminar el desafío: ${message}`);
            return false;
        }

        toast.success(`Desafío ${challengeName} eliminado exitosamente`);
        return true;
    } catch (e: any) {
        toast.error(
            `Excepción no controlada al eliminar el desafío: ${e?.message || "Error desconocido"}`
        );
        return false;
    }
}