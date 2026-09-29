import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Package, 
  ExternalLink, 
  CheckCircle2, 
  Clock, 
  Truck, 
  ShieldAlert, 
  FileText, 
  Printer, 
  ArrowLeft,
  Banknote,
  QrCode
} from 'lucide-react';

export const OrderTrackingView: React.FC = () => {
  const { orders, activeTrackingOrderId, setActiveTrackingOrderId, setCurrentView } = useApp();

  const [filterOrderId, setFilterOrderId] = useState(activeTrackingOrderId || (orders.length > 0 ? orders[0].id : ''));

  const currentOrder = orders.find((o) => o.id === filterOrderId) || (orders.length > 0 ? orders[0] : null);

  if (!currentOrder) {
    return (
      <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 p-8 space-y-4">
        <Package className="w-12 h-12 text-slate-300 mx-auto" />
        <h3 className="text-lg font-bold text-slate-800">No Orders Found Yet</h3>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          Explore our deals and book any product with just a 10% advance deposit to track it in real-time.
        </p>
        <button
          onClick={() => setCurrentView('marketplace')}
          className="px-5 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 transition-colors"
        >
          Explore Deals Catalog
        </button>
      </div>
    );
  }

  const isPartialCod = currentOrder.paymentType === 'PARTIAL_COD_10';
  const fulfillment = currentOrder.vendorFulfillment;

  const handlePrintReceipt = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* View Header */}
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
            Order Status & E-Receipt
          </h1>
          <p className="text-xs text-slate-500">
            Real-time live courier tracking and security deposit receipt
          </p>
        </div>

        {/* Order Selector Dropdown if multiple orders exist */}
        {orders.length > 1 && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">Select Order:</span>
            <select
              value={currentOrder.id}
              onChange={(e) => {
                setFilterOrderId(e.target.value);
                setActiveTrackingOrderId(e.target.value);
              }}
              className="text-xs font-bold text-slate-900 bg-white border border-slate-200 rounded-xl px-3 py-2 focus:ring-2 focus:ring-slate-900"
            >
              {orders.map((ord) => (
                <option key={ord.id} value={ord.id}>
                  {ord.id} - {ord.item.title.slice(0, 24)}... (₹{ord.totalAmount.toLocaleString('en-IN')})
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Main Order Card */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        {/* Status Highlights Top Bar */}
        <div className="p-6 bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="text-[11px] uppercase tracking-wider text-indigo-400 font-bold">
              Order Reference
            </div>
            <div className="text-xl font-extrabold font-mono flex items-center gap-3">
              <span>{currentOrder.id}</span>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-white/20 text-white font-sans">
                {isPartialCod ? '10% Partial COD Booking' : 'Full Prepaid / Instant EMI'}
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
        {fulfillment ? (
          <div className="bg-emerald-50/80 border-b border-emerald-200 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="p-2.5 bg-emerald-100 text-emerald-700 rounded-xl shrink-0 mt-0.5 sm:mt-0">
                <Truck className="w-5 h-5" />
              </div>
              <div className="space-y-1 text-xs">
                <div className="font-bold text-emerald-950 text-sm">
                  Shipment Dispatched via {fulfillment.courierPartner}
                </div>
                <div className="text-emerald-800">
                  AWB Tracking Number: <span className="font-mono font-bold">{fulfillment.trackingNumber}</span>
                </div>
                {fulfillment.estimatedDelivery && (
                  <div className="text-emerald-700 text-[11px]">
                    Expected Delivery: {new Date(fulfillment.estimatedDelivery).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </div>
                )}
              </div>
            </div>

            <a
              href={fulfillment.trackingUrl}
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
                Preparing Dispatch & Vendor Sourcing
              </div>
              <div className="text-amber-800 text-[11px]">
                Your 10% advance deposit is verified. Admin is assigning the courier tracking link. Real-time updates will automatically stream here!
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
                  ₹{currentOrder.depositAmount.toLocaleString('en-IN')} verified online
                </div>
              </div>

              {/* Step 2 */}
              <div
                className={`p-3 rounded-xl border space-y-1 ${
                  fulfillment
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                    : 'bg-slate-50 border-slate-200 text-slate-500'
                }`}
              >
                <div className="flex items-center gap-1.5 font-bold">
                  {fulfillment ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  ) : (
                    <Clock className="w-4 h-4 text-slate-400" />
                  )}
                  <span>2. Sourced & Packed</span>
                </div>
                <div className="text-[11px]">
                  {fulfillment ? `Assigned to ${fulfillment.vendorName}` : 'In verification'}
                </div>
              </div>

              {/* Step 3 */}
              <div
                className={`p-3 rounded-xl border space-y-1 ${
                  currentOrder.status === 'OUT_FOR_DELIVERY' || currentOrder.status === 'DELIVERED'
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                    : fulfillment
                    ? 'bg-indigo-50 border-indigo-200 text-indigo-900'
                    : 'bg-slate-50 border-slate-200 text-slate-500'
                }`}
              >
                <div className="flex items-center gap-1.5 font-bold">
                  {currentOrder.status === 'OUT_FOR_DELIVERY' || currentOrder.status === 'DELIVERED' ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  ) : fulfillment ? (
                    <Truck className="w-4 h-4 text-indigo-600" />
                  ) : (
                    <Clock className="w-4 h-4 text-slate-400" />
                  )}
                  <span>3. In Transit</span>
                </div>
                <div className="text-[11px]">
                  {fulfillment ? `${fulfillment.courierPartner}` : 'Awaiting AWB'}
                </div>
              </div>

              {/* Step 4 */}
              <div
                className={`p-3 rounded-xl border space-y-1 ${
                  currentOrder.status === 'DELIVERED'
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                    : currentOrder.status === 'OUT_FOR_DELIVERY'
                    ? 'bg-amber-50 border-amber-200 text-amber-900'
                    : 'bg-slate-50 border-slate-200 text-slate-500'
                }`}
              >
                <div className="flex items-center gap-1.5 font-bold">
                  {currentOrder.status === 'DELIVERED' ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  ) : currentOrder.status === 'OUT_FOR_DELIVERY' ? (
                    <Truck className="w-4 h-4 text-amber-600 animate-pulse" />
                  ) : (
                    <Clock className="w-4 h-4 text-slate-400" />
                  )}
                  <span>4. Delivery & COD</span>
                </div>
                <div className="text-[11px]">
                  {currentOrder.status === 'DELIVERED'
                    ? 'Delivered & Paid'
                    : isPartialCod
                    ? `Collect ₹${currentOrder.remainingCodBalance.toLocaleString('en-IN')}`
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
                  src={currentOrder.item.image}
                  alt={currentOrder.item.title}
                  className="w-16 h-14 object-cover rounded-lg bg-slate-200 border border-slate-200"
                />
                <div className="space-y-1 text-xs">
                  <div className="font-bold text-slate-900">
                    {currentOrder.item.title}
                  </div>
                  <div className="text-slate-500">
                    Quantity: {currentOrder.quantity} · Brand: {currentOrder.item.brand}
                  </div>
                  <div className="font-bold text-slate-900 tabular-nums">
                    ₹{currentOrder.totalAmount.toLocaleString('en-IN')}
                  </div>
                </div>
              </div>

              {/* Delivery Address Details */}
              <div className="pt-2 border-t border-slate-200 text-xs text-slate-600 space-y-1">
                <div className="font-bold text-slate-800">Delivery Address:</div>
                <div>{currentOrder.customer.fullName} ({currentOrder.customer.phone})</div>
                <div>{currentOrder.customer.addressLine}, {currentOrder.customer.city}, {currentOrder.customer.state} - {currentOrder.customer.pincode}</div>
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
                    ₹{currentOrder.totalAmount.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="flex justify-between p-2 bg-emerald-100/60 rounded-lg text-emerald-900 font-semibold">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                    Advance Deposit Paid (Online):
                  </span>
                  <span className="tabular-nums font-bold">
                    ₹{currentOrder.depositAmount.toLocaleString('en-IN')}
                  </span>
                </div>

                {isPartialCod && (
                  <div className="flex justify-between p-2.5 bg-amber-100/70 border border-amber-300 rounded-lg text-amber-950 font-bold">
                    <span className="flex items-center gap-1.5">
                      <Banknote className="w-4 h-4 text-amber-700" />
                      Balance Payable to Courier:
                    </span>
                    <span className="tabular-nums text-sm">
                      ₹{currentOrder.remainingCodBalance.toLocaleString('en-IN')}
                    </span>
                  </div>
                )}
              </div>

              {isPartialCod && (
                <div className="bg-amber-50 p-3 rounded-lg border border-amber-200/80 text-[11px] text-amber-900 space-y-1">
                  <div className="font-bold flex items-center gap-1">
                    <QrCode className="w-3.5 h-3.5 text-amber-700" />
                    How to pay balance to delivery boy:
                  </div>
                  <p>
                    When the delivery boy arrives with your parcel, pay <strong>₹{currentOrder.remainingCodBalance.toLocaleString('en-IN')}</strong> using either Cash or scan their UPI QR code (GPay / PhonePe / Paytm).
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
                Your 10% advance deposit (₹{currentOrder.depositAmount.toLocaleString('en-IN')}) locks your device reservation and courier dispatch. As agreed during checkout, in the event of arbitrary cancellation or unprovoked refusal at doorstep, this advance covers the 2-way logistics and handling fee.
              </p>
            </div>
          </div>

          {/* Live Notification Log */}
          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Live Updates & Notifications
            </div>
            <div className="space-y-2">
              {currentOrder.notifications.map((notif) => (
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
    </div>
  );
};
