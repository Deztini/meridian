import { ActivityChart } from "@/features/dashboard/components/activity-chart";
import { DashboardNavbar } from "@/features/dashboard/components/dashboard-navbar";
import { DashboardSummary } from "@/features/dashboard/components/dashboard-summary";
import { SimulateUsage } from "@/features/dashboard/components/simulate-usage";

export default function DashboardPage() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <DashboardNavbar />
      <DashboardSummary />
      <SimulateUsage />
      <ActivityChart />
    </div>
  );
}