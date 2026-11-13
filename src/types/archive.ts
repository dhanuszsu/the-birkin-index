export type TransactionType = 'completed_sale' | 'asking_price' | 'auction_estimate';

export type PriceBasis =
  | 'Hammer price'
  | "Price including buyer's premium"
  | 'Dealer asking price'
  | 'Auction estimate';

export type VerificationStatus =
  | 'VERIFIED'
  | 'PARTIALLY VERIFIED'
  | 'UNVERIFIED';

export type RecordCategory = 'illustrative_display' | 'research_dataset';

export interface ArchiveRecord {
  id: string;
  model: string;                // e.g. 'Birkin 25 Retourne', 'Birkin 25 Sellier'
  size: '25' | '30' | '35' | '40' | string;
  leather: string;              // e.g. 'Togo', 'Epsom', 'Clemence', 'Box Calf', 'Swift', 'Porosus Crocodile'
  color: string;                // e.g. 'Noir (89)', 'Gold (37)', 'Etoupe (18)', 'Craie (10)', 'Bleu Nuit (2Z)'
  hardware: string;             // e.g. 'Gold (GHW)', 'Palladium (PHW)', 'Rose Gold (RGHW)', 'Permabrass'
  condition: string;            // e.g. 'Store Fresh / Pristine', 'Excellent', 'Very Good'
  productionYear?: string;      // e.g. '2023', '2022', '2021', '2019'
  transactionType: TransactionType;
  priceInINR: number;           // Standardized amount in INR for global multi-currency conversion
  originalPrice: number;        // The recorded price in the original auction currency
  originalCurrency: string;     // e.g. 'EUR', 'USD', 'GBP', 'HKD'
  transactionDate?: string;     // ISO format 'YYYY-MM-DD'
  sourceName: string;           // e.g. "Sotheby's Paris", "Christie's New York"
  sourceReference: string;      // Identifiable catalogue lot or consignment token
  sourceUrl?: string | null;    // Primary catalogue URL (null if unconfirmed or unindexed)
  priceBasis: PriceBasis;       // 'Hammer price' | 'Price including buyer\'s premium' | 'Dealer asking price' | 'Auction estimate'
  verificationStatus: VerificationStatus; // 'VERIFIED' | 'PARTIALLY VERIFIED' | 'UNVERIFIED'
  verificationNotes: string;    // Explicit audit log explaining status
  eligibleForML: boolean;       // Strictly false for all illustrative / unverified records
  isIllustrative: boolean;      // True for demonstration/archive display records
  recordCategory: RecordCategory; // 'illustrative_display' vs 'research_dataset'
  notes?: string;               // Provenance notes & nuances
}

export interface ArchiveFilterState {
  searchQuery: string;
  transactionType: 'all' | TransactionType;
  size: string;
  leather: string;
  color: string;
  hardware: string;
  condition: string;
  yearPeriod: string;
  sortBy: 'date_desc' | 'date_asc' | 'price_desc' | 'price_asc';
}

/**
 * Strict Machine Learning Ingestion Quarantine Guard
 *
 * Guarantees that no illustrative, unverified, asking-price, or estimate record
 * can ever enter a model training export, fine-tuning dataset, or prediction engine.
 */
export const isEligibleForResearchPipeline = (record: ArchiveRecord): boolean => {
  return (
    record.recordCategory === 'research_dataset' &&
    record.isIllustrative === false &&
    record.verificationStatus === 'VERIFIED' &&
    record.eligibleForML === true &&
    record.priceBasis !== 'Dealer asking price' &&
    record.priceBasis !== 'Auction estimate' &&
    Boolean(record.sourceUrl) &&
    Boolean(record.originalPrice > 0)
  );
};

export const filterEligibleTrainingRecords = (records: ArchiveRecord[]): ArchiveRecord[] => {
  return records.filter(isEligibleForResearchPipeline);
};
