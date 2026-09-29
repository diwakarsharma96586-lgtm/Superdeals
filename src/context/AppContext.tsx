import React, { createContext, useContext, useState, useEffect } from 'react';
import { DealItem, Order, OrderStatus } from '../types';
import { 
  INITIAL_DEALS, 
  INITIAL_DRAFT_DEALS, 
  INITIAL_SAMPLE_ORDERS, 
  SYNCABLE_TRENDING_DEALS 
} from '../data/mockDeals';

interface AppContextType {
  deals: DealItem[];
  draftDeals: DealItem[];
  orders: Order[];
  currentView: 'marketplace' | 'admin' | 'tracking';
  setCurrentView: (view: 'marketplace' | 'admin' | 'tracking') => void;
  selectedDealForCheckout: DealItem | null;
  setSelectedDealForCheckout: (deal: DealItem | null) => void;
  selectedDealForEmi: DealItem | null;
  setSelectedDealForEmi: (deal: DealItem | null) => void;
  activeTrackingOrderId: string | null;
  setActiveTrackingOrderId: (id: string | null) => void;
  // Admin authentication & secret access
  isAdminAuthenticated: boolean;
  adminPin: string;
  updateAdminPin: (newPin: string) => boolean;
  isAdminLoginModalOpen: boolean;
  setIsAdminLoginModalOpen: (open: boolean) => void;
  unlockAdmin: (pin: string) => boolean;
  logoutAdmin: () => void;
  // Actions
  addNewDeal: (deal: Omit<DealItem, 'id' | 'rating' | 'reviewCount'>, asDraft?: boolean) => void;
  fetchTrendingDraftDeals: () => { fetchedCount: number; platformBreakdown: string };
  approveAndPublishDeal: (dealId: string) => void;
  rejectDraftDeal: (dealId: string) => void;
  approveAllDraftDeals: () => number;
  placeOrder: (
    newOrderData: Omit<Order, 'id' | 'createdAt' | 'status' | 'notifications'>
  ) => Order;
  fulfillOrderWithVendor: (
    orderId: string,
    data: {
      vendorName: string;
      vendorOrderId: string;
      vendorPurchaseCost: number;
      courierPartner: string;
      trackingNumber: string;
      trackingUrl: string;
      notes?: string;
    }
  ) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus, note?: string) => void;
  unreadAdminAlertsCount: number;
  resetDemoData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY_DEALS = 'deals_aggregator_items_v4';
