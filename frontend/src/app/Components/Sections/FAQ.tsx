import React, { useState } from 'react';
import { questions } from '@Types/faq';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { useSpring, animated } from 'react-spring';

const FAQ = () => {
    const [active, setActive] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setActive(active === index ? null : index);
    };

    return (
        <section className="px-6 py-20 bg-light-background dark:bg-dark-background">
            <div className="max-w-6xl mx-auto text-center">
                <h2 className="text-3xl font-semibold mb-12 text-light-primary dark:text-dark-primary">
                    Preguntas Frecuentes
                </h2>
                <div className="space-y-4">
                    {questions.map((faq, index) => {
                        const props = useSpring({
                            from: {
                                opacity: 0,
                                maxHeight: '0px',
                                padding: '0px',
                                overflow: 'hidden'
                            },
                            to: {
                                opacity: active === index ? 1 : 0,
                                maxHeight: active === index ? '200px' : '0px',
                                padding: active === index ? '16px' : '0px',
                                overflow: 'hidden'
                            },
                        });

                        // Usamos el componente AnimatedDiv propio que renderiza children
                        const AnimatedDiv = animated('div');

                        return (
                            <div key={index} className="border-b border-light-border dark:border-dark-border">
                                <button
                                    className="w-full text-left py-4 px-6 text-xl font-semibold text-light-primary dark:text-dark-primary hover:text-light-accent dark:hover:text-dark-accent flex items-center justify-between"
                                    onClick={() => toggleFAQ(index)}
                                    aria-expanded={active === index}
                                    aria-controls={`faq-answer-${index}`}
                                >
                                    <span>{faq.question}</span>
                                    <span>
                                        {active === index ? (
                                            <FaChevronUp size={18} />
                                        ) : (
                                            <FaChevronDown size={18} />
                                        )}
                                    </span>
                                </button>
                                <div
                                    id={`faq-answer-${index}`}
                                    className="overflow-hidden"
                                >
                                    <AnimatedDiv style={props} className="px-6 text-light-textSecondary dark:text-dark-textSecondary">
                                        <p>{faq.answer}</p>
                                    </AnimatedDiv>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default FAQ;