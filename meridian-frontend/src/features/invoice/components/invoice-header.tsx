"use client";

import { Button } from "@/components/ui/button";
import { useGenerateInvoice } from "../hooks/useGeneratInvoice";
import { Loader2 } from "lucide-react";

export function InvoiceHeader() {
  const { mutate, isPending } = useGenerateInvoice();
  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-muted-foreground font-sans text-[16px]">
          INVOICES
        </h2>
        <h1 className="text-muted-foreground font-sans text-xs">
          Generates a permanent invoice from the current period.
        </h1>
      </div>
      <div>
        <Button
          onClick={() => mutate()}
          disabled={isPending}
          className="min-w-[190] py-4.5 px-7 rounded cursor-pointer"
        >
          {isPending ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            "Generate Invoice"
          )}
        </Button>
      </div>
    </div>
  );
}
