"use client";
import { useEffect, useState } from "react";
import { FormikProps } from "formik";
import toast from "react-hot-toast";
import FormInput from "@/components/ui/FormInput";
import { getAddresses, removeAddress } from "@/services/addresses";
import { Address } from "@/types/order";
import { getError } from "@/lib/getError";

export interface CheckoutValues {
  details: string;
  phone: string;
  city: string;
  save: boolean;
}

export default function AddressForm({
  formik,
}: {
  formik: FormikProps<CheckoutValues>;
}) {
  const [saved, setSaved] = useState<Address[]>([]);

  useEffect(() => {
    getAddresses()
      .then(setSaved)
      .catch(() => setSaved([]));
  }, []);

  const pick = (id: string) => {
    const a = saved.find((s) => s._id === id);
    if (a) {
      formik.setValues({
        details: a.details,
        phone: a.phone,
        city: a.city,
        save: false,
      });
    }
  };

  const del = async (id: string) => {
    try {
      await removeAddress(id);
      setSaved((p) => p.filter((a) => a._id !== id));
      toast.success("Address removed");
    } catch (err) {
      toast.error(getError(err));
    }
  };

  const field = (name: "details" | "phone" | "city", label: string, type = "text") => (
    <FormInput
      id={name}
      name={name}
      type={type}
      label={label}
      value={formik.values[name]}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      error={formik.touched[name] ? formik.errors[name] : undefined}
    />
  );

  return (
    <div>
      <h2 className="font-bold mb-3">Shipping address</h2>

      {saved.length > 0 && (
        <div className="mb-4">
          <p className="text-sm text-gray-500 mb-2">Use a saved address:</p>
          <div className="flex flex-wrap gap-2">
            {saved.map((a) => (
              <span
                key={a._id}
                className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1 text-sm"
              >
                <button type="button" onClick={() => pick(a._id)} className="hover:text-green-600">
                  {a.name} · {a.city}
                </button>
                <button
                  type="button"
                  onClick={() => del(a._id)}
                  className="text-red-500"
                  aria-label="Delete address"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      {field("details", "Address details")}
      {field("phone", "Phone", "tel")}
      {field("city", "City")}

      <label className="flex items-center gap-2 text-sm mb-2">
        <input
          type="checkbox"
          name="save"
          checked={formik.values.save}
          onChange={formik.handleChange}
        />
        Save this address for next time
      </label>
    </div>
  );
}