import { FaTasks, FaUsers, FaChartLine } from 'react-icons/fa';
import { motion } from 'framer-motion';

const featuresData = [
    {
        title: 'Gestión eficiente',
        description:
            'Organiza y asigna tareas con facilidad para mantener tu equipo enfocado y en el camino correcto.',
        icon: <FaTasks />,
        color: 'text-light-primary dark:text-dark-primary',
        gradient: 'from-light-primary/20 via-light-secondary/10 to-light-accent/20 dark:from-dark-primary/20 dark:via-dark-secondary/10 dark:to-dark-accent/20',
        borderGradient: 'from-light-primary/30 to-light-accent/30 dark:from-dark-primary/30 dark:to-dark-accent/30',
        shadowColor: 'light-primary dark:dark-primary',
    },
    {
        title: 'Colaboración en tiempo real',
        description: 'Trabaja en equipo, comparte ideas y actualizaciones al instante.',
        icon: <FaUsers />,
        color: 'text-light-secondary dark:text-dark-secondary',
        gradient: 'from-light-secondary/20 via-light-accent/10 to-light-primary/20 dark:from-dark-secondary/20 dark:via-dark-accent/10 dark:to-dark-primary/20',
        borderGradient: 'from-light-secondary/30 to-light-primary/30 dark:from-dark-secondary/30 dark:to-dark-primary/30',
        shadowColor: 'light-secondary dark:dark-secondary',
    },
    {
        title: 'Informes detallados',
        description:
            'Visualiza los progresos y resultados de tus proyectos con informes visuales y fáciles de entender.',
        icon: <FaChartLine />,
        color: 'text-light-accent dark:text-dark-accent',
        gradient: 'from-light-accent/20 via-light-primary/10 to-light-secondary/20 dark:from-dark-accent/20 dark:via-dark-primary/10 dark:to-dark-secondary/20',
        borderGradient: 'from-light-accent/30 to-light-secondary/30 dark:from-dark-accent/30 dark:to-dark-secondary/30',
        shadowColor: 'light-accent dark:dark-accent',
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { 
        opacity: 0, 
        y: 50,
        scale: 0.9 
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1], // Easing más suave
        },
    },
};

