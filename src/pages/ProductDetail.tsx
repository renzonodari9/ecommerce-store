import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, ArrowLeft, Check } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { mockProducts, type Product } from '../data/products';

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

  const loadProduct = () => {
    const found = mockProducts.find(p => p.slug === slug);
    if (found) {
      setProduct(found);
    } else {
      navigate('/');
    }
    setLoading(false);
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
      <div className="max-w-7xl mx-auto px-4 py-6 md:py-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-purple-600 mb-6 transition-colors"
        >
          <ArrowLeft size={20} />
          <span className="font-medium">Volver</span>
        </button>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full aspect-square object-cover md:aspect-auto md:h-full"
            />
          </div>

          <div className="py-4">
            <span className="text-sm text-purple-600 font-semibold uppercase tracking-wider">
              {product.category?.name}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">
              {product.name}
            </h1>

            <div className="flex items-center gap-4 mb-6">
              <span className="text-4xl md:text-5xl font-bold text-purple-600">
                ${product.price.toFixed(2)}
              </span>
              {product.comparePrice && (
                <span className="text-xl md:text-2xl text-gray-400 line-through">
                  ${product.comparePrice.toFixed(2)}
                </span>
              )}
            </div>

            <p className="text-gray-600 mb-6 leading-relaxed text-lg">
              {product.description}
            </p>

            <div className="flex items-center gap-4 mb-6">
              {product.stock > 0 ? (
                <div className="flex items-center gap-2 text-green-600 bg-green-50 px-4 py-2 rounded-full">
                  <Check size={18} />
                  <span className="font-medium">En stock ({product.stock} disponibles)</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-red-600 bg-red-50 px-4 py-2 rounded-full">
                  <X size={18} />
                  <span className="font-medium">Agotado</span>
                </div>
              )}
            </div>

            <p className="text-sm text-gray-500 mb-6">SKU: {product.id}</p>

            {product.stock > 0 && (
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-8">
                <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-6 py-3 text-gray-600 hover:bg-gray-100 transition-colors font-bold text-lg"
                  >
                    -
                  </button>
                  <span className="px-8 py-3 border-x-2 border-gray-200 font-bold text-lg min-w-[60px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="px-6 py-3 text-gray-600 hover:bg-gray-100 transition-colors font-bold text-lg"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className={`flex-1 flex items-center justify-center gap-3 py-4 px-8 rounded-xl font-semibold text-lg transition-all duration-300 ${
                    added
                      ? 'bg-green-600 text-white shadow-lg shadow-green-200'
                      : 'bg-purple-600 text-white hover:bg-purple-700 hover:shadow-xl hover:shadow-purple-200'
                  }`}
                >
                  <ShoppingCart size={24} />
                  {added ? '¡Agregado!' : 'Agregar al Carrito'}
                </button>
              </div>
            )}

            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-6 border border-purple-100">
              <h3 className="font-bold mb-4 text-lg">Política de envío</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check size={16} className="text-green-600" />
                  </div>
                  <span>Envío gratis en pedidos mayores a $100</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check size={16} className="text-green-600" />
                  </div>
                  <span>Entrega en 3-5 días hábiles</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check size={16} className="text-green-600" />
                  </div>
                  <span>Devoluciones gratuitas en 30 días</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
