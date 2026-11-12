"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Pagination({
  current,
  total,
}: {
  current: number;
  total: number;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  if (total <= 1) return null;

  const go = (page: number) => {
    const q = new URLSearchParams(params.toString());
    q.set("page", String(page));
    router.push(`${pathname}?${q.toString()}`);
  };

  return (
    <div className="flex justify-center items-center gap-2 mt-8">
      <button
        disabled={current <= 1}
        onClick={() => go(current - 1)}
        className="px-3 py-1 border rounded disabled:opacity-40"
      >
        Prev
      </button>
      {Array.from({ length: total }, (_, i) => i + 1).map((p) => (
        <button
          key={p}
          onClick={() => go(p)}
          className={`px-3 py-1 border rounded ${
            p === current ? "bg-green-600 text-white" : "bg-white"
          }`}
        >
          {p}
        </button>
      ))}
      <button
        disabled={current >= total}
        onClick={() => go(current + 1)}
        className="px-3 py-1 border rounded disabled:opacity-40"
      >
        Next
      </button>
    </div>
  );
}