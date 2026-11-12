"use client";
import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function ProductFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [keyword, setKeyword] = useState(params.get("keyword") ?? "");

  const update = (key: string, value: string) => {
    const q = new URLSearchParams(params.toString());
    if (value) q.set(key, value);
    else q.delete(key);
    q.set("page", "1");
    router.push(`${pathname}?${q.toString()}`);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-6">
      <form
        className="flex-1 flex gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          update("keyword", keyword);
        }}
      >
        <input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Search products..."
          className="flex-1 border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-green-500"
        />
        <button className="bg-green-600 text-white px-4 rounded-lg">Search</button>
      </form>

      <select
        defaultValue={params.get("sort") ?? ""}
        onChange={(e) => update("sort", e.target.value)}
        className="border rounded-lg px-3 py-2"
      >
        <option value="">Sort by</option>
        <option value="price">Price: low to high</option>
        <option value="-price">Price: high to low</option>
        <option value="-ratingsAverage">Top rated</option>
      </select>
    </div>
  );
}