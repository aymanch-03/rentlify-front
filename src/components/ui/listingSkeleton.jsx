import { Skeleton } from "./skeleton";
const ListingSkeleton = () => {
  return (
    <div className="flex flex-col rounded-lg overflow-hidden space-y-2">
      <Skeleton className={"rounded-xl sm:h-[205px] h-[300px] "} />

      <Skeleton className={"w-full h-6"} />
      <h1 className="font-light text-sm flex items-center w-2/3 gap-2">
        <Skeleton className={"w-full h-full"} />,{" "}
        <Skeleton className={"w-full h-full"} />
      </h1>
      <Skeleton className={"w-1/2 h-6"} />
    </div>
  );
};

export default ListingSkeleton;
