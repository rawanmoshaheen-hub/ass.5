"use client";
import { useCallback, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { addAddress, getAddresses, removeAddress } from "@/services/addresses";
import { Address } from "@/types/order";
import { getError } from "@/lib/getError";
import FormInput from "@/components/ui/FormInput";

type Values = { name: string; details: string; phone: string; city: string };

export default function AddressManager() {
  const [list, setList] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    try {
      setList(await getAddresses());
    } catch {
      setList([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const formik = useFormik<Values>({
    initialValues: { name: "", details: "", phone: "", city: "" },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      details: Yup.string().min(5, "Min 5 characters").required("Details are required"),
      phone: Yup.string()
        .matches(/^01[0125][0-9]{8}$/, "Enter a valid Egyptian phone number")
        .required("Phone is required"),
      city: Yup.string().required("City is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        await addAddress(values);
        toast.success("Address added");
        resetForm();
        await load();
      } catch (err) {
        toast.error(getError(err));
      }
    },
  });

  const del = async (id: string) => {
    try {
      await removeAddress(id);
      setList((p) => p.filter((a) => a._id !== id));
      toast.success("Address removed");
    } catch (err) {
      toast.error(getError(err));
    }
  };

  const field = (name: keyof Values, label: string, type = "text") => (
    <FormInput
      id={`addr-${name}`}
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
    <div className="grid md:grid-cols-2 gap-6">
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white rounded-xl shadow-sm p-6"
      >
        <h2 className="font-bold mb-4">Add new address</h2>
        {field("name", "Name (e.g. Home)")}
        {field("details", "Details")}
        {field("phone", "Phone", "tel")}
        {field("city", "City")}
        <button
          type="submit"
          disabled={formik.isSubmitting}
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 disabled:opacity-60"
        >
          {formik.isSubmitting ? "Adding..." : "Add address"}
        </button>
      </form>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="font-bold mb-4">My addresses</h2>
        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : list.length === 0 ? (
          <p className="text-gray-500">No saved addresses.</p>
        ) : (
          <ul className="space-y-3">
            {list.map((a) => (
              <li
                key={a._id}
                className="border rounded-lg p-3 flex justify-between gap-3"
              >
                <div className="text-sm">
                  <p className="font-semibold">{a.name}</p>
                  <p className="text-gray-600">
                    {a.details}, {a.city}
                  </p>
                  <p className="text-gray-500">{a.phone}</p>
                </div>
                <button
                  onClick={() => del(a._id)}
                  className="text-red-500 text-sm hover:underline"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}