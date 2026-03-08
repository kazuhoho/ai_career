import type { AIService } from '@/services/interfaces';
import type { DiagnosticType } from '@/types/diagnostic';
import type { FeedbackResult } from '@/types/interview';
import { evaluateAnswer } from '@/lib/interview';

export function createMockAIService(): AIService {
  return {
    async evaluateAnswer(answer: string, type: DiagnosticType): Promise<FeedbackResult> {
      // Simulate network latency
      await new Promise((r) => setTimeout(r, 600));
      return evaluateAnswer(answer, type);
    },
  };
}
