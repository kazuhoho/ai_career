// ==============================================
// Service Registry
// Environment-based service switching (mock / production)
// ==============================================

import type { AIService, PaymentService, AnalyticsService, EmailService, VoiceService } from '@/services/interfaces';
import { createMockAIService } from '@/services/mockAi';
import { createMockPaymentService } from '@/services/mockPayment';
import { createMockAnalyticsService } from '@/services/mockAnalytics';
import { createMockEmailService } from '@/services/mockEmail';
import { createMockVoiceService } from '@/services/mockVoice';
import { createProductionAIService } from '@/services/productionAi';
import { createProductionPaymentService } from '@/services/productionPayment';
import { createProductionAnalyticsService } from '@/services/productionAnalytics';
import { createProductionEmailService } from '@/services/productionEmail';

function isProduction(): boolean {
  return process.env.NEXT_PUBLIC_SERVICE_MODE === 'production';
}

// Singleton instances
let aiService: AIService | null = null;
let paymentService: PaymentService | null = null;
let analyticsService: AnalyticsService | null = null;
let emailService: EmailService | null = null;
let voiceService: VoiceService | null = null;

export function getAIService(): AIService {
  if (!aiService) {
    aiService = isProduction() ? createProductionAIService() : createMockAIService();
  }
  return aiService;
}

export function getPaymentService(): PaymentService {
  if (!paymentService) {
    paymentService = isProduction() ? createProductionPaymentService() : createMockPaymentService();
  }
  return paymentService;
}

export function getAnalyticsService(): AnalyticsService {
  if (!analyticsService) {
    analyticsService = isProduction() ? createProductionAnalyticsService() : createMockAnalyticsService();
  }
  return analyticsService;
}

export function getEmailService(): EmailService {
  if (!emailService) {
    emailService = isProduction() ? createProductionEmailService() : createMockEmailService();
  }
  return emailService;
}

export function getVoiceService(): VoiceService {
  if (!voiceService) {
    voiceService = createMockVoiceService(); // Always mock in v1
  }
  return voiceService;
}
