import { Skeleton } from "./skeleton";

const StatsSkeleton = () => {
  return (
    <>
      <Skeleton className="w-24 h-4 mb-2" />
      <Skeleton className="w-20 h-3" />
      <Skeleton className="w-32 flex-none h-10 " />
    </>
  );
};

export default StatsSkeleton;
