
'use client';

import React, { useState } from 'react';
import { Check, Heart, Package, Grid } from 'lucide-react';
import { AuthProvider } from '@/contexts/AuthContext';
import { CartProvider } from '@/contexts/CartContext';
import { WishlistProvider } from '@/contexts/WishlistContext';
import Header from '@/components/layout/Header';
import ProductCard from '@/components/products/ProductCard';
import ProductDetail from '@/components/products/ProductDetail';
import Cart from '@/components/cart/Cart';
import LoginForm from '@/components/auth/LoginForm';
import { products, categories, orders } from '@/lib/data';
import { useWishlist } from '@/contexts/WishlistContext';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';

// Componente de Checkout
function Checkout({ setView }: { setView: (view: string) => void }) {
  const { cart, getTotalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [orderData, setOrderData] = useState({
    shipping: {
      name: user?.name || '',
      email: user?.email || '',
      phone: '',
      address: '',
      city: '',
      zipCode: ''
    },
    payment: {
      cardNumber: '',
      cardName: '',
      expiry: '',
      cvv: ''
    }
  });

  const handlePlaceOrder = () => {
    setTimeout(() => {
      clearCart();
      setView('orderSuccess');
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Progress Steps */}
          <div className="flex items-center mb-8">
            <div className={`flex items-center ${step >= 1 ? 'text-blue-500' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${step >= 1 ? 'border-blue-500 bg-blue-500 text-white' : 'border-gray-300'}`}>
                1
              </div>
              <span className="ml-2 font-medium">Envío</span>
            </div>
            <div className={`flex-1 h-1 mx-4 ${step >= 2 ? 'bg-blue-500' : 'bg-gray-300'}`} />
            <div className={`flex items-center ${step >= 2 ? 'text-blue-500' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${step >= 2 ? 'border-blue-500 bg-blue-500 text-white' : 'border-gray-300'}`}>
                2
              </div>
              <span className="ml-2 font-medium">Pago</span>
            </div>
          </div>

          {step === 1 && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Información de Envío</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Nombre Completo</label>
                  <input
                    type="text"
                    value={orderData.shipping.name}
                    onChange={(e) => setOrderData({
                      ...orderData,
                      shipping: {...orderData.shipping, name: e.target.value}
                    })}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input
                    type="email"
                    value={orderData.shipping.email}
                    onChange={(e) => setOrderData({
                      ...orderData,
                      shipping: {...orderData.shipping, email: e.target.value}
                    })}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <button
                onClick={() => setStep(2)}
                className="mt-6 w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600"
              >
                Continuar al Pago
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Información de Pago</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Número de Tarjeta</label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="flex space-x-4 mt-6">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 border border-gray-300 py-3 rounded-lg hover:bg-gray-50"
                >
                  Atrás
                </button>
                <button
                  onClick={handlePlaceOrder}
                  className="flex-1 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600"
                >
                  Realizar Pedido
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-lg shadow-md p-6 h-fit">
          <h2 className="text-xl font-semibold mb-4">Resumen del Pedido</h2>
          <div className="space-y-3 mb-4">
            {cart.map(item => (
              <div key={item.id} className="flex justify-between">
                <span className="text-gray-600">{item.name} x{item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="border-t pt-4 space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${getTotalPrice().toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Envío</span>
              <span>$10.00</span>
            </div>
            <div className="flex justify-between text-xl font-bold">
              <span>Total</span>
              <span>${(getTotalPrice() + 10).toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Componente principal de la aplicación
function EcommerceContent() {
  const [currentView, setCurrentView] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  const { wishlist } = useWishlist();
  const { addToCart } = useCart();

  const setView = (view: string, data: any = null) => {
    if (view === 'product') {
      setSelectedProduct(data);
    }
    setCurrentView(view);
  };

  const renderView = () => {
    switch (currentView) {
      case 'login':
        return <LoginForm setView={setView} />;
      case 'product':
        return selectedProduct && <ProductDetail productId={selectedProduct} setView={setView} />;
      case 'checkout':
        return <Checkout setView={setView} />;
      case 'wishlist':
        return (
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-8">Mi Lista de Deseos</h1>
            {wishlist.length === 0 ? (
              <div className="text-center py-12">
                <Heart size={64} className="mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500 mb-4">Tu lista de deseos está vacía</p>
                <button
                  onClick={() => setView('home')}
                  className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
                >
                  Explorar Productos
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {wishlist.map(product => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    onProductClick={(id) => setView('product', id)}
                  />
                ))}
              </div>
            )}
          </div>
        );
      case 'orders':
        return (
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-8">Mis Pedidos</h1>
            <div className="space-y-4">
              {orders.map(order => (
                <div key={order.id} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="font-semibold">Pedido #{order.id}</p>
                      <p className="text-gray-600">{order.date}</p>
                    </div>
                    <span className={`px-3 py-1 rounded text-sm ${
                      order.status === 'delivered' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {order.status === 'delivered' ? 'Entregado' : 'En camino'}
                    </span>
                  </div>
                  <div className="text-right mt-4 pt-4 border-t">
                    <p className="text-xl font-bold">Total: ${order.total}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'orderSuccess':
        return (
          <div className="container mx-auto px-4 py-16 text-center">
            <div className="max-w-md mx-auto">
              <div className="bg-green-100 text-green-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check size={40} />
              </div>
              <h1 className="text-3xl font-bold mb-4">¡Pedido Realizado!</h1>
              <p className="text-gray-600 mb-8">
                Tu pedido ha sido procesado exitosamente. Te enviaremos un email con los detalles.
              </p>
              <button
                onClick={() => setView('home')}
                className="bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600"
              >
                Seguir Comprando
              </button>
            </div>
          </div>
        );
      case 'profile':
        return (
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-8">Mi Perfil</h1>
            <div className="bg-white rounded-lg shadow-md p-6">
              <p className="text-gray-600">Página de perfil en construcción...</p>
            </div>
          </div>
        );
      default:
        return (
          <div className="container mx-auto px-4 py-8">
            {/* Banner */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl p-8 mb-8">
              <h2 className="text-3xl font-bold mb-4">Ofertas Especiales</h2>
              <p className="mb-6">Hasta 50% de descuento en productos seleccionados</p>
              <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100">
                Ver Ofertas
              </button>
            </div>

            {/* Categories */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Categorías</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow text-center"
                  >
                    <div className="text-3xl mb-2">{cat.icon}</div>
                    <p className="text-sm">{cat.name}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Products */}
            <div>
              <h2 className="text-2xl font-bold mb-4">
                {selectedCategory 
                  ? categories.find(c => c.id === selectedCategory)?.name 
                  : 'Productos Destacados'}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {products
                  .filter(p => !selectedCategory || p.category === selectedCategory)
                  .map(product => (
                    <ProductCard 
                      key={product.id} 
                      product={product} 
                      onProductClick={(id) => setView('product', id)}
                    />
                  ))}
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header setView={setView} />
      {renderView()}
      <Cart setView={setView} />
    </div>
  );
}

// Componente principal con providers
export default function EcommerceApp() {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <EcommerceContent />
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}