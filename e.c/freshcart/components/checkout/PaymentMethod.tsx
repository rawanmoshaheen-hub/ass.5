export type Payment = "cash" | "online";

export default function PaymentMethod({
  value,
  onChange,
}: {
  value: Payment;
  onChange: (v: Payment) => void;
}) {
  const option = (v: Payment, title: string, text: string) => (
    <label
      className={`flex items-start gap-3 border rounded-lg p-3 cursor-pointer ${
        value === v ? "border-green-600 bg-green-50" : "border-gray-300"
      }`}
    >
      <input
        type="radio"
        name="payment"
        checked={value === v}
        onChange={() => onChange(v)}
        className="mt-1"
      />
      <span>
        <span className="font-semibold block">{title}</span>
        <span className="text-sm text-gray-500">{text}</span>
      </span>
    </label>
  );

  return (
    <div className="space-y-2">
      <h2 className="font-bold mb-2">Payment method</h2>
      {option("cash", "Cash on delivery", "Pay when your order arrives.")}
      {option("online", "Online payment", "Pay now by card (Stripe).")}
    </div>
  );
}