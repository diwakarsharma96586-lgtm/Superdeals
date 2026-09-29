import { DealItem } from '../types';

export const INITIAL_DEALS: DealItem[] = [
  // 1. Smartphones / iPhones
  {
    id: 'deal-iphone-15-pro',
    title: 'Apple iPhone 15 Pro (128 GB) - Natural Titanium',
    category: 'Smartphones',
    brand: 'Apple',
    image: '/src/assets/images/deals_smartphone_flagship_1790689474273.jpg',
    mrp: 134900,
    dealPrice: 119900, // 11.1% discount (> 8%)
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
    highlightBadge: '11% OFF · Save ₹15,000',
    emiPlans: [
      { months: 3, perMonth: 39967, interestRate: 0, provider: 'HDFC Bank No-Cost EMI', isNoCost: true },
      { months: 6, perMonth: 19984, interestRate: 0, provider: 'Bajaj Finserv Insta EMI', isNoCost: true },
      { months: 12, perMonth: 10658, interestRate: 14, provider: 'SBI Card EMI' },
    ],
    vendorSources: [
      { name: 'Amazon', price: 116499, inStock: true, deliveryDays: 2, codAvailable: true, productUrl: 'https://amazon.in' },
      { name: 'Flipkart', price: 117200, inStock: true, deliveryDays: 3, codAvailable: true, productUrl: 'https://flipkart.com' },
      { name: 'Wholesaler', price: 114000, inStock: true, deliveryDays: 4, codAvailable: true, productUrl: 'https://wholesale-direct.in' }
    ]
  },
  {
    id: 'deal-samsung-s24-ultra',
    title: 'Samsung Galaxy S24 Ultra 5G (Titanium Gray, 256GB, AI Powered)',
    category: 'Smartphones',
    brand: 'Samsung',
    image: '/src/assets/images/deals_smartphone_flagship_1790689474273.jpg',
    mrp: 129999,
    dealPrice: 108999, // 16.2% discount (> 8%)
    description: 'Galaxy AI is here. 200MP Quad Telephoto zoom, built-in S Pen, Snapdragon 8 Gen 3 for Galaxy, and durable titanium frame.',
    specs: [
      '6.8" Dynamic AMOLED 2X 120Hz Corning Gorilla Armor',
      '200MP + 50MP + 12MP + 10MP Quad Tele System with AI Zoom',
      'Qualcomm Snapdragon 8 Gen 3 (4nm)',
      '5000 mAh All-Day Battery with 45W Fast Charge'
    ],
    inStock: true,
    rating: 4.8,
    reviewCount: 1105,
    highlightBadge: '16% OFF · Flat ₹21,000 Off',
    emiPlans: [
      { months: 3, perMonth: 36333, interestRate: 0, provider: 'No-Cost EMI HDFC', isNoCost: true },
      { months: 6, perMonth: 18166, interestRate: 0, provider: 'Bajaj Insta EMI', isNoCost: true },
      { months: 12, perMonth: 9680, interestRate: 13, provider: 'SBI Card FlexiPay' }
    ],
    vendorSources: [
      { name: 'Amazon', price: 104990, inStock: true, deliveryDays: 1, codAvailable: true, productUrl: 'https://amazon.in' },
      { name: 'Flipkart', price: 106490, inStock: true, deliveryDays: 2, codAvailable: true, productUrl: 'https://flipkart.com' },
      { name: 'Wholesaler', price: 102500, inStock: true, deliveryDays: 3, codAvailable: true, productUrl: 'https://wholesale-direct.in' }
    ]
  },
  {
    id: 'deal-iphone-15-plus',
    title: 'Apple iPhone 15 Plus (256 GB) - Blue Dynamic Island',
    category: 'Smartphones',
    brand: 'Apple',
    image: '/src/assets/images/deals_smartphone_flagship_1790689474273.jpg',
    mrp: 89900,
    dealPrice: 77990, // 13.2% discount (> 8%)
    description: 'Dynamic Island, 48MP main camera, USB-C, and incredible all-day battery life with A16 Bionic chip.',
    specs: [
      '6.7" Super Retina XDR OLED Display',
      'A16 Bionic Chip with 5-Core GPU',
      '48MP Advanced Dual-Camera System',
      'All-Day Battery Life up to 26 hours'
    ],
    inStock: true,
    rating: 4.8,
    reviewCount: 1840,
    highlightBadge: '13% OFF · Amazon Verified',
    emiPlans: [
      { months: 3, perMonth: 25997, interestRate: 0, provider: 'HDFC No-Cost EMI', isNoCost: true },
      { months: 6, perMonth: 12998, interestRate: 0, provider: 'Bajaj Insta EMI', isNoCost: true },
      { months: 12, perMonth: 6932, interestRate: 13, provider: 'SBI Card EMI' }
    ],
    vendorSources: [
      { name: 'Amazon', price: 74990, inStock: true, deliveryDays: 1, codAvailable: true, productUrl: 'https://amazon.in' },
      { name: 'Flipkart', price: 75490, inStock: true, deliveryDays: 2, codAvailable: true, productUrl: 'https://flipkart.com' },
      { name: 'Wholesaler', price: 72000, inStock: true, deliveryDays: 3, codAvailable: true, productUrl: 'https://wholesale-direct.in' }
    ]
  },
  {
    id: 'deal-oneplus-12',
    title: 'OnePlus 12 5G (Silky Black, 16GB RAM, 512GB Storage)',
    category: 'Smartphones',
    brand: 'OnePlus',
    image: '/src/assets/images/deals_smartphone_flagship_1790689474273.jpg',
    mrp: 69999,
    dealPrice: 59999, // 14.3% discount (> 8%)
    description: '4th Gen Hasselblad Camera System for Mobile, Snapdragon 8 Gen 3, 2K 120Hz ProXDR display, and 100W SUPERVOOC charging.',
    specs: [
      '6.82" 2K 120Hz ProXDR Display with Aqua Touch',
      'Qualcomm Snapdragon 8 Gen 3 Processor',
      'Hasselblad 50MP + 64MP 3X Periscope + 48MP Ultrawide',
      '5400 mAh Battery with 100W Flash Charging'
    ],
    inStock: true,
    rating: 4.7,
    reviewCount: 930,
    highlightBadge: '14% OFF · Save ₹10,000',
    emiPlans: [
      { months: 3, perMonth: 19999, interestRate: 0, provider: 'ICICI Bank No-Cost', isNoCost: true },
      { months: 6, perMonth: 9999, interestRate: 0, provider: 'HDFC EasyEMI', isNoCost: true },
      { months: 12, perMonth: 5333, interestRate: 12, provider: 'Axis Bank EMI' }
    ],
    vendorSources: [
      { name: 'Wholesaler', price: 56500, inStock: true, deliveryDays: 2, codAvailable: true, productUrl: 'https://wholesale-direct.in' },
      { name: 'Amazon', price: 57990, inStock: true, deliveryDays: 1, codAvailable: true, productUrl: 'https://amazon.in' },
      { name: 'Flipkart', price: 58490, inStock: true, deliveryDays: 2, codAvailable: true, productUrl: 'https://flipkart.com' }
    ]
  },

  // 2. Laptops
  {
    id: 'deal-macbook-air-m2',
    title: 'Apple MacBook Air M2 Chip (13.6-inch, 8GB, 256GB SSD)',
    category: 'Laptops',
    brand: 'Apple',
    image: '/src/assets/images/deals_premium_laptop_1790689523020.jpg',
    mrp: 99900,
    dealPrice: 84900, // 15.0% discount (> 8%)
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
    highlightBadge: '15% OFF · Flat ₹15,000 Off',
    emiPlans: [
      { months: 3, perMonth: 28300, interestRate: 0, provider: 'Apple Authorised No-Cost', isNoCost: true },
      { months: 6, perMonth: 14150, interestRate: 0, provider: 'HDFC Instant Pay Later', isNoCost: true },
      { months: 12, perMonth: 7548, interestRate: 13, provider: 'Axis Bank PineLabs' }
    ],
    vendorSources: [
      { name: 'Amazon', price: 79990, inStock: true, deliveryDays: 1, codAvailable: true, productUrl: 'https://amazon.in' },
      { name: 'Flipkart', price: 81490, inStock: true, deliveryDays: 3, codAvailable: true, productUrl: 'https://flipkart.com' },
      { name: 'Wholesaler', price: 77500, inStock: true, deliveryDays: 3, codAvailable: true, productUrl: 'https://wholesale-direct.in' }
    ]
  },
  {
    id: 'deal-asus-rog-strix',
    title: 'ASUS ROG Strix G16 Gaming Laptop (16", RTX 4060, i7 13th Gen)',
    category: 'Laptops',
    brand: 'ASUS',
    image: '/src/assets/images/deals_premium_laptop_1790689523020.jpg',
    mrp: 154990,
    dealPrice: 134990, // 12.9% discount (> 8%)
    description: 'Dominate esports with Intel Core i7-13650HX processor, NVIDIA GeForce RTX 4060 GPU with 140W max TGP, and 165Hz ROG Nebula Display.',
    specs: [
      '16" FHD+ 165Hz 100% sRGB Display with G-SYNC',
      '13th Gen Intel Core i7-13650HX 14 Cores',
      'NVIDIA GeForce RTX 4060 8GB GDDR6 (140W)',
      '16GB DDR5 4800MHz & 1TB PCIe 4.0 NVMe SSD'
    ],
    inStock: true,
    rating: 4.7,
    reviewCount: 780,
    highlightBadge: '13% OFF · Save ₹20,000',
    emiPlans: [
      { months: 3, perMonth: 44997, interestRate: 0, provider: 'No-Cost ICICI', isNoCost: true },
      { months: 6, perMonth: 22498, interestRate: 0, provider: 'HDFC EasyEMI', isNoCost: true },
      { months: 12, perMonth: 11990, interestRate: 14, provider: 'Axis Bank EMI' }
    ],
    vendorSources: [
      { name: 'Flipkart', price: 129990, inStock: true, deliveryDays: 2, codAvailable: true, productUrl: 'https://flipkart.com' },
      { name: 'Amazon', price: 131990, inStock: true, deliveryDays: 2, codAvailable: true, productUrl: 'https://amazon.in' },
      { name: 'Wholesaler', price: 126000, inStock: true, deliveryDays: 3, codAvailable: true, productUrl: 'https://wholesale-direct.in' }
    ]
  },
  {
    id: 'deal-lenovo-legion-5',
    title: 'Lenovo Legion Slim 5 AMD Ryzen 7 (16" WQXGA 165Hz, RTX 4060)',
    category: 'Laptops',
    brand: 'Lenovo',
    image: '/src/assets/images/deals_premium_laptop_1790689523020.jpg',
    mrp: 132990,
    dealPrice: 114990, // 13.5% discount (> 8%)
    description: 'Powered by AMD Ryzen 7 7840HS and NVIDIA GeForce RTX 4060 with AI Engine+ Legion Coldfront 5.0 thermal technology.',
    specs: [
      '16" WQXGA 165Hz 100% sRGB 300nits Anti-Glare',
      'AMD Ryzen 7 7840HS (8 Cores / 16 Threads)',
      'NVIDIA GeForce RTX 4060 8GB GDDR6 (140W)',
      '16GB DDR5 5600MHz & 1TB M.2 NVMe SSD'
    ],
    inStock: true,
    rating: 4.8,
    reviewCount: 650,
    highlightBadge: '14% OFF · Top Performance',
    emiPlans: [
      { months: 3, perMonth: 38330, interestRate: 0, provider: 'No-Cost HDFC', isNoCost: true },
      { months: 6, perMonth: 19165, interestRate: 0, provider: 'Bajaj Finserv Insta EMI', isNoCost: true },
      { months: 12, perMonth: 10212, interestRate: 13, provider: 'Axis Bank EMI' }
    ],
    vendorSources: [
      { name: 'Flipkart', price: 109990, inStock: true, deliveryDays: 2, codAvailable: true, productUrl: 'https://flipkart.com' },
      { name: 'Amazon', price: 111990, inStock: true, deliveryDays: 2, codAvailable: true, productUrl: 'https://amazon.in' },
      { name: 'Wholesaler', price: 106500, inStock: true, deliveryDays: 3, codAvailable: true, productUrl: 'https://wholesale-direct.in' }
    ]
  },
  {
    id: 'deal-dell-xps-13',
    title: 'Dell XPS 13 Plus Ultrabook (13.4" 3.5K OLED, Intel Core i7 13th Gen)',
    category: 'Laptops',
    brand: 'Dell',
    image: '/src/assets/images/deals_premium_laptop_1790689523020.jpg',
    mrp: 179900,
    dealPrice: 154900, // 13.9% discount (> 8%)
    description: 'Iconic seamless capacitive glass touchpad, zero-lattice keyboard, and stunning 3.5K OLED touch display with 100% DCI-P3.',
    specs: [
      '13.4" 3.5K (3456x2160) OLED InfinityEdge Touch',
      '13th Gen Intel Core i7-1360P 12-Core Processor',
      '16GB LPDDR5 6000MHz & 1TB PCIe 4.0 NVMe SSD',
      'CNC Machined Aluminum & Gorilla Glass 7 Body'
    ],
    inStock: true,
    rating: 4.8,
    reviewCount: 420,
    highlightBadge: '14% OFF · Save ₹25,000',
    emiPlans: [
      { months: 3, perMonth: 51633, interestRate: 0, provider: 'HDFC No-Cost', isNoCost: true },
      { months: 6, perMonth: 25816, interestRate: 0, provider: 'Bajaj Finserv Zero Down', isNoCost: true },
      { months: 12, perMonth: 13755, interestRate: 14, provider: 'Kotak Smart EMI' }
    ],
    vendorSources: [
      { name: 'Wholesaler', price: 145000, inStock: true, deliveryDays: 2, codAvailable: true, productUrl: 'https://wholesale-direct.in' },
      { name: 'Amazon', price: 149990, inStock: true, deliveryDays: 1, codAvailable: true, productUrl: 'https://amazon.in' },
      { name: 'Flipkart', price: 151200, inStock: true, deliveryDays: 2, codAvailable: true, productUrl: 'https://flipkart.com' }
    ]
  },

  // 3. Smartwatches
  {
    id: 'deal-apple-watch-ultra-2',
    title: 'Apple Watch Ultra 2 (GPS + Cellular, 49mm Rugged Titanium)',
    category: 'Smartwatches',
    brand: 'Apple',
    image: '/src/assets/images/deals_smartwatch_rugged_1790694792732.jpg',
    mrp: 89900,
    dealPrice: 78990, // 12.1% discount (> 8%)
    description: 'The most capable and rugged Apple Watch. S9 SiP chip, 3000 nits display, precision dual-frequency GPS, and up to 72 hours of battery in Low Power Mode.',
    specs: [
      '49mm Aerospace-Grade Titanium Case with Sapphire Crystal',
      '3000 nits Always-On Retina Display with Modular Ultra Face',
      'Precision Dual-Frequency L1 & L5 GPS & Action Button',
      'Water Resistant 100m with EN13319 Dive Computer Certification'
    ],
    inStock: true,
    rating: 4.9,
    reviewCount: 890,
    highlightBadge: '12% OFF · Save ₹10,910',
    emiPlans: [
      { months: 3, perMonth: 26330, interestRate: 0, provider: 'Apple Authorised No-Cost', isNoCost: true },
      { months: 6, perMonth: 13165, interestRate: 0, provider: 'HDFC Instant EMI', isNoCost: true },
      { months: 12, perMonth: 7015, interestRate: 13, provider: 'SBI Card EMI' }
    ],
    vendorSources: [
      { name: 'Amazon', price: 75990, inStock: true, deliveryDays: 1, codAvailable: true, productUrl: 'https://amazon.in' },
      { name: 'Flipkart', price: 76490, inStock: true, deliveryDays: 2, codAvailable: true, productUrl: 'https://flipkart.com' },
      { name: 'Wholesaler', price: 73500, inStock: true, deliveryDays: 3, codAvailable: true, productUrl: 'https://wholesale-direct.in' }
    ]
  },
  {
    id: 'deal-galaxy-watch-6',
    title: 'Samsung Galaxy Watch 6 Classic (47mm Bluetooth, Rotating Bezel)',
    category: 'Smartwatches',
    brand: 'Samsung',
    image: '/src/assets/images/deals_smartwatch_rugged_1790694792732.jpg',
    mrp: 40999,
    dealPrice: 32999, // 19.5% discount (> 8%)
    description: 'Timeless stainless steel rotating physical bezel, advanced sleep coaching, BIA body composition analysis, and sapphire crystal glass.',
    specs: [
      '47mm Premium Stainless Steel with Physical Rotating Bezel',
      'Sapphire Crystal Super AMOLED Always-On Display',
      'BioActive Sensor: ECG, Heart Rate & BIA Body Composition',
      'Wear OS Powered by Samsung & 425 mAh Fast Charge Battery'
    ],
    inStock: true,
    rating: 4.7,
    reviewCount: 1120,
    highlightBadge: '20% OFF · Save ₹8,000',
    emiPlans: [
      { months: 3, perMonth: 11000, interestRate: 0, provider: 'No-Cost HDFC', isNoCost: true },
      { months: 6, perMonth: 5500, interestRate: 0, provider: 'Bajaj Finserv Zero Down', isNoCost: true },
      { months: 12, perMonth: 2930, interestRate: 12, provider: 'ICICI EasyPay' }
    ],
    vendorSources: [
      { name: 'Wholesaler', price: 29500, inStock: true, deliveryDays: 2, codAvailable: true, productUrl: 'https://wholesale-direct.in' },
      { name: 'Amazon', price: 30990, inStock: true, deliveryDays: 1, codAvailable: true, productUrl: 'https://amazon.in' },
      { name: 'Flipkart', price: 31490, inStock: true, deliveryDays: 2, codAvailable: true, productUrl: 'https://flipkart.com' }
    ]
  },

  // 4. Audio / Headphones
  {
    id: 'deal-sony-wh1000xm5',
    title: 'Sony WH-1000XM5 Wireless Industry Leading ANC Headphones',
    category: 'Audio',
    brand: 'Sony',
    image: '/src/assets/images/deals_audio_headphones_1790697009858.jpg',
    mrp: 34990,
    dealPrice: 26990, // 22.9% discount (> 8%)
    description: 'Two processors and 8 microphones for unprecedented noise cancellation. Auto NC Optimizer, 30-hour battery life, and crystal clear hands-free calling.',
    specs: [
      'Dual Processor V1 & QN1 Active Noise Cancelling',
      'Precision Voice Pickup with 4 Beamforming Mics',
      '30-Hour Battery with 3-Min Quick Charge (3 Hours Play)',
      'Multipoint Connection & Speak-to-Chat Technology'
    ],
    inStock: true,
    rating: 4.8,
    reviewCount: 3120,
    highlightBadge: '23% OFF · Save ₹8,000',
    emiPlans: [
      { months: 3, perMonth: 8997, interestRate: 0, provider: 'HDFC Bank No-Cost EMI', isNoCost: true },
      { months: 6, perMonth: 4498, interestRate: 0, provider: 'Bajaj Finserv Zero Down', isNoCost: true },
      { months: 12, perMonth: 2399, interestRate: 14, provider: 'SBI Card EMI' }
    ],
    vendorSources: [
      { name: 'Wholesaler', price: 23900, inStock: true, deliveryDays: 2, codAvailable: true, productUrl: 'https://wholesale-direct.in' },
      { name: 'Amazon', price: 24990, inStock: true, deliveryDays: 1, codAvailable: true, productUrl: 'https://amazon.in' },
      { name: 'Flipkart', price: 25490, inStock: true, deliveryDays: 2, codAvailable: true, productUrl: 'https://flipkart.com' }
    ]
  },
  {
    id: 'deal-airpods-pro-2',
    title: 'Apple AirPods Pro (2nd Generation) with USB-C MagSafe Case',
    category: 'Audio',
    brand: 'Apple',
    image: '/src/assets/images/deals_audio_headphones_1790697009858.jpg',
    mrp: 24900,
    dealPrice: 19990, // 19.7% discount (> 8%)
    description: 'Up to 2x more Active Noise Cancellation, Adaptive Audio, Transparency mode, and Personalized Spatial Audio with dynamic head tracking.',
    specs: [
      'Apple H2 Headphone Chip & Custom Driver',
      'USB-C MagSafe Case with Speaker & Lanyard Loop',
      'Up to 6 hours listening time with ANC enabled',
      'Dust, sweat and water resistant (IP54)'
    ],
    inStock: true,
    rating: 4.9,
    reviewCount: 4210,
    highlightBadge: '20% OFF · Apple Verified',
    emiPlans: [
      { months: 3, perMonth: 6663, interestRate: 0, provider: 'Apple Authorised No-Cost', isNoCost: true },
      { months: 6, perMonth: 3331, interestRate: 0, provider: 'Bajaj Insta EMI', isNoCost: true },
      { months: 12, perMonth: 1775, interestRate: 13, provider: 'SBI Card EMI' }
    ],
    vendorSources: [
      { name: 'Amazon', price: 18490, inStock: true, deliveryDays: 1, codAvailable: true, productUrl: 'https://amazon.in' },
      { name: 'Flipkart', price: 18990, inStock: true, deliveryDays: 2, codAvailable: true, productUrl: 'https://flipkart.com' },
      { name: 'Wholesaler', price: 17500, inStock: true, deliveryDays: 3, codAvailable: true, productUrl: 'https://wholesale-direct.in' }
    ]
  },
  {
    id: 'deal-bose-qc-ultra',
    title: 'Bose QuietComfort Ultra Wireless Noise Cancelling Headphones',
    category: 'Audio',
    brand: 'Bose',
    image: '/src/assets/images/deals_audio_headphones_1790697009858.jpg',
    mrp: 35900,
    dealPrice: 29990, // 16.5% discount (> 8%)
    description: 'World-class noise cancellation, breakthrough spatialized audio, and CustomTune technology to tailor sound to your ears.',
    specs: [
      'Immersive Spatialized Audio Technology',
      'CustomTune Sound Calibration for Ear Shape',
      'Up to 24-Hour Battery Life with USB-C Quick Charge',
      'Ultra-Plush Protein Leather Ear Cushions'
    ],
    inStock: true,
    rating: 4.8,
    reviewCount: 1420,
    highlightBadge: '16% OFF · Bose Immersive',
    emiPlans: [
      { months: 3, perMonth: 9997, interestRate: 0, provider: 'HDFC No-Cost EMI', isNoCost: true },
      { months: 6, perMonth: 4998, interestRate: 0, provider: 'Bajaj Insta EMI', isNoCost: true },
      { months: 12, perMonth: 2665, interestRate: 13, provider: 'SBI Card EMI' }
    ],
    vendorSources: [
      { name: 'Amazon', price: 27990, inStock: true, deliveryDays: 1, codAvailable: true, productUrl: 'https://amazon.in' },
      { name: 'Flipkart', price: 28490, inStock: true, deliveryDays: 2, codAvailable: true, productUrl: 'https://flipkart.com' },
      { name: 'Wholesaler', price: 26500, inStock: true, deliveryDays: 3, codAvailable: true, productUrl: 'https://wholesale-direct.in' }
    ]
  },

  // 5. Smart TVs
  {
    id: 'deal-lg-oled-55',
    title: 'LG 55-inch 4K OLED Cinema Display Smart TV (120Hz Dolby Vision)',
    category: 'Smart TVs',
    brand: 'LG',
    image: '/src/assets/images/deals_smart_tv_display_1790689504174.jpg',
    mrp: 149990,
    dealPrice: 119990, // 20.0% discount (> 8%)
    description: 'Self-lit OLED pixels for infinite contrast and 100% color fidelity. α9 AI 4K Gen6 processor, Dolby Vision, Atmos, and NVIDIA G-Sync gaming.',
    specs: [
      '55" 4K UHD Self-Lit OLED Display with Infinite Contrast',
      '120Hz Refresh Rate with 0.1ms Response Time & G-Sync',
      'α9 AI Processor 4K Gen6 with AI Super Upscaling',
      'webOS 23 with Hands-Free Voice Control & Apple AirPlay 2'
    ],
    inStock: true,
    rating: 4.9,
    reviewCount: 780,
    highlightBadge: '20% OFF · Save ₹30,000',
    emiPlans: [
      { months: 3, perMonth: 39997, interestRate: 0, provider: 'No-Cost HDFC', isNoCost: true },
      { months: 6, perMonth: 19998, interestRate: 0, provider: 'Bajaj Finserv Zero Down', isNoCost: true },
      { months: 12, perMonth: 10655, interestRate: 13, provider: 'ICICI EasyPay' }
    ],
    vendorSources: [
      { name: 'Wholesaler', price: 112000, inStock: true, deliveryDays: 2, codAvailable: true, productUrl: 'https://wholesale-direct.in' },
      { name: 'Amazon', price: 115990, inStock: true, deliveryDays: 2, codAvailable: true, productUrl: 'https://amazon.in' },
      { name: 'Flipkart', price: 116490, inStock: true, deliveryDays: 2, codAvailable: true, productUrl: 'https://flipkart.com' }
    ]
  },
  {
    id: 'deal-sony-bravia-65',
    title: 'Sony Bravia 65-inch 4K Ultra HD Smart Google TV (Triluminos Pro)',
    category: 'Smart TVs',
    brand: 'Sony',
    image: '/src/assets/images/deals_smart_tv_display_1790689504174.jpg',
    mrp: 109900,
    dealPrice: 89990, // 18.1% discount (> 8%)
    description: 'Over a billion colors brought to life by 4K HDR Processor X1 and Triluminos Pro. Motionflow XR 200, Dolby Atmos, and built-in Google TV.',
    specs: [
      '65" 4K HDR LED with 4K Processor X1 & 4K X-Reality PRO',
      'Triluminos Pro Natural Color Reproduction',
      'Open Baffle Speaker with Dolby Audio & Acoustic Auto Calibration',
      'Google TV with Google Assistant & Chromecast Built-in'
    ],
    inStock: true,
    rating: 4.8,
    reviewCount: 940,
    highlightBadge: '18% OFF · Flat ₹19,910 Off',
    emiPlans: [
      { months: 3, perMonth: 29997, interestRate: 0, provider: 'HDFC No-Cost', isNoCost: true },
      { months: 6, perMonth: 14998, interestRate: 0, provider: 'Bajaj Insta EMI', isNoCost: true },
      { months: 12, perMonth: 7990, interestRate: 14, provider: 'SBI Card FlexiPay' }
    ],
    vendorSources: [
      { name: 'Amazon', price: 85990, inStock: true, deliveryDays: 2, codAvailable: true, productUrl: 'https://amazon.in' },
      { name: 'Flipkart', price: 86490, inStock: true, deliveryDays: 2, codAvailable: true, productUrl: 'https://flipkart.com' },
      { name: 'Wholesaler', price: 82500, inStock: true, deliveryDays: 3, codAvailable: true, productUrl: 'https://wholesale-direct.in' }
    ]
  },

  // 6. Gaming
  {
    id: 'deal-ps5-slim',
    title: 'Sony PlayStation 5 Slim Console (Disc Edition with 1TB SSD)',
    category: 'Gaming',
    brand: 'Sony',
    image: '/src/assets/images/deals_gaming_console_1790689489683.jpg',
    mrp: 54990,
    dealPrice: 47990, // 12.7% discount (> 8%)
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
    highlightBadge: '13% OFF · ₹7,000 Off',
    emiPlans: [
      { months: 3, perMonth: 15997, interestRate: 0, provider: 'Bajaj Finserv No-Cost', isNoCost: true },
      { months: 6, perMonth: 7999, interestRate: 0, provider: 'HDFC Cardless EMI', isNoCost: true },
      { months: 12, perMonth: 4266, interestRate: 14, provider: 'Kotak Smart EMI' },
    ],
    vendorSources: [
      { name: 'Wholesaler', price: 43500, inStock: true, deliveryDays: 2, codAvailable: true, productUrl: 'https://wholesale-direct.in' },
      { name: 'Amazon', price: 44990, inStock: true, deliveryDays: 1, codAvailable: true, productUrl: 'https://amazon.in' },
      { name: 'Flipkart', price: 45490, inStock: true, deliveryDays: 2, codAvailable: true, productUrl: 'https://flipkart.com' }
    ]
  },
  {
    id: 'deal-xbox-series-x',
    title: 'Microsoft Xbox Series X Console (1TB Custom NVMe SSD, True 4K)',
    category: 'Gaming',
    brand: 'Microsoft',
    image: '/src/assets/images/deals_gaming_console_1790689489683.jpg',
    mrp: 55990,
    dealPrice: 48990, // 12.5% discount (> 8%)
    description: 'The fastest, most powerful Xbox ever. Play thousands of titles from four generations of consoles with 12 teraflops of raw graphic processing power.',
    specs: [
      '12 Teraflops of Raw Graphic Processing Power',
      '1TB Custom NVMe SSD & Xbox Velocity Architecture',
      'True 4K Gaming up to 120 FPS & 8K HDR Ready',
      'DirectX Raytracing & Spatial Sound 3D Audio'
    ],
    inStock: true,
    rating: 4.8,
    reviewCount: 960,
    highlightBadge: '13% OFF · 12 Teraflops',
    emiPlans: [
      { months: 3, perMonth: 16330, interestRate: 0, provider: 'No-Cost HDFC', isNoCost: true },
      { months: 6, perMonth: 8165, interestRate: 0, provider: 'Bajaj Finserv Zero Down', isNoCost: true },
      { months: 12, perMonth: 4355, interestRate: 14, provider: 'Kotak Smart EMI' }
    ],
    vendorSources: [
      { name: 'Wholesaler', price: 44200, inStock: true, deliveryDays: 2, codAvailable: true, productUrl: 'https://wholesale-direct.in' },
      { name: 'Amazon', price: 45990, inStock: true, deliveryDays: 1, codAvailable: true, productUrl: 'https://amazon.in' },
      { name: 'Flipkart', price: 46490, inStock: true, deliveryDays: 2, codAvailable: true, productUrl: 'https://flipkart.com' }
    ]
  }
];

