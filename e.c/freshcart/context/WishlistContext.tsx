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
import * as wishApi from "@/services/wishlist";
import { getError } from "@/lib/getError";
import { Product } from "@/types/product";

interface WishCtx {
  items: Product[];
  count: number;
  loading: boolean;
  isInWishlist: (productId: string) => boolean;
  toggle: (productId: string) => Promise<void>;
}

const WishlistContext = createContext<WishCtx>({
  items: [],
  count: 0,
  loading: false,
  isInWishlist: () => false,
  toggle: async () => {},
});

export const useWishlist = () => useContext(WishlistContext);

export default function WishlistProvider({ children }: { children: React.ReactNode }) {
  const { token } = useAuth();
  const router = useRouter();
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(async () => {
    if (!token) {
      setItems([]);
      return;
    }
    setLoading(true);
    try {
      const res = await wishApi.getWishlist();
      setItems(res.data);
    } catch {
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const isInWishlist = (id: string) => items.some((p) => p._id === id);

  const toggle = async (id: string) => {
    if (!token) {
      toast.error("Please login first");
      router.push("/login");
      return;
    }
    try {
      if (isInWishlist(id)) {
        await wishApi.removeFromWishlist(id);
        setItems((prev) => prev.filter((p) => p._id !== id));
        toast.success("Removed from wishlist");
      } else {
        await wishApi.addToWishlist(id);
        await refresh();
        toast.success("Added to wishlist");
      }
    } catch (err) {
      toast.error(getError(err));
    }
  };

  return (
    <WishlistContext.Provider
      value={{ items, count: items.length, loading, isInWishlist, toggle }}
    >
      {children}
    </WishlistContext.Provider>
  );
}