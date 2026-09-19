import Image from "next/image";
import meterImg from "../../../../public/images/meter.png";
import aggregateImg from "../../../../public/images/aggregate.png";
import billsImg from "../../../../public/images/bill.png";

export function HowItWorksSection() {
  const section = [
    {
      id: "01",
      name: "Meter",
      desc: "Send events from any source. Count, sum, or take the max over any window. Every event is timestamped and idempotent.",
      img: meterImg,
    },
    {
      id: "02",
      name: "Aggregate",
      desc: "Apply tiers, flat fees, or per-unit rates. Model any pricing structure — free allowances, volume discounts, seat-based fees.",
      img: aggregateImg,
    },
    {
      id: "03",
      name: "Bills",
      desc: "Invoices are generated and finalized automatically at period end. Export to Stripe, QuickBooks, or via webhook.",
      img: billsImg,
    },
  ];
  return (
    <div className="py-22 px-6">
      <h1 className="font-sans text-xl text-gray-500">HOW IT WORKS</h1>

      <div className="flex gap-4 mt-16">
        {section.map((sec, index) => (
          <div key={sec.id} className="flex items-start">
            <div className="flex flex-col gap-5">
              <h1 className="font-mono text-xl text-gray-500">{sec.id}</h1>
              <h1 className="font-sans text-xl">{sec.name}</h1>
              <h1 className="font-sans text-xl text-gray-500">{sec.desc}</h1>
              <Image src={sec.img} alt={sec.name} />
            </div>

            {index !== section.length - 1 && (
              <div className="w-px bg-gray-300 mx-4 self-stretch" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
