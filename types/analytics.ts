// ==============================================
// Analytics Types
// Event tracking and parameter definitions
// ==============================================

/** Known analytics event names */
export type AnalyticsEvent =
  | 'page_view'
  | 'lp_cta_click'
  | 'diagnostic_start'
  | 'diagnostic_answer'
  | 'diagnostic_complete'
  | 'free_result_view'
  | 'mock_interview_start'
  | 'mock_interview_submit'
  | 'mock_interview_feedback_view'
  | 'paid_cta_click'
  | 'checkout_start'
  | 'purchase_complete';

/** Parameters attached to analytics events */
export interface AnalyticsParams {
  path?: string;
  qid?: string;
  v?: string;
  n?: number;
  type?: string;
  product?: string;
  score?: number;
  len?: number;
  timeLeft?: number;
  funnel_version?: string;
  copy_variant?: string;
  timer_mode?: string;
  result_type?: string;
  [key: string]: string | number | boolean | undefined;
}
