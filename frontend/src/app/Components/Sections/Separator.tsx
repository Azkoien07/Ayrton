// components/Separator.tsx
import React from 'react';

const Separator = () => {
    return (
        <div className="relative my-16">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-light-accent to-transparent dark:via-dark-accent h-[2px]"></div>
        </div>
    );
};

export default Separator;
