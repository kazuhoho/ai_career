'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';
import type { Answers, Scores, TypeResult } from '@/types/diagnostic';
import type { FeedbackResult } from '@/types/interview';
import {
  type AppState,
  DEFAULT_STATE,
  saveState,
  loadState,
  clearState,
} from '@/lib/store';

interface AppStateContextValue {
  state: AppState;
  setAnswers: (answers: Answers) => void;
  setScores: (scores: Scores) => void;
  setTypeResult: (typeResult: TypeResult) => void;
  setFeedback: (feedback: FeedbackResult) => void;
  reset: () => void;
  isLoaded: boolean;
}

const AppStateContext = createContext<AppStateContextValue | null>(null);

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(DEFAULT_STATE);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from sessionStorage on mount
  useEffect(() => {
    const saved = loadState();
    if (saved) {
      setState(saved);
    }
    setIsLoaded(true);
  }, []);

  // Save to sessionStorage on state change
  useEffect(() => {
    if (isLoaded) {
      saveState(state);
    }
  }, [state, isLoaded]);

  const setAnswers = useCallback((answers: Answers) => {
    setState((prev) => ({ ...prev, answers }));
  }, []);

  const setScores = useCallback((scores: Scores) => {
    setState((prev) => ({ ...prev, scores }));
  }, []);

  const setTypeResult = useCallback((typeResult: TypeResult) => {
    setState((prev) => ({ ...prev, typeResult }));
  }, []);

  const setFeedback = useCallback((feedback: FeedbackResult) => {
    setState((prev) => ({ ...prev, feedback }));
  }, []);

  const reset = useCallback(() => {
    clearState();
    setState(DEFAULT_STATE);
  }, []);

  return (
    <AppStateContext.Provider
      value={{ state, setAnswers, setScores, setTypeResult, setFeedback, reset, isLoaded }}
    >
      {children}
    </AppStateContext.Provider>
  );
}

export function useAppState(): AppStateContextValue {
  const ctx = useContext(AppStateContext);
  if (!ctx) throw new Error('useAppState must be used within AppStateProvider');
  return ctx;
}
