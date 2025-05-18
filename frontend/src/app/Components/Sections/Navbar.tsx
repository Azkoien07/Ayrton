import React, { useState } from 'react';
import Link from 'next/link';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    // Toggle menú móvil
    const toggleMenu = () => setMenuOpen((prev) => !prev);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-light-background/70 dark:bg-dark-background/70 backdrop-blur-md shadow-md transition-colors duration-500">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
                {/* Logo */}
                <Link href="/" className="text-3xl font-palmer font-bold text-light-primary dark:text-dark-primary cursor-pointer select-none">
                    Ayrton
                </Link>

                {/* Menú escritorio */}
                <ul className="hidden md:flex items-center space-x-10 text-lg font-medium text-light-primary dark:text-dark-primary">
                    <li>
                        <a
                            href="#features"
                            className="hover:text-light-accent dark:hover:text-dark-accent transition-colors focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent rounded"
                        >
                            Características
                        </a>
                    </li>
                    <li>
                        <a
                            href="#plans"
                            className="hover:text-light-accent dark:hover:text-dark-accent transition-colors focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent rounded"
                        >
                            Precios
                        </a>
                    </li>
                    <li>
                        <a
                            href="#footer"
                            className="hover:text-light-accent dark:hover:text-dark-accent transition-colors focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent rounded"
                        >
                            Contacto
                        </a>
                    </li>
                </ul>

                {/* Botón Comienza gratis escritorio */}
                <Link
                    href="/Login"
                    className="hidden md:inline-block bg-light-accent text-white py-2 px-7 rounded-full font-semibold shadow-md hover:bg-light-primary dark:bg-dark-accent dark:hover:bg-dark-hover transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-light-accent dark:focus:ring-dark-accent"
                >
                    Comienza gratis
                </Link>

                {/* Botón menú hamburguesa móvil */}
                <button
                    aria-label="Toggle menu"
                    aria-expanded={menuOpen}
                    onClick={toggleMenu}
                    className="md:hidden flex items-center justify-center w-10 h-10 rounded-md text-light-primary dark:text-dark-primary hover:bg-light-accent/20 dark:hover:bg-dark-accent/20 transition-colors focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent"
                >
                    <svg
                        className={`w-6 h-6 transition-transform duration-300 ${menuOpen ? 'rotate-90' : 'rotate-0'}`}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        viewBox="0 0 24 24"
                    >
                        {menuOpen ? (
                            <path d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path d="M3 12h18M3 6h18M3 18h18" />
                        )}
                    </svg>
                </button>
            </div>

            {/* Menú móvil */}
            <div
                className={`md:hidden bg-light-background dark:bg-dark-background border-t border-light-border dark:border-dark-border transition-max-height duration-300 ease-in-out overflow-hidden ${menuOpen ? 'max-h-60' : 'max-h-0'
                    }`}
            >
                <ul className="flex flex-col px-6 py-4 space-y-4 text-center text-light-primary dark:text-dark-primary font-medium">
                    <li>
                        <a
                            href="#features"
                            onClick={() => setMenuOpen(false)}
                            className="block hover:text-light-accent dark:hover:text-dark-accent transition-colors focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent rounded"
                        >
                            Características
                        </a>
                    </li>
                    <li>
                        <a
                            href="#plans"
                            onClick={() => setMenuOpen(false)}
                            className="block hover:text-light-accent dark:hover:text-dark-accent transition-colors focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent rounded"
                        >
                            Precios
                        </a>
                    </li>
                    <li>
                        <a
                            href="#footer"
                            onClick={() => setMenuOpen(false)}
                            className="block hover:text-light-accent dark:hover:text-dark-accent transition-colors focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent rounded"
                        >
                            Contacto
                        </a>
                    </li>
                    <li>
                        <Link
                            href="/Login"
                            onClick={() => setMenuOpen(false)}
                            className="inline-block bg-light-accent text-white py-2 px-7 rounded-full font-semibold shadow-md hover:bg-light-primary dark:bg-dark-accent dark:hover:bg-dark-hover transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-light-accent dark:focus:ring-dark-accent"
                        >
                            Comienza gratis
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
