# CareerLab - AI面接リハーサル

AIがあなたのキャリアタイプを診断し、面接の弱点を可視化。無料の模擬面接1問で改善ポイントまでわかります。

## ファネルフロー

```
/ (LP)
  → /diagnostic (12問のキャリア診断)
    → /result (タイプ判定 + スコア + つまずきポイント)
      → /interview (模擬面接1問 / 60秒タイマー)
        → /feedback (AI評価 + 改善版回答)
          → /offer (弱点に応じた商品推薦)
            → /checkout?product=<slug> (購入確認)
              → /success?session_id=...&product=<slug> (購入完了)
```

### その他ページ
- `/contact` — お問い合わせフォーム
- `/legal/privacy` — プライバシーポリシー
- `/legal/terms` — 利用規約
- `/legal/tokushoho` — 特定商取引法に基づく表記

## セットアップ

```bash
npm install
npm run dev
```

開発サーバーが http://localhost:3000 で起動します。

### ビルド

```bash
npm run build
npm run start
```

### 型チェック / lint

```bash
npm run typecheck
npm run lint
```

## 技術スタック

- Next.js 16 (App Router)
- React 19
- TypeScript 5
- Tailwind CSS 4

## アーキテクチャ

### サービスレジストリ

`services/registry.ts` で環境変数 `NEXT_PUBLIC_SERVICE_MODE` に応じて Mock / Production サービスを切り替えます。

| サービス | Mock | Production |
|---|---|---|
| AI評価 | ルーブリック評価 | API (`/api/evaluate`) |
| 決済 | 即座にリダイレクト | Stripe Checkout (未実装) |
| メール | console.log | SendGrid等 (未実装) |
| 音声 | Web Speech API | v1では常にMock |
| 分析 | console.log | GA4 (`gtag`) |

### 状態管理

`sessionStorage` ベースの状態管理。`AppStateProvider` (React Context) でラップ。

- リロード時に `sessionStorage` から復元
- 前提状態がないページは `/` へリダイレクト
- 破損データは自動クリア

### 計測イベント

| イベント | 発火ページ |
|---|---|
| `page_view` | `/` |
| `lp_cta_click` | `/` |
| `diagnostic_start` | `/diagnostic` |
| `diagnostic_answer` | `/diagnostic` (各問) |
| `diagnostic_complete` | `/diagnostic` (最終問) |
| `free_result_view` | `/result` |
| `mock_interview_start` | `/interview` |
| `mock_interview_submit` | `/interview` |
| `mock_interview_feedback_view` | `/feedback` |
| `offer_view` | `/offer` |
| `paid_cta_click` | `/feedback` |
| `checkout_start` | `/offer`, `/checkout` |
| `purchase_pending` | `/success` |
| `purchase_confirmed` | `/success` |
| `contact_submit` | `/contact` |

全イベントに `funnel_version`, `copy_variant` を付与。該当する場合は `result_type`, `timer_mode` も付与。

---

## v1 の制約（未実装一覧）

以下は v1 では**未対応**です。

| 機能 | 状態 | 備考 |
|---|---|---|
| 認証・ログイン | 未実装 | 匿名MVPのため不要 |
| マイページ | 未実装 | ログイン前提のため |
| 購入履歴の個人紐付け | 未実装 | DB・認証が前提 |
| 音声入力の本実装 | Mock | Web Speech API のフォールバックのみ |
| 継続課金 | 未対応 | 7日プランは買い切り扱い |
| 求人連携 | 未対応 | v2以降で検討 |
| メール送信 | Mock | console.log のみ。SendGrid等は未接続 |
| Stripe決済 | Mock | `/api/checkout` は 501 を返す。本番Stripe連携は未実装 |
| AI評価API | Mock | ローカルルーブリック評価。外部AI API未接続 |
| 法務ページの事業者情報 | プレースホルダー | 【事業者名を記入】等の仮テキスト |

### 購入フロー（v1）

1. `/offer` で弱点に応じた商品を推薦順に表示
2. CTA → `/checkout?product=<slug>` で購入確認
3. Mock決済 → `/success` で「確認中」→ 自動確認
4. Production: Webhook確認前提で「お支払いを確認中」を表示（ポーリング未実装）

### メール通知の将来設計

- `Order` インターフェースに `email` フィールドあり (`types/payment.ts`)
- Email は Stripe Checkout フォームから取得予定
- Webhook で order 確定後に `EmailService.sendPurchaseConfirmation` を呼ぶ想定
- `/success` ページでは「メールでご案内をお送りします」のテキストを表示
