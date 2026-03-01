'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PredictionDialog } from '@/components/prediction-dialog';
import {
  TrendingUp,
  Brain,
  BarChart3,
  Target,
  Zap,
  Database,
  GitBranch,
  CheckCircle2,
  Activity,
} from 'lucide-react';

export default function Home() {
  const [dialogOpen, setDialogOpen] = useState(false);

  const features = [
    {
      icon: Brain,
      title: 'Forecasting Engine',
      description: 'Uses historical data patterns for price forecasting',
    },
    {
      icon: Database,
      title: 'Historical Data Analysis',
      description: 'Analyzes patterns from extensive historical stock data',
    },
    {
      icon: Target,
      title: 'Multi-Metric Prediction',
      description: 'Predicts Open, High, Low, and Close prices simultaneously',
    },
    {
      icon: Zap,
      title: 'Real-Time Processing',
      description: 'Fast predictions using pre-trained or on-demand training',
    },
  ];

  const modelSpecs = [
    {
      label: 'Algorithm',
      value: 'Random Forest Regressor',
    },
    {
      label: 'Input Features',
      value: 'Open, High, Low, Close, Volume',
    },
    {
      label: 'Output Predictions',
      value: 'Tomorrow\'s OHLC Prices',
    },
    {
      label: 'Backend',
      value: 'FastAPI',
    },
    {
      label: 'Model Storage',
      value: 'Pickle (.pkl)',
    },
    {
      label: 'Frontend',
      value: 'Next.js + TypeScript',
    },
  ];

  const methodology = [
    'Data Collection: Fetches historical stock data for training',
    'Feature Engineering: Uses OHLC (Open, High, Low, Close) and Volume',
    'Model Training: Random Forest algorithm learns patterns from historical data',
    'Prediction: Uses last trading day\'s data to predict tomorrow\'s prices',
    'Model Caching: Saves trained models for faster subsequent predictions',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-gradient-to-br from-blue-600 to-teal-600 rounded-lg flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">Stock Price Predictor</h1>
                <p className="text-xs text-slate-600">Data-Driven Financial Forecasting</p>
            </div>
          </div>
          <Button
            onClick={() => setDialogOpen(true)}
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700"
          >
            <TrendingUp className="mr-2 h-5 w-5" />
            Predict Stock Price
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 space-y-16">
        <section className="text-center space-y-6 py-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
            <Activity className="h-4 w-4" />
            Data-Driven Stock Prediction Platform
          </div>
          <h2 className="text-5xl font-bold text-slate-900 leading-tight">
            Stock Price Prediction System
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            A data-driven system that predicts tomorrow's stock prices
            using historical market data and proven forecasting methods.
          </p>
          <div className="flex gap-4 justify-center pt-4">
            <Button
              onClick={() => setDialogOpen(true)}
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 h-14 px-8 text-lg"
            >
              <TrendingUp className="mr-2 h-6 w-6" />
              Try Prediction Now
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="h-14 px-8 text-lg"
              onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <BarChart3 className="mr-2 h-5 w-5" />
              Learn More
            </Button>
          </div>
        </section>

        <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border-2 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="h-12 w-12 bg-gradient-to-br from-blue-100 to-teal-100 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </section>

        <section id="how-it-works" className="space-y-8">
          <div className="text-center space-y-4">
            <h3 className="text-3xl font-bold text-slate-900">How It Works</h3>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Our system processes historical market data to deliver reliable predictions
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-2">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <GitBranch className="h-6 w-6 text-blue-600" />
                  <CardTitle>Methodology</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {methodology.map((step, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="flex-shrink-0 h-6 w-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm">
                      {index + 1}
                    </div>
                    <p className="text-slate-700 leading-relaxed">{step}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Brain className="h-6 w-6 text-teal-600" />
                  <CardTitle>Model Specifications</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {modelSpecs.map((spec, index) => (
                  <div key={index} className="space-y-1">
                    <p className="text-sm font-medium text-slate-500">{spec.label}</p>
                    <p className="text-base font-semibold text-slate-900">{spec.value}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="space-y-8">
          <div className="text-center space-y-4">
            <h3 className="text-3xl font-bold text-slate-900">Key Features</h3>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Built with modern technologies for optimal performance and accuracy
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardHeader>
                <CheckCircle2 className="h-8 w-8 text-blue-600 mb-2" />
                <CardTitle>Smart Model Caching</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700 leading-relaxed">
                  Pre-trained models are saved and reused for faster predictions,
                  reducing computation time significantly.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-teal-50 to-teal-100 border-teal-200">
              <CardHeader>
                <CheckCircle2 className="h-8 w-8 text-teal-600 mb-2" />
                <CardTitle>Searchable Stock Selection</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700 leading-relaxed">
                  Easy-to-use dropdown with search functionality prevents errors
                  when selecting stock symbols.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <CardHeader>
                <CheckCircle2 className="h-8 w-8 text-green-600 mb-2" />
                <CardTitle>RESTful API</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700 leading-relaxed">
                  FastAPI backend provides fast, reliable predictions with proper
                  error handling and validation.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="bg-gradient-to-r from-blue-600 to-teal-600 rounded-2xl p-12 text-center text-white space-y-6">
          <h3 className="text-3xl font-bold">Ready to Predict Stock Prices?</h3>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Try our forecasting system and get tomorrow's price predictions instantly
          </p>
          <Button
            onClick={() => setDialogOpen(true)}
            size="lg"
            variant="secondary"
            className="h-14 px-8 text-lg"
          >
            <TrendingUp className="mr-2 h-6 w-6" />
            Start Prediction
          </Button>
        </section>
      </main>

      <footer className="border-t bg-white mt-16">
        <div className="container mx-auto px-4 py-8 text-center text-slate-600">
          <p className="text-sm">
            Stock Price Prediction System | Developed by Pratik Mehta | © 2024 All rights reserved.
          </p>
          <p className="text-xs mt-2 text-slate-500">
            Forecasting engine based on Random Forest | Built with Next.js & FastAPI
          </p>
        </div>
      </footer>

      <PredictionDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </div>
  );
}
