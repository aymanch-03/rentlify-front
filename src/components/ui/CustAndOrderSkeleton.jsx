import { Skeleton } from "./skeleton";

const CustAndOrderSkeleton = () => {
  return (
    <div className="col-span-1 md:border-l border-t md:border-t-0 border-gray-900/5 px-4 py-10 sm:px-6 xl:px-8">
      <div className="flex flex-col justify-between whitespace-nowrap">
        <div>
          <Skeleton className="w-24 h-4 mb-2" />
          <Skeleton className="w-20 h-3" />
        </div>
      </div>
      <div className="grid mt-4">
        <Skeleton className={"w-full h-20"} />
      </div>
      <div className="flex flex-col justify-between whitespace-nowrap mt-6">
        <div>
          <Skeleton className="w-24 h-4 mb-2" />
          <Skeleton className="w-20 h-3" />
        </div>
      </div>
      <div className="grid mt-4">
        <Skeleton className={"w-full h-20"} />
      </div>
    </div>
  );
};

export default CustAndOrderSkeleton;
