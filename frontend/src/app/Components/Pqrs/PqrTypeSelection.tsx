import React from 'react';

interface PqrTypeSelectionProps {
    pqrTypes: Array<{
        type: 'Peticion' | 'Queja' | 'Reclamo';
        title: string;
        description: string;
        icon: React.ReactNode;
        color: string;
    }>;
    selectedType: string;
    onSelectType: (type: 'Peticion' | 'Queja' | 'Reclamo') => void;
    error?: string;
}

const PqrTypeSelection = ({ pqrTypes, selectedType, onSelectType, error }: PqrTypeSelectionProps) => {
    return (
        <div className="bg-light-surface dark:bg-dark-surface rounded-lg p-10 border border-light-border dark:border-dark-border">
            <h2 className="text-xl font-semibold text-light-text dark:text-dark-text mb-6">
                Selecciona el tipo de PQR
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {pqrTypes.map((pqrType) => (
                    <div
                        key={pqrType.type}
                        className={`p-6 rounded-lg border-2 cursor-pointer transition-all ${selectedType === pqrType.type
                                ? pqrType.color
                                : 'border-light-border dark:border-dark-border bg-light-background dark:bg-dark-background hover:border-light-primary dark:hover:border-dark-primary'
                            }`}
                        onClick={() => onSelectType(pqrType.type)}
                    >
                        <div className="flex flex-col items-center text-center">
                            <div className="mb-4">{pqrType.icon}</div>
                            <h3 className="text-lg font-semibold mb-2">{pqrType.title}</h3>
                            <p className="text-sm">{pqrType.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            {error && (
                <p className="text-red-500 text-sm mt-4">{error}</p>
            )}
        </div>
    );
};

export default PqrTypeSelection;
