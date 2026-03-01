# StockVision

AI/ML-powered stock price prediction platform with a FastAPI backend and Next.js frontend.

## 1) What is this project?

StockVision predicts the **next trading day** stock prices using a machine learning model.

- Input: stock symbol (example: `AAPL`, `RELIANCE.NS`, `^NSEI`)
- Output: predicted `Open`, `High`, `Low`, `Close` for tomorrow
- Backend serves prediction API
- Frontend provides a user-friendly interface to request and display predictions

> This project is built for educational/demo use. It is **not financial advice**.

## 2) Which languages and technologies are used?

### Languages
- Python (backend + ML)
- TypeScript (frontend)
- HTML/CSS via Next.js + Tailwind

### Backend
- FastAPI
- Uvicorn
- pandas
- yfinance
- scikit-learn (RandomForestRegressor)
- NumPy

### Frontend
- Next.js 13
- React 18
- Tailwind CSS
- shadcn/ui + Radix UI components

## 3) Live URLs

- Frontend (Vercel): https://stock-vision-eight.vercel.app/
- Backend API (Render): https://stockvisionpredication.onrender.com
- Prediction endpoint: https://stockvisionpredication.onrender.com/predict

## 4) Project structure

```
StockVision/
├── app.py                 # FastAPI app (API endpoints)
├── model.py               # ML training + latest market data fetch
├── mymodel.py             # CLI helper to train a model manually
├── requirements.txt       # Python dependencies
├── models/                # Saved trained models (.pkl)
└── frontend/              # Next.js frontend app
```

## 5) How to run on your computer (local setup)

### Prerequisites
- Python 3.9+ installed
- Node.js 18+ and npm installed

### A. Backend setup (FastAPI)

From project root:

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

Train a model once for a symbol (example: AAPL):

```bash
python mymodel.py
```

When prompted, enter a symbol (example `AAPL`).

Train all dropdown symbols in one run:

```bash
python train_all_models.py
```

This creates/updates model files inside `models/` for all configured symbols.

Start backend API:

```bash
uvicorn app:app --host 0.0.0.0 --port 8000
```

Test in browser:
- http://localhost:8000/
- http://localhost:8000/health

### B. Frontend setup (Next.js)

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

Open:
- http://localhost:3000

## 6) API details

### `POST /predict`

Request body:

```json
{
	"symbol": "AAPL"
}
```

Success response:

```json
{
	"symbol": "AAPL",
	"tomorrow_open": 185.23,
	"tomorrow_high": 187.45,
	"tomorrow_low": 184.12,
	"tomorrow_close": 186.78
}
```

Possible errors:
- `404`: model file for symbol does not exist (train first)
- `400`: invalid symbol or data/model issue

Indian ticker note:
- API auto-maps common Indian symbols to NSE format (for example `TCS` -> `TCS.NS`, `INFY` -> `INFY.NS`).

## 7) Deployment notes

### Render (Backend)
- Build command: `pip install -r requirements.txt`
- Start command: `uvicorn app:app --host 0.0.0.0 --port $PORT`

### Vercel (Frontend)
- Deploy from `frontend/` directory
- Frontend currently uses direct API endpoint for predictions

## 8) Troubleshooting

### Backend works in Postman but not in browser
- Check frontend is calling correct endpoint:
	`https://stockvisionpredication.onrender.com/predict`
- Check browser DevTools → Network for request/response errors

### `Model not found` error
- Train that symbol first using:
	```bash
	python mymodel.py
	```

### Render port error
- Ensure start command uses:
	`--host 0.0.0.0 --port $PORT`

## 9) Important note

Predictions are generated from historical market data and ML patterns. Real market behavior can change due to many external factors.
