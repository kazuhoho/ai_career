import type { AnalyticsService } from '@/services/interfaces';
import type { AnalyticsEvent, AnalyticsParams } from '@/types/analytics';

export function createMockAnalyticsService(): AnalyticsService {
  return {
    track(event: AnalyticsEvent, params?: AnalyticsParams) {
      console.log(
        '%c[Analytics] ' + event,
        'color:#8b6914;font-weight:bold',
        params ?? '',
      );
    },
  };
}
