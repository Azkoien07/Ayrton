import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    
    const toggleMenu = () => setMenuOpen((prev) => !prev);

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
            scrolled 
                ? 'bg-light-background/95 dark:bg-dark-background/95 backdrop-blur-lg shadow-lg border-b border-light-border/50 dark:border-dark-border/50' 
                : 'bg-light-background/80 dark:bg-dark-background/80 backdrop-blur-md shadow-md'
        }`}>
            <div className="max-w-7xl mx-auto flex items-center justify-between px-6 lg:px-8 py-4">
                {/* Logo con efecto hover mejorado */}
                <Link href="/" className="group">
                    <span className="text-3xl lg:text-4xl font-palmer font-bold bg-gradient-to-r from-light-primary via-light-secondary to-light-accent dark:from-dark-primary dark:via-dark-secondary dark:to-dark-accent bg-clip-text text-transparent cursor-pointer select-none transition-all duration-300 group-hover:scale-105 group-hover:drop-shadow-sm">
                        Ayrton
                    </span>
                </Link>

                {/* Menú escritorio con efectos mejorados */}
                <ul className="hidden md:flex items-center space-x-8 lg:space-x-12">
                    {[
                        { href: '#features', text: 'Características' },
                        { href: '#plans', text: 'Precios' },
                        { href: '#footer', text: 'Contacto' }
                    ].map((item, index) => (
                        <li key={index} className="relative group">
                            <a
                                href={item.href}
                                className="text-lg font-medium text-light-text dark:text-dark-text hover:text-light-primary dark:hover:text-dark-primary transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-light-accent/50 dark:focus:ring-dark-accent/50 rounded-lg px-3 py-2 relative overflow-hidden"
                            >
                                <span className="relative z-10">{item.text}</span>
                                {/* Efecto de hover con gradiente */}
                                <div className="absolute inset-0 bg-gradient-to-r from-light-accentSoft to-light-accent/20 dark:from-dark-accentSoft to-dark-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                                {/* Línea inferior animada */}
                                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-light-primary to-light-accent dark:from-dark-primary dark:to-dark-accent group-hover:w-full transition-all duration-300"></div>
                            </a>
                        </li>
                    ))}
                </ul>

                {/* Botón CTA mejorado */}
                <Link
                    href="/Login"
                    className="hidden md:inline-flex items-center bg-gradient-to-r from-light-primary to-light-secondary dark:from-dark-primary dark:to-dark-secondary text-white py-3 px-8 rounded-full font-semibold shadow-lg hover:shadow-xl hover:scale-105 hover:from-light-secondary hover:to-light-accent dark:hover:from-dark-secondary dark:hover:to-dark-accent transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-light-accent/30 dark:focus:ring-dark-accent/30 group relative overflow-hidden"
                >
                    <span className="relative z-10 flex items-center gap-2">
                        Comienza gratis
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                            <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                    </span>
                    {/* Efecto de brillo */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                </Link>

                {/* Botón menú hamburguesa mejorado */}
                <button
                    aria-label="Toggle menu"
                    aria-expanded={menuOpen}
                    onClick={toggleMenu}
                    className="md:hidden flex items-center justify-center w-12 h-12 rounded-xl text-light-text dark:text-dark-text hover:text-light-primary dark:hover:text-dark-primary hover:bg-light-accentSoft dark:hover:bg-dark-accentSoft transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-light-accent/50 dark:focus:ring-dark-accent/50 group"
                >
                    <div className="relative w-6 h-6">
                        <span className={`absolute block w-6 h-0.5 bg-current transition-all duration-300 ease-in-out ${
                            menuOpen ? 'top-3 rotate-45' : 'top-1'
                        }`}></span>
                        <span className={`absolute block w-6 h-0.5 bg-current transition-all duration-300 ease-in-out top-3 ${
                            menuOpen ? 'opacity-0' : 'opacity-100'
                        }`}></span>
                        <span className={`absolute block w-6 h-0.5 bg-current transition-all duration-300 ease-in-out ${
                            menuOpen ? 'top-3 -rotate-45' : 'top-5'
                        }`}></span>
                    </div>
                </button>
            </div>

            {/* Menú móvil mejorado */}
            <div className={`md:hidden bg-light-card/95 dark:bg-dark-card/95 backdrop-blur-lg border-t border-light-border/50 dark:border-dark-border/50 transition-all duration-500 ease-out overflow-hidden ${
                menuOpen ? 'max-h-80 opacity-100 shadow-lg' : 'max-h-0 opacity-0'
            }`}>
                <div className="px-6 py-6 space-y-1">
                    {[
                        { href: '#features', text: 'Características' },
                        { href: '#plans', text: 'Precios' },
                        { href: '#footer', text: 'Contacto' }
                    ].map((item, index) => (
                        <a
                            key={index}
                            href={item.href}
                            onClick={() => setMenuOpen(false)}
                            className="block text-light-text dark:text-dark-text hover:text-light-primary dark:hover:text-dark-primary hover:bg-light-accentSoft dark:hover:bg-dark-accentSoft px-4 py-3 rounded-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-light-accent/50 dark:focus:ring-dark-accent/50 transform hover:translate-x-2"
                        >
                            {item.text}
                        </a>
                    ))}
                    
                    {/* Separador */}
                    <div className="h-px bg-gradient-to-r from-transparent via-light-border dark:via-dark-border to-transparent my-4"></div>
                    
                    {/* Botón CTA móvil */}
                    <Link
                        href="/Login"
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center justify-center bg-gradient-to-r from-light-primary to-light-secondary dark:from-dark-primary dark:to-dark-secondary text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-light-accent/30 dark:focus:ring-dark-accent/30 group"
                    >
                        <span className="flex items-center gap-2">
                            Comienza gratis
                            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                <path d="M5 12h14M12 5l7 7-7 7"/>
                            </svg>
                        </span>
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;