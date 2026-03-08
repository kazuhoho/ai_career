// ==============================================
// Diagnostic Logic
// Score calculation and type determination
// ==============================================

import type {
  Answers,
  DiagnosticType,
  ScoreCategory,
  Scores,
  TypeResult,
} from '@/types/diagnostic';
import { QUESTIONS } from '@/data/questions';

/** Score categories in priority order for tie-breaking */
const CATEGORY_PRIORITY: ScoreCategory[] = [
  'action',
  'independence',
  'expression',
  'expertise',
  'stability',
  'stress',
];

/**
 * Cross-match matrix: given top two scoring categories,
 * determines the diagnostic type.
 * Usage: CROSS_MATCH[primaryCategory][secondaryCategory] => DiagnosticType
 */
const CROSS_MATCH: Record<ScoreCategory, Record<ScoreCategory, DiagnosticType>> = {
  action: {
    action: 'explorer',
    stability: 'explorer',
    expression: 'influencer',
    expertise: 'explorer',
    independence: 'pioneer',
    stress: 'explorer',
  },
  stability: {
    action: 'builder',
    stability: 'builder',
    expression: 'builder',
    expertise: 'specialist',
    independence: 'builder',
    stress: 'builder',
  },
  expression: {
    action: 'influencer',
    stability: 'influencer',
    expression: 'influencer',
    expertise: 'specialist',
    independence: 'pioneer',
    stress: 'influencer',
  },
  expertise: {
    action: 'specialist',
    stability: 'specialist',
    expression: 'influencer',
    expertise: 'specialist',
    independence: 'pioneer',
    stress: 'specialist',
  },
  independence: {
    action: 'pioneer',
    stability: 'builder',
    expression: 'influencer',
    expertise: 'pioneer',
    independence: 'pioneer',
    stress: 'pioneer',
  },
  stress: {
    action: 'explorer',
    stability: 'builder',
    expression: 'influencer',
    expertise: 'specialist',
    independence: 'pioneer',
    stress: 'builder',
  },
};

/**
 * Calculate scores across all six categories based on user answers.
 */
export function calcScores(answers: Answers): Scores {
  const scores: Scores = {
    action: 0,
    stability: 0,
    expression: 0,
    expertise: 0,
    independence: 0,
    stress: 0,
  };

  for (const [questionId, choiceKey] of Object.entries(answers)) {
    const question = QUESTIONS.find((q) => q.id === questionId);
    if (!question) continue;

    const scoreMap = question.sm[choiceKey];
    if (!scoreMap) continue;

    for (const [category, points] of Object.entries(scoreMap)) {
      if (category in scores) {
        scores[category as ScoreCategory] += points as number;
      }
    }
  }

  return scores;
}

/**
 * Determine the primary and secondary diagnostic types from scores.
 */
export function detType(scores: Scores): TypeResult {
  // Sort categories by score (descending), with priority order as tiebreaker
  const ranked = [...CATEGORY_PRIORITY].sort((a, b) => {
    const diff = scores[b] - scores[a];
    if (diff !== 0) return diff;
    return CATEGORY_PRIORITY.indexOf(a) - CATEGORY_PRIORITY.indexOf(b);
  });

  const primaryCat = ranked[0];
  const secondaryCat = ranked[1];
  const tertiaryCat = ranked[2];

  const primaryType = CROSS_MATCH[primaryCat][secondaryCat];
  let secondaryType = CROSS_MATCH[secondaryCat][tertiaryCat];

  // Avoid duplicate: if secondary type equals primary, try alternative combination
  if (secondaryType === primaryType && tertiaryCat !== secondaryCat) {
    secondaryType = CROSS_MATCH[tertiaryCat][secondaryCat];
  }

  return {
    primaryType,
    secondaryType: secondaryType !== primaryType ? secondaryType : null,
    pCat: primaryCat,
    sCat: secondaryCat,
  };
}
