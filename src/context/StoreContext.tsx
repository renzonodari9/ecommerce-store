import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import api from '../services/api';

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
  user: any;
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
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const token = api.getToken();
    if (token) {
      setLoading(false);
    } else {
      setLoading(false);
    }
    refreshCart();
  }, []);

  const refreshCart = async () => {
    try {
      const data: any = await api.getCart();
      setCart(data);
    } catch (error) {
      setCart({ items: [], subtotal: 0, itemCount: 0 });
    }
  };

  const login = async (email: string, password: string) => {
    const data = await api.login(email, password);
    setUser(data.user);
    await refreshCart();
  };

  const register = async (email: string, password: string, firstName: string, lastName: string) => {
    const data = await api.register(email, password, firstName, lastName);
    setUser(data.user);
  };

  const logout = () => {
    api.logout();
    setUser(null);
    setCart({ items: [], subtotal: 0, itemCount: 0 });
  };

  const addToCart = async (productId: string, quantity = 1) => {
    await api.addToCart(productId, quantity);
    await refreshCart();
  };

  const updateCartItem = async (productId: string, quantity: number) => {
    await api.updateCartItem(productId, quantity);
    await refreshCart();
  };

  const removeFromCart = async (productId: string) => {
    await api.removeFromCart(productId);
    await refreshCart();
  };

  const clearCart = async () => {
    await api.clearCart();
    await refreshCart();
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
