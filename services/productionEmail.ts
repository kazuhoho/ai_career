import type { EmailService } from '@/services/interfaces';

export function createProductionEmailService(): EmailService {
  return {
    async sendPurchaseConfirmation(email: string, productSlug: string) {
      // TODO: Implement SendGrid or other email provider
      console.log(`[Email] Would send purchase confirmation to ${email} for ${productSlug}`);
    },
    async sendFeedbackReady(email: string) {
      // TODO: Implement SendGrid or other email provider
      console.log(`[Email] Would send feedback ready notification to ${email}`);
    },
  };
}
