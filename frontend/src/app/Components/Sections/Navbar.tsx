// components/Navbar.tsx
import React from 'react';
import Link from 'next/link';

const Navbar = () => {
    return (
        <nav className="flex items-center justify-between px-6 py-4 sticky top-0 bg-light-background/70 backdrop-blur-md dark:bg-dark-background/70 shadow-sm z-50">
            <div className="text-2xl font-bold text-light-primary dark:text-dark-primary font-palmer">
                Ayrton
            </div>
            <ul className="hidden md:flex items-center space-x-8 text-lg font-medium">
                <li><a href="#features" className="hover:text-light-accent dark:hover:text-dark-accent transition-colors">Características</a></li>
                <li><a href="#plans" className="hover:text-light-accent dark:hover:text-dark-accent transition-colors">Precios</a></li>
                <li><a href="#footer" className="hover:text-light-accent dark:hover:text-dark-accent transition-colors">Contacto</a></li>
            </ul>
            <Link href="/Login" className="hidden md:block bg-light-accent text-white py-2 px-6 rounded-full font-semibold hover:bg-light-primary transition-all duration-300 dark:bg-dark-accent dark:hover:bg-dark-hover">
                Comienza gratis
            </Link>
        </nav>
    );
};

export default Navbar;