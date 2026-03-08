# Implementation Plan

## 実装原則
無料ファネルを先に完成させ、その後に決済と法務を積む。

順番:
1. LP
2. 診断
3. 結果
4. 面接
5. フィードバック
6. Offer
7. Checkout
8. Success
9. 法務
10. 問い合わせ
11. QA

## 重要な制約
- v1 は匿名利用
- sessionStorage 前提
- mypage なし
- success は Webhook 確認前提
- Offer は推奨型

## 公開判定
- typecheck / lint / build が通る
- 無料ファネルが通る
- Checkout 導線が通る
- 法務 / 問い合わせあり
- 主要イベント計測あり
