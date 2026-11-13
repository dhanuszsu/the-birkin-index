import React, { createContext, useContext, useState } from 'react';

export interface CompareConfigItem {
  id?: string;
  title: string;
  model?: string;
  size?: string;
  leather?: string;
  color?: string;
  hardware?: string;
  condition?: string;
  productionYear?: string;
  accessories?: string;
  provenance?: string;
  priceFormatted?: string;
  source?: string;
  statusBadge?: string;
  isIllustrative?: boolean;
  verificationStatus?: string;
  isCustomConfig?: boolean;
}

interface CompareContextType {
  isOpen: boolean;
  openCompare: (prefillInfo?: string, configA?: CompareConfigItem, configB?: CompareConfigItem) => void;
  closeCompare: () => void;
  compareNote: string;
  configA: CompareConfigItem | null;
  configB: CompareConfigItem | null;
  setConfigA: (item: CompareConfigItem | null) => void;
  setConfigB: (item: CompareConfigItem | null) => void;
  swapConfigurations: () => void;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export const CompareProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [compareNote, setCompareNote] = useState<string>('Specification Spread Analysis');
  const [configA, setConfigA] = useState<CompareConfigItem | null>(null);
  const [configB, setConfigB] = useState<CompareConfigItem | null>(null);

  const openCompare = (note?: string, itemA?: CompareConfigItem, itemB?: CompareConfigItem) => {
    setCompareNote(note || 'Specification Spread Analysis');
    if (itemA) setConfigA(itemA);
    if (itemB) setConfigB(itemB);
    setIsOpen(true);
  };

  const closeCompare = () => {
    setIsOpen(false);
  };

  const swapConfigurations = () => {
    setConfigA((prevA) => {
      const prevB = configB;
      setConfigB(prevA);
      return prevB;
    });
  };

  return (
    <CompareContext.Provider
      value={{
        isOpen,
        openCompare,
        closeCompare,
        compareNote,
        configA,
        configB,
        setConfigA,
        setConfigB,
        swapConfigurations,
      }}
    >
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
