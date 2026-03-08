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
      <body>
        <AppStateProvider>{children}</AppStateProvider>
      </body>
    </html>
  );
}
