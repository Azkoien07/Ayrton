import React from 'react';
import { User, Mail, Phone } from 'lucide-react';

interface ContactInfoFormProps {
    userInfo: {
        name: string;
        email: string;
        phone: string;
    };
    typePqr: string;
    title: string;
    description: string;
    onInputChange: (field: string, value: string) => void;
    errors: {
        userInfo?: {
            name?: string;
            email?: string;
            phone?: string;
        };
    };
}

const ContactInfoForm = ({ userInfo, typePqr, title, description, onInputChange, errors }: ContactInfoFormProps) => {
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
                        value={userInfo.name}
                        onChange={(e) => onInputChange('userInfo.name', e.target.value)}
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
                        value={userInfo.email}
                        onChange={(e) => onInputChange('userInfo.email', e.target.value)}
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
                        value={userInfo.phone}
                        onChange={(e) => onInputChange('userInfo.phone', e.target.value)}
                    />
                    {errors.userInfo?.phone && <p className="text-red-500 text-sm mt-1">{errors.userInfo.phone}</p>}
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
