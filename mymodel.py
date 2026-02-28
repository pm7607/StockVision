import pandas as pd
import yfinance as yf
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import r2_score
from datetime import datetime

def predict_tomorrow_price(symbol):
    # 🔹 1️⃣ Fixed start date: 6 years back from today
    today = pd.Timestamp(datetime.today().date())
    start_date = today - pd.DateOffset(years=6)

    # 2️⃣ Fetch historical data
    df = yf.download(symbol, start=start_date)
    df.reset_index(inplace=True)

    # 3️⃣ Keep required columns
    df = df[['Date', 'Open', 'High', 'Low', 'Close', 'Volume']]

    # 4️⃣ Datatype conversion
    df['Date'] = pd.to_datetime(df['Date'])
    num_cols = ['Open', 'High', 'Low', 'Close', 'Volume']
    df[num_cols] = df[num_cols].apply(pd.to_numeric, errors='coerce')

    # 5️⃣ Remove missing values
    df.dropna(inplace=True)

    # 6️⃣ Create tomorrow’s targets (OHLC)
    target_cols = ['Open', 'High', 'Low', 'Close']
    y = df[target_cols].shift(-1)
    X = df[['Open', 'High', 'Low', 'Close', 'Volume']]

    # Remove last row
    X = X.iloc[:-1]
    y = y.iloc[:-1]

    # 7️⃣ Time-series split
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, shuffle=False
    )

    # 8️⃣ Train Random Forest
    model = RandomForestRegressor(
        n_estimators=300,
        max_depth=12,
        random_state=42,
        n_jobs=-1
    )
    model.fit(X_train, y_train)

    # 9️⃣ Evaluation (R²)
    y_pred = model.predict(X_test)

    scores = {}
    for i, col in enumerate(target_cols):
        scores[col] = r2_score(y_test.iloc[:, i], y_pred[:, i])

    avg_r2 = sum(scores.values()) / len(scores)
    performance_percent = max(0, avg_r2) * 100

    # 🔟 Predict tomorrow
    last_day_data = df[['Open', 'High', 'Low', 'Close', 'Volume']].iloc[-1:].values
    tomorrow_prediction = model.predict(last_day_data)[0]

    return {
        "symbol": symbol,
        "start_date": str(start_date.date()),
        "r2_scores": scores,
        "performance_percent": performance_percent,
        "tomorrow_open": float(tomorrow_prediction[0]),
        "tomorrow_high": float(tomorrow_prediction[1]),
        "tomorrow_low": float(tomorrow_prediction[2]),
        "tomorrow_close": float(tomorrow_prediction[3]),
    }


# 🔽 Run from terminal
if __name__ == "__main__":
    print("📈 Stock Price Prediction (Next Day)")

    symbol = input("Enter stock symbol (e.g. ^NSEI, AAPL, RELIANCE.NS): ").strip()

    output = predict_tomorrow_price(symbol)

    print("\nModel Performance (R² Score):")
    for k, v in output["r2_scores"].items():
        print(f"{k}: {v:.3f}")

    print(f"\nOverall Model Performance: {output['performance_percent']:.2f}%")
    print("(Performance is measured using R², not accuracy)")

    print("\nPredicted Prices for Tomorrow:")
    print(f"Open : {output['tomorrow_open']:.2f}")
    print(f"High : {output['tomorrow_high']:.2f}")
    print(f"Low  : {output['tomorrow_low']:.2f}")
    print(f"Close: {output['tomorrow_close']:.2f}")