const Features = () => {
    return (
        <section
            id="features"
            className="relative px-6 py-24 bg-gradient-to-b from-light-background via-light-accentSoft/30 to-light-background dark:from-dark-background dark:via-dark-accentSoft/20 dark:to-dark-background overflow-hidden"
            aria-label="Características clave"
        >
           
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-10 left-1/4 w-32 h-32 bg-light-primary/10 dark:bg-dark-primary/10 rounded-full blur-2xl animate-pulse"></div>
                <div className="absolute bottom-10 right-1/4 w-40 h-40 bg-light-secondary/10 dark:bg-dark-secondary/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-10 w-24 h-24 bg-light-accent/10 dark:bg-dark-accent/10 rounded-full blur-xl animate-pulse delay-500"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto">
                {/* Header mejorado */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="text-center mb-20"
                >
                    <div className="inline-block mb-4 px-4 py-2 bg-light-accent/10 dark:bg-dark-accent/10 rounded-full border border-light-accent/20 dark:border-dark-accent/20">
                        <span className="text-sm font-semibold text-light-primary dark:text-dark-primary uppercase tracking-wider">
                            Características
                        </span>
                    </div>
                    <h2 className="text-5xl md:text-6xl font-extrabold mb-6 text-light-primary dark:text-dark-primary">
                        <span className="bg-gradient-to-r from-light-primary via-light-secondary to-light-accent dark:from-dark-primary dark:via-dark-secondary dark:to-dark-accent bg-clip-text text-transparent">
                            Características clave
                        </span>
                    </h2>
                    <p className="text-xl text-light-textSecondary dark:text-dark-textSecondary max-w-3xl mx-auto leading-relaxed">
                        Descubre las herramientas que transformarán la manera en que trabajas y colaboras con tu equipo
                    </p>
                </motion.div>

                {/* Grid de características */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12"
                >
                    {featuresData.map((feature, idx) => (
                        <motion.div
                            key={idx}
                            variants={itemVariants}
                            className="group"
                        >
                            <FeatureCard {...feature} index={idx} />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

type FeatureCardProps = {
    title: string;
    description: string;
    icon: React.ReactNode;
    color: string;
    gradient: string;
    borderGradient: string;
    shadowColor: string;
    index: number;
};

const FeatureCard = ({ title, description, icon, color, gradient, borderGradient, shadowColor, index }: FeatureCardProps) => {
    return (
        <motion.div
            whileHover={{ 
                scale: 1.05,
                y: -10,
                transition: { duration: 0.3, ease: "easeOut" }
            }}
            whileTap={{ scale: 0.98 }}
            className="relative p-8 bg-light-card/80 dark:bg-dark-card/80 backdrop-blur-sm rounded-3xl border border-light-border/50 dark:border-dark-border/50 cursor-pointer flex flex-col items-center text-center group overflow-hidden transition-all duration-500 hover:shadow-2xl hover:border-light-primary/30 dark:hover:border-dark-primary/30"
            role="group"
            tabIndex={0}
            aria-describedby={`${title.toLowerCase().replace(/\s/g, '-')}-desc`}
        >
            {/* Efecto de fondo gradient animado */}
            <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
            
            {/* Borde gradient que aparece en hover */}
            <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${borderGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`}></div>
            <div className="absolute inset-[1px] rounded-3xl bg-light-card dark:bg-dark-card -z-10"></div>

            {/* Efecto de brillo que se mueve */}
            <div className="absolute inset-0 rounded-3xl overflow-hidden">
                <div className="absolute -top-20 -left-20 w-40 h-40 bg-white/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 group-hover:animate-pulse"></div>
            </div>

            {/* Contenido de la card */}
            <div className="relative z-10">
                {/* Contenedor del icono mejorado */}
                <motion.div
                    whileHover={{ 
                        rotate: [0, -10, 10, -5, 5, 0],
                        scale: 1.1
                    }}
                    transition={{ duration: 0.5 }}
                    className="relative mb-8"
                >
                    <div className="relative p-6 bg-light-accentSoft/50 dark:bg-dark-accentSoft/50 rounded-2xl group-hover:bg-light-accentSoft dark:group-hover:bg-dark-accentSoft transition-colors duration-300">
                        <div className={`text-5xl ${color} transition-all duration-300 group-hover:scale-110`}>
                            {icon}
                        </div>
                        
                        {/* Anillo decorativo */}
                        <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-light-primary/20 dark:group-hover:border-dark-primary/20 transition-all duration-300"></div>
                        
                        {/* Efecto de pulso */}
                        <div className="absolute inset-0 rounded-2xl bg-light-primary/10 dark:bg-dark-primary/10 scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                    </div>
                    
                    {/* Indicador numérico */}
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-light-primary dark:bg-dark-primary text-white text-sm font-bold rounded-full flex items-center justify-center shadow-lg">
                        {index + 1}
                    </div>
                </motion.div>

                {/* Título con efecto gradient */}
                <h3 className="text-2xl font-bold mb-4 text-light-primary dark:text-dark-primary group-hover:bg-gradient-to-r group-hover:from-light-primary group-hover:to-light-secondary dark:group-hover:from-dark-primary dark:group-hover:to-dark-secondary group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                    {title}
                </h3>
                
                {/* Descripción mejorada */}
                <p
                    id={`${title.toLowerCase().replace(/\s/g, '-')}-desc`}
                    className="text-light-textSecondary dark:text-dark-textSecondary leading-relaxed transition-colors duration-300 group-hover:text-light-text dark:group-hover:text-dark-text"
                >
                    {description}
                </p>

                {/* Indicador de hover */}
                <div className="mt-6 w-12 h-1 bg-light-primary/20 dark:bg-dark-primary/20 rounded-full overflow-hidden">
                    <div className="h-full bg-light-primary dark:bg-dark-primary rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                </div>
            </div>
        </motion.div>
    );
};

export default Features;