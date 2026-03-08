// ==============================================
// Payment Types
// Products, checkout, and order status
// ==============================================

/** Product type classification */
export type ProductType = 'front' | 'upsell' | 'subscription';

/** A product available for purchase */
export interface Product {
  slug: string;
  name: string;
  type: ProductType;
  price: number;
  tagline: string;
  features: string[];
  ctaText: string;
}

/** Result returned from a checkout session creation */
export interface CheckoutResult {
  sessionId: string;
  ok: boolean;
}

/** Status of a placed order (matches Stripe Webhook lifecycle) */
export type OrderStatus = 'pending' | 'paid' | 'fulfilled' | 'cancelled' | 'failed';
