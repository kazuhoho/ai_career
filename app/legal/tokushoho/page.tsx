import Nav from '@/components/common/Nav';
import Footer from '@/components/common/Footer';

export const metadata = {
  title: '特定商取引法に基づく表記 - CareerLab',
};

export default function TokushohoPage() {
  return (
    <div className="min-h-screen bg-cream">
      <Nav />
      <div className="max-w-[820px] mx-auto px-8 py-16">
        <h1 className="font-display text-3xl font-bold text-ch mb-8">
          特定商取引法に基づく表記
        </h1>

        <table className="w-full text-sm">
          <tbody>
            {[
              ['販売事業者', '【事業者名を記入】'],
              ['代表責任者', '【代表者名を記入】'],
              ['所在地', '【住所を記入】'],
              ['電話番号', '【電話番号を記入】'],
              ['メールアドレス', '【メールアドレスを記入】'],
              ['販売URL', 'https://【ドメインを記入】'],
              ['販売価格', '各商品ページに記載（税込）'],
              ['商品代金以外の必要料金', 'なし'],
              ['支払方法', 'クレジットカード（Stripe決済）'],
              ['支払時期', '購入時に即時決済'],
              ['商品の引渡し時期', '決済完了後、即時〜24時間以内にメールでご案内'],
              ['返品・キャンセルについて', 'デジタルコンテンツの性質上、購入後の返品・返金は原則としてお受けしておりません。ただし、サービスに重大な不具合があった場合は個別に対応いたします。'],
              ['動作環境', 'Chrome/Edge 最新2バージョン、Safari 16+、Firefox 最新2バージョン'],
            ].map(([label, value]) => (
              <tr key={label} className="border-b border-ln">
                <th className="py-4 pr-6 text-left font-bold text-ch align-top w-48">
                  {label}
                </th>
                <td className="py-4 text-mu leading-relaxed">{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </div>
  );
}
