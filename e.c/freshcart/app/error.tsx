"use client";

export default function Error({
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
      <h2 className="text-xl font-bold">Something went wrong</h2>
      <p className="text-gray-500">The server may be busy, try again.</p>
      <button
        onClick={reset}
        className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
      >
        Try again
      </button>
    </div>
  );
}