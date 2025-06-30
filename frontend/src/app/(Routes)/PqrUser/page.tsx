'use client';

import { useState } from 'react';
import { Send, FileText, AlertCircle, MessageSquare, ArrowLeft, CheckCircle, User, Mail, Phone } from 'lucide-react';

// Tipos TypeScript
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

        // Validación del tipo de PQR
        if (!formData.typePqr) {
            newErrors.typePqr = 'Debe seleccionar un tipo de PQR';
        }

        // Validación del título
        if (!formData.title.trim()) {
            newErrors.title = 'El título es obligatorio';
        } else if (formData.title.length > 50) {
            newErrors.title = 'El título no puede exceder 50 caracteres';
        }

        // Validación de la descripción
        if (!formData.description.trim()) {
            newErrors.description = 'La descripción es obligatoria';
        } else if (formData.description.length > 1000) {
            newErrors.description = 'La descripción no puede exceder 1000 caracteres';
        }

        // Validación del argumento
        if (!formData.argument.trim()) {
            newErrors.argument = 'El argumento es obligatorio';
        }

        // Validación de información del usuario
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

    const handleSubmit = async () => {
        
        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            console.log('PQR creada:', formData);
            setIsSubmitted(true);
        } catch (error) {
            console.error('Error al crear PQR:', error);
         
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleInputChange = (field: string, value: string) => {
        if (field.includes('.')) {
            const [parent, child] = field.split('.');
            setFormData(prev => ({
                ...prev,
                [parent]: {
                    ...prev[parent as keyof PqrFormData],
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

    return (
        <div className="min-h-screen bg-light-background dark:bg-dark-background">
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

            {/* Progress Bar */}
            <div className="bg-light-surface dark:bg-dark-surface border-b border-light-border dark:border-dark-border p-6">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4">
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

            <div className="max-w-4xl mx-auto p-6">
                <div>
                    {/* Paso 1: Selección del tipo de PQR */}
                    {currentStep === 1 && (
                        <div className="bg-light-surface dark:bg-dark-surface rounded-lg p-8 border border-light-border dark:border-dark-border">
                            <h2 className="text-xl font-semibold text-light-text dark:text-dark-text mb-6">
                                Selecciona el tipo de PQR
                            </h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {pqrTypes.map((pqrType) => (
                                    <div
                                        key={pqrType.type}
                                        className={`p-6 rounded-lg border-2 cursor-pointer transition-all ${
                                            formData.typePqr === pqrType.type
                                                ? pqrType.color
                                                : 'border-light-border dark:border-dark-border bg-light-background dark:bg-dark-background hover:border-light-primary dark:hover:border-dark-primary'
                                        }`}
                                        onClick={() => {
                                            handleInputChange('typePqr', pqrType.type);
                                            setErrors({});
                                        }}
                                    >
                                        <div className="flex flex-col items-center text-center">
                                            <div className="mb-4">{pqrType.icon}</div>
                                            <h3 className="text-lg font-semibold mb-2">{pqrType.title}</h3>
                                            <p className="text-sm">{pqrType.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            
                            {errors.typePqr && (
                                <p className="text-red-500 text-sm mt-4">{errors.typePqr}</p>
                            )}
                        </div>
                    )}

                    {/* Paso 2: Información de la PQR */}
                    {currentStep === 2 && (
                        <div className="bg-light-surface dark:bg-dark-surface rounded-lg p-8 border border-light-border dark:border-dark-border">
                            <h2 className="text-xl font-semibold text-light-text dark:text-dark-text mb-6">
                                Información de la {formData.typePqr}
                            </h2>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-2">
                                        Título *
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-3 bg-light-background dark:bg-dark-background border border-light-border dark:border-dark-border rounded-lg focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary focus:border-transparent text-light-text dark:text-dark-text"
                                        placeholder="Ingresa un título descriptivo"
                                        value={formData.title}
                                        onChange={(e) => handleInputChange('title', e.target.value)}
                                        maxLength={50}
                                    />
                                    <div className="flex justify-between mt-1">
                                        {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
                                        <p className="text-light-textSecondary dark:text-dark-textSecondary text-sm ml-auto">
                                            {formData.title.length}/50
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-2">
                                        Descripción *
                                    </label>
                                    <textarea
                                        className="w-full px-4 py-3 bg-light-background dark:bg-dark-background border border-light-border dark:border-dark-border rounded-lg focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary focus:border-transparent text-light-text dark:text-dark-text"
                                        placeholder="Describe brevemente tu solicitud"
                                        rows={4}
                                        value={formData.description}
                                        onChange={(e) => handleInputChange('description', e.target.value)}
                                        maxLength={1000}
                                    />
                                    <div className="flex justify-between mt-1">
                                        {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
                                        <p className="text-light-textSecondary dark:text-dark-textSecondary text-sm ml-auto">
                                            {formData.description.length}/1000
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-2">
                                        Argumento detallado *
                                    </label>
                                    <textarea
                                        className="w-full px-4 py-3 bg-light-background dark:bg-dark-background border border-light-border dark:border-dark-border rounded-lg focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary focus:border-transparent text-light-text dark:text-dark-text"
                                        placeholder="Explica detalladamente los hechos, circunstancias y fundamentos de tu solicitud"
                                        rows={6}
                                        value={formData.argument}
                                        onChange={(e) => handleInputChange('argument', e.target.value)}
                                    />
                                    {errors.argument && <p className="text-red-500 text-sm mt-1">{errors.argument}</p>}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Paso 3: Datos de contacto */}
                    {currentStep === 3 && (
                        <div className="bg-light-surface dark:bg-dark-surface rounded-lg p-8 border border-light-border dark:border-dark-border">
                            <h2 className="text-xl font-semibold text-light-text dark:text-dark-text mb-6">
                                Datos de Contacto
                            </h2>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-2">
                                        <User className="w-4 h-4 inline mr-1" />
                                        Nombre completo *
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-3 bg-light-background dark:bg-dark-background border border-light-border dark:border-dark-border rounded-lg focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary focus:border-transparent text-light-text dark:text-dark-text"
                                        placeholder="Ingresa tu nombre completo"
                                        value={formData.userInfo.name}
                                        onChange={(e) => handleInputChange('userInfo.name', e.target.value)}
                                    />
                                    {errors.userInfo?.name && <p className="text-red-500 text-sm mt-1">{errors.userInfo.name}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-2">
                                        <Mail className="w-4 h-4 inline mr-1" />
                                        Correo electrónico *
                                    </label>
                                    <input
                                        type="email"
                                        className="w-full px-4 py-3 bg-light-background dark:bg-dark-background border border-light-border dark:border-dark-border rounded-lg focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary focus:border-transparent text-light-text dark:text-dark-text"
                                        placeholder="correo@ejemplo.com"
                                        value={formData.userInfo.email}
                                        onChange={(e) => handleInputChange('userInfo.email', e.target.value)}
                                    />
                                    {errors.userInfo?.email && <p className="text-red-500 text-sm mt-1">{errors.userInfo.email}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-2">
                                        <Phone className="w-4 h-4 inline mr-1" />
                                        Teléfono *
                                    </label>
                                    <input
                                        type="tel"
                                        className="w-full px-4 py-3 bg-light-background dark:bg-dark-background border border-light-border dark:border-dark-border rounded-lg focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary focus:border-transparent text-light-text dark:text-dark-text"
                                        placeholder="+57 300 123 4567"
                                        value={formData.userInfo.phone}
                                        onChange={(e) => handleInputChange('userInfo.phone', e.target.value)}
                                    />
                                    {errors.userInfo?.phone && <p className="text-red-500 text-sm mt-1">{errors.userInfo.phone}</p>}
                                </div>

                                <div className="bg-light-background dark:bg-dark-background p-4 rounded-lg">
                                    <h3 className="font-medium text-light-text dark:text-dark-text mb-2">
                                        Resumen de tu {formData.typePqr}
                                    </h3>
                                    <div className="space-y-2 text-sm text-light-textSecondary dark:text-dark-textSecondary">
                                        <div><strong>Tipo:</strong> {formData.typePqr}</div>
                                        <div><strong>Título:</strong> {formData.title}</div>
                                        <div><strong>Descripción:</strong> {formData.description}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Botones de navegación */}
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