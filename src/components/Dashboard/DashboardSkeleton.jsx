import CustAndOrderSkeleton from "../ui/CustAndOrderSkeleton";
import ChartsSkeleton from "../ui/chartsSkeleton";
import RecentOrdersSkeleton from "../ui/recentOrdersSkeleton";
import StatsSkeleton from "../ui/statsSkeleton";

const DashboardSkeleton = () => {
  return (
    <>
      <div className="relative isolate overflow-hidden flex-1">
        <div className="border-b border-b-gray-900/10 ">
          <dl className="mx-auto grid max-w-7xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:px-2 xl:px-0">
            {Array(4)
              .fill(null)
              .map((stat, statIdx) => (
                <div
                  key={statIdx}
                  className={`${
                    statIdx % 2 === 1
                      ? "sm:border-l"
                      : statIdx === 2
                      ? "lg:border-l"
                      : ""
                  }
                flex items-baseline flex-wrap justify-between gap-y-2 gap-x-4 border-t border-gray-900/5 px-4 py-10 sm:px-6 lg:border-t-0 xl:px-8`}
                >
                  <StatsSkeleton />
                </div>
              ))}
          </dl>
        </div>
      </div>
      <div className="border-b border-gray-900/10 relative">
        <section className="mx-auto grid max-w-7xl grid-cols-1 md:grid-cols-4 lg:px-2 xl:px-0 isolate">
          <ChartsSkeleton />
          <ChartsSkeleton
            className={"md:border-l border-t md:border-t-0 border-gray-900/5"}
          />
        </section>
      </div>
      <div className="border-b border-gray-900/10 relative">
        <section className="mx-auto grid max-w-7xl grid-cols-1 md:grid-cols-3 lg:px-2 xl:px-0  isolate">
          <div className="col-span-2 flex flex-col gap-5 px-4 py-10 sm:px-6 xl:px-8">
            <RecentOrdersSkeleton />
          </div>
          <CustAndOrderSkeleton />
        </section>
      </div>
    </>
  );
};

export default DashboardSkeleton;
