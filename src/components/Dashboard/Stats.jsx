/* eslint-disable react/prop-types */

import { Icon } from "@iconify/react";
import StatsSkeleton from "../ui/statsSkeleton";

const Stats = ({ classNames, stats }) => {
  const isLoading = false;
  return (
    <div className="relative isolate overflow-hidden flex-1">
      <div className="border-b border-b-gray-900/10 ">
        <dl className="mx-auto grid max-w-7xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:px-2 xl:px-0">
          {stats.map((stat, statIdx) => (
            <div
              key={stat.name}
              className={classNames(
                statIdx % 2 === 1
                  ? "sm:border-l"
                  : statIdx === 2
                  ? "lg:border-l"
                  : "",
                "flex items-baseline flex-wrap justify-between gap-y-2 gap-x-4 border-t border-gray-900/5 px-4 py-10 sm:px-6 lg:border-t-0 xl:px-8"
              )}
            >
              {isLoading ? (
                <StatsSkeleton />
              ) : (
                <>
                  <dt className="text-sm font-medium leading-6 text-gray-500">
                    {stat.name}
                  </dt>
                  <dd
                    className={classNames(
                      stat.changeType === "negative"
                        ? "text-rose-600"
                        : "text-green-500",
                      "font-medium flex items-center justify-center"
                    )}
                  >
                    <Icon icon={stat.change} />
                  </dd>
                  <dd className="w-full flex-none text-3xl font-medium leading-10 tracking-tight text-gray-900">
                    {stat.value}
                  </dd>
                </>
              )}
            </div>
          ))}
        </dl>
      </div>

      <div
        className="absolute left-0 top-full -z-10 mt-96 origin-top-left translate-y-40 -rotate-90 transform-gpu opacity-10 blur-3xl sm:left-1/2 sm:-ml-96 sm:-mt-10 sm:translate-y-0 sm:rotate-0 sm:transform-gpu sm:opacity-50"
        aria-hidden="true"
      >
        <div
          className="aspect-[1154/678] w-[72.125rem] bg-gradient-to-br from-[#9089FC] to-[#FF80B5]"
          style={{
            clipPath:
              "polygon(100% 38.5%, 82.6% 100%, 60.2% 37.7%, 52.4% 32.1%, 47.5% 41.8%, 45.2% 65.6%, 27.5% 23.4%, 0.1% 35.3%, 17.9% 0%, 27.7% 23.4%, 76.2% 2.5%, 74.2% 56%, 100% 38.5%)",
          }}
        />
      </div>
    </div>
  );
};

export default Stats;