// Preloaded Draft Deals awaiting admin approval
export const INITIAL_DRAFT_DEALS: DealItem[] = [
  {
    id: 'draft-ipad-air-m2',
    title: 'Apple iPad Air 11-inch M2 (Wi-Fi, 128GB - Space Gray)',
    category: 'Laptops',
    brand: 'Apple',
    image: '/src/assets/images/deals_premium_laptop_1790689523020.jpg',
    mrp: 59900,
    dealPrice: 51990, // 13.2% discount (> 8%)
    description: 'Supercharged by Apple M2 chip. Liquid Retina display, landscape 12MP front camera with Center Stage, and Wi-Fi 6E.',
    specs: [
      '11-inch Liquid Retina Display with P3 Wide Color',
      'Apple M2 8-Core CPU & 9-Core GPU',
      'Works with Apple Pencil Pro & Magic Keyboard',
      '12MP Landscape Ultra Wide Front Camera'
    ],
    inStock: true,
    rating: 4.8,
    reviewCount: 520,
    highlightBadge: 'Amazon Deal Sync · 13% OFF',
    isDraft: true,
    sourceFeed: 'Amazon',
    fetchedAt: '2026-09-29T10:00:00Z',
    emiPlans: [
      { months: 3, perMonth: 17330, interestRate: 0, provider: 'HDFC No-Cost EMI', isNoCost: true },
      { months: 6, perMonth: 8665, interestRate: 0, provider: 'Bajaj Insta EMI', isNoCost: true },
      { months: 12, perMonth: 4620, interestRate: 13, provider: 'SBI Card EMI' }
    ],
    vendorSources: [
      { name: 'Amazon', price: 49490, inStock: true, deliveryDays: 1, codAvailable: true, productUrl: 'https://amazon.in' },
      { name: 'Flipkart', price: 49990, inStock: true, deliveryDays: 2, codAvailable: true, productUrl: 'https://flipkart.com' },
      { name: 'Wholesaler', price: 47500, inStock: true, deliveryDays: 3, codAvailable: true, productUrl: 'https://wholesale-direct.in' }
    ]
  },
  {
    id: 'draft-samsung-neo-qled-65',
    title: 'Samsung 65-inch Neo QLED 4K Smart TV (Quantum Matrix Tech)',
    category: 'Smart TVs',
    brand: 'Samsung',
    image: '/src/assets/images/deals_smart_tv_display_1790689504174.jpg',
    mrp: 184900,
    dealPrice: 149990, // 18.9% discount (> 8%)
    description: 'Quantum Matrix Technology with Mini LEDs, Neural Quantum Processor 4K, Dolby Atmos, and Neo Quantum HDR+.',
    specs: [
      '65" 4K Neo QLED with Quantum Matrix Mini LED',
      'Neural Quantum Processor 4K with AI Upscaling',
      'Real Depth Enhancer & Anti-Reflection Screen',
      'Object Tracking Sound+ with 60W 4.2.2Ch Audio'
    ],
    inStock: true,
    rating: 4.8,
    reviewCount: 340,
    highlightBadge: 'Flipkart Deal Sync · 19% OFF',
    isDraft: true,
    sourceFeed: 'Flipkart',
    fetchedAt: '2026-09-29T10:05:00Z',
    emiPlans: [
      { months: 3, perMonth: 49997, interestRate: 0, provider: 'No-Cost ICICI', isNoCost: true },
      { months: 6, perMonth: 24998, interestRate: 0, provider: 'HDFC EasyEMI', isNoCost: true },
      { months: 12, perMonth: 13320, interestRate: 14, provider: 'Axis Bank EMI' }
    ],
    vendorSources: [
      { name: 'Flipkart', price: 142000, inStock: true, deliveryDays: 2, codAvailable: true, productUrl: 'https://flipkart.com' },
      { name: 'Amazon', price: 144500, inStock: true, deliveryDays: 2, codAvailable: true, productUrl: 'https://amazon.in' },
      { name: 'Wholesaler', price: 138000, inStock: true, deliveryDays: 3, codAvailable: true, productUrl: 'https://wholesale-direct.in' }
    ]
  },
  {
    id: 'draft-garmin-fenix-7',
    title: 'Garmin Fenix 7 Pro Sapphire Solar GPS Multisport Smartwatch',
    category: 'Smartwatches',
    brand: 'Garmin',
    image: '/src/assets/images/deals_smartwatch_rugged_1790694792732.jpg',
    mrp: 99990,
    dealPrice: 84990, // 15.0% discount (> 8%)
    description: 'Solar charging lens extends battery life up to 37 days. Built-in LED flashlight, endurance score, and TopoActive multi-continent maps.',
    specs: [
      'Power Sapphire Solar Charging Display with Titanium Bezel',
      'Up to 37 Days Battery Life in Smartwatch Mode with Solar',
      'Multi-Band GPS with SatIQ Technology & Built-in Flashlight',
      'Advanced Training Metrics, HRV Status & Hill Score'
    ],
    inStock: true,
    rating: 4.9,
    reviewCount: 310,
    highlightBadge: 'Amazon Deal Sync · 15% OFF',
    isDraft: true,
    sourceFeed: 'Amazon',
    fetchedAt: '2026-09-29T10:10:00Z',
    emiPlans: [
      { months: 3, perMonth: 28330, interestRate: 0, provider: 'HDFC No-Cost EMI', isNoCost: true },
      { months: 6, perMonth: 14165, interestRate: 0, provider: 'Bajaj Insta EMI', isNoCost: true },
      { months: 12, perMonth: 7550, interestRate: 13, provider: 'SBI Card EMI' }
    ],
    vendorSources: [
      { name: 'Amazon', price: 81000, inStock: true, deliveryDays: 1, codAvailable: true, productUrl: 'https://amazon.in' },
      { name: 'Flipkart', price: 82200, inStock: true, deliveryDays: 2, codAvailable: true, productUrl: 'https://flipkart.com' },
      { name: 'Wholesaler', price: 78500, inStock: true, deliveryDays: 3, codAvailable: true, productUrl: 'https://wholesale-direct.in' }
    ]
  }
];

