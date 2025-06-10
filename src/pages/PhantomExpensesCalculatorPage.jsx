
import React, { useState, useEffect } from 'react';
import SEO from '../components/SEO';

const PhantomExpensesCalculatorPage = () => {
  const [expenses, setExpenses] = useState([
    { id: 1, name: 'Suscripción streaming', amount: 15, frequency: 'monthly' },
    { id: 2, name: 'Café diario', amount: 3, frequency: 'daily' },
    { id: 3, name: 'Comida rápida', amount: 10, frequency: 'weekly' },
    { id: 4, name: 'App móvil', amount: 5, frequency: 'monthly' },
    { id: 5, name: 'Otro', amount: 0, frequency: 'monthly' }
  ]);

  const [totalMonthly, setTotalMonthly] = useState(0);
  const [totalYearly, setTotalYearly] = useState(0);

  useEffect(() => {
    calculateTotals();
  }, [expenses]);

  const calculateTotals = () => {
    let monthlyTotal = 0;

    expenses.forEach(expense => {
      const amount = parseFloat(expense.amount) || 0;
      switch (expense.frequency) {
        case 'daily':
          monthlyTotal += amount * 30;
          break;
        case 'weekly':
          monthlyTotal += amount * 4;
          break;
        case 'monthly':
          monthlyTotal += amount;
          break;
        case 'yearly':
          monthlyTotal += amount / 12;
          break;
        default:
          monthlyTotal += amount;
      }
    });

    const yearlyTotal = monthlyTotal * 12;

    setTotalMonthly(monthlyTotal);
    setTotalYearly(yearlyTotal);
  };

  const handleExpenseChange = (id, field, value) => {
    setExpenses(prevExpenses =>
      prevExpenses.map(expense =>
        expense.id === id ? { ...expense, [field]: value } : expense
      )
    );
  };

  const addNewExpense = () => {
    const newId = expenses.length > 0 ? Math.max(...expenses.map(e => e.id)) + 1 : 1;
    setExpenses([...expenses, { id: newId, name: 'Nuevo gasto', amount: 0, frequency: 'monthly' }]);
  };

  return (
    <>
      <SEO
        title="Calculadora de Gastos Fantasma | Finanzas Interactivas"
        description="Descubre cuánto dinero pierdes cada mes con gastos ocultos o recurrentes. Optimiza tu presupuesto con nuestra calculadora gratuita."
        canonicalUrl="https://finanzasinteractivas.com/phantom-expenses" 
      />

      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Calculadora de Gastos Fantasma</h1>
        <p className="text-gray-700 mb-4">
          ¿Sabías que pequeños gastos recurrentes pueden sumar cientos de euros al año? Ingresa tus gastos recurrentes y descubre cuánto podrías ahorrar eliminándolos.
        </p>

        <div className="space-y-4 mb-8">
          {expenses.map(expense => (
            <div key={expense.id} className="border border-gray-300/80 bg-gray-200/90 rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Nombre</label>
                  <input
                    type="text"
                    value={expense.name}
                    onChange={(e) => handleExpenseChange(expense.id, 'name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Cantidad (€)</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={expense.amount}
                    onChange={(e) => handleExpenseChange(expense.id, 'amount', parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Frecuencia</label>
                  <select
                    value={expense.frequency}
                    onChange={(e) => handleExpenseChange(expense.id, 'frequency', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="daily">Diario</option>
                    <option value="weekly">Semanal</option>
                    <option value="monthly">Mensual</option>
                    <option value="yearly">Anual</option>
                  </select>
                </div>
                <div className="flex">
                  <button
                    onClick={() => setExpenses(expenses.filter(e => e.id !== expense.id))}
                    className="text-red-600 hover:text-red-800 w-full text-right "
                    disabled={expenses.length <= 1}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))}

          <button
            onClick={addNewExpense}
            className="mt-4 w-full flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <svg className="h-5 w-5 mr-2 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Agregar nuevo gasto
          </button>
        </div>

        <div className="bg-blue-50 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Resultados</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <p className="text-sm text-gray-500">Gasto mensual total</p>
              <p className="text-3xl font-bold text-blue-600 mt-1">
                {totalMonthly.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <p className="text-sm text-gray-500">Gasto anual total</p>
              <p className="text-3xl font-bold text-blue-600 mt-1">
                {totalYearly.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-green-50 p-4 rounded-lg mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Consejos para Reducir Gastos Fantasma</h2>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            <li>Revisa tus extractos bancarios mensuales buscando cargos recurrentes</li>
            <li>Cancela suscripciones que no uses regularmente</li>
            <li>Prepara café y comida en casa para evitar compras impulsivas</li>
            <li>Consolida servicios (por ejemplo, elegir una sola plataforma de streaming)</li>
            <li>Crea un presupuesto detallado para identificar estos gastos</li>
          </ul>
        </div>

        <div className="bg-yellow-50 p-4 rounded-lg">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">¿Qué Puedes Hacer con Este Dinero?</h2>
          <p className="text-gray-700 mb-2">
            Imagina lo que podrías hacer con el dinero que estás gastando en estos conceptos:
          </p>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            <li>Ahorro para emergencias</li>
            <li>Inversión en fondos indexados</li>
            <li>Vacaciones anuales</li>
            <li>Curso de formación profesional</li>
            <li>Mejoras en tu hogar</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default PhantomExpensesCalculatorPage;