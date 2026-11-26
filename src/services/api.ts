/**
 * API Service for connecting the React frontend to the FastAPI backend.
 * Provides resilient fallbacks to local data when backend is not running.
 */
import { ARCHIVE_RECORDS } from '../data/archiveRecords';
import { ArchiveRecord } from '../types/archive';

const API_BASE_URL = ((import.meta as any).env && (import.meta as any).env.VITE_API_BASE_URL) || 'http://localhost:8000/api/v1';

export interface ModelStatus {
  is_available: boolean;
  status: string;
  reason: string;
  active_model_name?: string | null;
  active_model_version?: string | null;
  total_records: number;
  genuine_research_records: number;
  eligible_for_ml_count: number;
  minimum_records_required: number;
  model_metrics?: Record<string, any> | null;
}

export interface ArchiveQueryParams {
  page?: number;
  limit?: number;
  size?: string;
  leather?: string;
  color?: string;
  hardware?: string;
  condition?: string;
  search?: string;
  transaction_type?: string;
  verification_status?: string;
  sort_by?: string;
}

export interface PaginatedArchiveResult {
  items: ArchiveRecord[];
  total: number;
  page: number;
  size: number;
  total_pages: number;
  is_fallback: boolean;
}

/**
 * Transforms backend snake_case record to frontend camelCase ArchiveRecord.
 */
export function transformBackendRecord(item: any): ArchiveRecord {
  return {
    id: item.id || `rec_${Math.random().toString(36).substring(2, 9)}`,
    model: item.model || 'Birkin',
    size: String(item.size || '30'),
    leather: item.leather || '',
    color: item.color || '',
    hardware: item.hardware || '',
    condition: item.condition || '',
    productionYear: item.production_year ? String(item.production_year) : undefined,
    transactionType: item.transaction_type || 'completed_sale',
    priceInINR: item.price_inr || 0,
    originalPrice: item.original_price || 0,
    originalCurrency: item.original_currency || 'USD',
    transactionDate: item.transaction_date || undefined,
    sourceName: item.source_name || '',
    sourceReference: item.source_reference || '',
    sourceUrl: item.source_url || null,
    priceBasis: item.price_basis || "Price including buyer's premium",
    verificationStatus: item.verification_status || 'UNVERIFIED',
    verificationNotes: item.verification_notes || '',
    eligibleForML: Boolean(item.eligible_for_ml),
    isIllustrative: Boolean(item.is_illustrative),
    recordCategory: item.record_category || 'illustrative_display',
    notes: item.notes || undefined,
  };
}

/**
 * Fetches archive records from FastAPI backend, with graceful fallback to local data.
 */
export async function fetchArchiveRecords(
  params: ArchiveQueryParams = {}
): Promise<PaginatedArchiveResult> {
  const query = new URLSearchParams();
  if (params.page) query.append('page', String(params.page));
  if (params.limit) query.append('limit', String(params.limit));
  if (params.size && params.size !== 'all') query.append('size', params.size);
  if (params.leather && params.leather !== 'all') query.append('leather', params.leather);
  if (params.color && params.color !== 'all') query.append('color', params.color);
  if (params.hardware && params.hardware !== 'all') query.append('hardware', params.hardware);
  if (params.condition && params.condition !== 'all') query.append('condition', params.condition);
  if (params.transaction_type && params.transaction_type !== 'all') query.append('transaction_type', params.transaction_type);
  if (params.verification_status && params.verification_status !== 'all') query.append('verification_status', params.verification_status);
  if (params.search) query.append('search', params.search);
  if (params.sort_by) query.append('sort_by', params.sort_by);

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);

    const res = await fetch(`${API_BASE_URL}/archive?${query.toString()}`, {
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      const recordsList = data.records || data.items || [];
      return {
        items: recordsList.map(transformBackendRecord),
        total: data.total || 0,
        page: data.page || 1,
        size: data.page_size || data.size || 20,
        total_pages: data.total_pages || 1,
        is_fallback: false,
      };
    }
  } catch (err) {
    // Backend offline or timeout — gracefully fall through to local fallback
  }

  // Fallback to local ARCHIVE_RECORDS
  return {
    items: ARCHIVE_RECORDS,
    total: ARCHIVE_RECORDS.length,
    page: 1,
    size: ARCHIVE_RECORDS.length,
    total_pages: 1,
    is_fallback: true,
  };
}

/**
 * Fetches the current Model status and ML eligibility audit from the backend.
 */
export async function fetchModelStatus(): Promise<ModelStatus> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);

    const res = await fetch(`${API_BASE_URL}/model/status`, {
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    // Backend offline
  }

  return {
    is_available: false,
    status: 'unavailable',
    reason:
      'Backend prediction engine is in strict empirical quarantine mode. Machine learning models will only train and activate once >= 50 verified historical transactions are catalogued.',
    active_model_name: null,
    active_model_version: null,
    total_records: 15,
    genuine_research_records: 0,
    eligible_for_ml_count: 0,
    minimum_records_required: 50,
    model_metrics: null,
  };
}

/**
 * Submits valuation request to prediction endpoint.
 * Accurately catches HTTP 503 unavailable responses.
 */
export async function requestValuationPrediction(payload: {
  model: string;
  size: string;
  leather: string;
  color: string;
  hardware: string;
  condition: string;
  year?: string;
}): Promise<{
  success: boolean;
  prediction?: any;
  refusal_reason?: string;
  status_code?: number;
}> {
  try {
    const res = await fetch(`${API_BASE_URL}/valuation/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      const data = await res.json();
      return { success: true, prediction: data, status_code: 200 };
    }

    const errData = await res.json().catch(() => ({}));
    return {
      success: false,
      refusal_reason:
        errData.detail?.reason ||
        errData.detail ||
        'Model currently unavailable due to insufficient verified training records.',
      status_code: res.status,
    };
  } catch (err: any) {
    return {
      success: false,
      refusal_reason: 'Backend prediction service unreachable or offline.',
      status_code: 503,
    };
  }
}
