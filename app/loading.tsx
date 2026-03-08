export default function Loading() {
  return (
    <div className="min-h-screen bg-cream flex flex-col items-center justify-center">
      <div className="w-12 h-12 border-3 border-ln border-t-ch rounded-full animate-spin mb-6" />
      <p className="text-sm text-lm tracking-wider">読み込み中...</p>
    </div>
  );
}
