import React from "react";
import { plans } from "@Types/plans";
import { motion } from "framer-motion";


const Plans = () => {
    return (
        <section id="plans" className="px-6 py-20 bg-[#f7f7f7] dark:bg-[#111111]">
            <div className="max-w-6xl mx-auto text-center">
                <h2 className="text-3xl font-semibold mb-12 text-[#111111] dark:text-white">
                    Precios de los Planes
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={index}
                            className="bg-white dark:bg-[#1f1f1f] p-8 rounded-2xl shadow-md hover:shadow-xl transition duration-300 border border-gray-200 dark:border-gray-700"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                        >
                            <h3 className="text-2xl font-semibold text-[#111111] dark:text-white mb-4">
                                {plan.name}
                            </h3>
                            <p className="text-3xl font-bold text-[#3b82f6] mb-6">{plan.price}</p>
                            <ul className="space-y-2 mb-6 text-[#333333] dark:text-gray-300 text-left">
                                {plan.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-center space-x-2">
                                        <span className="text-[#3b82f6]">✔</span>
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            <button className="w-full py-3 px-4 bg-[#3b82f6] text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
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