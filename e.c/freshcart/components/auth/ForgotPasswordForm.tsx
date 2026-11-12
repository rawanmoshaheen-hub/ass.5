"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { forgotPassword, verifyResetCode, resetPassword } from "@/services/auth";
import { getError } from "@/lib/getError";
import FormInput from "@/components/ui/FormInput";

export default function ForgotPasswordForm() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const run = async (fn: () => Promise<void>) => {
    setLoading(true);
    try {
      await fn();
    } catch (err) {
      toast.error(getError(err));
    } finally {
      setLoading(false);
    }
  };

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    run(async () => {
      await forgotPassword(email);
      toast.success("Reset code sent to your email");
      setStep(2);
    });
  };

  const verifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    run(async () => {
      await verifyResetCode(code);
      toast.success("Code verified");
      setStep(3);
    });
  };

  const submitPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    run(async () => {
      await resetPassword(email, newPassword);
      toast.success("Password updated, please login");
      router.push("/login");
    });
  };

  const btn =
    "w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 disabled:opacity-60";

  return (
    <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow">
      <h1 className="text-2xl font-bold mb-2 text-center">Forgot Password</h1>
      <p className="text-center text-sm text-gray-500 mb-6">Step {step} of 3</p>

      {step === 1 && (
        <form onSubmit={sendEmail}>
          <FormInput
            id="email"
            type="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" disabled={loading} className={btn}>
            {loading ? "Sending..." : "Send code"}
          </button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={verifyCode}>
          <FormInput
            id="code"
            label="Reset code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
          <button type="submit" disabled={loading} className={btn}>
            {loading ? "Verifying..." : "Verify code"}
          </button>
        </form>
      )}

      {step === 3 && (
        <form onSubmit={submitPassword}>
          <FormInput
            id="newPassword"
            type="password"
            label="New password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <button type="submit" disabled={loading} className={btn}>
            {loading ? "Saving..." : "Reset password"}
          </button>
        </form>
      )}

      <p className="mt-4 text-center text-sm">
        <Link href="/login" className="text-green-600 hover:underline">
          Back to login
        </Link>
      </p>
    </div>
  );
}