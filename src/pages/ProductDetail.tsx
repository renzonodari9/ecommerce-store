import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, ArrowLeft, Check } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import api from '../services/api';

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  comparePrice?: number;
  images: string[];
  stock: number;
  sku: string;
  category: { name: string };
}

export default function ProductDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useStore();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    loadProduct();
  }, [slug]);

  const loadProduct = async () => {
    try {
      const data: any = await api.getProductBySlug(slug!);
      setProduct(data);
    } catch (error) {
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!product || product.stock === 0) return;
    try {
      await addToCart(product.id, quantity);
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    } catch (error) {
      alert('Error al agregar al carrito');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-600 border-t-transparent"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Producto no encontrado</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-purple-600 mb-6"
        >
          <ArrowLeft size={20} />
          Volver
        </button>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
            <img
              src={product.images?.[0] || 'https://via.placeholder.com/600'}
              alt={product.name}
              className="w-full aspect-square object-cover"
            />
          </div>

          <div>
            <span className="text-sm text-purple-600 font-medium uppercase tracking-wide">
              {product.category?.name}
            </span>
            <h1 className="text-3xl font-bold text-gray-900 mt-2 mb-4">{product.name}</h1>

            <div className="flex items-center gap-4 mb-6">
              <span className="text-4xl font-bold text-purple-600">${product.price.toFixed(2)}</span>
              {product.comparePrice && (
                <span className="text-xl text-gray-400 line-through">${product.comparePrice.toFixed(2)}</span>
              )}
            </div>

            <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>

            <div className="flex items-center gap-4 mb-6">
              {product.stock > 0 ? (
                <span className="flex items-center gap-2 text-green-600">
                  <Check size={18} />
                  En stock ({product.stock} disponibles)
                </span>
              ) : (
                <span className="text-red-600 font-medium">Agotado</span>
              )}
            </div>

            <p className="text-sm text-gray-500 mb-6">SKU: {product.sku}</p>

            {product.stock > 0 && (
              <div className="flex items-center gap-4 mb-8">
                <div className="flex items-center border rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 border-x">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-semibold transition-colors ${
                    added
                      ? 'bg-green-600 text-white'
                      : 'bg-purple-600 text-white hover:bg-purple-700'
                  }`}
                >
                  <ShoppingCart size={20} />
                  {added ? '¡Agregado!' : 'Agregar al Carrito'}
                </button>
              </div>
            )}

            <div className="bg-purple-50 rounded-xl p-6">
              <h3 className="font-semibold mb-3">Política de envío</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-green-600" />
                  Envío gratis en pedidos mayores a $100
                </li>
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-green-600" />
                  Entrega en 3-5 días hábiles
                </li>
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-green-600" />
                  Devoluciones gratuitas en 30 días
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
