import React from 'react';
import { motion } from 'framer-motion';
import { FaQuoteLeft } from 'react-icons/fa';
import { testimonials } from '@Types/testimonial';

const Testimonials = () => {

    return (
        <section className="px-6 py-20 bg-light-card dark:bg-dark-card">
            <div className="max-w-6xl mx-auto text-center">
                <h2 className="text-3xl font-semibold mb-12 text-light-primary dark:text-dark-primary">
                    Lo que dicen nuestros usuarios
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.2 }}
                            viewport={{ once: true }}
                            className="p-6 rounded-2xl bg-white dark:bg-dark-card border border-light-border dark:border-dark-border shadow-md hover:shadow-xl transition-shadow duration-300"
                        >
                            <FaQuoteLeft className="text-3xl text-light-accent dark:text-dark-accent mb-4 mx-auto opacity-70" />
                            <p className="text-md italic text-light-textSecondary dark:text-dark-textSecondary leading-relaxed">{`"${testimonial.feedback}"`}</p>
                            <div className="mt-6">
                                <h3 className="font-semibold text-lg text-light-primary dark:text-dark-primary">{testimonial.name}</h3>
                                <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary tracking-wide uppercase">{testimonial.role}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;