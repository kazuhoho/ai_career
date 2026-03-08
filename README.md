# AI面接リハーサル

AI面接リハーサルは、転職・面接不安を持つユーザー向けの **匿名利用可能な面接練習MVP** です。

このプロダクトの目的は、単なるキャリア診断ではなく、

- 面接でどこで詰まりやすいかを可視化し
- 1問の模擬面接で弱点を体感させ
- フィードバックで改善余地を示し
- 有料商品へ自然につなぐ

という **課金前提の体験設計** を成立させることです。

---

## プロダクトの位置づけ

本リポジトリは **v1 / MVP** を対象としています。

### v1 の目的
- LP → 診断 → 結果 → 模擬面接 → フィードバック → Offer の無料ファネルを完成させる
- 匿名利用で価値検証できる状態にする
- Offer → Checkout → Success までの導線を構築する
- 本番公開可能な最低限の法務・問い合わせ・計測を整える

### 解決したいペイン
ユーザーは「診断結果」より、次の不安を解消したい。

- 面接で何を話せばいいかわからない
- 自己PRが抽象的で弱い
- 転職理由がうまく言語化できない
- 面接本番で詰まりそうで怖い
- 今の会社を辞めるべきか残るべきか判断できない

本プロダクトは、その中でも **面接で詰まる不安** を主軸に置いています。

---

## v1 の前提

### 重要
v1 は **ログインなしMVP** です。

- 無料利用は匿名
- ログイン機能なし
- メールアドレス取得なしで無料体験可能
- 状態保持は sessionStorage のみ
- `/mypage` は v1 対象外
- 有料購入時にのみメールアドレス取得前提
- 購入確認は Stripe Webhook ベース

### v1 でやらないこと
- 本格的な会員機能
- マイページ
- 継続課金
- 求人API連携
- リアルタイム音声会話
- 音声入力本実装
- 管理画面の作り込み
- 高度な推薦アルゴリズム

---

## 想定ユーザー

### 主なターゲット
- 20代後半〜30代後半
- 転職活動中、または転職を迷っている会社員
- 面接や自己PRに不安がある人
- 副業やキャリアの方向性も少し気になっている人

### 温度感
- 近いうちに面接がある / 書類選考中
- 自己分析より「実践的な答え方」がほしい
- 診断だけではなく、実際の改善につながる体験を求めている

---

## UX / マーケティング上の重要前提

このプロダクトは、機能の多さではなく **ファネルの強さ** が重要です。

### 現在の勝ち筋
**診断 → つまずき可視化 → 1問面接体験 → フィードバック → 有料導線**

### 売るもの
「詳しいレポート」ではなく、以下を売る。

- 面接で詰まらないためのAI面接リハーサル
- 自己PR・志望動機の改善
- 面接直前の集中練習

### 実装時の前提
常に以下をチェックすること。

1. LP で面接不安に刺さるか
2. 無料結果で「自分ごと化」できるか
3. 面接体験で弱点を体感できるか
4. フィードバック後に「もっと練習したい」と思えるか
5. Offer が「商品一覧」ではなく「自分に必要な提案」になっているか

---

## 技術方針

- Next.js App Router
- TypeScript strict mode
- Tailwind CSS v4
- ESLint
- Prisma（DB接続は段階導入）
- serviceRegistry による mock / production 切り替え

### 推奨環境
- Node.js v20 LTS
- npm
- Next.js v16 系

### サポート対象ブラウザ
Tailwind CSS v4 前提のため、モダンブラウザを対象とする。
古い Safari / 古い Chromium 系ブラウザの完全対応は v1 では対象外。

---

## 環境変数
`.env.example` を参照

主な値:
- `NEXT_PUBLIC_SERVICE_MODE`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `OPENAI_API_KEY`
- `DATABASE_URL`
- `NEXT_PUBLIC_GA_MEASUREMENT_ID`
- `SENDGRID_API_KEY`

---

## ディレクトリ方針

```text
/app
  /page.tsx
  /diagnostic/page.tsx
  /result/page.tsx
  /interview/page.tsx
  /feedback/page.tsx
  /offer/page.tsx
  /checkout/page.tsx
  /success/page.tsx
  /legal
    /tokushoho/page.tsx
    /privacy/page.tsx
    /terms/page.tsx
  /contact/page.tsx
  /api
    /evaluate/route.ts
    /checkout/route.ts
    /webhooks/stripe/route.ts
/components
  /lp
  /diagnostic
  /result
  /interview
  /feedback
  /offer
  /common
/data
/lib
/services
/types
/prisma
```

