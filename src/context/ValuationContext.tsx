import React, { createContext, useContext, useState, useEffect } from 'react';
import { ValuationFormData } from '../types/valuation';

interface ValuationContextType {
  formData: ValuationFormData;
  currentStage: number; // 1 to 5, and 6 for Review
  completedStages: number[];
  errors: Record<string, string>;
  updateField: <K extends keyof ValuationFormData>(field: K, value: ValuationFormData[K]) => void;
  toggleArrayField: (field: 'documentation' | 'accessories', item: string) => void;
  goToStage: (stage: number) => void;
  nextStage: () => boolean;
  prevStage: () => void;
  validateStage: (stage: number) => boolean;
  resetForm: () => void;
  isEngineConnected: boolean;
  isSubmitted: boolean;
  setIsSubmitted: (submitted: boolean) => void;
}

const initialFormData: ValuationFormData = {
  model: '',
  size: '',
  productionYear: '',
  blindStamp: '',
  specialEdition: 'None / Standard Edition',

  leather: '',
  color: '',
  hardware: '',
  stitching: '',
  twoToneOrCustom: false,
  interiorColor: '',

  condition: '',
  conditionNotes: '',
  hasHardwareProtectiveFilm: false,

  originalPurchaseYear: '',
  originalPurchasePrice: '',
  purchaseCurrency: 'INR',
  documentation: [],
  packaging: '',

  accessories: [],
  additionalNotes: '',
};

const STORAGE_KEY = 'birkin_valuation_form';
const STAGE_KEY = 'birkin_valuation_stage';

const ValuationContext = createContext<ValuationContextType | undefined>(undefined);

export const ValuationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [formData, setFormData] = useState<ValuationFormData>(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      return saved ? { ...initialFormData, ...JSON.parse(saved) } : initialFormData;
    } catch {
      return initialFormData;
    }
  });

  const [currentStage, setCurrentStage] = useState<number>(() => {
    try {
      const saved = sessionStorage.getItem(STAGE_KEY);
      return saved ? parseInt(saved, 10) : 1;
    } catch {
      return 1;
    }
  });

  const [completedStages, setCompletedStages] = useState<number[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // Future engine connection status - clearly defined as false for initial phase
  const isEngineConnected = false;

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    } catch {
      // storage unavailable
    }
  }, [formData]);

  useEffect(() => {
    try {
      sessionStorage.setItem(STAGE_KEY, currentStage.toString());
    } catch {
      // storage unavailable
    }
  }, [currentStage]);

  const updateField = <K extends keyof ValuationFormData>(field: K, value: ValuationFormData[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error for field if any
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const toggleArrayField = (field: 'documentation' | 'accessories', item: string) => {
    setFormData((prev) => {
      const currentList = prev[field] || [];
      const exists = currentList.includes(item);
      const updated = exists ? currentList.filter((i) => i !== item) : [...currentList, item];
      return { ...prev, [field]: updated };
    });
  };

  const validateStage = (stage: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (stage === 1) {
      if (!formData.model) newErrors.model = 'Please select a Birkin model specification.';
      if (!formData.size) newErrors.size = 'Please select a Birkin proportion / size.';
      if (!formData.productionYear) newErrors.productionYear = 'Please select an approximate production year or era.';
    } else if (stage === 2) {
      if (!formData.leather) newErrors.leather = 'Please select the leather or skin type.';
      if (!formData.color) newErrors.color = 'Please designate the primary colour shade.';
      if (!formData.hardware) newErrors.hardware = 'Please specify the hardware finish.';
    } else if (stage === 3) {
      if (!formData.condition) newErrors.condition = 'Please indicate the bag’s current physical condition grade.';
    } else if (stage === 4) {
      // Stage 4 has optional fields, but if purchase price is entered it must be numeric
      if (formData.originalPurchasePrice && isNaN(Number(formData.originalPurchasePrice.replace(/,/g, '')))) {
        newErrors.originalPurchasePrice = 'Please enter a valid numeric value without symbols.';
      }
    } else if (stage === 5) {
      // Accessories can be empty (e.g. bag only without accessories), but we validate if user confirms
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStage = (): boolean => {
    if (validateStage(currentStage)) {
      if (!completedStages.includes(currentStage)) {
        setCompletedStages((prev) => [...prev, currentStage]);
      }
      if (currentStage < 6) {
        setCurrentStage((prev) => prev + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return true;
      }
    }
    return false;
  };

  const prevStage = () => {
    if (currentStage > 1) {
      setCurrentStage((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToStage = (targetStage: number) => {
    if (targetStage < currentStage || completedStages.includes(targetStage - 1) || targetStage === 1) {
      setCurrentStage(targetStage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setCurrentStage(1);
    setCompletedStages([]);
    setErrors({});
    setIsSubmitted(false);
    sessionStorage.removeItem(STORAGE_KEY);
    sessionStorage.removeItem(STAGE_KEY);
  };

  return (
    <ValuationContext.Provider
      value={{
        formData,
        currentStage,
        completedStages,
        errors,
        updateField,
        toggleArrayField,
        goToStage,
        nextStage,
        prevStage,
        validateStage,
        resetForm,
        isEngineConnected,
        isSubmitted,
        setIsSubmitted,
      }}
    >
      {children}
    </ValuationContext.Provider>
  );
};

export const useValuation = () => {
  const context = useContext(ValuationContext);
  if (!context) {
    throw new Error('useValuation must be used within a ValuationProvider');
  }
  return context;
};
