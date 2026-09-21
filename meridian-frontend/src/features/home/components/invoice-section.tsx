import Image from "next/image";
import invoiceImg from "../../../../public/images/invoice.png";

export function InvoiceSection() {
  return (
    <>
      <div className="flex items-center justify-between px-8 py-24">
        <div className="flex flex-col gap-5">
          <h1 className="font-sans text-[16px] text-gray-500">INVOICING</h1>
          <h2 className="font-heading text-4xl">
            Accurate invoices, zero reconciliation.
          </h2>
          <h1 className="font-sans text-[16px] text-gray-500 max-w-130">
            Invoices are computed from your event ledger — not estimates or
            snapshots. Every line item is traceable to raw events. Disputes
            resolve in minutes, not days.
          </h1>
          <div>
            <ul className="list-disc ml-4">
              <li className="font-sans text-[16px] text-gray-500">
                PDF + JSON invoice export
              </li>
              <li className="font-sans text-[16px] text-gray-500">
                Stripe and QuickBooks sync
              </li>
              <li className="font-sans text-[16px] text-gray-500">
                Webhook on finalize
              </li>
              <li className="font-sans text-[16px] text-gray-500">
                Line-item audit trail
              </li>
            </ul>
          </div>
        </div>
        <div>
          <Image src={invoiceImg} alt="Invoice img" className="w-140 h-60"  />
        </div>
      </div>
      <hr className="border-t border-gray-300" />
    </>
  );
}
