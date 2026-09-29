export type PaymentType = 'PREPAID_FULL' | 'EMI_INSTANT' | 'PARTIAL_COD_10';

export type OrderStatus = 
  | 'NEW_ORDER' 
  | 'SOURCING' 
  | 'VENDOR_ORDERED' 
  | 'DISPATCHED' 
  | 'OUT_FOR_DELIVERY' 
  | 'DELIVERED' 
  | 'CANCELLED_REJECTED';

export interface EmiPlan {
  months: number;
  perMonth: number;
  interestRate: number; // percentage, e.g. 0 for No Cost, or 12
  provider: string; // e.g., 'HDFC Bank', 'Bajaj Finserv', 'ICICI'
  isNoCost?: boolean;
}

export interface VendorSource {
  name: 'Amazon' | 'Flipkart' | 'Wholesaler' | 'Reliance Digital';
  price: number;
  inStock: boolean;
  deliveryDays: number;
  codAvailable: boolean;
  productUrl: string;
}

export interface DealItem {
  id: string;
  title: string;
  category: string;
  brand: string;
  image: string;
  mrp: number;
  dealPrice: number;
  specs: string[];
  inStock: boolean;
  rating: number;
  reviewCount: number;
  emiPlans: EmiPlan[];
  vendorSources: VendorSource[];
  highlightBadge?: string;
  description: string;
}

export interface OrderCustomer {
  fullName: string;
  phone: string;
  email: string;
  addressLine: string;
  city: string;
  state: string;
  pincode: string;
}

export interface VendorFulfillment {
  vendorName: string;
  vendorOrderId: string;
  vendorPurchaseCost: number;
  adminProfit: number;
  orderedAt: string;
  courierPartner: string;
  trackingNumber: string;
  trackingUrl: string;
  dispatchDate?: string;
  estimatedDelivery?: string;
  notes?: string;
}

export interface OrderNotification {
  id: string;
  timestamp: string;
  title: string;
  message: string;
  type: 'ORDER_PLACED' | 'DISPATCHED' | 'TRACKING_UPDATED' | 'OUT_FOR_DELIVERY' | 'DELIVERED';
}

export interface Order {
  id: string; // e.g. ORD-84920
  createdAt: string;
  customer: OrderCustomer;
  item: DealItem;
  quantity: number;
  totalAmount: number;
  paymentType: PaymentType;
  selectedEmiPlan?: EmiPlan;
  depositAmount: number; // 10% for PARTIAL_COD_10, or 100% for PREPAID_FULL / EMI_INSTANT
  remainingCodBalance: number; // 90% for PARTIAL_COD_10, 0 for PREPAID
  paymentMethod: 'UPI' | 'CREDIT_CARD' | 'DEBIT_CARD' | 'NETBANKING' | 'INSTANT_EMI';
  paymentTxnId: string;
  status: OrderStatus;
  nonRefundableDepositAccepted: boolean;
  vendorFulfillment?: VendorFulfillment;
  notifications: OrderNotification[];
}
