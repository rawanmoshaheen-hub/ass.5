"use client";
import { useState } from "react";

export default function ProductGallery({
  cover,
  images,
}: {
  cover: string;
  images: string[];
}) {
  const all = [cover, ...images.filter((i) => i !== cover)];
  const [active, setActive] = useState(all[0]);

  return (
    <div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={active} alt="product" className="w-full rounded-xl" />
      <div className="flex gap-2 mt-3 overflow-x-auto">
        {all.map((img) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={img}
            src={img}
            alt="thumb"
            onClick={() => setActive(img)}
            className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 ${
              img === active ? "border-green-600" : "border-transparent"
            }`}
          />
        ))}
      </div>
    </div>
  );
}