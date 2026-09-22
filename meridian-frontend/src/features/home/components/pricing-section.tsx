import { Button } from "@/components/ui/button";

export function PricingSection() {
  return (
    <div className="py-16 px-7 mb-20">
      <div className="mb-6">
        <h1 className="font-sans text-gray-500 text-[16px]">PRICING</h1>
        <h2 className="font-heading text-4xl">
          Predictable pricing. No surprises.
        </h2>
      </div>

      <div className="overflow-hidden rounded-xs border border-gray-200 bg-white mt-14">
      <table className="w-full border-collapse">
        <thead>
          <tr className="divide-x divide-gray-200 border-b border-gray-300">
            <th className="w-1/5"></th>
            <th className="text-left py-6 px-5 ">
              <div className="flex flex-col gap-1">
                <span className="font-sans text-xl text-gray-900">Starter</span>
                <span className="font-sans text-2xl font-semibold text-gray-900">
                  Free
                </span>
                <span className="font-sans text-xs text-gray-400">
                  up to 10k events/mo
                </span>
              </div>
            </th>

            <th className="text-left py-6 px-5 ">
              <div className="flex flex-col gap-1">
                <span className="font-sans text-xl text-gray-900">Pro</span>
                <span className="font-sans text-2xl font-semibold text-gray-900">
                  $49
                </span>
                <span className="font-sans text-xs text-gray-400">
                  per month
                </span>
              </div>
            </th>

            <th className="text-left py-6 px-5 ">
              <div className="flex flex-col gap-1">
                <span className="font-sans text-xl text-gray-900">
                  Enterprise
                </span>
                <span className="font-sans text-2xl font-semibold text-gray-900">
                  Custom
                </span>
                <span className="font-sans text-xs text-gray-400">
                  contact us
                </span>
              </div>
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          <tr className="[&>td:first-child]:text-gray-500 divide-x divide-gray-200">
            <td className="px-6 py-4">Events included</td>
            <td className="text-xs font-mono px-6 py-4 text-gray-900">10,000 / mo</td>
            <td className="text-xs  font-mono px-6 py-4 text-gray-900"> 1,000,000 / mo</td>
            <td className="text-xs  font-mono px-6 py-4 text-gray-900">Unlimited</td>
          </tr>

          <tr className="[&>td:first-child]:text-gray-500 divide-x divide-gray-200">
            <td className="px-6 py-4">Overage rate</td>
            <td className="text-xs font-mono px-6 py-4 text-gray-900">$0.0005</td>
            <td className="text-xs font-mono px-6 py-4 text-gray-900"> $0.0002</td>
            <td className="text-xs font-mono px-6 py-4 text-gray-900">Negotiated</td>
          </tr>

          <tr className="[&>td:first-child]:text-gray-500 divide-x divide-gray-200">
            <td className="px-6 py-4">Customers</td>
            <td  className="text-xs font-mono px-6 py-4 text-gray-900"> Unlimited</td>
            <td  className="text-xs font-mono px-6 py-4 text-gray-900"> Unlimited</td>
            <td  className="text-xs font-mono px-6 py-4 text-gray-900"> Unlimited</td>
          </tr>

          <tr className="[&>td:first-child]:text-gray-500 divide-x divide-gray-200">
            <td  className="px-6 py-4">API keys</td>
            <td  className="text-xs font-mono px-6 py-4 text-gray-900">3</td>
            <td  className="text-xs font-mono px-6 py-4 text-gray-900">50</td>
            <td  className="text-xs font-mono px-6 py-4 text-gray-900">Unlimited</td>
          </tr>

          <tr className="[&>td:first-child]:text-gray-500 divide-x divide-gray-200">
            <td className="px-6 py-4">Webhooks</td>
            <td className="text-xs font-mono px-6 py-4 text-gray-900">—</td>
            <td className="text-xs font-mono px-6 py-4 text-gray-900">✓</td>
            <td className="text-xs font-mono px-6 py-4 text-gray-900">✓</td>
          </tr>

          <tr className="[&>td:first-child]:text-gray-500 divide-x divide-gray-200">
            <td className="px-6 py-4">Uptime SLA</td>
            <td className="text-xs font-mono px-6 py-4 text-gray-900">—</td>
            <td className="text-xs font-mono px-6 py-4 text-gray-900">99.99%</td>
            <td className="text-xs font-mono px-6 py-4 text-gray-900">99.99%</td>
          </tr>

          <tr className="[&>td:first-child]:text-gray-500 divide-x divide-gray-200">
            <td className="px-6 py-4">Support</td>
            <td className="text-xs font-mono px-6 py-4 text-gray-900">Community</td>
            <td className="text-xs font-mono px-6 py-4 text-gray-900">Email + chat</td>
            <td className="text-xs font-mono px-6 py-4 text-gray-900">Dedicated SLA</td>
          </tr>

           <tr className="divide-x divide-gray-200">
            <td className="px-6 py-4"></td>
            <td className="px-6 py-4">
              <Button className="w-full rounded-[4px] bg-white border border-gray-300 px-2 py-5 text-sm font-medium text-gray-900 hover:bg-gray-50 cursor-pointer">Get Started</Button>
            </td>
              <td className="px-6 py-4">
              <Button className="w-full rounded-[4px]  border border-gray-300 px-2 py-5 text-sm font-medium cursor-pointer">Get Started</Button>
            </td>
              <td className="px-6 py-4">
              <Button className="w-full rounded-[4px] bg-white border border-gray-300 px-2 py-5 text-sm font-medium text-gray-900 hover:bg-gray-50 cursor-pointer">Contact sales</Button>
            </td>
          </tr>
        </tbody>
      </table>
      </div>
    </div>
  );
}
