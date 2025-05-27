import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Providers from './providers';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#f97316', // Orange-600
};

export const metadata: Metadata = {
  title: '맛집지도 | 당신 주변의 맛집 발견',
  description: '네이버 지도 기반 맛집 검색 서비스. 위치, 음식 종류, 분위기, 가격대별로 맞춤 맛집 추천을 받아보세요.',
  keywords: '맛집지도, 맛집 검색, 맛집 추천, 네이버 지도, 한국 맛집, 음식점 지도, 맛집 리뷰',
  metadataBase: new URL('https://matjibmap.kr'),
  authors: [{ name: '맛집지도 팀' }],
  creator: '맛집지도',
  publisher: '맛집지도',
  applicationName: '맛집지도',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: '맛집지도 | 지도로 보는 맛집 정보',
    description: '네이버 지도 기반 맛집 검색 서비스. 위치, 음식 종류, 분위기, 가격대별로 맞춤 맛집 추천을 받아보세요.',
    images: ['/og-image.jpg'],
    url: 'https://matjibmap.kr',
    type: 'website',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: '맛집지도 | 당신 주변의 맛집 발견',
    description: '네이버 지도 기반 맛집 검색 서비스',
    images: ['/og-image.jpg'],
  },
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
