import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  ShieldCheck, 
  Package, 
  Store, 
  RotateCcw, 
  Lock, 
  LogOut, 
  Sparkles,
  ShoppingBag
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    currentView, 
    setCurrentView, 
    unreadAdminAlertsCount, 
    resetDemoData,
    isAdminAuthenticated,
    setIsAdminLoginModalOpen,
    logoutAdmin
  } = useApp();

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      {/* Top Banner when Admin is Unlocked */}
      {isAdminAuthenticated && (
        <div className="bg-indigo-900 text-white text-[11px] px-4 py-1.5 flex items-center justify-between font-medium">
          <div className="flex items-center gap-2 max-w-7xl mx-auto w-full">
            <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
            <span>Staff Admin Mode Active · Authorized Merchant Fulfillment Desk</span>
            {unreadAdminAlertsCount > 0 && (
              <span className="bg-amber-500 text-slate-950 font-bold px-1.5 py-0.2 rounded text-[10px]">
                {unreadAdminAlertsCount} New Partial COD Orders
              </span>
            )}
            <div className="ml-auto flex items-center gap-3">
              <button
                onClick={logoutAdmin}
                className="text-indigo-200 hover:text-white flex items-center gap-1 font-semibold underline"
              >
                <LogOut className="w-3 h-3" />
                <span>Lock / Exit Admin</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Zone 1: Single text element wordmark */}
          <button
            onClick={() => setCurrentView('marketplace')}
            className="flex items-center gap-2.5 text-left group"
          >
            <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-sm">
              ₹
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight text-slate-900 group-hover:text-slate-700 transition-colors">
                Deals & EMI Aggregator
              </span>
            </div>
          </button>

          {/* Zone 2: Public Navigation Links ONLY (Admin tabs hidden from public!) */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <button
              onClick={() => setCurrentView('marketplace')}
              className={`flex items-center gap-1.5 transition-colors pb-1 border-b-2 ${
                currentView === 'marketplace'
                  ? 'border-slate-900 text-slate-900 font-semibold'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <Store className="w-4 h-4" />
              <span>Deals Hub</span>
            </button>

            <button
              onClick={() => setCurrentView('tracking')}
              className={`flex items-center gap-1.5 transition-colors pb-1 border-b-2 ${
                currentView === 'tracking'
                  ? 'border-slate-900 text-slate-900 font-semibold'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>Track Orders</span>
            </button>

            {/* Admin link ONLY visible if admin is authenticated via PIN */}
            {isAdminAuthenticated && (
              <button
                onClick={() => setCurrentView('admin')}
                className={`flex items-center gap-2 transition-colors pb-1 border-b-2 relative ${
                  currentView === 'admin'
                    ? 'border-indigo-600 text-indigo-700 font-semibold'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-indigo-600" />
                <span>Admin Sourcing Hub</span>
                {unreadAdminAlertsCount > 0 && (
                  <span className="inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-semibold text-white bg-amber-600 rounded">
                    {unreadAdminAlertsCount}
                  </span>
                )}
              </button>
            )}
          </nav>

          {/* Zone 3: Actions & Secret Admin Access */}
          <div className="flex items-center gap-3">
            <button
              onClick={resetDemoData}
              title="Reset sample orders & products"
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Demo</span>
            </button>

            {/* If Admin is logged in: show toggle button */}
            {isAdminAuthenticated ? (
              <button
                onClick={() => setCurrentView(currentView === 'admin' ? 'marketplace' : 'admin')}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-2 ${
                  currentView === 'admin'
                    ? 'bg-slate-900 text-white hover:bg-slate-800'
                    : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm'
                }`}
              >
                {currentView === 'admin' ? (
                  <>
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Customer Storefront</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Admin Fulfillment</span>
                  </>
                )}
              </button>
            ) : (
              /* Public View: Discreet Staff & Merchant Portal button */
              <button
                onClick={() => setIsAdminLoginModalOpen(true)}
                title="Staff & Merchant Portal Access"
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200/80 rounded-lg transition-colors border border-slate-200/60"
              >
                <Lock className="w-3.5 h-3.5 text-slate-400" />
                <span>Staff & Merchant Portal</span>
              </button>
            )}
          </div>
        </div>

        {/* Mobile Navigation bar */}
        <div className="md:hidden flex items-center justify-around py-2 border-t border-slate-100 text-xs">
          <button
            onClick={() => setCurrentView('marketplace')}
            className={`py-1 px-2 font-medium ${
              currentView === 'marketplace' ? 'text-slate-900 font-bold' : 'text-slate-500'
            }`}
          >
            Deals Hub
          </button>
          <button
            onClick={() => setCurrentView('tracking')}
            className={`py-1 px-2 font-medium ${
              currentView === 'tracking' ? 'text-slate-900 font-bold' : 'text-slate-500'
            }`}
          >
            Track Orders
          </button>
          {isAdminAuthenticated ? (
            <button
              onClick={() => setCurrentView('admin')}
              className={`py-1 px-2 font-medium flex items-center gap-1 ${
                currentView === 'admin' ? 'text-indigo-600 font-bold' : 'text-slate-500'
              }`}
            >
              Admin Sourcing
              {unreadAdminAlertsCount > 0 && (
                <span className="w-2 h-2 rounded-full bg-amber-500" />
              )}
            </button>
          ) : (
              <button
                onClick={() => setIsAdminLoginModalOpen(true)}
                className="py-1 px-2 font-medium text-slate-400 flex items-center gap-1"
              >
                <Lock className="w-3 h-3" />
                <span>Staff & Merchant</span>
              </button>
          )}
        </div>
      </div>
    </header>
  );
};
