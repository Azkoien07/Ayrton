'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Receipt, MoreVertical } from 'lucide-react';
import { Voucher } from '@/generated/graphql';

interface VouchersSectionProps {
    vouchers?: Voucher[];
}

const VouchersSection: React.FC<VouchersSectionProps> = ({ vouchers = [] }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="px-6 pb-6"
        >
            <div className="rounded-lg bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border">
                <div className="p-6 border-b border-light-border dark:border-dark-border">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold text-light-text dark:text-dark-text">Vouchers Disponibles</h2>
                        <button className="bg-light-primary dark:bg-dark-primary text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2">
                            <Plus className="w-4 h-4" />
                            Nuevo Voucher
                        </button>
                    </div>
                </div>

                <div className="p-6">
                    {vouchers.length === 0 ? (
                        <div className="text-center py-8">
                            <Receipt className="w-12 h-12 text-light-textSecondary dark:text-dark-textSecondary mx-auto mb-4" />
                            <p className="text-light-textSecondary dark:text-dark-textSecondary">
                                No hay vouchers disponibles
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {vouchers.map((voucher) => (
                                <div
                                    key={voucher.id}
                                    className="bg-light-background dark:bg-dark-background rounded-lg p-6 border border-light-border dark:border-dark-border hover:border-light-primary/20 dark:hover:border-dark-primary/20 transition-colors"
                                >
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/20">
                                                <Receipt className="w-5 h-5 text-purple-600" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-light-text dark:text-dark-text">
                                                    Voucher #{voucher.id}
                                                </h3>
                                                <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary">
                                                    Código: {voucher.code}
                                                </p>
                                            </div>
                                        </div>
                                        <button className="p-2 hover:bg-light-card dark:hover:bg-dark-card rounded-lg transition-colors">
                                            <MoreVertical className="w-4 h-4 text-light-textSecondary dark:text-dark-textSecondary" />
                                        </button>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-light-textSecondary dark:text-dark-textSecondary">
                                                Estado del pago:
                                            </span>
                                            <span className="text-sm font-medium text-light-text dark:text-dark-text">
                                                {voucher.payment ? 'Asociado' : 'No asociado'}
                                            </span>
                                        </div>

                                        {voucher.payment && (
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-light-textSecondary dark:text-dark-textSecondary">
                                                    Monto del pago:
                                                </span>
                                                <span className="text-sm font-bold text-green-600">
                                                    ${voucher.payment.purchaseAmount.toLocaleString()}
                                                </span>
                                            </div>
                                        )}

                                        <div className="pt-2 border-t border-light-border dark:border-dark-border">
                                            <div className="flex gap-2">
                                                <button className="flex-1 bg-light-primary dark:bg-dark-primary text-white px-3 py-2 rounded-lg hover:opacity-90 transition-opacity text-sm">
                                                    Ver detalles
                                                </button>
                                                <button className="px-3 py-2 border border-light-border dark:border-dark-border rounded-lg hover:bg-light-background dark:hover:bg-dark-background transition-colors text-sm">
                                                    Editar
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default VouchersSection;
