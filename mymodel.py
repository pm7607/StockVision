from model import train_model, model_file_symbol

if __name__ == "__main__":
    print("📈 Model Trainer")
    symbol = input("Enter stock symbol (example: RELIANCE.NS, ^NSEI, AAPL): ").strip()

    train_model(symbol)

    saved_name = model_file_symbol(symbol)
    print(f"✅ Model trained and saved for: {symbol.upper()} (models/{saved_name}.pkl)")