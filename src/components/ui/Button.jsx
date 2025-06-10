import React from 'react'

const Button = ({ children, onClick, variant = "primary", fullWidth = false }) => {
    const baseClasses = "px-4 py-2 rounded-md font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
    
    const variants = {
        primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
        secondary: "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-blue-500",
        outline: "border border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500"
    };

    return (
        <button
            onClick={onClick}
            className={`${baseClasses} ${variants[variant]} ${fullWidth ? 'w-full' : ''}`}
            >
                {children}
        </button>
    );
};

export default Button
