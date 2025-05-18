import { FaTasks, FaUsers, FaChartLine } from 'react-icons/fa';
import { motion } from 'framer-motion';

const featuresData = [
    {
        title: 'Gestión eficiente',
        description:
            'Organiza y asigna tareas con facilidad para mantener tu equipo enfocado y en el camino correcto.',
        icon: <FaTasks />,
        color: 'text-blue-500 dark:text-blue-400',
    },
    {
        title: 'Colaboración en tiempo real',
        description: 'Trabaja en equipo, comparte ideas y actualizaciones al instante.',
        icon: <FaUsers />,
        color: 'text-green-500 dark:text-green-400',
    },
    {
        title: 'Informes detallados',
        description:
            'Visualiza los progresos y resultados de tus proyectos con informes visuales y fáciles de entender.',
        icon: <FaChartLine />,
        color: 'text-purple-500 dark:text-purple-400',
    },
];

const Features = () => {
    return (
        <section
            id="features"
            className="px-6 py-20 bg-light-background dark:bg-dark-background"
            aria-label="Características clave"
        >
            <div className="max-w-6xl mx-auto text-center">
                <h2 className="text-4xl font-extrabold mb-16 text-light-primary dark:text-dark-primary">
                    Características clave
                </h2>

                <div className="grid md:grid-cols-3 gap-12">
                    {featuresData.map(({ title, description, icon, color }, idx) => (
                        <FeatureCard
                            key={idx}
                            title={title}
                            description={description}
                            icon={icon}
                            color={color}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

type FeatureCardProps = {
    title: string;
    description: string;
    icon: React.ReactNode;
    color: string;
};

const FeatureCard = ({ title, description, icon, color }: FeatureCardProps) => {
    return (
        <motion.div
            whileHover={{ scale: 1.05, boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="p-8 bg-light-card rounded-2xl shadow-md border border-light-border dark:bg-dark-card dark:border-dark-border cursor-pointer flex flex-col items-center text-center"
            role="group"
            tabIndex={0}
            aria-describedby={`${title.toLowerCase().replace(/\s/g, '-')}-desc`}
        >
            <div
                className={`mb-6 text-6xl ${color} group-focus:ring-4 group-focus:ring-opacity-50 group-focus:ring-current rounded-full`}
                aria-hidden="true"
            >
                {icon}
            </div>
            <h3 className="text-2xl font-semibold mb-3 text-light-primary dark:text-dark-primary">
                {title}
            </h3>
            <p
                id={`${title.toLowerCase().replace(/\s/g, '-')}-desc`}
                className="text-light-textSecondary dark:text-dark-textSecondary max-w-xs"
            >
                {description}
            </p>
        </motion.div>
    );
};

export default Features;