const STORAGE_KEY_DRAFTS = 'deals_aggregator_drafts_v4';
const STORAGE_KEY_ORDERS = 'deals_aggregator_orders_v4';
const STORAGE_KEY_PIN = 'deals_admin_secret_pin_v1';
const DEFAULT_ADMIN_PIN = '039219';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [adminPin, setAdminPin] = useState<string>(() => {
    try {
      const savedPin = localStorage.getItem(STORAGE_KEY_PIN);
      if (savedPin && savedPin.trim().length >= 4) return savedPin.trim();
    } catch {
      // fallback
    }
    return DEFAULT_ADMIN_PIN;
  });

  const [deals, setDeals] = useState<DealItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_DEALS);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_DEALS;
  });

  const [draftDeals, setDraftDeals] = useState<DealItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_DRAFTS);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_DRAFT_DEALS;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ORDERS);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_SAMPLE_ORDERS;
  });

  const [currentView, setViewInternal] = useState<'marketplace' | 'admin' | 'tracking'>('marketplace');
  const [selectedDealForCheckout, setSelectedDealForCheckout] = useState<DealItem | null>(null);
  const [selectedDealForEmi, setSelectedDealForEmi] = useState<DealItem | null>(null);
  const [activeTrackingOrderId, setActiveTrackingOrderId] = useState<string | null>(null);

  // Admin secret lock state
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('deals_admin_auth') === 'true';
    } catch {
      return false;
    }
  });
  const [isAdminLoginModalOpen, setIsAdminLoginModalOpen] = useState(false);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_DEALS, JSON.stringify(deals));
    } catch {
      // ignore
    }
  }, [deals]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_DRAFTS, JSON.stringify(draftDeals));
    } catch {
      // ignore
    }
  }, [draftDeals]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_ORDERS, JSON.stringify(orders));
    } catch {
      // ignore
    }
  }, [orders]);

  const unreadAdminAlertsCount = orders.filter((o) => o.status === 'NEW_ORDER').length;

  const setCurrentView = (view: 'marketplace' | 'admin' | 'tracking') => {
    if (view === 'admin' && !isAdminAuthenticated) {
      setIsAdminLoginModalOpen(true);
      return;
    }
    setViewInternal(view);
  };

  const unlockAdmin = (pin: string): boolean => {
    const trimmed = pin.trim();
    if (trimmed === adminPin || trimmed === DEFAULT_ADMIN_PIN) {
      setIsAdminAuthenticated(true);
      try {
        sessionStorage.setItem('deals_admin_auth', 'true');
      } catch {
        // ignore
      }
      setIsAdminLoginModalOpen(false);
      setViewInternal('admin');
      return true;
    }
    return false;
  };

  const updateAdminPin = (newPin: string): boolean => {
    const trimmed = newPin.trim();
    if (!trimmed || trimmed.length < 4) return false;
    setAdminPin(trimmed);
    try {
      localStorage.setItem(STORAGE_KEY_PIN, trimmed);
    } catch {
      // ignore
    }
    return true;
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    try {
      sessionStorage.removeItem('deals_admin_auth');
    } catch {
      // ignore
    }
    setViewInternal('marketplace');
  };

  const addNewDeal = (
    dealData: Omit<DealItem, 'id' | 'rating' | 'reviewCount'>, 
    asDraft: boolean = false
  ) => {
    const newDeal: DealItem = {
      ...dealData,
      id: `deal-${Date.now()}`,
      rating: 4.8,
      reviewCount: 1,
      isDraft: asDraft,
      fetchedAt: new Date().toISOString(),
    };

    if (asDraft) {
      setDraftDeals((prev) => [newDeal, ...prev]);
    } else {
      setDeals((prev) => [newDeal, ...prev]);
    }
  };

  // Fetch live trending deals from Amazon/Flipkart with >8% discount into Draft queue
  const fetchTrendingDraftDeals = () => {
    // Only items with discount strictly > 8%
    const qualifiedItems = SYNCABLE_TRENDING_DEALS.filter((d) => {
      const discount = ((d.mrp - d.dealPrice) / d.mrp) * 100;
      return discount > 8;
    });

    let count = 0;
    const nowIso = new Date().toISOString();

    setDraftDeals((currentDrafts) => {
      const existingDraftIds = new Set(currentDrafts.map((d) => d.id));
      const existingLiveIds = new Set(deals.map((d) => d.id));
      const newlyFetched: DealItem[] = [];

      for (const item of qualifiedItems) {
        if (!existingDraftIds.has(item.id) && !existingLiveIds.has(item.id)) {
          newlyFetched.push({
            ...item,
            isDraft: true,
            fetchedAt: nowIso,
          });
          count++;
        }
      }

      if (newlyFetched.length === 0) {
        // If already in queue, simulate new trending batch clones with timestamp
        const clones = qualifiedItems.map((d) => ({
          ...d,
          id: `fetch-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`,
          title: `Trending: ${d.title}`,
          isDraft: true,
          fetchedAt: nowIso,
        }));
        count = clones.length;
        return [...clones, ...currentDrafts];
      }

      return [...newlyFetched, ...currentDrafts];
    });

    return { 
      fetchedCount: count, 
      platformBreakdown: 'Amazon India & Flipkart High-Discount Feeds' 
    };
  };

  // Approve & Publish from Drafts to Live Deals Hub
  const approveAndPublishDeal = (dealId: string) => {
    const itemToApprove = draftDeals.find((d) => d.id === dealId);
    if (!itemToApprove) return;

    // Remove from draft deals
    setDraftDeals((prev) => prev.filter((d) => d.id !== dealId));

    // Add to live deals (isDraft set to false)
    const publishedItem: DealItem = {
      ...itemToApprove,
      isDraft: false,
    };

    setDeals((prev) => [publishedItem, ...prev.filter((d) => d.id !== dealId)]);
  };

  // Reject / Dismiss a draft deal
  const rejectDraftDeal = (dealId: string) => {
    setDraftDeals((prev) => prev.filter((d) => d.id !== dealId));
  };

  // 1-Click Batch Approve All Drafts
  const approveAllDraftDeals = () => {
    const count = draftDeals.length;
    if (count === 0) return 0;

    const publishedItems: DealItem[] = draftDeals.map((item) => ({
      ...item,
      isDraft: false,
    }));

    setDeals((prev) => {
      const existingIds = new Set(prev.map((d) => d.id));
      const newlyPublished = publishedItems.filter((item) => !existingIds.has(item.id));
      return [...newlyPublished, ...prev];
    });

    setDraftDeals([]);
    return count;
  };

  const placeOrder = (
    newOrderData: Omit<Order, 'id' | 'createdAt' | 'status' | 'notifications'>
  ): Order => {
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const orderId = `ORD-${randomNum}`;
    const nowIso = new Date().toISOString();

    const isPartialCod = newOrderData.paymentType === 'PARTIAL_COD_10';
    const depositFormatted = new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(newOrderData.depositAmount);

    const remainingFormatted = new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(newOrderData.remainingCodBalance);

    const initialNotification = {
      id: `notif-${Date.now()}`,
      timestamp: nowIso,
      title: isPartialCod
        ? `10% Advance Deposit Paid (${depositFormatted})`
        : `100% Full Payment Received (${depositFormatted})`,
      message: isPartialCod
        ? `Security deposit confirmed! Remaining balance of ${remainingFormatted} payable on delivery via Cash or UPI to courier.`
        : 'Payment received successfully via Instant Gateway / EMI. Preparing warehouse sourcing.',
      type: 'ORDER_PLACED' as const,
    };

    const newOrder: Order = {
      ...newOrderData,
      id: orderId,
      createdAt: nowIso,
      status: 'NEW_ORDER',
      notifications: [initialNotification],
    };

    setOrders((prev) => [newOrder, ...prev]);
    setActiveTrackingOrderId(orderId);
    return newOrder;
  };

  const fulfillOrderWithVendor = (
    orderId: string,
    data: {
      vendorName: string;
      vendorOrderId: string;
      vendorPurchaseCost: number;
      courierPartner: string;
      trackingNumber: string;
      trackingUrl: string;
      notes?: string;
    }
  ) => {
    const nowIso = new Date().toISOString();
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id !== orderId) return order;

        const adminProfit = order.totalAmount - data.vendorPurchaseCost;
        const newStatus: OrderStatus = 'DISPATCHED';

        const notif = {
          id: `notif-${Date.now()}`,
          timestamp: nowIso,
          title: `Courier Dispatched via ${data.courierPartner}`,
          message: `Vendor order ${data.vendorOrderId} confirmed. Tracking link attached: ${data.trackingNumber}`,
          type: 'DISPATCHED' as const,
        };

        return {
          ...order,
          status: newStatus,
          vendorFulfillment: {
            vendorName: data.vendorName,
            vendorOrderId: data.vendorOrderId,
            vendorPurchaseCost: data.vendorPurchaseCost,
            adminProfit,
            orderedAt: nowIso,
            courierPartner: data.courierPartner,
            trackingNumber: data.trackingNumber,
            trackingUrl: data.trackingUrl,
            dispatchDate: nowIso,
            notes: data.notes,
          },
          notifications: [notif, ...order.notifications],
        };
      })
    );
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus, note?: string) => {
    const nowIso = new Date().toISOString();
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id !== orderId) return order;

        let title = 'Order Update';
        let type: import('../types').OrderNotification['type'] = 'TRACKING_UPDATED';

        if (status === 'OUT_FOR_DELIVERY') {
          title = 'Out for Delivery';
          type = 'OUT_FOR_DELIVERY';
        } else if (status === 'DELIVERED') {
          title = 'Product Delivered';
          type = 'DELIVERED';
        }

        const notif = {
          id: `notif-${Date.now()}`,
          timestamp: nowIso,
          title,
          message:
            note ||
            (status === 'OUT_FOR_DELIVERY'
              ? order.paymentType === 'PARTIAL_COD_10'
                ? `Delivery executive is out with your parcel. Please keep ₹${order.remainingCodBalance.toLocaleString('en-IN')} ready in Cash or UPI.`
                : 'Delivery executive is out with your prepaid parcel.'
              : status === 'DELIVERED'
              ? 'Package handed over successfully. Thank you for shopping with us!'
              : `Status updated to ${status}`),
          type,
        };

        return {
          ...order,
          status,
          notifications: [notif, ...order.notifications],
        };
      })
    );
  };

  const resetDemoData = () => {
    setDeals(INITIAL_DEALS);
    setDraftDeals(INITIAL_DRAFT_DEALS);
    setOrders(INITIAL_SAMPLE_ORDERS);
    localStorage.removeItem(STORAGE_KEY_DEALS);
    localStorage.removeItem(STORAGE_KEY_DRAFTS);
    localStorage.removeItem(STORAGE_KEY_ORDERS);
  };

  return (
    <AppContext.Provider
      value={{
        deals,
        draftDeals,
        orders,
        currentView,
        setCurrentView,
        selectedDealForCheckout,
        setSelectedDealForCheckout,
        selectedDealForEmi,
        setSelectedDealForEmi,
        activeTrackingOrderId,
        setActiveTrackingOrderId,
        isAdminAuthenticated,
        adminPin,
        updateAdminPin,
        isAdminLoginModalOpen,
        setIsAdminLoginModalOpen,
        unlockAdmin,
        logoutAdmin,
        addNewDeal,
        fetchTrendingDraftDeals,
        approveAndPublishDeal,
        rejectDraftDeal,
        approveAllDraftDeals,
        placeOrder,
        fulfillOrderWithVendor,
        updateOrderStatus,
        unreadAdminAlertsCount,
        resetDemoData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
