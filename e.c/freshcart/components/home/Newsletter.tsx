"use client";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Newsletter() {
  const [email, setEmail] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thanks for subscribing!");
    setEmail("");
  };

  return (
    <section className="bg-green-50 rounded-2xl p-8 text-center">
      <h2 className="text-2xl font-bold mb-2">Get the latest deals</h2>
      <p className="text-gray-600 mb-4">
        Subscribe to our newsletter and never miss an offer.
      </p>
      <form
        onSubmit={submit}
        className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto"
      >
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email"
          className="flex-1 border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-green-500"
        />
        <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700">
          Subscribe
        </button>
      </form>
    </section>
  );
}