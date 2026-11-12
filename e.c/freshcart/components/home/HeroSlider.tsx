"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

const slides = [
  {
    title: "Fresh Groceries, Delivered Fast",
    text: "Get up to 30% off on your first order.",
    href: "/products",
    cta: "Shop Now",
    bg: "from-green-600 to-green-400",
  },
  {
    title: "Explore Top Categories",
    text: "Everything you need, all in one place.",
    href: "/categories",
    cta: "Browse Categories",
    bg: "from-emerald-700 to-teal-400",
  },
  {
    title: "Your Favorite Brands",
    text: "Quality products from brands you trust.",
    href: "/brands",
    cta: "View Brands",
    bg: "from-lime-600 to-green-500",
  },
];

export default function HeroSlider() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % slides.length), 4000);
    return () => clearInterval(t);
  }, []);

  const s = slides[i];

  return (
    <section
      className={`relative rounded-2xl bg-gradient-to-r ${s.bg} text-white p-8 md:p-16 transition-all duration-500`}
    >
      <h1 className="text-3xl md:text-5xl font-bold mb-3 max-w-xl">{s.title}</h1>
      <p className="mb-6 text-lg max-w-md">{s.text}</p>
      <Link
        href={s.href}
        className="inline-block bg-white text-green-700 font-semibold px-6 py-2 rounded-lg hover:bg-gray-100"
      >
        {s.cta}
      </Link>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setI(idx)}
            aria-label={`Slide ${idx + 1}`}
            className={`h-2 rounded-full transition-all ${
              idx === i ? "w-6 bg-white" : "w-2 bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}