import { Skeleton } from "@/components/ui/skeleton";

export function InvoiceSummarySkeleton() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <Skeleton className="w-14 h-4 rounded bg-gray-200" />
        <Skeleton className="w-100 h-4 rounded bg-gray-200" />
      </div>

      <div className="mt-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center justify-between py-4 mb-2 w-150"
          >
            <Skeleton className="w-36 h-4 rounded bg-gray-200" />
            <Skeleton className="w-36 h-4 rounded bg-gray-200" />
          </div>
        ))}
      </div>
    </div>
  );
}
