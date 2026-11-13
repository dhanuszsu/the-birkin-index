import { ArchiveRecord, isEligibleForResearchPipeline } from '../types/archive';
import { ARCHIVE_RECORDS } from './archiveRecords';

/**
 * RESEARCH & MACHINE LEARNING DATASET PIPELINE
 *
 * INSTITUTIONAL DATA INTEGRITY SEPARATION:
 * - This module defines the verified research repository used exclusively for
 *   future statistical modeling, hedonic regression, and ML training pipelines.
 * - Under strict research protocol, all illustrative display records (`isIllustrative === true`),
 *   unverified entries (`verificationStatus !== 'VERIFIED'`), asking prices, and estimates
 *   are programmatically rejected and quarantined.
 * - Current verified research dataset size is strictly 0 until primary catalogue
 *   post-sale sheets or verified appraisal transaction settlements are ingested.
 */

// Verified Research Records Repository (Currently empty pending primary catalogue ingestion)
export const VERIFIED_RESEARCH_RECORDS: ArchiveRecord[] = [];

/**
 * Research Ingestion Gatekeeper
 * Evaluates candidate records and strictly rejects any non-verified or illustrative entries.
 */
export const extractVerifiedTrainingDataset = (candidateRecords: ArchiveRecord[] = ARCHIVE_RECORDS): ArchiveRecord[] => {
  const eligible = candidateRecords.filter(isEligibleForResearchPipeline);
  return eligible;
};

/**
 * Active Research Target Count
 * Returns 0 when no records meet the strict research verification protocol.
 */
export const getVerifiedResearchRecordCount = (): number => {
  return extractVerifiedTrainingDataset().length;
};

