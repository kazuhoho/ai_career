// ==============================================
// Offer Logic
// Rule-based product recommendation based on user weaknesses
// ==============================================

import type { DiagnosticType, Scores } from '@/types/diagnostic';
import type { FeedbackResult } from '@/types/interview';
import type { Product } from '@/types/payment';
import { PRODUCTS } from '@/data/products';

interface RecommendedProduct extends Product {
  /** Why this product is recommended for this user */
  reason: string;
  /** Rank (1 = top recommendation) */
  rank: number;
}

/**
 * Get products sorted by recommendation priority with reasons,
 * based on the user's diagnostic type, scores, and interview feedback.
 */
export function getRecommendedProducts(
  type: DiagnosticType,
  scores: Scores | null,
  feedback: FeedbackResult | null,
): RecommendedProduct[] {
  const interviewScore = feedback?.overallScore ?? 0;

  // Calculate priority scores for each product
  const productScores: Record<string, { priority: number; reason: string }> = {
    'interview-rehearsal': { priority: 0, reason: '' },
    'pr-improvement': { priority: 0, reason: '' },
    'intensive-7day': { priority: 0, reason: '' },
  };

  // Rule 1: Low interview score → recommend interview rehearsal
  if (interviewScore < 60) {
    productScores['interview-rehearsal'].priority += 30;
    productScores['interview-rehearsal'].reason =
      '面接の回答構成力が課題です。繰り返し練習で改善できます';
  } else if (interviewScore < 75) {
    productScores['interview-rehearsal'].priority += 15;
    productScores['interview-rehearsal'].reason =
      '回答力をさらに磨くことで、面接通過率が上がります';
  }

  // Rule 2: Types with self-PR weakness → recommend PR improvement
  if (['builder', 'specialist'].includes(type)) {
    productScores['pr-improvement'].priority += 25;
    productScores['pr-improvement'].reason =
      '自己PRの具体性を高めることが最優先です';
  }

  // Rule 3: Check feedback for specific weaknesses
  if (feedback) {
    const hasStructureIssue = feedback.criterionResults.some(
      (r) => r.label === '結論が先にあるか' && r.score < 60,
    );
    const hasSpecificityIssue = feedback.criterionResults.some(
      (r) => r.label === '具体的か' && r.score < 60,
    );

    if (hasStructureIssue) {
      productScores['interview-rehearsal'].priority += 20;
      if (!productScores['interview-rehearsal'].reason) {
        productScores['interview-rehearsal'].reason =
          '回答の構成力を強化することで、面接官に伝わりやすくなります';
      }
    }

    if (hasSpecificityIssue) {
      productScores['pr-improvement'].priority += 20;
      if (!productScores['pr-improvement'].reason) {
        productScores['pr-improvement'].reason =
          '具体的なエピソードを盛り込むことで、説得力が増します';
      }
    }
  }

  // Rule 4: Low stress tolerance or high anxiety types → intensive plan
  if (scores && scores.stress <= 3) {
    productScores['intensive-7day'].priority += 20;
    productScores['intensive-7day'].reason =
      '短期間で集中的に対策することで自信がつきます';
  }

  // Rule 5: Explorer/Pioneer types often need intensive prep
  if (['explorer', 'pioneer'].includes(type)) {
    productScores['intensive-7day'].priority += 10;
    if (!productScores['intensive-7day'].reason) {
      productScores['intensive-7day'].reason =
        '短期集中で面接の型を身につけることで、本番で力を発揮できます';
    }
  }

  // Default reasons for products without specific triggers
  if (!productScores['interview-rehearsal'].reason) {
    productScores['interview-rehearsal'].reason =
      '面接練習を重ねることで、本番への自信がつきます';
  }
  if (!productScores['pr-improvement'].reason) {
    productScores['pr-improvement'].reason =
      '自己PRと志望動機を改善して、面接の印象を高められます';
  }
  if (!productScores['intensive-7day'].reason) {
    productScores['intensive-7day'].reason =
      '7日間の集中対策で、面接直前の不安を解消できます';
  }

  // Sort by priority and assign ranks
  const sorted = PRODUCTS
    .map((product) => ({
      ...product,
      reason: productScores[product.slug]?.reason ?? '',
      rank: 0,
      _priority: productScores[product.slug]?.priority ?? 0,
    }))
    .sort((a, b) => b._priority - a._priority)
    .map(({ _priority, ...rest }, index) => ({
      ...rest,
      rank: index + 1,
    }));

  return sorted;
}
