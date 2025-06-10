// src/pages/HomePage.jsx
import React from 'react';
import SEO from '../components/SEO';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <>
      <SEO
        title="Calculadoras Financieras Interactivas | Analiza Tu Dinero"
        description="Herramientas interactivas para analizar tus finanzas personales. Calcula inflación, gastos ocultos, alquiler vs comprar y más."
        canonicalUrl="https://analizatudinero.com/" 
        image="https://analizatudinero.com/images/homepage-preview.png" 
      />

      <section className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Bienvenido a Analiza Tu Dinero</h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          Herramientas financieras interactivas diseñadas para ayudarte a tomar mejores decisiones económicas.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card title="Calculadora de Inflación" to="/calculadora-inflacion" />
        <Card title="Gastos Fantasma" to="/gastos-fantasma" />
        <Card title="Alquilar vs Comprar" to="/alquilar-vs-comprar" />
      </section>
    </>
  );
};

const Card = ({ title, to }) => (
  <Link to={to} className="border border-gray-300 block bg-white p-6 rounded-lg shadow hover:shadow-md hover:scale-105 duration-300 ">
    <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
    <p className="mt-2 text-gray-600">Descubre cómo afecta tu dinero con esta herramienta.</p>
  </Link>
);

export default HomePage;