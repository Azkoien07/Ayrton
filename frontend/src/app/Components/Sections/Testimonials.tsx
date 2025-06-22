import React from 'react';
import { Quote, Star } from 'lucide-react';
import { motion } from 'framer-motion';


const testimonials = [
    {
        name: "María González",
        role: "Directora de Marketing",
        feedback: "Esta plataforma transformó completamente nuestra estrategia digital. Los resultados superaron todas nuestras expectativas.",
        rating: 5,
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
    },
    {
        name: "Carlos Rodríguez",
        role: "CEO Startup Tech",
        feedback: "La facilidad de uso y la potencia de las herramientas nos permitieron escalar nuestro negocio de manera exponencial.",
        rating: 5,
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    {
        name: "Ana Martínez",
        role: "Freelancer Digital",
        feedback: "Como freelancer, necesitaba herramientas eficientes y asequibles. Esta plataforma me dio exactamente lo que buscaba.",
        rating: 5,
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    }
];

const Testimonials = () => {
    return (
        <section className="relative px-6 py-24 overflow-hidden" style={{ backgroundColor: '#F9FAFB' }}>
           
            
          
            
          
          
            <div className="relative max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 shadow-lg"
                        style={{ background: 'linear-gradient(135deg, #3A5A8F, #5879B5)' }}
                    >
                        <Quote className="text-white text-2xl" />
                    </motion.div>
                    
                    <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ 
                        background: 'linear-gradient(135deg, #374151, #3A5A8F, #5879B5)',
                        WebkitBackgroundClip: 'text',
                        backgroundClip: 'text',
                        color: 'transparent'
                    }}>
                        Lo que dicen nuestros usuarios
                    </h2>
                    
                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "100px" }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="h-1 mx-auto rounded-full"
                        style={{ background: 'linear-gradient(90deg, #3A5A8F, #5879B5)' }}
                    ></motion.div>
                    
                    <p className="text-xl mt-6 max-w-3xl mx-auto leading-relaxed" style={{ 
                        color: '#6B7280' 
                    }}>
                        Descubre cómo hemos transformado la experiencia digital de empresas y profesionales
                    </p>
                </motion.div>

                {/* Testimonials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.15 }}
                            whileHover={{ 
                                y: -10,
                                transition: { duration: 0.3 }
                            }}
                            className="group relative"
                        >
                            {/* Card Background with Glassmorphism */}
                            <div className="absolute inset-0 backdrop-blur-xl rounded-3xl shadow-xl group-hover:shadow-2xl transition-all duration-300"
                                style={{ 
                                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                    borderColor: '#D1D5DB'
                                }}></div>
                            <div className="absolute inset-0 backdrop-blur-xl rounded-3xl shadow-xl group-hover:shadow-2xl transition-all duration-300 dark:block hidden"
                                style={{ 
                                    backgroundColor: 'rgba(31, 34, 51, 0.9)',
                                    borderColor: '#374151'
                                }}></div>
                            
                            {/* Gradient Border Effect */}
                            <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"
                                style={{ background: 'linear-gradient(135deg, #8CA1C7, #5879B5, #3A5A8F)' }}></div>
                            
                            <div className="relative p-8 h-full flex flex-col">
                                {/* Quote Icon */}
                                <motion.div
                                    whileHover={{ rotate: 360 }}
                                    transition={{ duration: 0.6 }}
                                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 shadow-lg"
                                    style={{ background: 'linear-gradient(135deg, #3A5A8F, #5879B5)' }}
                                >
                                    <Quote className="text-white text-lg" />
                                </motion.div>

                                {/* Stars Rating */}
                                <div className="flex items-center mb-6">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, scale: 0 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.3, delay: 0.6 + (i * 0.1) }}
                                        >
                                            <Star className="mr-1 fill-current" style={{ color: '#FBBF24', fontSize: '18px' }} />
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Testimonial Text */}
                                <blockquote className="text-lg leading-relaxed mb-8 flex-grow italic" style={{ 
                                    color: '#374151' 
                                }}>
                                    "{testimonial.feedback}"
                                </blockquote>

                                {/* User Info */}
                                <div className="flex items-center">
                                    <motion.div
                                        whileHover={{ scale: 1.1 }}
                                        transition={{ duration: 0.3 }}
                                        className="relative"
                                    >
                                        <div className="w-14 h-14 rounded-full p-0.5" style={{ 
                                            background: 'linear-gradient(135deg, #8CA1C7, #5879B5)' 
                                        }}>
                                            <img
                                                src={testimonial.avatar}
                                                alt={testimonial.name}
                                                className="w-full h-full rounded-full object-cover"
                                            />
                                        </div>
                                        <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2" style={{ 
                                            backgroundColor: '#22C55E',
                                            borderColor: '#FFFFFF'
                                        }}></div>
                                    </motion.div>
                                    
                                    <div className="ml-4">
                                        <h3 className="font-bold text-lg" style={{ color: '#374151' }}>
                                            {testimonial.name}
                                        </h3>
                                        <p className="text-sm font-medium tracking-wide" style={{ color: '#3A5A8F' }}>
                                            {testimonial.role}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="text-center mt-16"
                >
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center px-8 py-4 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                        style={{ 
                            background: 'linear-gradient(135deg, #3A5A8F, #5879B5)'
                        }}
                    >
                        <span>Únete a nuestros usuarios satisfechos</span>
                        <motion.div
                            animate={{ x: [0, 5, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                            className="ml-2"
                        >
                            →
                        </motion.div>
                    </motion.button>
                </motion.div>
            </div>
        </section>
    );
};

export default Testimonials;