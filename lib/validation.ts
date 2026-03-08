// ==============================================
// Validation
// Schema validation for sessionStorage, query params,
// API request bodies, and AI response data
// ==============================================

import type { AppState } from '@/lib/store';
import type { DiagnosticType } from '@/types/diagnostic';
import type { FeedbackResult } from '@/types/interview';

const VALID_TYPES: DiagnosticType[] = [
  'explorer',
  'specialist',
  'builder',
  'pioneer',
  'influencer',
];

const SCORE_CATEGORIES = [
  'action',
  'stability',
  'expression',
  'expertise',
  'independence',
  'stress',
];

// --- sessionStorage validation ---

/** Validate loaded AppState. Returns validated state or null. */
export function validateAppState(data: unknown): AppState | null {
  if (!data || typeof data !== 'object') return null;
  const obj = data as Record<string, unknown>;

  // answers: must be object
  if (typeof obj.answers !== 'object' || obj.answers === null) return null;

  // scores: null or valid Scores object
  if (obj.scores !== null) {
    if (typeof obj.scores !== 'object') return null;
    const scores = obj.scores as Record<string, unknown>;
    for (const cat of SCORE_CATEGORIES) {
      if (typeof scores[cat] !== 'number') return null;
    }
  }

  // typeResult: null or valid TypeResult object
  if (obj.typeResult !== null) {
    if (typeof obj.typeResult !== 'object') return null;
    const tr = obj.typeResult as Record<string, unknown>;
    if (!isValidDiagnosticType(tr.primaryType)) return null;
  }

  // feedback: null or object (light check)
  if (obj.feedback !== null && typeof obj.feedback !== 'object') return null;

  return {
    answers: obj.answers as AppState['answers'],
    scores: obj.scores as AppState['scores'],
    typeResult: obj.typeResult as AppState['typeResult'],
    feedback: obj.feedback as AppState['feedback'],
  };
}

// --- Query param validation ---

const VALID_PRODUCT_SLUGS = ['interview-rehearsal', 'pr-improvement', 'intensive-7day'];

/** Validate a product slug from query params */
export function validateProductSlug(slug: unknown): string | null {
  if (typeof slug !== 'string') return null;
  return VALID_PRODUCT_SLUGS.includes(slug) ? slug : null;
}

/** Validate a Stripe session ID from query params */
export function validateSessionId(sessionId: unknown): string | null {
  if (typeof sessionId !== 'string') return null;
  if (sessionId.length < 10 || sessionId.length > 200) return null;
  return sessionId;
}

// --- API request body validation ---

/** Validate the evaluate API request body */
export function validateEvaluateRequest(body: unknown): {
  answer: string;
  type: DiagnosticType;
} | null {
  if (!body || typeof body !== 'object') return null;
  const obj = body as Record<string, unknown>;

  if (typeof obj.answer !== 'string') return null;
  const answer = obj.answer.trim();
  if (answer.length < 5 || answer.length > 5000) return null;

  if (!isValidDiagnosticType(obj.type)) return null;

  return { answer, type: obj.type as DiagnosticType };
}

// --- AI response schema validation ---

/** Validate that an AI-generated feedback matches expected format */
export function validateFeedbackResponse(data: unknown): FeedbackResult | null {
  if (!data || typeof data !== 'object') return null;
  const obj = data as Record<string, unknown>;

  if (typeof obj.overallScore !== 'number') return null;
  if (obj.overallScore < 0 || obj.overallScore > 100) return null;

  if (typeof obj.overallComment !== 'string' || obj.overallComment.length === 0) return null;

  if (!Array.isArray(obj.goodPoints) || obj.goodPoints.length < 1) return null;
  if (!Array.isArray(obj.improvementPoints) || obj.improvementPoints.length < 1) return null;

  if (typeof obj.improvedAnswer !== 'string' || obj.improvedAnswer.length === 0) return null;

  if (!Array.isArray(obj.criterionResults)) return null;

  return obj as unknown as FeedbackResult;
}

// --- Helpers ---

function isValidDiagnosticType(value: unknown): value is DiagnosticType {
  return typeof value === 'string' && VALID_TYPES.includes(value as DiagnosticType);
}
