// ==============================================
// 面接評価ロジック
// ルーブリックに基づいて回答を評価しフィードバックを生成
// ==============================================

import type { DiagnosticType } from '@/types';
import { RUBRIC_CRITERIA } from '@/data/interviewRubric';
import { TYPE_INTERVIEW_PROFILES } from '@/data/interviewQuestions';
import type { FeedbackResult } from '@/data/interviewRubric';

export function evaluateAnswer(
  answer: string,
  diagnosticType: DiagnosticType,
): FeedbackResult {
  const trimmed = answer.trim();
  const typeProfile = TYPE_INTERVIEW_PROFILES[diagnosticType];

  // 各基準で評価
  const criterionResults = RUBRIC_CRITERIA.map((c) => {
    const result = c.checkFn(trimmed);
    return { label: c.label, score: result.score, comment: result.comment, weight: c.weight };
  });

  // 重み付きスコア
  const overallScore = Math.round(
    criterionResults.reduce((sum, r) => sum + r.score * r.weight, 0)
  );

  // 良い点（score >= 70）
  const goodPoints = criterionResults
    .filter((r) => r.score >= 70)
    .map((r) => r.comment)
    .slice(0, 2);

  // 改善点（score < 70）
  const improvementPoints = criterionResults
    .filter((r) => r.score < 70)
    .map((r) => r.comment)
    .slice(0, 2);

  // 足りなければタイプ別の共通ミスから補完
  if (goodPoints.length < 2) {
    goodPoints.push('回答しようとする姿勢が大切です。練習を重ねましょう。');
  }
  if (improvementPoints.length < 2) {
    improvementPoints.push(typeProfile.commonMistakes[0] + 'に注意しましょう。');
  }

  // 総評
  let overallComment: string;
  if (overallScore >= 75) {
    overallComment = '良い回答です。構成がしっかりしており、面接官に伝わる内容になっています。さらに磨くことで、より印象に残る回答になります。';
  } else if (overallScore >= 50) {
    overallComment = '方向性は良いですが、もう一段階具体性を上げると面接官の印象に残ります。「いつ、何を、どうしたか」を意識してみてください。';
  } else {
    overallComment = 'まずは「結論→具体例→活かし方」の型を意識してみましょう。型があると、緊張した場面でも言葉が出やすくなります。';
  }

  // 改善版回答例（タイプ別にカスタマイズ）
  const improvedAnswer = generateImprovedAnswer(diagnosticType);

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

function generateImprovedAnswer(type: DiagnosticType): string {
  const examples: Record<DiagnosticType, string> = {
    explorer: '私の強みは「変化に強い適応力」です。\n\n前職では新規事業立ち上げに3度携わり、毎回異なる業界・チーム構成の中で成果を出してきました。直近では、ゼロから始めたBtoBサービスを6ヶ月で月間売上500万円まで成長させました。\n\n未知の環境でも素早くキャッチアップし、行動しながら学べる力を、御社の新規事業でも活かしたいと考えています。',
    specialist: '私の強みは「専門領域での深い問題解決力」です。\n\nデータ分析の領域で5年間の経験があり、直近ではマーケティングチームのKPI設計を担当しました。分析基盤の再構築により、レポート作成時間を80%削減し、意思決定スピードの向上に貢献しました。\n\nこの専門性を活かして、御社のデータドリブンな意思決定を支援したいと考えています。',
    builder: '私の強みは「着実に成果を積み上げる実行力」です。\n\n現職では、3年間にわたりカスタマーサポート体制の改善を担当してきました。マニュアルの整備とチーム教育を地道に進めた結果、顧客満足度を72%から91%まで向上させました。\n\n目の前の課題に誠実に向き合い、長期的な改善を続けられる力を御社でも発揮したいです。',
    pioneer: '私の強みは「自律的に判断し、推進する実行力」です。\n\n前職では、社内で誰も手をつけなかった業務効率化プロジェクトを自ら提案し、リーダーとして推進しました。3ヶ月で既存プロセスの40%を自動化し、チーム全体で月30時間の工数削減を実現しました。\n\n自ら課題を見つけて動ける力を、御社の事業推進でも活かしたいと考えています。',
    influencer: '私の強みは「チームを巻き込み、成果に導くリーダーシップ」です。\n\n直近のプロジェクトでは、部門横断の10名チームのリーダーを担当しました。メンバーの強みを活かした役割分担と、週次の進捗共有を徹底した結果、当初の計画より2週間前倒しでリリースできました。\n\n人を動かし、チームの力を最大化する力を御社でも活かしたいと考えています。',
  };
  return examples[type];
}
