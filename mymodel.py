from model import train_model

if __name__ == "__main__":
    print("📈 Model Trainer")
    symbol = input("Enter stock symbol (example: RELIANCE.NS, ^NSEI, AAPL): ").strip()

    train_model(symbol)

    print(f"✅ Model trained and saved for: {symbol}")