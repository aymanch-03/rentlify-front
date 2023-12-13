/* eslint-disable react/prop-types */
import { Tab } from "@headlessui/react";
import clsx from "clsx";
import screenshotsBooking from "../../assets/booking.png";
import screenshotListing from "../../assets/listingManagement.png";
function bgSVG() {
  return (
    <svg
      aria-hidden="true"
      className="absolute inset-x-0 -z-10 top-0 h-[1000px] w-full fill-neutral-50 stroke-neutral-950/5 [mask-image:linear-gradient(to_bottom_left,white_40%,transparent_50%)]"
    >
      <rect
        width="100%"
        height="100%"
        fill="url(#:R1lda:)"
        strokeWidth="0"
      ></rect>
      <svg x="50%" y="-96" strokeWidth="0" className="overflow-visible">
        <path
          transform="translate(64 160)"
          d="M45.119 4.5a11.5 11.5 0 0 0-11.277 9.245l-25.6 128C6.82 148.861 12.262 155.5 19.52 155.5h63.366a11.5 11.5 0 0 0 11.277-9.245l25.6-128c1.423-7.116-4.02-13.755-11.277-13.755H45.119Z"
        ></path>
        <path
          transform="translate(128 320)"
          d="M45.119 4.5a11.5 11.5 0 0 0-11.277 9.245l-25.6 128C6.82 148.861 12.262 155.5 19.52 155.5h63.366a11.5 11.5 0 0 0 11.277-9.245l25.6-128c1.423-7.116-4.02-13.755-11.277-13.755H45.119Z"
        ></path>
        <path
          transform="translate(288 480)"
          d="M45.119 4.5a11.5 11.5 0 0 0-11.277 9.245l-25.6 128C6.82 148.861 12.262 155.5 19.52 155.5h63.366a11.5 11.5 0 0 0 11.277-9.245l25.6-128c1.423-7.116-4.02-13.755-11.277-13.755H45.119Z"
        ></path>
        <path
          transform="translate(512 320)"
          d="M45.119 4.5a11.5 11.5 0 0 0-11.277 9.245l-25.6 128C6.82 148.861 12.262 155.5 19.52 155.5h63.366a11.5 11.5 0 0 0 11.277-9.245l25.6-128c1.423-7.116-4.02-13.755-11.277-13.755H45.119Z"
        ></path>
        <path
          transform="translate(544 640)"
          d="M45.119 4.5a11.5 11.5 0 0 0-11.277 9.245l-25.6 128C6.82 148.861 12.262 155.5 19.52 155.5h63.366a11.5 11.5 0 0 0 11.277-9.245l25.6-128c1.423-7.116-4.02-13.755-11.277-13.755H45.119Z"
        ></path>
        <path
          transform="translate(320 800)"
          d="M45.119 4.5a11.5 11.5 0 0 0-11.277 9.245l-25.6 128C6.82 148.861 12.262 155.5 19.52 155.5h63.366a11.5 11.5 0 0 0 11.277-9.245l25.6-128c1.423-7.116-4.02-13.755-11.277-13.755H45.119Z"
        ></path>
      </svg>
      <defs>
        <pattern
          id=":R1lda:"
          width="96"
          height="480"
          x="50%"
          patternUnits="userSpaceOnUse"
          patternTransform="translate(0 -96)"
          // eslint-disable-next-line react/no-unknown-property
          fill="transparent"
        >
          <path d="M128 0 98.572 147.138A16 16 0 0 1 82.883 160H13.117a16 16 0 0 0-15.69 12.862l-26.855 134.276A16 16 0 0 1-45.117 320H-116M64-160 34.572-12.862A16 16 0 0 1 18.883 0h-69.766a16 16 0 0 0-15.69 12.862l-26.855 134.276A16 16 0 0 1-109.117 160H-180M192 160l-29.428 147.138A15.999 15.999 0 0 1 146.883 320H77.117a16 16 0 0 0-15.69 12.862L34.573 467.138A16 16 0 0 1 18.883 480H-52M-136 480h58.883a16 16 0 0 0 15.69-12.862l26.855-134.276A16 16 0 0 1-18.883 320h69.766a16 16 0 0 0 15.69-12.862l26.855-134.276A16 16 0 0 1 109.117 160H192M-72 640h58.883a16 16 0 0 0 15.69-12.862l26.855-134.276A16 16 0 0 1 45.117 480h69.766a15.999 15.999 0 0 0 15.689-12.862l26.856-134.276A15.999 15.999 0 0 1 173.117 320H256M-200 320h58.883a15.999 15.999 0 0 0 15.689-12.862l26.856-134.276A16 16 0 0 1-82.883 160h69.766a16 16 0 0 0 15.69-12.862L29.427 12.862A16 16 0 0 1 45.117 0H128"></path>
        </pattern>
      </defs>
    </svg>
  );
}
const features = [
  {
    name: "Booking",
    summary: "Experience the convenience of easy booking with Rentlify.",
    description:
      "Seamlessly book your next rental with Rentlify, where convenience meets simplicity for an effortless booking experience.",
    image: screenshotsBooking,
    icon: function ReportingIcon() {
      return (
        <>
          <g
            fill="none"
            stroke="#fff"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          >
            <path d="m12.636 15.262l-1.203 1.202c-1.23 1.232-1.846 1.847-2.508 1.702c-.662-.146-.963-.963-1.565-2.596l-2.007-5.45C4.152 6.861 3.55 5.232 4.39 4.392c.84-.84 2.47-.24 5.73.962l5.45 2.006c1.633.602 2.45.903 2.596 1.565c.145.662-.47 1.277-1.702 2.508l-1.202 1.203" />
            <path
              d="m12.636 15.262l3.938 3.938c.408.408.612.612.84.706c.303.126.643.126.947 0c.227-.094.431-.298.839-.706s.611-.612.706-.84a1.238 1.238 0 0 0 0-.946c-.095-.228-.298-.432-.706-.84l-3.938-3.938"
              opacity=".5"
            />
          </g>
        </>
      );
    },
  },
  {
    name: "Management",
    summary:
      "Simplify management with Rentlify's intuitive listing management feature.",
    description:
      "Simplify property management with Rentlify's centralized listing tool for seamless updates and efficient organization.",
    image: screenshotListing,
    icon: function UserIcon() {
      return (
        <>
          <g fill="none" stroke="#fff" strokeWidth="1.5">
            <path
              d="M16.755 2h-9.51c-1.159 0-1.738 0-2.206.163a3.046 3.046 0 0 0-1.881 1.936C3 4.581 3 5.177 3 6.37v14.004c0 .858.985 1.314 1.608.744a.946.946 0 0 1 1.284 0l.483.442a1.657 1.657 0 0 0 2.25 0a1.657 1.657 0 0 1 2.25 0a1.657 1.657 0 0 0 2.25 0a1.657 1.657 0 0 1 2.25 0a1.657 1.657 0 0 0 2.25 0l.483-.442a.946.946 0 0 1 1.284 0c.623.57 1.608.114 1.608-.744V6.37c0-1.193 0-1.79-.158-2.27a3.045 3.045 0 0 0-1.881-1.937C18.493 2 17.914 2 16.755 2Z"
              opacity=".5"
            />
            <path
              strokeLinecap="round"
              d="M10.5 11H17M7 11h.5M7 7.5h.5m-.5 7h.5m3-7H17m-6.5 7H17"
            />
          </g>
        </>
      );
    },
  },
  {
    name: "Unique",
    summary:
      "Discover your next rental with Rentlify's best places collection.",
    description:
      "Embark on a personalized home-finding journey with Rentlify's Best Places collection, ensuring not just a residence but an immersion in a community tailored to your lifestyle.",
    image: screenshotsBooking,
    icon: function InventoryIcon() {
      return (
        <>
          <g fill="none">
            <path
              fill="#fff"
              d="m9.963 5.72l.278.696l-.278-.697Zm1.087-1.133l.704.26l-.704-.26ZM9.115 9.26l.484-.573l-.484.573Zm.495-3.4l-.279-.696l.279.696Zm.515 5.084l-.749.046l.749-.046ZM9.41 9.51l-.484.573l.484-.573Zm.58.6l-.67.334l.67-.334Zm3.128 2.804l.416.624l-.416-.624Zm-2.97-1.576l.748-.046l-.748.046Zm4.817 1.119l.2-.723l-.2.723Zm-1.53.245l-.415-.624l.416.624Zm4.228-2.568l.726-.19l-.726.19Zm-2.33 2.425l-.2.723l.2-.723Zm2.462-4.393l-.639-.393l.639.393Zm-.231 1.587l-.726.19l.726-.19ZM16.469 4.76l-.047.748l.047-.748ZM18 7.835l.639.393L18 7.835Zm-3.295-3.833l.588-.466l-.588.466Zm1.386.735l.047-.748l-.047.748ZM14.46 3.696l-.588.465l.588-.465Zm-3.276.525l-.704-.26l.704.26ZM7.89 7.846a.75.75 0 1 0-.885-1.21l.885 1.21ZM4.25 18l-.741.118a.75.75 0 0 0 1.45.123L4.249 18Zm6.282-4.561a.75.75 0 0 0-.48-1.422l.48 1.422Zm3.342-9.278l.243.306l1.176-.93l-.243-.307l-1.176.931Zm2.17 1.325l.38.023l.093-1.497l-.38-.023l-.093 1.497Zm1.317 1.956l-.203.33l1.277.787l.204-.33l-1.278-.787Zm-.52 2.5l.099.38l1.451-.379l-.1-.381l-1.45.38Zm-1.306 1.893l-.368-.102l-.4 1.446l.367.102l.401-1.446Zm-2.513.242l-.318.212l.832 1.248l.318-.212l-.832-1.248Zm-2.124-.786l-.024-.393l-1.497.092l.024.393l1.497-.092ZM9.895 8.937l-.296-.25l-.968 1.145l.296.25l.968-1.145Zm-.007-2.38l.353-.141l-.557-1.393l-.353.14l.557 1.394Zm1.866-1.71l.135-.367l-1.408-.518l-.134.366l1.407.518Zm-1.513 1.569c.327-.13.706-.266.986-.557l-1.082-1.04c.009-.008.005.002-.063.036a5.96 5.96 0 0 1-.398.168l.557 1.393Zm.106-2.088a7.286 7.286 0 0 1-.162.417c-.035.075-.047.082-.04.074l1.082 1.04c.277-.288.402-.673.527-1.013l-1.407-.518Zm-.748 4.358c-.591-.5-.968-.82-1.199-1.082a.992.992 0 0 1-.17-.239c-.007-.016-.008-.022-.007-.02v.006l-1.484-.216c-.09.61.21 1.091.536 1.462c.321.363.802.767 1.356 1.235l.968-1.146ZM9.33 5.164c-.658.263-1.234.49-1.647.734c-.425.25-.855.62-.945 1.237l1.484.216s0 .005-.003.01l.007-.009a.888.888 0 0 1 .218-.162c.29-.17.737-.351 1.443-.633L9.33 5.164Zm1.542 5.734c-.022-.369-.033-.768-.21-1.123l-1.343.668l.005.015a.45.45 0 0 1 .015.08c.014.096.022.225.036.452l1.497-.092Zm-1.946-.816c.17.145.266.226.333.293c.03.03.045.047.053.057l.007.011l1.343-.668c-.178-.358-.49-.604-.768-.838l-.968 1.145Zm3.776 2.207c-.636.424-1.04.69-1.344.833c-.296.138-.292.06-.225.095l-.703 1.325c.562.298 1.12.145 1.562-.06c.433-.203.95-.55 1.542-.945l-.832-1.248ZM9.4 11.383c.045.736.083 1.37.181 1.849c.099.48.3 1.019.85 1.31l.703-1.325c.056.03-.013.057-.084-.288c-.072-.348-.104-.853-.153-1.638l-1.497.092Zm5.766.35c-.338-.093-.726-.218-1.125-.154l.238 1.481c-.016.003-.009-.004.067.01c.088.018.206.05.42.109l.4-1.446Zm-1.313 1.592c.184-.123.286-.19.365-.234c.067-.037.076-.033.06-.03l-.237-1.482c-.399.064-.728.303-1.02.498l.832 1.248Zm3.086-3.002c.198.76.325 1.25.365 1.603c.04.35-.034.345.01.3l1.081 1.04c.431-.449.455-1.024.4-1.51c-.056-.485-.219-1.1-.405-1.813l-1.451.38Zm-1.806 2.958c.686.19 1.286.358 1.76.415c.485.058 1.062.028 1.502-.43l-1.081-1.04c.052-.054.08.019-.243-.02c-.334-.04-.8-.167-1.537-.37l-.4 1.445Zm2.024-5.509c-.19.31-.41.64-.468 1.036l1.484.217s0-.004.004-.014a.61.61 0 0 1 .032-.07a6.21 6.21 0 0 1 .226-.382l-1.278-.787Zm1.133 1.79a6.731 6.731 0 0 1-.107-.44a.626.626 0 0 1-.01-.082v-.015l-1.484-.217c-.058.393.057.776.15 1.133l1.451-.38Zm-1.867-4.053c.759.048 1.24.08 1.568.151a.886.886 0 0 1 .257.086c.012.007.013.01.01.006l-.006-.009l1.342-.668c-.278-.559-.802-.775-1.284-.88c-.468-.102-1.087-.139-1.794-.183l-.093 1.497Zm2.215 2.72c.38-.618.71-1.152.902-1.598c.195-.454.33-1.003.054-1.556l-1.343.668l-.001-.005v.021a.994.994 0 0 1-.088.28c-.138.32-.396.744-.802 1.403l1.278.786Zm-4.522-3.762c.224.284.464.61.816.798l.703-1.325c.01.005-.003.002-.06-.058a6.527 6.527 0 0 1-.283-.346l-1.176.931Zm2.02-.478a5.963 5.963 0 0 1-.43-.035c-.074-.011-.081-.02-.07-.014l-.703 1.325c.357.19.76.199 1.11.22l.094-1.496ZM15.05 3.23c-.452-.572-.843-1.069-1.195-1.4c-.353-.333-.835-.662-1.461-.562l.237 1.481c-.08.013-.056-.065.195.173c.253.238.564.628 1.048 1.24l1.176-.932Zm-3.16 1.25c.27-.732.444-1.2.61-1.506c.165-.304.212-.238.131-.225l-.237-1.481c-.626.1-.981.564-1.213.99c-.23.425-.447 1.02-.699 1.704l1.408.518ZM7.004 6.635c-2.607 1.907-4.456 5.48-3.496 11.483l1.481-.236c-.89-5.566.837-8.527 2.9-10.036l-.885-1.21ZM4.959 18.241c.716-2.11 2.943-3.916 5.572-4.802l-.48-1.422c-2.884.973-5.592 3.03-6.513 5.742l1.42.482Z"
            />
            <path
              stroke="#fff"
              strokeLinejoin="round"
              d="M10.28 16s.634 1.39 1.414 1.87c.78.477 2.306.41 2.306.41s-1.39.633-1.87 1.413c-.478.78-.41 2.307-.41 2.307s-.634-1.39-1.414-1.87C9.527 19.654 8 19.72 8 19.72s1.39-.633 1.87-1.413c.478-.78.41-2.307.41-2.307Zm8.2-1s-.422.927-.942 1.246c-.52.319-1.538.274-1.538.274s.927.422 1.246.942c.319.52.274 1.538.274 1.538s.422-.927.942-1.246c.52-.319 1.538-.274 1.538-.274s-.927-.422-1.246-.942c-.319-.52-.274-1.538-.274-1.538Z"
              opacity=".5"
            />
          </g>
        </>
      );
    },
  },
];

