import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export function DashboardNavbar() {
  return (
    <>
      <div className="flex items-center justify-between py-4 px-14">
        <h1 className="font-sans">Dashboard</h1>
        <Link
          href="/"
          className="flex items-center gap-1 text-muted-foreground hover:text-foreground cursor-pointer text-[14px]"
        >
          <ArrowLeft />
          <h1>Home</h1>
        </Link>
      </div>
      <hr className="border-t border-gray-300" />
    </>
  );
}
