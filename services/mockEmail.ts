import type { EmailService } from '@/services/interfaces';

export function createMockEmailService(): EmailService {
  return {
    async sendPurchaseConfirmation(email: string, productSlug: string) {
      console.log(`%c[Email] Purchase confirmation → ${email} (${productSlug})`, 'color:#2d6a4f');
    },
    async sendFeedbackReady(email: string) {
      console.log(`%c[Email] Feedback ready → ${email}`, 'color:#2d6a4f');
    },
  };
}
