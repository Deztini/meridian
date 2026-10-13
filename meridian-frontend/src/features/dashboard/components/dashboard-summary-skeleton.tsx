import { Skeleton } from "@/components/ui/skeleton";

export function DashboardSummarySkeleton() {
  return (
    <div className="py-10 px-22">
      <Skeleton className="h-5 w-48 rounded bg-gray-200" />

      <div className="flex items-center gap-100">
        <div className="flex flex-col gap-4 mt-6">
          <Skeleton className="h-4 w-44 rounded bg-gray-200" />
          <Skeleton className="h-[72px] w-64 rounded bg-gray-200" />
          <Skeleton className="h-6 w-72 mt-4 rounded bg-gray-200" />
        </div>

        <div>
          <div className="flex items-center gap-35">
            <div className="flex flex-col gap-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-6 w-32 rounded bg-gray-200" />
              ))}
            </div>
            <div className="flex flex-col gap-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-6 w-16 rounded bg-gray-200" />
              ))}
            </div>
          </div>
          <hr className="border-t border-gray-300 my-4" />
          <div className="flex items-center gap-38">
            <Skeleton className="h-6 w-28 rounded bg-gray-200" />
            <Skeleton className="h-6 w-16 rounded bg-gray-200" />
          </div>
        </div>
      </div>

      <hr className="border-t border-gray-300 mt-10" />
    </div>
  );
}
