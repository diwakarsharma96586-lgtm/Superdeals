import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Order } from '../types';
import { 
  Package, 
  ExternalLink, 
  CheckCircle2, 
  Clock, 
  Truck, 
  ShieldAlert, 
  Printer, 
  ArrowLeft,
  Banknote,
  QrCode,
  Search,
  KeyRound,
  Phone,
  AlertCircle
} from 'lucide-react';

export const OrderTrackingView: React.FC = () => {
  const { orders, activeTrackingOrderId, setActiveTrackingOrderId, setCurrentView } = useApp();

  const [inputOrderId, setInputOrderId] = useState('');
  const [inputPhone, setInputPhone] = useState('');
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  // If activeTrackingOrderId was set recently (e.g. from checkout), auto-load that order
  useEffect(() => {
    if (activeTrackingOrderId) {
      const match = orders.find((o) => o.id.toLowerCase() === activeTrackingOrderId.toLowerCase());
      if (match) {
        setInputOrderId(match.id);
        const cleanPhone = match.customer.phone.replace(/\D/g, '').slice(-10);
        setInputPhone(cleanPhone);
        setSearchedOrder(match);
        setHasSearched(true);
      }
    }
  }, [activeTrackingOrderId, orders]);

  const cleanNumber = (val: string) => val.replace(/\D/g, '').slice(-10);

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchError(null);
    setHasSearched(true);

    const trimmedId = inputOrderId.trim().toUpperCase();
    const cleanedInputPhone = cleanNumber(inputPhone);

    if (!trimmedId) {
      setSearchError('Please enter your Order ID (e.g. ORD-98421).');
      setSearchedOrder(null);
      return;
    }

    if (!cleanedInputPhone || cleanedInputPhone.length < 10) {
      setSearchError('Please enter your 10-digit mobile number registered at checkout.');
      setSearchedOrder(null);
      return;
    }

    const found = orders.find((ord) => {
      const orderMatch = ord.id.toUpperCase() === trimmedId;
      const orderPhoneClean = cleanNumber(ord.customer.phone);
      return orderMatch && orderPhoneClean === cleanedInputPhone;
    });

    if (found) {
      setSearchedOrder(found);
      setActiveTrackingOrderId(found.id);
      setSearchError(null);
    } else {
      setSearchedOrder(null);
      setSearchError(
        `No matching order found for ${trimmedId} with mobile ending in ${cleanedInputPhone.slice(-4)}. Please check your booking details.`
      );
    }
  };

  const handleQuickLoadDemo = (orderId: string, phone: string) => {
    setInputOrderId(orderId);
    setInputPhone(phone);
    const found = orders.find((o) => o.id === orderId);
    if (found) {
      setSearchedOrder(found);
      setActiveTrackingOrderId(found.id);
      setHasSearched(true);
      setSearchError(null);
    }
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <button
            onClick={() => setCurrentView('marketplace')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 mb-2 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Deals Hub</span>
          </button>
          <h1 className="text-2xl font-extrabold text-slate-900">
            Track Your Order
          </h1>
          <p className="text-xs text-slate-500">
            Enter your Order ID & registered phone number to view live dispatch status and E-Receipt
          </p>
        </div>
      </div>

      {/* Customer Order Search Form */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <form onSubmit={handleTrackSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                <KeyRound className="w-3.5 h-3.5 text-slate-500" />
                <span>Order ID</span>
              </label>
              <input
                type="text"
                value={inputOrderId}
                onChange={(e) => setInputOrderId(e.target.value)}
                placeholder="e.g. ORD-98421"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono uppercase focus:ring-2 focus:ring-slate-900 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-slate-500" />
                <span>Registered Mobile Number</span>
              </label>
              <input
                type="tel"
                value={inputPhone}
                onChange={(e) => setInputPhone(e.target.value)}
                placeholder="e.g. 9876543210"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-slate-900 focus:outline-none"
              />
            </div>
          </div>

          {searchError && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{searchError}</span>
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
            {/* Demo Helper for fast verification */}
            <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
              <span>Quick test:</span>
              <button
                type="button"
                onClick={() => handleQuickLoadDemo('ORD-98421', '9876543210')}
                className="px-2 py-0.5 bg-slate-100 hover:bg-slate-200 rounded text-slate-700 font-mono transition-colors"
              >
                ORD-98421 (PS5 Slim)
              </button>
              <button
                type="button"
                onClick={() => handleQuickLoadDemo('ORD-98435', '9123456789')}
                className="px-2 py-0.5 bg-slate-100 hover:bg-slate-200 rounded text-slate-700 font-mono transition-colors"
              >
                ORD-98435 (iPhone 15 Pro)
              </button>
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Track My Order</span>
            </button>
          </div>
        </form>
      </div>

      {/* Searched Order Details */}
      {searchedOrder && (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm animate-in fade-in-50 duration-300">
          {/* Status Highlights Top Bar */}
          <div className="p-6 bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="text-[11px] uppercase tracking-wider text-indigo-400 font-bold">
                Verified Order Details
              </div>
              <div className="text-xl font-extrabold font-mono flex items-center gap-3">
                <span>{searchedOrder.id}</span>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-white/20 text-white font-sans">
                  {searchedOrder.paymentType === 'PARTIAL_COD_10'
                    ? '10% Partial COD Booking'
                    : 'Full Prepaid / Instant EMI'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrintReceipt}
                className="px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print E-Receipt</span>
              </button>
            </div>
          </div>

          {/* Courier Dispatch Live Tracking Callout */}
          {searchedOrder.vendorFulfillment ? (
            <div className="bg-emerald-50/80 border-b border-emerald-200 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-emerald-100 text-emerald-700 rounded-xl shrink-0 mt-0.5 sm:mt-0">
                  <Truck className="w-5 h-5" />
                </div>
                <div className="space-y-1 text-xs">
                  <div className="font-bold text-emerald-950 text-sm">
                    Shipment Dispatched via {searchedOrder.vendorFulfillment.courierPartner}
                  </div>
                  <div className="text-emerald-800">
                    AWB Tracking Number:{' '}
                    <span className="font-mono font-bold">
                      {searchedOrder.vendorFulfillment.trackingNumber}
                    </span>
                  </div>
                  {searchedOrder.vendorFulfillment.estimatedDelivery && (
                    <div className="text-emerald-700 text-[11px]">
                      Expected Delivery:{' '}
                      {new Date(
                        searchedOrder.vendorFulfillment.estimatedDelivery
                      ).toLocaleDateString('en-IN', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </div>
                  )}
                </div>
              </div>

              <a
                href={searchedOrder.vendorFulfillment.trackingUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-sm transition-colors flex items-center gap-1.5 shrink-0"
              >
                <span>Track Live on Courier Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          ) : (
            <div className="bg-amber-50/70 border-b border-amber-200 p-5 flex items-center gap-3 text-xs">
              <Clock className="w-5 h-5 text-amber-600 shrink-0" />
              <div className="space-y-0.5">
                <div className="font-bold text-amber-950">
                  Order Verified · Preparing Dispatch
                </div>
                <div className="text-amber-800 text-[11px]">
                  Your 10% advance deposit is received. Our fulfillment team is assigning the courier tracking link. Real-time updates will automatically stream here!
                </div>
              </div>
            </div>
          )}

          <div className="p-6 space-y-8">
            {/* Dispatch Step Progression */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Delivery Progress
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                {/* Step 1 */}
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 space-y-1">
                  <div className="flex items-center gap-1.5 text-emerald-700 font-bold">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>1. 10% Deposit Paid</span>
                  </div>
                  <div className="text-[11px] text-emerald-800">
                    ₹{searchedOrder.depositAmount.toLocaleString('en-IN')} verified online
                  </div>
                </div>

                {/* Step 2 */}
                <div
                  className={`p-3 rounded-xl border space-y-1 ${
                    searchedOrder.vendorFulfillment
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                      : 'bg-slate-50 border-slate-200 text-slate-500'
                  }`}
                >
                  <div className="flex items-center gap-1.5 font-bold">
                    {searchedOrder.vendorFulfillment ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                    ) : (
                      <Clock className="w-4 h-4 text-slate-400" />
                    )}
                    <span>2. Sourced & Packed</span>
                  </div>
                  <div className="text-[11px]">
                    {searchedOrder.vendorFulfillment
                      ? `Assigned to ${searchedOrder.vendorFulfillment.vendorName}`
                      : 'In verification'}
                  </div>
                </div>

                {/* Step 3 */}
                <div
                  className={`p-3 rounded-xl border space-y-1 ${
                    searchedOrder.status === 'OUT_FOR_DELIVERY' ||
                    searchedOrder.status === 'DELIVERED'
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                      : searchedOrder.vendorFulfillment
                      ? 'bg-indigo-50 border-indigo-200 text-indigo-900'
                      : 'bg-slate-50 border-slate-200 text-slate-500'
                  }`}
                >
                  <div className="flex items-center gap-1.5 font-bold">
                    {searchedOrder.status === 'OUT_FOR_DELIVERY' ||
                    searchedOrder.status === 'DELIVERED' ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                    ) : searchedOrder.vendorFulfillment ? (
                      <Truck className="w-4 h-4 text-indigo-600" />
                    ) : (
                      <Clock className="w-4 h-4 text-slate-400" />
                    )}
                    <span>3. In Transit</span>
                  </div>
                  <div className="text-[11px]">
                    {searchedOrder.vendorFulfillment
                      ? `${searchedOrder.vendorFulfillment.courierPartner}`
                      : 'Awaiting AWB'}
                  </div>
                </div>

                {/* Step 4 */}
                <div
                  className={`p-3 rounded-xl border space-y-1 ${
                    searchedOrder.status === 'DELIVERED'
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                      : searchedOrder.status === 'OUT_FOR_DELIVERY'
                      ? 'bg-amber-50 border-amber-200 text-amber-900'
                      : 'bg-slate-50 border-slate-200 text-slate-500'
                  }`}
                >
                  <div className="flex items-center gap-1.5 font-bold">
                    {searchedOrder.status === 'DELIVERED' ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                    ) : searchedOrder.status === 'OUT_FOR_DELIVERY' ? (
                      <Truck className="w-4 h-4 text-amber-600 animate-pulse" />
                    ) : (
                      <Clock className="w-4 h-4 text-slate-400" />
                    )}
                    <span>4. Delivery & COD</span>
                  </div>
                  <div className="text-[11px]">
                    {searchedOrder.status === 'DELIVERED'
                      ? 'Delivered & Paid'
                      : searchedOrder.paymentType === 'PARTIAL_COD_10'
                      ? `Collect ₹${searchedOrder.remainingCodBalance.toLocaleString('en-IN')}`
                      : 'Prepaid parcel'}
                  </div>
                </div>
              </div>
            </div>

            {/* Product & Payment Settlement Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Product Card */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-600">
                  Item Purchased
                </div>
                <div className="flex items-start gap-3">
                  <img
                    src={searchedOrder.item.image}
                    alt={searchedOrder.item.title}
                    className="w-16 h-14 object-cover rounded-lg bg-slate-200 border border-slate-200"
                  />
                  <div className="space-y-1 text-xs">
                    <div className="font-bold text-slate-900">
                      {searchedOrder.item.title}
                    </div>
                    <div className="text-slate-500">
                      Category: {searchedOrder.item.category} · Brand: {searchedOrder.item.brand}
                    </div>
                    <div className="font-bold text-slate-900 tabular-nums">
                      ₹{searchedOrder.totalAmount.toLocaleString('en-IN')}
                    </div>
                  </div>
                </div>

                {/* Delivery Address Details */}
                <div className="pt-2 border-t border-slate-200 text-xs text-slate-600 space-y-1">
                  <div className="font-bold text-slate-800">Delivery Address:</div>
                  <div>
                    {searchedOrder.customer.fullName} ({searchedOrder.customer.phone})
                  </div>
                  <div>
                    {searchedOrder.customer.addressLine}, {searchedOrder.customer.city},{' '}
                    {searchedOrder.customer.state} - {searchedOrder.customer.pincode}
                  </div>
                </div>
              </div>

              {/* Financial & COD Balance Card */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3 text-xs">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-600">
                  Payment & COD Statement
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>Product Deal Value:</span>
                    <span className="font-semibold text-slate-900 tabular-nums">
                      ₹{searchedOrder.totalAmount.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="flex justify-between p-2 bg-emerald-100/60 rounded-lg text-emerald-900 font-semibold">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                      Advance Deposit Paid (Online):
                    </span>
                    <span className="tabular-nums font-bold">
                      ₹{searchedOrder.depositAmount.toLocaleString('en-IN')}
                    </span>
                  </div>

                  {searchedOrder.paymentType === 'PARTIAL_COD_10' && (
                    <div className="flex justify-between p-2.5 bg-amber-100/70 border border-amber-300 rounded-lg text-amber-950 font-bold">
                      <span className="flex items-center gap-1.5">
                        <Banknote className="w-4 h-4 text-amber-700" />
                        Balance Payable to Courier:
                      </span>
                      <span className="tabular-nums text-sm">
                        ₹{searchedOrder.remainingCodBalance.toLocaleString('en-IN')}
                      </span>
                    </div>
                  )}
                </div>

                {searchedOrder.paymentType === 'PARTIAL_COD_10' && (
                  <div className="bg-amber-50 p-3 rounded-lg border border-amber-200/80 text-[11px] text-amber-900 space-y-1">
                    <div className="font-bold flex items-center gap-1">
                      <QrCode className="w-3.5 h-3.5 text-amber-700" />
                      How to pay balance to delivery boy:
                    </div>
                    <p>
                      When the delivery boy arrives with your parcel, pay{' '}
                      <strong>
                        ₹{searchedOrder.remainingCodBalance.toLocaleString('en-IN')}
                      </strong>{' '}
                      using either Cash or scan their UPI QR code (GPay / PhonePe / Paytm).
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Cancellation Policy & Non-Refundable Deposit Warning (Step 2) */}
            <div className="bg-slate-100/80 border border-slate-200 rounded-xl p-4 flex items-start gap-3 text-xs text-slate-700">
              <ShieldAlert className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <div className="font-bold text-slate-900">
                  Guaranteed Fulfillment & Non-Refundable Deposit Terms
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Your 10% advance deposit (₹
                  {searchedOrder.depositAmount.toLocaleString('en-IN')}) locks your device reservation and courier dispatch. In the event of arbitrary refusal at doorstep, this advance covers the 2-way reverse logistics fee.
                </p>
              </div>
            </div>

            {/* Live Notification Log */}
            <div className="space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Live Updates & Notifications
              </div>
              <div className="space-y-2">
                {searchedOrder.notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className="bg-white p-3 rounded-xl border border-slate-200 text-xs flex items-start justify-between gap-3 shadow-2xs"
                  >
                    <div className="space-y-0.5">
                      <div className="font-bold text-slate-900">{notif.title}</div>
                      <div className="text-slate-600 text-[11px]">{notif.message}</div>
                    </div>
                    <span className="text-[10px] text-slate-400 tabular-nums shrink-0">
                      {new Date(notif.timestamp).toLocaleTimeString('en-IN', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
