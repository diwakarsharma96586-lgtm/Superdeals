import { DealItem } from '../types';

export const INITIAL_DEALS: DealItem[] = [
  {
    id: 'deal-iphone-15-pro',
    title: 'Apple iPhone 15 Pro (128 GB) - Natural Titanium',
    category: 'iPhones',
    brand: 'Apple',
    image: '/src/assets/images/deals_smartphone_flagship_1790689474273.jpg',
    mrp: 134900,
    dealPrice: 119900,
    description: 'Forged in titanium featuring the ground-breaking A17 Pro chip, customisable Action button, and 48MP main camera with 3x optical telephoto lens.',
    specs: [
      '6.1" Super Retina XDR OLED ProMotion 120Hz',
      'A17 Pro 3nm Flagship Bionic Chip',
      '48MP + 12MP + 12MP Pro Camera System',
      'Aerospace-Grade Natural Titanium Frame'
    ],
    inStock: true,
    rating: 4.8,
    reviewCount: 1420,
    highlightBadge: 'Hot Deal · Save ₹15,000',
    emiPlans: [
      { months: 3, perMonth: 39967, interestRate: 0, provider: 'HDFC Bank No-Cost EMI', isNoCost: true },
      { months: 6, perMonth: 19984, interestRate: 0, provider: 'Bajaj Finserv Insta EMI', isNoCost: true },
      { months: 9, perMonth: 13988, interestRate: 12, provider: 'ICICI Bank Credit Card' },
      { months: 12, perMonth: 10658, interestRate: 14, provider: 'SBI Card EMI' },
    ],
    vendorSources: [
      {
        name: 'Amazon',
        price: 116499,
        inStock: true,
        deliveryDays: 2,
        codAvailable: true,
        productUrl: 'https://amazon.in/dp/B0CHX1W1XY'
      },
      {
        name: 'Flipkart',
        price: 117200,
        inStock: true,
        deliveryDays: 3,
        codAvailable: true,
        productUrl: 'https://flipkart.com/apple-iphone-15-pro'
      },
      {
        name: 'Wholesaler',
        price: 114000,
        inStock: true,
        deliveryDays: 4,
        codAvailable: true,
        productUrl: 'https://wholesale-direct.in/sku/a15p-128-ti'
      }
    ]
  },
  {
    id: 'deal-ps5-slim',
    title: 'Sony PlayStation 5 Slim Console (Disc Edition)',
    category: 'Gaming Consoles',
    brand: 'Sony',
    image: '/src/assets/images/deals_gaming_console_1790689489683.jpg',
    mrp: 54990,
    dealPrice: 47990,
    description: 'Slim design with 1TB ultra-high speed SSD storage, DualSense wireless controller with haptic feedback, adaptive triggers, and ray tracing support.',
    specs: [
      'Custom 8-core AMD Zen 2 CPU & RDNA 2 GPU',
      '1TB Ultra-High Speed Custom NVMe SSD',
      '4K 120Hz HDR Output with Ray Tracing',
      'DualSense Wireless Controller with Haptics'
    ],
    inStock: true,
    rating: 4.9,
    reviewCount: 884,
    highlightBadge: 'Flash Offer · ₹7,000 Off',
    emiPlans: [
      { months: 3, perMonth: 15997, interestRate: 0, provider: 'Bajaj Finserv No-Cost', isNoCost: true },
      { months: 6, perMonth: 7999, interestRate: 0, provider: 'HDFC Cardless EMI', isNoCost: true },
      { months: 9, perMonth: 5599, interestRate: 12, provider: 'Axis Bank Easy EMI' },
      { months: 12, perMonth: 4266, interestRate: 14, provider: 'Kotak Smart EMI' },
    ],
    vendorSources: [
      {
        name: 'Wholesaler',
        price: 43500,
        inStock: true,
        deliveryDays: 2,
        codAvailable: true,
        productUrl: 'https://wholesale-direct.in/sku/ps5-slim-disc'
      },
      {
        name: 'Amazon',
        price: 44990,
        inStock: true,
        deliveryDays: 1,
        codAvailable: true,
        productUrl: 'https://amazon.in/dp/B0CL5KGY9T'
      },
      {
        name: 'Flipkart',
        price: 45490,
        inStock: true,
        deliveryDays: 2,
        codAvailable: true,
        productUrl: 'https://flipkart.com/sony-ps5-slim-console'
      }
    ]
  },
  {
    id: 'deal-apple-watch-ultra-2',
    title: 'Apple Watch Ultra 2 (GPS + Cellular, 49mm) - Titanium',
    category: 'Smartwatches',
    brand: 'Apple',
    image: '/src/assets/images/deals_smartwatch_rugged_1790694792732.jpg',
    mrp: 89900,
    dealPrice: 79900,
    description: 'The most rugged and capable Apple Watch. Designed for outdoor adventure, endurance training and water sports with lightweight titanium case and dual-frequency GPS.',
    specs: [
      '49mm Aerospace-grade Titanium Case with Sapphire Front',
      '3000 nits Always-On Retina Display with Night Mode',
      'Precision Dual-Frequency GPS & 100m Water Resistance',
      'Up to 72 hours battery life in Low Power Mode'
    ],
    inStock: true,
    rating: 4.9,
    reviewCount: 930,
    highlightBadge: 'Adventure Edition · Save ₹10,000',
    emiPlans: [
      { months: 3, perMonth: 26633, interestRate: 0, provider: 'HDFC Bank No-Cost EMI', isNoCost: true },
      { months: 6, perMonth: 13316, interestRate: 0, provider: 'Bajaj Finserv Insta EMI', isNoCost: true },
      { months: 9, perMonth: 9322, interestRate: 12, provider: 'ICICI Bank EasyPay' },
      { months: 12, perMonth: 7104, interestRate: 14, provider: 'Axis Bank PineLabs' }
    ],
    vendorSources: [
      {
        name: 'Wholesaler',
        price: 73500,
        inStock: true,
        deliveryDays: 2,
        codAvailable: true,
        productUrl: 'https://wholesale-direct.in/sku/aw-ultra2-ti'
      },
      {
        name: 'Amazon',
        price: 75990,
        inStock: true,
        deliveryDays: 1,
        codAvailable: true,
        productUrl: 'https://amazon.in/dp/B0CHX8Y54M'
      },
      {
        name: 'Flipkart',
        price: 76490,
        inStock: true,
        deliveryDays: 2,
        codAvailable: true,
        productUrl: 'https://flipkart.com/apple-watch-ultra-2'
      }
    ]
  },
  {
    id: 'deal-macbook-air-m2',
    title: 'Apple MacBook Air M2 Chip (13.6-inch, 8GB, 256GB SSD)',
    category: 'Laptops',
    brand: 'Apple',
    image: '/src/assets/images/deals_premium_laptop_1790689523020.jpg',
    mrp: 99900,
    dealPrice: 84900,
    description: 'Incredibly thin and light silent fanless laptop. Up to 18 hours of battery life, striking Liquid Retina display, and 1080p FaceTime HD camera.',
    specs: [
      'Apple M2 8-Core CPU & 8-Core GPU',
      '13.6" Liquid Retina Display with True Tone',
      '8GB Unified Memory & 256GB Superfast SSD',
      'MagSafe 3 Charging & Up to 18h Battery'
    ],
    inStock: true,
    rating: 4.9,
    reviewCount: 1690,
    highlightBadge: 'Special Deal · Flat ₹15,000 Off',
    emiPlans: [
      { months: 3, perMonth: 28300, interestRate: 0, provider: 'Apple Authorised No-Cost', isNoCost: true },
      { months: 6, perMonth: 14150, interestRate: 0, provider: 'HDFC Instant Pay Later', isNoCost: true },
      { months: 9, perMonth: 9905, interestRate: 12, provider: 'ICICI EasyPay' },
      { months: 12, perMonth: 7548, interestRate: 13, provider: 'Axis Bank PineLabs' }
    ],
    vendorSources: [
      {
        name: 'Amazon',
        price: 79990,
        inStock: true,
        deliveryDays: 1,
        codAvailable: true,
        productUrl: 'https://amazon.in/dp/B0B3C4VS8Y'
      },
      {
        name: 'Flipkart',
        price: 81490,
        inStock: true,
        deliveryDays: 3,
        codAvailable: true,
        productUrl: 'https://flipkart.com/apple-macbook-air-m2'
      },
      {
        name: 'Wholesaler',
        price: 77500,
        inStock: true,
        deliveryDays: 3,
        codAvailable: true,
        productUrl: 'https://wholesale-direct.in/sku/mba-m2-starlight'
      }
    ]
  }
];

