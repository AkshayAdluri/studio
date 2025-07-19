
import type { Product, Category } from '@/store/products';

export const initialProducts: Product[] = [
  {
    id: 1,
    name: 'AURA Wireless Headphones',
    price: 249.99,
    imageUrl: 'https://placehold.co/600x600',
    category: 'electronics',
    subcategory: 'audio',
    stock: 15,
    description: 'Experience immersive sound with these noise-cancelling wireless headphones. 40-hour battery life and all-day comfort.',
    dataAiHint: 'headphones music'
  },
  {
    id: 2,
    name: 'FLUX Smartwatch',
    price: 399.00,
    imageUrl: 'https://placehold.co/600x600',
    category: 'electronics',
    subcategory: 'wearables',
    stock: 22,
    description: 'Track your fitness, stay connected, and tell time in style. Waterproof up to 50m with a vibrant OLED display.',
    dataAiHint: 'smartwatch tech'
  },
  {
    id: 3,
    name: 'NOMAD Backpack',
    price: 120.50,
    imageUrl: 'https://placehold.co/600x600',
    category: 'accessories',
    subcategory: 'bags',
    stock: 30,
    description: 'The perfect companion for your daily commute or weekend adventure. Durable, water-resistant materials and smart compartments.',
    dataAiHint: 'backpack travel'
  },
  {
    id: 4,
    name: 'SOLSTICE Sunglasses',
    price: 85.00,
    imageUrl: 'https://placehold.co/600x600',
    category: 'fashion',
    subcategory: 'eyewear',
    stock: 50,
    description: 'Protect your eyes with 100% UV protection and polarized lenses. Lightweight frame with a classic design.',
    dataAiHint: 'sunglasses fashion'
  },
  {
    id: 5,
    name: 'EMBER Smart Mug',
    price: 129.95,
    imageUrl: 'https://placehold.co/600x600',
    category: 'home goods',
    subcategory: 'kitchen',
    stock: 18,
    description: 'Keep your coffee at the perfect temperature from the first sip to the last. Control with your smartphone.',
    dataAiHint: 'mug coffee'
  },
  {
    id: 6,
    name: 'TERRA Potted Plant',
    price: 45.00,
    imageUrl: 'https://placehold.co/600x600',
    category: 'home goods',
    subcategory: 'decor',
    stock: 40,
    description: 'Brighten up your space with this easy-care snake plant. Comes in a stylish ceramic pot.',
    dataAiHint: 'plant decor'
  },
  {
    id: 7,
    name: 'NEBULA Portable Projector',
    price: 499.99,
    imageUrl: 'https://placehold.co/600x600',
    category: 'electronics',
    subcategory: 'home cinema',
    stock: 12,
    description: 'Transform any wall into a cinema screen. 1080p resolution, built-in speakers, and a 4-hour battery.',
    dataAiHint: 'projector cinema'
  },
  {
    id: 8,
    name: 'EQUINOX Yoga Mat',
    price: 79.99,
    imageUrl: 'https://placehold.co/600x600',
    category: 'sports',
    subcategory: 'fitness',
    stock: 60,
    description: 'High-density, non-slip yoga mat for ultimate comfort and stability during your practice. Eco-friendly materials.',
    dataAiHint: 'yoga fitness'
  },
  {
    id: 9,
    name: 'ORBIT Drone',
    price: 799.00,
    imageUrl: 'https://placehold.co/600x600',
    category: 'electronics',
    subcategory: 'cameras',
    stock: 10,
    description: 'Capture stunning 4K aerial footage. Features include follow-me mode, 30-minute flight time, and a compact foldable design.',
    dataAiHint: 'drone camera'
  },
  {
    id: 10,
    name: 'Vortex Gaming Mouse',
    price: 89.99,
    imageUrl: 'https://placehold.co/600x600',
    category: 'electronics',
    subcategory: 'accessories',
    stock: 45,
    description: 'Ultra-lightweight gaming mouse with a 16,000 DPI sensor and customizable RGB lighting for a competitive edge.',
    dataAiHint: 'gaming mouse'
  },
  {
    id: 11,
    name: 'CRUX Mechanical Keyboard',
    price: 159.50,
    imageUrl: 'https://placehold.co/600x600',
    category: 'electronics',
    subcategory: 'accessories',
    stock: 25,
    description: 'A tactile and responsive mechanical keyboard with programmable keys and a durable aluminum frame.',
    dataAiHint: 'keyboard gaming'
  },
  {
    id: 12,
    name: 'OASIS Smart Water Bottle',
    price: 59.95,
    imageUrl: 'https://placehold.co/600x600',
    category: 'home goods',
    subcategory: 'kitchen',
    stock: 35,
    description: 'Tracks your water intake and glows to remind you to stay hydrated. Stainless steel and vacuum insulated.',
    dataAiHint: 'water bottle'
  },
  {
    id: 13,
    name: 'DRIFT Electric Scooter',
    price: 599.00,
    imageUrl: 'https://placehold.co/600x600',
    category: 'sports',
    subcategory: 'outdoor',
    stock: 15,
    description: 'Zip through the city with this powerful electric scooter. Top speed of 18 mph and a range of 25 miles.',
    dataAiHint: 'scooter electric'
  },
  {
    id: 14,
    name: 'LUNA Scented Candle',
    price: 34.00,
    imageUrl: 'https://placehold.co/600x600',
    category: 'home goods',
    subcategory: 'decor',
    stock: 80,
    description: 'Create a relaxing atmosphere with this soy wax candle. Lavender and chamomile scent with a 50-hour burn time.',
    dataAiHint: 'candle decor'
  },
  {
    id: 15,
    name: 'FORGE Leather Wallet',
    price: 75.00,
    imageUrl: 'https://placehold.co/600x600',
    category: 'accessories',
    subcategory: 'wallets',
    stock: 100,
    description: 'A minimalist, full-grain leather wallet with RFID blocking technology to keep your cards secure.',
    dataAiHint: 'wallet leather'
  },
  {
    id: 16,
    name: 'PEAK Insulated Tumbler',
    price: 29.99,
    imageUrl: 'https://placehold.co/600x600',
    category: 'home goods',
    subcategory: 'kitchen',
    stock: 120,
    description: 'Keeps drinks cold for 24 hours or hot for 12. Fits in standard cup holders, perfect for on the go.',
    dataAiHint: 'tumbler travel'
  },
  {
    id: 17,
    name: 'CHRONOS Classic Watch',
    price: 220.00,
    imageUrl: 'https://placehold.co/600x600',
    category: 'fashion',
    subcategory: 'watches',
    stock: 30,
    description: 'A timeless analog watch with a stainless steel case and a genuine leather strap. Japanese quartz movement.',
    dataAiHint: 'watch classic'
  },
  {
    id: 18,
    name: 'JOURNEY Weekender Bag',
    price: 180.00,
    imageUrl: 'https://placehold.co/600x600',
    category: 'accessories',
    subcategory: 'bags',
    stock: 28,
    description: 'Spacious and stylish canvas duffel bag. Features a separate shoe compartment and multiple pockets.',
    dataAiHint: 'duffel bag'
  },
  {
    id: 19,
    name: 'PIXEL Digital Photo Frame',
    price: 149.00,
    imageUrl: 'https://placehold.co/600x600',
    category: 'home goods',
    subcategory: 'decor',
    stock: 25,
    description: 'Share photos from your phone directly to this Wi-Fi connected frame. Crisp display and unlimited storage.',
    dataAiHint: 'photo frame'
  },
  {
    id: 20,
    name: 'PULSE Massage Gun',
    price: 199.99,
    imageUrl: 'https://placehold.co/600x600',
    category: 'sports',
    subcategory: 'fitness',
    stock: 18,
    description: 'Relieve muscle soreness with this powerful deep tissue massage gun. Comes with 6 attachments and a quiet motor.',
    dataAiHint: 'massage recovery'
  },
  {
    id: 21,
    name: 'ZEPHYR Air Purifier',
    price: 179.99,
    imageUrl: 'https://placehold.co/600x600',
    category: 'home goods',
    subcategory: 'appliances',
    stock: 22,
    description: 'True HEPA filter captures 99.97% of dust, pollen, and allergens. Ideal for bedrooms and offices.',
    dataAiHint: 'air purifier'
  },
  {
    id: 22,
    name: 'APEX Running Shoes',
    price: 130.00,
    imageUrl: 'https://placehold.co/600x600',
    category: 'fashion',
    subcategory: 'footwear',
    stock: 70,
    description: 'Lightweight and responsive running shoes with maximum cushioning for long-distance comfort.',
    dataAiHint: 'running shoes'
  },
  {
    id: 23,
    name: 'NOVA Smart Lamp',
    price: 99.00,
    imageUrl: 'https://placehold.co/600x600',
    category: 'home goods',
    subcategory: 'lighting',
    stock: 40,
    description: 'Control millions of colors and shades of white light with your voice or an app. Syncs with music and movies.',
    dataAiHint: 'smart lamp'
  },
  {
    id: 24,
    name: 'HELIX DNA Test Kit',
    price: 99.00,
    imageUrl: 'https://placehold.co/600x600',
    category: 'health',
    subcategory: 'wellness',
    stock: 90,
    description: 'Discover your ancestry and learn about your genetic traits with a simple saliva sample.',
    dataAiHint: 'dna test'
  },
  {
    id: 25,
    name: 'BLADE Chef\'s Knife',
    price: 110.00,
    imageUrl: 'https://placehold.co/600x600',
    category: 'home goods',
    subcategory: 'kitchen',
    stock: 55,
    description: 'High-carbon stainless steel 8-inch chef\'s knife. Perfectly balanced for precision cutting and chopping.',
    dataAiHint: 'chef knife'
  },
  {
    id: 26,
    name: 'COCOON Weighted Blanket',
    price: 150.00,
    imageUrl: 'https://placehold.co/600x600',
    category: 'home goods',
    subcategory: 'bedding',
    stock: 30,
    description: 'A 15lb weighted blanket designed to reduce stress and improve sleep quality. Soft, breathable fabric.',
    dataAiHint: 'weighted blanket'
  },
  {
    id: 27,
    name: 'STRIDE Treadmill',
    price: 899.00,
    imageUrl: 'https://placehold.co/600x600',
    category: 'sports',
    subcategory: 'fitness',
    stock: 10,
    description: 'Compact, foldable treadmill with integrated fitness classes and automatic incline adjustments.',
    dataAiHint: 'treadmill fitness'
  },
  {
    id: 28,
    name: 'AERO Bicycle Helmet',
    price: 65.00,
    imageUrl: 'https://placehold.co/600x600',
    category: 'sports',
    subcategory: 'outdoor',
    stock: 85,
    description: 'A lightweight and well-ventilated helmet for road cycling. Features MIPS technology for added safety.',
    dataAiHint: 'bike helmet'
  },
  {
    id: 29,
    name: 'MOMENTUM Coffee Grinder',
    price: 70.00,
    imageUrl: 'https://placehold.co/600x600',
    category: 'home goods',
    subcategory: 'kitchen',
    stock: 45,
    description: 'Conical burr grinder with 31 settings for the perfect grind, from espresso to french press.',
    dataAiHint: 'coffee grinder'
  },
  {
    id: 30,
    name: 'ECHO Smart Speaker',
    price: 49.99,
    imageUrl: 'https://placehold.co/600x600',
    category: 'electronics',
    subcategory: 'audio',
    stock: 200,
    description: 'Compact smart speaker with crisp sound and Alexa built-in. Control your smart home, play music, and more.',
    dataAiHint: 'smart speaker'
  },
  {
    id: 31,
    name: 'ROVE Laptop Stand',
    price: 55.00,
    imageUrl: 'https://placehold.co/600x600',
    category: 'accessories',
    subcategory: 'office',
    stock: 75,
    description: 'Ergonomic and adjustable aluminum laptop stand to improve your posture and workspace.',
    dataAiHint: 'laptop stand'
  },
  {
    id: 32,
    name: 'GLOW Silk Pillowcase',
    price: 89.00,
    imageUrl: 'https://placehold.co/600x600',
    category: 'home goods',
    subcategory: 'bedding',
    stock: 60,
    description: '100% pure mulberry silk pillowcase. Helps prevent wrinkles and hair breakage.',
    dataAiHint: 'silk pillowcase'
  },
  {
    id: 33,
    name: 'SPARKLE Electric Toothbrush',
    price: 119.99,
    imageUrl: 'https://placehold.co/600x600',
    category: 'health',
    subcategory: 'personal care',
    stock: 90,
    description: 'Sonic toothbrush with 5 modes, a pressure sensor, and a 2-minute timer for a superior clean.',
    dataAiHint: 'electric toothbrush'
  },
  {
    id: 34,
    name: 'STREAM 4K Webcam',
    price: 129.00,
    imageUrl: 'https://placehold.co/600x600',
    category: 'electronics',
    subcategory: 'accessories',
    stock: 40,
    description: 'Professional 4K Ultra HD webcam with HDR and auto-focus for crystal clear video calls and streaming.',
    dataAiHint: 'webcam streaming'
  },
  {
    id: 35,
    name: 'CRAFT Cocktail Shaker Set',
    price: 49.95,
    imageUrl: 'https://placehold.co/600x600',
    category: 'home goods',
    subcategory: 'kitchen',
    stock: 65,
    description: 'A complete 10-piece stainless steel bartender kit for mixing professional-quality cocktails at home.',
    dataAiHint: 'cocktail set'
  },
  {
    id: 36,
    name: 'ZENITH Blue Light Glasses',
    price: 78.00,
    imageUrl: 'https://placehold.co/600x600',
    category: 'fashion',
    subcategory: 'eyewear',
    stock: 110,
    description: 'Stylish glasses that filter out blue light from digital screens to reduce eye strain and improve sleep.',
    dataAiHint: 'blue light glasses'
  },
  {
    id: 37,
    name: 'ATLAS Globe Decanter',
    price: 95.00,
    imageUrl: 'https://placehold.co/600x600',
    category: 'home goods',
    subcategory: 'decor',
    stock: 35,
    description: 'An elegant hand-blown glass decanter with an etched globe design, perfect for whiskey or wine.',
    dataAiHint: 'whiskey decanter'
  },
  {
    id: 38,
    name: 'FLEX Resistance Bands',
    price: 25.00,
    imageUrl: 'https://placehold.co/600x600',
    category: 'sports',
    subcategory: 'fitness',
    stock: 150,
    description: 'Set of 5 durable resistance loop bands for strength training, physical therapy, and home workouts.',
    dataAiHint: 'resistance bands'
  },
  {
    id: 39,
    name: 'VOYAGER Passport Holder',
    price: 45.00,
    imageUrl: 'https://placehold.co/600x600',
    category: 'accessories',
    subcategory: 'travel',
    stock: 80,
    description: 'A premium leather passport holder with slots for your passport, boarding pass, and credit cards.',
    dataAiHint: 'passport holder'
  },
  {
    id: 40,
    name: 'EMBER Heated Travel Mug',
    price: 179.95,
    imageUrl: 'https://placehold.co/600x600',
    category: 'home goods',
    subcategory: 'kitchen',
    stock: 25,
    description: 'The travel version of the Ember mug. Keep your drink at the perfect temperature for up to 3 hours on the go.',
    dataAiHint: 'travel mug'
  },
  {
    id: 41,
    name: 'CUBE Smart Luggage',
    price: 295.00,
    imageUrl: 'https://placehold.co/600x600',
    category: 'accessories',
    subcategory: 'travel',
    stock: 15,
    description: 'Hardshell carry-on luggage with a removable power bank, GPS tracking, and a durable polycarbonate shell.',
    dataAiHint: 'smart luggage'
  },
  {
    id: 42,
    name: 'AQUA Waterproof Speaker',
    price: 89.99,
    imageUrl: 'https://placehold.co/600x600',
    category: 'electronics',
    subcategory: 'audio',
    stock: 50,
    description: 'A rugged, waterproof Bluetooth speaker that floats. Perfect for the pool, beach, or shower.',
    dataAiHint: 'waterproof speaker'
  },
  {
    id: 43,
    name: 'CODE Mechanical Safe',
    price: 120.00,
    imageUrl: 'https://placehold.co/600x600',
    category: 'accessories',
    subcategory: 'office',
    stock: 40,
    description: 'Keep your valuables secure with this heavy-duty steel safe. Features a digital keypad and backup key.',
    dataAiHint: 'safe box'
  },
  {
    id: 44,
    name: 'BALANCE Board',
    price: 85.00,
    imageUrl: 'https://placehold.co/600x600',
    category: 'sports',
    subcategory: 'fitness',
    stock: 30,
    description: 'Improve balance, coordination, and core strength. Perfect for standing desks or workout routines.',
    dataAiHint: 'balance board'
  },
  {
    id: 45,
    name: 'ORIGIN French Press',
    price: 40.00,
    imageUrl: 'https://placehold.co/600x600',
    category: 'home goods',
    subcategory: 'kitchen',
    stock: 70,
    description: 'Classic French press coffee maker with a 4-level filtration system for a pure, smooth brew.',
    dataAiHint: 'french press'
  },
  {
    id: 46,
    name: 'TERRAIN Hiking Boots',
    price: 160.00,
    imageUrl: 'https://placehold.co/600x600',
    category: 'fashion',
    subcategory: 'footwear',
    stock: 45,
    description: 'Durable, waterproof hiking boots with excellent grip and ankle support for all terrains.',
    dataAiHint: 'hiking boots'
  },
  {
    id: 47,
    name: 'CANVAS Art Print',
    price: 75.00,
    imageUrl: 'https://placehold.co/600x600',
    category: 'home goods',
    subcategory: 'decor',
    stock: 100,
    description: 'Abstract art print on high-quality canvas. A beautiful statement piece for any room.',
    dataAiHint: 'art print'
  },
  {
    id: 48,
    name: 'VELOCITY Cycling Jersey',
    price: 90.00,
    imageUrl: 'https://placehold.co/600x600',
    category: 'sports',
    subcategory: 'apparel',
    stock: 60,
    description: 'Breathable, moisture-wicking cycling jersey with a race fit and three rear pockets.',
    dataAiHint: 'cycling jersey'
  },
  {
    id: 49,
    name: 'SCRIBE Fountain Pen',
    price: 60.00,
    imageUrl: 'https://placehold.co/600x600',
    category: 'accessories',
    subcategory: 'office',
    stock: 80,
    description: 'A classic fountain pen with a smooth nib for an elegant writing experience. Comes with ink converter.',
    dataAiHint: 'fountain pen'
  },
  {
    id: 50,
    name: 'AURORA Sunrise Alarm Clock',
    price: 125.00,
    imageUrl: 'https://placehold.co/600x600',
    category: 'home goods',
    subcategory: 'lighting',
    stock: 30,
    description: 'Wake up naturally with a simulated sunrise. Also features nature sounds and a sunset fading light.',
    dataAiHint: 'alarm clock'
  },
];

export const getCategoriesFromProducts = (products: Product[]): Category[] => {
  const categoriesMap: { [key: string]: Set<string> } = {};

  products.forEach(product => {
    if (!categoriesMap[product.category]) {
      categoriesMap[product.category] = new Set();
    }
    categoriesMap[product.category].add(product.subcategory);
  });

  return Object.keys(categoriesMap).map(categoryName => ({
    name: categoryName,
    subcategories: Array.from(categoriesMap[categoryName]),
  }));
}
