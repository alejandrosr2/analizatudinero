
import React, { useState, useEffect } from 'react';
import SEO from '../components/SEO';

const InflationCalculatorPage = () => {
  const [initialAmount, setInitialAmount] = useState(10000);
  const [annualInterestRate, setAnnualInterestRate] = useState(2.5);
  const [inflationRate, setInflationRate] = useState(3.5);
  const [years, setYears] = useState(5);
  const [results, setResults] = useState([]);

  useEffect(() => {
    calculateInflation();
  }, [initialAmount, annualInterestRate, inflationRate, years]);

  const calculateInflation = () => {
    const resultsArray = [];
    let currentAmount = parseFloat(initialAmount);

    for (let year = 0; year <= years; year++) {
      const realValue = currentAmount / Math.pow(1 + inflationRate / 100, year);
      const nominalValue = currentAmount * Math.pow(1 + annualInterestRate / 100, year);

      resultsArray.push({
        year,
        realValue: realValue.toFixed(2),
        nominalValue: nominalValue.toFixed(2),
      });
    }

    setResults(resultsArray);
  };

  return (
    <>
      <SEO
        title="Calculadora de Inflación para Ahorro | Finanzas Interactivas"
        description="Calcula cómo afecta la inflación a tu ahorro con nuestra herramienta interactiva. Ideal para planificar tus finanzas personales en España y América Latina."
        canonicalUrl="https://finanzasinteractivas.com/inflation-calculator" 
      />

      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Calculadora de Inflación para Ahorro</h1>
        <p className="text-gray-700 mb-4">
          Descubre cómo afectará la inflación a tu ahorro a lo largo del tiempo. Introduce los valores iniciales y selecciona el periodo deseado.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Cantidad inicial (€)</label>
            <input
              type="number"
              min="0"
              value={initialAmount}
              onChange={(e) => setInitialAmount(parseFloat(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Tasa de interés anual (%)</label>
            <input
              type="number"
              min="0"
              max="100"
              step="0.1"
              value={annualInterestRate}
              onChange={(e) => setAnnualInterestRate(parseFloat(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Tasa de inflación anual (%)</label>
            <input
              type="number"
              min="0"
              max="100"
              step="0.1"
              value={inflationRate}
              onChange={(e) => setInflationRate(parseFloat(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Años a calcular</label>
            <input
              type="number"
              min="1"
              max="50"
              value={years}
              onChange={(e) => setYears(parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto mb-8">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Año
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Valor Nominal (€)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Valor Real (€)
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-300/80">
              {results.map((result) => (
                <tr key={result.year} className={result.year === 0 ? "bg-blue-50" : ""}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {result.year === 0 ? "Inicial" : `Año ${result.year}`}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {parseFloat(result.nominalValue).toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {parseFloat(result.realValue).toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Interpretación de Resultados</h2>
          <p className="text-gray-700">
            El valor nominal muestra cuánto tendrás en tu cuenta considerando solo los intereses. El valor real muestra el poder adquisitivo real de ese dinero, ajustado por la inflación.
          </p>
          <p className="text-gray-700 mt-2">
            Si la tasa de inflación es mayor que la tasa de interés, verás cómo tu poder adquisitivo disminuye con el tiempo a pesar de que el saldo en tu cuenta aumente.
          </p>
        </div>

        <div className="bg-green-50 p-4 rounded-lg">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Consejos para Combatir la Inflación</h2>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            <li>Considera inversiones con rendimientos superiores a la inflación</li>
            <li>Diversifica tu cartera para mitigar riesgos</li>
            <li>Mantén una parte de tu capital líquido para oportunidades</li>
            <li>Educación financiera continua es clave para tomar buenas decisiones</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default InflationCalculatorPage;