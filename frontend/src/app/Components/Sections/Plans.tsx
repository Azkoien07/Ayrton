import React from "react";
import { plans } from "@Types/plans";
import { motion } from "framer-motion";

const Plans = () => {
    return (
        <section id="plans" className="px-6 py-20 bg-light-background dark:bg-dark-background">
            <div className="max-w-6xl mx-auto text-center">
                <h2 className="text-3xl font-semibold mb-12 text-light-text dark:text-dark-text">
                    Precios de los Planes
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={index}
                            className="bg-light-card dark:bg-dark-card p-8 rounded-2xl shadow-md hover:shadow-xl transition duration-300 border border-light-border dark:border-dark-border"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                        >
                            <h3 className="text-2xl font-semibold text-light-text dark:text-dark-text mb-4">
                                {plan.name}
                            </h3>
                            <p className="text-3xl font-bold text-light-primary dark:text-dark-primary mb-6">{plan.price}</p>
                            <ul className="space-y-2 mb-6 text-light-textSecondary dark:text-dark-textSecondary text-left">
                                {plan.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-center space-x-2">
                                        <span className="text-light-accent dark:text-dark-primary">✔</span>
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            <button className="w-full py-3 px-4 bg-light-primary dark:bg-dark-primary text-white rounded-lg hover:bg-light-accent dark:hover:bg-dark-accent transition-colors font-medium">
                                {plan.buttonText}
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Plans;