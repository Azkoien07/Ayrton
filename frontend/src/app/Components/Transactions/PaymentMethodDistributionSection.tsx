import React from 'react';
import { motion } from 'framer-motion';
import { CreditCard, DollarSign } from 'lucide-react';

interface PaymentEntity {
    id: number;
    purchaseAmount: number;
    paymentMethod: 'TarjetaCredito' | 'TarjetaDebito' | 'Paypal';
    paymentDate: string;
    voucher?: VoucherEntity;
    users?: UserEntity[];
}

interface VoucherEntity {
    id: number;
    code: string;
    payments?: PaymentEntity[];
}

interface UserEntity {
    id: number;
    name: string;
    email: string;
    payments?: PaymentEntity[];
}

interface PaymentMethodDistributionSectionProps {
    payments: PaymentEntity[];
}

const PaymentMethodDistributionSection: React.FC<PaymentMethodDistributionSectionProps> = ({ payments }) => {
    const getPaymentMethodIcon = (method: string) => {
        switch (method) {
            case 'TarjetaCredito':
                return <CreditCard className="w-4 h-4 text-blue-600" />;
            case 'TarjetaDebito':
                return <CreditCard className="w-4 h-4 text-green-600" />;
            case 'Paypal':
                return <DollarSign className="w-4 h-4 text-yellow-600" />;
            default:
                return <CreditCard className="w-4 h-4 text-gray-600" />;
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="px-6 pb-6"
        >
            <div className='rounded-lg bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border'>
                <div className="p-6 border-b border-light-border dark:border-dark-border">
                    <h2 className="text-xl font-bold text-light-text dark:text-dark-text">
                        Distribución por Método de Pago
                    </h2>
                </div>
                
                <div className="p-6">
                    {(() => {
                        const methodStats = payments.reduce((acc, payment) => {
                            const method = payment.paymentMethod;
                            if (!acc[method]) {
                                acc[method] = { count: 0, total: 0 };
                            }
                            acc[method].count += 1;
                            acc[method].total += payment.purchaseAmount;
                            return acc;
                        }, {} as Record<string, { count: number; total: number }>);

                        const totalPayments = payments.length;
                        
                        return Object.entries(methodStats).length === 0 ? (
                            <div className="text-center py-8">
                                <CreditCard className="w-12 h-12 text-light-textSecondary dark:text-dark-textSecondary mx-auto mb-4" />
                                <p className="text-light-textSecondary dark:text-dark-textSecondary">
                                    No hay datos de métodos de pago disponibles
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {Object.entries(methodStats).map(([method, stats]) => {
                                    const percentage = totalPayments > 0 ? (stats.count / totalPayments) * 100 : 0;
                                    return (
                                        <div key={method} className="bg-light-background dark:bg-dark-background rounded-lg p-4">
                                            <div className="flex items-center justify-between mb-3">
                                                <div className="flex items-center gap-3">
                                                    {getPaymentMethodIcon(method)}
                                                    <span className="font-medium text-light-text dark:text-dark-text">
                                                        {method}
                                                    </span>
                                                </div>
                                                <span className="text-sm text-light-textSecondary dark:text-dark-textSecondary">
                                                    {percentage.toFixed(1)}%
                                                </span>
                                            </div>
                                            
                                            <div className="mb-3">
                                                <div className="w-full bg-light-border dark:bg-dark-border rounded-full h-2">
                                                    <div 
                                                        className="bg-light-primary dark:bg-dark-primary h-2 rounded-full transition-all duration-300"
                                                        style={{ width: `${percentage}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                            
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-light-textSecondary dark:text-dark-textSecondary">
                                                    {stats.count} transacciones
                                                </span>
                                                <span className="font-bold text-green-600">
                                                    ${stats.total.toLocaleString()}
                                                </span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    })()}
                </div>
            </div>
        </motion.div>
    );
};

export default PaymentMethodDistributionSection;