// Rich pool of trending deals fetched when Admin clicks 'Fetch Trending Deals (>8% Off)'
export const SYNCABLE_TRENDING_DEALS: DealItem[] = [
  {
    id: 'sync-pixel-8-pro',
    title: 'Google Pixel 8 Pro (Bay Blue, 256GB, Tensor G3)',
    category: 'Smartphones',
    brand: 'Google',
    image: '/src/assets/images/deals_smartphone_flagship_1790689474273.jpg',
    mrp: 106999,
    dealPrice: 89999, // 15.9% discount (> 8%)
    description: 'Pro camera system with dedicated telephoto zoom, Best Take, Magic Editor, and Google Tensor G3 with 7 years of OS updates.',
    specs: [
      '6.7" Super Actua OLED Display 1-120Hz LTPO',
      'Google Tensor G3 Processor with Titan M2 Security',
      '50MP Main + 48MP Ultrawide + 48MP 5x Telephoto',
      'Temperature Sensor & All-Day 5050 mAh Battery'
    ],
    inStock: true,
    rating: 4.7,
    reviewCount: 680,
    highlightBadge: 'Amazon Sourced · 16% OFF',
    isDraft: true,
    sourceFeed: 'Amazon',
    emiPlans: [
      { months: 3, perMonth: 29999, interestRate: 0, provider: 'No-Cost EMI HDFC', isNoCost: true },
      { months: 6, perMonth: 14999, interestRate: 0, provider: 'Bajaj Insta EMI', isNoCost: true },
      { months: 12, perMonth: 7990, interestRate: 13, provider: 'SBI Card FlexiPay' }
    ],
    vendorSources: [
      { name: 'Amazon', price: 85990, inStock: true, deliveryDays: 1, codAvailable: true, productUrl: 'https://amazon.in' },
      { name: 'Flipkart', price: 86490, inStock: true, deliveryDays: 2, codAvailable: true, productUrl: 'https://flipkart.com' },
      { name: 'Wholesaler', price: 83500, inStock: true, deliveryDays: 3, codAvailable: true, productUrl: 'https://wholesale-direct.in' }
    ]
  },
  {
    id: 'sync-nintendo-switch-oled',
    title: 'Nintendo Switch OLED Model Console (Mario Red Edition)',
    category: 'Gaming',
    brand: 'Nintendo',
    image: '/src/assets/images/deals_gaming_console_1790689489683.jpg',
    mrp: 34990,
    dealPrice: 28990, // 17.1% discount (> 8%)
    description: 'Vibrant 7-inch OLED screen, wide adjustable stand, wired LAN dock, 64GB internal storage, and enhanced audio.',
    specs: [
      '7-inch OLED Screen with Vivid Colors & High Contrast',
      'Three Play Modes: TV, Tabletop, and Handheld',
      '64GB Internal Storage with microSD Expansion',
      'Wired LAN Port in Dock & Enhanced Audio'
    ],
    inStock: true,
    rating: 4.9,
    reviewCount: 1540,
    highlightBadge: 'Flipkart Sourced · 17% OFF',
    isDraft: true,
    sourceFeed: 'Flipkart',
    emiPlans: [
      { months: 3, perMonth: 9663, interestRate: 0, provider: 'No-Cost HDFC', isNoCost: true },
      { months: 6, perMonth: 4831, interestRate: 0, provider: 'Bajaj Finserv Zero Down', isNoCost: true },
      { months: 12, perMonth: 2575, interestRate: 14, provider: 'Kotak Smart EMI' }
    ],
    vendorSources: [
      { name: 'Flipkart', price: 26500, inStock: true, deliveryDays: 2, codAvailable: true, productUrl: 'https://flipkart.com' },
      { name: 'Amazon', price: 26990, inStock: true, deliveryDays: 1, codAvailable: true, productUrl: 'https://amazon.in' },
      { name: 'Wholesaler', price: 25200, inStock: true, deliveryDays: 3, codAvailable: true, productUrl: 'https://wholesale-direct.in' }
    ]
  },
  {
    id: 'sync-sony-x90l-55',
    title: 'Sony Bravia 55-inch Full Array LED 4K 120Hz TV (XR-55X90L)',
    category: 'Smart TVs',
    brand: 'Sony',
    image: '/src/assets/images/deals_smart_tv_display_1790689504174.jpg',
    mrp: 124900,
    dealPrice: 99990, // 19.9% discount (> 8%)
    description: 'Cognitive Processor XR, Full Array LED with XR Contrast Booster, 4K 120Hz HDMI 2.1 gaming, and Acoustic Multi-Audio.',
    specs: [
      'Cognitive Processor XR with Human-Perspective Audio & Video',
      'Full Array LED Contrast Booster 10',
      'HDMI 2.1 with 4K/120fps, VRR & ALLM for PS5 Auto HDR',
      'Google TV OS with Acoustic Multi-Audio Sound Positioning'
    ],
    inStock: true,
    rating: 4.9,
    reviewCount: 510,
    highlightBadge: 'Amazon Sourced · 20% OFF',
    isDraft: true,
    sourceFeed: 'Amazon',
    emiPlans: [
      { months: 3, perMonth: 33330, interestRate: 0, provider: 'No-Cost HDFC', isNoCost: true },
      { months: 6, perMonth: 16665, interestRate: 0, provider: 'Bajaj Finserv Insta EMI', isNoCost: true },
      { months: 12, perMonth: 8885, interestRate: 13, provider: 'Axis Bank EMI' }
    ],
    vendorSources: [
      { name: 'Amazon', price: 94500, inStock: true, deliveryDays: 2, codAvailable: true, productUrl: 'https://amazon.in' },
      { name: 'Flipkart', price: 95500, inStock: true, deliveryDays: 2, codAvailable: true, productUrl: 'https://flipkart.com' },
      { name: 'Wholesaler', price: 91000, inStock: true, deliveryDays: 3, codAvailable: true, productUrl: 'https://wholesale-direct.in' }
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
    item: INITIAL_DEALS[15], // PS5 Slim
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
  }
];
