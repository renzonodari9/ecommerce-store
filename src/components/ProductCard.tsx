import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  comparePrice?: number;
  images: string[];
  stock: number;
  category?: { name: string };
}

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useStore();
  const imageUrl = product.images?.[0] || 'https://picsum.photos/seed/product/400/400';

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await addToCart(product.id, 1);
      alert('Producto agregado al carrito');
    } catch (error) {
      alert('Error al agregar al carrito');
    }
  };

  return (
    <Link to={`/product/${product.slug}`} className="group block">
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 card-hover border border-gray-100">
        <div className="relative overflow-hidden aspect-square bg-gray-100">
          <img
            src={imageUrl}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          
          {product.comparePrice && (
            <div className="absolute top-3 left-3">
              <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                -{Math.round((1 - product.price / product.comparePrice) * 100)}%
              </span>
            </div>
          )}
          
          {product.stock <= 5 && product.stock > 0 && (
            <div className="absolute top-3 right-3">
              <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                ¡Últimos!
              </span>
            </div>
          )}
          
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-sm">
              <span className="bg-red-500 text-white font-bold px-4 py-2 rounded-full">
                Agotado
              </span>
            </div>
          )}

          {product.stock > 0 && (
            <button
              onClick={handleAddToCart}
              className="absolute bottom-4 right-4 w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:bg-purple-700"
            >
              <ShoppingCart size={20} />
            </button>
          )}
        </div>

        <div className="p-4 md:p-5">
          {product.category && (
            <span className="text-xs text-purple-600 font-semibold uppercase tracking-wider">
              {product.category.name}
            </span>
          )}
          <h3 className="font-bold text-gray-800 mb-2 line-clamp-1 text-lg mt-1">
            {product.name}
          </h3>
          <p className="text-sm text-gray-500 mb-3 line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl md:text-2xl font-bold text-purple-600">
                ${product.price.toFixed(2)}
              </span>
              {product.comparePrice && (
                <span className="text-sm text-gray-400 line-through">
                  ${product.comparePrice.toFixed(2)}
                </span>
              )}
            </div>

            {product.stock > 0 && (
              <span className={`text-xs font-medium ${product.stock > 5 ? 'text-green-600' : 'text-orange-500'}`}>
                {product.stock} disp.
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
