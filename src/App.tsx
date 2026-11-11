import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CurrencyProvider } from './context/CurrencyContext';
import { ValuationProvider } from './context/ValuationContext';
import { CompareProvider } from './context/CompareContext';
import { Layout } from './components/layout/Layout';

import { HomePage } from './pages/HomePage';
import { ValuationPage } from './pages/ValuationPage';
import { ValuationResultPage } from './pages/ValuationResultPage';
import { IndexPage } from './pages/IndexPage';
import { AboutPage } from './pages/AboutPage';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <CurrencyProvider>
        <ValuationProvider>
          <CompareProvider>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="valuation" element={<ValuationPage />} />
                <Route path="valuation/result" element={<ValuationResultPage />} />
                <Route path="the-index" element={<IndexPage />} />
                <Route path="index" element={<Navigate to="/the-index" replace />} />
                <Route path="about" element={<AboutPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Route>
            </Routes>
          </CompareProvider>
        </ValuationProvider>
      </CurrencyProvider>
    </BrowserRouter>
  );
};

export default App;

