// ==============================================
// 商品マスタ — 面接リハーサル軸
// ==============================================

export interface ProductInfo {
  slug: string;
  name: string;
  type: 'front' | 'upsell' | 'subscription';
  price: number;
  tagline: string;
  features: string[];
  ctaText: string;
}

export const PRODUCTS: ProductInfo[] = [
  {
    slug: 'interview-rehearsal',
    name: 'AI面接リハーサル',
    type: 'front',
    price: 3980,
    tagline: '面接で詰まらないための練習',
    features: ['想定質問20問のAI模擬面接', '回答ごとの詳細フィードバック', '改善版回答の自動生成', 'タイプ別の弱点克服メニュー', '制限時間トレーニング', '回数無制限の練習'],
    ctaText: 'あなた専用の面接練習を始める',
  },
  {
    slug: 'pr-improvement',
    name: '自己PR・志望動機 改善パック',
    type: 'upsell',
    price: 4980,
    tagline: '自己PRと回答を改善する',
    features: ['自己PR 3パターン生成', '志望動機 3パターン生成', '面接官視点のレビュー', '伝え方の方向性アドバイス'],
    ctaText: '自己PRと回答を改善する',
  },
  {
    slug: 'intensive-7day',
    name: '面接直前 7日集中プラン',
    type: 'subscription',
    price: 2980,
    tagline: '面接直前の集中対策',
    features: ['毎日3問の模擬面接', '日替わりフィードバック', '弱点集中トレーニング', '最終日に総合評価レポート'],
    ctaText: '7日間の集中練習を始める',
  },
];

export function getProductBySlug(slug: string): ProductInfo | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}
