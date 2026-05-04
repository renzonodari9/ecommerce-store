import { Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, X } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { mockProducts } from '../data/products';

export default function Cart() {
  const { cart, updateCartItem, removeFromCart, clearCart } = useStore();
  const navigate = useNavigate();

  if (!cart || cart.items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gray-50">
        <div className="bg-white p-8 rounded-2xl shadow-sm text-center max-w-md">
          <ShoppingBag size={80} className="text-gray-300 mb-6 mx-auto" />
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Tu carrito está vacío</h1>
          <p className="text-gray-500 mb-8">Agrega productos para comenzar</p>
          <Link
            to="/"
            className="inline-block bg-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-purple-700 transition-all hover:shadow-lg hover:-translate-y-1"
          >
            Ver Productos
          </Link>
        </div>
      </div>
    );
  }

  const getProductInfo = (productId: string) => {
    return mockProducts.find(p => p.id === productId);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Carrito de Compras</h1>
          <button 
            onClick={clearCart} 
            className="text-red-600 hover:text-red-700 text-sm font-medium flex items-center gap-2 hover:bg-red-50 px-4 py-2 rounded-lg transition-colors"
          >
            <Trash2 size={16} />
            Vaciar carrito
          </button>
        </div>

        <div className="space-y-4 mb-8">
          {cart.items.map((item, index) => {
            const productInfo = getProductInfo(item.product.id) || mockProducts[index % mockProducts.length];

            return (
              <div key={item.id} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
                <div className="flex items-center gap-6">
                  <div className="w-24 h-24 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                    <img
                      src={productInfo.images[0]}
                      alt={productInfo.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 text-lg">{productInfo.name}</h3>
                    <p className="text-purple-600 font-bold text-xl mt-1">${productInfo.price.toFixed(2)}</p>
                  </div>

                  <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-2">
                    <button
                      onClick={() => updateCartItem(item.product.id, item.quantity - 1)}
                      className="w-10 h-10 flex items-center justify-center bg-white rounded-lg hover:bg-purple-50 text-gray-600 hover:text-purple-600 transition-colors shadow-sm"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-12 text-center font-semibold text-lg">{item.quantity}</span>
                    <button
                      onClick={() => updateCartItem(item.product.id, item.quantity + 1)}
                      className="w-10 h-10 flex items-center justify-center bg-white rounded-lg hover:bg-purple-50 text-gray-600 hover:text-purple-600 transition-colors shadow-sm"
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  <div className="text-right">
                    <p className="font-bold text-gray-800 text-xl w-32">
                      ${(productInfo.price * item.quantity).toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">{item.quantity} x ${productInfo.price.toFixed(2)}</p>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Eliminar producto"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold mb-6">Resumen del pedido</h2>
          
          <div className="space-y-3 mb-6">
            {cart.items.map((item) => {
              const productInfo = getProductInfo(item.product.id);
              return (
                <div key={item.id} className="flex justify-between text-gray-600">
                  <span>{productInfo?.name || 'Producto'} x {item.quantity}</span>
                  <span className="font-medium">${((productInfo?.price || 0) * item.quantity).toFixed(2)}</span>
                </div>
              );
            })}
          </div>

          <div className="border-t pt-4 space-y-3 mb-6">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>${cart.subtotal.toFixed(2)}</span>
            </div>
            
            {cart.subtotal < 100 && (
              <div className="bg-purple-50 p-4 rounded-lg">
                <p className="text-sm text-purple-600">
                  ¡Agrega ${(100 - cart.subtotal).toFixed(2)} más para obtener envío gratis!
                </p>
              </div>
            )}
          </div>

          <button
            onClick={() => navigate('/checkout')}
            className="w-full flex items-center justify-center gap-2 bg-purple-600 text-white py-4 rounded-xl font-semibold hover:bg-purple-700 transition-all hover:shadow-lg hover:-translate-y-0.5"
          >
            Proceder al Pago
            <ArrowRight size={20} />
          </button>

          <Link
            to="/"
            className="block text-center mt-4 text-gray-600 hover:text-purple-600 font-medium"
          >
            ← Continuar Comprando
          </Link>
        </div>
      </div>
    </div>
  );
}
