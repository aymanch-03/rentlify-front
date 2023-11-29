import { useEffect, useState } from "react";
import CityPicker from "../ui/CityPicker";
import { Button } from "../ui/button";
import { DatePicker } from "../ui/date-picker";
import { Label } from "../ui/label";

const HeroSection = () => {
  const [formData, setFormData] = useState({
    location: "",
    check_in: "",
    check_out: "",
    guests: "",
  });
  useEffect(() => {
    setFormData({
      location: "",
      check_in: "",
      check_out: "",
      guests: "",
    });
  }, []);
  const handleCityChange = (value) => {
    setFormData({
      ...formData,
      location: value,
    });
  };

  return (
    <div className="h-[20rem] relative bg-cover bg-center bg-no-repeat bg-[url(src/assets/mainBg.jpg.webp)]">
      <form>
        <main className=" max-w-7xl grid min-h-[4rem] lg:grid-cols-5 md:grid-cols-2 grid-cols-1 w-full -translate-x-1/2 left-1/2 rounded-xl px-1 py-4 bg-white shadow-lg -bottom-4 absolute">
          <div className="px-1 border-r border-black/10">
            <Label htmlFor="location" className="font-medium text-lg px-2">
              Location
            </Label>
            <CityPicker onValueChange={handleCityChange} />
          </div>
          <div className="px-1 border-r border-black/10">
            <Label htmlFor="check_in" className="font-medium text-lg px-2">
              Check in
            </Label>
            <DatePicker />
          </div>
          <div className="px-1 border-r border-black/10">
            <Label htmlFor="check_out" className="font-medium text-lg px-2">
              Check out
            </Label>
            <DatePicker />
          </div>
          <div className="px-1 border-r border-black/10">
            <Label htmlFor="guests" className="font-medium text-lg px-2">
              Guests
            </Label>
            <DatePicker />
          </div>
          <div className="px-3 lg:col-span-1 md:col-span-2">
            <Button className="w-full h-full text-lg">Search</Button>
          </div>
        </main>
      </form>
    </div>
  );
};

export default HeroSection;
