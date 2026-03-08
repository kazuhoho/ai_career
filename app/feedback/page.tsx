"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Nav from "@/components/common/Nav";
import Button from "@/components/common/Button";
import Label from "@/components/common/Label";
import Divider from "@/components/common/Divider";
import Footer from "@/components/common/Footer";
import { useAppState } from "@/components/common/AppStateProvider";
import { getAnalyticsService } from "@/services/registry";

function scoreColor(score: number): string {
  if (score >= 75) return "#2d6a4f";
  if (score >= 50) return "#8b6914";
  return "#c4573a";
}

export default function FeedbackPage() {
  const { state, reset, isLoaded } = useAppState();
  const router = useRouter();
  const analytics = getAnalyticsService();

  // Guard
  useEffect(() => {
    if (!isLoaded) return;
    if (!state.feedback || !state.typeResult) {
      router.replace("/");
    }
  }, [isLoaded, state.feedback, state.typeResult, router]);

  // Track on mount
  useEffect(() => {
    if (!state.feedback) return;
    analytics.track("mock_interview_feedback_view", {
      score: state.feedback.overallScore,
      result_type: state.typeResult?.primaryType,
      timer_mode: "60s",
      funnel_version: "v1",
      copy_variant: "default",
    });
  }, [analytics, state.feedback]);

  if (!isLoaded || !state.feedback || !state.typeResult) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-lm text-sm">読み込み中...</div>
      </div>
    );
  }

  const feedback = state.feedback;
  const color = scoreColor(feedback.overallScore);

  const handleOfferClick = () => {
    analytics.track("paid_cta_click", {
      result_type: state.typeResult?.primaryType,
      funnel_version: "v1",
      copy_variant: "default",
    });
    router.push("/offer");
  };

  const handleRetry = () => {
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
        {/* Score Circle */}
        <section className="max-w-[820px] mx-auto px-8 pt-16 pb-12 flex flex-col items-center">
          <Label>Interview Score</Label>
          <div
            className="w-[120px] h-[120px] rounded-full flex items-center justify-center mb-6"
            style={{ border: `4px solid ${color}` }}
          >
            <span
              className="font-display text-[48px] font-bold leading-none"
              style={{ color }}
            >
              {feedback.overallScore}
            </span>
          </div>
          <p className="text-sm text-mu leading-relaxed text-center max-w-lg">
            {feedback.overallComment}
          </p>
        </section>

        <Divider />

        {/* Criterion Breakdown */}
        <section className="max-w-[820px] mx-auto px-8 py-12">
          <Label>Evaluation Criteria</Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {feedback.criterionResults.map((criterion, i) => {
              const cColor = scoreColor(criterion.score);
              return (
                <div
                  key={i}
                  className="bg-warm p-5 flex flex-col gap-2"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{criterion.label}</span>
                    <span
                      className="font-display text-lg font-bold"
                      style={{ color: cColor }}
                    >
                      {criterion.score}
                    </span>
                  </div>
                  <div className="h-[3px] bg-ln rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700 ease-out"
                      style={{
                        width: `${criterion.score}%`,
                        backgroundColor: cColor,
                      }}
                    />
                  </div>
                  <p className="text-xs text-lm leading-relaxed mt-1">
                    {criterion.comment}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        <Divider />

        {/* Good/Bad Points */}
        <section className="max-w-[820px] mx-auto px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Good Points */}
            <div>
              <Label>Good Points</Label>
              <h3 className="font-display text-lg font-bold mb-4">
                良かった点
              </h3>
              <ul className="flex flex-col gap-3">
                {feedback.goodPoints.map((point, i) => (
                  <li
                    key={i}
                    className="text-sm text-mu leading-relaxed pl-4 border-l-2"
                    style={{ borderColor: "#2d6a4f" }}
                  >
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            {/* Improvement Points */}
            <div>
              <Label>Improvement</Label>
              <h3 className="font-display text-lg font-bold mb-4">
                改善ポイント
              </h3>
              <ul className="flex flex-col gap-3">
                {feedback.improvementPoints.map((point, i) => (
                  <li
                    key={i}
                    className="text-sm text-mu leading-relaxed pl-4 border-l-2"
                    style={{ borderColor: "#c4573a" }}
                  >
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <Divider />

        {/* Improved Answer Example */}
        <section className="max-w-[820px] mx-auto px-8 py-12">
          <Label>Improved Answer</Label>
          <h3 className="font-display text-lg font-bold mb-4">
            改善版の回答例
          </h3>
          <div className="bg-warm p-6">
            <p className="text-sm text-mu leading-relaxed whitespace-pre-line">
              {feedback.improvedAnswer}
            </p>
          </div>
        </section>

        <Divider />

        {/* Next Step CTA */}
        <section className="bg-ch text-white">
          <div className="max-w-[820px] mx-auto px-8 py-16 text-center">
            <Label>
              <span className="text-white/50">Next Step</span>
            </Label>
            <h3 className="font-display text-2xl md:text-3xl font-bold mb-4">
              面接で詰まらないために、もっと練習しませんか？
            </h3>
            <p className="text-sm text-white/70 leading-relaxed mb-8 max-w-md mx-auto">
              あなたの弱点に特化した練習メニューで、面接力を確実に向上させましょう。
            </p>
            <Button
              onClick={handleOfferClick}
              className="bg-white !text-ch hover:bg-warm"
            >
              有料プランを見る
            </Button>
          </div>
        </section>

        {/* Bottom Actions */}
        <section className="max-w-[820px] mx-auto px-8 py-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button variant="ghost" onClick={handleRetry}>
            もう一度回答する
          </Button>
          <Button variant="ghost" onClick={handleRestart}>
            最初からやり直す
          </Button>
        </section>
      </main>

      <Footer />
    </div>
  );
}
