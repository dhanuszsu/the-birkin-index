import React, { useState, useRef, useEffect } from 'react';
import { useCurrency } from '../../context/CurrencyContext';
import { CurrencyCode } from '../../types/valuation';
import { ChevronDown } from 'lucide-react';

export const CurrencySelector: React.FC = () => {
  const { currency, setCurrency } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currencies: { code: CurrencyCode; label: string; symbol: string }[] = [
    { code: 'INR', label: 'INR (₹)', symbol: '₹' },
    { code: 'USD', label: 'USD ($)', symbol: '$' },
    { code: 'EUR', label: 'EUR (€)', symbol: '€' },
  ];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} style={{ position: 'relative', display: 'inline-block' }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          padding: '6px 12px',
          border: '1px solid var(--color-stone)',
          borderRadius: 'var(--radius-xs)',
          backgroundColor: 'transparent',
          color: 'var(--color-espresso)',
          fontSize: '0.75rem',
          letterSpacing: '0.08em',
          fontWeight: 600,
          textTransform: 'uppercase',
          cursor: 'pointer',
          transition: 'all var(--transition-fast)',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--color-espresso)')}
        onMouseLeave={(e) => {
          if (!isOpen) e.currentTarget.style.borderColor = 'var(--color-stone)';
        }}
        aria-label="Select display currency"
      >
        <span>{currency}</span>
        <ChevronDown size={12} strokeWidth={2} style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
      </button>

      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 4px)',
            right: 0,
            zIndex: 100,
            minWidth: '120px',
            backgroundColor: 'var(--color-ivory-light)',
            border: '1px solid var(--color-stone)',
            boxShadow: '0 8px 24px rgba(48, 42, 35, 0.08)',
            padding: '4px 0',
          }}
        >
          {currencies.map((item) => (
            <button
              key={item.code}
              onClick={() => {
                setCurrency(item.code);
                setIsOpen(false);
              }}
              style={{
                width: '100%',
                textAlign: 'left',
                padding: '8px 14px',
                fontSize: '0.78rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                color: currency === item.code ? 'var(--color-burgundy)' : 'var(--color-espresso)',
                fontWeight: currency === item.code ? 700 : 500,
                backgroundColor: currency === item.code ? 'var(--color-burgundy-subtle)' : 'transparent',
                border: 'none',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                if (currency !== item.code) e.currentTarget.style.backgroundColor = 'var(--color-ivory)';
              }}
              onMouseLeave={(e) => {
                if (currency !== item.code) e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <span>{item.code}</span>
              <span style={{ color: 'var(--color-espresso-light)' }}>{item.symbol}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
