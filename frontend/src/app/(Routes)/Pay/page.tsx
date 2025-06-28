'use client';
import { useState } from 'react';
import Sidebar from '@components/Sidebar';
import Barrita from '@components/barrita';
import { cn } from '@utilities/utils';
import { Plan, plans } from '@Types/Plan';
import PayModal from '@components/Modals/paymodal';
import SubscriptionHeader from '@components/SubscriptionHeader';
import PlanCard from '@components/PlanCard';
import SubscriptionBenefits from '@components/SubscriptionBenefits';


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

    const textSecondary = 'text-light-textSecondary dark:text-dark-textSecondary';
    const textColor = 'text-light-text dark:text-dark-text';

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
                    <div className="p-6">
                        <SubscriptionHeader textSecondaryClass={textSecondary} textColorClass={textColor} />

                        {/* Plans Grid */}
                        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                            {plans.map((plan, index) => (
                                <PlanCard
                                    key={plan.id}
                                    plan={plan}
                                    index={index}
                                    formatPrice={formatPrice}
                                    handlePlanSelection={handlePlanSelection}
                                />
                            ))}
                        </div>

                        <SubscriptionBenefits textSecondaryClass={textSecondary} />
                    </div>
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
