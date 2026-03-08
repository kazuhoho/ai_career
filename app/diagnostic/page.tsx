"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Nav from "@/components/common/Nav";
import Label from "@/components/common/Label";
import { useAppState } from "@/components/common/AppStateProvider";
import { QUESTIONS } from "@/data/questions";
import { calcScores, detType } from "@/lib/diagnostic";
import { getAnalyticsService } from "@/services/registry";
import type { ChoiceKey, Answers } from "@/types/diagnostic";

const CHOICE_KEYS: ChoiceKey[] = ["a", "b", "c", "d"];

export default function DiagnosticPage() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [sliding, setSliding] = useState(false);
  const router = useRouter();
  const { setAnswers: saveAnswers, setScores, setTypeResult } = useAppState();
  const analytics = getAnalyticsService();

  useEffect(() => {
    analytics.track("diagnostic_start", {
      funnel_version: "v1",
      copy_variant: "default",
    });
  }, [analytics]);

  const question = QUESTIONS[current];
  const total = QUESTIONS.length;
  const progress = ((current + 1) / total) * 100;

  const handleSelect = useCallback(
    (key: ChoiceKey) => {
      const updatedAnswers = { ...answers, [question.id]: key };
      setAnswers(updatedAnswers);

      analytics.track("diagnostic_answer", {
        qid: question.id,
        v: key,
        n: current + 1,
        funnel_version: "v1",
      });

      if (current < total - 1) {
        // Slide to next question
        setDirection("next");
        setSliding(true);
        setTimeout(() => {
          setCurrent((prev) => prev + 1);
          setSliding(false);
        }, 350);
      } else {
        // Complete
        const scores = calcScores(updatedAnswers);
        const typeResult = detType(scores);

        saveAnswers(updatedAnswers);
        setScores(scores);
        setTypeResult(typeResult);

        analytics.track("diagnostic_complete", {
          type: typeResult.primaryType,
          funnel_version: "v1",
        });

        router.push("/result");
      }
    },
    [
      answers,
      question,
      current,
      total,
      analytics,
      saveAnswers,
      setScores,
      setTypeResult,
      router,
    ]
  );

  const handleBack = () => {
    if (current > 0) {
      setDirection("prev");
      setSliding(true);
      setTimeout(() => {
        setCurrent((prev) => prev - 1);
        setSliding(false);
      }, 350);
    }
  };

  const questionNum = String(current + 1).padStart(2, "0");
  const totalNum = String(total).padStart(2, "0");

  // Slide animation classes
  const slideClass = sliding
    ? direction === "next"
      ? "translate-x-[-100%] opacity-0"
      : "translate-x-[100%] opacity-0"
    : "translate-x-0 opacity-100";

  return (
    <div className="min-h-screen bg-cream text-ch flex flex-col">
      {/* Progress bar */}
      <div className="h-[3px] bg-ln">
        <div
          className="h-full bg-ch transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Nav */}
      <Nav
        extra={
          <span className="text-xs tracking-widest text-lm font-body">
            {questionNum} / {totalNum}
          </span>
        }
      />

      {/* Question area */}
      <main className="flex-1 flex flex-col justify-center max-w-[640px] w-full mx-auto px-8 py-12">
        <div
          className={`transition-all duration-350 ease-out ${slideClass}`}
        >
          <Label>Question {questionNum}</Label>

          <h2 className="font-display text-xl md:text-2xl font-bold leading-relaxed mb-10">
            {question.text}
          </h2>

          {/* Choices */}
          <div className="flex flex-col gap-3">
            {CHOICE_KEYS.map((key) => {
              const isSelected = answers[question.id] === key;
              return (
                <button
                  key={key}
                  onClick={() => handleSelect(key)}
                  className={`w-full text-left px-6 py-4 text-sm leading-relaxed border transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? "bg-ch text-white border-ch"
                      : "bg-transparent text-mu border-ln hover:border-ch hover:text-ch"
                  }`}
                >
                  {question.choices[key]}
                </button>
              );
            })}
          </div>

          {/* Back link */}
          {current > 0 && (
            <button
              onClick={handleBack}
              className="mt-8 text-xs text-lm hover:text-ch transition-colors cursor-pointer bg-transparent border-none"
            >
              &larr; 前の質問に戻る
            </button>
          )}
        </div>
      </main>
    </div>
  );
}
