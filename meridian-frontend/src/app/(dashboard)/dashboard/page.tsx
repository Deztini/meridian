import { DashboardNavbar } from "@/features/dashboard/components/dashboard-navbar";
import { DashboardSummary } from "@/features/dashboard/components/dashboard-summary";

export default function DashboardPage() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <DashboardNavbar />
      <DashboardSummary />
    </div>
  );
}