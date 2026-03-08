import { NextResponse } from 'next/server';
import { validateEvaluateRequest } from '@/lib/validation';
import { evaluateAnswer } from '@/lib/interview';

const PROMPT_VERSION = 'v1.0.0';

export async function POST(request: Request) {
  const startTime = Date.now();
  let fallbackUsed = false;

  try {
    const body = await request.json();
    const validated = validateEvaluateRequest(body);

    if (!validated) {
      return NextResponse.json(
        { error: 'Invalid request: answer (5-5000 chars) and valid type required' },
        { status: 400 },
      );
    }

    // For v1, use local evaluation (will be replaced with AI API call)
    const result = evaluateAnswer(validated.answer, validated.type);
    fallbackUsed = false;

    const responseTime = Date.now() - startTime;

    // Minimum logging (console for v1, DB in future)
    console.log(JSON.stringify({
      event: 'evaluate',
      prompt_version: PROMPT_VERSION,
      response_time_ms: responseTime,
      fallback_used: fallbackUsed,
      model_used: 'local_rubric',
      type: validated.type,
      answer_length: validated.answer.length,
      score: result.overallScore,
    }));

    return NextResponse.json(result);
  } catch (error) {
    const responseTime = Date.now() - startTime;
    console.error(JSON.stringify({
      event: 'evaluate_error',
      prompt_version: PROMPT_VERSION,
      response_time_ms: responseTime,
      fallback_used: true,
      error: error instanceof Error ? error.message : 'Unknown error',
    }));

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
