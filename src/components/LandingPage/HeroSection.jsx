import CallToAction from "./CallToAction";
import Companies from "./Companies";
import SearchBooking from "./SearchBooking";

const HeroSection = () => {
  // const [formData, setFormData] = useState({
  //   location: "",
  //   check_in: "",
  //   check_out: "",
  //   guests: "",
  // });
  // useEffect(() => {
  //   setFormData({
  //     location: "",
  //     check_in: "",
  //     check_out: "",
  //     guests: "",
  //   });
  // }, []);
  // const handleCityChange = (value) => {
  //   setFormData({
  //     ...formData,
  //     location: value,
  //   });
  // };
  // console.log(formData);

  return (
    <div className="">
      <CallToAction />
      {/* <SearchBooking /> */}
      <Companies />
    </div>
  );
};

export default HeroSection;
