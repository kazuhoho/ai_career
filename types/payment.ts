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

/**
 * Order record structure.
 * v1: orders are not persisted to a database.
 * Future: store in DB, created by Stripe webhook on checkout.session.completed.
 */
export interface Order {
  sessionId: string;
  productSlug: string;
  /** Email collected from Stripe Checkout form */
  email: string;
  status: OrderStatus;
  createdAt: string;
}
