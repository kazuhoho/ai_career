import type { Metadata } from "next";
import { AppStateProvider } from "@/components/common/AppStateProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "CareerLab - AI面接リハーサル",
  description:
    "12問の診断であなたの面接の弱点を可視化。無料の模擬面接1問で、改善ポイントまでわかります。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;700&family=Zen+Kaku+Gothic+New:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <AppStateProvider>{children}</AppStateProvider>
      </body>
    </html>
  );
}
