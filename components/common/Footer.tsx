import Link from "next/link";

export default function Footer() {
  return (
    <footer className="p-8 border-t border-ln flex justify-between text-[11px] text-lm">
      <div className="flex gap-6">
        <Link href="/legal/tokushoho" className="hover:text-ch transition-colors">
          特定商取引法
        </Link>
        <Link href="/legal/privacy" className="hover:text-ch transition-colors">
          プライバシーポリシー
        </Link>
        <Link href="/legal/terms" className="hover:text-ch transition-colors">
          利用規約
        </Link>
        <Link href="/contact" className="hover:text-ch transition-colors">
          お問い合わせ
        </Link>
      </div>
      <div>&copy; 2025 CareerLab</div>
    </footer>
  );
}
