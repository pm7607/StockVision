from model import train_model, model_file_symbol

SYMBOLS = [
    "AAPL",
    "MSFT",
    "GOOGL",
    "AMZN",
    "TSLA",
    "META",
    "NVDA",
    "JPM",
    "V",
    "MA",
    "NFLX",
    "DIS",
    "KO",
    "PEP",
    "NKE",
    "BA",
    "AMD",
    "INTC",
    "ORCL",
    "IBM",
    "WMT",
    "COST",
    "BABA",
    "TCS.NS",
    "INFY.NS",
    "RELIANCE.NS",
    "HDFCBANK.NS",
    "ICICIBANK.NS",
    "SBIN.NS",
    "ITC.NS",
]


def train_all(symbols: list[str]):
    total = len(symbols)
    succeeded: list[str] = []
    failed: list[tuple[str, str]] = []

    for index, symbol in enumerate(symbols, start=1):
        print(f"[{index}/{total}] Training {symbol}...")
        try:
            train_model(symbol)
            filename = f"models/{model_file_symbol(symbol)}.pkl"
            print(f"  ✅ Saved {filename}")
            succeeded.append(symbol)
        except Exception as error:
            print(f"  ❌ Failed {symbol}: {error}")
            failed.append((symbol, str(error)))

    print("\n================ SUMMARY ================")
    print(f"Total: {total}")
    print(f"Succeeded: {len(succeeded)}")
    print(f"Failed: {len(failed)}")

    if failed:
        print("\nFailed symbols:")
        for symbol, reason in failed:
            print(f"- {symbol}: {reason}")


if __name__ == "__main__":
    print("📦 Batch model training started")
    train_all(SYMBOLS)
