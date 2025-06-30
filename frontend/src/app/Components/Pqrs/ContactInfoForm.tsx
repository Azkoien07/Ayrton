import React from 'react';
import { User, Mail, Phone } from 'lucide-react';

interface ContactInfoFormProps {
    name: string;
    email: string;
    phone: string;
    typePqr: string;
    title: string;
    description: string;
    onInputChange: (field: string, value: string) => void;
    errors: {
        userName?: string;
        userEmail?: string;
        userPhone?: string;
    };
}

const ContactInfoForm = ({ name, email, phone, typePqr, title, description, onInputChange, errors }: ContactInfoFormProps) => {
    return (
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
                        value={name}
                        onChange={(e) => onInputChange('userName', e.target.value)}
                    />
                    {errors.userName && <p className="text-red-500 text-sm mt-1">{errors.userName}</p>}
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
                        value={email}
                        onChange={(e) => onInputChange('userEmail', e.target.value)}
                    />
                    {errors.userEmail && <p className="text-red-500 text-sm mt-1">{errors.userEmail}</p>}
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
                        value={phone}
                        onChange={(e) => onInputChange('userPhone', e.target.value)}
                    />
                    {errors.userPhone && <p className="text-red-500 text-sm mt-1">{errors.userPhone}</p>}
                </div>

                <div className="bg-light-background dark:bg-dark-background p-4 rounded-lg">
                    <h3 className="font-medium text-light-text dark:text-dark-text mb-2">
                        Resumen de tu {typePqr}
                    </h3>
                    <div className="space-y-2 text-sm text-light-textSecondary dark:text-dark-textSecondary">
                        <div><strong>Tipo:</strong> {typePqr}</div>
                        <div><strong>Título:</strong> {title}</div>
                        <div><strong>Descripción:</strong> {description}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactInfoForm;
