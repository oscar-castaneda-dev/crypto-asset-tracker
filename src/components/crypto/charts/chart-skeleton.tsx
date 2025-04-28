import { Skeleton } from "@/components/ui/skeleton";

export function ChartSkeleton() {
  return (
    <div className="h-80 w-full flex flex-col justify-center gap-3 p-6">
      <Skeleton className="h-3 w-5/6 rounded" />
      <Skeleton className="h-3 w-2/3 rounded" />
      <Skeleton className="h-3 w-3/4 rounded" />
      <Skeleton className="h-3 w-4/5 rounded" />
      <Skeleton className="h-3 w-1/2 rounded" />
      <Skeleton className="h-3 w-5/6 rounded" />
      <Skeleton className="h-3 w-2/3 rounded" />
      <Skeleton className="h-3 w-3/4 rounded" />
      <Skeleton className="h-3 w-1/2 rounded" />
      <Skeleton className="h-3 w-4/5 rounded" />
    </div>
  );
}
