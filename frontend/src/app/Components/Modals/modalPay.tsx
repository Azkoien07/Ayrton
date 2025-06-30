'use client'

import { motion } from 'framer-motion';
import { Plan } from '@/app/Types/Plan';
import { useRouter } from 'next/navigation';
import { Stripe } from '@stripe/stripe-js';

interface PayModalProps {
    selectedPlan: Plan | null;
    closeModal: () => void;
    proceedToPayment: (price: number) => void;
    formatPrice: (price: number, currency: string) => string;
}

const PayModal: React.FC<PayModalProps> = ({ selectedPlan, closeModal, formatPrice }) => {
    const router = useRouter();

    if (!selectedPlan) {
        return null;
    }

    const handleProceedToPayment = () => {
        router.push(`/Stripe?price=${selectedPlan.price}`);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
            onClick={closeModal}
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-light-card dark:bg-dark-card rounded-xl shadow-2xl max-w-md w-full border border-light-border dark:border-dark-border"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-6">
                    {/* Modal Header */}
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-light-text dark:text-dark-text">
                            Confirmar Suscripción
                        </h2>
                        <button
                            onClick={closeModal}
                            className="text-light-textSecondary dark:text-dark-textSecondary hover:text-light-text dark:hover:text-dark-text transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Selected Plan Summary */}
                    <div className="bg-gradient-to-r from-light-primary/10 to-light-primary/5 dark:from-dark-primary/10 dark:to-dark-primary/5 rounded-lg p-4 mb-6 border border-light-primary/20 dark:border-dark-primary/20">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold text-light-text dark:text-dark-text">
                                {selectedPlan.name}
                            </h3>
                            {selectedPlan.popular && (
                                <span className="text-xs bg-light-primary/20 dark:bg-dark-primary/20 text-light-primary dark:text-dark-primary px-2 py-1 rounded-full">
                                    Popular
                                </span>
                            )}
                        </div>
                        <div className="flex items-baseline">
                            <span className="text-2xl font-bold text-light-primary dark:text-dark-primary">
                                {formatPrice(selectedPlan.price, selectedPlan.currency)}
                            </span>
                            <span className="text-light-textSecondary dark:text-dark-textSecondary ml-2">
                                /{selectedPlan.period}
                            </span>
                        </div>
                    </div>


                    <div className="mb-6">
                        <h4 className="font-semibold text-light-text dark:text-dark-text mb-3">
                            Características principales:
                        </h4>
                        <ul className="space-y-2">
                            {selectedPlan.feutures.slice(0, 3).map((feature, idx) => (
                                <li key={idx} className="flex items-center space-x-2 text-sm">
                                    <div className="w-4 h-4 rounded-full bg-light-primary/20 dark:bg-dark-primary/20 flex items-center justify-center">
                                        <svg className="w-2.5 h-2.5 text-light-primary dark:text-dark-primary" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <span className="text-light-textSecondary dark:text-dark-textSecondary">
                                        {feature}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>


                    <div className="flex space-x-3">
                        <button
                            onClick={closeModal}
                            className="flex-1 py-3 px-4 rounded-lg border border-light-border dark:border-dark-border text-light-textSecondary dark:text-dark-textSecondary hover:bg-light-background dark:hover:bg-dark-background transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={handleProceedToPayment}
                            className="flex-1 py-3 px-4 rounded-lg bg-gradient-to-r from-light-primary to-light-secondary dark:from-dark-primary dark:to-dark-secondary text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                        >
                            Proceder al Pago
                        </button>
                    </div>

                    <div className="mt-6 pt-4 border-t border-light-border dark:border-dark-border">
                        <div className="flex items-center justify-center space-x-4 text-xs text-light-textSecondary dark:text-dark-textSecondary">
                            <span className="flex items-center">
                                <svg className="w-4 h-4 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                Pago seguro
                            </span>
                            <span className="flex items-center">
                                <svg className="w-4 h-4 mr-1 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 1 0 002 2h12a2 1 0 002-2V6a2 1 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                </svg>
                                Facturación mensual
                            </span>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default PayModal;
