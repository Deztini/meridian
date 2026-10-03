"use client";

import { Button } from "@/components/ui/button";
import { AuthUser, useAuthStore } from "@/stores/auth-store";
import { LayoutDashboard } from "lucide-react";
import { FileText } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Sidebar({ user }: { user: AuthUser }) {
  const {clearAuth} = useAuthStore();
  const pathName = usePathname();
  const nameParts = user.fullName.split(" ");
  const lastNameInitials = nameParts[0].charAt(0);
  const firstNameInitials = nameParts[1].charAt(0);
  const userNameInitials = lastNameInitials + firstNameInitials;
  const navElements = [
    { label: "Dashboard", href: "/dashboard", icon: <LayoutDashboard /> },
    { label: "Invoice", href: "/invoice", icon: <FileText /> },
  ];
  return (
    <div className="flex flex-col justify-between w-64 bg-white border-r border-gray-300  py-4">
      <div>
        <div className="pb-5 px-12">
          <h1 className="font-heading text-xl">Meridian</h1>
        </div>
        <hr className="border-t border-gray-300" />

        <nav className="mt-5 flex flex-col gap-2 px-4">
          {navElements.map((navEl) => {
            const isActive = pathName === navEl.href;
            return (
              <Link
                key={navEl.label}
                href={navEl.href}
                className={`flex gap-2 items-center  hover:bg-gray-200 py-2 px-4 rounded   ${isActive ? "bg-gray-200 text-black" : "text-gray-500 hover:text-black"}`}
              >
                <div>{navEl.icon}</div>
                <h1>{navEl.label}</h1>
              </Link>
            );
          })}
        </nav>
      </div>

      <div>
        <hr className="border-t border-gray-300" />
        <div className="flex items-center gap-4 pt-5 pb-2 px-6">
          <div className="bg-gray-200 text-[16px]  h-8 w-8 rounded-full py-1 px-1">
            {userNameInitials}
          </div>
          <div className="flex flex-col gap-1">
            <h1 className="font-sans text-xs">{user.fullName}</h1>
            <h1 className="text-gray-400 text-[10px] font-sans">{user.email}</h1>
          </div>
        </div>

        <Button>Logout</Button>
      </div>
    </div>
  );
}
