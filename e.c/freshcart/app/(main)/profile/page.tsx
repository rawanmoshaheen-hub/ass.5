import Link from "next/link";
import ProfileForm from "@/components/profile/ProfileForm";

export default function ProfilePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      <h1 className="text-2xl font-bold">My Profile</h1>
      <ProfileForm />
      <div className="flex flex-wrap gap-3 text-sm">
        <Link href="/addresses" className="text-green-600 hover:underline">
          Manage addresses
        </Link>
        <Link href="/change-password" className="text-green-600 hover:underline">
          Change password
        </Link>
        <Link href="/allorders" className="text-green-600 hover:underline">
          My orders
        </Link>
      </div>
    </div>
  );
}