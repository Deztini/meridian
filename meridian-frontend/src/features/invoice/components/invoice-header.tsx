import { Button } from "@/components/ui/button";

export function InvoiceHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-muted-foreground font-sans text-[16px]">INVOICES</h2>
        <h1 className="text-muted-foreground font-sans text-xs">Generates a permanent invoice from the current period.</h1>
      </div>
      <div>
        <Button className="py-4.5 px-7 rounded cursor-pointer">Generate Invoice</Button>
      </div>
    </div>
  );
}