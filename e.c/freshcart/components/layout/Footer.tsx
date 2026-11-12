import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t mt-12">
      <div className="max-w-7xl mx-auto px-4 py-8 grid gap-6 md:grid-cols-3">
        <div>
          <h3 className="text-xl font-bold text-green-600 mb-2">FreshCart</h3>
          <p className="text-sm text-gray-600">
            Fresh groceries and great deals, delivered to your door.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Shop</h4>
          <ul className="space-y-1 text-sm text-gray-600">
            <li><Link href="/products" className="hover:text-green-600">Products</Link></li>
            <li><Link href="/categories" className="hover:text-green-600">Categories</Link></li>
            <li><Link href="/brands" className="hover:text-green-600">Brands</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Account</h4>
          <ul className="space-y-1 text-sm text-gray-600">
            <li><Link href="/cart" className="hover:text-green-600">Cart</Link></li>
            <li><Link href="/wishlist" className="hover:text-green-600">Wishlist</Link></li>
            <li><Link href="/allorders" className="hover:text-green-600">Orders</Link></li>
          </ul>
        </div>
      </div>
      <p className="text-center text-sm text-gray-500 py-4 border-t">
        © 2026 FreshCart. All rights reserved.
      </p>
    </footer>
  );
}