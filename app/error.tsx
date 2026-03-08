'use client';

import Button from '@/components/common/Button';

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-cream flex flex-col items-center justify-center px-8">
      <p className="text-xs tracking-[0.2em] uppercase text-lm mb-6">Error</p>
      <h1 className="font-display text-3xl md:text-5xl font-bold text-ch mb-4 text-center">
        予期せぬエラーが発生しました
      </h1>
      <p className="text-mu text-center max-w-md mb-8 leading-relaxed">
        申し訳ありません。ページの読み込み中に問題が発生しました。
        <br />
        もう一度お試しください。
      </p>
      <div className="flex gap-4">
        <Button onClick={reset}>もう一度試す</Button>
        <Button variant="ghost" onClick={() => (window.location.href = '/')}>
          トップに戻る
        </Button>
      </div>
    </div>
  );
}
