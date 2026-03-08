"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Nav from "@/components/common/Nav";
import Button from "@/components/common/Button";
import Divider from "@/components/common/Divider";
import Footer from "@/components/common/Footer";
import { getAnalyticsService } from "@/services/registry";

const PAIN_POINTS = [
  "面接で何を話せばいいか分からない",
  "自己PRが弱いと感じている",
  "転職したいが踏み出せない",
  "面接で頭が真っ白になったことがある",
];

const BENEFITS = [
  { title: "キャリアタイプ診断", desc: "6つの指標から、あなたの強みと傾向を分析" },
  { title: "面接の弱点分析", desc: "つまずきやすいポイントを事前に把握" },
  { title: "無料模擬面接1問", desc: "AIがリアルタイムで面接をシミュレーション" },
  { title: "即座にフィードバック", desc: "回答直後にスコアと改善点を表示" },
];

export default function LPPage() {
  const [visible, setVisible] = useState(false);
  const router = useRouter();
  const analytics = getAnalyticsService();

  useEffect(() => {
    analytics.track("page_view", {
      path: "/",
      funnel_version: "v1",
      copy_variant: "default",
    });
    setVisible(true);
  }, [analytics]);

  const handleCTA = () => {
    analytics.track("lp_cta_click", {
      funnel_version: "v1",
      copy_variant: "default",
    });
    router.push("/diagnostic");
  };

  return (
    <div
      className={`min-h-screen bg-cream text-ch transition-opacity duration-700 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Nav */}
      <Nav
        extra={
          <span className="text-xs tracking-widest text-lm">
            AI Interview Lab
          </span>
        }
      />

      {/* Hero */}
      <section className="max-w-[820px] mx-auto px-8 pt-24 pb-20 text-center">
        <h1 className="font-display text-3xl md:text-5xl leading-tight font-bold mb-6">
          面接で詰まる前に、
          <br />
          自分の弱点を知る。
        </h1>
        <p className="text-sm text-mu leading-relaxed mb-10 max-w-md mx-auto">
          AIがあなたのキャリアタイプを診断し、
          <br className="hidden sm:block" />
          面接でつまずくポイントを事前に特定します。
        </p>
        <Button onClick={handleCTA} className="mb-4">
          無料で診断する
        </Button>
        <p className="text-xs text-lm">メールアドレス不要・約5分で完了</p>
      </section>

      {/* Divider */}
      <Divider />

      {/* Pain Points */}
      <section className="max-w-[820px] mx-auto px-8 py-20">
        <p className="text-xs tracking-[0.2em] uppercase text-lm mb-10 text-center">
          Pain Points
        </p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {PAIN_POINTS.map((point, i) => (
            <li
              key={i}
              className="border border-ln p-6 text-sm text-mu leading-relaxed"
            >
              {point}
            </li>
          ))}
        </ul>
      </section>

      {/* What You'll Get — dark section */}
      <section className="bg-ch text-cream">
        <div className="max-w-[820px] mx-auto px-8 py-20">
          <p className="text-xs tracking-[0.2em] uppercase text-cream/50 mb-10 text-center">
            What You&apos;ll Get
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {BENEFITS.map((item, i) => (
              <div key={i}>
                <p className="font-display text-lg font-bold mb-2">
                  {item.title}
                </p>
                <p className="text-sm text-cream/60 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="max-w-[820px] mx-auto px-8 py-24 text-center">
        <h2 className="font-display text-2xl md:text-3xl font-bold mb-6">
          まずは無料で、自分を知ることから。
        </h2>
        <Button onClick={handleCTA} className="mb-4">
          無料で診断する
        </Button>
        <p className="text-xs text-lm">メールアドレス不要・約5分で完了</p>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
