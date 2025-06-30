import React from 'react';
import { PqrFormData, FormErrors } from '@Types/Pqr';

interface PqrModalProps {
    formData: PqrFormData;
    onInputChange: (field: string, value: string) => void;
    errors: FormErrors;
}

const PqrModal: React.FC<PqrModalProps> = ({ formData, onInputChange, errors }) => {
    return (
        <div className="max-w-2xl mx-auto">
            <div className="bg-light-surface dark:bg-dark-surface rounded-lg p-6 border border-light-border dark:border-dark-border">
                <h2 className="text-xl font-bold text-light-text dark:text-dark-text mb-6">
                    Información de la {formData.typePqr}
                </h2>

                <div className="space-y-6">
                    {/* Título */}
                    <div>
                        <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-2">
                            Título *
                        </label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => onInputChange('title', e.target.value)}
                            maxLength={50}
                            className={`w-full px-3 py-2 border rounded-lg bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text transition-colors ${errors.title
                                    ? 'border-red-500 focus:border-red-500'
                                    : 'border-light-border dark:border-dark-border focus:border-light-primary dark:focus:border-dark-primary'
                                } focus:outline-none focus:ring-2 focus:ring-opacity-20 focus:ring-light-primary dark:focus:ring-dark-primary`}
                            placeholder="Ingresa un título descriptivo para tu solicitud"
                        />
                        <div className="flex justify-between items-center mt-1">
                            {errors.title && (
                                <span className="text-red-500 text-sm">{errors.title}</span>
                            )}
                            <span className="text-xs text-light-textSecondary dark:text-dark-textSecondary ml-auto">
                                {formData.title.length}/50
                            </span>
                        </div>
                    </div>

                    {/* Descripción */}
                    <div>
                        <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-2">
                            Descripción *
                        </label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => onInputChange('description', e.target.value)}
                            maxLength={1000}
                            rows={4}
                            className={`w-full px-3 py-2 border rounded-lg bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text transition-colors resize-none ${errors.description
                                    ? 'border-red-500 focus:border-red-500'
                                    : 'border-light-border dark:border-dark-border focus:border-light-primary dark:focus:border-dark-primary'
                                } focus:outline-none focus:ring-2 focus:ring-opacity-20 focus:ring-light-primary dark:focus:ring-dark-primary`}
                            placeholder="Describe brevemente tu solicitud"
                        />
                        <div className="flex justify-between items-center mt-1">
                            {errors.description && (
                                <span className="text-red-500 text-sm">{errors.description}</span>
                            )}
                            <span className="text-xs text-light-textSecondary dark:text-dark-textSecondary ml-auto">
                                {formData.description.length}/1000
                            </span>
                        </div>
                    </div>

                    {/* Argumento */}
                    <div>
                        <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-2">
                            Argumento detallado *
                        </label>
                        <textarea
                            value={formData.argument}
                            onChange={(e) => onInputChange('argument', e.target.value)}
                            rows={6}
                            className={`w-full px-3 py-2 border rounded-lg bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text transition-colors resize-none ${errors.argument
                                    ? 'border-red-500 focus:border-red-500'
                                    : 'border-light-border dark:border-dark-border focus:border-light-primary dark:focus:border-dark-primary'
                                } focus:outline-none focus:ring-2 focus:ring-opacity-20 focus:ring-light-primary dark:focus:ring-dark-primary`}
                            placeholder="Explica en detalle tu solicitud, incluyendo todos los elementos relevantes..."
                        />
                        {errors.argument && (
                            <span className="text-red-500 text-sm mt-1 block">{errors.argument}</span>
                        )}
                    </div>

                    {/* Información adicional según el tipo */}
                    <div className="bg-light-background dark:bg-dark-background p-4 rounded-lg">
                        <h3 className="text-sm font-medium text-light-text dark:text-dark-text mb-2">
                            Información adicional para {formData.typePqr?.toLowerCase()}s:
                        </h3>
                        {formData.typePqr === 'Peticion' && (
                            <p className="text-xs text-light-textSecondary dark:text-dark-textSecondary">
                                • Especifica claramente lo que solicitas<br />
                                • Incluye fechas relevantes si aplica<br />
                                • Menciona documentos de soporte necesarios
                            </p>
                        )}
                        {formData.typePqr === 'Queja' && (
                            <p className="text-xs text-light-textSecondary dark:text-dark-textSecondary">
                                • Describe la situación que te inconforma<br />
                                • Incluye fechas y lugares específicos<br />
                                • Menciona personas involucradas si es relevante
                            </p>
                        )}
                        {formData.typePqr === 'Reclamo' && (
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