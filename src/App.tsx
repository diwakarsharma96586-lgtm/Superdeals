import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { DealsCatalog } from './components/DealsCatalog';
import { AdminDashboard } from './components/AdminDashboard';
import { OrderTrackingView } from './components/OrderTrackingView';
import { CheckoutModal } from './components/CheckoutModal';
import { EmiModal } from './components/EmiModal';
import { AddDealModal } from './components/AddDealModal';
import { Plus, Shield, PackageCheck, Zap } from 'lucide-react';

const AppContent: React.FC = () => {
  const { currentView, setCurrentView } = useApp();
  const [isAddDealOpen, setIsAddDealOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-slate-900 selection:text-white">
      {/* Top Bar following contract */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        {currentView === 'marketplace' && <DealsCatalog />}
        {currentView === 'admin' && <AdminDashboard />}
        {currentView === 'tracking' && <OrderTrackingView />}
      </main>

      {/* Admin Quick Action Button when on Admin View */}
      {currentView === 'admin' && (
        <div className="fixed bottom-6 right-6 z-30">
          <button
            onClick={() => setIsAddDealOpen(true)}
            className="flex items-center gap-2 px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-full shadow-lg hover:shadow-xl transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>List New Deal</span>
          </button>
        </div>
      )}

      {/* Interactive Modals */}
      <CheckoutModal />
      <EmiModal />
      <AddDealModal isOpen={isAddDealOpen} onClose={() => setIsAddDealOpen(false)} />

      {/* Clean Footnote & Trust Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800">Deals & EMI Aggregator</span>
            <span>·</span>
            <span>10% Partial COD Security Protocol</span>
          </div>

          <div className="text-center sm:text-right text-[11px] text-slate-400">
            Strict Zero Pure COD Anti-Fraud Policy · Verified Vendor Sourcing (Amazon / Flipkart / Wholesalers)
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
