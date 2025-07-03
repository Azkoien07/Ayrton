'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { FileText, AlertCircle, MessageSquare, Send, ChevronLeft, ChevronRight, Check, User, Mail, Phone, Edit3 } from 'lucide-react';
import { TypePqr } from '@/generated/graphql';

// Simulando los tipos y configuraciones
const TypePqrEnum = {
    Peticion: 'PETICION' as TypePqr,
    Queja: 'QUEJA' as TypePqr,
    Reclamo: 'RECLAMO' as TypePqr
};

type IconName = 'FileText' | 'AlertCircle' | 'MessageSquare';

const pqrTypesConfig: {
    type: TypePqr;
    title: string;
    description: string;
    iconName: IconName;
    color: string;
    bgColor: string;
    borderColor: string;
    textColor: string;
}[] = [
        {
            type: TypePqrEnum.Peticion,
            title: 'Petición',
            description: 'Solicitud de información, servicios o actuaciones',
            iconName: 'FileText',
            color: 'blue',
            bgColor: 'bg-blue-50',
            borderColor: 'border-blue-200',
            textColor: 'text-blue-700'
        },
        {
            type: TypePqrEnum.Queja,
            title: 'Queja',
            description: 'Manifestación de inconformidad o insatisfacción',
            iconName: 'AlertCircle',
            color: 'orange',
            bgColor: 'bg-orange-50',
            borderColor: 'border-orange-200',
            textColor: 'text-orange-700'
        },
        {
            type: TypePqrEnum.Reclamo,
            title: 'Reclamo',
            description: 'Solicitud de solución a un problema específico',
            iconName: 'MessageSquare',
            color: 'red',
            bgColor: 'bg-red-50',
            borderColor: 'border-red-200',
            textColor: 'text-red-700'
        }
    ];

const STEPS = {
    TYPE_SELECTION: 1,
    FORM_DETAILS: 2,
    CONTACT_INFO: 3,
} as const;

type Step = typeof STEPS[keyof typeof STEPS];

interface FormDataState {
    typePqr: TypePqr;
    title: string;
    description: string;
    argument: string;
    userName: string;
    userEmail: string;
    userPhone: string;
    state: boolean;
    answer: string;
}

type FormErrors = Partial<Record<keyof FormDataState, string>>;

interface PqrFormStepsProps {
    onSubmissionSuccess: (typePqr: TypePqr | undefined) => void;
}

const VALIDATION_RULES = {
    TITLE_MAX_LENGTH: 50,
    DESCRIPTION_MAX_LENGTH: 1000,
    EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
} as const;

