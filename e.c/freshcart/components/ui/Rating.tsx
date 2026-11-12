export default function Rating({ value }: { value: number }) {
  return (
    <span className="text-yellow-500 text-sm">
      ★ {value?.toFixed(1)}
    </span>
  );
}