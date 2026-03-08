import type { AnalyticsService } from '@/services/interfaces';
import type { AnalyticsEvent, AnalyticsParams } from '@/types/analytics';

export function createProductionAnalyticsService(): AnalyticsService {
  return {
    track(event: AnalyticsEvent, params?: AnalyticsParams) {
      // GA4 via gtag
      if (typeof window !== 'undefined' && 'gtag' in window) {
        (window as unknown as { gtag: (...args: unknown[]) => void }).gtag(
          'event',
          event,
          params ?? {},
        );
      }
    },
  };
}
