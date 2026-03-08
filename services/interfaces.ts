// ==============================================
// Service Interfaces
// Contracts for all pluggable services
// ==============================================

import type { DiagnosticType } from '@/types/diagnostic';
import type { FeedbackResult } from '@/types/interview';
import type { AnalyticsEvent, AnalyticsParams } from '@/types/analytics';

/** AI evaluation service */
export interface AIService {
  evaluateAnswer(answer: string, type: DiagnosticType): Promise<FeedbackResult>;
}

/**
 * Payment/checkout service.
 * v1: email は Stripe Checkout のフォームから取得される。
 * Webhook で order 作成時に email を保存し、
 * 購入確認メールは EmailService.sendPurchaseConfirmation で送信する。
 */
export interface PaymentService {
  createCheckout(productSlug: string): Promise<{ sessionId: string; url: string }>;
}

/** Analytics tracking service */
export interface AnalyticsService {
  track(event: AnalyticsEvent, params?: AnalyticsParams): void;
}

/** Email notification service */
export interface EmailService {
  sendPurchaseConfirmation(email: string, productSlug: string): Promise<void>;
  sendFeedbackReady(email: string): Promise<void>;
}

/** Voice TTS/STT service */
export interface VoiceService {
  speak(text: string): Promise<void>;
  startRecording(): Promise<void>;
  stopRecording(): Promise<string>;
  isRecording(): boolean;
}
