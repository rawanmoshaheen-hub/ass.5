const BASE = "https://ecommerce.routemisr.com/api/v1";

export async function getData<T = unknown>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json() as Promise<T>;
}