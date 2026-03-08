import type { AIService } from '@/services/interfaces';
import type { DiagnosticType } from '@/types/diagnostic';
import type { FeedbackResult } from '@/types/interview';
import { validateFeedbackResponse } from '@/lib/validation';
import { evaluateAnswer as localEvaluate } from '@/lib/interview';

export function createProductionAIService(): AIService {
  return {
    async evaluateAnswer(answer: string, type: DiagnosticType): Promise<FeedbackResult> {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 15000);

        const res = await fetch('/api/evaluate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ answer, type }),
          signal: controller.signal,
        });

        clearTimeout(timeout);

        if (!res.ok) throw new Error(`API error: ${res.status}`);

        const data = await res.json();
        const validated = validateFeedbackResponse(data);
        if (!validated) throw new Error('Invalid AI response format');

        return validated;
      } catch {
        // Fallback to local evaluation
        console.warn('[AI] Production API failed, falling back to local evaluation');
        return localEvaluate(answer, type);
      }
    },
  };
}