export const INITIAL_SAMPLE_ORDERS: import('../types').Order[] = [
  {
    id: 'ORD-98421',
    createdAt: '2026-09-28T14:30:00Z',
    customer: {
      fullName: 'Rahul Verma',
      phone: '+91 98765 43210',
      email: 'rahul.verma@example.com',
      addressLine: 'Flat 402, Lotus Residency, MG Road, Sector 14',
      city: 'Gurugram',
      state: 'Haryana',
      pincode: '122001'
    },
    item: INITIAL_DEALS[1], // PS5 Slim
    quantity: 1,
    totalAmount: 47990,
    paymentType: 'PARTIAL_COD_10',
    depositAmount: 4799, // 10%
    remainingCodBalance: 43191, // 90%
    paymentMethod: 'UPI',
    paymentTxnId: 'UPI/20260928/9981249018',
    status: 'DISPATCHED',
    nonRefundableDepositAccepted: true,
    vendorFulfillment: {
      vendorName: 'Wholesaler',
      vendorOrderId: 'WH-908123-DL',
      vendorPurchaseCost: 43500,
      adminProfit: 4490,
      orderedAt: '2026-09-28T15:10:00Z',
      courierPartner: 'Delhivery Surface Pro',
      trackingNumber: 'DEL994821038IN',
      trackingUrl: 'https://delhivery.com/track/DEL994821038IN',
      dispatchDate: '2026-09-29T09:00:00Z',
      estimatedDelivery: '2026-10-01'
    },
    notifications: [
      {
        id: 'notif-1',
        timestamp: '2026-09-28T14:31:00Z',
        title: '10% Advance Deposit Received (₹4,799)',
        message: 'Your order is confirmed! ₹43,191 cash/UPI will be collected on delivery.',
        type: 'ORDER_PLACED'
      },
      {
        id: 'notif-2',
        timestamp: '2026-09-29T09:15:00Z',
        title: 'Courier Dispatched via Delhivery',
        message: 'Tracking #DEL994821038IN has been attached. Delivery expected by Oct 01.',
        type: 'DISPATCHED'
      }
    ]
  },
  {
    id: 'ORD-98435',
    createdAt: '2026-09-29T05:15:00Z',
    customer: {
      fullName: 'Pooja Sundaram',
      phone: '+91 91234 56789',
      email: 'pooja.s@example.com',
      addressLine: 'Villa 18, Palm Meadows, Whitefield',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560066'
    },
    item: INITIAL_DEALS[0], // iPhone 15 Pro
    quantity: 1,
    totalAmount: 119900,
    paymentType: 'PARTIAL_COD_10',
    depositAmount: 11990, // 10%
    remainingCodBalance: 107910, // 90%
    paymentMethod: 'CREDIT_CARD',
    paymentTxnId: 'PAY_CC_8892104992',
    status: 'NEW_ORDER',
    nonRefundableDepositAccepted: true,
    notifications: [
      {
        id: 'notif-3',
        timestamp: '2026-09-29T05:16:00Z',
        title: '10% Partial COD Booking Received',
        message: '₹11,990 paid online. Admin is verifying the best vendor for shipment dispatch.',
        type: 'ORDER_PLACED'
      }
    ]
  },
  {
    id: 'ORD-98448',
    createdAt: '2026-09-29T07:45:00Z',
    customer: {
      fullName: 'Vikram Malhotra',
      phone: '+91 98111 22334',
      email: 'vikram.m@example.com',
      addressLine: 'A-12, Sector 50, Nirvana Country',
      city: 'Gurugram',
      state: 'Haryana',
      pincode: '122018'
    },
    item: INITIAL_DEALS[2], // Apple Watch Ultra 2
    quantity: 1,
    totalAmount: 79900,
    paymentType: 'PARTIAL_COD_10',
    depositAmount: 7990, // 10%
    remainingCodBalance: 71910, // 90%
    paymentMethod: 'UPI',
    paymentTxnId: 'UPI/20260929/881239014',
    status: 'NEW_ORDER',
    nonRefundableDepositAccepted: true,
    notifications: [
      {
        id: 'notif-4',
        timestamp: '2026-09-29T07:46:00Z',
        title: '10% Security Deposit Confirmed (₹7,990)',
        message: 'Order placed for Apple Watch Ultra 2. Courier COD balance ₹71,910 ready for dispatch.',
        type: 'ORDER_PLACED'
      }
    ]
  }
];
