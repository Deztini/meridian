"use client"

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export function HomeNavbar() {
  const router = useRouter();
  return (
    <>
      <div className="flex justify-between py-4 px-6">
        <div className="flex gap-12 items-center">
          <h1 className="text-xl font-semibold font-heading">Meridian</h1>
          <div className="flex gap-6">
            <Link
              href="/"
              className="font-sans text-muted-foreground hover:text-foreground"
            >
              Product
            </Link>
            <Link
              href="/"
              className="font-sans text-muted-foreground hover:text-foreground"
            >
              Docs
            </Link>
            <Link
              href="/"
              className="font-sans text-muted-foreground hover:text-foreground"
            >
              Changelog
            </Link>
            <Link
              href="/"
              className="font-sans text-muted-foreground hover:text-foreground"
            >
              Pricing
            </Link>
          </div>
        </div>

        <div className="flex gap-3 items-center">
          <Link
            href="/login"
            className="font-sans text-muted-foreground hover:text-foreground"
          >
            Sign in
          </Link>

          <Button
            onClick={() => router.push("/signup")}
            className="flex gap-1 w-full md:w-[130] px-3 py-4 rounded-sm cursor-pointer font-sans"
          >
            <span>Get Started</span>
            <ArrowRight />
          </Button>
        </div>
      </div>
      <hr className="border-t border-gray-300" />
    </>
  );
}
