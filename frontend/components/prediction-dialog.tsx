'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Check, ChevronsUpDown, TrendingUp, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { popularStocks } from '@/lib/stocks';

interface PredictionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface PredictionResult {
  symbol: string;
  tomorrow_open: number;
  tomorrow_high: number;
  tomorrow_low: number;
  tomorrow_close: number;
}

export function PredictionDialog({ open, onOpenChange }: PredictionDialogProps) {
  const [selectedStock, setSelectedStock] = useState('');
  const [comboOpen, setComboOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [error, setError] = useState('');
  const apiBaseUrl = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000').replace(/\/$/, '');

  const handlePredict = async () => {
    if (!selectedStock) {
      setError('Please select a stock');
      return;
    }

    setLoading(true);
    setError('');
    setPrediction(null);

    try {
      const response = await fetch(`${apiBaseUrl}/predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ symbol: selectedStock }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Prediction failed');
      }

      const data = await response.json();
      setPrediction(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch prediction');
    } finally {
      setLoading(false);
    }
  };

  const selectedStockInfo = popularStocks.find(
    (stock) => stock.symbol === selectedStock
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-green-600" />
            Stock Price Prediction
          </DialogTitle>
          <DialogDescription>
            Select a stock symbol to predict tomorrow's prices using our
            machine learning model.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Select Stock Symbol</label>
            <Popover open={comboOpen} onOpenChange={setComboOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={comboOpen}
                  className="w-full justify-between"
                >
                  {selectedStock
                    ? `${selectedStock} - ${selectedStockInfo?.name}`
                    : 'Search for a stock...'}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[550px] p-0">
                <Command>
                  <CommandInput placeholder="Search stock symbol or name..." />
                  <CommandList>
                    <CommandEmpty>No stock found.</CommandEmpty>
                    <CommandGroup>
                      {popularStocks.map((stock) => (
                        <CommandItem
                          key={stock.symbol}
                          value={`${stock.symbol} ${stock.name}`}
                          onSelect={() => {
                            setSelectedStock(stock.symbol);
                            setComboOpen(false);
                            setPrediction(null);
                            setError('');
                          }}
                        >
                          <Check
                            className={cn(
                              'mr-2 h-4 w-4',
                              selectedStock === stock.symbol
                                ? 'opacity-100'
                                : 'opacity-0'
                            )}
                          />
                          <div className="flex flex-col">
                            <span className="font-semibold">{stock.symbol}</span>
                            <span className="text-sm text-muted-foreground">
                              {stock.name}
                            </span>
                          </div>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          {prediction && (
            <div className="space-y-4 p-6 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg border border-green-200">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                Prediction Results for {prediction.symbol}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <p className="text-sm text-muted-foreground">Tomorrow's Open</p>
                  <p className="text-2xl font-bold text-green-600">
                    ${prediction.tomorrow_open.toFixed(2)}
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <p className="text-sm text-muted-foreground">Tomorrow's High</p>
                  <p className="text-2xl font-bold text-blue-600">
                    ${prediction.tomorrow_high.toFixed(2)}
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <p className="text-sm text-muted-foreground">Tomorrow's Low</p>
                  <p className="text-2xl font-bold text-orange-600">
                    ${prediction.tomorrow_low.toFixed(2)}
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <p className="text-sm text-muted-foreground">Tomorrow's Close</p>
                  <p className="text-2xl font-bold text-teal-600">
                    ${prediction.tomorrow_close.toFixed(2)}
                  </p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground text-center pt-2">
                Predictions are based on historical data and machine learning models.
                Past performance does not guarantee future results.
              </p>
            </div>
          )}

          <Button
            onClick={handlePredict}
            disabled={loading || !selectedStock}
            className="w-full h-12 text-base"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <TrendingUp className="mr-2 h-5 w-5" />
                Predict Stock Price
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
