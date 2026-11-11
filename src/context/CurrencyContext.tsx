import React, { createContext, useContext, useState } from 'react';
import { CurrencyCode } from '../types/valuation';

interface CurrencyContextType {
  currency: CurrencyCode;
  setCurrency: (currency: CurrencyCode) => void;
  formatCurrency: (amountInINR: number) => string;
  getSymbol: () => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

// Display rates for luxury reference (base is INR)
const RATES: Record<CurrencyCode, { symbol: string; rate: number; prefix: string }> = {
  INR: { symbol: '₹', rate: 1, prefix: '₹' },
  USD: { symbol: '$', rate: 0.0115, prefix: '$' },
  EUR: { symbol: '€', rate: 0.0108, prefix: '€' },
};

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrencyState] = useState<CurrencyCode>(() => {
    const saved = localStorage.getItem('birkin_currency');
    return (saved as CurrencyCode) || 'INR';
  });

  const setCurrency = (c: CurrencyCode) => {
    setCurrencyState(c);
    localStorage.setItem('birkin_currency', c);
  };

  const getSymbol = () => RATES[currency].symbol;

  const formatCurrency = (amountInINR: number): string => {
    const config = RATES[currency];
    const converted = amountInINR * config.rate;

    if (currency === 'INR') {
      return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
      }).format(converted);
    } else if (currency === 'USD') {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
      }).format(converted);
    } else {
      return new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: 'EUR',
        maximumFractionDigits: 0,
      }).format(converted);
    }
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatCurrency, getSymbol }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
