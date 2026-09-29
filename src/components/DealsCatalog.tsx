import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { DealItem } from '../types';
import { ShieldAlert, ArrowRight, Zap, CheckCircle2, Calculator } from 'lucide-react';

export const DealsCatalog: React.FC = () => {
  const { deals, setSelectedDealForCheckout, setSelectedDealForEmi } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Smartphones', 'Gaming', 'Television', 'Laptops'];

  const filteredDeals = deals.filter((deal) => {
    const matchesCat = selectedCategory === 'All' || deal.category === selectedCategory;
    const matchesSearch =
      deal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      deal.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      deal.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Section */}
      <section className="bg-slate-900 text-white rounded-2xl p-6 sm:p-10 relative overflow-hidden shadow-sm">
        <div className="max-w-2xl relative z-10 space-y-4">
          <div className="text-xs uppercase tracking-widest text-indigo-400 font-semibold">
            Aggregated Deals & Smart Security Model
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            Best Market Deals with <span className="text-indigo-400">10% Partial COD</span> or Instant 0% EMI.
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Reserve any high-ticket gadget with just a 10% advance security deposit. Pay the remaining 90% balance to the courier delivery executive via Cash or UPI upon physical inspection.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>10% Advance Booking Fee</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>90% Cash on Delivery</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>0% Pure COD Fraud Shield</span>
            </div>
          </div>
        </div>

        {/* Subtle decorative background graphic */}
        <div className="absolute -right-10 -bottom-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      </section>

      {/* Strict Security Policy Notice (Step 2 of requirement) */}
      <section className="bg-amber-50/80 border border-amber-200/80 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-amber-100 rounded-lg shrink-0 mt-0.5 sm:mt-0 text-amber-800">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <div className="text-sm font-bold text-amber-900">
              Zero Pure COD Policy & 10% Advance Security Protocol
            </div>
            <p className="text-xs text-amber-800 leading-relaxed max-w-3xl">
              To eliminate fake addresses and non-serious orders, <strong>Pure COD (0% advance) is strictly disabled</strong>. You only pay 10% online to guarantee stock allocation and dispatch. The 10% deposit is non-refundable if delivery is rejected without valid reason to cover courier handling costs.
            </p>
          </div>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 p-1 bg-slate-200/70 rounded-xl overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder="Search phones, gaming, laptops..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-72 px-3.5 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent text-slate-900 placeholder:text-slate-400"
          />
        </div>
      </section>

      {/* Featured Deals Grid */}
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredDeals.map((deal) => {
            const deposit10 = Math.round(deal.dealPrice * 0.1);
            const remaining90 = deal.dealPrice - deposit10;
            const lowestEmi = deal.emiPlans && deal.emiPlans.length > 0 ? deal.emiPlans[0] : null;
            const savings = deal.mrp - deal.dealPrice;
            const savingsPercent = Math.round((savings / deal.mrp) * 100);

            return (
              <article
                key={deal.id}
                className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden flex flex-col hover:border-slate-300 hover:shadow-md transition-all group"
              >
                {/* Product Image Slot */}
                <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                  <img
                    src={deal.image}
                    alt={deal.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      // Fallback container
                      (e.currentTarget as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&auto=format&fit=crop&q=80';
                    }}
                  />
                  {deal.highlightBadge && (
                    <div className="absolute top-3 left-3 bg-slate-900/90 text-white text-[11px] font-medium px-2.5 py-1 rounded-md backdrop-blur-sm">
                      {deal.highlightBadge}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    {/* Unboxed clean metadata */}
                    <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                      <span>{deal.brand}</span>
                      <span aria-hidden="true">·</span>
                      <span>{deal.category}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-emerald-600 font-semibold">In Stock</span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 line-clamp-2 leading-snug">
                      {deal.title}
                    </h3>

                    {/* Price Block */}
                    <div className="pt-1 flex items-baseline gap-2.5">
                      <span className="text-xl font-extrabold text-slate-900 tabular-nums">
                        ₹{deal.dealPrice.toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs text-slate-400 line-through tabular-nums">
                        ₹{deal.mrp.toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs font-semibold text-emerald-600">
                        {savingsPercent}% OFF
                      </span>
                    </div>
                  </div>

                  {/* Partial COD & EMI Breakdown Box */}
                  <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-100 space-y-2.5 text-xs">
                    {/* Partial COD breakdown */}
                    <div className="flex items-center justify-between pb-2 border-b border-slate-200/60">
                      <span className="text-slate-600 font-medium flex items-center gap-1">
                        <Zap className="w-3.5 h-3.5 text-amber-500" />
                        10% Partial COD Booking:
                      </span>
                      <span className="font-bold text-indigo-700 tabular-nums">
                        Pay ₹{deposit10.toLocaleString('en-IN')} Now
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500 flex justify-between">
                      <span>Remaining 90% at Doorstep:</span>
                      <span className="font-semibold text-slate-700 tabular-nums">
                        ₹{remaining90.toLocaleString('en-IN')} (Cash/UPI)
                      </span>
                    </div>

                    {/* Instant EMI preview */}
                    {lowestEmi && (
                      <div className="pt-1 flex items-center justify-between text-[11px] text-slate-600">
                        <span>Instant EMI available:</span>
                        <button
                          onClick={() => setSelectedDealForEmi(deal)}
                          className="text-indigo-600 font-semibold hover:underline flex items-center gap-1"
                        >
                          From ₹{lowestEmi.perMonth.toLocaleString('en-IN')}/mo
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Action buttons */}
                  <div className="pt-2 grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setSelectedDealForEmi(deal)}
                      className="w-full py-2.5 px-3 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Calculator className="w-3.5 h-3.5" />
                      <span>EMI Plans</span>
                    </button>

                    <button
                      onClick={() => setSelectedDealForCheckout(deal)}
                      className="w-full py-2.5 px-3 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-colors flex items-center justify-center gap-1 shadow-sm"
                    >
                      <span>Checkout</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Sourcing Model Explanation for Customers */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
        <h2 className="text-lg font-bold text-slate-900">
          How Deals & EMI Aggregator Works (Partial COD Model)
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm">
          <div className="space-y-2 p-4 bg-slate-50 rounded-xl border border-slate-100">
            <div className="w-7 h-7 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
              01
            </div>
            <div className="font-bold text-slate-900 text-sm">Select Payment Choice</div>
            <p className="text-slate-600 leading-relaxed text-xs">
              Choose either <strong>100% Full Payment / Instant EMI</strong> for immediate dispatch, or <strong>10% Partial COD</strong> where you only pay a 10% advance security booking fee online.
            </p>
          </div>

          <div className="space-y-2 p-4 bg-slate-50 rounded-xl border border-slate-100">
            <div className="w-7 h-7 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
              02
            </div>
            <div className="font-bold text-slate-900 text-sm">Strict Anti-Fraud Guarantee</div>
            <p className="text-slate-600 leading-relaxed text-xs">
              Pure 0% COD is disabled to protect genuine buyers from out-of-stock hoarding. The 10% deposit ensures guaranteed allocation and courier booking to your pincode.
            </p>
          </div>

          <div className="space-y-2 p-4 bg-slate-50 rounded-xl border border-slate-100">
            <div className="w-7 h-7 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
              03
            </div>
            <div className="font-bold text-slate-900 text-sm">Pay Balance to Courier</div>
            <p className="text-slate-600 leading-relaxed text-xs">
              Our fulfillment team books the product with the cheapest verified vendor with COD. When the courier arrives, pay the remaining 90% via Cash or UPI QR scan!
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
