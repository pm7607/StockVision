# Stock Price Predictor - Setup Instructions

## Project Overview

This is a full-stack stock price prediction system that uses machine learning to forecast tomorrow's stock prices.

**Stack:**
- Frontend: Next.js 13 + TypeScript + Tailwind CSS + shadcn/ui
- Backend: FastAPI (Python)
- ML Model: Random Forest Regressor

## Prerequisites

- Node.js 18+ installed
- Python 3.8+ installed
- Your FastAPI backend running

## Frontend Setup

1. **Install dependencies:**
```bash
npm install
```

2. **Run the development server:**
```bash
npm run dev
```

3. **Open your browser:**
Navigate to `http://localhost:3000`

## Backend Setup

Make sure your FastAPI server is running on `http://localhost:8000`

**Important:** Update the API URL in `/components/prediction-dialog.tsx` if your backend runs on a different port or host.

Current API endpoint: `http://localhost:8000/predict`

### CORS Configuration

Your FastAPI backend needs to allow requests from your Next.js frontend. Update your FastAPI CORS settings:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Your Next.js URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## Features

### 1. Beautiful Landing Page
- Project overview and details
- Model specifications
- Methodology explanation
- Key features showcase

### 2. Stock Prediction Dialog
- Searchable dropdown with 50+ popular stocks
- Real-time prediction from your ML model
- Beautiful results display showing:
  - Tomorrow's Open Price
  - Tomorrow's High Price
  - Tomorrow's Low Price
  - Tomorrow's Close Price

### 3. User Experience
- Sticky header with predict button
- Smooth scrolling
- Loading states
- Error handling
- Responsive design (mobile-friendly)

## Customization

### Update Stock List
Edit `/lib/stocks.ts` to add or remove stocks:

```typescript
export const popularStocks = [
  { symbol: 'AAPL', name: 'Apple Inc.' },
  // Add more stocks here
];
```

### Change API Endpoint
Edit `/components/prediction-dialog.tsx`:

```typescript
const response = await fetch('YOUR_API_URL_HERE', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ symbol: selectedStock }),
});
```

### Customize Colors
The project uses a blue-teal gradient color scheme. To change:
- Edit Tailwind classes in components
- Modify `/app/globals.css` for global colors

## Project Structure

```
├── app/
│   ├── page.tsx              # Main landing page
│   ├── layout.tsx            # Root layout with metadata
│   └── globals.css           # Global styles
├── components/
│   ├── prediction-dialog.tsx # Prediction modal component
│   └── ui/                   # shadcn/ui components
├── lib/
│   ├── stocks.ts             # Stock symbols list
│   └── utils.ts              # Utility functions
```

## API Integration

Your FastAPI backend should have this endpoint:

**POST** `/predict`

Request body:
```json
{
  "symbol": "AAPL"
}
```

Response:
```json
{
  "symbol": "AAPL",
  "tomorrow_open": 185.23,
  "tomorrow_high": 187.45,
  "tomorrow_low": 184.12,
  "tomorrow_close": 186.78
}
```

## Troubleshooting

### CORS Errors
- Make sure your FastAPI backend allows requests from `http://localhost:3000`
- Update the CORS middleware in your FastAPI app

### API Connection Failed
- Verify your FastAPI server is running on `http://localhost:8000`
- Check the console for detailed error messages
- Update the API URL in `prediction-dialog.tsx` if needed

### Stock Not Found
- Ensure your backend has data for the selected stock
- The model should handle training if no pre-trained model exists

## Building for Production

```bash
npm run build
npm run start
```

This creates an optimized production build and starts the production server.

## Notes

- This is a college project showcasing machine learning integration
- Predictions are for educational purposes only
- The system uses historical data to make predictions
- Past performance does not guarantee future results

## Support

For issues or questions about the frontend, check:
- Next.js documentation: https://nextjs.org/docs
- shadcn/ui documentation: https://ui.shadcn.com

For backend/ML model questions, refer to your FastAPI and scikit-learn documentation.
