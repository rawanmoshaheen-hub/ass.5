"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { loginUser } from "@/services/auth";
import { useAuth } from "@/context/AuthContext";
import { getError } from "@/lib/getError";
import FormInput from "@/components/ui/FormInput";

export default function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string().min(6, "Min 6 characters").required("Password is required"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const res = await loginUser(values);
        login(res.token);
        toast.success("Welcome back!");
        router.push("/");
      } catch (err) {
        toast.error(getError(err, "Login failed"));
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="w-full max-w-md bg-white p-8 rounded-2xl shadow"
    >
      <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

      <FormInput
        id="email"
        name="email"
        type="email"
        label="Email"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.email ? formik.errors.email : undefined}
      />

      <FormInput
        id="password"
        name="password"
        type="password"
        label="Password"
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.password ? formik.errors.password : undefined}
      />

      <div className="mb-4 text-sm">
        <Link href="/forgot-password" className="text-green-600 hover:underline">
          Forgot password?
        </Link>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 disabled:opacity-60"
      >
        {loading ? "Loading..." : "Login"}
      </button>

      <p className="mt-4 text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="text-green-600 hover:underline">
          Register
        </Link>
      </p>
    </form>
  );
}