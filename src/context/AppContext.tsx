import React, { createContext, useContext, useState, useEffect } from 'react';
import { DealItem, Order, OrderStatus } from '../types';
import { INITIAL_DEALS, INITIAL_SAMPLE_ORDERS } from '../data/mockDeals';

interface AppContextType {
  deals: DealItem[];
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
  isAdminLoginModalOpen: boolean;
  setIsAdminLoginModalOpen: (open: boolean) => void;
  unlockAdmin: (pin: string) => boolean;
  logoutAdmin: () => void;
  // Actions
  addNewDeal: (deal: Omit<DealItem, 'id' | 'rating' | 'reviewCount'>) => void;
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

const STORAGE_KEY_DEALS = 'deals_aggregator_items_v2';
const STORAGE_KEY_ORDERS = 'deals_aggregator_orders_v2';
const ADMIN_SECRET_PIN = '2026';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [deals, setDeals] = useState<DealItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_DEALS);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_DEALS;
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
    if (pin.trim() === ADMIN_SECRET_PIN || pin.trim() === '1234') {
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

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    try {
      sessionStorage.removeItem('deals_admin_auth');
    } catch {
      // ignore
    }
    setViewInternal('marketplace');
  };

  const addNewDeal = (dealData: Omit<DealItem, 'id' | 'rating' | 'reviewCount'>) => {
    const newDeal: DealItem = {
      ...dealData,
      id: `deal-${Date.now()}`,
      rating: 4.8,
      reviewCount: 1,
    };
    setDeals((prev) => [newDeal, ...prev]);
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
    setOrders(INITIAL_SAMPLE_ORDERS);
    localStorage.removeItem(STORAGE_KEY_DEALS);
    localStorage.removeItem(STORAGE_KEY_ORDERS);
  };

  return (
    <AppContext.Provider
      value={{
        deals,
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
        isAdminLoginModalOpen,
        setIsAdminLoginModalOpen,
        unlockAdmin,
        logoutAdmin,
        addNewDeal,
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
