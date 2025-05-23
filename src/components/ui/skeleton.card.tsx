import { Skeleton } from "./skeleton";

export function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[125px] w-[242px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[242px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
}
