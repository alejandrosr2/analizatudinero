
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Sobre Nosotros</h3>
            <p className="text-gray-600 text-sm">
              Herramientas financieras interactivas diseñadas para ayudarte a tomar mejores decisiones económicas.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li><a href="#inflation" className="text-gray-600 hover:text-blue-600 text-sm">Calculadora de Inflación</a></li>
              <li><a href="#phantom" className="text-gray-600 hover:text-blue-600 text-sm">Gastos Fantasma</a></li>
              <li><a href="#rentvsbuy" className="text-gray-600 hover:text-blue-600 text-sm">Alquiler vs Comprar</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Contacto</h3>
            <p className="text-gray-600 text-sm"></p>
            <p className="text-gray-600 text-sm mt-2">Madrid, España</p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Finanzas Interactivas. Todos los derechos reservados.</p>
          <p className="mt-2">
            Esta página utiliza publicidad y afiliaciones para generar ingresos. 
            Las herramientas son gratuitas y no recopilan información personal.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;