"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Nav from "@/components/common/Nav";
import Button from "@/components/common/Button";
import Label from "@/components/common/Label";
import Footer from "@/components/common/Footer";
import { useAppState } from "@/components/common/AppStateProvider";
import { getAnalyticsService } from "@/services/registry";
import { getRecommendedProducts } from "@/lib/offerLogic";

export default function OfferPage() {
  const { state, reset, isLoaded } = useAppState();
  const router = useRouter();
  const analytics = getAnalyticsService();

  // Guard
  useEffect(() => {
    if (!isLoaded) return;
    if (!state.typeResult) {
      router.replace("/");
    }
  }, [isLoaded, state.typeResult, router]);

  // Track on mount
  useEffect(() => {
    if (!state.typeResult) return;
    analytics.track("page_view", {
      path: "/offer",
      funnel_version: "v1",
    });
  }, [analytics, state.typeResult]);

  if (!isLoaded || !state.typeResult) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-lm text-sm">読み込み中...</div>
      </div>
    );
  }

  const products = getRecommendedProducts(
    state.typeResult.primaryType,
    state.scores,
    state.feedback,
  );

  const topProduct = products.find((p) => p.rank === 1);

  const handleCta = (slug: string) => {
    analytics.track("checkout_start", {
      product: slug,
      funnel_version: "v1",
    });
    router.push(`/checkout?product=${slug}`);
  };

  const handleBackToTop = () => {
    reset();
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-cream text-ch flex flex-col">
      <Nav />

      <main className="flex-1">
        {/* Header */}
        <section className="max-w-[820px] mx-auto px-8 pt-16 pb-12 text-center">
          <Label>Plans</Label>
          <h1 className="font-display text-3xl md:text-4xl font-bold">
            面接の不安を、<span className="italic">実力に変える。</span>
          </h1>
        </section>

        {/* Top Recommendation Banner */}
        {topProduct && (
          <section className="max-w-[820px] mx-auto px-8 pb-10">
            <div className="bg-warm border border-ln p-6 text-center">
              <p className="text-xs tracking-[0.2em] uppercase text-ac font-bold mb-2">
                今のあなたにはこれが最優先
              </p>
              <p className="text-sm text-mu leading-relaxed">
                {topProduct.reason}
              </p>
            </div>
          </section>
        )}

        {/* Product Cards */}
        <section className="max-w-[960px] mx-auto px-8 pb-16">
          <div className="grid gap-6" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
            {products.map((product) => {
              const isTop = product.rank === 1;
              return (
                <div
                  key={product.slug}
                  className={`bg-white p-6 flex flex-col relative ${
                    isTop ? "border-2 border-ac" : "border border-ln"
                  }`}
                >
                  {isTop && (
                    <div className="absolute -top-3 left-6 bg-ac text-white text-[10px] tracking-[0.15em] uppercase font-bold px-3 py-1">
                      RECOMMENDED
                    </div>
                  )}

                  <h3 className="font-display text-lg font-bold mb-1 mt-1">
                    {product.name}
                  </h3>
                  <p className="text-xs text-lm mb-4">{product.tagline}</p>

                  <div className="mb-4">
                    <span className="font-display text-[36px] font-bold leading-none">
                      &yen;{product.price.toLocaleString()}
                    </span>
                  </div>

                  <ul className="flex flex-col gap-2 mb-6 flex-1">
                    {product.features.map((feature, i) => (
                      <li
                        key={i}
                        className="text-sm text-mu leading-relaxed flex gap-2"
                      >
                        <span className="text-lm shrink-0">&#x2713;</span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <p className="text-xs text-lm leading-relaxed mb-4">
                    {product.reason}
                  </p>

                  <Button
                    onClick={() => handleCta(product.slug)}
                    className={`w-full text-center ${isTop ? "" : ""}`}
                  >
                    {product.ctaText}
                  </Button>
                </div>
              );
            })}
          </div>
        </section>

        {/* Back to Top */}
        <section className="max-w-[820px] mx-auto px-8 py-12 text-center">
          <Button variant="ghost" onClick={handleBackToTop}>
            トップに戻る
          </Button>
        </section>
      </main>

      <Footer />
    </div>
  );
}
