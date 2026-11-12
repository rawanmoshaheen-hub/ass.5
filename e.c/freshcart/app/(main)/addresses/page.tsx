import AddressManager from "@/components/profile/AddressManager";

export default function AddressesPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">My Addresses</h1>
      <AddressManager />
    </div>
  );
}