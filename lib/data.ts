import { Category, Product, Order, Coupon } from '@/types';

export const categories: Category[] = [
  { id: 1, name: 'Diagnóstico', icon: '🩺' },
  { id: 2, name: 'Odontología', icon: '🦷' },
  { id: 3, name: 'Protección', icon: '🧤' },
  { id: 4, name: 'Instrumental', icon: '🔬' },
  { id: 5, name: 'Ortopedia', icon: '🦴' },
  { id: 6, name: 'Primeros Auxilios', icon: '🏥' },
  { id: 7, name: 'Farmacia', icon: '💊' },
  { id: 8, name: 'Equipamiento', icon: '🏪' }
];

export const products: Product[] = [
  {
    id: 1,
    name: 'Estetoscopio Profesional',
    price: 7000,
    originalPrice: 8500,
    category: 1,
    rating: 4.8,
    reviews: 45,
    image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=500',
    images: [
      'https://images.unsplash.com/photo-1584515933487-779824d29309?w=500',
      'https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=500'
    ],
    featured: true,
    description: 'Estetoscopio de alta precisión con diafragma sensible para diagnóstico preciso.',
    specifications: {
      'Tipo': 'Doble campana',
      'Material': 'Acero inoxidable',
      'Longitud': '70 cm',
      'Peso': '180 g'
    },
    stock: 7,
    brand: 'Littmann'
  },
  {
    id: 2,
    name: 'Losetas Dentales 5MM',
    price: 2200,
    category: 2,
    rating: 4.6,
    reviews: 28,
    image: 'https://images.unsplash.com/photo-1609207825181-52d3214556dd?w=500',
    featured: false,
    description: 'Losetas de alta calidad para uso odontológico, grosor 5mm.',
    stock: 51,
    brand: 'DentalPro'
  },
  {
    id: 3,
    name: 'Losetas Dentales 6MM',
    price: 2600,
    category: 2,
    rating: 4.7,
    reviews: 32,
    image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=500',
    description: 'Losetas premium para procedimientos dentales, grosor 6mm.',
    stock: 50,
    brand: 'DentalPro'
  },
  {
    id: 4,
    name: 'Caja de Ortodoncia Completa',
    price: 2500,
    originalPrice: 3000,
    category: 2,
    rating: 4.5,
    reviews: 15,
    image: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=500',
    featured: true,
    description: 'Kit completo de ortodoncia con todos los instrumentos necesarios.',
    stock: 48,
    brand: 'OrthoKit'
  },
  {
    id: 5,
    name: 'Martillo Buck Neurológico',
    price: 17900,
    category: 4,
    rating: 4.9,
    reviews: 12,
    image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500',
    description: 'Martillo de reflejos Buck profesional para examen neurológico.',
    specifications: {
      'Material': 'Acero quirúrgico',
      'Longitud': '19 cm',
      'Peso': '90 g',
      'Incluye': 'Aguja y cepillo'
    },
    stock: 6,
    brand: 'MedInstruments'
  },
  {
    id: 6,
    name: 'Linterna de Diagnóstico LED',
    price: 6000,
    originalPrice: 7500,
    category: 1,
    rating: 4.4,
    reviews: 67,
    image: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=500',
    featured: true,
    description: 'Linterna médica LED de alta intensidad para exámenes.',
    stock: 18,
    brand: 'DiagnosticPro'
  },
  {
    id: 7,
    name: 'Barbijos Quirúrgicos Celestes',
    price: 3700,
    category: 3,
    rating: 4.7,
    reviews: 234,
    image: 'https://images.unsplash.com/photo-1584634731339-252c581abfc5?w=500',
    description: 'Caja de 50 unidades de barbijos quirúrgicos tricapa.',
    stock: 13,
    brand: 'SafeMed'
  },
  {
    id: 8,
    name: 'Tensiómetro Digital Automático',
    price: 12500,
    category: 1,
    rating: 4.8,
    reviews: 89,
    image: 'https://images.unsplash.com/photo-1615486511262-c7b5c7f42b16?w=500',
    featured: true,
    description: 'Tensiómetro digital de brazo con memoria para 120 mediciones.',
    specifications: {
      'Pantalla': 'LCD retroiluminada',
      'Memoria': '2 usuarios x 60 mediciones',
      'Alimentación': '4 pilas AA',
      'Incluye': 'Estuche de transporte'
    },
    stock: 15,
    brand: 'Omron'
  },
  {
    id: 9,
    name: 'Guantes de Látex (Caja x100)',
    price: 4500,
    category: 3,
    rating: 4.6,
    reviews: 156,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500',
    description: 'Guantes de látex sin polvo, talla M. Caja de 100 unidades.',
    stock: 25,
    brand: 'SafeHands'
  },
  {
    id: 10,
    name: 'Termómetro Digital Infrarrojo',
    price: 8900,
    originalPrice: 10500,
    category: 1,
    rating: 4.9,
    reviews: 312,
    image: 'https://images.unsplash.com/photo-1584776296598-8d62bedaa6e2?w=500',
    featured: true,
    description: 'Termómetro sin contacto con medición instantánea y memoria.',
    stock: 30,
    brand: 'ThermoScan'
  },
  {
    id: 11,
    name: 'Alcohol en Gel 70% (1L)',
    price: 2800,
    category: 7,
    rating: 4.5,
    reviews: 478,
    image: 'https://images.unsplash.com/photo-1584265549884-cb8ea8a08e59?w=500',
    description: 'Alcohol en gel antibacterial 70% con glicerina. Envase de 1 litro.',
    stock: 40,
    brand: 'CleanMax'
  },
  {
    id: 12,
    name: 'Oxímetro de Pulso Digital',
    price: 6500,
    category: 1,
    rating: 4.7,
    reviews: 203,
    image: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=500',
    description: 'Oxímetro de dedo con pantalla OLED y alarma de valores anormales.',
    stock: 22,
    brand: 'PulseCheck'
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