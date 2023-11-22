/* eslint-disable react/prop-types */
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
const CityPicker = ({ onValueChange }) => {
  return (
    <Select onValueChange={onValueChange}>
      <SelectTrigger className="w-full border-none px-0 pt-3 pb-2 shadow-none outline-none text-black/80 transition-all focus:ring-0 text-base font-medium">
        <SelectValue placeholder="Select a City" />
      </SelectTrigger>
      <SelectContent className="w-auto">
        <SelectGroup>
          <SelectItem value="casablanca">
            <div className="flex items-center gap-3">
              {" "}
              <p>Casablanca</p>
            </div>
          </SelectItem>
          <SelectItem value="marrakech">
            <div className="flex items-center gap-3">
              {" "}
              <p>Marrakech</p>
            </div>
          </SelectItem>
          <SelectItem value="rabat">
            <div className="flex items-center gap-3">
              {" "}
              <p>Rabat</p>
            </div>
          </SelectItem>
          <SelectItem value="agadir">
            <div className="flex items-center gap-3">
              {" "}
              <p>Agadir</p>
            </div>
          </SelectItem>
          <SelectItem value="fes">
            <div className="flex items-center gap-3">
              {" "}
              <p>Fes</p>
            </div>
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default CityPicker;
