import { NextResponse } from 'next/server';
import { validateProductSlug } from '@/lib/validation';
import { getProductBySlug } from '@/data/products';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const slug = validateProductSlug(body.productSlug);

    if (!slug) {
      return NextResponse.json(
        { error: 'Invalid product slug' },
        { status: 400 },
      );
    }

    const product = getProductBySlug(slug);
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 },
      );
    }

    const isMock = process.env.NEXT_PUBLIC_SERVICE_MODE !== 'production';

    if (isMock) {
      // Mock mode: return a mock session
      const mockSessionId = 'mock_' + Date.now();
      return NextResponse.json({
        sessionId: mockSessionId,
        url: `/success?session_id=${mockSessionId}&product=${slug}`,
      });
    }

    // Production mode: create Stripe Checkout session
    // TODO: Implement Stripe integration
    return NextResponse.json(
      { error: 'Stripe not configured' },
      { status: 501 },
    );
  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
