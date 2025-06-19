import { Category, Product, Order, Coupon } from '@/types';

export const categories: Category[] = [
  { id: 1, name: 'Electrónica', icon: '💻' },
  { id: 2, name: 'Ropa', icon: '👕' },
  { id: 3, name: 'Hogar', icon: '🏠' },
  { id: 4, name: 'Deportes', icon: '⚽' },
  { id: 5, name: 'Libros', icon: '📚' },
  { id: 6, name: 'Belleza', icon: '💄' },
  { id: 7, name: 'Juguetes', icon: '🎮' },
  { id: 8, name: 'Alimentos', icon: '🍎' }
];

export const products: Product[] = [
  {
    id: 1,
    name: 'MacBook Pro 16"',
    price: 2499.99,
    originalPrice: 2799.99,
    category: 1,
    rating: 4.8,
    reviews: 324,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500',
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500',
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500'
    ],
    featured: true,
    description: 'Potente laptop profesional con chip M2 Pro, 16GB RAM y 512GB SSD.',
    specifications: {
      'Procesador': 'Apple M2 Pro',
      'RAM': '16GB',
      'Almacenamiento': '512GB SSD',
      'Pantalla': '16" Retina'
    },
    stock: 15,
    brand: 'Apple'
  },
  {
    id: 2,
    name: 'iPhone 15 Pro',
    price: 999.99,
    category: 1,
    rating: 4.9,
    reviews: 1256,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500',
    featured: true,
    description: 'El smartphone más avanzado con cámara de 48MP y chip A17 Pro.',
    stock: 42,
    brand: 'Apple'
  },
  {
    id: 3,
    name: 'Camiseta Premium',
    price: 29.99,
    originalPrice: 39.99,
    category: 2,
    rating: 4.2,
    reviews: 89,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
    description: 'Camiseta de algodón 100% orgánico.',
    stock: 120,
    brand: 'EcoWear'
  },
  {
    id: 4,
    name: 'Nike Air Max 2024',
    price: 159.99,
    category: 4,
    rating: 4.7,
    reviews: 456,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
    featured: true,
    description: 'Zapatillas deportivas con tecnología Air Max.',
    stock: 67,
    brand: 'Nike'
  },
  {
    id: 5,
    name: 'Lámpara LED Smart',
    price: 49.99,
    category: 3,
    rating: 4.3,
    reviews: 234,
    image: 'https://images.unsplash.com/photo-1565636192929-181b3e63b7b3?w=500',
    description: 'Lámpara inteligente WiFi.',
    stock: 89,
    brand: 'SmartHome'
  },
  {
    id: 6,
    name: 'Mochila Deportiva',
    price: 79.99,
    originalPrice: 99.99,
    category: 4,
    rating: 4.6,
    reviews: 178,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
    description: 'Mochila resistente al agua.',
    stock: 34,
    brand: 'SportGear'
  },
  {
    id: 7,
    name: 'Sony WH-1000XM5',
    price: 349.99,
    category: 1,
    rating: 4.8,
    reviews: 892,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
    featured: true,
    description: 'Auriculares con cancelación de ruido.',
    stock: 23,
    brand: 'Sony'
  },
  {
    id: 8,
    name: 'El Principito',
    price: 24.99,
    category: 5,
    rating: 4.9,
    reviews: 2341,
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500',
    description: 'Edición especial ilustrada.',
    stock: 156,
    brand: 'Editorial'
  }
];

export const orders: Order[] = [
  {
    id: 'ORD-001',
    date: '2025-01-15',
    status: 'delivered',
    total: 129.99,
    items: [
      { ...products[2], quantity: 2 },
      { ...products[5], quantity: 1 }
    ]
  },
  {
    id: 'ORD-002',
    date: '2025-01-18',
    status: 'shipping',
    total: 999.99,
    items: [
      { ...products[1], quantity: 1 }
    ]
  }
];

export const coupons: Coupon[] = [
  { code: 'WELCOME10', discount: 10, type: 'percentage', minPurchase: 50 },
  { code: 'SAVE20', discount: 20, type: 'fixed', minPurchase: 100 },
  { code: 'FREESHIP', discount: 100, type: 'shipping', minPurchase: 75 }
];