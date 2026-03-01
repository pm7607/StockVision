import pandas as pd
import yfinance as yf
import pickle
import os
from sklearn.ensemble import RandomForestRegressor
from datetime import datetime

def train_model(symbol):
    today = pd.Timestamp(datetime.today().date())
    start_date = today - pd.DateOffset(years=6)

    df = yf.download(symbol, start=start_date, progress=False, threads=False)
    if df.empty:
        raise ValueError("Invalid stock symbol")

    df.reset_index(inplace=True)
    df = df[['Open', 'High', 'Low', 'Close', 'Volume']]
    df.dropna(inplace=True)

    X = df[['Open', 'High', 'Low', 'Close', 'Volume']]
    y = df[['Open', 'High', 'Low', 'Close']].shift(-1)

    X = X.iloc[:-1]
    y = y.iloc[:-1]

    model = RandomForestRegressor(
        n_estimators=300,
        max_depth=12,
        random_state=42,
        n_jobs=-1
    )

    model.fit(X, y)

    os.makedirs("models", exist_ok=True)
    safe_symbol = symbol.replace("^", "").replace(".", "_")
    with open(f"models/{safe_symbol}.pkl", "wb") as f:
        pickle.dump(model, f)

    return model


def get_latest_data(symbol):
    df = yf.download(symbol, period="10d", progress=False, threads=False)
    if df.empty:
        raise ValueError("No recent data found")

    df.reset_index(inplace=True)
    df = df[['Open', 'High', 'Low', 'Close', 'Volume']]
    df.dropna(inplace=True)

    return df