import { ImageResponse } from 'next/og';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'linear-gradient(135deg, #0f172a 0%, #1d4ed8 50%, #0d9488 100%)',
          color: 'white',
          fontFamily: 'Arial, sans-serif',
          padding: '48px',
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: 68, fontWeight: 800, lineHeight: 1.1 }}>
          Stock Price Predictor
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 34,
            opacity: 0.95,
            maxWidth: 1000,
            lineHeight: 1.3,
          }}
        >
          Data-driven forecasting for tomorrow&apos;s stock prices
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
