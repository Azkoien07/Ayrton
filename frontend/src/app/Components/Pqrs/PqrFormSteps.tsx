import React, { useState, useEffect } from 'react';
import { Send, FileText, AlertCircle, MessageSquare } from 'lucide-react';
import PqrTypeSelection from '@components/Pqrs/PqrTypeSelection';
import PqrModal from '@components/Pqrs/PqrModal';
import ContactInfoForm from '@components/Pqrs/ContactInfoForm';
import { FormErrors, pqrTypesConfig } from '@Types/Pqr';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '@/app/Redux/store';
import { addPqr } from '@slice/pqrSlice';
import { AddPqrMutationVariables, PqrInput, TypePqr } from '@/generated/graphql';
import { toast } from 'sonner';

interface PqrFormStepsProps {
    onSubmissionSuccess: (typePqr: TypePqr | undefined) => void;
}

const PqrFormSteps: React.FC<PqrFormStepsProps> = ({ onSubmissionSuccess }) => {
    const [formData, setFormData] = useState<PqrInput>({
        typePqr: TypePqr.Peticion,
        title: '',
        description: '',
        argument: '',
        userName: '',
        userEmail: '',
        userPhone: ''
    });

    const dispatch = useDispatch<AppDispatch>();
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);

    const iconMap = {
        FileText: <FileText className="w-6 h-6" />,
        AlertCircle: <AlertCircle className="w-6 h-6" />,
        MessageSquare: <MessageSquare className="w-6 h-6" />
    };

    const pqrTypes = pqrTypesConfig.map(config => ({
        ...config,
        icon: iconMap[config.iconName]
    }));

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.typePqr) {
            newErrors.typePqr = 'Debe seleccionar un tipo de PQR';
        }

        if (!formData.title.trim()) {
            newErrors.title = 'El título es obligatorio';
        } else if (formData.title.length > 50) {
            newErrors.title = 'El título no puede exceder 50 caracteres';
        }
        if (!formData.description.trim()) {
            newErrors.description = 'La descripción es obligatoria';
        } else if (formData.description.length > 1000) {
            newErrors.description = 'La descripción no puede exceder 1000 caracteres';
        }

        if (!formData.argument.trim()) {
            newErrors.argument = 'El argumento es obligatorio';
        }

        if (!formData.userName.trim()) {
            newErrors.userName = 'El nombre es obligatorio';
        }
        if (!formData.userEmail.trim()) {
            newErrors.userEmail = 'El email es obligatorio';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.userEmail)) {
            newErrors.userEmail = 'El email no tiene un formato válido';
        }
        if (!formData.userPhone.trim()) {
            newErrors.userPhone = 'El teléfono es obligatorio';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleAddPqr = async (data: AddPqrMutationVariables["input"]) => {
        try {
            const result = await dispatch(addPqr(data));

            if (addPqr.rejected.match(result)) {
                const message =
                    result.payload?.message ||
                    result.error?.message ||
                    "Error desconocido al crear la PQR";
                toast.error(`Error al crear la PQR: ${message}`);
                return false;
            }

            toast.success('PQR creada exitosamente');
            return true;
        } catch (e: any) {
            toast.error(
                `Excepción no controlada al crear la PQR: ${e?.message || "Error desconocido"}`
            );
            return false;
        }
    };

    const handleSubmit = async () => {
        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            const pqrInput: AddPqrMutationVariables["input"] = {
                typePqr: formData.typePqr,
                title: formData.title.trim(),
                description: formData.description.trim(),
                argument: formData.argument.trim(),
                userName: formData.userName.trim(),
                userEmail: formData.userEmail.trim(),
                userPhone: formData.userPhone.trim()
            };

            const success = await handleAddPqr(pqrInput);

            if (success) {
                onSubmissionSuccess(formData.typePqr);
            }
        } catch (error) {
            console.error('Error al enviar PQR:', error);
            toast.error('Error inesperado al enviar la PQR');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const nextStep = () => {
        if (currentStep === 1 && !formData.typePqr) {
            setErrors({ typePqr: 'Debe seleccionar un tipo de PQR' });
            return;
        }
        if (currentStep < 3) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const stepTitles = ['Tipo de PQR', 'Información', 'Datos de Contacto'];

    return (
        <>
            {/* Progress Steps */}
            <div className="bg-light-surface dark:bg-dark-surface border-b border-light-border dark:border-dark-border">
                <div className="px-4 py-4 sm:px-6 sm:py-6">
                    <div className="max-w-none lg:max-w-4xl xl:max-w-5xl mx-auto">
                        {/* Desktop Progress */}
                        <div className="hidden sm:flex items-center justify-center mb-6">
                            <div className="flex items-center space-x-6 md:space-x-8 lg:space-x-12 xl:space-x-16">
                                {[1, 2, 3].map((step) => (
                                    <div key={step} className="flex items-center">
                                        <div className={`w-8 h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center text-sm lg:text-base font-medium transition-all duration-300 ${step <= currentStep
                                            ? 'bg-light-primary dark:bg-dark-primary text-white shadow-lg'
                                            : 'bg-light-border dark:bg-dark-border text-light-textSecondary dark:text-dark-textSecondary'
                                            }`}>
                                            {step}
                                        </div>
                                        {step < 3 && (
                                            <div className={`w-6 md:w-8 lg:w-12 xl:w-16 h-0.5 ml-2 lg:ml-3 transition-all duration-500 ${step < currentStep
                                                ? 'bg-light-primary dark:bg-dark-primary'
                                                : 'bg-light-border dark:bg-dark-border'
                                                }`} />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Mobile Progress */}
                        <div className="sm:hidden mb-4">
                            <div className="flex items-center justify-center mb-3">
                                <span className="text-sm font-medium text-light-text dark:text-dark-text">
                                    Paso {currentStep} de 3
                                </span>
                            </div>
                            <div className="w-full bg-light-border dark:bg-dark-border rounded-full h-2.5">
                                <div
                                    className="bg-light-primary dark:bg-dark-primary h-2.5 rounded-full transition-all duration-500 ease-out"
                                    style={{ width: `${(currentStep / 3) * 100}%` }}
                                />
                            </div>
                        </div>

                        {/* Step Labels */}
                        <div className="hidden sm:flex justify-between text-xs md:text-sm lg:text-base text-light-textSecondary dark:text-dark-textSecondary max-w-md lg:max-w-lg xl:max-w-xl mx-auto">
                            {stepTitles.map((title, index) => (
                                <span
                                    key={index}
                                    className={`text-center flex-1 transition-all duration-300 ${index + 1 === currentStep
                                        ? 'text-light-primary dark:text-dark-primary font-semibold'
                                        : index + 1 < currentStep
                                            ? 'text-light-text dark:text-dark-text font-medium'
                                            : ''
                                        }`}
                                >
                                    {title}
                                </span>
                            ))}
                        </div>

                        {/* Mobile Current Step */}
                        <div className="sm:hidden text-center mt-2">
                            <span className="text-sm font-semibold text-light-primary dark:text-dark-primary">
                                {stepTitles[currentStep - 1]}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto">
                <div className="max-w-none lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl mx-auto px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
                    <div className="min-h-[400px] lg:min-h-[500px]">
                        {currentStep === 1 && (
                            <div className="w-full max-w-none lg:max-w-3xl xl:max-w-4xl mx-auto">
                                <PqrTypeSelection
                                    pqrTypes={pqrTypes}
                                    selectedType={formData.typePqr}
                                    onSelectType={(type) => {
                                        handleInputChange('typePqr', type);
                                        setErrors({});
                                    }}
                                    error={errors.typePqr}
                                />
                            </div>
                        )}

                        {currentStep === 2 && (
                            <div className="w-full max-w-none lg:max-w-2xl xl:max-w-3xl mx-auto">
                                <PqrModal
                                    formData={formData}
                                    onInputChange={handleInputChange}
                                    errors={errors}
                                />
                            </div>
                        )}

                        {currentStep === 3 && (
                            <div className="w-full max-w-none lg:max-w-2xl xl:max-w-3xl mx-auto">
                                <ContactInfoForm
                                    name={formData.userName}
                                    email={formData.userEmail}
                                    phone={formData.userPhone}
                                    typePqr={formData.typePqr}
                                    title={formData.title}
                                    description={formData.description}
                                    onInputChange={handleInputChange}
                                    errors={errors}
                                />
                            </div>
                        )}
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex flex-col sm:flex-row justify-between gap-6 mt-8 pt-6 border-t border-light-border dark:border-dark-border max-w-none lg:max-w-2xl xl:max-w-3xl mx-auto">
                        <button
                            type="button"
                            onClick={prevStep}
                            className={`order-2 sm:order-1 px-6 py-3 lg:px-8 lg:py-4 rounded-lg border border-light-border dark:border-dark-border text-light-text dark:text-dark-text hover:bg-light-border dark:hover:bg-dark-border transition-all duration-200 text-sm sm:text-base lg:text-lg font-medium ${currentStep === 1 ? 'invisible' : ''
                                }`}
                        >
                            Anterior
                        </button>

                        {currentStep < 3 ? (
                            <button
                                type="button"
                                onClick={nextStep}
                                className="order-1 sm:order-2 px-6 py-3 lg:px-8 lg:py-4 bg-light-primary dark:bg-dark-primary text-white rounded-lg hover:opacity-90 transition-all duration-200 text-sm sm:text-base lg:text-lg font-medium shadow-lg hover:shadow-xl"
                            >
                                Siguiente
                            </button>
                        ) : (
                            <button
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                className="order-1 sm:order-2 px-6 py-3 lg:px-8 lg:py-4 bg-light-primary dark:bg-dark-primary text-white rounded-lg hover:opacity-90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base lg:text-lg font-medium shadow-lg hover:shadow-xl disabled:shadow-none"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="animate-spin rounded-full h-4 w-4 lg:h-5 lg:w-5 border-b-2 border-white"></div>
                                        Enviando...
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-4 h-4 lg:w-5 lg:h-5" />
                                        Enviar PQR
                                    </>
                                )}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default PqrFormSteps;
