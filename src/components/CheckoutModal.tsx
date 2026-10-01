import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PaymentType, EmiPlan } from '../types';
import { 
  X, 
  ShieldCheck, 
  ShieldAlert, 
  CreditCard, 
  QrCode, 
  Building2, 
  Clock, 
  Check, 
  Info,
  AlertTriangle,
  Lock
} from 'lucide-react';
import { ProductImage } from './ProductImage';

export const CheckoutModal: React.FC = () => {
  const { 
    selectedDealForCheckout, 
    setSelectedDealForCheckout, 
    placeOrder, 
    setCurrentView,
    isAdminAuthenticated
  } = useApp();

  const deal = selectedDealForCheckout;

  // Form State - Empty placeholders for real delivery details
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [addressLine, setAddressLine] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');

  // Payment Selection
  const [paymentType, setPaymentType] = useState<PaymentType>('PARTIAL_COD_10');
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'CREDIT_CARD' | 'DEBIT_CARD' | 'NETBANKING' | 'INSTANT_EMI'>('UPI');
  const [selectedEmiPlan, setSelectedEmiPlan] = useState<EmiPlan | null>(
    deal?.emiPlans && deal.emiPlans.length > 0 ? deal.emiPlans[0] : null
  );

  // Policy Acceptance
  const [depositAgreementChecked, setDepositAgreementChecked] = useState(true);

  // Processing & Simulation State
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [orderCompletedId, setOrderCompletedId] = useState<string | null>(null);

  if (!deal) return null;

  const totalAmount = deal.dealPrice;
  const depositAmount = paymentType === 'PARTIAL_COD_10' 
    ? Math.round(totalAmount * 0.1) 
    : totalAmount;
  const remainingCodBalance = paymentType === 'PARTIAL_COD_10' 
    ? totalAmount - depositAmount 
    : 0;

  const handleCompleteOrder = () => {
    if (paymentType === 'PARTIAL_COD_10' && !depositAgreementChecked) {
      alert('Please review and accept the 10% Advance Security Deposit terms to proceed.');
      return;
    }

    if (!fullName || !phone || !addressLine || !pincode) {
      alert('Please fill in complete delivery details.');
      return;
    }

    setIsProcessingPayment(true);

    // Simulate Payment Gateway processing (UPI/Card 10% deposit or full payment)
    setTimeout(() => {
      const txnId = `TXN_${Date.now().toString().slice(-8)}_${paymentMethod}`;
      
      const newOrder = placeOrder({
        customer: {
          fullName,
          phone: `+91 ${phone}`,
          email,
          addressLine,
          city,
          state,
          pincode,
        },
        item: deal,
        quantity: 1,
        totalAmount,
        paymentType,
        selectedEmiPlan: paymentType === 'EMI_INSTANT' && selectedEmiPlan ? selectedEmiPlan : undefined,
        depositAmount,
        remainingCodBalance,
        paymentMethod,
        paymentTxnId: txnId,
        nonRefundableDepositAccepted: depositAgreementChecked,
      });

      setIsProcessingPayment(false);
      setOrderCompletedId(newOrder.id);
    }, 1200);
  };

  const handleClose = () => {
    setSelectedDealForCheckout(null);
    setOrderCompletedId(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full my-auto shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-slate-700" />
            <span className="text-sm font-bold text-slate-900">
              {orderCompletedId ? 'Order & Security Deposit Confirmed' : 'Secure Checkout & Payment Selection'}
            </span>
          </div>
          <button
            onClick={handleClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {orderCompletedId ? (
            /* Order Success View */
            <div className="text-center py-6 space-y-5">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <Check className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <div className="text-xs uppercase tracking-wider font-semibold text-emerald-600">
                  Transaction Successful
                </div>
                <h3 className="text-2xl font-bold text-slate-900">
                  {paymentType === 'PARTIAL_COD_10'
                    ? '10% Advance Booking Fee Paid!'
                    : 'Full Prepaid Order Confirmed!'}
                </h3>
                <p className="text-xs text-slate-500">
                  Order ID: <span className="font-mono font-bold text-slate-800">{orderCompletedId}</span>
                </p>
              </div>

              {/* Deposit & Balance Card */}
              <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 text-left space-y-3 max-w-md mx-auto text-xs">
                <div className="flex justify-between pb-2 border-b border-slate-200 text-slate-700">
                  <span>Product:</span>
                  <span className="font-semibold text-slate-900 text-right truncate max-w-[220px]">
                    {deal.title}
                  </span>
                </div>

                <div className="flex justify-between text-slate-700">
                  <span>Total Order Value:</span>
                  <span className="font-bold text-slate-900 tabular-nums">
                    ₹{totalAmount.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="flex justify-between text-emerald-700 font-semibold bg-emerald-50 p-2 rounded-lg">
                  <span>Amount Paid Online (Now):</span>
                  <span className="tabular-nums">
                    ₹{depositAmount.toLocaleString('en-IN')}
                  </span>
                </div>

                {paymentType === 'PARTIAL_COD_10' && (
                  <div className="flex justify-between text-amber-900 font-semibold bg-amber-50 p-2 rounded-lg border border-amber-200">
                    <span>Balance Payable to Courier on Delivery:</span>
                    <span className="tabular-nums font-bold">
                      ₹{remainingCodBalance.toLocaleString('en-IN')}
                    </span>
                  </div>
                )}

                <div className="pt-2 text-[11px] text-slate-500 leading-relaxed">
                  {paymentType === 'PARTIAL_COD_10' ? (
                    <p>
                      <strong>Alert sent to Admin Fulfillment Team:</strong> Our sourcing agent will now match this item with the lowest-priced authorized vendor and assign your tracking ID. Please keep ₹{remainingCodBalance.toLocaleString('en-IN')} ready for the courier.
                    </p>
                  ) : (
                    <p>
                      Your full payment is received. The warehouse team has initiated priority dispatch.
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                <button
                  onClick={() => {
                    handleClose();
                    setCurrentView('tracking');
                  }}
                  className="px-6 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 transition-colors shadow-sm"
                >
                  View Order E-Receipt & Live Tracking
                </button>
                {isAdminAuthenticated ? (
                  <button
                    onClick={() => {
                      handleClose();
                      setCurrentView('admin');
                    }}
                    className="px-6 py-2.5 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-xl text-xs font-semibold hover:bg-indigo-100 transition-colors"
                  >
                    Switch to Admin View (See Received Alert)
                  </button>
                ) : (
                  <button
                    onClick={handleClose}
                    className="px-6 py-2.5 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-xl text-xs font-semibold transition-colors"
                  >
                    Continue Shopping
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* Checkout Form */
            <>
              {/* Product Brief */}
              <div className="flex items-center gap-4 p-3 bg-slate-50 rounded-xl border border-slate-100">
                <ProductImage
                  src={deal.image}
                  alt={deal.title}
                  category={deal.category}
                  containerClassName="w-16 h-14 rounded-lg shrink-0 border border-slate-200 bg-white"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-slate-900 truncate">
                    {deal.title}
                  </h4>
                  <div className="text-[11px] text-slate-500">
                    <span>Deal Price: </span>
                    <span className="font-bold text-slate-900 tabular-nums">
                      ₹{deal.dealPrice.toLocaleString('en-IN')}
                    </span>
                    <span className="ml-2 text-slate-400 line-through tabular-nums">
                      ₹{deal.mrp.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Delivery Details Form */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600">
                    1. Shipping & Delivery Address
                  </h4>
                  <span className="text-[11px] text-slate-400">All fields required for courier dispatch</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Rahul Sharma"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-900 text-xs placeholder:text-slate-400 focus:ring-2 focus:ring-slate-900 focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      Mobile Number (For Courier OTP & Tracking) *
                    </label>
                    <input
                      type="tel"
                      maxLength={10}
                      placeholder="e.g. 9876543210 (10 digits)"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-900 text-xs placeholder:text-slate-400 focus:ring-2 focus:ring-slate-900 focus:outline-none font-mono"
                      required
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      Complete House / Street Address *
                    </label>
                    <input
                      type="text"
                      placeholder="Flat/House No., Building, Street, Area/Landmark"
                      value={addressLine}
                      onChange={(e) => setAddressLine(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-900 text-xs placeholder:text-slate-400 focus:ring-2 focus:ring-slate-900 focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Bengaluru / Delhi / Mumbai"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-900 text-xs placeholder:text-slate-400 focus:ring-2 focus:ring-slate-900 focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      PIN Code *
                    </label>
                    <input
                      type="text"
                      maxLength={6}
                      placeholder="e.g. 560038 (6 digits)"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-900 text-xs placeholder:text-slate-400 focus:ring-2 focus:ring-slate-900 focus:outline-none font-mono"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      State
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Karnataka / Maharashtra / Delhi"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-900 text-xs placeholder:text-slate-400 focus:ring-2 focus:ring-slate-900 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      Email Address (For E-Receipt)
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. customer@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-900 text-xs placeholder:text-slate-400 focus:ring-2 focus:ring-slate-900 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Methods (Step 1 of Prompt) */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600">
                    2. Select Payment Method
                  </h4>
                  <span className="text-[11px] text-indigo-600 font-semibold">
                    10% Booking or Full Prepaid / EMI
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Option B: Partial COD (10% Security Deposit) */}
                  <label
                    onClick={() => setPaymentType('PARTIAL_COD_10')}
                    className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between space-y-2 ${
                      paymentType === 'PARTIAL_COD_10'
                        ? 'border-indigo-600 bg-indigo-50/40 ring-1 ring-indigo-600'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                          <span>Option B: 10% Partial COD</span>
                          <span className="px-1.5 py-0.5 text-[10px] font-bold bg-amber-100 text-amber-800 rounded">
                            Popular
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-500 mt-1">
                          Pay 10% deposit now online, pay remaining 90% in cash/UPI to courier boy.
                        </div>
                      </div>
                      <input
                        type="radio"
                        checked={paymentType === 'PARTIAL_COD_10'}
                        onChange={() => setPaymentType('PARTIAL_COD_10')}
                        className="mt-1 text-indigo-600 focus:ring-indigo-500"
                      />
                    </div>

                    <div className="pt-2 border-t border-slate-200/60 flex items-baseline justify-between text-xs">
                      <span className="text-slate-600">Deposit Now:</span>
                      <span className="font-extrabold text-indigo-700 tabular-nums">
                        ₹{Math.round(totalAmount * 0.1).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </label>

                  {/* Option A: Full Prepaid Payment / Instant EMI */}
                  <label
                    onClick={() => setPaymentType('PREPAID_FULL')}
                    className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between space-y-2 ${
                      paymentType === 'PREPAID_FULL' || paymentType === 'EMI_INSTANT'
                        ? 'border-indigo-600 bg-indigo-50/40 ring-1 ring-indigo-600'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                          <span>Option A: Full Prepaid / EMI</span>
                          <span className="px-1.5 py-0.5 text-[10px] font-bold bg-emerald-100 text-emerald-800 rounded">
                            Recommended
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-500 mt-1">
                          100% Payment via UPI, Cards, Netbanking or Instant No-Cost EMI.
                        </div>
                      </div>
                      <input
                        type="radio"
                        checked={paymentType === 'PREPAID_FULL' || paymentType === 'EMI_INSTANT'}
                        onChange={() => setPaymentType('PREPAID_FULL')}
                        className="mt-1 text-indigo-600 focus:ring-indigo-500"
                      />
                    </div>

                    <div className="pt-2 border-t border-slate-200/60 flex items-baseline justify-between text-xs">
                      <span className="text-slate-600">Full Amount:</span>
                      <span className="font-extrabold text-slate-900 tabular-nums">
                        ₹{totalAmount.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </label>
                </div>

                {/* Strict No Pure COD Callout (Step 2 of prompt) */}
                <div className="p-3 bg-rose-50/70 border border-rose-200/80 rounded-xl flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0" />
                    <div>
                      <span className="font-bold text-rose-900">
                        Pure COD (0% Advance) is strictly disabled
                      </span>
                      <p className="text-[11px] text-rose-700">
                        Zero pure COD filters non-serious buyers and prevents stock locking.
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-rose-800 bg-rose-100 px-2 py-0.5 rounded">
                    BLOCKED
                  </span>
                </div>

                {/* Sub-Payment Method (UPI, Cards, EMI) */}
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-3">
                  <div className="text-xs font-semibold text-slate-700">
                    Pay Online Portion (₹{depositAmount.toLocaleString('en-IN')}) via:
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('UPI')}
                      className={`p-2.5 rounded-lg border flex flex-col items-center gap-1.5 transition-colors ${
                        paymentMethod === 'UPI'
                          ? 'border-indigo-600 bg-white font-bold text-indigo-700 shadow-sm'
                          : 'border-slate-200 bg-white/70 text-slate-600 hover:bg-white'
                      }`}
                    >
                      <QrCode className="w-4 h-4" />
                      <span>UPI QR / App</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('CREDIT_CARD')}
                      className={`p-2.5 rounded-lg border flex flex-col items-center gap-1.5 transition-colors ${
                        paymentMethod === 'CREDIT_CARD'
                          ? 'border-indigo-600 bg-white font-bold text-indigo-700 shadow-sm'
                          : 'border-slate-200 bg-white/70 text-slate-600 hover:bg-white'
                      }`}
                    >
                      <CreditCard className="w-4 h-4" />
                      <span>Credit Card</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('DEBIT_CARD')}
                      className={`p-2.5 rounded-lg border flex flex-col items-center gap-1.5 transition-colors ${
                        paymentMethod === 'DEBIT_CARD'
                          ? 'border-indigo-600 bg-white font-bold text-indigo-700 shadow-sm'
                          : 'border-slate-200 bg-white/70 text-slate-600 hover:bg-white'
                      }`}
                    >
                      <CreditCard className="w-4 h-4" />
                      <span>Debit Card</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setPaymentMethod('INSTANT_EMI');
                        setPaymentType('EMI_INSTANT');
                      }}
                      className={`p-2.5 rounded-lg border flex flex-col items-center gap-1.5 transition-colors ${
                        paymentMethod === 'INSTANT_EMI'
                          ? 'border-indigo-600 bg-white font-bold text-indigo-700 shadow-sm'
                          : 'border-slate-200 bg-white/70 text-slate-600 hover:bg-white'
                      }`}
                    >
                      <Clock className="w-4 h-4" />
                      <span>Instant EMI</span>
                    </button>
                  </div>

                  {paymentMethod === 'INSTANT_EMI' && deal.emiPlans && deal.emiPlans.length > 0 && (
                    <div className="pt-2 space-y-2">
                      <div className="text-[11px] font-semibold text-slate-700">
                        Choose EMI Tenure (Instant Approval via Razorpay/Cashfree):
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        {deal.emiPlans.map((plan) => (
                          <div
                            key={plan.months}
                            onClick={() => setSelectedEmiPlan(plan)}
                            className={`p-2.5 rounded-lg border cursor-pointer text-xs ${
                              selectedEmiPlan?.months === plan.months
                                ? 'border-indigo-600 bg-indigo-50/50 font-bold text-indigo-900'
                                : 'border-slate-200 bg-white text-slate-700'
                            }`}
                          >
                            <div className="flex justify-between">
                              <span>{plan.months} Months</span>
                              <span className="tabular-nums">₹{plan.perMonth.toLocaleString('en-IN')}/mo</span>
                            </div>
                            <div className="text-[10px] text-slate-500 font-normal">
                              {plan.provider} {plan.isNoCost ? '(0% No-Cost)' : ''}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Step 2: Strict Non-Refundable Deposit Warning (Fraud Protection) */}
              {paymentType === 'PARTIAL_COD_10' && (
                <div className="bg-amber-50/80 border border-amber-300 rounded-xl p-4 space-y-3">
                  <div className="flex items-start gap-2.5">
                    <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <div className="text-xs font-bold text-amber-900">
                        Non-Refundable Deposit Warning (Fraud Protection)
                      </div>
                      <p className="text-[11px] text-amber-900 leading-relaxed">
                        &quot;10% Advance Deposit order confirm karne aur courier dispatch handling ke liye hai. Agar customer product delivery ke wakt bina kisi valid reason ke reject karta hai, toh 10% deposit se courier / cancellation cost cover ho jayegi (Non-refundable).&quot;
                      </p>
                    </div>
                  </div>

                  <label className="flex items-start gap-2 pt-2 border-t border-amber-200/70 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={depositAgreementChecked}
                      onChange={(e) => setDepositAgreementChecked(e.target.checked)}
                      className="mt-0.5 text-amber-600 rounded focus:ring-amber-500"
                    />
                    <span className="text-[11px] font-semibold text-amber-950">
                      I understand and agree that the ₹{depositAmount.toLocaleString('en-IN')} security deposit confirms my dispatch order and covers reverse shipping in case of unprovoked rejection at doorstep.
                    </span>
                  </label>
                </div>
              )}

              {/* Order Summary Breakdown */}
              <div className="bg-slate-900 text-white rounded-xl p-4 space-y-2 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span>Product Deal Total:</span>
                  <span className="tabular-nums">₹{totalAmount.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-emerald-400 font-bold text-sm border-t border-slate-800 pt-2">
                  <span>Pay Now (Online Gateway):</span>
                  <span className="tabular-nums">₹{depositAmount.toLocaleString('en-IN')}</span>
                </div>
                {paymentType === 'PARTIAL_COD_10' && (
                  <div className="flex justify-between text-amber-300 text-xs font-semibold">
                    <span>Pay on Delivery (Courier Cash/UPI):</span>
                    <span className="tabular-nums">₹{remainingCodBalance.toLocaleString('en-IN')}</span>
                  </div>
                )}
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <button
                  type="button"
                  disabled={isProcessingPayment || (paymentType === 'PARTIAL_COD_10' && !depositAgreementChecked)}
                  onClick={handleCompleteOrder}
                  className={`w-full py-3.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                    isProcessingPayment || (paymentType === 'PARTIAL_COD_10' && !depositAgreementChecked)
                      ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                      : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md'
                  }`}
                >
                  {isProcessingPayment ? (
                    <span>Processing Gateway Authorization...</span>
                  ) : paymentType === 'PARTIAL_COD_10' ? (
                    <span>Pay ₹{depositAmount.toLocaleString('en-IN')} Booking Deposit & Confirm Order</span>
                  ) : (
                    <span>Pay Full ₹{depositAmount.toLocaleString('en-IN')} & Confirm Order</span>
                  )}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
