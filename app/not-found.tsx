import Link from 'next/link';
import Button from '@/components/common/Button';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-cream flex flex-col items-center justify-center px-8">
      <p className="font-display text-8xl font-bold text-ln mb-4">404</p>
      <h1 className="text-xl font-bold text-ch mb-2">
        お探しのページが見つかりません
      </h1>
      <p className="text-mu text-center max-w-md mb-8 leading-relaxed">
        URLが正しいかご確認ください。
        <br />
        ページが移動または削除された可能性があります。
      </p>
      <Link href="/">
        <Button>トップページへ戻る</Button>
      </Link>
    </div>
  );
}
