"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

const links = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/categories", label: "Categories" },
  { href: "/brands", label: "Brands" },
];

function Badge({ n }: { n: number }) {
  if (!n) return null;
  return (
    <span className="ml-1 bg-green-600 text-white text-xs rounded-full px-1.5 py-0.5">
      {n}
    </span>
  );
}

export default function Navbar() {
  const { token, logout } = useAuth();
  const { count: cartCount } = useCart();
  const { count: wishCount } = useWishlist();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const linkClass = (href: string) =>
    `px-2 py-1 rounded ${
      pathname === href ? "text-green-600 font-semibold" : "text-gray-700 hover:text-green-600"
    }`;

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        <Link href="/" className="text-2xl font-bold text-green-600">
          FreshCart
        </Link>

        <ul className="hidden md:flex items-center gap-4">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className={linkClass(l.href)}>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-4 text-sm">
          {token ? (
            <>
              <Link href="/wishlist" className={linkClass("/wishlist")}>
                ❤️ Wishlist
                <Badge n={wishCount} />
              </Link>
              <Link href="/cart" className={linkClass("/cart")}>
                🛒 Cart
                <Badge n={cartCount} />
              </Link>
              <Link href="/allorders" className={linkClass("/allorders")}>
                Orders
              </Link>
              <Link href="/profile" className={linkClass("/profile")}>
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className={linkClass("/login")}>
                Login
              </Link>
              <Link
                href="/register"
                className="bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700"
              >
                Register
              </Link>
            </>
          )}
        </div>

        <button
          className="md:hidden text-2xl"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          ☰
        </button>
      </nav>

      {open && (
        <div className="md:hidden border-t bg-white px-4 py-3 flex flex-col gap-2">
          {links.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
          {token ? (
            <>
              <Link href="/wishlist" onClick={() => setOpen(false)}>
                Wishlist ({wishCount})
              </Link>
              <Link href="/cart" onClick={() => setOpen(false)}>
                Cart ({cartCount})
              </Link>
              <Link href="/allorders" onClick={() => setOpen(false)}>Orders</Link>
              <Link href="/profile" onClick={() => setOpen(false)}>Profile</Link>
              <button onClick={handleLogout} className="text-left text-red-500">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" onClick={() => setOpen(false)}>Login</Link>
              <Link href="/register" onClick={() => setOpen(false)}>Register</Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}