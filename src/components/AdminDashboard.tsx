import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Order, OrderStatus } from '../types';
import { 
  Bell, 
  ExternalLink, 
  Truck, 
  Package, 
  CheckCircle2, 
  AlertCircle, 
  Copy, 
  ShoppingBag, 
  TrendingUp, 
  PlusCircle, 
  X,
  FileCheck,
  Building,
  User,
  MapPin,
  Phone
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { 
    orders, 
    fulfillOrderWithVendor, 
    updateOrderStatus, 
    setCurrentView,
    setActiveTrackingOrderId
  } = useApp();

  const [activeTab, setActiveTab] = useState<'ALL' | 'NEW' | 'DISPATCHED' | 'DELIVERED'>('ALL');
  const [selectedOrderForSourcing, setSelectedOrderForSourcing] = useState<Order | null>(null);

  // Sourcing form state
  const [selectedVendor, setSelectedVendor] = useState<'Wholesaler' | 'Amazon' | 'Flipkart' | string>('Wholesaler');
  const [vendorOrderId, setVendorOrderId] = useState('');
  const [vendorPurchaseCost, setVendorPurchaseCost] = useState<number>(0);
  const [courierPartner, setCourierPartner] = useState('Delhivery Surface');
  const [trackingNumber, setTrackingNumber] = useState('');
  const [trackingUrl, setTrackingUrl] = useState('');
  const [notes, setNotes] = useState('');

  // Copy helper
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    setTimeout(() => setCopiedField(null), 1800);
  };

  const newOrders = orders.filter((o) => o.status === 'NEW_ORDER');

  const filteredOrders = orders.filter((order) => {
    if (activeTab === 'NEW') return order.status === 'NEW_ORDER';
    if (activeTab === 'DISPATCHED') return order.status === 'DISPATCHED' || order.status === 'OUT_FOR_DELIVERY';
    if (activeTab === 'DELIVERED') return order.status === 'DELIVERED';
    return true;
  });

  const totalDepositCollected = orders.reduce((acc, curr) => acc + curr.depositAmount, 0);
  const totalCodPending = orders
    .filter((o) => o.status !== 'DELIVERED' && o.status !== 'CANCELLED_REJECTED')
    .reduce((acc, curr) => acc + curr.remainingCodBalance, 0);
  const totalAdminProfits = orders.reduce(
    (acc, curr) => acc + (curr.vendorFulfillment?.adminProfit || 0),
    0
  );

  const openSourcingModal = (order: Order) => {
    setSelectedOrderForSourcing(order);
    
    // Auto-select cheapest vendor
    const sources = order.item.vendorSources || [];
    const cheapest = sources.slice().sort((a, b) => a.price - b.price)[0];
    
    if (cheapest) {
      setSelectedVendor(cheapest.name);
      setVendorPurchaseCost(cheapest.price);
    } else {
      setSelectedVendor('Wholesaler');
      setVendorPurchaseCost(Math.round(order.totalAmount * 0.88));
    }

    const randomSuffix = Math.floor(100000 + Math.random() * 900000);
    setVendorOrderId(`${cheapest ? cheapest.name.slice(0, 3).toUpperCase() : 'ORD'}-${randomSuffix}`);
    setCourierPartner('Delhivery Express');
    setTrackingNumber(`DEL${randomSuffix}IN`);
    setTrackingUrl(`https://delhivery.com/track/DEL${randomSuffix}IN`);
    setNotes(`Manual COD order placed on customer address. Collect ₹${order.remainingCodBalance.toLocaleString('en-IN')} on delivery.`);
  };

  const handleConfirmFulfillment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrderForSourcing) return;

    fulfillOrderWithVendor(selectedOrderForSourcing.id, {
      vendorName: selectedVendor,
      vendorOrderId: vendorOrderId || `VND-${Date.now()}`,
      vendorPurchaseCost: Number(vendorPurchaseCost),
      courierPartner,
      trackingNumber: trackingNumber || `AWB-${Date.now()}`,
      trackingUrl: trackingUrl || 'https://courier-tracking.in',
      notes,
    });

    setSelectedOrderForSourcing(null);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Top Banner / Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-indigo-600">
            Admin Sourcing & Manual Fulfillment Hub
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900">
            Order Queue & Vendor Aggregator
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Review incoming 10% Partial COD bookings, source from cheapest vendors (Amazon/Flipkart/Wholesalers), and upload COD tracking links.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentView('marketplace')}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors"
          >
            Go to Customer Store
          </button>
        </div>
      </div>

      {/* Step 3 Requirement: High-Priority Alert on Admin Dashboard */}
      {newOrders.length > 0 && (
        <section className="bg-amber-500/10 border-2 border-amber-500/60 rounded-2xl p-5 space-y-3">
          <div className="flex items-center gap-2 text-amber-900 font-extrabold text-sm sm:text-base">
            <Bell className="w-5 h-5 text-amber-600 animate-bounce" />
            <span>Alert: {newOrders.length} New Order(s) Awaiting Vendor Sourcing</span>
          </div>

          <div className="space-y-2">
            {newOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-xl p-4 border border-amber-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold bg-slate-900 text-white px-2 py-0.5 rounded">
                      {order.id}
                    </span>
                    <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                      Partial COD Order Received: ₹{order.depositAmount.toLocaleString('en-IN')} Paid, ₹{order.remainingCodBalance.toLocaleString('en-IN')} Pending
                    </span>
                  </div>
                  <div className="text-xs font-bold text-slate-900">
                    {order.item.title}
                  </div>
                  <div className="text-xs text-slate-500">
                    Buyer: {order.customer.fullName} · {order.customer.city}, {order.customer.state} ({order.customer.pincode}) · Phone: {order.customer.phone}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => openSourcingModal(order)}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg transition-colors shadow-sm flex items-center gap-1.5"
                  >
                    <span>Source on Vendor Site (Amazon/Wholesale)</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Aggregate Financial KPIs */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-1">
          <div className="text-xs font-semibold text-slate-500">
            Total Advance Deposits Held (10%)
          </div>
          <div className="text-2xl font-extrabold text-indigo-700 tabular-nums">
            ₹{totalDepositCollected.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-emerald-600 font-medium">
            100% Secured online via payment gateway
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-1">
          <div className="text-xs font-semibold text-slate-500">
            Total COD Balance on Delivery (90%)
          </div>
          <div className="text-2xl font-extrabold text-amber-700 tabular-nums">
            ₹{totalCodPending.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-slate-500">
            To be collected by Courier boys upon delivery
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-1">
          <div className="text-xs font-semibold text-slate-500">
            Estimated Sourcing Margin Profit
          </div>
          <div className="text-2xl font-extrabold text-emerald-700 tabular-nums">
            ₹{totalAdminProfits.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-slate-500">
            Difference between Deal Price & Vendor cost
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
        {(['ALL', 'NEW', 'DISPATCHED', 'DELIVERED'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              activeTab === tab
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:text-slate-900 bg-slate-100'
            }`}
          >
            {tab === 'ALL' && `All Orders (${orders.length})`}
            {tab === 'NEW' && `Awaiting Sourcing (${newOrders.length})`}
            {tab === 'DISPATCHED' && 'Dispatched / In-Transit'}
            {tab === 'DELIVERED' && 'Delivered'}
          </button>
        ))}
      </div>

      {/* Orders Table / List */}
      <div className="space-y-4">
        {filteredOrders.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 text-slate-500 text-xs">
            No orders found under this category.
          </div>
        ) : (
          filteredOrders.map((order) => {
            const isPartialCod = order.paymentType === 'PARTIAL_COD_10';
            const sources = order.item.vendorSources || [];
            const cheapestSource = sources.slice().sort((a, b) => a.price - b.price)[0];

            return (
              <div
                key={order.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4 hover:border-slate-300 transition-all shadow-sm"
              >
                {/* Header row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-slate-900">
                      {order.id}
                    </span>
                    <span aria-hidden="true" className="text-slate-300">·</span>
                    <span className="text-xs text-slate-500">
                      {new Date(order.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs font-bold px-2.5 py-1 rounded-md ${
                        order.status === 'NEW_ORDER'
                          ? 'bg-amber-100 text-amber-800'
                          : order.status === 'DISPATCHED'
                          ? 'bg-blue-100 text-blue-800'
                          : order.status === 'OUT_FOR_DELIVERY'
                          ? 'bg-indigo-100 text-indigo-800'
                          : order.status === 'DELIVERED'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {order.status === 'NEW_ORDER' && 'Needs Vendor Sourcing'}
                      {order.status === 'DISPATCHED' && 'Dispatched (AWB Uploaded)'}
                      {order.status === 'OUT_FOR_DELIVERY' && 'Out for Delivery'}
                      {order.status === 'DELIVERED' && 'Delivered & Settled'}
                      {order.status === 'CANCELLED_REJECTED' && 'Rejected (Deposit Kept)'}
                    </span>

                    <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-700 rounded-md">
                      {isPartialCod ? '10% Partial COD' : 'Prepaid Full / EMI'}
                    </span>
                  </div>
                </div>

                {/* Main Order Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
                  {/* Col 1: Product & Customer */}
                  <div className="space-y-3">
                    <div className="font-semibold text-slate-900 flex items-center gap-1.5">
                      <ShoppingBag className="w-4 h-4 text-slate-500" />
                      <span>Ordered Product</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <img
                        src={order.item.image}
                        alt={order.item.title}
                        className="w-14 h-12 object-cover rounded-lg bg-slate-100 border border-slate-200"
                      />
                      <div>
                        <div className="font-bold text-slate-900 line-clamp-1">
                          {order.item.title}
                        </div>
                        <div className="text-slate-500 text-[11px]">
                          Deal Price: ₹{order.totalAmount.toLocaleString('en-IN')}
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-100 space-y-1">
                      <div className="font-semibold text-slate-900 flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-slate-500" />
                        <span>Customer Details</span>
                      </div>
                      <div className="text-slate-800 font-medium">
                        {order.customer.fullName}
                      </div>
                      <div className="text-slate-600 flex items-center gap-1">
                        <Phone className="w-3 h-3 text-slate-400" />
                        <span>{order.customer.phone}</span>
                      </div>
                      <div className="text-slate-500 text-[11px] leading-tight">
                        {order.customer.addressLine}, {order.customer.city}, {order.customer.state} - {order.customer.pincode}
                      </div>
                    </div>
                  </div>

                  {/* Col 2: Payment & Financial breakdown */}
                  <div className="space-y-3 bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                    <div className="font-semibold text-slate-900">
                      Payment & Security Deposit Breakdown
                    </div>

                    <div className="space-y-1.5 text-[11px]">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Total Order Value:</span>
                        <span className="font-semibold text-slate-900 tabular-nums">
                          ₹{order.totalAmount.toLocaleString('en-IN')}
                        </span>
                      </div>

                      <div className="flex justify-between font-bold text-indigo-700 bg-indigo-50/80 p-1.5 rounded">
                        <span>10% Advance Deposit Paid:</span>
                        <span className="tabular-nums">
                          ₹{order.depositAmount.toLocaleString('en-IN')}
                        </span>
                      </div>

                      {isPartialCod && (
                        <div className="flex justify-between font-bold text-amber-800 bg-amber-50 p-1.5 rounded border border-amber-200">
                          <span>Pending COD to Collect:</span>
                          <span className="tabular-nums">
                            ₹{order.remainingCodBalance.toLocaleString('en-IN')}
                          </span>
                        </div>
                      )}

                      <div className="flex justify-between text-slate-500 pt-1">
                        <span>Txn Gateway ID:</span>
                        <span className="font-mono text-[10px] text-slate-700">
                          {order.paymentTxnId}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Col 3: Vendor Sourcing & Courier Status */}
                  <div className="space-y-3">
                    <div className="font-semibold text-slate-900 flex items-center justify-between">
                      <span>Vendor Sourcing Status</span>
                      {order.vendorFulfillment && (
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                          Profit: +₹{order.vendorFulfillment.adminProfit.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>

                    {order.vendorFulfillment ? (
                      <div className="space-y-2 text-[11px] bg-emerald-50/50 p-3 rounded-xl border border-emerald-100">
                        <div className="flex justify-between">
                          <span className="text-slate-600">Sourced Platform:</span>
                          <span className="font-bold text-slate-900">
                            {order.vendorFulfillment.vendorName}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Vendor Order ID:</span>
                          <span className="font-mono font-semibold text-slate-900">
                            {order.vendorFulfillment.vendorOrderId}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Courier & AWB:</span>
                          <span className="font-semibold text-slate-900">
                            {order.vendorFulfillment.courierPartner} ({order.vendorFulfillment.trackingNumber})
                          </span>
                        </div>
                        <div className="pt-1">
                          <a
                            href={order.vendorFulfillment.trackingUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-indigo-600 font-bold hover:underline"
                          >
                            <span>Open Live Courier Tracking Link</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2 text-[11px] bg-slate-50 p-3 rounded-xl border border-slate-200">
                        <div className="text-slate-600">
                          Recommended Cheapest Vendor:
                        </div>
                        {cheapestSource && (
                          <div className="flex items-center justify-between bg-white p-2 rounded-lg border border-slate-200 font-medium">
                            <span className="font-bold text-slate-900">{cheapestSource.name}</span>
                            <span className="text-emerald-700 font-bold">
                              ₹{cheapestSource.price.toLocaleString('en-IN')}
                            </span>
                            <span className="text-[10px] text-slate-500">
                              (Est Profit: ₹{(order.totalAmount - cheapestSource.price).toLocaleString('en-IN')})
                            </span>
                          </div>
                        )}
                        <button
                          onClick={() => openSourcingModal(order)}
                          className="w-full mt-2 py-2 px-3 bg-slate-900 text-white rounded-lg font-bold hover:bg-slate-800 transition-colors flex items-center justify-center gap-1.5"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Place Vendor COD Order</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Toolbar for Order Status */}
                <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-500 font-medium">Update Status:</span>

                    {order.status !== 'DISPATCHED' && !order.vendorFulfillment && (
                      <button
                        onClick={() => openSourcingModal(order)}
                        className="px-2.5 py-1 text-xs bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-md font-semibold transition-colors"
                      >
                        Enter Sourced Tracking AWB
                      </button>
                    )}

                    {order.status === 'DISPATCHED' && (
                      <button
                        onClick={() => updateOrderStatus(order.id, 'OUT_FOR_DELIVERY')}
                        className="px-2.5 py-1 text-xs bg-amber-50 text-amber-800 hover:bg-amber-100 rounded-md font-semibold transition-colors"
                      >
                        Mark Out for Delivery
                      </button>
                    )}

                    {order.status === 'OUT_FOR_DELIVERY' && (
                      <button
                        onClick={() => updateOrderStatus(order.id, 'DELIVERED')}
                        className="px-2.5 py-1 text-xs bg-emerald-50 text-emerald-800 hover:bg-emerald-100 rounded-md font-semibold transition-colors"
                      >
                        Mark Delivered (COD Collected)
                      </button>
                    )}

                    {order.status !== 'DELIVERED' && order.status !== 'CANCELLED_REJECTED' && (
                      <button
                        onClick={() => {
                          const confirmReject = window.confirm(
                            'Customer rejected delivery without valid reason? 10% non-refundable deposit will be retained to cover reverse shipping cost.'
                          );
                          if (confirmReject) {
                            updateOrderStatus(
                              order.id,
                              'CANCELLED_REJECTED',
                              'Customer rejected delivery at doorstep. 10% advance deposit retained to cover courier return costs.'
                            );
                          }
                        }}
                        className="px-2.5 py-1 text-xs text-rose-600 hover:bg-rose-50 rounded-md font-medium transition-colors"
                      >
                        Handle Rejection (Retain Deposit)
                      </button>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setActiveTrackingOrderId(order.id);
                        setCurrentView('tracking');
                      }}
                      className="text-slate-600 hover:text-slate-900 font-semibold underline text-xs"
                    >
                      Customer View & E-Receipt
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* SOURCING MODAL (Step 3: Admin Manual Fulfillment Workflow) */}
      {selectedOrderForSourcing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-3xl w-full my-auto shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-900 text-white">
              <div className="flex items-center gap-2">
                <Building className="w-5 h-5 text-indigo-400" />
                <span className="text-sm font-bold">
                  Vendor Sourcing & COD Order Dispatch Portal ({selectedOrderForSourcing.id})
                </span>
              </div>
              <button
                onClick={() => setSelectedOrderForSourcing(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleConfirmFulfillment} className="p-6 overflow-y-auto space-y-6 text-xs">
              {/* Customer Address Copy Card for Admin */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-indigo-600" />
                    Customer Delivery Address (Copy to Amazon/Flipkart/Wholesaler)
                  </span>
                  {copiedField && (
                    <span className="text-emerald-600 font-semibold text-[11px]">
                      Copied {copiedField}!
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-white p-3 rounded-lg border border-slate-200">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Customer Name:</span>
                    <div className="flex items-center justify-between font-bold text-slate-900">
                      <span>{selectedOrderForSourcing.customer.fullName}</span>
                      <button
                        type="button"
                        onClick={() => handleCopy(selectedOrderForSourcing.customer.fullName, 'Name')}
                        className="text-slate-400 hover:text-slate-700"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div>
                    <span className="text-slate-400 block text-[10px]">Mobile Phone:</span>
                    <div className="flex items-center justify-between font-bold text-slate-900">
                      <span>{selectedOrderForSourcing.customer.phone}</span>
                      <button
                        type="button"
                        onClick={() => handleCopy(selectedOrderForSourcing.customer.phone, 'Phone')}
                        className="text-slate-400 hover:text-slate-700"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <span className="text-slate-400 block text-[10px]">Address & PIN:</span>
                    <div className="flex items-center justify-between font-semibold text-slate-900">
                      <span>
                        {selectedOrderForSourcing.customer.addressLine}, {selectedOrderForSourcing.customer.city}, {selectedOrderForSourcing.customer.state} - {selectedOrderForSourcing.customer.pincode}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          handleCopy(
                            `${selectedOrderForSourcing.customer.addressLine}, ${selectedOrderForSourcing.customer.city}, ${selectedOrderForSourcing.customer.state} - ${selectedOrderForSourcing.customer.pincode}`,
                            'Address'
                          )
                        }
                        className="text-slate-400 hover:text-slate-700"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Vendor Price Matrix Comparison */}
              <div className="space-y-2">
                <div className="font-bold text-slate-800">
                  Select Sourcing Vendor (Comparison Matrix)
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {(selectedOrderForSourcing.item.vendorSources || []).map((source) => {
                    const margin = selectedOrderForSourcing.totalAmount - source.price;
                    const isSelected = selectedVendor === source.name;

                    return (
                      <div
                        key={source.name}
                        onClick={() => {
                          setSelectedVendor(source.name);
                          setVendorPurchaseCost(source.price);
                        }}
                        className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                          isSelected
                            ? 'border-indigo-600 bg-indigo-50/50 ring-1 ring-indigo-600'
                            : 'border-slate-200 bg-white hover:border-slate-300'
                        }`}
                      >
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-bold text-slate-900">{source.name}</span>
                          {source.name === 'Wholesaler' && (
                            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                              Cheapest
                            </span>
                          )}
                        </div>

                        <div className="text-base font-extrabold text-slate-900 tabular-nums">
                          ₹{source.price.toLocaleString('en-IN')}
                        </div>

                        <div className="text-[11px] text-emerald-700 font-semibold mt-1">
                          Profit Margin: +₹{margin.toLocaleString('en-IN')}
                        </div>

                        <div className="text-[10px] text-slate-400 mt-1">
                          Delivery: ~{source.deliveryDays} Days · COD Available
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Vendor Sourcing Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Vendor Sourced Platform
                  </label>
                  <input
                    type="text"
                    value={selectedVendor}
                    onChange={(e) => setSelectedVendor(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-900"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Vendor Order ID / Invoice Ref
                  </label>
                  <input
                    type="text"
                    value={vendorOrderId}
                    onChange={(e) => setVendorOrderId(e.target.value)}
                    placeholder="e.g. AMZ-402-984102 or WH-77812"
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-900"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Vendor Cost Price (₹)
                  </label>
                  <input
                    type="number"
                    value={vendorPurchaseCost}
                    onChange={(e) => setVendorPurchaseCost(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-900"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Courier Logistics Partner
                  </label>
                  <select
                    value={courierPartner}
                    onChange={(e) => setCourierPartner(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-900"
                  >
                    <option value="Delhivery Surface Express">Delhivery Surface Express</option>
                    <option value="Blue Dart Air">Blue Dart Air</option>
                    <option value="Ekart Logistics">Ekart Logistics</option>
                    <option value="Amazon Logistics ATS">Amazon Logistics ATS</option>
                    <option value="Shadowfax">Shadowfax</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    AWB / Tracking Number
                  </label>
                  <input
                    type="text"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    placeholder="e.g. DEL99824128IN"
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-900 font-mono"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Vendor Tracking URL Link (Customer gets live updates)
                  </label>
                  <input
                    type="url"
                    value={trackingUrl}
                    onChange={(e) => setTrackingUrl(e.target.value)}
                    placeholder="https://delhivery.com/track/..."
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-900"
                    required
                  />
                </div>
              </div>

              {/* Step 3 Fulfillment Instruction Note */}
              <div className="bg-indigo-50/60 p-3.5 rounded-xl border border-indigo-200 text-indigo-950 space-y-1">
                <div className="font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                  COD Balance Instruction for Vendor:
                </div>
                <p className="text-[11px] leading-relaxed">
                  When placing this order on <strong>{selectedVendor}</strong>, set payment mode to <strong>Cash on Delivery (COD) for ₹{selectedOrderForSourcing.remainingCodBalance.toLocaleString('en-IN')}</strong>. Once dispatched, this tracking link will instantly appear on the customer&apos;s live tracking screen.
                </p>
              </div>

              {/* Form Buttons */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedOrderForSourcing(null)}
                  className="px-4 py-2.5 text-slate-600 hover:text-slate-900 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all shadow-sm flex items-center gap-2"
                >
                  <Truck className="w-4 h-4" />
                  <span>Confirm Dispatch & Upload Tracking Link</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
