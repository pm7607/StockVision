from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pickle
import os
import model   
import uvicorn

app = FastAPI()

# CORS FIX
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
    return {"message": "Stock Prediction API running"}

@app.post("/predict")
def predict(req: StockRequest):
    symbol = req.symbol.upper()
    safe_symbol = symbol.replace("^", "").replace(".", "_")
    model_path = f"models/{safe_symbol}.pkl"

    try:
        if os.path.exists(model_path):
            with open(model_path, "rb") as f:
                rf_model = pickle.load(f)
            _, df = model.train_model(symbol)
        else:
            rf_model, df = model.train_model(symbol)

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


if __name__ == "__main__":
    port = int(os.getenv("PORT", "8000"))
    uvicorn.run("app:app", host="0.0.0.0", port=port)