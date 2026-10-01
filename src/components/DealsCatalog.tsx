import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { DealItem } from '../types';
import { 
  ShieldAlert, 
  ArrowRight, 
  Zap, 
  CheckCircle2, 
  Calculator, 
  Percent, 
  Sparkles,
  RefreshCw
} from 'lucide-react';
import { 
  MAJOR_CATEGORIES, 
  CATEGORY_DEFAULT_IMAGES, 
  normalizeCategory 
} from '../data/mockDeals';
import { ProductImage } from './ProductImage';

export const DealsCatalog: React.FC = () => {
  const { deals, setSelectedDealForCheckout, setSelectedDealForEmi, refreshLiveDeals } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshToast, setRefreshToast] = useState<string | null>(null);

  const categories = MAJOR_CATEGORIES;

  // Rule: Only products with greater than 8% discount (MRP vs Deal Price) are shown
  const filteredDeals = deals.filter((deal) => {
    const discountPercentage = ((deal.mrp - deal.dealPrice) / deal.mrp) * 100;
    if (discountPercentage <= 8) return false;

    const normalizedCat = normalizeCategory(deal.category);
    const matchesCat = selectedCategory === 'All' || normalizedCat === selectedCategory || deal.category === selectedCategory;

    const matchesSearch =
      deal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      deal.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      deal.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      normalizedCat.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCat && matchesSearch;
  });

  const handleRefreshDeals = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      const res = refreshLiveDeals();
      setIsRefreshing(false);
      setRefreshToast(
        `✅ Refreshed ${res.addedCount} fresh trending deals across all 6 major categories with >8% discount!`
      );
      setTimeout(() => setRefreshToast(null), 4500);
    }, 600);
  };

  return (
    <div className="space-y-10 pb-16">
      {/* Hero Section */}
      <section className="bg-slate-900 text-white rounded-2xl p-6 sm:p-10 relative overflow-hidden shadow-sm">
        <div className="max-w-2xl relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-indigo-400 font-semibold bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-400/20">
            <Percent className="w-3.5 h-3.5 text-indigo-400" />
            <span>Curated High-Discount Filter (&gt;8% Off Guaranteed)</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            Best Market Deals with <span className="text-indigo-400">10% Partial COD</span> or Instant 0% EMI.
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Reserve any high-ticket gadget with just a 10% advance security deposit. Pay the remaining 90% balance to the courier delivery executive via Cash or UPI upon physical delivery.
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
              <span>Only Verified Discounts &gt;8%</span>
            </div>
          </div>
        </div>

        {/* Subtle decorative background graphic */}
        <div className="absolute -right-10 -bottom-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      </section>

      {/* Strict Security Policy Notice */}
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

      {/* Real-time Refresh Toast */}
      {refreshToast && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 text-xs flex items-center justify-between shadow-xs animate-in fade-in-50 duration-200">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="font-semibold">{refreshToast}</span>
          </div>
          <button
            onClick={() => setRefreshToast(null)}
            className="text-xs font-bold text-emerald-700 underline hover:text-emerald-900"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Filter and Search Bar with Major Category selection */}
      <section className="space-y-3">
        <div className="flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-4">
          {/* 6 Major Categories */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-200/70 rounded-xl overflow-x-auto max-w-full">
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

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={handleRefreshDeals}
              disabled={isRefreshing}
              className="px-3.5 py-2 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-700 text-xs font-bold rounded-xl transition-all shadow-xs flex items-center gap-1.5 whitespace-nowrap"
              title="Refresh and fetch multi-category deals (>8% discount)"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-indigo-600 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>{isRefreshing ? 'Fetching...' : 'Refresh Deals Feed'}</span>
            </button>

            <input
              type="text"
              placeholder="Search mobiles, laptops, audio..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-64 px-3.5 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent text-slate-900 placeholder:text-slate-400 shadow-2xs"
            />
          </div>
        </div>

        {/* Live Filter Metric Indicator */}
        <div className="flex items-center justify-between text-xs text-slate-500 px-1">
          <div className="flex items-center gap-1.5 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>Showing {filteredDeals.length} curated product(s) qualifying for &gt;8% deal discount in {selectedCategory}</span>
          </div>
        </div>
      </section>

      {/* Featured Deals Grid */}
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDeals.map((deal) => {
            const deposit10 = Math.round(deal.dealPrice * 0.1);
            const remaining90 = deal.dealPrice - deposit10;
            const lowestEmi = deal.emiPlans && deal.emiPlans.length > 0 ? deal.emiPlans[0] : null;
            const savings = deal.mrp - deal.dealPrice;
            const savingsPercent = Math.round((savings / deal.mrp) * 100);
            const displayCategory = normalizeCategory(deal.category);

            return (
              <div
                key={deal.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg hover:border-slate-300 transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Product Image with fixed aspect ratio, contain styling, and error fallback */}
                  <ProductImage
                    src={deal.image}
                    alt={deal.title}
                    category={deal.category}
                    aspectRatio="aspect-[4/3]"
                    containerClassName="border-b border-slate-100 group-hover:scale-[1.02] transition-transform duration-300"
                    badge={
                      <>
                        {/* Verified Discount Badge */}
                        <div className="absolute top-3 left-3 bg-emerald-600 text-white font-bold text-[11px] px-2.5 py-1 rounded-md shadow-xs flex items-center gap-1 z-10">
                          <Percent className="w-3 h-3" />
                          <span>{savingsPercent}% OFF</span>
                        </div>

                        {deal.highlightBadge && (
                          <div className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-medium px-2 py-0.5 rounded z-10">
                            {deal.highlightBadge}
                          </div>
                        )}
                      </>
                    }
                  />

                  {/* Body Content */}
                  <div className="p-4 space-y-3">
                    <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium">
                      <span>{deal.brand}</span>
                      <span className="text-slate-400">·</span>
                      <span className="text-slate-600 font-semibold">{displayCategory}</span>
                    </div>

                    <h3 className="font-bold text-slate-900 text-sm line-clamp-2 leading-snug group-hover:text-indigo-600 transition-colors">
                      {deal.title}
                    </h3>

                    {/* Price Block */}
                    <div className="space-y-0.5">
                      <div className="flex items-baseline gap-2">
                        <span className="text-lg font-extrabold text-slate-900 tabular-nums">
                          ₹{deal.dealPrice.toLocaleString('en-IN')}
                        </span>
                        <span className="text-xs text-slate-400 line-through tabular-nums">
                          ₹{deal.mrp.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <div className="text-[11px] text-emerald-600 font-medium">
                        Save ₹{savings.toLocaleString('en-IN')} ({savingsPercent}% Off)
                      </div>
                    </div>

                    {/* 10% Partial COD Highlights */}
                    <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-600 font-medium flex items-center gap-1">
                          <Zap className="w-3.5 h-3.5 text-amber-500" />
                          <span>10% Advance Deposit:</span>
                        </span>
                        <span className="font-extrabold text-indigo-700 tabular-nums">
                          ₹{deposit10.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-200/50">
                        <span>Balance on Delivery (COD):</span>
                        <span className="font-medium text-slate-700 tabular-nums">
                          ₹{remaining90.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>

                    {/* Lowest EMI Option Display */}
                    {lowestEmi && (
                      <div className="flex items-center justify-between text-[11px] text-slate-600 pt-1 px-1">
                        <span className="flex items-center gap-1">
                          <Calculator className="w-3 h-3 text-slate-400" />
                          <span>0% No-Cost EMI from</span>
                        </span>
                        <span className="font-bold text-slate-900">
                          ₹{lowestEmi.perMonth.toLocaleString('en-IN')}/mo
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="p-4 pt-0 space-y-2">
                  <button
                    onClick={() => setSelectedDealForCheckout(deal)}
                    className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5"
                  >
                    <span>Book with 10% Partial COD</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => setSelectedDealForEmi(deal)}
                    className="w-full py-2 px-4 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>View All EMI Plans (HDFC / Bajaj)</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
