import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const Header = ({ activePage, setActivePage }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" onClick={() => setActivePage('/')}>
                <div className="flex-shrink-0 flex items-center hover:scale-105 duration-200">
                    <svg className="h-8 w-8 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                        <path d="M2 17l10 5 10-5"></path>
                        <path d="M2 12l10 5 10-5"></path>
                    </svg>
                    <span className="ml-2 text-xl font-bold text-gray-900">Finanzas Interactivas</span>
                </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                <Link
                    to="/calculadora-inflacion"
                    onClick={() => setActivePage('inflation-calculator')}
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                    activePage === 'inflation-calculator' 
                        ? 'bg-blue-100 text-blue-700' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                >
                    <p className='hover:text-blue-600 duration-300'>Calculadora de Inflación</p>
                </Link>
                <Link
                    to="/gastos-fantasma"
                    onClick={() => setActivePage('phantom-expenses')}
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                    activePage === 'phantom-expenses' 
                        ? 'bg-blue-100 text-blue-700' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                >
                    <p className='hover:text-blue-600 duration-300'>Gastos Fantasma</p>
                </Link>
                <Link
                    to="/alquilar-vs-comprar"
                    onClick={() => setActivePage('rent-vs-buy')}
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                    activePage === 'rent-vs-buy' 
                        ? 'bg-blue-100 text-blue-700' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                >
                    <p className='hover:text-blue-600 duration-300'>Alquiler vs Comprar</p>
                </Link>
                </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
                <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:bg-gray-100"
                >
                {isMenuOpen ? (
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                ) : (
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                )}
                </button>
            </div>
            </nav>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
            <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <Link
                    to="/calculadora-inflacion"
                    onClick={() => {
                        setActivePage('inflation-calculator');
                        setIsMenuOpen(false);
                    }}
                    className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left ${
                        activePage === 'inflation-calculator'
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                >
                Calculadora de Inflación
                </Link>
                <Link
                to="/gastos-fantasma"
                onClick={() => {
                    setActivePage('phantom-expenses');
                    setIsMenuOpen(false);
                }}
                className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left ${
                    activePage === 'phantom-expenses'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                >
                Gastos Fantasma
                </Link>
                <Link
                    to="/alquilar-vs-comprar"
                    onClick={() => {
                        setActivePage('rent-vs-buy');
                        setIsMenuOpen(false);
                    }}
                    className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left ${
                        activePage === 'rent-vs-buy'
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                >
                Alquiler vs Comprar
                </Link>
            </div>
            </div>
        )}
        </header>
    );
};

export default Header