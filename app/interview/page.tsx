"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Nav from "@/components/common/Nav";
import Button from "@/components/common/Button";
import Label from "@/components/common/Label";
import Footer from "@/components/common/Footer";
import { useAppState } from "@/components/common/AppStateProvider";
import { FREE_QUESTION } from "@/data/interviewQuestions";
import {
  getAnalyticsService,
  getAIService,
  getVoiceService,
} from "@/services/registry";

const TIME_LIMIT = FREE_QUESTION.timeLimit; // 60s
const CIRCLE_RADIUS = 54;
const CIRCLE_CIRCUMFERENCE = 2 * Math.PI * CIRCLE_RADIUS;

export default function InterviewPage() {
  const { state, setFeedback, isLoaded } = useAppState();
  const router = useRouter();
  const analytics = getAnalyticsService();

  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
  const [done, setDone] = useState(false);
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Guard
  useEffect(() => {
    if (!isLoaded) return;
    if (!state.typeResult) {
      router.replace("/");
    }
  }, [isLoaded, state.typeResult, router]);

  // Track page view
  useEffect(() => {
    analytics.track("page_view", {
      path: "/interview",
      funnel_version: "v1",
    });
  }, [analytics]);

  // Countdown timer
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          setDone(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const handleSpeak = useCallback(async () => {
    const voice = getVoiceService();
    await voice.speak(FREE_QUESTION.text);
  }, []);

  const handleSubmit = useCallback(async () => {
    if (text.length < 5 || submitting) return;
    setSubmitting(true);

    analytics.track("mock_interview_submit", {
      funnel_version: "v1",
      timer_mode: "60s",
      len: text.length,
      timeLeft,
    });

    try {
      const ai = getAIService();
      const feedback = await ai.evaluateAnswer(
        text,
        state.typeResult!.primaryType
      );
      setFeedback(feedback);
      router.push("/feedback");
    } catch {
      setSubmitting(false);
    }
  }, [text, submitting, analytics, timeLeft, state.typeResult, setFeedback, router]);

  // SVG timer calculations
  const progress = timeLeft / TIME_LIMIT;
  const dashOffset = CIRCLE_CIRCUMFERENCE * (1 - progress);
  const isUrgent = timeLeft <= 10;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeDisplay = `${minutes}:${String(seconds).padStart(2, "0")}`;

  if (!isLoaded || !state.typeResult) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-lm text-sm">読み込み中...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream text-ch flex flex-col">
      <Nav />

      <main className="flex-1 max-w-[640px] w-full mx-auto px-8 py-12">
        {/* Timer */}
        <div className="flex justify-center mb-10">
          <div className="relative w-32 h-32">
            <svg
              className="w-full h-full -rotate-90"
              viewBox="0 0 120 120"
            >
              {/* Background circle */}
              <circle
                cx="60"
                cy="60"
                r={CIRCLE_RADIUS}
                fill="none"
                stroke="currentColor"
                className="text-ln"
                strokeWidth="6"
              />
              {/* Progress circle */}
              <circle
                cx="60"
                cy="60"
                r={CIRCLE_RADIUS}
                fill="none"
                strokeWidth="6"
                strokeLinecap="round"
                className={`transition-all duration-1000 ease-linear ${
                  isUrgent ? "text-ac" : "text-ch"
                }`}
                stroke="currentColor"
                strokeDasharray={CIRCLE_CIRCUMFERENCE}
                strokeDashoffset={dashOffset}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span
                className={`font-display text-2xl font-bold tabular-nums ${
                  isUrgent ? "text-ac" : "text-ch"
                }`}
              >
                {timeDisplay}
              </span>
            </div>
          </div>
        </div>

        {/* Question */}
        <div className="mb-8">
          <Label>Mock Interview</Label>
          <h2 className="font-display text-xl md:text-2xl font-bold leading-relaxed mb-4">
            {FREE_QUESTION.text}
          </h2>
          <button
            onClick={handleSpeak}
            className="text-xs text-lm hover:text-ch transition-colors cursor-pointer bg-transparent border-none"
          >
            🔊 質問を読み上げる
          </button>
        </div>

        {/* Hints */}
        <div className="bg-warm rounded-sm p-5 mb-8">
          <p className="text-xs font-bold text-mu mb-3">ヒント</p>
          <ul className="flex flex-col gap-2">
            {FREE_QUESTION.hints.map((hint, i) => (
              <li key={i} className="text-sm text-mu leading-relaxed flex gap-2">
                <span className="text-lm shrink-0">{i + 1}.</span>
                {hint}
              </li>
            ))}
          </ul>
        </div>

        {/* Text input */}
        <div className="mb-6">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            disabled={(done && text.length === 0) || submitting}
            placeholder="ここに回答を入力してください..."
            className="w-full border border-ln bg-white text-ch text-sm leading-relaxed p-4 resize-y focus:outline-none focus:border-ch transition-colors disabled:opacity-50 disabled:cursor-not-allowed placeholder:text-lm"
            style={{ minHeight: "160px" }}
          />
          <div className="flex justify-between items-center mt-2">
            <span className="text-xs text-lm">
              {text.length} 文字
            </span>
            <span
              className={`text-xs tabular-nums ${
                isUrgent ? "text-ac font-bold" : "text-lm"
              }`}
            >
              残り {timeLeft}秒
            </span>
          </div>
        </div>

        {/* Submit */}
        <div className="text-center">
          <Button
            onClick={handleSubmit}
            disabled={text.length < 5 || submitting}
            className={`w-full md:w-auto ${
              submitting ? "opacity-70 cursor-wait" : ""
            }`}
          >
            {submitting ? (
              <span className="flex items-center justify-center gap-2">
                <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                AI分析中...
              </span>
            ) : (
              "回答を送信する"
            )}
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
