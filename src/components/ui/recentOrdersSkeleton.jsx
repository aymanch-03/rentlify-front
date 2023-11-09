import { Skeleton } from "./skeleton";

const RecentOrdersSkeleton = () => {
  return (
    <>
      <div className="flex flex-col justify-between whitespace-nowrap">
        <div className="flex items-center justify-between">
          <Skeleton className="w-24 h-4" />
          <Skeleton className="w-20 h-4" />
        </div>
      </div>
      <Skeleton className="w-full h-full" />
    </>
  );
};

export default RecentOrdersSkeleton;
