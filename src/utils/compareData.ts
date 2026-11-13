import { ArchiveRecord } from '../types/archive';
import { ARCHIVE_RECORDS } from '../data/archiveRecords';
import { ValuationFormData } from '../types/valuation';
import { CompareConfigItem } from '../context/CompareContext';

/**
 * Curatorial Reference Benchmarks
 * High-profile historical and architectural models for comparative baseline studies.
 */
export const EDITORIAL_BENCHMARK_ITEMS: CompareConfigItem[] = [
  {
    id: 'BENCH-HERITAGE-35',
    title: 'Birkin 35 Togo Noir GHW (Heritage 1984 Proportion)',
    model: 'Birkin 35 Retourne',
    size: '35 cm',
    leather: 'Togo Calfskin',
    color: 'Noir (89)',
    hardware: 'Gold Hardware (GHW)',
    condition: 'Very Good (Original Upright Silhouette)',
    productionYear: '1984 Heritage Pattern',
    accessories: 'Dustbag, Clochette, Padlock, 2 Keys (Heritage Travel Specification)',
    provenance: "Demonstration Specification (Jane Birkin Original 1984 Ergonomic Commission)",
    priceFormatted: '€16,500 EUR (Illustrative Historical Benchmark)',
    source: "Sotheby's Paris Catalogue Style",
    statusBadge: 'Illustrative Curatorial Benchmark',
    isIllustrative: true,
    verificationStatus: 'UNVERIFIED',
    isCustomConfig: false,
  },
  {
    id: 'BENCH-COMPACT-25',
    title: 'Birkin 25 Togo Noir GHW (Compact Evening Scale)',
    model: 'Birkin 25 Retourne',
    size: '25 cm',
    leather: 'Togo Calfskin',
    color: 'Noir (89)',
    hardware: 'Gold Hardware (GHW)',
    condition: 'Store Fresh / Pristine (Unworn)',
    productionYear: '2023',
    accessories: 'Full Boutique Packaging (Orange Box, Ribbon, Dustbag, Clochette, Lock, Keys, Raincoat, Felt)',
    provenance: "Demonstration Specification (Contemporary European Auction Clearance Style)",
    priceFormatted: '€27,500 EUR (Illustrative Realized Benchmark)',
    source: "Sotheby's Paris Catalogue Style",
    statusBadge: 'Illustrative Curatorial Benchmark',
    isIllustrative: true,
    verificationStatus: 'UNVERIFIED',
    isCustomConfig: false,
  },
  {
    id: 'BENCH-SELLIER-25',
    title: 'Birkin 25 Sellier Epsom Gold GHW (Structured Saddle)',
    model: 'Birkin 25 Sellier',
    size: '25 cm',
    leather: 'Epsom Leather',
    color: 'Gold (37)',
    hardware: 'Gold Hardware (GHW)',
    condition: 'Store Fresh / Pristine',
    productionYear: '2023',
    accessories: 'Full Boutique Packaging (Box, Dustbag, Clochette, Lock, Keys, Raincover)',
    provenance: "Demonstration Specification (Artisanal Exterior Topstitching Geometry)",
    priceFormatted: '$31,500 USD (Illustrative Realized Benchmark)',
    source: "Christie's New York Style",
    statusBadge: 'Illustrative Curatorial Benchmark',
    isIllustrative: true,
    verificationStatus: 'UNVERIFIED',
    isCustomConfig: false,
  },
  {
    id: 'BENCH-EXOTIC-30',
    title: 'Birkin 30 Porosus Croc Bleu Nuit GHW (Precious Exotic)',
    model: 'Birkin 30 Retourne',
    size: '30 cm',
    leather: 'Porosus Crocodile',
    color: 'Bleu Nuit (2Z)',
    hardware: 'Gold Hardware (GHW)',
    condition: 'Excellent (Intact Symmetrical Scales)',
    productionYear: '2021',
    accessories: 'CITES Wildlife Certificate, Full Orange Box, Dustbag, Lock, Keys, Raincoat',
    provenance: "Washington Convention CITES Wildlife Document Audited",
    priceFormatted: '€52,000 EUR (Illustrative Realized Benchmark)',
    source: "Sotheby's Paris Style",
    statusBadge: 'Illustrative Curatorial Benchmark',
    isIllustrative: true,
    verificationStatus: 'UNVERIFIED',
    isCustomConfig: false,
  },
];

/**
 * Transforms an ArchiveRecord into a standardized CompareConfigItem
 */
export const convertArchiveRecordToCompareItem = (rec: ArchiveRecord): CompareConfigItem => {
  return {
    id: rec.id,
    title: `${rec.model} ${rec.size}cm ${rec.leather} (${rec.color.split('(')[0].trim()})`,
    model: rec.model,
    size: `${rec.size} cm`,
    leather: rec.leather,
    color: rec.color,
    hardware: rec.hardware,
    condition: rec.condition,
    productionYear: rec.productionYear || '—',
    accessories:
      rec.notes &&
      (rec.notes.toLowerCase().includes('box') ||
        rec.notes.toLowerCase().includes('packaging') ||
        rec.notes.toLowerCase().includes('clochette') ||
        rec.notes.toLowerCase().includes('lock'))
        ? rec.notes
        : 'Standard Set (Dustbag, Clochette, Lock & 2 Keys)',
    provenance: `${rec.sourceName} • ${rec.sourceReference}`,
    priceFormatted: `${rec.originalPrice.toLocaleString()} ${rec.originalCurrency} (${rec.priceBasis})`,
    source: rec.sourceName,
    statusBadge: `${rec.verificationStatus} • Illustrative Record`,
    isIllustrative: rec.isIllustrative,
    verificationStatus: rec.verificationStatus,
    isCustomConfig: false,
  };
};

