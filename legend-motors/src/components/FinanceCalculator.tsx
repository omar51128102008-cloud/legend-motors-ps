"use client";

import { useState, useMemo } from "react";
import { Calculator, Info } from "lucide-react";
import { formatPrice, calculateMonthlyPayment } from "@/lib/utils";

interface FinanceCalculatorProps {
  vehiclePrice?: number;
  compact?: boolean;
  onGetPreApproved?: () => void;
}

export default function FinanceCalculator({
  vehiclePrice = 30000,
  compact = false,
  onGetPreApproved,
}: FinanceCalculatorProps) {
  const [price, setPrice] = useState(vehiclePrice);
  const [downPaymentPct, setDownPaymentPct] = useState(20);
  const [term, setTerm] = useState(60);
  const [rate, setRate] = useState(6.5);

  const downPayment = (price * downPaymentPct) / 100;
  const principal = price - downPayment;

  const monthly = useMemo(
    () => calculateMonthlyPayment(principal, rate, term),
    [principal, rate, term],
  );
  const totalCost = monthly * term;
  const totalInterest = totalCost - principal;

  return (
    <div
      className={`bg-white border border-surface-200 rounded-2xl ${compact ? "p-5" : "p-6 sm:p-8"}`}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-500 flex items-center justify-center">
          <Calculator className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-bold text-surface-900">Payment Calculator</h3>
          <p className="text-xs text-surface-500">
            Estimate your monthly payments
          </p>
        </div>
      </div>

      <div className="space-y-5">
        {/* Vehicle Price */}
        {!compact && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-surface-700">
                Vehicle Price
              </label>
              <span className="text-sm font-semibold text-surface-900">
                {formatPrice(price)}
              </span>
            </div>
            <input
              type="range"
              min={5000}
              max={100000}
              step={500}
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-surface-400 mt-1">
              <span>$5,000</span>
              <span>$100,000</span>
            </div>
          </div>
        )}

        {/* Down Payment */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-surface-700">
              Down Payment
            </label>
            <span className="text-sm font-semibold text-surface-900">
              {downPaymentPct}% ({formatPrice(downPayment)})
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={50}
            step={5}
            value={downPaymentPct}
            onChange={(e) => setDownPaymentPct(Number(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-surface-400 mt-1">
            <span>0%</span>
            <span>50%</span>
          </div>
        </div>

        {/* Loan Term */}
        <div>
          <label className="text-sm font-medium text-surface-700 block mb-2">
            Loan Term
          </label>
          <div className="grid grid-cols-4 gap-2">
            {[36, 48, 60, 72].map((m) => (
              <button
                key={m}
                onClick={() => setTerm(m)}
                className={`py-2.5 rounded-lg text-sm font-medium transition-all ${
                  term === m
                    ? "bg-brand-500 text-white shadow-sm"
                    : "bg-surface-50 text-surface-600 hover:bg-surface-100 border border-surface-200"
                }`}
              >
                {m} mo
              </button>
            ))}
          </div>
        </div>

        {/* Interest Rate */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-surface-700">
              Interest Rate (APR)
            </label>
            <div className="flex items-center gap-1">
              <input
                type="number"
                min={0}
                max={25}
                step={0.1}
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                className="w-16 text-right text-sm font-semibold border border-surface-200 rounded-md px-2 py-1"
              />
              <span className="text-sm text-surface-500">%</span>
            </div>
          </div>
          <input
            type="range"
            min={0}
            max={20}
            step={0.5}
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            className="w-full"
          />
        </div>
      </div>

      {/* Results */}
      <div className="mt-6 pt-6 border-t border-surface-100">
        <div className="bg-surface-50 rounded-xl p-5 text-center mb-4">
          <p className="text-sm text-surface-500 mb-1">
            Estimated Monthly Payment
          </p>
          <p className="text-3xl sm:text-4xl font-bold text-surface-900">
            {formatPrice(Math.round(monthly))}
            <span className="text-base font-normal text-surface-400">/mo</span>
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="p-3 bg-surface-50 rounded-lg">
            <p className="text-xs text-surface-500 mb-0.5">Principal</p>
            <p className="text-sm font-semibold text-surface-800">
              {formatPrice(Math.round(principal))}
            </p>
          </div>
          <div className="p-3 bg-surface-50 rounded-lg">
            <p className="text-xs text-surface-500 mb-0.5">Total Interest</p>
            <p className="text-sm font-semibold text-surface-800">
              {formatPrice(Math.round(totalInterest))}
            </p>
          </div>
          <div className="p-3 bg-surface-50 rounded-lg">
            <p className="text-xs text-surface-500 mb-0.5">Total Cost</p>
            <p className="text-sm font-semibold text-surface-800">
              {formatPrice(Math.round(totalCost + downPayment))}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-2 mt-4 text-xs text-surface-400">
          <Info className="w-3.5 h-3.5 mt-0.5 shrink-0" />
          <p>
            This is an estimate only. Actual rates and terms depend on your
            credit profile and lender. Contact us for personalized financing.
          </p>
        </div>

        {onGetPreApproved && (
          <button
            onClick={onGetPreApproved}
            className="w-full mt-4 py-3 bg-brand-500 hover:bg-brand-600 text-white rounded-lg font-semibold transition-colors"
          >
            Get Pre-Approved
          </button>
        )}
      </div>
    </div>
  );
}
