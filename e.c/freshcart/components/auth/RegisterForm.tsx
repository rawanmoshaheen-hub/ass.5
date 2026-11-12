"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { registerUser } from "@/services/auth";
import { getError } from "@/lib/getError";
import FormInput from "@/components/ui/FormInput";

type Values = {
  name: string;
  email: string;
  password: string;
  rePassword: string;
  phone: string;
};

export default function RegisterForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const formik = useFormik<Values>({
    initialValues: { name: "", email: "", password: "", rePassword: "", phone: "" },
    validationSchema: Yup.object({
      name: Yup.string().min(3, "Min 3 characters").required("Name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string()
        .matches(/^[A-Z][a-z0-9]{5,10}$/, "Start with a capital letter, 6-11 chars (letters/numbers)")
        .required("Password is required"),
      rePassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords don't match")
        .required("Confirm your password"),
      phone: Yup.string()
        .matches(/^01[0125][0-9]{8}$/, "Enter a valid Egyptian phone number")
        .required("Phone is required"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        await registerUser(values);
        toast.success("Account created, please login");
        router.push("/login");
      } catch (err) {
        toast.error(getError(err, "Registration failed"));
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
      className="w-full max-w-md bg-white p-8 rounded-2xl shadow"
    >
      <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>

      {field("name", "Name")}
      {field("email", "Email", "email")}
      {field("password", "Password", "password")}
      {field("rePassword", "Confirm Password", "password")}
      {field("phone", "Phone", "tel")}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 disabled:opacity-60"
      >
        {loading ? "Loading..." : "Register"}
      </button>

      <p className="mt-4 text-center text-sm">
        Already have an account?{" "}
        <Link href="/login" className="text-green-600 hover:underline">
          Login
        </Link>
      </p>
    </form>
  );
}