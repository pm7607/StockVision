from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pickle
import os
from pathlib import Path
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


INDIAN_SYMBOL_ALIASES = {
    "TCS": "TCS.NS",
    "INFY": "INFY.NS",
    "RELIANCE": "RELIANCE.NS",
    "HDFCBANK": "HDFCBANK.NS",
    "ICICIBANK": "ICICIBANK.NS",
    "SBIN": "SBIN.NS",
    "ITC": "ITC.NS",
}


def canonical_symbol(symbol: str) -> str:
    normalized = symbol.upper().strip()
    return INDIAN_SYMBOL_ALIASES.get(normalized, normalized)


def _symbol_key(value: str) -> str:
    return value.upper().replace(".", "").replace("_", "").replace("^", "")


def resolve_model_path(symbol: str) -> str | None:
    models_dir = Path("models")
    if not models_dir.exists():
        return None

    normalized = symbol.upper().strip()
    candidates: list[str] = []

    def add_candidate(value: str):
        if value and value not in candidates:
            candidates.append(value)

    add_candidate(normalized)
    add_candidate(normalized.replace(".", "_"))
    add_candidate(normalized.replace(".", ""))

    if normalized.startswith("^"):
        no_caret = normalized[1:]
        add_candidate(no_caret)
        add_candidate(no_caret.replace(".", "_"))
        add_candidate(no_caret.replace(".", ""))

    if "." in normalized:
        base_symbol = normalized.split(".")[0]
        add_candidate(base_symbol)

    for candidate in candidates:
        candidate_path = models_dir / f"{candidate}.pkl"
        if candidate_path.exists():
            return str(candidate_path)

    requested_key = _symbol_key(normalized)
    for file_path in models_dir.glob("*.pkl"):
        if _symbol_key(file_path.stem) == requested_key:
            return str(file_path)

    return None

@app.get("/")
def home():
    return {"status": "Stock Prediction API Running"}

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/predict")
def predict(req: StockRequest):
    symbol = req.symbol.upper().strip()
    market_symbol = canonical_symbol(symbol)
    model_path = resolve_model_path(market_symbol)

    if not model_path:
        model_path = resolve_model_path(symbol)

    if not model_path or not os.path.exists(model_path):
        raise HTTPException(
            status_code=404,
            detail=f"Model for {symbol} not found. Train it first."
        )

    try:
        with open(model_path, "rb") as f:
            rf_model = pickle.load(f)

        df = model.get_latest_data(market_symbol)

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