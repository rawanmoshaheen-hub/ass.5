import Link from "next/link";

export default function SectionTitle({
  title,
  href,
}: {
  title: string;
  href?: string;
}) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-xl md:text-2xl font-bold">{title}</h2>
      {href && (
        <Link href={href} className="text-sm text-green-600 hover:underline">
          View all →
        </Link>
      )}
    </div>
  );
}