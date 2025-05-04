import { FaReact } from "react-icons/fa";
import { SiTypescript, SiTailwindcss, SiNextdotjs, SiJenkins } from "react-icons/si";

export interface TechStackItem {
    title: string;
    description: string;
    icon: React.ComponentType<any>;
    color: string; // HEX color
    delay: number;
}

export const technologies: TechStackItem[] = [
    {
        title: "React",
        description: "Biblioteca de JavaScript para construir interfaces de usuario reactivas y declarativas en aplicaciones web.",
        color: "cyan",
        delay: 200,
        icon: FaReact,
    },
    {
        title: "TypeScript",
        description: "Superset de JavaScript que añade tipado estático y mejoras de desarrollo.",
        color: "#3178C6",
        delay: 400,
        icon: SiTypescript,
    },
    {
        title: "Tailwind CSS",
        description: "Framework CSS utilitario que permite construir diseños modernos de forma rápida.",
        color: "#38BDF8",
        delay: 600,
        icon: SiTailwindcss,
    },
    {
        title: "Next.js",
        description: "Framework de React para aplicaciones web con renderizado del lado del servidor y generación de sitios estáticos.",
        color: "white",
        delay: 800,
        icon: SiNextdotjs,
    },
    {
        title: "Jenkins",
        description: "Herramienta de integración y entrega continua para automatizar despliegues.",
        color: "#D24939",
        delay: 1000,
        icon: SiJenkins,
    },
];
