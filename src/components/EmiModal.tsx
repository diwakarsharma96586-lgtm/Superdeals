import React from 'react';
import { useApp } from '../context/AppContext';
import { X, Calculator, ArrowRight, ShieldCheck, Check } from 'lucide-react';

export const EmiModal: React.FC = () => {
  const { selectedDealForEmi, setSelectedDealForEmi, setSelectedDealForCheckout } = useApp();

  const deal = selectedDealForEmi;
  if (!deal) return null;

  const handleSelectPlanAndCheckout = () => {
    const dealToBuy = deal;
    setSelectedDealForEmi(null);
    setSelectedDealForCheckout(dealToBuy);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-xl w-full my-auto shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <Calculator className="w-4 h-4 text-indigo-600" />
            <span className="text-sm font-bold text-slate-900">
              Instant EMI Plans & Aggregator Calculator
            </span>
          </div>
          <button
            onClick={() => setSelectedDealForEmi(null)}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 text-xs">
          {/* Product Mini Header */}
          <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
            <img
              src={deal.image}
              alt={deal.title}
              className="w-14 h-12 object-cover rounded-lg bg-slate-100"
            />
            <div>
              <h4 className="font-bold text-slate-900 line-clamp-1">{deal.title}</h4>
              <div className="text-slate-500 text-[11px]">
                Deal Price: <span className="font-bold text-slate-900 tabular-nums">₹{deal.dealPrice.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
              Available Bank & FinTech EMI Tenures
            </div>

            <div className="space-y-2.5">
              {deal.emiPlans.map((plan) => (
                <div
                  key={plan.months}
                  className="p-3.5 rounded-xl border border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/20 transition-all flex items-center justify-between"
                >
                  <div className="space-y-0.5">
                    <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                      <span>{plan.months} Months Tenure</span>
                      {plan.isNoCost && (
                        <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                          0% No-Cost EMI
                        </span>
                      )}
                    </div>
                    <div className="text-slate-500 text-[11px]">
                      Partner: {plan.provider} · Interest: {plan.interestRate}% p.a.
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-base font-extrabold text-indigo-700 tabular-nums">
                      ₹{plan.perMonth.toLocaleString('en-IN')}<span className="text-xs font-normal text-slate-500">/mo</span>
                    </div>
                    <div className="text-[10px] text-slate-400">
                      Total: ₹{(plan.perMonth * plan.months).toLocaleString('en-IN')}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-slate-600 text-[11px] space-y-1">
            <div className="font-semibold text-slate-900 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
              Instant Digital Approval
            </div>
            <p>
              Pre-approved credit card or Bajaj Insta EMI card is debited monthly. No physical paperwork required. Instant confirmation during checkout!
            </p>
          </div>

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              onClick={() => setSelectedDealForEmi(null)}
              className="px-4 py-2 text-slate-600 font-semibold"
            >
              Cancel
            </button>
            <button
              onClick={handleSelectPlanAndCheckout}
              className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
