export interface Plans {
    name: string;
    price: string;
    features: string[];
    buttonText: string;
}

// Data
export const plans: Plans[] = [
    {
        name: "Básico",
        price: "0/mes",
        features: [
            "1 Proyecto",
            "5 Usuarios",
            "Integraciones Básicas",
            "Soporte por Correo Electrónico",
        ],
        buttonText: "Plan actual",
    },
    {
        name: "Pro",
        price: "$34.000 COP/mes",
        features: [
            "10 Proyectos",
            "20 Usuarios",
            "Integraciones Avanzadas",
            "Soporte Prioritario",
        ],
        buttonText: "Seleccionar plan",
    },
    {
        name: "Negocios",
        price: "$50.000 COP/mes",
        features: [
            "Proyectos Ilimitados",
            "Usuarios Ilimitados",
            "Integraciones Personalizadas",
            "Soporte Dedicado 24/7",
        ],
        buttonText: "Seleccionar plan",
    },
];