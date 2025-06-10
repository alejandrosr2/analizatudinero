
import React, { useState, useEffect } from 'react';
import SEO from '../components/SEO';

const RentVsBuyCalculatorPage = () => {
  const [formData, setFormData] = useState({
    propertyPrice: 300000,
    downPayment: 60000,
    interestRate: 2.5,
    loanTerm: 30,
    monthlyRent: 1200,
    rentIncrease: 2,
    propertyTax: 1000,
    insurance: 500,
    maintenance: 1500,
    otherCosts: 300,
    investmentReturn: 5,
    yearsToCompare: 10
  });

  const [buyingCosts, setBuyingCosts] = useState({
    initialCosts: 0,
    monthlyPayment: 0,
    totalCostOverTime: [],
    finalPropertyValue: 0
  });

  const [rentingCosts, setRentingCosts] = useState({
    totalRentOverTime: [],
    investmentGrowth: []
  });

  useEffect(() => {
    calculateCosts();
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: parseFloat(value) || 0
    }));
  };

  const calculateCosts = () => {
    // Costos iniciales de compra
    const initialCosts = formData.downPayment + (formData.propertyPrice * 0.1); // Incluyendo 10% de costos de cierre

    // Cálculo de pago mensual hipotecario
    const principal = formData.propertyPrice - formData.downPayment;
    const monthlyInterestRate = (formData.interestRate / 100) / 12;
    const numberOfPayments = formData.loanTerm * 12;
    const monthlyPayment = principal *
      (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
      (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

    // Tasa de apreciación inmobiliaria (supuesta 3% anual)
    const propertyAppreciationRate = 0.03;

    // Calcular costos a lo largo del tiempo
    const totalCostOverTime = [];
    const totalRentOverTime = [];
    const investmentGrowth = [];

    let buyingTotal = initialCosts;
    let rentingTotal = 0;
    let investmentAmount = initialCosts; // Suponemos que se invierte el enganche si se alquila

    for (let year = 0; year <= formData.yearsToCompare; year++) {
      if (year === 0) {
        buyingTotal = initialCosts;
      } else {
        buyingTotal += monthlyPayment * 12;
        buyingTotal += formData.propertyTax + formData.insurance + formData.maintenance + formData.otherCosts;
      }

      const annualRent = formData.monthlyRent * 12 * Math.pow(1 + (formData.rentIncrease / 100), year);
      if (year > 0) {
        rentingTotal += annualRent;
      }

      investmentAmount = year === 0 ? initialCosts : investmentAmount * (1 + (formData.investmentReturn / 100));

      totalCostOverTime.push({
        year,
        cost: buyingTotal,
        propertyValue: formData.propertyPrice * Math.pow(1 + propertyAppreciationRate, year)
      });

      totalRentOverTime.push({
        year,
        cost: rentingTotal
      });

      investmentGrowth.push({
        year,
        value: investmentAmount
      });
    }

    const finalPropertyValue = formData.propertyPrice * Math.pow(1 + propertyAppreciationRate, formData.yearsToCompare);

    setBuyingCosts({
      initialCosts,
      monthlyPayment,
      totalCostOverTime,
      finalPropertyValue
    });

    setRentingCosts({
      totalRentOverTime,
      investmentGrowth
    });
  };

  return (
    <>
      <SEO
        title="Alquiler vs Comprar Casa | Calculadora Financiera"
        description="Decide si es mejor alquilar o comprar tu vivienda con esta herramienta interactiva que considera todos los factores financieros relevantes."
        canonicalUrl="https://finanzasinteractivas.com/rent-vs-buy" 
      />

      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Comparativa Alquiler vs Compra</h1>
        <p className="text-gray-700 mb-4">
          Descubre si te conviene más alquilar o comprar tu vivienda. Esta herramienta compara los costos totales a largo plazo y considera factores como la inversión alternativa.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Datos de la Vivienda</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Precio de la propiedad (€)</label>
                <input
                  type="number"
                  name="propertyPrice"
                  value={formData.propertyPrice}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Entrada inicial (€)</label>
                <input
                  type="number"
                  name="downPayment"
                  value={formData.downPayment}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Tasa de interés hipotecaria (%)</label>
                <input
                  type="number"
                  name="interestRate"
                  value={formData.interestRate}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Plazo de préstamo (años)</label>
                <input
                  type="number"
                  name="loanTerm"
                  value={formData.loanTerm}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Datos de Alquiler y Otros</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Alquiler mensual actual (€)</label>
                <input
                  type="number"
                  name="monthlyRent"
                  value={formData.monthlyRent}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Aumento anual del alquiler (%)</label>
                <input
                  type="number"
                  name="rentIncrease"
                  value={formData.rentIncrease}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Años a comparar</label>
                <input
                  type="number"
                  name="yearsToCompare"
                  value={formData.yearsToCompare}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Retorno de inversión alternativa (%)</label>
                <input
                  type="number"
                  name="investmentReturn"
                  value={formData.investmentReturn}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg col-span-2">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Costos Anuales Adicionales (compra)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Impuesto predial anual (€)</label>
                <input
                  type="number"
                  name="propertyTax"
                  value={formData.propertyTax}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Seguro anual (€)</label>
                <input
                  type="number"
                  name="insurance"
                  value={formData.insurance}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Mantenimiento anual estimado (€)</label>
                <input
                  type="number"
                  name="maintenance"
                  value={formData.maintenance}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Otros costos anuales (€)</label>
                <input
                  type="number"
                  name="otherCosts"
                  value={formData.otherCosts}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Resumen Inicial</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg shadow">
              <p className="text-sm text-gray-500">Entrada + Costos iniciales</p>
              <p className="text-2xl font-bold text-blue-600 mt-1">
                {buyingCosts.initialCosts.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <p className="text-sm text-gray-500">Pago mensual hipoteca</p>
              <p className="text-2xl font-bold text-blue-600 mt-1">
                {buyingCosts.monthlyPayment.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <p className="text-sm text-gray-500">Valor estimado después de {formData.yearsToCompare} años</p>
              <p className="text-2xl font-bold text-blue-600 mt-1">
                {buyingCosts.finalPropertyValue.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
              </p>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto mb-8">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Año
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Costo total compra (€)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Valor propiedad (€)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Costo total alquiler (€)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Inversión alternativa (€)
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {buyingCosts.totalCostOverTime.map((item, index) => (
                <tr key={item.year} className={index === 0 ? "bg-blue-50" : ""}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.year === 0 ? "Inicial" : `Año ${item.year}`}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.cost.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.propertyValue.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {rentingCosts.totalRentOverTime[index]?.cost.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' }) || '0,00 €'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {rentingCosts.investmentGrowth[index]?.value.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' }) || '0,00 €'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-green-50 p-4 rounded-lg mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Análisis Comparativo</h2>
          <p className="text-gray-700 mb-2">
            Con los datos introducidos, aquí tienes el análisis de las dos opciones:
          </p>

          {buyingCosts.totalCostOverTime.length > 0 && (
            <>
              <div className="mt-4">
                <h3 className="font-medium text-gray-900">Después de {formData.yearsToCompare} años:</h3>
                <ul className="list-disc pl-5 mt-2 text-gray-700">
                  <li>
                    <span className="font-medium">Compra:</span> Tu inversión total sería de{' '}
                    {buyingCosts.totalCostOverTime[formData.yearsToCompare].cost.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}{' '}
                    y poseerías una propiedad valorada en{' '}
                    {buyingCosts.totalCostOverTime[formData.yearsToCompare].propertyValue.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}.
                  </li>
                  <li>
                    <span className="font-medium">Alquiler:</span> Habrías pagado{' '}
                    {rentingCosts.totalRentOverTime[formData.yearsToCompare]?.cost.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' }) || '0,00 €'}{' '}
                    en alquiler, pero habrías invertido los {' '}
                    {buyingCosts.initialCosts.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}{' '}
                    iniciales, obteniendo un retorno de{' '}
                    {rentingCosts.investmentGrowth[formData.yearsToCompare]?.value.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' }) || '0,00 €'}.
                  </li>
                </ul>
              </div>

              <div className="mt-4">
                <h3 className="font-medium text-gray-900">Recomendación:</h3>
                {buyingCosts.totalCostOverTime[formData.yearsToCompare].cost <
                  (rentingCosts.totalRentOverTime[formData.yearsToCompare]?.cost || 0) ? (
                  <p className="text-gray-700">
                    Considerando los datos proporcionados, parece más económico comprar la propiedad si planeas quedarte por los {formData.yearsToCompare} años seleccionados.
                  </p>
                ) : (
                  <p className="text-gray-700">
                    Considerando los datos proporcionados, parece más económico alquilar si planeas quedarte por los {formData.yearsToCompare} años seleccionados.
                  </p>
                )}
              </div>
            </>
          )}
        </div>

        <div className="bg-yellow-50 p-4 rounded-lg">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Factores Adicionales a Considerar</h2>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            <li>Tu situación laboral y estabilidad en una ciudad</li>
            <li>Posibilidad de ascenso o cambio de empleo</li>
            <li>Gustos personales sobre tener una propiedad propia</li>
            <li>Flexibilidad que ofrece el alquiler frente a compromisos a largo plazo</li>
            <li>Costos adicionales de mudanza en caso de alquiler</li>
            <li>Posibilidad de alquilar la propiedad si decides venderla</li>
            <li>Impacto emocional y psicológico de poseer una vivienda</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default RentVsBuyCalculatorPage;