"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { changePassword } from "@/services/auth";
import { useAuth } from "@/context/AuthContext";
import { getError } from "@/lib/getError";
import FormInput from "@/components/ui/FormInput";

type Values = {
  currentPassword: string;
  password: string;
  rePassword: string;
};

export default function ChangePasswordForm() {
  const router = useRouter();
  const { logout } = useAuth();
  const [loading, setLoading] = useState(false);

  const formik = useFormik<Values>({
    initialValues: { currentPassword: "", password: "", rePassword: "" },
    validationSchema: Yup.object({
      currentPassword: Yup.string().required("Current password is required"),
      password: Yup.string().min(6, "Min 6 characters").required("New password is required"),
      rePassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords don't match")
        .required("Confirm your password"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        await changePassword(values);
        toast.success("Password changed, please login again");
        logout();
        router.push("/login");
      } catch (err) {
        toast.error(getError(err, "Failed to change password"));
      } finally {
        setLoading(false);
      }
    },
  });

  const field = (name: keyof Values, label: string) => (
    <FormInput
      id={name}
      name={name}
      type="password"
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
      className="w-full max-w-md mx-auto my-10 bg-white p-8 rounded-2xl shadow"
    >
      <h1 className="text-2xl font-bold mb-6 text-center">Change Password</h1>
      {field("currentPassword", "Current password")}
      {field("password", "New password")}
      {field("rePassword", "Confirm new password")}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 disabled:opacity-60"
      >
        {loading ? "Saving..." : "Change password"}
      </button>
    </form>
  );
}