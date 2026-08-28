"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export function BackButton({ buttonText }: { buttonText: string }) {
  const router = useRouter();

  return (
    <button
      className="flex items-center  gap-1 text-sm text-muted-foreground hover:text-foreground"
      onClick={() => router.back()}
    >
      <ArrowLeft />
      {buttonText}
    </button>
  );
}
