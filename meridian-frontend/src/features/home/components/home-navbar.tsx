"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth-store";

function renderAuthAction(isInitializing: boolean, accessToken: string | null) {
  if (isInitializing) return null;

  if (accessToken) {
    return (
      <Link
        href="/dashboard"
        className="rounded bg-black px-4 py-1.5 text-sm text-white"
      >
        Go to Dashboard
      </Link>
    );
  }

  return (
    <>
      <Link
        href="/login"
        className="font-sans text-muted-foreground hover:text-foreground"
      >
        Sign in
      </Link>

      <Link
        href="/signup"
        className="flex gap-1 bg-black text-white w-full md:w-[170] px-6 py-2 rounded-sm cursor-pointer font-sans hover:bg-gray-900 "
      >
        <span>Get Started</span>
        <ArrowRight />
      </Link>
    </>
  );
}

export function HomeNavbar() {
  const router = useRouter();
  const { isInitializing, accessToken } = useAuthStore();
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

        <div className="flex gap-4 items-center">
          {renderAuthAction(isInitializing, accessToken)}
          {/* <Link
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
          </Button> */}
        </div>
      </div>
      <hr className="border-t border-gray-300" />
    </>
  );
}
