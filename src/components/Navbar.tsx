import { Link } from 'react-router-dom';
import { ShoppingCart, User, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useStore } from '../context/StoreContext';

export default function Navbar() {
  const { cart, isAuthenticated, logout } = useStore();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-purple-600">
            E-commerce
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-purple-600 transition-colors">
              Inicio
            </Link>
            <Link to="/?category=electronics" className="text-gray-700 hover:text-purple-600 transition-colors">
              Electrónica
            </Link>
            <Link to="/?category=clothing" className="text-gray-700 hover:text-purple-600 transition-colors">
              Ropa
            </Link>
            <Link to="/?category=accessories" className="text-gray-700 hover:text-purple-600 transition-colors">
              Accesorios
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link to="/cart" className="relative p-2 text-gray-700 hover:text-purple-600">
              <ShoppingCart size={24} />
              {cart && cart.itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cart.itemCount}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <button onClick={logout} className="flex items-center gap-2 text-gray-700 hover:text-purple-600">
                <LogOut size={20} />
                <span className="hidden md:inline">Salir</span>
              </button>
            ) : (
              <Link to="/login" className="flex items-center gap-2 text-gray-700 hover:text-purple-600">
                <User size={20} />
                <span className="hidden md:inline">Iniciar Sesión</span>
              </Link>
            )}

            <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-3 space-y-3">
            <Link to="/" className="block py-2 text-gray-700">Inicio</Link>
            <Link to="/?category=electronics" className="block py-2 text-gray-700">Electrónica</Link>
            <Link to="/?category=clothing" className="block py-2 text-gray-700">Ropa</Link>
            <Link to="/?category=accessories" className="block py-2 text-gray-700">Accesorios</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
