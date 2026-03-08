'use client';

import { useState } from 'react';
import Nav from '@/components/common/Nav';
import Button from '@/components/common/Button';
import Footer from '@/components/common/Footer';
import { getAnalyticsService } from '@/services/registry';

type FormStatus = 'idle' | 'sending' | 'sent' | 'error';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<FormStatus>('idle');

  const isValid = name.trim().length > 0 && email.includes('@') && message.trim().length > 0;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid) return;

    setStatus('sending');

    try {
      // v1: simulate sending (replace with actual API)
      await new Promise((r) => setTimeout(r, 1000));
      console.log('[Contact] Form submitted:', { name, email, message });
      getAnalyticsService().track('contact_submit', {
        funnel_version: 'v1',
        copy_variant: 'default',
      });
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'sent') {
    return (
      <div className="min-h-screen bg-cream">
        <Nav />
        <div className="max-w-[640px] mx-auto px-8 py-24 text-center">
          <div className="w-16 h-16 rounded-full bg-[#2d6a4f] text-white flex items-center justify-center mx-auto mb-6 text-2xl">
            ✓
          </div>
          <h1 className="text-xl font-bold text-ch mb-4">
            送信が完了しました
          </h1>
          <p className="text-mu leading-relaxed mb-8">
            お問い合わせいただきありがとうございます。
            <br />
            2営業日以内にご連絡いたします。
          </p>
          <Button variant="ghost" onClick={() => (window.location.href = '/')}>
            トップに戻る
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      <Nav />
      <div className="max-w-[640px] mx-auto px-8 py-16">
        <h1 className="font-display text-3xl font-bold text-ch mb-2">
          お問い合わせ
        </h1>
        <p className="text-mu text-sm mb-8 leading-relaxed">
          ご質問・ご要望・返金のご相談など、お気軽にお問い合わせください。
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-bold text-ch mb-2">
              お名前
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="山田太郎"
              className="w-full px-4 py-3 border border-ln bg-white text-ch text-sm outline-none focus:border-ch transition-colors"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-bold text-ch mb-2">
              メールアドレス
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com"
              className="w-full px-4 py-3 border border-ln bg-white text-ch text-sm outline-none focus:border-ch transition-colors"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-bold text-ch mb-2">
              お問い合わせ内容
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="お問い合わせ内容を入力してください"
              rows={6}
              className="w-full px-4 py-3 border border-ln bg-white text-ch text-sm outline-none focus:border-ch transition-colors resize-vertical"
            />
          </div>

          {status === 'error' && (
            <p className="text-ac text-sm">
              送信に失敗しました。もう一度お試しください。
            </p>
          )}

          <Button
            disabled={!isValid || status === 'sending'}
            className={!isValid ? 'opacity-50' : ''}
          >
            {status === 'sending' ? '送信中...' : '送信する'}
          </Button>
        </form>
      </div>
      <Footer />
    </div>
  );
}
