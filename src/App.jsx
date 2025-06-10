import Footer from './components/Footer';
import SEO from './components/SEO';
import AdBanner from './components/AdBanner';
import InflationCalculatorPage from './pages/InflationCalculatorPage';
import PhantomExpensesCalculatorPage from './pages/PhantomExpensesCalculatorPage';
import RentVsBuyCalculatorPage from './pages/RentVsBuyCalculatorPage';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';

function App() {
  const [activePage, setActivePage] = useState("/");

  return (

      <div className="min-h-screen flex flex-col">
        <Header activePage={activePage} setActivePage={setActivePage}/>
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/calculadora-inflacion" element={<InflationCalculatorPage />} />
            <Route path="/gastos-fantasma" element={<PhantomExpensesCalculatorPage />} />
            <Route path="/alquilar-vs-comprar" element={<RentVsBuyCalculatorPage />} />
          </Routes>
          <AdBanner />
        </main>
        <Footer />
      </div>
  );
}

export default App;