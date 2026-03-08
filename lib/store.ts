// ==============================================
// State Management
// sessionStorage-based state persistence
// ==============================================

import type { Answers, Scores, TypeResult } from '@/types/diagnostic';
import type { FeedbackResult } from '@/types/interview';
import { validateAppState } from '@/lib/validation';

const STORAGE_KEY = 'careerlab_v001';

/** Application state shape persisted in sessionStorage */
export interface AppState {
  answers: Answers;
  scores: Scores | null;
  typeResult: TypeResult | null;
  feedback: FeedbackResult | null;
}

/** Default empty state */
export const DEFAULT_STATE: AppState = {
  answers: {},
  scores: null,
  typeResult: null,
  feedback: null,
};

/** Save state to sessionStorage */
export function saveState(state: AppState): void {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Storage full or unavailable — fail silently
  }
}

/** Load state from sessionStorage. Returns null if missing or invalid. */
export function loadState(): AppState | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return validateAppState(parsed);
  } catch {
    return null;
  }
}

/** Clear persisted state */
export function clearState(): void {
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // Fail silently
  }
}
