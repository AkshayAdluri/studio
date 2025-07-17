export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
  stock: number;
  description: string;
  dataAiHint?: string;
}

const products: Product[] = [
  {
    id: 1,
    name: 'AURA Wireless Headphones',
    price: 249.99,
    imageUrl: 'https://placehold.co/600x600',
    category: 'Electronics',
    stock: 15,
    description: 'Experience immersive sound with these noise-cancelling wireless headphones. 40-hour battery life and all-day comfort.',
    dataAiHint: 'headphones music'
  },
  {
    id: 2,
    name: 'FLUX Smartwatch',
    price: 399.00,
    imageUrl: 'https://placehold.co/600x600',
    category: 'Electronics',
    stock: 22,
    description: 'Track your fitness, stay connected, and tell time in style. Waterproof up to 50m with a vibrant OLED display.',
    dataAiHint: 'smartwatch tech'
  },
  {
    id: 3,
    name: 'NOMAD Backpack',
    price: 120.50,
    imageUrl: 'https://placehold.co/600x600',
    category: 'Accessories',
    stock: 30,
    description: 'The perfect companion for your daily commute or weekend adventure. Durable, water-resistant materials and smart compartments.',
    dataAiHint: 'backpack travel'
  },
  {
    id: 4,
    name: 'SOLSTICE Sunglasses',
    price: 85.00,
    imageUrl: 'https://placehold.co/600x600',
    category: 'Fashion',
    stock: 50,
    description: 'Protect your eyes with 100% UV protection and polarized lenses. Lightweight frame with a classic design.',
    dataAiHint: 'sunglasses fashion'
  },
  {
    id: 5,
    name: 'EMBER Smart Mug',
    price: 129.95,
    imageUrl: 'https://placehold.co/600x600',
    category: 'Home Goods',
    stock: 18,
    description: 'Keep your coffee at the perfect temperature from the first sip to the last. Control with your smartphone.',
    dataAiHint: 'mug coffee'
  },
  {
    id: 6,
    name: 'TERRA Potted Plant',
    price: 45.00,
    imageUrl: 'https://placehold.co/600x600',
    category: 'Home Goods',
    stock: 40,
    description: 'Brighten up your space with this easy-care snake plant. Comes in a stylish ceramic pot.',
    dataAiHint: 'plant decor'
  },
  {
    id: 7,
    name: 'NEBULA Portable Projector',
    price: 499.99,
    imageUrl: 'https://placehold.co/600x600',
    category: 'Electronics',
    stock: 12,
    description: 'Transform any wall into a cinema screen. 1080p resolution, built-in speakers, and a 4-hour battery.',
    dataAiHint: 'projector cinema'
  },
  {
    id: 8,
    name: 'EQUINOX Yoga Mat',
    price: 79.99,
    imageUrl: 'https://placehold.co/600x600',
    category: 'Sports',
    stock: 60,
    description: 'High-density, non-slip yoga mat for ultimate comfort and stability during your practice. Eco-friendly materials.',
    dataAiHint: 'yoga fitness'
  },
];

export const getProducts = (): Product[] => {
  return products;
};

export const getProductById = (id: number): Product | undefined => {
  return products.find(p => p.id === id);
};

export const getCategories = (): string[] => {
  const categories = products.map(p => p.category);
  return [...new Set(categories)];
}
