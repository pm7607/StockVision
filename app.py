from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pickle
import os
import model

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class StockRequest(BaseModel):
    symbol: str

@app.get("/")
def home():
    return {"status": "Stock Prediction API Running"}

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/predict")
def predict(req: StockRequest):
    symbol = req.symbol.upper()
    safe_symbol = symbol.replace("^", "").replace(".", "_")
    model_path = f"models/{safe_symbol}.pkl"

    if not os.path.exists(model_path):
        raise HTTPException(
            status_code=404,
            detail=f"Model for {symbol} not found. Train it first."
        )

    try:
        with open(model_path, "rb") as f:
            rf_model = pickle.load(f)

        df = model.get_latest_data(symbol)

        last_row = df[['Open', 'High', 'Low', 'Close', 'Volume']].iloc[-1:].values
        prediction = rf_model.predict(last_row)[0]

        return {
            "symbol": symbol,
            "tomorrow_open": float(prediction[0]),
            "tomorrow_high": float(prediction[1]),
            "tomorrow_low": float(prediction[2]),
            "tomorrow_close": float(prediction[3]),
        }

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))