// ==============================================
// Interview Types
// Mock interview questions, rubric, and feedback
// ==============================================

import type { DiagnosticType } from '@/types/diagnostic';

/** Category of an interview question */
export type InterviewQuestionCategory =
  | 'self_intro'
  | 'strength'
  | 'reason'
  | 'motivation'
  | 'weakness'
  | 'future';

/** A single interview question */
export interface InterviewQuestion {
  id: string;
  text: string;
  category: InterviewQuestionCategory;
  timeLimit: number; // seconds
  isFree: boolean;
  hints: string[];
}

/** A stumbling point for a specific diagnostic type in interviews */
export interface StumblingPoint {
  point: string;
  reason: string;
  example: string;
}

/** Interview profile for a diagnostic type */
export interface TypeInterviewProfile {
  stumblingPoints: StumblingPoint[];
  freeQuestionId: string;
  commonMistakes: string[];
}

/** A single rubric criterion used to evaluate interview answers */
export interface RubricCriterion {
  id: string;
  label: string;
  description: string;
  weight: number; // 0-1
  checkFn: (answer: string) => CriterionCheck;
}

/** Result of evaluating a single rubric criterion */
export interface CriterionCheck {
  score: number;
  comment: string;
}

/** Complete feedback result after evaluating an interview answer */
export interface FeedbackResult {
  overallScore: number; // 0-100
  overallComment: string;
  goodPoints: string[];
  improvementPoints: string[];
  improvedAnswer: string;
  criterionResults: (CriterionCheck & { label: string })[];
}
