/* eslint-disable react/prop-types */
import { cn } from "../../lib/utils";
import { Skeleton } from "./skeleton";
const ChartsSkeleton = ({ className }) => {
  return (
    <div
      className={cn(
        "col-span-2 grid grid-cols-3 px-4 py-10 sm:px-6 xl:px-8",
        className
      )}
    >
      <div className="col-span-1 flex flex-col justify-between whitespace-nowrap">
        <div>
          <Skeleton className="w-24 h-4 mb-2" />
          <Skeleton className="w-20 h-3" />
        </div>
        <div>
          <Skeleton className="w-24 h-10 mb-2" />
          <Skeleton className="w-28 h-3" />
        </div>
      </div>
      <div className="col-span-2 grid">
        <Skeleton className="w-full h-[150px]" />
      </div>
    </div>
  );
};

export default ChartsSkeleton;
