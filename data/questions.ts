// ==============================================
// Diagnostic Questions
// 12 questions for career type diagnosis
// ==============================================

import type { Question } from '@/types/diagnostic';

export const QUESTIONS: Question[] = [
  {
    id: 'q01',
    text: '新しいプロジェクトに誘われたとき、あなたはどう感じますか？',
    choices: {
      a: 'ワクワクする。すぐにやりたいと思う',
      b: '面白そうだが、まず情報を集めてから判断したい',
      c: '今の仕事に集中したいので、余裕があれば考える',
      d: '正直、今の仕事が安定しているので動きたくない',
    },
    sm: {
      a: { action: 3, independence: 1 },
      b: { expertise: 2, action: 1 },
      c: { stability: 2, expertise: 1 },
      d: { stability: 3 },
    },
  },
  {
    id: 'q02',
    text: '自分の考えや成果を人に伝えることについて、どう思いますか？',
    choices: {
      a: '積極的に発信したい。SNSやブログも好き',
      b: '必要な場面では伝えるが、自分から発信するタイプではない',
      c: '求められれば話すが、自分からはあまり発信しない',
      d: '目立つのは苦手。成果は黙って見せたい',
    },
    sm: {
      a: { expression: 3, independence: 1 },
      b: { expression: 1, action: 1 },
      c: { stability: 1, expertise: 1 },
      d: { expertise: 2, stability: 1 },
    },
  },
  {
    id: 'q03',
    text: '仕事でスキルアップするとしたら、どちらを選びますか？',
    choices: {
      a: '一つの分野を徹底的に極めたい',
      b: '専門性は持ちつつ、隣接領域も広げたい',
      c: 'いろいろな分野を広く浅く経験したい',
      d: 'スキルアップより、人間関係や環境を重視したい',
    },
    sm: {
      a: { expertise: 3 },
      b: { expertise: 2, action: 1 },
      c: { action: 2, expression: 1 },
      d: { stability: 2, stress: 1 },
    },
  },
  {
    id: 'q04',
    text: '「自分で事業をやってみないか」と言われたら？',
    choices: {
      a: '前向きに検討する。いつかやりたいと思っていた',
      b: '副業レベルならやってみたい',
      c: '興味はあるがリスクが怖い',
      d: '組織に属している方が安心する',
    },
    sm: {
      a: { independence: 3, action: 1 },
      b: { independence: 2, action: 1 },
      c: { independence: 1, stability: 1 },
      d: { stability: 3 },
    },
  },
  {
    id: 'q05',
    text: '職場の人間関係でストレスを感じたとき、あなたはどうしますか？',
    choices: {
      a: '直接話し合って解決しようとする',
      b: '信頼できる人に相談する',
      c: '時間が解決すると思って距離を置く',
      d: 'かなりストレスを溜め込んでしまう方だ',
    },
    sm: {
      a: { stress: 3, expression: 1 },
      b: { stress: 2, stability: 1 },
      c: { stability: 1, independence: 1 },
      d: { expertise: 1 },
    },
  },
  {
    id: 'q06',
    text: '仕事で一番大切にしていることは何ですか？',
    choices: {
      a: '成長実感。昨日の自分より進んでいること',
      b: '安定収入。生活基盤がしっかりしていること',
      c: '自由度。自分のやり方で進められること',
      d: '影響力。自分の仕事が誰かの役に立つこと',
    },
    sm: {
      a: { action: 2, expertise: 1 },
      b: { stability: 3 },
      c: { independence: 3 },
      d: { expression: 2, stress: 1 },
    },
  },
  {
    id: 'q07',
    text: '理想の働き方に近いのはどれですか？',
    choices: {
      a: 'フルリモートで、自分のペースで成果を出す',
      b: 'チームで協力しながら、決まった時間に働く',
      c: '多くの人と関わりながら、刺激のある毎日を送る',
      d: '黙々と専門的な作業に没頭する',
    },
    sm: {
      a: { independence: 2, action: 1 },
      b: { stability: 2, stress: 1 },
      c: { expression: 2, action: 1 },
      d: { expertise: 3 },
    },
  },
  {
    id: 'q08',
    text: '転職や大きなキャリア変更について、どう考えていますか？',
    choices: {
      a: '常にアンテナを張っている。良い機会があれば動く',
      b: '今の仕事に不満があるわけではないが、選択肢は持ちたい',
      c: '今の仕事を続けながら、副業で可能性を探りたい',
      d: '大きな変化は望まない。今のキャリアを深めたい',
    },
    sm: {
      a: { action: 3, independence: 1 },
      b: { action: 1, stability: 1 },
      c: { independence: 2, stability: 1 },
      d: { stability: 2, expertise: 1 },
    },
  },
  {
    id: 'q09',
    text: 'チームで仕事をするとき、あなたが自然と担う役割は？',
    choices: {
      a: 'リーダーやまとめ役',
      b: '専門家やアドバイザー',
      c: '調整役やサポーター',
      d: '独立して動く実行者',
    },
    sm: {
      a: { expression: 3, stress: 1 },
      b: { expertise: 2, expression: 1 },
      c: { stability: 2, stress: 1 },
      d: { independence: 2, action: 1 },
    },
  },
  {
    id: 'q10',
    text: '仕事で大きな壁にぶつかったとき、あなたのタイプは？',
    choices: {
      a: 'やり方を変えて別のアプローチを試す',
      b: '徹底的に原因を分析してから動く',
      c: '周りに助けを求めて一緒に乗り越える',
      d: '耐えて待つ。状況が変わるのを信じる',
    },
    sm: {
      a: { action: 2, independence: 1 },
      b: { expertise: 2, action: 1 },
      c: { expression: 1, stress: 2 },
      d: { stability: 2 },
    },
  },
  {
    id: 'q11',
    text: '副業をするとしたら、どんなことをやりたいですか？',
    choices: {
      a: '自分のスキルを活かしたコンサルやアドバイス',
      b: 'ブログ・SNS・動画などの情報発信',
      c: '物販やサービスなど、自分のビジネスを立ち上げたい',
      d: '副業にはあまり興味がない。本業に集中したい',
    },
    sm: {
      a: { expertise: 2, independence: 1 },
      b: { expression: 3 },
      c: { independence: 3, action: 1 },
      d: { stability: 2, expertise: 1 },
    },
  },
  {
    id: 'q12',
    text: '5年後の自分はどうなっていたいですか？',
    choices: {
      a: '新しいことに挑戦し続けて、いくつもの経験を積んでいたい',
      b: '特定の分野で「この人に聞けば間違いない」と言われる存在になりたい',
      c: '安定した収入と生活基盤の上で、余裕を持って暮らしたい',
      d: '自分の名前で仕事をして、自由に働いていたい',
    },
    sm: {
      a: { action: 3, expression: 1 },
      b: { expertise: 3 },
      c: { stability: 3 },
      d: { independence: 3, expression: 1 },
    },
  },
];
