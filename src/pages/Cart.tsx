import { Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export default function Cart() {
  const { cart, updateCartItem, removeFromCart, clearCart } = useStore();
  const navigate = useNavigate();

  if (!cart || cart.items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <ShoppingBag size={80} className="text-gray-300 mb-6" />
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Tu carrito está vacío</h1>
        <p className="text-gray-500 mb-8">Agrega productos para comenzar</p>
        <Link
          to="/"
          className="bg-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-purple-700 transition-colors"
        >
          Ver Productos
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Carrito de Compras</h1>
          <button onClick={clearCart} className="text-red-600 hover:text-red-700 text-sm">
            Vaciar carrito
          </button>
        </div>

        <div className="space-y-4 mb-8">
          {cart.items.map((item) => (
            <div key={item.id} className="bg-white rounded-xl p-4 shadow-sm flex items-center gap-4">
              <img
                src={item.product.images?.[0] || 'https://via.placeholder.com/100'}
                alt={item.product.name}
                className="w-20 h-20 object-cover rounded-lg"
              />

              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">{item.product.name}</h3>
                <p className="text-purple-600 font-bold">${item.product.price.toFixed(2)}</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateCartItem(item.product.id, item.quantity - 1)}
                  className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  <Minus size={16} />
                </button>
                <span className="w-12 text-center font-semibold">{item.quantity}</span>
                <button
                  onClick={() => updateCartItem(item.product.id, item.quantity + 1)}
                  className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  <Plus size={16} />
                </button>
              </div>

              <p className="font-bold text-gray-800 w-24 text-right">
                ${(item.product.price * item.quantity).toFixed(2)}
              </p>

              <button
                onClick={() => removeFromCart(item.product.id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <span className="text-lg text-gray-600">Subtotal</span>
            <span className="text-2xl font-bold text-gray-800">${cart.subtotal.toFixed(2)}</span>
          </div>

          {cart.subtotal < 100 && (
            <p className="text-sm text-purple-600 mb-4">
              ¡Agrega ${(100 - cart.subtotal).toFixed(2)} más para obtener envío gratis!
            </p>
          )}

          <button
            onClick={() => navigate('/checkout')}
            className="w-full flex items-center justify-center gap-2 bg-purple-600 text-white py-4 rounded-xl font-semibold hover:bg-purple-700 transition-colors"
          >
            Proceder al Pago
            <ArrowRight size={20} />
          </button>

          <Link
            to="/"
            className="block text-center mt-4 text-gray-600 hover:text-purple-600"
          >
            Continuar Comprando
          </Link>
        </div>
      </div>
    </div>
  );
}
