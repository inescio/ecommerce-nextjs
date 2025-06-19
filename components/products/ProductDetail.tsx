'use client';

import React, { useState } from 'react';
import { ChevronLeft, Star, ShoppingCart, Heart, Plus, Minus } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { products } from '@/lib/data';

interface ProductDetailProps {
  productId: number;
  setView: (view: string) => void;
}

export default function ProductDetail({ productId, setView }: ProductDetailProps) {
  const product = products.find(p => p.id === productId);
  const { addToCart } = useCart();
  const { isInWishlist, addToWishlist } = useWishlist();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <button onClick={() => setView('home')} className="flex items-center mb-4 text-gray-600 hover:text-gray-800">
        <ChevronLeft size={20} />
        <span>Volver</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <div className="mb-4">
            <img 
              src={product.images?.[selectedImage] || product.image} 
              alt={product.name}
              className="w-full h-96 object-cover rounded-lg"
            />
          </div>
          {product.images && (
            <div className="flex space-x-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`border-2 rounded-lg overflow-hidden ${
                    selectedImage === idx ? 'border-blue-500' : 'border-gray-300'
                  }`}
                >
                  <img src={img} alt="" className="w-20 h-20 object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <div className="mb-4">
            <p className="text-gray-500 mb-2">{product.brand}</p>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <div className="flex items-center mb-4">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'} />
                ))}
              </div>
              <span className="ml-2 text-gray-600">
                {product.rating} ({product.reviews} reseñas)
              </span>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-baseline mb-2">
              <span className="text-3xl font-bold">${product.price}</span>
              {product.originalPrice && (
                <span className="text-xl text-gray-500 line-through ml-3">${product.originalPrice}</span>
              )}
            </div>
            {product.stock && (
              <p className={`text-sm ${product.stock < 20 ? 'text-red-600' : 'text-green-600'}`}>
                {product.stock < 20 ? `¡Solo quedan ${product.stock} unidades!` : 'En stock'}
              </p>
            )}
          </div>

          <p className="text-gray-700 mb-6">{product.description}</p>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Cantidad</label>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 border rounded hover:bg-gray-100"
              >
                <Minus size={20} />
              </button>
              <span className="w-12 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-2 border rounded hover:bg-gray-100"
              >
                <Plus size={20} />
              </button>
            </div>
          </div>

          <div className="flex space-x-4 mb-8">
            <button
              onClick={() => {
                for (let i = 0; i < quantity; i++) {
                  addToCart(product);
                }
              }}
              className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 flex items-center justify-center space-x-2"
            >
              <ShoppingCart size={20} />
              <span>Añadir al carrito</span>
            </button>
            <button
              onClick={() => addToWishlist(product)}
              className={`p-3 border rounded-lg ${
                isInWishlist(product.id) ? 'bg-red-500 text-white border-red-500' : 'hover:bg-gray-100'
              }`}
            >
              <Heart size={20} fill={isInWishlist(product.id) ? 'white' : 'none'} />
            </button>
          </div>

          {product.specifications && (
            <div className="border-t pt-6">
              <h3 className="font-semibold mb-4">Especificaciones</h3>
              <dl className="space-y-2">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex">
                    <dt className="w-1/3 text-gray-600">{key}:</dt>
                    <dd className="w-2/3 font-medium">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}