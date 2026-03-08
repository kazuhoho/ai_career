"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Nav from "@/components/common/Nav";
import Label from "@/components/common/Label";
import Footer from "@/components/common/Footer";
import { getProductBySlug } from "@/data/products";
import { validateSessionId, validateProductSlug } from "@/lib/validation";
import { getAnalyticsService } from "@/services/registry";

// v1: メール通知は未実装
// 将来実装時: Webhook で order 確定後、EmailService.sendPurchaseConfirmation(email, slug) を呼ぶ
// success ページでは「メールでご案内をお送りします」のテキストのみ表示

type Status = "pending" | "paid" | "fulfilled";

function SuccessContent() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<Status>("pending");
  const analytics = getAnalyticsService();

  const sessionId = validateSessionId(searchParams.get("session_id"));
  const slug = validateProductSlug(searchParams.get("product"));
  const product = slug ? getProductBySlug(slug) : undefined;

  const isMock = process.env.NEXT_PUBLIC_SERVICE_MODE !== "production";

  // Track purchase_pending on mount
  useEffect(() => {
    if (!slug) return;
    analytics.track("purchase_pending", {
      product: slug,
      funnel_version: "v1",
      copy_variant: "default",
    });
  }, [analytics, slug]);

  useEffect(() => {
    if (isMock) {
      // Mock mode: simulate payment confirmation after 2s
      const timer = setTimeout(() => {
        setStatus("paid");
        setTimeout(() => setStatus("fulfilled"), 500);
      }, 2000);
      return () => clearTimeout(timer);
    }
    // Production: remain in pending state until Webhook confirms payment.
    // Future: poll GET /api/orders/:sessionId for status updates,
    // triggered by Stripe webhook → order status update in DB.
    // Do NOT set fulfilled here without server-side confirmation.
  }, [isMock]);

  // Track purchase_confirmed when fulfilled
  useEffect(() => {
    if (status === "fulfilled" && slug) {
      analytics.track("purchase_confirmed", {
        product: slug,
        funnel_version: "v1",
        copy_variant: "default",
      });
    }
  }, [status, slug, analytics]);

  return (
    <div className="min-h-screen bg-cream text-ch flex flex-col">
      <Nav />

      <main className="flex-1">
        <section className="max-w-[580px] mx-auto px-8 pt-16 pb-12 text-center">
          <Label>Purchase</Label>

          {status === "pending" && (
            <>
              <div className="w-12 h-12 border-4 border-ln border-t-ch rounded-full animate-spin mx-auto mb-6" />
              <h1 className="font-display text-2xl md:text-3xl font-bold mb-4">
                お支払いを確認中です...
              </h1>
              <p className="text-sm text-mu mb-2">しばらくお待ちください</p>
              {sessionId && (
                <p className="text-xs text-lm">
                  注文番号: {sessionId.slice(0, 16)}...
                </p>
              )}
            </>
          )}

          {status === "paid" && (
            <>
              <div className="w-12 h-12 bg-ac/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-ac text-2xl">&#x2713;</span>
              </div>
              <h1 className="font-display text-2xl md:text-3xl font-bold mb-4">
                お支払いが確認されました
              </h1>
            </>
          )}

          {status === "fulfilled" && (
            <>
              <div className="w-16 h-16 bg-ac/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-ac text-3xl">&#x2713;</span>
              </div>
              <h1 className="font-display text-2xl md:text-3xl font-bold mb-4">
                ご購入ありがとうございます！
              </h1>
              {product && (
                <p className="text-sm text-mu mb-2">{product.name}</p>
              )}
              <p className="text-sm text-mu mb-8">
                メールでご案内をお送りします
              </p>
              <Link
                href="/"
                className="text-sm text-lm hover:text-ch border-b border-ln hover:border-ch transition-colors pb-0.5"
              >
                トップに戻る
              </Link>
            </>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-cream flex items-center justify-center">
          <div className="text-lm text-sm">読み込み中...</div>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
