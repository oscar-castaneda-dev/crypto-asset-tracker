import { Skeleton } from "@/components/ui/skeleton";

export function WalletSkeleton() {
  return (
    <div className="space-y-4 p-4">
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-16 w-full" />
      <div className="grid grid-cols-2 gap-4">
        <Skeleton className="h-16" />
        <Skeleton className="h-16" />
      </div>
      <Skeleton className="h-10 w-full" />
    </div>
  );
}
