import Header from "../layouts/Header";

export default function Content() {
  return (
    <>
      <Header />
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* <main className=''> */}
        <div className="sm:px-0">
          <h3 className="text-base font-semibold leading-9 text-gray-900">
            Applicant Information
          </h3>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
            Personal details and application.
          </p>
        </div>
        <div className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            <div className="py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Full name
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"></dd>
            </div>

            <div className="py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Email address
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"></dd>
            </div>

            <div className="py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                About
              </dt>
            </div>
          </dl>
        </div>
        {/* </main> */}
      </div>
    </>
  );
}
