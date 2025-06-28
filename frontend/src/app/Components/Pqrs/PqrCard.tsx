import { Eye, Edit, Trash2, MessageSquare, AlertCircle, FileText } from 'lucide-react';

interface PqrEntity {
    id: number;
    typePqr: 'Peticion' | 'Queja' | 'Reclamo';
    title: string;
    description: string;
    argument: string;
    answer: string;
    state: boolean;
    users?: UserEntity[];
}

interface UserEntity {
    id: number;
    name: string;
    email: string;
}

const PqrCard = ({ pqr, onView, onEdit, onDelete }: { 
    pqr: PqrEntity; 
    onView: (pqr: PqrEntity) => void;
    onEdit: (pqr: PqrEntity) => void;
    onDelete: (id: number) => void;
}) => {
    const getTypeColor = (type: string) => {
        switch (type) {
            case 'Peticion': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
            case 'Queja': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
            case 'Reclamo': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
            default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
        }
    };

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'Peticion': return <FileText className="w-4 h-4" />;
            case 'Queja': return <AlertCircle className="w-4 h-4" />;
            case 'Reclamo': return <MessageSquare className="w-4 h-4" />;
            default: return <FileText className="w-4 h-4" />;
        }
    };

    return (
        <div className="bg-light-surface dark:bg-dark-surface rounded-lg p-6 shadow-sm border border-light-border dark:border-dark-border hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(pqr.typePqr)}`}>
                        {getTypeIcon(pqr.typePqr)}
                        {pqr.typePqr}
                    </span>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        pqr.state 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
                            : 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300'
                    }`}>
                        {pqr.state ? 'Resuelta' : 'Pendiente'}
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => onView(pqr)}
                        className="p-2 text-light-textSecondary dark:text-dark-textSecondary hover:text-light-primary dark:hover:text-dark-primary transition-colors"
                    >
                        <Eye className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => onEdit(pqr)}
                        className="p-2 text-light-textSecondary dark:text-dark-textSecondary hover:text-blue-600 transition-colors"
                    >
                        <Edit className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => onDelete(pqr.id)}
                        className="p-2 text-light-textSecondary dark:text-dark-textSecondary hover:text-red-600 transition-colors"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </div>
            
            <h3 className="text-lg font-semibold text-light-text dark:text-dark-text mb-2">
                {pqr.title}
            </h3>
            
            <p className="text-light-textSecondary dark:text-dark-textSecondary mb-4 line-clamp-2">
                {pqr.description}
            </p>
            
            {pqr.users && pqr.users.length > 0 && (
                <div className="flex items-center gap-2 text-sm text-light-textSecondary dark:text-dark-textSecondary">
                    <span>Usuario:</span>
                    <span className="font-medium">{pqr.users[0].name}</span>
                </div>
            )}
        </div>
    );
};

export default PqrCard;
