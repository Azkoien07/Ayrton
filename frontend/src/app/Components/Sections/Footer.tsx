import React from 'react';
import Link from 'next/link';

const Footer = () => {
    return (
        <footer id='footer' className="bg-light-card text-light-textSecondary dark:bg-dark-card dark:text-dark-textSecondary py-12">
            <div className="max-w-6xl mx-auto text-center">
                <div className="space-y-4">
                    <div className="flex justify-center gap-8">
                        <Link href="#" className="hover:text-light-accent dark:hover:text-dark-accent">Sobre Nosotros</Link>
                        <a href="#" className="hover:text-light-accent dark:hover:text-dark-accent">Política de Privacidad</a>
                        <Link href="/Terms" className="hover:text-light-accent dark:hover:text-dark-accent">Términos de Uso</Link>
                    </div>
                    <div className="mt-6">
                        <p>&copy; 2025 Ayrton. Todos los derechos reservados.</p>
                    </div>
                    <div className="mt-6 flex justify-center space-x-6">
                        <a
                            href="https://twitter.com" target='_blank'
                            rel="noopener noreferrer"
                            className="text-light-primary dark:text-dark-primary hover:text-light-accent dark:hover:text-dark-accent"
                        >
                            <i className="fab fa-twitter"></i> {/* Icono de Twitter */}
                        </a>
                        <a
                            href="https://www.linkedin.com/in/gabriel-c%C3%A1ceres-253385304/" target='_blank'
                            rel="noopener noreferrer"
                            className="text-light-primary dark:text-dark-primary hover:text-light-accent dark:hover:text-dark-accent"
                        >
                            <i className="fab fa-linkedin"></i> {/* Icono de LinkedIn */}
                        </a>
                        <a
                            href="https://github.com/Azkoien07/Ayrton" target='_blank'
                            rel="noopener noreferrer"
                            className="text-light-primary dark:text-dark-primary hover:text-light-accent dark:hover:text-dark-accent"
                        >
                            <i className="fab fa-github"></i> {/* Icono de GitHub */}
                        </a>
                    </div>

                </div>
            </div>
        </footer>
    );
};

export default Footer;
