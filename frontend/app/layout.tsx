import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Stock Price Predictor - College Project',
  description: 'Predict tomorrow\'s stock prices using historical market data and a Random Forest forecasting engine.',
  openGraph: {
    title: 'Stock Price Predictor',
    description:
      'Predict tomorrow\'s stock prices using historical market data and a Random Forest forecasting engine.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stock Price Predictor',
    description:
      'Predict tomorrow\'s stock prices using historical market data and a Random Forest forecasting engine.',
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
