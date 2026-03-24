import { UserProfile } from "@clerk/nextjs";

export default function ProfilePage() {
  return (
    <main className="min-h-screen flex items-center justify-center py-10">
      <UserProfile routing="hash"/>
    </main>
  );
}