const PqrFormSteps = ({ onSubmissionSuccess }: PqrFormStepsProps) => {
    const [formData, setFormData] = useState<FormDataState>({
        typePqr: TypePqrEnum.Peticion,
        title: '',
        description: '',
        argument: '',
        userName: '',
        userEmail: '',
        userPhone: '',
        state: false,
        answer: '',
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [currentStep, setCurrentStep] = useState<Step>(STEPS.TYPE_SELECTION);

    const iconMap: Record<IconName, React.ReactElement> = useMemo(() => ({
        FileText: <FileText className="w-6 h-6" />,
        AlertCircle: <AlertCircle className="w-6 h-6" />,
        MessageSquare: <MessageSquare className="w-6 h-6" />,
    }), []);

    const pqrTypes = useMemo(() =>
        pqrTypesConfig.map((config) => ({
            ...config,
            icon: iconMap[config.iconName],
        })), [iconMap]
    );

    const validateStep = useCallback((stepToValidate: Step) => {
        const newErrors: FormErrors = {};
        switch (stepToValidate) {
            case STEPS.TYPE_SELECTION:
                if (!formData.typePqr) newErrors.typePqr = 'Debe seleccionar un tipo de PQR';
                break;
            case STEPS.FORM_DETAILS:
                if (!formData.title.trim()) newErrors.title = 'El título es obligatorio';
                else if (formData.title.length > VALIDATION_RULES.TITLE_MAX_LENGTH) {
                    newErrors.title = `El título no puede exceder ${VALIDATION_RULES.TITLE_MAX_LENGTH} caracteres`;
                }
                if (!formData.description.trim()) newErrors.description = 'La descripción es obligatoria';
                else if (formData.description.length > VALIDATION_RULES.DESCRIPTION_MAX_LENGTH) {
                    newErrors.description = `La descripción no puede exceder ${VALIDATION_RULES.DESCRIPTION_MAX_LENGTH} caracteres`;
                }
                if (!formData.argument.trim()) newErrors.argument = 'El argumento es obligatorio';
                break;
            case STEPS.CONTACT_INFO:
                if (!formData.userName.trim()) newErrors.userName = 'El nombre es obligatorio';
                if (!formData.userEmail.trim()) newErrors.userEmail = 'El email es obligatorio';
                else if (!VALIDATION_RULES.EMAIL_REGEX.test(formData.userEmail)) {
                    newErrors.userEmail = 'El email no tiene un formato válido';
                }
                if (!formData.userPhone.trim()) newErrors.userPhone = 'El teléfono es obligatorio';
                break;
        }
        return newErrors;
    }, [formData]);

    const validateAllSteps = useCallback(() => {
        const allErrors = [STEPS.TYPE_SELECTION, STEPS.FORM_DETAILS, STEPS.CONTACT_INFO].reduce((acc, step) => {
            const stepErrors = validateStep(step);
            return { ...acc, ...stepErrors };
        }, {});

        setErrors(allErrors);
        return {
            isValid: Object.keys(allErrors).length === 0,
            errors: allErrors,
        };
    }, [validateStep]);

    const handleSubmit = useCallback(async () => {
        const { isValid, errors } = validateAllSteps();
        if (!isValid) {
            const firstErrorStepKey = Object.keys(STEPS).find(key => {
                const stepKey = key as keyof typeof STEPS;
                return Object.keys(errors).some(errorField => {
                    const field = errorField as keyof FormDataState;
                    if (STEPS[stepKey] === STEPS.TYPE_SELECTION && field === 'typePqr') return true;
                    if (STEPS[stepKey] === STEPS.FORM_DETAILS && ['title', 'description', 'argument'].includes(field)) return true;
                    if (STEPS[stepKey] === STEPS.CONTACT_INFO && ['userName', 'userEmail', 'userPhone'].includes(field)) return true;
                    return false;
                });
            });

            if (firstErrorStepKey) {
                setCurrentStep(STEPS[firstErrorStepKey as keyof typeof STEPS]);
            }
            return;
        }

        setIsSubmitting(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            onSubmissionSuccess(formData.typePqr);
            setFormData({
                typePqr: TypePqrEnum.Peticion,
                title: '',
                description: '',
                argument: '',
                userName: '',
                userEmail: '',
                userPhone: '',
                state: false,
                answer: '',
            });
            setCurrentStep(STEPS.TYPE_SELECTION);
        } finally {
            setIsSubmitting(false);
        }
    }, [validateAllSteps, onSubmissionSuccess, formData.typePqr]);

    const handleInputChange = useCallback((field: keyof FormDataState, value: string | TypePqr) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => {
                const newErrors: FormErrors = { ...prev };
                delete newErrors[field];
                return newErrors;
            });
        }
    }, [errors]);

    const nextStep = useCallback(() => {
        const stepErrors = validateStep(currentStep);
        setErrors(stepErrors);
        if (Object.keys(stepErrors).length === 0) {
            setCurrentStep(prev => Math.min(prev + 1, STEPS.CONTACT_INFO) as Step);
        }
    }, [validateStep, currentStep]);

    const prevStep = useCallback(() => {
        setCurrentStep(prev => Math.max(prev - 1, STEPS.TYPE_SELECTION) as Step);
    }, []);

    const getStepStatus = useCallback((step: Step) => {
        if (step < currentStep) return 'completed';
        if (step === currentStep) return 'active';
        return 'inactive';
    }, [currentStep]);

    const stepsInfo = [
        { number: 1, title: 'Tipo de PQR', description: 'Seleccione la categoría', icon: <Edit3 className="w-5 h-5" /> },
        { number: 2, title: 'Detalles', description: 'Complete la información', icon: <FileText className="w-5 h-5" /> },
        { number: 3, title: 'Contacto', description: 'Datos de contacto', icon: <User className="w-5 h-5" /> },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header con diseño mejorado */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl mb-4 shadow-lg">
                        <FileText className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-3">
                        Nueva PQR
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Complete el formulario para enviar su solicitud. Nos pondremos en contacto con usted lo antes posible.
                    </p>
                </div>

                {/* Progress Stepper rediseñado */}
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8 mb-8">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="w-3 h-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full animate-pulse"></div>
                            <span className="text-sm font-semibold text-gray-600">
                                Paso {currentStep} de {stepsInfo.length}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-500 ease-out"
                                    style={{ width: `${(currentStep / stepsInfo.length) * 100}%` }}
                                />
                            </div>
                            <span className="text-sm font-semibold text-blue-600">
                                {Math.round((currentStep / stepsInfo.length) * 100)}%
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        {stepsInfo.map((step, index) => {
                            const status = getStepStatus(step.number as Step);

                            return (
                                <React.Fragment key={step.number}>
                                    <div className="flex flex-col items-center flex-1">
                                        <div className={`
                                            w-12 h-12 rounded-full flex items-center justify-center mb-3 transition-all duration-300 transform
                                            ${status === 'completed'
                                                ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg scale-105'
                                                : status === 'active'
                                                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg scale-105'
                                                    : 'bg-gray-100 text-gray-400 border-2 border-gray-200'
                                            }
                                        `}>
                                            {status === 'completed' ? (
                                                <Check className="w-6 h-6" />
                                            ) : status === 'active' ? (
                                                step.icon
                                            ) : (
                                                <span className="text-sm font-semibold">{step.number}</span>
                                            )}
                                        </div>
                                        <div className="text-center">
                                            <p className={`text-sm font-semibold mb-1 ${status === 'active' ? 'text-blue-600' :
                                                status === 'completed' ? 'text-green-600' : 'text-gray-400'
                                                }`}>
                                                {step.title}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                {step.description}
                                            </p>
                                        </div>
                                    </div>

                                    {index < stepsInfo.length - 1 && (
                                        <div className={`flex-1 h-0.5 mx-6 transition-all duration-500 ${step.number < currentStep ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 'bg-gray-200'
                                            }`} />
                                    )}
                                </React.Fragment>
                            );
                        })}
                    </div>
                </div>

                {/* Form Content con diseño mejorado */}
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8">
                    {currentStep === STEPS.TYPE_SELECTION && (
                        <div className="space-y-8">
                            <div className="text-center">
                                <h2 className="text-2xl font-bold text-gray-800 mb-3">
                                    Seleccione el tipo de PQR
                                </h2>
                                <p className="text-gray-600">
                                    Elija la categoría que mejor describe su solicitud
                                </p>
                            </div>

                            <div className="grid md:grid-cols-3 gap-6">
                                {pqrTypes.map((type) => (
                                    <div
                                        key={type.type}
                                        onClick={() => handleInputChange('typePqr', type.type)}
                                        className={`
                                            relative p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-lg
                                            ${formData.typePqr === type.type
                                                ? `${type.borderColor} ${type.bgColor} shadow-lg scale-105`
                                                : 'border-gray-200 bg-white hover:border-gray-300'
                                            }
                                        `}
                                    >
                                        <div className={`
                                            w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300
                                            ${formData.typePqr === type.type
                                                ? `bg-gradient-to-r from-${type.color}-500 to-${type.color}-600 text-white shadow-lg`
                                                : 'bg-gray-100 text-gray-400'
                                            }
                                        `}>
                                            {type.icon}
                                        </div>
                                        <h3 className={`font-semibold text-lg mb-2 ${formData.typePqr === type.type ? type.textColor : 'text-gray-700'
                                            }`}>
                                            {type.title}
                                        </h3>
                                        <p className="text-sm text-gray-600 leading-relaxed">
                                            {type.description}
                                        </p>
                                        {formData.typePqr === type.type && (
                                            <div className="absolute top-3 right-3">
                                                <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                                                    <Check className="w-4 h-4 text-white" />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {errors.typePqr && (
                                <div className="text-center">
                                    <p className="text-red-500 text-sm bg-red-50 p-3 rounded-lg border border-red-200">
                                        {errors.typePqr}
                                    </p>
                                </div>
                            )}
                        </div>
                    )}

                    {currentStep === STEPS.FORM_DETAILS && (
                        <div className="space-y-8">
                            <div className="text-center">
                                <h2 className="text-2xl font-bold text-gray-800 mb-3">
                                    Detalles de su solicitud
                                </h2>
                                <p className="text-gray-600">
                                    Complete la información específica de su PQR
                                </p>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                                        Título de la solicitud *
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.title}
                                        onChange={(e) => handleInputChange('title', e.target.value)}
                                        placeholder="Ingrese un título descriptivo y claro"
                                        maxLength={VALIDATION_RULES.TITLE_MAX_LENGTH}
                                        className={`w-full px-4 py-4 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-0 bg-white/50 backdrop-blur-sm
                                            ${errors.title
                                                ? 'border-red-300 focus:border-red-500 bg-red-50'
                                                : 'border-gray-200 focus:border-blue-500 focus:bg-white'
                                            }`}
                                    />
                                    <div className="flex justify-between items-center mt-2">
                                        {errors.title && (
                                            <p className="text-sm text-red-500 flex items-center gap-1">
                                                <AlertCircle className="w-4 h-4" />
                                                {errors.title}
                                            </p>
                                        )}
                                        <p className="text-xs text-gray-500 ml-auto">
                                            {formData.title.length}/{VALIDATION_RULES.TITLE_MAX_LENGTH}
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                                        Descripción detallada *
                                    </label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) => handleInputChange('description', e.target.value)}
                                        placeholder="Describa detalladamente su solicitud, incluya todos los detalles relevantes"
                                        rows={5}
                                        maxLength={VALIDATION_RULES.DESCRIPTION_MAX_LENGTH}
                                        className={`w-full px-4 py-4 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-0 resize-none bg-white/50 backdrop-blur-sm
                                            ${errors.description
                                                ? 'border-red-300 focus:border-red-500 bg-red-50'
                                                : 'border-gray-200 focus:border-blue-500 focus:bg-white'
                                            }`}
                                    />
                                    <div className="flex justify-between items-center mt-2">
                                        {errors.description && (
                                            <p className="text-sm text-red-500 flex items-center gap-1">
                                                <AlertCircle className="w-4 h-4" />
                                                {errors.description}
                                            </p>
                                        )}
                                        <p className="text-xs text-gray-500 ml-auto">
                                            {formData.description.length}/{VALIDATION_RULES.DESCRIPTION_MAX_LENGTH}
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                                        Argumentos de respaldo *
                                    </label>
                                    <textarea
                                        value={formData.argument}
                                        onChange={(e) => handleInputChange('argument', e.target.value)}
                                        placeholder="Proporcione los argumentos, razones o justificaciones que respaldan su solicitud"
                                        rows={4}
                                        className={`w-full px-4 py-4 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-0 resize-none bg-white/50 backdrop-blur-sm
                                            ${errors.argument
                                                ? 'border-red-300 focus:border-red-500 bg-red-50'
                                                : 'border-gray-200 focus:border-blue-500 focus:bg-white'
                                            }`}
                                    />
                                    {errors.argument && (
                                        <p className="text-sm text-red-500 mt-2 flex items-center gap-1">
                                            <AlertCircle className="w-4 h-4" />
                                            {errors.argument}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {currentStep === STEPS.CONTACT_INFO && (
                        <div className="space-y-8">
                            <div className="text-center">
                                <h2 className="text-2xl font-bold text-gray-800 mb-3">
                                    Información de contacto
                                </h2>
                                <p className="text-gray-600">
                                    Complete sus datos para que podamos contactarlo con la respuesta
                                </p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                                        Nombre completo *
                                    </label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                        <input
                                            type="text"
                                            value={formData.userName}
                                            onChange={(e) => handleInputChange('userName', e.target.value)}
                                            placeholder="Ingrese su nombre completo"
                                            className={`w-full pl-11 pr-4 py-4 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-0 bg-white/50 backdrop-blur-sm
                                                ${errors.userName
                                                    ? 'border-red-300 focus:border-red-500 bg-red-50'
                                                    : 'border-gray-200 focus:border-blue-500 focus:bg-white'
                                                }`}
                                        />
                                    </div>
                                    {errors.userName && (
                                        <p className="text-sm text-red-500 mt-2 flex items-center gap-1">
                                            <AlertCircle className="w-4 h-4" />
                                            {errors.userName}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                                        Correo electrónico *
                                    </label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                        <input
                                            type="email"
                                            value={formData.userEmail}
                                            onChange={(e) => handleInputChange('userEmail', e.target.value)}
                                            placeholder="correo@ejemplo.com"
                                            className={`w-full pl-11 pr-4 py-4 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-0 bg-white/50 backdrop-blur-sm
                                                ${errors.userEmail
                                                    ? 'border-red-300 focus:border-red-500 bg-red-50'
                                                    : 'border-gray-200 focus:border-blue-500 focus:bg-white'
                                                }`}
                                        />
                                    </div>
                                    {errors.userEmail && (
                                        <p className="text-sm text-red-500 mt-2 flex items-center gap-1">
                                            <AlertCircle className="w-4 h-4" />
                                            {errors.userEmail}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                                        Número de teléfono *
                                    </label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                        <input
                                            type="tel"
                                            value={formData.userPhone}
                                            onChange={(e) => handleInputChange('userPhone', e.target.value)}
                                            placeholder="+57 300 123 4567"
                                            className={`w-full pl-11 pr-4 py-4 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-0 bg-white/50 backdrop-blur-sm
                                                ${errors.userPhone
                                                    ? 'border-red-300 focus:border-red-500 bg-red-50'
                                                    : 'border-gray-200 focus:border-blue-500 focus:bg-white'
                                                }`}
                                        />
                                    </div>
                                    {errors.userPhone && (
                                        <p className="text-sm text-red-500 mt-2 flex items-center gap-1">
                                            <AlertCircle className="w-4 h-4" />
                                            {errors.userPhone}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Resumen de la solicitud */}
                            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
                                <h3 className="text-lg font-semibold text-blue-800 mb-4">Resumen de su solicitud</h3>
                                <div className="space-y-3">
                                    <div className="flex items-start gap-3">
                                        <span className="text-sm font-medium text-blue-600 min-w-16">Tipo:</span>
                                        <span className="text-sm text-gray-700">{pqrTypes.find(t => t.type === formData.typePqr)?.title}</span>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="text-sm font-medium text-blue-600 min-w-16">Título:</span>
                                        <span className="text-sm text-gray-700">{formData.title}</span>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="text-sm font-medium text-blue-600 min-w-16">Descripción:</span>
                                        <span className="text-sm text-gray-700">{formData.description.substring(0, 100)}...</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Navigation mejorada */}
                    <div className="flex justify-between items-center pt-8 mt-8 border-t border-gray-200">
                        <button
                            onClick={prevStep}
                            disabled={currentStep === STEPS.TYPE_SELECTION}
                            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105
                                ${currentStep === STEPS.TYPE_SELECTION
                                    ? 'opacity-0 pointer-events-none'
                                    : 'border-2 border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:shadow-md'
                                }`}
                        >
                            <ChevronLeft className="w-4 h-4" />
                            Anterior
                        </button>

                        {currentStep < STEPS.CONTACT_INFO ? (
                            <button
                                onClick={nextStep}
                                className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                            >
                                Siguiente
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        ) : (
                            <button
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                className="flex items-center gap-2 px-8 py-3 rounded-xl font-medium bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
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

export default PqrFormSteps;
