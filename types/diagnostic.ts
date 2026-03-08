// ==============================================
// Diagnostic Types
// Career type diagnosis: questions, scoring, results
// ==============================================

/** The five career diagnostic types */
export type DiagnosticType =
  | 'explorer'
  | 'specialist'
  | 'builder'
  | 'pioneer'
  | 'influencer';

/** Six scoring categories used in the diagnostic */
export type ScoreCategory =
  | 'action'
  | 'stability'
  | 'expression'
  | 'expertise'
  | 'independence'
  | 'stress';

/** Answer choice keys (a through d) */
export type ChoiceKey = 'a' | 'b' | 'c' | 'd';

/** A single diagnostic question */
export interface Question {
  id: string;
  text: string;
  choices: Record<ChoiceKey, string>;
  /** Score mapping: for each choice, which categories receive how many points */
  sm: Record<ChoiceKey, Partial<Record<ScoreCategory, number>>>;
}

/** Stumbling point for interview preparation (embedded in TypeProfile) */
export interface StumblingPoint {
  pt: string;
  why: string;
  ex: string;
}

/** Profile data for a single diagnostic type */
export interface TypeProfile {
  label: string;
  kana: string;
  tagline: string;
  accent: string;
  strengths: string[];
  cautions: string[];
  envs: string[];
  freeAdvice: string;
  stumble: StumblingPoint[];
  improved: string;
}

/** Result of the type determination algorithm */
export interface TypeResult {
  primaryType: DiagnosticType;
  secondaryType: DiagnosticType | null;
  pCat: ScoreCategory;
  sCat: ScoreCategory;
}

/** Score totals across all six categories */
export type Scores = Record<ScoreCategory, number>;

/** User's answers: question ID -> chosen key */
export type Answers = Record<string, ChoiceKey>;
