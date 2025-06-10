
import React from 'react';

const AdBanner = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 my-8">
      <div className="bg-gray-100 rounded-lg p-4 text-center text-gray-500 text-sm">
        <p>Anuncio publicitario</p>
        <div className="mt-2 h-60 bg-gray-200 rounded flex items-center justify-center">
          <span className="text-gray-400">Espacio para anuncios</span>
        </div>
      </div>
    </div>
  );
};

export default AdBanner;