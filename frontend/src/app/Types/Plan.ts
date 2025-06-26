export interface  Plan {
   id: string;
   name: string;
   price:number;
   currency: string;
   period:string;
   description:string;
   feutures:string[];
   popular?: boolean;
    buttonText: string;
}


export const plans: Plan[] = [
        {
            id: 'basic',
            name: 'Plan Basico',
            price: 0,
            currency: 'COP',
            period: 'mes',
            description: 'Perfecto para empezar',
            feutures: [
                'Hasta 10 tareas por mes',
                'Acceso a dashboard básico',
                'Soporte por email',
                'Almacenamiento 1GB',
                'Integración con 2 herramientas'
            ],
            buttonText: 'Plan Actual'
        },
        {
            id: 'professional',
            name: 'Plan Premium',
            price: 34000,
            currency: 'COP',
            period: 'mes',
            description: 'Para equipos en crecimiento',
            feutures: [
                'Tareas ilimitadas',
                'Dashboard avanzado con analytics',
                'Soporte prioritario 24/7',
                'Almacenamiento 50GB',
                'Integración con 20+ herramientas',
                'Colaboración en tiempo real',
                'Reportes personalizados'
            ],
            popular: true,
            buttonText: 'Elegir Plan'
        },
        {
            id: 'enterprise',
            name: 'Plan Platino',
            price: 54000,
            currency: 'COP',
            period: 'mes',
            description: 'Para organizaciones grandes',
            feutures: [
                'Todo del Plan Profesional',
                'Usuarios ilimitados',
                'Almacenamiento ilimitado',
                'API personalizada',
                'Administrador dedicado',
                'Seguridad avanzada (SSO)',
                'Integración personalizada',
                'Backup automático'
            ],
            buttonText: 'Elegir Plan'
        }
    ];
