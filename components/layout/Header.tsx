'use client';

import React, { useState, useEffect } from 'react';
import { 
  ShoppingCart, Search, Menu, X, Heart, User, LogOut, 
  Phone, Mail, ChevronDown
} from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useAuth } from '@/contexts/AuthContext';
import { products } from '@/lib/data';

interface HeaderProps {
  setView: (view: string, data?: any) => void;
}

export default function Header({ setView }: HeaderProps) {
  const { getTotalItems, setCartOpen } = useCart();
  const { wishlist } = useWishlist();
  const { isAuthenticated, user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchResults, setSearchResults] = useState<typeof products>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

  useEffect(() => {
    if (searchQuery.length > 2) {
      const results = products.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(results);
      setShowSearchResults(true);
    } else {
      setSearchResults([]);
      setShowSearchResults(false);
    }
  }, [searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setView('search', searchQuery);
      setSearchQuery('');
      setShowSearchResults(false);
    }
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-40">
      <div className="bg-green-600 text-white py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <Phone size={14} className="mr-1" />
              +54 9 3804 123456
            </span>
            <span className="flex items-center">
              <Mail size={14} className="mr-1" />
              info@insumossaludlr.com
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              Envío gratis en La Rioja capital
            </span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div 
              className="flex items-center cursor-pointer"
              onClick={() => setView('home')}
            >
              <div className="bg-green-600 rounded-full p-2 mr-2">
              <img 
  src="/logo-insumos-salud.png" 
  alt="Insumos Salud LR" 
  className="h-12 w-auto"
/>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-green-600">
                  INSUMOS SALUD LR
                </h1>
                <p className="text-xs text-gray-600">Tu salud, nuestra prioridad</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSearch} className="hidden lg:flex flex-1 max-w-xl mx-8 relative">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Buscar productos médicos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onBlur={() => setTimeout(() => setShowSearchResults(false), 200)}
                className="w-full px-4 py-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
              
              {showSearchResults && searchResults.length > 0 && (
                <div className="absolute top-full mt-2 w-full bg-white border rounded-lg shadow-lg max-h-96 overflow-y-auto">
                  {searchResults.map(product => (
                    <div
                      key={product.id}
                      className="p-3 hover:bg-gray-50 cursor-pointer flex items-center space-x-3"
                      onClick={() => {
                        setView('product', product.id);
                        setSearchQuery('');
                        setShowSearchResults(false);
                      }}
                    >
                      <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded" />
                      <div className="flex-1">
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-gray-600">${product.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </form>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 hover:bg-gray-100 rounded-lg p-2 transition-colors"
                >
                  <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full" />
                  <span className="hidden lg:block">{user.name}</span>
                  <ChevronDown size={16} />
                </button>
                
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg py-2">
                    <button
                      onClick={() => {
                        setView('profile');
                        setShowUserMenu(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Mi Perfil
                    </button>
                    <button
                      onClick={() => {
                        setView('orders');
                        setShowUserMenu(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Mis Pedidos
                    </button>
                    <hr className="my-2" />
                    <button
                      onClick={() => {
                        logout();
                        setShowUserMenu(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                    >
                      Cerrar Sesión
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setView('login')}
                className="flex items-center space-x-2 hover:bg-gray-100 rounded-lg p-2 transition-colors"
              >
                <User size={20} />
                <span className="hidden lg:block">Iniciar Sesión</span>
              </button>
            )}

            <button
              onClick={() => setView('wishlist')}
              className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Heart size={24} className="text-green-600" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ShoppingCart size={24} className="text-green-600" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}      className="p-3 hover:bg-gray-50 cursor-pointer flex items-center space-x-3"
                      onClick={() => {
                        setView('product', product.id);
                        setSearchQuery('');
                        setShowSearchResults(false);
                      }}
                    >
                      <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded" />
                      <div className="flex-1">
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-gray-600">${product.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </form>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 hover:bg-gray-100 rounded-lg p-2 transition-colors"
                >
                  <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full" />
                  <span className="hidden lg:block">{user.name}</span>
                  <ChevronDown size={16} />
                </button>
                
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg py-2">
                    <button
                      onClick={() => {
                        setView('profile');
                        setShowUserMenu(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Mi Perfil
                    </button>
                    <button
                      onClick={() => {
                        setView('orders');
                        setShowUserMenu(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Mis Pedidos
                    </button>
                    <hr className="my-2" />
                    <button
                      onClick={() => {
                        logout();
                        setShowUserMenu(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                    >
                      Cerrar Sesión
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setView('login')}
                className="flex items-center space-x-2 hover:bg-gray-100 rounded-lg p-2 transition-colors"
              >
                <User size={20} />
                <span className="hidden lg:block">Iniciar Sesión</span>
              </button>
            )}

            <button
              onClick={() => setView('wishlist')}
              className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Heart size={24} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ShoppingCart size={24} />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}