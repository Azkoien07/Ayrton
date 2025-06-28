import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Eye, Edit, Trash2, CreditCard, DollarSign } from 'lucide-react';
import { PaymentEntity, UserEntity } from '@Types/typestransations';
import { VoucherEntity } from '@Types/voucher';
import { PaymentMethod } from '@/generated/graphql'; // Importar PaymentMethod del archivo generado

interface RecentPaymentsSectionProps {
    filteredPayments: PaymentEntity[];
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    filterMethod: string;
    setFilterMethod: (method: string) => void;
    dateFilter: string;
    setDateFilter: (date: string) => void;
}

const RecentPaymentsSection: React.FC<RecentPaymentsSectionProps> = ({
    filteredPayments,
    searchTerm,
    setSearchTerm,
    filterMethod,
    setFilterMethod,
    dateFilter,
    setDateFilter,
}) => {
    const getPaymentMethodIcon = (method: string) => {
        switch (method) {
            case PaymentMethod.TarjetaCredito:
                return <CreditCard className="w-4 h-4 text-blue-600" />;
            case PaymentMethod.TarjetaDebito:
                return <CreditCard className="w-4 h-4 text-green-600" />;
            case PaymentMethod.Paypal:
                return <DollarSign className="w-4 h-4 text-yellow-600" />;
            default:
                return <CreditCard className="w-4 h-4 text-gray-600" />;
        }
    };

    const getPaymentMethodColor = (method: string) => {
        switch (method) {
            case PaymentMethod.TarjetaCredito:
                return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
            case PaymentMethod.TarjetaDebito:
                return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
            case PaymentMethod.Paypal:
                return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="px-6 pb-6"
        >
            <div className='rounded-lg bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border'>
                <div className="p-6 border-b border-light-border dark:border-dark-border">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold text-light-text dark:text-dark-text">
                            Pagos Recientes
                        </h2>
                        <button className="bg-light-primary dark:bg-dark-primary text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2">
                            <Plus className="w-4 h-4" />
                            Nuevo Pago
                        </button>
                    </div>
                    
                    {/* Filtros y búsqueda */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-light-textSecondary dark:text-dark-textSecondary w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Buscar por ID, método o voucher..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 bg-light-background dark:bg-dark-background border border-light-border dark:border-dark-border rounded-lg focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary"
                            />
                        </div>
                        <select
                            value={filterMethod}
                            onChange={(e) => setFilterMethod(e.target.value)}
                            className="px-4 py-2 bg-light-background dark:bg-dark-background border border-light-border dark:border-dark-border rounded-lg focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary"
                        >
                            <option value="all">Todos los métodos</option>
                            <option value={PaymentMethod.TarjetaCredito}>Tarjeta de Crédito</option>
                            <option value={PaymentMethod.TarjetaDebito}>Tarjeta de Débito</option>
                            <option value={PaymentMethod.Paypal}>PayPal</option>
                        </select>
                        <select
                            value={dateFilter}
                            onChange={(e) => setDateFilter(e.target.value)}
                            className="px-4 py-2 bg-light-background dark:bg-dark-background border border-light-border dark:border-dark-border rounded-lg focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary"
                        >
                            <option value="all">Todas las fechas</option>
                            <option value="today">Hoy</option>
                            <option value="week">Esta semana</option>
                            <option value="month">Este mes</option>
                        </select>
                    </div>
                </div>
                
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-light-background dark:bg-dark-background">
                            <tr>
                                <th className="text-left p-4 text-sm font-medium text-light-textSecondary dark:text-dark-textSecondary">ID</th>
                                <th className="text-left p-4 text-sm font-medium text-light-textSecondary dark:text-dark-textSecondary">Método</th>
                                <th className="text-left p-4 text-sm font-medium text-light-textSecondary dark:text-dark-textSecondary">Monto</th>
                                <th className="text-left p-4 text-sm font-medium text-light-textSecondary dark:text-dark-textSecondary">Fecha</th>
                                <th className="text-left p-4 text-sm font-medium text-light-textSecondary dark:text-dark-textSecondary">Voucher</th>
                                <th className="text-left p-4 text-sm font-medium text-light-textSecondary dark:text-dark-textSecondary">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredPayments.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="p-8 text-center text-light-textSecondary dark:text-dark-textSecondary">
                                        No se encontraron pagos que coincidan con los filtros
                                    </td>
                                </tr>
                            ) : (
                                filteredPayments.map((payment) => (
                                    <tr key={payment.id} className="border-t border-light-border dark:border-dark-border hover:bg-light-background/50 dark:hover:bg-dark-background/50 transition-colors">
                                        <td className="p-4">
                                            <span className="font-medium text-light-text dark:text-dark-text">
                                                #{payment.id}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 rounded-lg bg-light-background dark:bg-dark-background">
                                                {getPaymentMethodIcon(payment.paymentMethod as PaymentMethod)}
                                                </div>
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPaymentMethodColor(payment.paymentMethod as PaymentMethod)}`}>
                                                    {payment.paymentMethod}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <span className="font-bold text-green-600">
                                                ${payment.purchaseAmount.toLocaleString()}
                                            </span>
                                        </td>
                                        <td className="p-4 text-light-textSecondary dark:text-dark-textSecondary">
                                            {new Date(payment.paymentDate).toLocaleDateString('es-ES', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </td>
                                        <td className="p-4">
                                            {payment.voucher ? (
                                                <span className="bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400 px-3 py-1 rounded-full text-xs font-medium">
                                                    {payment.voucher.code}
                                                </span>
                                            ) : (
                                                <span className="text-light-textSecondary dark:text-dark-textSecondary text-sm">
                                                    Sin voucher
                                                </span>
                                            )}
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-2">
                                                <button className="p-2 hover:bg-light-background dark:hover:bg-dark-background rounded-lg transition-colors">
                                                    <Eye className="w-4 h-4 text-light-textSecondary dark:text-dark-textSecondary" />
                                                </button>
                                                <button className="p-2 hover:bg-light-background dark:hover:bg-dark-background rounded-lg transition-colors">
                                                    <Edit className="w-4 h-4 text-light-textSecondary dark:text-dark-textSecondary" />
                                                </button>
                                                <button className="p-2 hover:bg-light-background dark:hover:bg-dark-background rounded-lg transition-colors">
                                                    <Trash2 className="w-4 h-4 text-red-500" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </motion.div>
    );
};

export default RecentPaymentsSection;
