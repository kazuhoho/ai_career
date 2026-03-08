import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.text();

    const isMock = process.env.NEXT_PUBLIC_SERVICE_MODE !== 'production';

    if (isMock) {
      console.log('[Webhook] Mock mode — ignoring Stripe webhook');
      return NextResponse.json({ received: true });
    }

    // Production: verify Stripe signature
    const signature = request.headers.get('stripe-signature');
    if (!signature) {
      return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
    }

    // TODO: Implement Stripe webhook verification and event handling
    // - checkout.session.completed → update order to 'paid'
    // - payment_intent.payment_failed → update order to 'failed'
    // - Idempotency check for duplicate events
    console.log('[Webhook] Received event, body length:', body.length);

    return NextResponse.json({ received: true });
  } catch {
    return NextResponse.json({ error: 'Webhook error' }, { status: 500 });
  }
}
