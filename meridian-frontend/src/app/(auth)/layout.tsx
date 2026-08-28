import { AuthFooter } from "@/features/auth/components/auth-footer";
import { AuthNav } from "@/features/auth/components/auth-nav";
import { ReactNode } from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <AuthNav />
      <main className="flex flex-1 items-center justify-center px-4">
        {children}
      </main>
      <AuthFooter />
    </div>
  );
}
