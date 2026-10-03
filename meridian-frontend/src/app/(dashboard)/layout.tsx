"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthStore } from "@/stores/auth-store";
import { Sidebar } from "@/features/dashboard/components/sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { accessToken, isInitializing, user } = useAuthStore();
  const router = useRouter();
  console.log("initializing", isInitializing);
  console.log("Token", accessToken);
  console.log("user", user);

  useEffect(() => {
    if (!isInitializing && !accessToken) {
      router.replace("/login");
    }
  }, [isInitializing, accessToken, router]);

  if (isInitializing) {
    return <div className="flex h-screen items-center justify-center text-sm text-gray-400">Loading…</div>;
  }

  if (!accessToken) {
    return null; 
  }

  return (
    <div className="flex h-screen">
      <Sidebar user={user!} />
      <main className="flex-1 overflow-y-auto bg-white">{children}</main>
    </div>
  );
}