function Feature({ feature, isActive, className, ...props }) {
  return (
    <div
      className={clsx(className, !isActive && "opacity-75 hover:opacity-100")}
      {...props}
    >
      <div
        className={clsx(
          "w-10 h-10 rounded-lg flex justify-center items-center",
          isActive ? "bg-primary" : "bg-slate-500"
        )}
      >
        <svg
          aria-hidden="true"
          className="h-7 w-7"
          fill="none"
          viewBox="0 0 24 24"
        >
          <feature.icon />
        </svg>
      </div>
      <h3
        className={clsx(
          "mt-6 text-sm font-medium !outline-none",
          isActive ? "text-primary  ring-0" : "text-slate-600"
        )}
      >
        {feature.name}
      </h3>
      <p className="mt-2 font-display text-xl text-slate-900">
        {feature.summary}
      </p>
      <p className="mt-4 text-sm text-slate-600">{feature.description}</p>
    </div>
  );
}

function FeaturesMobile() {
  return (
    <div className="-mx-4 mt-20 flex flex-col gap-y-10 overflow-hidden px-4 sm:-mx-6 sm:px-6 lg:hidden">
      {features.map((feature) => (
        <div key={feature.summary}>
          <Feature feature={feature} className="mx-auto max-w-2xl" isActive />
          <div className="relative mt-10 pb-10">
            <div className="absolute -inset-x-4 bottom-0 top-8 sm:-inset-x-6" />
            <div className="relative mx-auto w-[52.75rem] overflow-hidden  bg-transparent shadow-lg shadow-slate-900/5 ring-1 ring-slate-500/10">
              <img
                className="w-full rounded-xl"
                src={feature.image}
                alt=""
                sizes="52.75rem"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function FeaturesDesktop() {
  return (
    <Tab.Group as="div" className="hidden lg:mt-20 lg:block">
      {({ selectedIndex }) => (
        <>
          <Tab.List className="grid grid-cols-3 gap-x-8">
            {features.map((feature, featureIndex) => (
              <Feature
                key={feature.summary}
                feature={{
                  ...feature,
                  name: (
                    <Tab className="ui-not-focus-visible:outline-none outline-none">
                      <span className="absolute inset-0" />
                      {feature.name}
                    </Tab>
                  ),
                }}
                isActive={featureIndex === selectedIndex}
                className="relative"
              />
            ))}
          </Tab.List>
          <Tab.Panels className="relative mt-20 overflow-hidden rounded-2xl bg-slate-200 pl-[1.8rem] pr-[3.5rem] py-16 xl:px-16">
            <div className="-mx-5 flex">
              {features.map((feature, featureIndex) => (
                <Tab.Panel
                  static
                  key={feature.summary}
                  className={clsx(
                    "px-5 transition duration-500 ease-in-out ui-not-focus-visible:outline-none",
                    featureIndex !== selectedIndex && "opacity-60"
                  )}
                  style={{ transform: `translateX(-${selectedIndex * 100}%)` }}
                  aria-hidden={featureIndex !== selectedIndex}
                >
                  <div className="w-[52.75rem] overflow-hidden rounded-xl">
                    <img
                      className="w-full"
                      src={feature.image}
                      alt=""
                      sizes="52.75rem"
                    />
                  </div>
                </Tab.Panel>
              ))}
            </div>
            <div className="pointer-events-none absolute inset-0 rounded-4xl ring-1 ring-inset ring-slate-900/10" />
          </Tab.Panels>
        </>
      )}
    </Tab.Group>
  );
}

const PrimaryFeatures = () => {
  return (
    <section
      id="features"
      aria-label="Features for simplifying everyday business tasks"
      className="relative md:py-16 md:px-8 px-4 py-8"
    >
      <div className="absolute left-0 top-0 w-full h-12 bg-gradient-to-b from-white to-transparent"></div>
      {bgSVG()}
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto md:text-center">
          <h2 className="font-medium text-center text-3xl tracking-tight text-slate-900 sm:text-4xl">
            Journeying through{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-violet-900">
              {"Rentlify's"}
            </span>{" "}
            Rental Revolution
          </h2>
          <p className="mt-4 text-center max-w-2xl mx-auto text-lg tracking-tight text-slate-700">
            Because you’d probably be a little confused if we suggested you
            complicate your everyday business tasks instead.
          </p>
        </div>
        <FeaturesMobile />
        <FeaturesDesktop />
      </div>
    </section>
  );
};

export default PrimaryFeatures;
