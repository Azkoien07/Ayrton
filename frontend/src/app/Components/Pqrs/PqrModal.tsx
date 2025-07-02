import React, { useState, useEffect } from 'react';
import { PqrFormData, FormErrors } from '@Types/Pqr';
import { X } from 'lucide-react';

interface PqrModalProps {
    formData: PqrFormData;
    isOpen?: boolean;
    onClose?: () => void;
    onSave?: (formData: PqrFormData) => Promise<void>;
    isEditMode?: boolean;
    onInputChange?: (field: keyof PqrFormData, value: string | boolean) => void;
    errors?: FormErrors;
}

const PqrModal: React.FC<PqrModalProps> = ({ formData, isOpen, onClose, onSave, isEditMode }) => {
    const [currentFormData, setCurrentFormData] = useState<PqrFormData>(formData);
    const [errors, setErrors] = useState<FormErrors>({});

    useEffect(() => {
        setCurrentFormData(formData);
        setErrors({});
    }, [formData, isOpen]);

    const handleInputChange = (field: keyof PqrFormData, value: string | boolean) => {
        setCurrentFormData(prev => ({ ...prev, [field]: value }));
        setErrors(prev => ({ ...prev, [field]: undefined }));
    };

    const validateForm = () => {
        const newErrors: FormErrors = {};

        if (!currentFormData.typePqr) newErrors.typePqr = 'El tipo de PQR es requerido.';
        if (!currentFormData.title) newErrors.title = 'El título es requerido.';
        if (!currentFormData.description) newErrors.description = 'La descripción es requerida.';
        if (!currentFormData.argument) newErrors.argument = 'El argumento es requerido.';
        if (!currentFormData.userName) newErrors.userName = 'El nombre de usuario es requerido.';
        if (!currentFormData.userEmail) {
            newErrors.userEmail = 'El email es requerido.';
        } else if (!/\S+@\S+\.\S+/.test(currentFormData.userEmail)) {
            newErrors.userEmail = 'El email no es válido.';
        }
        if (!currentFormData.userPhone) newErrors.userPhone = 'El teléfono es requerido.';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (validateForm() && onSave) { 
            await onSave(currentFormData);
        }
    };

    if (isOpen === false && isEditMode === false) return null;

    return (
        <div className={isOpen ? "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4" : ""}>
            {/* Eliminé max-h-[90vh] overflow-y-auto y ajusté el ancho máximo */}
            <div className={`relative bg-light-surface dark:bg-dark-surface rounded-lg p-6 border border-light-border dark:border-dark-border w-full max-w-4xl ${isOpen ? "" : "static"}`}>
                {isOpen && ( 
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 rounded-full text-light-textSecondary dark:text-dark-textSecondary hover:bg-light-border dark:hover:bg-dark-border transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                )}
                <h2 className="text-xl font-bold text-light-text dark:text-dark-text mb-6">
                    {isEditMode ? `Editar PQR: ${currentFormData.title}` : `Nueva PQR: ${currentFormData.typePqr}`}
                </h2>

                {/* Cambié a grid para mejor distribución del espacio */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Título */}
                    <div>
                        <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-2">
                            Título *
                        </label>
                        <input
                            type="text"
                            value={currentFormData.title}
                            onChange={(e) => handleInputChange('title', e.target.value)}
                            maxLength={50}
                            className={`w-full px-3 py-2 border rounded-lg bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text transition-colors ${errors?.title
                                    ? 'border-red-500 focus:border-red-500'
                                    : 'border-light-border dark:border-dark-border focus:border-light-primary dark:focus:border-dark-primary'
                                } focus:outline-none focus:ring-2 focus:ring-opacity-20 focus:ring-light-primary dark:focus:ring-dark-primary`}
                            placeholder="Ingresa un título descriptivo para tu solicitud"
                        />
                        <div className="flex justify-between items-center mt-1">
                            {errors?.title && (
                                <span className="text-red-500 text-sm">{errors.title}</span>
                            )}
                            <span className="text-xs text-light-textSecondary dark:text-dark-textSecondary ml-auto">
                                {currentFormData.title.length}/50
                            </span>
                        </div>
                    </div>

                    {/* Descripción */}
                    <div>
                        <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-2">
                            Descripción *
                        </label>
                        <textarea
                            value={currentFormData.description}
                            onChange={(e) => handleInputChange('description', e.target.value)}
                            maxLength={1000}
                            rows={3}
                            className={`w-full px-3 py-2 border rounded-lg bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text transition-colors resize-none ${errors?.description
                                    ? 'border-red-500 focus:border-red-500'
                                    : 'border-light-border dark:border-dark-border focus:border-light-primary dark:focus:border-dark-primary'
                                } focus:outline-none focus:ring-2 focus:ring-opacity-20 focus:ring-light-primary dark:focus:ring-dark-primary`}
                            placeholder="Describe brevemente tu solicitud"
                        />
                        <div className="flex justify-between items-center mt-1">
                            {errors?.description && (
                                <span className="text-red-500 text-sm">{errors.description}</span>
                            )}
                            <span className="text-xs text-light-textSecondary dark:text-dark-textSecondary ml-auto">
                                {currentFormData.description.length}/1000
                            </span>
                        </div>
                    </div>

                    {/* Argumento - span completo */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-2">
                            Argumento detallado *
                        </label>
                        <textarea
                            value={currentFormData.argument}
                            onChange={(e) => handleInputChange('argument', e.target.value)}
                            rows={4}
                            className={`w-full px-3 py-2 border rounded-lg bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text transition-colors resize-none ${errors?.argument
                                    ? 'border-red-500 focus:border-red-500'
                                    : 'border-light-border dark:border-dark-border focus:border-light-primary dark:focus:border-dark-primary'
                                } focus:outline-none focus:ring-2 focus:ring-opacity-20 focus:ring-light-primary dark:focus:ring-dark-primary`}
                            placeholder="Explica en detalle tu solicitud, incluyendo todos los elementos relevantes..."
                        />
                        {errors?.argument && (
                            <span className="text-red-500 text-sm mt-1 block">{errors.argument}</span>
                        )}
                    </div>

                    {/* Estado y Respuesta (solo editable en modo de edición) */}
                    {isEditMode && (
                        <>
                            <div>
                                <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-2">
                                    Estado *
                                </label>
                                <select
                                    value={currentFormData.state ? 'RESOLVED' : 'PENDING'}
                                    onChange={(e) => handleInputChange('state', e.target.value === 'RESOLVED')}
                                    className={`w-full px-3 py-2 border rounded-lg bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text transition-colors ${errors?.state
                                            ? 'border-red-500 focus:border-red-500'
                                            : 'border-light-border dark:border-dark-border focus:border-light-primary dark:focus:border-dark-primary'
                                        } focus:outline-none focus:ring-2 focus:ring-opacity-20 focus:ring-light-primary dark:focus:ring-dark-primary`}
                                >
                                    <option value="PENDING">Pendiente</option>
                                    <option value="RESOLVED">Resuelta</option>
                                </select>
                                {errors?.state && (
                                    <span className="text-red-500 text-sm mt-1 block">{errors.state}</span>
                                )}
                            </div>
                            {currentFormData.state && ( 
                                <div>
                                    <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-2">
                                        Respuesta
                                    </label>
                                    <textarea
                                        value={currentFormData.answer || ''}
                                        onChange={(e) => handleInputChange('answer', e.target.value)}
                                        rows={3}
                                        className={`w-full px-3 py-2 border rounded-lg bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text transition-colors resize-none ${errors?.answer
                                                ? 'border-red-500 focus:border-red-500'
                                                : 'border-light-border dark:border-dark-border focus:border-light-primary dark:focus:border-dark-primary'
                                            } focus:outline-none focus:ring-2 focus:ring-opacity-20 focus:ring-light-primary dark:focus:ring-dark-primary`}
                                        placeholder="Ingresa la respuesta a la PQR"
                                    />
                                    {errors?.answer && (
                                        <span className="text-red-500 text-sm mt-1 block">{errors.answer}</span>
                                    )}
                                </div>
                            )}
                        </>
                    )}

                    {/* Información adicional según el tipo - span completo */}
                    <div className="md:col-span-2 bg-light-background dark:bg-dark-background p-4 rounded-lg">
                        <h3 className="text-sm font-medium text-light-text dark:text-dark-text mb-2">
                            Información adicional para {currentFormData.typePqr?.toLowerCase()}s:
                        </h3>
                        {currentFormData.typePqr === 'Peticion' && (
                            <p className="text-xs text-light-textSecondary dark:text-dark-textSecondary">
                                • Especifica claramente lo que solicitas<br />
                                • Incluye fechas relevantes si aplica<br />
                                • Menciona documentos de soporte necesarios
                            </p>
                        )}
                        {currentFormData.typePqr === 'Queja' && (
                            <p className="text-xs text-light-textSecondary dark:text-dark-textSecondary">
                                • Describe la situación que te inconforma<br />
                                • Incluye fechas y lugares específicos<br />
                                • Menciona personas involucradas si es relevante
                            </p>
                        )}
                        {currentFormData.typePqr === 'Reclamo' && (
                            <p className="text-xs text-light-textSecondary dark:text-dark-textSecondary">
                                • Explica el problema o irregularidad<br />
                                • Incluye evidencias o documentos relacionados<br />
                                • Especifica la solución que esperas
                            </p>
                        )}
                    </div>
                </div>

                
            </div>
        </div>
    );
};

export default PqrModal;