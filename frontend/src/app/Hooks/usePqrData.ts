import { useState, useEffect } from 'react';

// Tipos TypeScript
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

interface PqrStats {
    total: number;
    peticiones: number;
    quejas: number;
    reclamos: number;
    pendientes: number;
    resueltas: number;
}

// Datos de ejemplo
const mockPqrs: PqrEntity[] = [
    {
        id: 1,
        typePqr: 'Peticion',
        title: 'Solicitud de información sobre servicios',
        description: 'Necesito información detallada sobre los servicios disponibles',
        argument: 'Como usuario registrado, requiero conocer todos los servicios que ofrece la plataforma para poder tomar una decisión informada sobre mi suscripción.',
        answer: 'Estimado usuario, le enviamos la información completa a su correo electrónico.',
        state: true,
        users: [{ id: 1, name: 'Juan Pérez', email: 'juan@email.com' }]
    },
    {
        id: 2,
        typePqr: 'Queja',
        title: 'Demora en el procesamiento de pagos',
        description: 'Los pagos tardan demasiado en procesarse',
        argument: 'He realizado varios pagos que han tardado más de 48 horas en ser procesados, lo cual afecta mi flujo de trabajo.',
        answer: '',
        state: false,
        users: [{ id: 2, name: 'María García', email: 'maria@email.com' }]
    },
    {
        id: 3,
        typePqr: 'Reclamo',
        title: 'Cobro indebido en mi cuenta',
        description: 'Se realizó un cobro no autorizado',
        argument: 'En mi estado de cuenta aparece un cobro por $50.000 que no reconozco ni autoricé. Solicito la devolución inmediata.',
        answer: 'Hemos revisado su caso y procederemos con la devolución en 3-5 días hábiles.',
        state: true,
        users: [{ id: 3, name: 'Carlos López', email: 'carlos@email.com' }]
    }
];

export const usePqrData = () => {
    const [pqrs, setPqrs] = useState<PqrEntity[]>(mockPqrs);
    const [filteredPqrs, setFilteredPqrs] = useState<PqrEntity[]>(mockPqrs);
    const [searchTerm, setSearchTerm] = useState('');
    const [typeFilter, setTypeFilter] = useState<string>('all');
    const [stateFilter, setStateFilter] = useState<string>('all');
    const [selectedPqr, setSelectedPqr] = useState<PqrEntity | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Calcular estadísticas
    const stats: PqrStats = {
        total: pqrs.length,
        peticiones: pqrs.filter(p => p.typePqr === 'Peticion').length,
        quejas: pqrs.filter(p => p.typePqr === 'Queja').length,
        reclamos: pqrs.filter(p => p.typePqr === 'Reclamo').length,
        pendientes: pqrs.filter(p => !p.state).length,
        resueltas: pqrs.filter(p => p.state).length,
    };

    // Filtrar PQRs
    useEffect(() => {
        let filtered = pqrs;

        if (searchTerm) {
            filtered = filtered.filter(pqr =>
                pqr.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                pqr.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (typeFilter !== 'all') {
            filtered = filtered.filter(pqr => pqr.typePqr === typeFilter);
        }

        if (stateFilter !== 'all') {
            filtered = filtered.filter(pqr => 
                stateFilter === 'resolved' ? pqr.state : !pqr.state
            );
        }

        setFilteredPqrs(filtered);
    }, [searchTerm, typeFilter, stateFilter, pqrs]);

    const handleView = (pqr: PqrEntity) => {
        setSelectedPqr(pqr);
        setIsModalOpen(true);
    };

    const handleEdit = (pqr: PqrEntity) => {
        console.log('Editar PQR:', pqr);
        // Implementar lógica de edición
    };

    const handleDelete = (id: number) => {
        if (confirm('¿Está seguro de que desea eliminar esta PQR?')) {
            setPqrs(prev => prev.filter(p => p.id !== id));
        }
    };

    return {
        pqrs,
        filteredPqrs,
        searchTerm,
        setSearchTerm,
        typeFilter,
        setTypeFilter,
        stateFilter,
        setStateFilter,
        selectedPqr,
        setSelectedPqr,
        isModalOpen,
        setIsModalOpen,
        stats,
        handleView,
        handleEdit,
        handleDelete,
    };
};
