"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Nav from "@/components/common/Nav";
import Button from "@/components/common/Button";
import Label from "@/components/common/Label";
import Footer from "@/components/common/Footer";
import { getProductBySlug } from "@/data/products";
import { validateProductSlug } from "@/lib/validation";
import { getAnalyticsService, getPaymentService } from "@/services/registry";

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const rawSlug = searchParams.get("product");
  const slug = validateProductSlug(rawSlug);

  useEffect(() => {
    if (!slug) {
      router.replace("/offer");
      return;
    }
    getAnalyticsService().track("checkout_start", {
      product: slug,
      funnel_version: "v1",
    });
  }, [slug, router]);

  if (!slug) return null;

  const product = getProductBySlug(slug);
  if (!product) {
    router.replace("/offer");
    return null;
  }

  const handlePurchase = async () => {
    setLoading(true);
    setError(null);
    try {
      const { url } = await getPaymentService().createCheckout(slug);
      router.push(url);
    } catch {
      setError("決済の開始に失敗しました。もう一度お試しください。");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream text-ch flex flex-col">
      <Nav />

      <main className="flex-1">
        <section className="max-w-[580px] mx-auto px-8 pt-16 pb-12">
          <Label>Checkout</Label>
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">
            {product.name}
          </h1>
          <p className="text-sm text-mu mb-8">{product.tagline}</p>

          <div className="bg-white border border-ln p-6 mb-8">
            <div className="mb-6">
              <span className="font-display text-[42px] font-bold leading-none">
                &yen;{product.price.toLocaleString()}
              </span>
              <span className="text-sm text-lm ml-2">(税込)</span>
            </div>

            <ul className="flex flex-col gap-2 mb-6">
              {product.features.map((f, i) => (
                <li
                  key={i}
                  className="text-sm text-mu leading-relaxed flex gap-2"
                >
                  <span className="text-lm shrink-0">&#x2713;</span>
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm p-4 mb-6">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-4">
            <Button
              onClick={handlePurchase}
              disabled={loading}
              className="w-full text-center"
            >
              {loading ? "処理中..." : "購入する"}
            </Button>
            <Button
              variant="ghost"
              onClick={() => router.push("/offer")}
              className="w-full text-center"
            >
              戻る
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-cream flex items-center justify-center">
          <div className="text-lm text-sm">読み込み中...</div>
        </div>
      }
    >
      <CheckoutContent />
    </Suspense>
  );
}
