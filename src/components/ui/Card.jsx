// src/components/Card.jsx
import React from 'react';

const Card = ({ title, children, className = "" }) => {
  return (
    <div className={`bg-white shadow-md rounded-lg overflow-hidden ${className}`}>
      {title && (
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>
      )}
      <div className="px-6 py-4">
        {children}
      </div>
    </div>
  );
};

export default Card;