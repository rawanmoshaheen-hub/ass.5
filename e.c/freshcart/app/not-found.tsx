import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-6xl font-bold text-green-600">404</h1>
      <p className="text-lg">Page not found</p>
      <Link
        href="/"
        className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
      >
        Back to Home
      </Link>
    </div>
  );
}