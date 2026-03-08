// ==============================================
// Interview Evaluation Logic
// Rubric-based answer evaluation and feedback generation
// ==============================================

import type { DiagnosticType } from '@/types/diagnostic';
import type { FeedbackResult } from '@/types/interview';
import { RUBRIC_CRITERIA } from '@/data/interviewRubric';
import { TYPE_INTERVIEW_PROFILES } from '@/data/interviewQuestions';
import { TYPES } from '@/data/typeProfiles';

/**
 * Evaluate an interview answer using the rubric criteria.
 * Returns structured feedback with scores, comments, and improved answer.
 */
export function evaluateAnswer(
  answer: string,
  diagnosticType: DiagnosticType,
): FeedbackResult {
  const trimmed = answer.trim();
  const typeProfile = TYPE_INTERVIEW_PROFILES[diagnosticType];

  // Evaluate against each criterion
  const criterionResults = RUBRIC_CRITERIA.map((c) => {
    const result = c.checkFn(trimmed);
    return { label: c.label, score: result.score, comment: result.comment, weight: c.weight };
  });

  // Weighted overall score
  const overallScore = Math.round(
    criterionResults.reduce((sum, r) => sum + r.score * r.weight, 0),
  );

  // Good points (score >= 70)
  const goodPoints = criterionResults
    .filter((r) => r.score >= 70)
    .map((r) => r.comment)
    .slice(0, 2);

  // Improvement points (score < 70)
  const improvementPoints = criterionResults
    .filter((r) => r.score < 70)
    .map((r) => r.comment)
    .slice(0, 2);

  // Fill in defaults if not enough points
  if (goodPoints.length < 2) {
    goodPoints.push('回答しようとする姿勢が大切です。練習を重ねましょう。');
  }
  if (improvementPoints.length < 2) {
    improvementPoints.push(typeProfile.commonMistakes[0] + 'に注意しましょう。');
  }

  // Overall comment
  let overallComment: string;
  if (overallScore >= 75) {
    overallComment =
      '良い回答です。構成がしっかりしており、面接官に伝わる内容になっています。さらに磨くことで、より印象に残る回答になります。';
  } else if (overallScore >= 50) {
    overallComment =
      '方向性は良いですが、もう一段階具体性を上げると面接官の印象に残ります。「いつ、何を、どうしたか」を意識してみてください。';
  } else {
    overallComment =
      'まずは「結論→具体例→活かし方」の型を意識してみましょう。型があると、緊張した場面でも言葉が出やすくなります。';
  }

  // Type-specific improved answer example
  const improvedAnswer = TYPES[diagnosticType].improved;

  return {
    overallScore,
    overallComment,
    goodPoints,
    improvementPoints,
    improvedAnswer,
    criterionResults: criterionResults.map((r) => ({
      label: r.label,
      score: r.score,
      comment: r.comment,
    })),
  };
}
