"use client";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { updateMe } from "@/services/profile";
import { getError } from "@/lib/getError";
import FormInput from "@/components/ui/FormInput";

type Values = { name: string; email: string; phone: string };

export default function ProfileForm() {
  const [loading, setLoading] = useState(false);

  const formik = useFormik<Values>({
    initialValues: { name: "", email: "", phone: "" },
    validationSchema: Yup.object({
      name: Yup.string().min(3, "Min 3 characters").required("Name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      phone: Yup.string()
        .matches(/^01[0125][0-9]{8}$/, "Enter a valid Egyptian phone number")
        .required("Phone is required"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        await updateMe(values);
        toast.success("Profile updated");
      } catch (err) {
        toast.error(getError(err, "Update failed"));
      } finally {
        setLoading(false);
      }
    },
  });

  const field = (name: keyof Values, label: string, type = "text") => (
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
    <form
      onSubmit={formik.handleSubmit}
      className="bg-white rounded-xl shadow-sm p-6"
    >
      <h2 className="font-bold mb-4">Update your info</h2>
      {field("name", "Name")}
      {field("email", "Email", "email")}
      {field("phone", "Phone", "tel")}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 disabled:opacity-60"
      >
        {loading ? "Saving..." : "Save changes"}
      </button>
    </form>
  );
}