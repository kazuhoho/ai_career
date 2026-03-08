// ==============================================
// Interview Questions
// Type-specific stumbling points and mock interview questions
// ==============================================

import type { DiagnosticType } from '@/types/diagnostic';
import type {
  InterviewQuestion,
  StumblingPoint,
  TypeInterviewProfile,
} from '@/types/interview';

/** Free trial question (shared across all types) */
export const FREE_QUESTION: InterviewQuestion = {
  id: 'iq_free_01',
  text: 'あなたの強みを教えてください。',
  category: 'strength',
  timeLimit: 60,
  isFree: true,
  hints: [
    '結論から述べましょう',
    '具体的なエピソードを1つ入れましょう',
    '仕事でどう活かせるかに繋げましょう',
  ],
};

/** Paid question set */
export const PAID_QUESTIONS: InterviewQuestion[] = [
  {
    id: 'iq_01',
    text: '自己紹介をお願いします。',
    category: 'self_intro',
    timeLimit: 60,
    isFree: false,
    hints: ['1分以内にまとめましょう', '経歴の要点を3つに絞りましょう'],
  },
  {
    id: 'iq_02',
    text: '転職理由を教えてください。',
    category: 'reason',
    timeLimit: 60,
    isFree: false,
    hints: [
      'ネガティブな理由だけで終わらないようにしましょう',
      '前向きな動機を伝えましょう',
    ],
  },
  {
    id: 'iq_03',
    text: 'なぜこの仕事に興味を持ったのですか？',
    category: 'motivation',
    timeLimit: 60,
    isFree: false,
    hints: [
      '企業研究の成果を見せましょう',
      '自分の強みとの接点を語りましょう',
    ],
  },
  {
    id: 'iq_04',
    text: 'あなたの弱みを教えてください。',
    category: 'weakness',
    timeLimit: 60,
    isFree: false,
    hints: ['正直に認めつつ、改善努力を伝えましょう'],
  },
  {
    id: 'iq_05',
    text: '5年後のキャリアビジョンを教えてください。',
    category: 'future',
    timeLimit: 60,
    isFree: false,
    hints: ['企業の成長と自分の成長を重ねましょう'],
  },
];

/** Interview profiles per diagnostic type */
export const TYPE_INTERVIEW_PROFILES: Record<DiagnosticType, TypeInterviewProfile> = {
  explorer: {
    stumblingPoints: [
      {
        point: '転職理由が散漫になりやすい',
        reason:
          '多くの経験を積んできたため、「なぜ次はここなのか」の軸が見えにくくなる',
        example:
          '「いろいろやってきましたが…」と始めてしまい、面接官に一貫性を疑われる',
      },
      {
        point: '強みの焦点が定まらない',
        reason: '複数の強みがあるため、1つに絞りきれず抽象的になる',
        example: '「適応力があります」だけで終わり、具体的な成果が見えない',
      },
      {
        point: '長期定着への不安を与えやすい',
        reason: '変化を好む性格が「すぐ辞めるのでは」と映ることがある',
        example:
          '過去の転職回数について深掘りされたとき、ポジティブに説明できない',
      },
    ],
    freeQuestionId: 'iq_free_01',
    commonMistakes: [
      '強みを3つ以上並べてしまう',
      '具体例なく「何でもできます」と言う',
      '過去の経験を時系列で全部話す',
    ],
  },
  specialist: {
    stumblingPoints: [
      {
        point: '専門用語を使いすぎる',
        reason:
          '深い知識があるがゆえに、面接官のレベルに合わせた説明ができない',
        example:
          '技術的な説明に終始し、「で、何ができるの？」と聞き返される',
      },
      {
        point: '柔軟性への疑問を持たれやすい',
        reason:
          '専門特化型のため、新しい領域への対応力を問われることがある',
        example: '「専門外のことを頼まれたらどうしますか？」に詰まる',
      },
      {
        point: 'チームでの貢献が見えにくい',
        reason:
          '個人の専門性は高いが、チームへの波及効果を語れないことがある',
        example: '「一人で成果を出した」話ばかりで、協調性が伝わらない',
      },
    ],
    freeQuestionId: 'iq_free_01',
    commonMistakes: [
      '技術の話だけで人柄が見えない',
      '完璧主義をそのまま語ってしまう',
      'チーム貢献を聞かれて沈黙する',
    ],
  },
  builder: {
    stumblingPoints: [
      {
        point: '自己PRが控えめすぎる',
        reason: '謙虚さが裏目に出て、強みを十分にアピールできない',
        example:
          '「普通のことをしてきただけです」と言ってしまい、印象に残らない',
      },
      {
        point: '変化への意欲が伝わりにくい',
        reason: '安定志向が「成長意欲がない」と解釈されることがある',
        example: '「なぜ転職するのか」への回答が消極的に聞こえる',
      },
      {
        point: '具体的な実績の数値化が弱い',
        reason:
          '日々の積み上げ型の仕事は、インパクトのある数字にしにくい',
        example: '「コツコツやってきました」では面接官の記憶に残らない',
      },
    ],
    freeQuestionId: 'iq_free_01',
    commonMistakes: [
      '「特にありません」と答えてしまう',
      '実績を過小評価する',
      '安定を求める理由を正直に言いすぎる',
    ],
  },
  pioneer: {
    stumblingPoints: [
      {
        point: '協調性への疑問を持たれやすい',
        reason: '独立志向が強いため、「チームで働けるか」を問われる',
        example: '「自分で全部やりたい」という印象を与えてしまう',
      },
      {
        point: '組織への適応意欲が見えにくい',
        reason:
          '自由を重視するため、ルールや方針への従順さが疑われる',
        example: '「御社の方針に従います」が嘘くさく聞こえる',
      },
      {
        point: '長期コミットの説得力が弱い',
        reason: '独立志向が「腰掛けでは」と映るリスクがある',
        example: '「将来は独立したい」と正直に言ってしまう',
      },
    ],
    freeQuestionId: 'iq_free_01',
    commonMistakes: [
      '自分の話ばかりで相手のニーズに触れない',
      '組織批判をしてしまう',
      '将来の独立志向を隠せない',
    ],
  },
  influencer: {
    stumblingPoints: [
      {
        point: '話が長くなりがち',
        reason:
          'コミュニケーション力が高いがゆえに、簡潔にまとめる力が不足する',
        example: '1分の質問に3分以上話し続けてしまう',
      },
      {
        point: '実務スキルの具体性が弱い',
        reason:
          '人を動かす力はあるが、自分自身の手を動かした実績を語りにくい',
        example:
          '「リーダーシップがあります」の裏付けとなる具体的な成果が曖昧',
      },
      {
        point: '謙虚さが足りない印象を与えやすい',
        reason:
          '自信を持って話せるため、時に「自慢話」に聞こえてしまう',
        example: '「私がいたから成功した」という語り方になる',
      },
    ],
    freeQuestionId: 'iq_free_01',
    commonMistakes: [
      '質問に対して話が脱線する',
      '自分の功績を誇張する',
      '数字やファクトなく主観だけで語る',
    ],
  },
};
