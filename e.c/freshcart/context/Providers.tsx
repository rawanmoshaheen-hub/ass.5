"use client";
import { Toaster } from "react-hot-toast";
import AuthProvider from "./AuthContext";
import CartProvider from "./CartContext";
import WishlistProvider from "./WishlistContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          {children}
          <Toaster position="top-center" />
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}