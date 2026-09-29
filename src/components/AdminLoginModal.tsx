import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Lock, X, KeyRound, AlertCircle, ShieldCheck } from 'lucide-react';

export const AdminLoginModal: React.FC = () => {
  const { isAdminLoginModalOpen, setIsAdminLoginModalOpen, unlockAdmin } = useApp();
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  if (!isAdminLoginModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = unlockAdmin(pin);
    if (!success) {
      setError(true);
      setPin('');
    } else {
      setError(false);
      setPin('');
    }
  };

  const handleClose = () => {
    setIsAdminLoginModalOpen(false);
    setError(false);
    setPin('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-sm w-full shadow-2xl border border-slate-200 overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-900 text-white">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-indigo-400" />
            <span className="text-xs font-bold uppercase tracking-wider">
              Staff Portal Access
            </span>
          </div>
          <button
            onClick={handleClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="text-center space-y-1">
            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-2">
              <KeyRound className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Admin Authorization
            </h3>
            <p className="text-xs text-slate-500">
              Enter the merchant security PIN to access the vendor sourcing and manual fulfillment queue.
            </p>
          </div>

          <div className="space-y-1.5">
            <label className="block text-[11px] font-semibold text-slate-700">
              Security PIN
            </label>
            <input
              type="password"
              maxLength={12}
              autoFocus
              placeholder="••••••"
              value={pin}
              onChange={(e) => {
                setPin(e.target.value);
                if (error) setError(false);
              }}
              className={`w-full px-4 py-2.5 text-center text-lg tracking-widest font-mono bg-slate-50 border rounded-xl focus:outline-none focus:ring-2 ${
                error
                  ? 'border-rose-400 focus:ring-rose-400 bg-rose-50/30'
                  : 'border-slate-200 focus:ring-indigo-600'
              }`}
            />
            {error ? (
              <p className="text-[11px] text-rose-600 flex items-center gap-1 mt-1 justify-center">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Incorrect PIN. Please try again.</span>
              </p>
            ) : (
              <p className="text-[11px] text-slate-400 text-center">
                Authorized staff and merchant access only.
              </p>
            )}
          </div>

          <div className="pt-2 flex items-center gap-2">
            <button
              type="button"
              onClick={handleClose}
              className="w-1/2 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-1/2 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition-colors shadow-sm"
            >
              Unlock Hub
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
