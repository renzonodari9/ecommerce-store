import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { mockProducts, type Product } from '../data/products';

export default function Home() {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();

  const categoryParam = searchParams.get('category');
  
  const filteredProducts = categoryParam
    ? products.filter(p => {
        const cat = p.category?.name.toLowerCase();
        if (categoryParam === 'electronics') return cat === 'electronics';
        if (categoryParam === 'clothing') return cat === 'clothing';
        if (categoryParam === 'accessories') return cat === 'accessories';
        return true;
      })
    : products;

  return (
    <div>
      <section className="gradient-bg text-white py-20 md:py-32 relative">
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            Bienvenido a nuestra tienda
          </h1>
          <p className="text-lg md:text-xl opacity-90 mb-10 max-w-2xl mx-auto leading-relaxed">
            Los mejores productos con los precios más competitivos del mercado
          </p>
          <a
            href="#products"
            className="inline-block bg-white text-purple-600 px-10 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all hover:shadow-xl hover:-translate-y-1 text-lg"
          >
            Ver Productos
          </a>
        </div>
      </section>

      <section id="products" className="py-12 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Nuestros Productos</h2>
          <p className="text-gray-600 text-center mb-10 md:mb-12 max-w-2xl mx-auto">
            Descubre nuestra selección de productos tecnológicos y de moda
          </p>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product, index) => (
                <div key={product.id} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No hay productos en esta categoría</p>
            </div>
          )}
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2024 E-commerce. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
