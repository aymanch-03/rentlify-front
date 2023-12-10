import companyTwo from "../../assets/airbnb.png";
import companyOne from "../../assets/arkx.png";
import companyThree from "../../assets/bookingcom.svg";
import companyFour from "../../assets/tripadvisor.svg";

const Companies = () => {
  return (
    <div className=" flex justify-center gap-x-6 p-4">
      {" "}
      <div className="md:my-12 my-8">
        <p className="text-lg text-slate-900 text-center font-medium">
          Trusted by the world’s most innovative teams
        </p>
        <ul
          role="list"
          className="mt-8 place-items-center grid lg:grid-cols-4  md:grid-cols-2  grid-cols-1 sm:gap-y-10 md:gap-x-12 xl:gap-y-0"
        >
          {[
            { name: "Ark-x Academy", logo: companyOne, styles: "brightness-0" },
            {
              name: "Booking.com",
              logo: companyThree,
              styles: "brightness-0 pt-[8px]",
            },
            { name: "Airbnb", logo: companyTwo, styles: "brightness-0" },
            { name: "TripAdvisor", logo: companyFour, styles: "brightness-50" },
          ].map((company) => (
            <li key={company.name} className="grid">
              <img
                src={company.logo}
                alt={company.name}
                className={`aspect-[4/2] object-contain justify-self-center md:w-[190px] w-[170px] grayscale-100 saturate-0 ${company.styles}`}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Companies;
