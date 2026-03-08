import Nav from '@/components/common/Nav';
import Footer from '@/components/common/Footer';

export const metadata = {
  title: '利用規約 - CareerLab',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-cream">
      <Nav />
      <div className="max-w-[820px] mx-auto px-8 py-16">
        <h1 className="font-display text-3xl font-bold text-ch mb-8">
          利用規約
        </h1>

        <div className="space-y-8 text-sm text-mu leading-relaxed">
          <Section title="第1条（適用）">
            <p>
              この利用規約（以下「本規約」）は、CareerLab（以下「当サービス」）が提供するすべてのサービスの利用条件を定めるものです。ユーザーは本規約に同意のうえ、当サービスをご利用ください。
            </p>
          </Section>

          <Section title="第2条（サービス内容）">
            <p>当サービスは以下を提供します。</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>キャリアタイプ診断（無料）</li>
              <li>模擬面接体験とAIフィードバック（無料：1問、有料：複数問）</li>
              <li>自己PR・志望動機の改善提案（有料）</li>
              <li>面接対策プラン（有料）</li>
            </ul>
          </Section>

          <Section title="第3条（禁止事項）">
            <p>ユーザーは以下の行為を行ってはなりません。</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>サービスの不正利用または妨害行為</li>
              <li>他のユーザーへの迷惑行為</li>
              <li>サービス内容の無断複製・転載</li>
              <li>虚偽の情報を用いた利用</li>
              <li>その他、当サービスが不適切と判断する行為</li>
            </ul>
          </Section>

          <Section title="第4条（免責事項）">
            <ul className="list-disc pl-6 space-y-1">
              <li>当サービスは採用・転職の結果を保証するものではありません。</li>
              <li>AIによるフィードバック・診断結果は参考情報であり、専門的助言（法律・医療・投資等）に代わるものではありません。</li>
              <li>サービスの一時停止・中断・変更により生じた損害について、当サービスは責任を負いません。</li>
              <li>ユーザーが当サービスを利用して行った判断・行動の結果について、当サービスは責任を負いません。</li>
            </ul>
          </Section>

          <Section title="第5条（有料サービスと決済）">
            <ul className="list-disc pl-6 space-y-1">
              <li>有料サービスの価格は各商品ページに表示されます（税込）。</li>
              <li>決済はStripeを通じてクレジットカードで行います。</li>
              <li>購入後のコンテンツは、決済確認後にメールまたはサービス内で提供されます。</li>
            </ul>
          </Section>

          <Section title="第6条（返金ポリシー）">
            <p>
              デジタルコンテンツの性質上、購入後の返品・返金は原則としてお受けしておりません。
            </p>
            <p className="mt-2">ただし、以下の場合は個別に対応いたします。</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>サービスに重大な不具合があり、商品が提供できなかった場合</li>
              <li>二重決済が発生した場合</li>
            </ul>
            <p className="mt-2">
              返金のご相談は、購入後7日以内に
              <a href="/contact" className="text-ac underline">
                お問い合わせフォーム
              </a>
              よりご連絡ください。
            </p>
          </Section>

          <Section title="第7条（知的財産権）">
            <p>
              当サービスが提供するコンテンツ（診断結果、フィードバック、改善版回答例等）の著作権は当サービスに帰属します。個人利用の範囲を超えた複製・配布は禁止します。
            </p>
          </Section>

          <Section title="第8条（規約の変更）">
            <p>
              当サービスは、必要に応じて本規約を変更できるものとします。変更後の規約はサイト上に掲載した時点から効力を生じます。
            </p>
          </Section>

          <Section title="第9条（準拠法・管轄裁判所）">
            <p>
              本規約の解釈は日本法に準拠します。紛争が生じた場合は、【管轄裁判所を記入】を第一審の専属的合意管轄裁判所とします。
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
