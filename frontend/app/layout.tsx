import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Stock Price Predictor - College Project',
  description: 'Predict tomorrow\'s stock prices using historical market data and a Random Forest forecasting engine.',
  metadataBase: new URL('https://stock-vision-eight.vercel.app'),
  openGraph: {
    title: 'Stock Price Predictor',
    description:
      'Predict tomorrow\'s stock prices using historical market data and a Random Forest forecasting engine.',
    type: 'website',
    images: ['/opengraph-image'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stock Price Predictor',
    description:
      'Predict tomorrow\'s stock prices using historical market data and a Random Forest forecasting engine.',
    images: ['/twitter-image'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
