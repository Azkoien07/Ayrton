import React from 'react';
import { motion } from 'framer-motion';

const WelcomeSection: React.FC = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="p-6"
        >
            <div className='rounded-lg bg-gradient-to-r from-light-primary/10 to-light-primary/5 dark:from-dark-primary/10 dark:to-dark-primary/5 p-10 lg:p-20 border border-light-border dark:border-dark-border'>
                <div className='flex items-center space-x-2 mb-4'>
                    <span className='text-light-textSecondary dark:text-dark-textSecondary text-3xl font-light'>Panel</span>
                    <span className='text-light-text dark:text-dark-text text-3xl font-bold'>de Pagos</span>
                </div>
                <p className="text-light-textSecondary dark:text-dark-textSecondary max-w-2xl">
                    Gestiona tus pagos, monitorea transacciones y supervisa el uso de vouchers desde un solo lugar.
                </p>
            </div>
        </motion.div>
    );
};

export default WelcomeSection;
