import Nav from '@/components/common/Nav';
import Footer from '@/components/common/Footer';

export const metadata = {
  title: 'プライバシーポリシー - CareerLab',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-cream">
      <Nav />
      <div className="max-w-[820px] mx-auto px-8 py-16">
        <h1 className="font-display text-3xl font-bold text-ch mb-8">
          プライバシーポリシー
        </h1>

        <div className="space-y-8 text-sm text-mu leading-relaxed">
          <Section title="1. 個人情報の取得">
            <p>
              当サービスでは、以下の情報を取得する場合があります。
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>メールアドレス（購入時・お問い合わせ時）</li>
              <li>決済情報（Stripe経由で処理。当サービスではカード情報を保持しません）</li>
              <li>診断回答データ（セッション内で一時保存）</li>
              <li>模擬面接の回答テキスト</li>
              <li>アクセスログ（IPアドレス、ブラウザ情報等）</li>
            </ul>
          </Section>

          <Section title="2. 個人情報の利用目的">
            <ul className="list-disc pl-6 space-y-1">
              <li>サービスの提供・改善</li>
              <li>購入商品の提供</li>
              <li>お問い合わせへの対応</li>
              <li>利用状況の分析（匿名化した統計データとして）</li>
            </ul>
          </Section>

          <Section title="3. 個人情報の第三者提供">
            <p>
              法令に基づく場合を除き、ご本人の同意なく個人情報を第三者に提供することはありません。
              ただし、以下のサービスを利用しており、当該サービスの利用規約・プライバシーポリシーに従います。
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Stripe（決済処理）</li>
              <li>Google Analytics（アクセス解析）</li>
            </ul>
          </Section>

          <Section title="4. AI利用に関する注意事項">
            <ul className="list-disc pl-6 space-y-1">
              <li>本サービスはキャリア判断を補助するものであり、採用や転職の結果を保証するものではありません。</li>
              <li>AIによるフィードバックは参考情報であり、医療・法律・投資等の専門的助言ではありません。</li>
              <li>診断結果やフィードバックの内容は、サービス改善のために匿名化して分析する場合があります。</li>
              <li>回答データは面接フィードバックの生成のみに使用し、その他の目的で利用することはありません。</li>
            </ul>
          </Section>

          <Section title="5. Cookieの使用">
            <p>
              当サービスでは、アクセス解析および利用体験の向上のためにCookieを使用する場合があります。
              ブラウザの設定によりCookieを無効にすることができますが、一部機能が制限される場合があります。
            </p>
          </Section>

          <Section title="6. セッションデータ">
            <p>
              診断回答や模擬面接の回答は、ブラウザのセッションストレージに一時保存されます。
              ブラウザを閉じると自動的に削除されます。サーバーへの永続保存は、購入後の商品提供に必要な範囲でのみ行います。
            </p>
          </Section>

          <Section title="7. お問い合わせ">
            <p>
              個人情報の取扱いに関するお問い合わせは、
              <a href="/contact" className="text-ac underline">
                お問い合わせフォーム
              </a>
              よりご連絡ください。
            </p>
          </Section>

          <p className="text-lm text-xs mt-8">
            制定日: 【日付を記入】
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="text-base font-bold text-ch mb-3">{title}</h2>
      {children}
    </section>
  );
}
