import type { PaymentService } from '@/services/interfaces';

export function createProductionPaymentService(): PaymentService {
  return {
    async createCheckout(productSlug: string) {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productSlug }),
      });

      if (!res.ok) throw new Error(`Checkout API error: ${res.status}`);

      const data = await res.json();
      return { sessionId: data.sessionId, url: data.url };
    },
  };
}