/**
 * Transforms a user's active session ValuationFormData into a CompareConfigItem
 */
export const convertValuationToCompareItem = (formData: ValuationFormData): CompareConfigItem => {
  const specTitle = `${formData.model || 'Birkin'} ${formData.size ? `${formData.size} cm` : ''} ${formData.leather || ''}`.trim();

  // Format accessories
  let accText = 'Bag Only';
  if (formData.accessories.length > 0 && !formData.accessories.includes('none')) {
    const accLabels = formData.accessories.map((a) => {
      if (a === 'box') return 'Original Orange Box';
      if (a === 'dustbag') return 'Dustbag';
      if (a === 'lock_keys') return 'Clochette, Padlock & 2 Keys';
      if (a === 'raincoat') return 'Raincoat';
      if (a === 'cites') return 'CITES Wildlife Certificate';
      return a;
    });
    accText = accLabels.join(', ');
  }

  // Format documentation / provenance
  let provText = 'No Documentation Declared';
  if (formData.documentation.length > 0 && !formData.documentation.includes('none')) {
    const docLabels = formData.documentation.map((d) => {
      if (d === 'hermes_receipt') return 'Original Hermès Store Receipt';
      if (d === 'cites') return 'CITES Wildlife Export/Import Certificate';
      if (d === 'appraisal') return 'Specialist Appraisal Certificate';
      return d;
    });
    provText = docLabels.join('; ');
    if (formData.originalPurchaseYear) {
      provText += ` • Purchased: ${formData.originalPurchaseYear}`;
    }
  } else if (formData.originalPurchaseYear) {
    provText = `Purchased: ${formData.originalPurchaseYear}`;
  }

  return {
    id: 'USER-DOSSIER',
    title: specTitle ? `Your Valuation: ${specTitle}` : 'Your Recorded Valuation Dossier',
    model: formData.model || 'Birkin Retourne',
    size: formData.size ? `${formData.size} cm` : '25 cm',
    leather: formData.leather || 'Togo Calfskin',
    color: formData.color || 'Noir (89)',
    hardware: formData.hardware || 'Gold (GHW)',
    condition: formData.condition || 'Store Fresh / Pristine',
    productionYear: formData.productionYear || (formData.originalPurchaseYear ? `${formData.originalPurchaseYear}` : '—'),
    accessories: accText,
    provenance: provText,
    priceFormatted: 'Awaiting Engine Calibration (No Speculative Pricing)',
    source: 'User Valuation Atelier (Active Session)',
    statusBadge: 'User Session Dossier',
    isIllustrative: false,
    verificationStatus: 'SESSION INPUT',
    isCustomConfig: true,
  };
};

/**
 * Finds the closest matching historical archive record for a user configuration
 */
export const findClosestArchiveMatch = (formData: ValuationFormData): CompareConfigItem => {
  if (formData.size) {
    const sizeMatch = ARCHIVE_RECORDS.find((r) => r.size === formData.size);
    if (sizeMatch) return convertArchiveRecordToCompareItem(sizeMatch);
  }
  if (formData.leather) {
    const leatherMatch = ARCHIVE_RECORDS.find((r) => r.leather.toLowerCase().includes(formData.leather.toLowerCase()));
    if (leatherMatch) return convertArchiveRecordToCompareItem(leatherMatch);
  }
  return convertArchiveRecordToCompareItem(ARCHIVE_RECORDS[0]);
};

/**
 * Returns grouped list of all selectable configurations for comparison dropdowns
 */
export const getAllSelectableConfigurations = (
  userDossier?: CompareConfigItem | null
): { group: string; items: CompareConfigItem[] }[] => {
  const groups: { group: string; items: CompareConfigItem[] }[] = [];

  if (userDossier && userDossier.isCustomConfig) {
    groups.push({
      group: 'Active Valuation Session',
      items: [userDossier],
    });
  }

  groups.push({
    group: 'Curatorial Benchmarks',
    items: EDITORIAL_BENCHMARK_ITEMS,
  });

  const completedSales = ARCHIVE_RECORDS.filter((r) => r.transactionType === 'completed_sale').map(
    convertArchiveRecordToCompareItem
  );
  if (completedSales.length > 0) {
    groups.push({
      group: 'Archive Completed Sales (Illustrative)',
      items: completedSales,
    });
  }

  const dealerAsks = ARCHIVE_RECORDS.filter((r) => r.transactionType === 'asking_price').map(
    convertArchiveRecordToCompareItem
  );
  if (dealerAsks.length > 0) {
    groups.push({
      group: 'Dealer Asking Prices (Illustrative)',
      items: dealerAsks,
    });
  }

  const estimates = ARCHIVE_RECORDS.filter((r) => r.transactionType === 'auction_estimate').map(
    convertArchiveRecordToCompareItem
  );
  if (estimates.length > 0) {
    groups.push({
      group: 'Auction Pre-Sale Estimates (Illustrative)',
      items: estimates,
    });
  }

  return groups;
};

/**
 * Normalizes attribute strings for comparison evaluation
 */
export const normalizeAttributeValue = (val?: string): string => {
  if (!val) return '';
  return val
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .replace(/[(),]/g, '')
    .replace(/cm/g, '')
    .replace(/hardware/g, '')
    .trim();
};

/**
 * Evaluates whether two specification attributes are matching or divergent
 */
export const checkAttributeMatch = (valA?: string, valB?: string): boolean => {
  if (!valA || !valB) return false;
  const a = normalizeAttributeValue(valA);
  const b = normalizeAttributeValue(valB);
  if (a === b) return true;
  if (a.length > 2 && b.length > 2 && (a.includes(b) || b.includes(a))) {
    return true;
  }
  return false;
};

