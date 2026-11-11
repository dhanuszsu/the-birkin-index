export type BirkinSize = '25' | '30' | '35' | '40' | 'Other / Special';

export type BirkinModel = 
  | 'Birkin Retourne' 
  | 'Birkin Sellier' 
  | 'Birkin Touch' 
  | 'Birkin Cargo' 
  | 'Birkin Shadow' 
  | 'Birkin Faubourg' 
  | 'Birkin Ghillies' 
  | 'Birkin Casaque' 
  | 'Other / Custom';

export type ConditionGrade = 
  | 'New / Unused' 
  | 'Excellent' 
  | 'Very Good' 
  | 'Good' 
  | 'Visible Wear';

export type HardwareOption = 
  | 'Gold (GHW)' 
  | 'Palladium (PHW)' 
  | 'Rose Gold (RGHW)' 
  | 'Brushed Gold' 
  | 'Brushed Palladium' 
  | 'Permabrass' 
  | 'Ruthenium' 
  | 'Guilloché' 
  | 'Unknown';

export interface ValuationFormData {
  // Stage 1: Bag Identity
  model: BirkinModel | '';
  size: BirkinSize | '';
  productionYear: string;
  blindStamp: string;
  specialEdition: string;

  // Stage 2: Material & Appearance
  leather: string;
  color: string;
  hardware: HardwareOption | '';
  stitching: 'Retourne' | 'Sellier' | 'Unknown' | '';
  twoToneOrCustom: boolean;
  interiorColor?: string;

  // Stage 3: Condition
  condition: ConditionGrade | '';
  conditionNotes: string;
  hasHardwareProtectiveFilm: boolean;

  // Stage 4: Purchase Information
  originalPurchaseYear: string;
  originalPurchasePrice: string;
  purchaseCurrency: 'INR' | 'USD' | 'EUR';
  documentation: string[];
  packaging: string;

  // Stage 5: Accessories
  accessories: string[];
  additionalNotes: string;
}

export interface ValuationOptionItem {
  id: string;
  label: string;
  description?: string;
  tag?: string;
}

export type CurrencyCode = 'INR' | 'USD' | 'EUR';

export interface CurrencyRate {
  symbol: string;
  rateAgainstINR: number; // 1 INR in target currency
  displayPrefix: string;
}
