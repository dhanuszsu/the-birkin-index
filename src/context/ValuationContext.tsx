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
  hasVisitedReview: boolean;
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
  const [hasVisitedReview, setHasVisitedReview] = useState<boolean>(() => {
    try {
      const saved = sessionStorage.getItem('birkin_valuation_visited_review');
      return saved === 'true';
    } catch {
      return false;
    }
  });

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
      if (currentStage === 6) {
        setHasVisitedReview(true);
        sessionStorage.setItem('birkin_valuation_visited_review', 'true');
      }
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
      if (item === 'none') {
        // 'none' is mutually exclusive: toggling it clears all other selections
        const exists = currentList.includes('none');
        return { ...prev, [field]: exists ? [] : ['none'] };
      } else {
        // Any regular item clears 'none'
        const exists = currentList.includes(item);
        const withoutNone = currentList.filter((i) => i !== 'none');
        const updated = exists ? withoutNone.filter((i) => i !== item) : [...withoutNone, item];
        return { ...prev, [field]: updated };
      }
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
      // Accessories can be empty (e.g. bag only without accessories), but user can explicitly confirm
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setTimeout(() => {
        const firstErrorEl = document.querySelector('.error-alert, [data-error="true"], select:invalid');
        if (firstErrorEl) {
          firstErrorEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 50);
      return false;
    }
    return true;
  };

  const nextStage = (): boolean => {
    if (validateStage(currentStage)) {
      if (!completedStages.includes(currentStage)) {
        setCompletedStages((prev) => [...prev, currentStage]);
      }
      if (currentStage < 6) {
        const next = currentStage + 1;
        setCurrentStage(next);
        if (next === 6) {
          setHasVisitedReview(true);
        }
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
    if (
      targetStage < currentStage ||
      completedStages.includes(targetStage - 1) ||
      targetStage === 1 ||
      (targetStage === 6 && (hasVisitedReview || completedStages.length >= 4))
    ) {
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
    setHasVisitedReview(false);
    sessionStorage.removeItem(STORAGE_KEY);
    sessionStorage.removeItem(STAGE_KEY);
    sessionStorage.removeItem('birkin_valuation_visited_review');
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
        hasVisitedReview,
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
