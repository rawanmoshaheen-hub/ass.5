"use client";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useAuth } from "./AuthContext";
import * as cartApi from "@/services/cart";
import { getError } from "@/lib/getError";
import { Cart } from "@/types/cart";

interface CartCtx {
  cart: Cart | null;
  count: number;
  loading: boolean;
  addToCart: (productId: string) => Promise<void>;
  updateCount: (productId: string, count: number) => Promise<void>;
  removeItem: (productId: string) => Promise<void>;
  clear: () => Promise<void>;
  refresh: () => Promise<void>;
}

const CartContext = createContext<CartCtx>({
  cart: null,
  count: 0,
  loading: false,
  addToCart: async () => {},
  updateCount: async () => {},
  removeItem: async () => {},
  clear: async () => {},
  refresh: async () => {},
});

export const useCart = () => useContext(CartContext);

export default function CartProvider({ children }: { children: React.ReactNode }) {
  const { token } = useAuth();
  const router = useRouter();
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(async () => {
    if (!token) {
      setCart(null);
      return;
    }
    setLoading(true);
    try {
      const res = await cartApi.getCart();
      setCart(res.data);
    } catch {
      setCart(null);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const guard = () => {
    if (!token) {
      toast.error("Please login first");
      router.push("/login");
      return false;
    }
    return true;
  };

  const addToCart = async (productId: string) => {
    if (!guard()) return;
    try {
      await cartApi.addToCart(productId);
      await refresh();
      toast.success("Added to cart");
    } catch (err) {
      toast.error(getError(err));
    }
  };

  const removeItem = async (productId: string) => {
    try {
      await cartApi.removeCartItem(productId);
      await refresh();
      toast.success("Removed from cart");
    } catch (err) {
      toast.error(getError(err));
    }
  };

  const updateCount = async (productId: string, count: number) => {
    if (count < 1) return removeItem(productId);
    try {
      await cartApi.updateCartItem(productId, count);
      await refresh();
    } catch (err) {
      toast.error(getError(err));
    }
  };

  const clear = async () => {
    try {
      await cartApi.clearCart();
      setCart(null);
      toast.success("Cart cleared");
    } catch (err) {
      toast.error(getError(err));
    }
  };

  const count = cart?.products.reduce((sum, p) => sum + p.count, 0) ?? 0;

  return (
    <CartContext.Provider
      value={{ cart, count, loading, addToCart, updateCount, removeItem, clear, refresh }}
    >
      {children}
    </CartContext.Provider>
  );
}