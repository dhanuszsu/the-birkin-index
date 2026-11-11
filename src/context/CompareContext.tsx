import React, { createContext, useContext, useState } from 'react';

interface CompareContextType {
  isOpen: boolean;
  openCompare: (prefillInfo?: string) => void;
  closeCompare: () => void;
  compareNote: string;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export const CompareProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [compareNote, setCompareNote] = useState<string>('');

  const openCompare = (note?: string) => {
    setCompareNote(note || 'Valuation Comparison');
    setIsOpen(true);
  };

  const closeCompare = () => {
    setIsOpen(false);
  };

  return (
    <CompareContext.Provider value={{ isOpen, openCompare, closeCompare, compareNote }}>
      {children}
    </CompareContext.Provider>
  );
};

export const useCompare = () => {
  const context = useContext(CompareContext);
  if (!context) {
    throw new Error('useCompare must be used within a CompareProvider');
  }
  return context;
};
