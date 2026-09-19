import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import eventApiImg from "../../../../public/images/meridian-1.png";
import eventApiInvoiceImg from "../../../../public/images/meridian-2.png";

export function HeroSection() {
  return (
    <>
    <div className="flex justify-between items-start px-8 py-30">
      <div className="flex flex-col gap-10 ml-10">
        <h1 className="font-sans text-[12px] text-gray-500">
          USAGE-BASED BILLING API
        </h1>
        <h2 className="font-heading text-7xl w-105">
          Bill exactly what you meter.
        </h2>
        <h1 className="font-sans w-110 text-xl text-gray-500">
          Ingest raw API events. Define flexible pricing tiers. Get accurate,
          auditable invoices — automatically. No billing logic in your codebase.
        </h1>
        <div className="flex gap-4">
          <Button className="w-full md:w-[130] px-3 py-5 rounded-sm cursor-pointer font-sans">
            Start for free
          </Button>
          <Link
            href="/"
            className="flex items-center font-sans text-muted-foreground hover:text-foreground"
          >
            <span>Read the docs</span>
            <ArrowRight />
          </Link>
        </div>

        <h1 className="font-sans text-xs text-gray-300 font-semibold">
          Free up to 10,000 events/mo. No credit card required.
        </h1>
      </div>

      <div className="flex flex-col gap-5 mr-6">
        <Image src={eventApiImg} alt="event api image" className="h-90 w-130" />
        <Image
          src={eventApiInvoiceImg}
          alt="event api invoice image"
          className="h-70 w-130"
        />
      </div>
    </div>
    <hr className="border-t border-gray-300" />
    </>
  );
}
