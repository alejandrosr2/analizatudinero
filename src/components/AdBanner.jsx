import React, { useEffect } from 'react';

const AdBanner = () => {
  useEffect(() => {
    try {
      // Esto asegura que el script de AdSense se ejecute después del renderizado
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("Error al cargar anuncio de AdSense", e);
    }
  }, []);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 my-8">
      <div className="bg-gray-100 rounded-lg p-4 text-center text-gray-500 text-sm">
        <p>Anuncio publicitario</p>

        {/* Anuncio de Google AdSense */}
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-3793756591770141"
          data-ad-slot="1729449794"              
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
      </div>
    </div>
  );
};

export default AdBanner;