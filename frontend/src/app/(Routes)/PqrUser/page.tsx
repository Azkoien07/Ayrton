'use client';

import { useState } from 'react';
import { Send, FileText, AlertCircle, MessageSquare, ArrowLeft, CheckCircle, User, Mail, Phone } from 'lucide-react';
import { useApolloClient, NormalizedCacheObject } from '@apollo/client';
import { addPqr } from '@/app/Services/pqrService';
import { PqrInput } from '@/generated/graphql';
import Sidebar from '@/app/Components/UI/Sidebar';
import PqrTypeSelection from '@/app/Components/Pqrs/PqrTypeSelection';
import PqrModal from '@/app/Components/Pqrs/PqrModal';
import ContactInfoForm from '@/app/Components/Pqrs/ContactInfoForm';
import { usePathname } from 'next/navigation';

interface PqrFormData {
    typePqr: 'Peticion' | 'Queja' | 'Reclamo' | '';
    title: string;
    description: string;
    argument: string;
    userInfo: {
        name: string;
        email: string;
        phone: string;
    };
}

interface FormErrors {
    typePqr?: string;
    title?: string;
    description?: string;
    argument?: string;
    userInfo?: {
        name?: string;
        email?: string;
        phone?: string;
    };
}

const CreatePqrForm = () => {
    const [formData, setFormData] = useState<PqrFormData>({
        typePqr: '',
        title: '',
        description: '',
        argument: '',
        userInfo: {
            name: '',
            email: '',
            phone: ''
        }
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);

    const pqrTypes = [
        {
            type: 'Peticion' as const,
            title: 'Petición',
            description: 'Solicitud de información, servicios o trámites',
            icon: <FileText className="w-6 h-6" />,
            color: 'border-blue-300 bg-blue-50 text-blue-700 dark:border-blue-600 dark:bg-blue-900/20 dark:text-blue-300'
        },
        {
            type: 'Queja' as const,
            title: 'Queja',
            description: 'Manifestación de inconformidad por un servicio',
            icon: <AlertCircle className="w-6 h-6" />,
            color: 'border-yellow-300 bg-yellow-50 text-yellow-700 dark:border-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-300'
        },
        {
            type: 'Reclamo' as const,
            title: 'Reclamo',
            description: 'Exigencia de reparación o compensación por un daño',
            icon: <MessageSquare className="w-6 h-6" />,
            color: 'border-red-300 bg-red-50 text-red-700 dark:border-red-600 dark:bg-red-900/20 dark:text-red-300'
        }
    ];
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
        const userErrors: any = {};
        if (!formData.userInfo.name.trim()) {
            userErrors.name = 'El nombre es obligatorio';
        }
        if (!formData.userInfo.email.trim()) {
            userErrors.email = 'El email es obligatorio';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.userInfo.email)) {
            userErrors.email = 'El email no tiene un formato válido';
        }
        if (!formData.userInfo.phone.trim()) {
            userErrors.phone = 'El teléfono es obligatorio';
        }

        if (Object.keys(userErrors).length > 0) {
            newErrors.userInfo = userErrors;
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const client = useApolloClient();

    const handleSubmit = async () => {
        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

    };
    const handleInputChange = (field: string, value: string) => {
        if (field.includes('.')) {
            const [parent, child] = field.split('.');
            setFormData(prev => ({
                ...prev,
                [parent]: {
                    ...(prev[parent as keyof PqrFormData] as Record<string, any> ?? {}),
                    [child]: value
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [field]: value
            }));
        }
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

    const resetForm = () => {
        setFormData({
            typePqr: '',
            title: '',
            description: '',
            argument: '',
            userInfo: {
                name: '',
                email: '',
                phone: ''
            }
        });
        setErrors({});
        setIsSubmitted(false);
        setCurrentStep(1);
    };

    if (isSubmitted) {
        return (
            <div className="min-h-screen bg-light-background dark:bg-dark-background flex items-center justify-center p-4">
                <div className="bg-light-surface dark:bg-dark-surface rounded-lg p-8 max-w-md w-full text-center shadow-lg border border-light-border dark:border-dark-border">
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-light-text dark:text-dark-text mb-4">
                        ¡PQR Enviada Exitosamente!
                    </h2>
                    <p className="text-light-textSecondary dark:text-dark-textSecondary mb-6">
                        Hemos recibido tu {formData.typePqr?.toLowerCase()} y la procesaremos a la brevedad. 
                        Te contactaremos al correo proporcionado con la respuesta.
                    </p>
                    <div className="space-y-3">
                        <button
                            onClick={resetForm}
                            className="w-full bg-light-primary dark:bg-dark-primary text-white py-3 px-4 rounded-lg hover:opacity-90 transition-opacity"
                        >
                            Crear Nueva PQR
                        </button>
                        <button
                            onClick={() => window.history.back()}
                            className="w-full bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text py-3 px-4 rounded-lg border border-light-border dark:border-dark-border hover:bg-light-border dark:hover:bg-dark-border transition-colors"
                        >
                            Volver al Inicio
                        </button>
                    </div>
                </div>
            </div>
        );
    }
    const pathname = usePathname();
    return (
        <div className="min-h-screen bg-light-background dark:bg-dark-background flex">
            <Sidebar role={''}  />
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <header className="bg-light-surface dark:bg-dark-surface border-b border-light-border dark:border-dark-border p-6">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => window.history.back()}
                                className="p-2 text-light-textSecondary dark:text-dark-textSecondary hover:text-light-text dark:hover:text-dark-text transition-colors"
                            >
                                <ArrowLeft className="w-5 h-5" />
                            </button>
                            <div>
                                <h1 className="text-2xl font-bold text-light-text dark:text-dark-text">
                                    Crear Nueva PQR
                                </h1>
                                <p className="text-light-textSecondary dark:text-dark-textSecondary">
                                    Completa el formulario para enviar tu petición, queja o reclamo
                                </p>
                            </div>
                        </div>
                    </div>
                </header>
                <div className="bg-light-surface dark:bg-dark-surface border-b border-light-border dark:border-dark-border p-6">
                    <div className="max-w-6xl mx-auto">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center space-x-40">
                                {[1, 2, 3].map((step) => (
                                    <div key={step} className="flex items-center">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                                            step <= currentStep
                                                ? 'bg-light-primary dark:bg-dark-primary text-white'
                                                : 'bg-light-border dark:bg-dark-border text-light-textSecondary dark:text-dark-textSecondary'
                                        }`}>
                                            {step}
                                        </div>
                                        {step < 3 && (
                                            <div className={`w-12 h-0.5 ml-2 ${
                                                step < currentStep
                                                    ? 'bg-light-primary dark:bg-dark-primary'
                                                    : 'bg-light-border dark:bg-dark-border'
                                            }`} />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex justify-between text-sm text-light-textSecondary dark:text-dark-textSecondary">
                            <span>Tipo de PQR</span>
                            <span>Información</span>
                            <span>Datos de Contacto</span>
                        </div>
                    </div>
                </div>
                <div className="max-w-4xl mx-auto p-6 flex-grow">
                    {currentStep === 1 && (
                        <PqrTypeSelection
                            pqrTypes={pqrTypes}
                            selectedType={formData.typePqr}
                            onSelectType={(type) => {
                                handleInputChange('typePqr', type);
                                setErrors({});
                            }}
                            error={errors.typePqr}
                        />
                    )}
                    {currentStep === 2 && (
                        <PqrModal
                            pqr={null}
                            isOpen={true}
                            onClose={() => {}}
                        />
                    )}
                    {currentStep === 3 && (
                        <ContactInfoForm
                            userInfo={formData.userInfo}
                            typePqr={formData.typePqr}
                            title={formData.title}
                            description={formData.description}
                            onInputChange={handleInputChange}
                            errors={errors}
                        />
                    )}
                    <div className="flex justify-between mt-8">
                        <button
                            type="button"
                            onClick={prevStep}
                            className={`px-6 py-3 rounded-lg border border-light-border dark:border-dark-border text-light-text dark:text-dark-text hover:bg-light-border dark:hover:bg-dark-border transition-colors ${
                                currentStep === 1 ? 'invisible' : ''
                            }`}
                        >
                            Anterior
                        </button>

                        {currentStep < 3 ? (
                            <button
                                type="button"
                                onClick={nextStep}
                                className="px-6 py-3 bg-light-primary dark:bg-dark-primary text-white rounded-lg hover:opacity-90 transition-opacity"
                            >
                                Siguiente
                            </button>
                        ) : (
                            <button
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                className="px-6 py-3 bg-light-primary dark:bg-dark-primary text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                        Enviando...
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-4 h-4" />
                                        Enviar PQR
                                    </>
                                )}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreatePqrForm;
