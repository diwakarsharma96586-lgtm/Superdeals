import React, { createContext, useContext, useState, useEffect } from 'react';
import { DealItem, Order, OrderStatus } from '../types';
import { 
  INITIAL_DEALS, 
  INITIAL_DRAFT_DEALS, 
  INITIAL_SAMPLE_ORDERS, 
  MULTI_CATEGORY_TRENDING_POOL,
  MAJOR_CATEGORIES,
  CATEGORY_DEFAULT_IMAGES,
  normalizeCategory
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
  fetchTrendingDraftDeals: () => { fetchedCount: number; platformBreakdown: string; categoriesList: string[] };
  refreshLiveDeals: () => { addedCount: number; categoriesCount: number };
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
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Upgrade any legacy local /src/assets paths to high-res Unsplash direct URLs
          const upgraded = parsed.map((d: DealItem) => {
            const initialMatch = INITIAL_DEALS.find((init) => init.id === d.id);
            if (!d.image || d.image.startsWith('/src/assets')) {
              return {
                ...d,
                image: initialMatch?.image || CATEGORY_DEFAULT_IMAGES[normalizeCategory(d.category)] || CATEGORY_DEFAULT_IMAGES['Mobiles & iPhones']
              };
            }
            return d;
          });

          // Merge to preserve any previously approved or added deals while guaranteeing the full expanded initial catalog
          const savedIds = new Set(upgraded.map((d: DealItem) => d.id));
          const missingInitial = INITIAL_DEALS.filter((d) => !savedIds.has(d.id));
          return [...upgraded, ...missingInitial];
        }
      }
    } catch {
      // fallback
    }
    return INITIAL_DEALS;
  });

  const [draftDeals, setDraftDeals] = useState<DealItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_DRAFTS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map((d: DealItem) => {
            if (!d.image || d.image.startsWith('/src/assets')) {
              return {
                ...d,
                image: CATEGORY_DEFAULT_IMAGES[normalizeCategory(d.category)] || CATEGORY_DEFAULT_IMAGES['Mobiles & iPhones']
              };
            }
            return d;
          });
        }
      }
    } catch {
      // fallback
    }
    return INITIAL_DRAFT_DEALS;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ORDERS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map((o: Order) => {
            if (o.item && (!o.item.image || o.item.image.startsWith('/src/assets'))) {
              return {
                ...o,
                item: {
                  ...o.item,
                  image: CATEGORY_DEFAULT_IMAGES[normalizeCategory(o.item.category)] || CATEGORY_DEFAULT_IMAGES['Mobiles & iPhones']
                }
              };
            }
            return o;
          });
        }
      }
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

  // Multi-Category Fetching across ALL 6 major categories with randomized variety & >8% discount filter
  const fetchTrendingDraftDeals = () => {
    const categoriesToFetch = [
      'Mobiles & iPhones',
      'Laptops & Computers',
      'Audio & Headphones',
      'Smartwatches & Wearables',
      'Smart TVs & Home Electronics',
      'Gaming Consoles & Accessories',
    ];

    const nowIso = new Date().toISOString();
    const newlyFetchedBatch: DealItem[] = [];

    // For EACH of the 6 categories, pick 1 random item from its pool to ensure all categories are represented
    categoriesToFetch.forEach((category) => {
      const categoryPool = MULTI_CATEGORY_TRENDING_POOL[category] || [];
      if (categoryPool.length === 0) return;

      // Pick random item from this category
      const randomIndex = Math.floor(Math.random() * categoryPool.length);
      const chosenItem = categoryPool[randomIndex];

      // Verify discount > 8%
      const discountPct = ((chosenItem.mrp - chosenItem.dealPrice) / chosenItem.mrp) * 100;
      const validPrice = discountPct > 8 ? chosenItem.dealPrice : Math.round(chosenItem.mrp * 0.86);

      // Verify category-specific high-res image
      const validImage = chosenItem.image || CATEGORY_DEFAULT_IMAGES[category] || '/src/assets/images/deals_smartphone_flagship_1790689474273.jpg';

      const randomSuffix = Math.floor(1000 + Math.random() * 9000);
      newlyFetchedBatch.push({
        ...chosenItem,
        id: `draft-${Date.now()}-${randomSuffix}`,
        category,
        image: validImage,
        dealPrice: validPrice,
        isDraft: true,
        fetchedAt: nowIso,
        sourceFeed: Math.random() > 0.5 ? 'Amazon' : 'Flipkart',
      });
    });

    // Shuffle the items so categories are intermixed with randomized variety
    const finalShuffled = [...newlyFetchedBatch].sort(() => 0.5 - Math.random());

    setDraftDeals((currentDrafts) => [...finalShuffled, ...currentDrafts]);

    return { 
      fetchedCount: finalShuffled.length, 
      platformBreakdown: 'Amazon India & Flipkart live feeds',
      categoriesList: categoriesToFetch
    };
  };

  // Instant storefront deal refresh with multi-category randomized variety
  const refreshLiveDeals = () => {
    const categoriesToRefresh = [
      'Mobiles & iPhones',
      'Laptops & Computers',
      'Audio & Headphones',
      'Smartwatches & Wearables',
      'Smart TVs & Home Electronics',
      'Gaming Consoles & Accessories',
    ];

    const freshLiveItems: DealItem[] = [];
    const nowIso = new Date().toISOString();

    categoriesToRefresh.forEach((category) => {
      const categoryPool = MULTI_CATEGORY_TRENDING_POOL[category] || [];
      if (categoryPool.length === 0) return;

      const randomItem = categoryPool[Math.floor(Math.random() * categoryPool.length)];
      const discountPct = ((randomItem.mrp - randomItem.dealPrice) / randomItem.mrp) * 100;
      const validPrice = discountPct > 8 ? randomItem.dealPrice : Math.round(randomItem.mrp * 0.86);
      const validImage = randomItem.image || CATEGORY_DEFAULT_IMAGES[category] || '/src/assets/images/deals_smartphone_flagship_1790689474273.jpg';

      const randomSuffix = Math.floor(1000 + Math.random() * 9000);
      freshLiveItems.push({
        ...randomItem,
        id: `live-${Date.now()}-${randomSuffix}`,
        category,
        image: validImage,
        dealPrice: validPrice,
        isDraft: false,
        fetchedAt: nowIso,
        sourceFeed: Math.random() > 0.5 ? 'Amazon' : 'Flipkart',
      });
    });

    setDeals((prev) => [...freshLiveItems, ...prev]);

    return {
      addedCount: freshLiveItems.length,
      categoriesCount: categoriesToRefresh.length
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
        refreshLiveDeals,
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
