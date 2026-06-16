import type { Metadata } from "next";
import { Inter, Noto_Serif_SC } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const notoSerifSC = Noto_Serif_SC({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  variable: "--font-noto-serif-sc",
});

export const metadata: Metadata = {
  title: "墨金书院 | Cyber Ebook Platform",
  description: "证券投资知识付费电子书平台 — 用知识武装交易",
  keywords: ["电子书", "知识付费", "证券投资", "股票", "期货"],
  icons: {
    icon: [
      {
        url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 36 36'%3E%3Cdefs%3E%3ClinearGradient id='a' x1='0' y1='0' x2='36' y2='36'%3E%3Cstop offset='0%25' stopColor='%23DC1E1E'/%3E%3Cstop offset='100%25' stopColor='%238B0000'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect x='2' y='2' width='32' height='32' rx='7' fill='url(%23a)'/%3E%3Cpath d='M13 11V25C13 25 14.5 23.5 18 23.5V11C14.5 11 13 11 13 11Z' fill='white' fillOpacity='0.9'/%3E%3Cpath d='M23 11V25C23 25 21.5 23.5 18 23.5V11C21.5 11 23 11 23 11Z' fill='white' fillOpacity='0.7'/%3E%3C/svg%3E",
        type: "image/svg+xml",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${notoSerifSC.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}