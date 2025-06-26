'use client';
import { useState } from 'react';
import { DashboardProps, roleOptions } from '@Types/dashboard';
import Sidebar from '@components/Sidebar';
import { motion } from 'framer-motion';
import Barrita from '@components/barrita';
import { cn } from '@utilities/utils';
import { Plan, plans } from '@Types/Plan';
import PayModal from '@components/Modals/paymodal';


const SubscriptionPlansPage = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
    const [showModal, setShowModal] = useState(false);

    const formatPrice = (price: number, currency: string) => {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: currency === 'COP' ? 'COP' : 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(price);
    };

    const handlePlanSelection = (plan: Plan) => {
        setSelectedPlan(plan);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedPlan(null);
    };

    const proceedToPayment = () => {

        console.log('Procediendo al pago del plan:', selectedPlan?.name);

        alert(`Redirigiendo al pago del ${selectedPlan?.name}`);
        closeModal();
    };

    return (
        <div className="flex h-screen bg-light-background dark:bg-dark-background">
            <Sidebar setSidebarOpen={setSidebarOpen} />

            <main
                className={cn(
                    'flex-1 flex flex-col transition-all duration-500 ease-in-out',
                    sidebarOpen ? 'ml-[240px]' : 'ml-[72px]'
                )}
            >
                <header className='sticky top-0 z-40 backdrop-blur-md bg-light-card/80 dark:bg-dark-card/80 border-b border-light-border dark:border-dark-border'>
                </header>
                <Barrita />

                <div className="flex-1 overflow-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="p-6"
                    >
                        {/* Header Section */}
                        <div className='rounded-lg bg-gradient-to-r from-light-primary/10 to-light-primary/5 dark:from-dark-primary/10 dark:to-dark-primary/5 p-10 lg:p-20 border border-light-border dark:border-dark-border mb-8'>
                            <div className='text-center'>
                                <div className='flex items-center justify-center space-x-2 mb-4'>
                                    <span className='text-light-textSecondary dark:text-dark-textSecondary text-3xl font-light'>Planes de</span>
                                    <span className='text-light-text dark:text-dark-text text-3xl font-bold'>Suscripción</span>
                                </div>
                                <p className="text-light-textSecondary dark:text-dark-textSecondary max-w-2xl mx-auto text-lg">
                                    Elige el plan perfecto para tu equipo y lleva tu productividad al siguiente nivel
                                </p>
                            </div>
                        </div>

                        {/* Plans Grid */}
                        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                            {plans.map((plan, index) => (
                                <motion.div
                                    key={plan.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: index * 0.1 }}
                                    className={cn(
                                        'relative rounded-xl border transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]',
                                        plan.popular
                                            ? 'border-light-primary dark:border-dark-primary bg-gradient-to-b from-light-card to-light-primary/5 dark:from-dark-card dark:to-dark-primary/5 shadow-lg'
                                            : 'border-light-border dark:border-dark-border bg-light-card dark:bg-dark-card'
                                    )}
                                >
                                    {plan.popular && (
                                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                                            <span className="bg-gradient-to-r from-light-primary to-light-secondary dark:from-dark-primary dark:to-dark-secondary text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
                                                Más Popular
                                            </span>
                                        </div>
                                    )}

                                    <div className="p-8">
                                        {/* Plan Header */}
                                        <div className="text-center mb-8">
                                            <h3 className="text-2xl font-bold text-light-text dark:text-dark-text mb-2">
                                                {plan.name}
                                            </h3>
                                            <p className="text-light-textSecondary dark:text-dark-textSecondary mb-4">
                                                {plan.description}
                                            </p>
                                            <div className="flex items-baseline justify-center">
                                                <span className="text-4xl font-bold text-light-primary dark:text-dark-primary">
                                                    {formatPrice(plan.price, plan.currency)}
                                                </span>
                                                <span className="text-light-textSecondary dark:text-dark-textSecondary ml-2">
                                                    /{plan.period}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Features List */}
                                        <ul className="space-y-4 mb-8">
                                            {plan.feutures.map((feature, idx) => (
                                                <li key={idx} className="flex items-start space-x-3">
                                                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-light-primary/20 dark:bg-dark-primary/20 flex items-center justify-center mt-0.5">
                                                        <svg className="w-3 h-3 text-light-primary dark:text-dark-primary" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                        </svg>
                                                    </div>
                                                    <span className="text-light-textSecondary dark:text-dark-textSecondary">
                                                        {feature}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>

                                        {/* CTA Button */}
                                        <button
                                            onClick={() => handlePlanSelection(plan)}
                                            className={cn(
                                                'w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 transform hover:scale-[1.02]',
                                                plan.popular
                                                    ? 'bg-gradient-to-r from-light-primary to-light-secondary dark:from-dark-primary dark:to-dark-secondary text-white shadow-lg hover:shadow-xl'
                                                    : 'bg-light-primary/10 dark:bg-dark-primary/10 text-light-primary dark:text-dark-primary border border-light-primary/20 dark:border-dark-primary/20 hover:bg-light-primary/20 dark:hover:bg-dark-primary/20'
                                            )}
                                        >
                                            {plan.buttonText}
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <div className="mt-16 text-center">
                            <div className="flex justify-center space-x-6 text-sm">
                                <span className="flex items-center text-light-textSecondary dark:text-dark-textSecondary">
                                    <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    Cancela cuando quieras
                                </span>
                                <span className="flex items-center text-light-textSecondary dark:text-dark-textSecondary">
                                    <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    Prueba gratis 14 días
                                </span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </main>

            {/* Payment Modal */}
            {showModal && selectedPlan && (
                <PayModal
                    selectedPlan={selectedPlan}
                    closeModal={closeModal}
                    proceedToPayment={proceedToPayment}
                    formatPrice={formatPrice}
                />
            )}
        </div>
    );
};

export default SubscriptionPlansPage;