---

## MVPファネル

### 無料ファネル
1. `/` LP
2. `/diagnostic` 診断12問
3. `/result` タイプ結果 + つまずきポイント
4. `/interview` 無料1問模擬面接
5. `/feedback` 簡易フィードバック
6. `/offer` 有料提案

### 課金導線
1. `/checkout?product=...`
2. `/success?session_id=...`

### 法務・信頼
- `/legal/tokushoho`
- `/legal/privacy`
- `/legal/terms`
- `/contact`

---

## 実装ルール

### 1. 無料ファネル優先
決済や周辺機能より前に、LP → Offer までを強くする。

### 2. モックと本番を分離
コンポーネントから直接 mock を呼ばない。
必ず serviceRegistry 経由にする。

### 3. sessionStorage 前提
v1 は sessionStorage ベースで状態を持つ。
破損時は安全に初期化してトップへ戻す。

### 4. success = 購入確定ではない
購入確定は Stripe Webhook ベース。
`/success` は確認中ステータスを表示する。

### 5. Offer は推奨型
商品一覧を均等に並べず、「今のあなたにはこれが最優先」と理由付きで出す。

### 6. 文言改善は重要タスク
このプロダクトは UX / コピー / マーケの改善で大きく変わる。
実装時も「売れるか」を前提に調整すること。

---

## イベント計測

### 最低限維持するイベント
- `page_view`
- `lp_cta_click`
- `diagnostic_start`
- `diagnostic_answer`
- `diagnostic_complete`
- `free_result_view`
- `mock_interview_start`
- `mock_interview_submit`
- `mock_interview_feedback_view`
- `offer_view`
- `paid_cta_click`
- `checkout_start`
- `purchase_pending`
- `purchase_confirmed`
- `contact_submit`

### 推奨パラメータ
- `funnel_version`
- `copy_variant`
- `timer_mode`
- `result_type`

---

## 受け入れ条件

1. LPから診断開始できる
2. 診断12問を完了できる
3. 結果ページでタイプとつまずきポイントが見える
4. 無料模擬面接に進める
5. 制限時間付きで回答できる
6. フィードバックが返る
7. Offer が表示される
8. Checkout 導線が成立する
9. Success は確認中ステータスを持つ
10. 法務ページと問い合わせ導線がある
11. sessionStorage 復元 or リダイレクトが成立する
12. `npm run typecheck` / `npm run lint` / `npm run build` が通る

---

## 優先順位

### 最優先
- 無料ファネルの完成
- Offer の推奨ロジック
- Checkout / Success の構造
- 法務 / 問い合わせ
- エラーハンドリング

### 次点
- AIフィードバック精度向上
- CTA文言改善
- LPコピー改善
- Offerコピー改善
- SEO / OGP

### 後回し
- 認証
- マイページ
- 音声本実装
- 継続課金
- 求人連携

---

## 開発運用

### ブランチ方針
- `main`: 本番
- `develop`: 統合確認
- `feature/*`: 個別実装

### CI
最低限、以下を通すこと。
- `npm run typecheck`
- `npm run lint`
- `npm run build`

### Codex / ClaudeCode への前提
- まずコードを読む
- 既存の責務分離を壊さない
- モックと本番境界を守る
- UXとマーケ改善前提で、導線の強さを落とさない
- ログイン前提の設計に勝手に戻さない
- v1 スコープ外の機能を勝手に膨らませない

---

## 今後の改善領域

### プロダクト改善
- 面接質問の精度
- フィードバックの説得力
- Offer の刺さり方
- 失敗しやすいポイントの言語化

### マーケティング改善
- LPコピーABテスト
- 結果ページの CTA 最適化
- Offer のパーソナライズ強化
- SNS 導線の整備

### 将来拡張
- 購入時メール連携
- Magic Link 認証
- 購入履歴
- 面接履歴蓄積
- 音声入力
- 音声読み上げ
- リアルタイム深掘り質問

---

## リポジトリを読む人へ

このプロダクトは「キャリア診断アプリ」ではありません。

本質は、**面接不安を可視化し、弱点を体感させ、改善行動へつなぐための有料導線付き体験設計** にあります。

実装は必ず、この前提を守って進めてください。
