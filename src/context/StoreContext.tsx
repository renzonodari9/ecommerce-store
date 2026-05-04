import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { mockProducts } from '../data/products';

interface User {
  userId: string;
  email: string;
  role: string;
}

interface CartItem {
  id: string;
  quantity: number;
  product: {
    id: string;
    name: string;
    price: number;
    images: string[];
  };
}

interface Cart {
  items: CartItem[];
  subtotal: number;
  itemCount: number;
}

interface StoreContextType {
  cart: Cart | null;
  loading: boolean;
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
  logout: () => void;
  addToCart: (productId: string, quantity?: number) => Promise<void>;
  updateCartItem: (productId: string, quantity: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  refreshCart: () => Promise<void>;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    loadLocalCart();
    const savedUser = localStorage.getItem('store_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        // ignore
      }
    }
  }, []);

  const loadLocalCart = () => {
    const savedCart = localStorage.getItem('store_cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setCart(parsedCart);
      } catch (e) {
        setCart({ items: [], subtotal: 0, itemCount: 0 });
      }
    } else {
      setCart({ items: [], subtotal: 0, itemCount: 0 });
    }
  };

  const saveLocalCart = (cartData: Cart) => {
    localStorage.setItem('store_cart', JSON.stringify(cartData));
  };

  const calculateCartTotals = (items: CartItem[]): Cart => {
    const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
    return { items, subtotal, itemCount };
  };

  const refreshCart = async () => {
    loadLocalCart();
  };

  const addToCart = async (productId: string, quantity = 1) => {
    const product = mockProducts.find(p => p.id === productId);
    if (!product) {
      console.error('Product not found:', productId);
      return;
    }

    setCart(prevCart => {
      const currentItems = prevCart?.items || [];
      const existingItemIndex = currentItems.findIndex(item => item.product.id === productId);
      
      let newItems: CartItem[];
      if (existingItemIndex >= 0) {
        newItems = [...currentItems];
        newItems[existingItemIndex] = {
          ...newItems[existingItemIndex],
          quantity: newItems[existingItemIndex].quantity + quantity
        };
      } else {
        newItems = [...currentItems, {
          id: productId,
          quantity,
          product: {
            id: product.id,
            name: product.name,
            price: product.price,
            images: product.images
          }
        }];
      }
      
      const newCart = calculateCartTotals(newItems);
      saveLocalCart(newCart);
      return newCart;
    });
  };

  const updateCartItem = async (productId: string, quantity: number) => {
    if (quantity <= 0) {
      await removeFromCart(productId);
      return;
    }

    setCart(prevCart => {
      const currentItems = prevCart?.items || [];
      const newItems = currentItems.map(item => 
        item.product.id === productId ? { ...item, quantity } : item
      );
      const newCart = calculateCartTotals(newItems);
      saveLocalCart(newCart);
      return newCart;
    });
  };

  const removeFromCart = async (productId: string) => {
    setCart(prevCart => {
      const currentItems = prevCart?.items || [];
      const newItems = currentItems.filter(item => item.product.id !== productId);
      const newCart = calculateCartTotals(newItems);
      saveLocalCart(newCart);
      return newCart;
    });
  };

  const clearCart = async () => {
    const emptyCart = { items: [], subtotal: 0, itemCount: 0 };
    setCart(emptyCart);
    saveLocalCart(emptyCart);
  };

  const login = async (email: string, password: string) => {
    const mockUser = { userId: '1', email, role: 'user' };
    setUser(mockUser);
    localStorage.setItem('store_user', JSON.stringify(mockUser));
  };

  const register = async (email: string, password: string, firstName: string, lastName: string) => {
    const mockUser = { userId: '1', email, role: 'user' };
    setUser(mockUser);
    localStorage.setItem('store_user', JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    clearCart();
    localStorage.removeItem('store_user');
  };

  return (
    <StoreContext.Provider
      value={{
        cart,
        loading,
        isAuthenticated: !!user,
        user,
        login,
        register,
        logout,
        addToCart,
        updateCartItem,
        removeFromCart,
        clearCart,
        refreshCart,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
