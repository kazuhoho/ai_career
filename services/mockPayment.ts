import type { PaymentService } from '@/services/interfaces';

export function createMockPaymentService(): PaymentService {
  return {
    async createCheckout(productSlug: string) {
      await new Promise((r) => setTimeout(r, 800));
      return {
        sessionId: 'mock_' + Date.now(),
        url: `/success?session_id=mock_${Date.now()}&product=${productSlug}`,
      };
    },
  };
}
