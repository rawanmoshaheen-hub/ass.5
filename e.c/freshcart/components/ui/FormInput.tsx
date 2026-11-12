import { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export default function FormInput({ label, error, id, ...rest }: Props) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block mb-1 text-sm font-medium">
        {label}
      </label>
      <input
        id={id}
        {...rest}
        className={`w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-green-500 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}