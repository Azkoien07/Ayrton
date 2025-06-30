import React from 'react';
import { CheckCircle } from 'lucide-react';
import { TypePqr } from '@/generated/graphql';

interface PqrSubmissionSuccessProps {
    typePqr: TypePqr | undefined;
    onResetForm: () => void;
    onGoBack: () => void;
}

const PqrSubmissionSuccess: React.FC<PqrSubmissionSuccessProps> = ({ typePqr, onResetForm, onGoBack }) => {
    return (
        <div className="min-h-screen bg-light-background dark:bg-dark-background flex items-center justify-center p-4">
            <div className="bg-light-surface dark:bg-dark-surface rounded-xl p-6 sm:p-8 max-w-md w-full text-center shadow-lg border border-light-border dark:border-dark-border">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-light-text dark:text-dark-text mb-4">
                    ¡PQR Enviada Exitosamente!
                </h2>
                <p className="text-sm sm:text-base text-light-textSecondary dark:text-dark-textSecondary mb-6">
                    Hemos recibido tu {typePqr?.toLowerCase()} y la procesaremos a la brevedad.
                    Te contactaremos al correo proporcionado con la respuesta.
                </p>
                <div className="space-y-3">
                    <button
                        onClick={onResetForm}
                        className="w-full bg-light-primary dark:bg-dark-primary text-white py-3 px-4 rounded-lg hover:opacity-90 transition-opacity text-sm sm:text-base"
                    >
                        Crear Nueva PQR
                    </button>
                    <button
                        onClick={onGoBack}
                        className="w-full bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text py-3 px-4 rounded-lg border border-light-border dark:border-dark-border hover:bg-light-border dark:hover:bg-dark-border transition-colors text-sm sm:text-base"
                    >
                        Volver al Inicio
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PqrSubmissionSuccess;
