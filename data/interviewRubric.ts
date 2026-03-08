// ==============================================
// Interview Rubric
// Criteria for evaluating interview answers and generating feedback
// ==============================================

import type { RubricCriterion } from '@/types/interview';

/** Rubric criteria for evaluating interview answers */
export const RUBRIC_CRITERIA: RubricCriterion[] = [
  {
    id: 'conclusion_first',
    label: '結論が先にあるか',
    description: '最初の1文で結論（強み）が明確に述べられているか',
    weight: 0.25,
    checkFn: (answer: string) => {
      const first60 = answer.slice(0, 60);
      const hasConclusion = /強み|得意|自信|力/.test(first60) || answer.length > 20;
      if (answer.length < 10) {
        return { score: 20, comment: '回答が短すぎます。まず結論を一文で述べましょう。' };
      }
      if (hasConclusion) {
        return { score: 80, comment: '冒頭で方向性が示されています。' };
      }
      return { score: 50, comment: '結論を最初に持ってくるとさらに伝わりやすくなります。' };
    },
  },
  {
    id: 'specificity',
    label: '具体的か（抽象論でないか）',
    description: '抽象的な表現だけでなく、具体的な内容が含まれているか',
    weight: 0.25,
    checkFn: (answer: string) => {
      const hasNumbers = /\d+/.test(answer);
      const hasSpecific = /例えば|具体的に|ときに|した結果|のとき|年|月|件|人|%/.test(answer);
      if (hasNumbers && hasSpecific) {
        return { score: 90, comment: '数字と具体例が含まれており、説得力があります。' };
      }
      if (hasSpecific) {
        return { score: 70, comment: '具体的なエピソードがあります。数字を加えるとさらに良くなります。' };
      }
      if (answer.length > 80) {
        return { score: 50, comment: '内容はありますが、具体的なエピソードや数字を入れるとより伝わります。' };
      }
      return { score: 30, comment: '抽象的な表現が多いです。「いつ、何を、どうしたか」を入れましょう。' };
    },
  },
  {
    id: 'example',
    label: '具体例があるか',
    description: '実体験に基づくエピソードが1つ以上含まれているか',
    weight: 0.2,
    checkFn: (answer: string) => {
      const hasEpisode = /経験|場面|ケース|プロジェクト|業務|担当|チーム|取り組/.test(answer);
      if (hasEpisode) {
        return { score: 80, comment: '実体験が含まれています。' };
      }
      if (answer.length > 100) {
        return { score: 50, comment: 'もう少し具体的な経験を1つ入れると面接官の印象に残ります。' };
      }
      return { score: 30, comment: '具体的なエピソードが欲しいです。1つでいいので実体験を入れましょう。' };
    },
  },
  {
    id: 'consistency',
    label: '一貫性があるか',
    description: '強みと具体例と活かし方が繋がっているか',
    weight: 0.15,
    checkFn: (answer: string) => {
      if (answer.length > 120) {
        return { score: 75, comment: '文量は十分です。強み→具体例→活かし方の流れを意識しましょう。' };
      }
      if (answer.length > 60) {
        return { score: 60, comment: 'もう少し「だからこう活かせる」まで繋げると一貫性が出ます。' };
      }
      return { score: 40, comment: '強み→根拠→活かし方の3点セットを意識しましょう。' };
    },
  },
  {
    id: 'length',
    label: '長さは適切か',
    description: '面接回答として適切な長さ（100-300文字程度）か',
    weight: 0.15,
    checkFn: (answer: string) => {
      const len = answer.length;
      if (len < 30) {
        return { score: 20, comment: '短すぎます。面接では60秒で150-250文字程度が目安です。' };
      }
      if (len < 80) {
        return { score: 50, comment: 'やや短いです。もう少し具体例を加えましょう。' };
      }
      if (len > 400) {
        return { score: 50, comment: 'やや長いです。要点を絞って簡潔にまとめましょう。' };
      }
      return { score: 85, comment: '適切な長さです。' };
    },
  },
];
