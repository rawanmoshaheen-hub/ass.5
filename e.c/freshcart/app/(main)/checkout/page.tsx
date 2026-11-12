"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useCart } from "@/context/CartContext";
import { createCashOrder, createCheckoutSession } from "@/services/orders";
import { addAddress } from "@/services/addresses";
import { getError } from "@/lib/getError";
import AddressForm, { CheckoutValues } from "@/components/checkout/AddressForm";
import PaymentMethod, { Payment } from "@/components/checkout/PaymentMethod";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, loading: cartLoading, refresh } = useCart();
  const [payment, setPayment] = useState<Payment>("cash");
  const [loading, setLoading] = useState(false);

  const formik = useFormik<CheckoutValues>({
    initialValues: { details: "", phone: "", city: "", save: false },
    validationSchema: Yup.object({
      details: Yup.string().min(5, "Min 5 characters").required("Address is required"),
      phone: Yup.string()
        .matches(/^01[0125][0-9]{8}$/, "Enter a valid Egyptian phone number")
        .required("Phone is required"),
      city: Yup.string().required("City is required"),
    }),
    onSubmit: async (values) => {
      if (!cart) return;
      setLoading(true);
      const shippingAddress = {
        details: values.details,
        phone: values.phone,
        city: values.city,
      };
      try {
        if (values.save) {
          await addAddress({ name: values.city, ...shippingAddress }).catch(() => {});
        }

        if (payment === "cash") {
          await createCashOrder(cart._id, shippingAddress);
          toast.success("Order placed successfully");
          await refresh();
          router.push("/allorders");
        } else {
          const res = await createCheckoutSession(cart._id, shippingAddress);
          window.location.href = res.session.url;
        }
      } catch (err) {
        toast.error(getError(err, "Checkout failed"));
        setLoading(false);
      }
    },
  });

  if (cartLoading && !cart) {
    return <p className="text-center py-20 text-gray-500">Loading...</p>;
  }

  if (!cart || cart.products.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500 mb-4">Your cart is empty.</p>
        <Link href="/products" className="bg-green-600 text-white px-6 py-2 rounded-lg">
          Start shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      <form onSubmit={formik.handleSubmit} className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-5">
            <AddressForm formik={formik} />
          </div>
          <div className="bg-white rounded-xl shadow-sm p-5">
            <PaymentMethod value={payment} onChange={setPayment} />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-5 h-fit">
          <h2 className="font-bold mb-3">Order summary</h2>
          <ul className="text-sm space-y-1 mb-3">
            {cart.products.map((p) => (
              <li key={p._id} className="flex justify-between gap-2">
                <span className="line-clamp-1">
                  {p.product.title} × {p.count}
                </span>
                <span>{p.price * p.count}</span>
              </li>
            ))}
          </ul>
          <div className="flex justify-between font-bold text-lg border-t pt-3 mb-4">
            <span>Total</span>
            <span>{cart.totalCartPrice} EGP</span>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 disabled:opacity-60"
          >
            {loading
              ? "Processing..."
              : payment === "cash"
              ? "Place order"
              : "Pay online"}
          </button>
        </div>
      </form>
    </div>
  );
}