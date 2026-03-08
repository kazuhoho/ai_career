"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Nav from "@/components/common/Nav";
import Button from "@/components/common/Button";
import Label from "@/components/common/Label";
import Divider from "@/components/common/Divider";
import Footer from "@/components/common/Footer";
import { useAppState } from "@/components/common/AppStateProvider";
import { TYPES, CATEGORY_LABELS } from "@/data/typeProfiles";
import { getAnalyticsService } from "@/services/registry";
import type { ScoreCategory } from "@/types/diagnostic";

const SCORE_CATEGORIES: ScoreCategory[] = [
  "action",
  "stability",
  "expression",
  "expertise",
  "independence",
  "stress",
];

export default function ResultPage() {
  const { state, reset, isLoaded } = useAppState();
  const router = useRouter();
  const analytics = getAnalyticsService();

  // Phased reveal: 3 phases
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (!isLoaded) return;
    if (!state.typeResult || !state.scores) {
      router.replace("/");
    }
  }, [isLoaded, state.typeResult, state.scores, router]);

  // Track analytics on mount
  useEffect(() => {
    if (!state.typeResult) return;
    analytics.track("free_result_view", {
      result_type: state.typeResult.primaryType,
      funnel_version: "v1",
      copy_variant: "default",
    });
  }, [analytics, state.typeResult]);

  // Phased reveal timers
  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 200);
    const t2 = setTimeout(() => setPhase(2), 800);
    const t3 = setTimeout(() => setPhase(3), 1400);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  if (!isLoaded || !state.typeResult || !state.scores) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-lm text-sm">読み込み中...</div>
      </div>
    );
  }

  const profile = TYPES[state.typeResult.primaryType];
  const scores = state.scores;
  const maxScore = Math.max(...Object.values(scores), 1);

  const handleMockStart = () => {
    analytics.track("mock_interview_start", { funnel_version: "v1" });
    router.push("/interview");
  };

  const handleRestart = () => {
    reset();
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-cream text-ch flex flex-col">
      <Nav />

      <main className="flex-1">
        {/* Type Header */}
        <section
          className={`max-w-[820px] mx-auto px-8 pt-16 pb-12 transition-all duration-700 ease-out ${
            phase >= 1
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
        >
          <Label>Your Career Type</Label>
          <h1
            className="font-display text-4xl md:text-5xl font-bold mb-3"
            style={{ color: profile.accent }}
          >
            {profile.label}
          </h1>
          <p className="text-sm text-lm mb-2">{profile.kana}</p>
          <p className="text-base md:text-lg text-mu leading-relaxed">
            {profile.tagline}
          </p>
        </section>

        <Divider />

        {/* Score Bars */}
        <section
          className={`max-w-[820px] mx-auto px-8 py-12 transition-all duration-700 ease-out ${
            phase >= 2
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
        >
          <Label>Score Breakdown</Label>
          <div className="flex flex-col gap-5">
            {SCORE_CATEGORIES.map((cat) => {
              const score = scores[cat];
              const pct = Math.round((score / maxScore) * 100);
              return (
                <div key={cat}>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-sm font-medium">
                      {CATEGORY_LABELS[cat]}
                    </span>
                    <span className="text-sm text-lm tabular-nums">
                      {score}
                    </span>
                  </div>
                  <div className="h-2 bg-ln rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-1000 ease-out"
                      style={{
                        width: phase >= 2 ? `${pct}%` : "0%",
                        backgroundColor: profile.accent,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <Divider />

        {/* Strengths & Cautions */}
        <section
          className={`max-w-[820px] mx-auto px-8 py-12 transition-all duration-700 ease-out ${
            phase >= 3
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Strengths */}
            <div>
              <Label>Strengths</Label>
              <h3 className="font-display text-lg font-bold mb-4">
                あなたの強み
              </h3>
              <ol className="flex flex-col gap-3">
                {profile.strengths.map((s, i) => (
                  <li key={i} className="flex gap-3 text-sm text-mu leading-relaxed">
                    <span
                      className="font-display font-bold text-base shrink-0"
                      style={{ color: profile.accent }}
                    >
                      {i + 1}.
                    </span>
                    {s}
                  </li>
                ))}
              </ol>
            </div>

            {/* Cautions */}
            <div>
              <Label>Cautions</Label>
              <h3 className="font-display text-lg font-bold mb-4">
                注意したいポイント
              </h3>
              <ul className="flex flex-col gap-3">
                {profile.cautions.map((c, i) => (
                  <li
                    key={i}
                    className="text-sm text-mu leading-relaxed pl-4 border-l-2 border-ln"
                  >
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <Divider />

        {/* Interview Stumbling Points */}
        <section
          className={`max-w-[820px] mx-auto px-8 py-12 transition-all duration-700 ease-out ${
            phase >= 3
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
        >
          <Label>Interview Stumbling Points</Label>
          <h3 className="font-display text-lg font-bold mb-6">
            面接でつまずきやすいポイント
          </h3>
          <div className="flex flex-col gap-5">
            {profile.stumble.map((item, i) => (
              <div
                key={i}
                className="border border-ln p-6 bg-white/50"
              >
                <p
                  className="font-bold text-sm mb-2"
                  style={{ color: profile.accent }}
                >
                  {item.pt}
                </p>
                <p className="text-sm text-mu leading-relaxed mb-2">
                  {item.why}
                </p>
                <p className="text-sm text-lm italic leading-relaxed">
                  {item.ex}
                </p>
              </div>
            ))}
          </div>
        </section>

        <Divider />

        {/* Mock Interview CTA */}
        <section
          className={`bg-ch text-white transition-all duration-700 ease-out ${
            phase >= 3
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
        >
          <div className="max-w-[820px] mx-auto px-8 py-16 text-center">
            <Label>
              <span className="text-white/50">Mock Interview</span>
            </Label>
            <h3 className="font-display text-2xl md:text-3xl font-bold mb-4">
              1問だけ、試してみませんか？
            </h3>
            <p className="text-sm text-white/70 leading-relaxed mb-8 max-w-md mx-auto">
              あなたのタイプに合わせた面接質問に60秒で回答。
              AIがリアルタイムでフィードバックします。
            </p>
            <Button
              onClick={handleMockStart}
              className="bg-white !text-ch hover:bg-warm"
            >
              模擬面接を始める
            </Button>
          </div>
        </section>

        {/* Restart */}
        <section className="max-w-[820px] mx-auto px-8 py-12 text-center">
          <Button variant="ghost" onClick={handleRestart}>
            最初からやり直す
          </Button>
        </section>
      </main>

      <Footer />
    </div>
  );
}
