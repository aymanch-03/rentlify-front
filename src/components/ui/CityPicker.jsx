/* eslint-disable react/prop-types */
import { Icon } from "@iconify/react";
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
      <SelectTrigger className="w-full border-none shadow-none outline-none text-black/40 hover:text-black/80 transition-all focus:ring-0 px-2 text-lg font-light ">
        <SelectValue placeholder="Select a City" />
      </SelectTrigger>
      <SelectContent className="w-auto">
        <SelectGroup>
          <SelectItem value="casablanca">
            <div className="flex items-center gap-3">
              <Icon icon="solar:map-point-wave-line-duotone" />
              <p>Casablanca</p>
            </div>
          </SelectItem>
          <SelectItem value="marrakech">
            <div className="flex items-center gap-3">
              <Icon icon="solar:map-point-wave-line-duotone" />
              <p>Marrakech</p>
            </div>
          </SelectItem>
          <SelectItem value="rabat">
            <div className="flex items-center gap-3">
              <Icon icon="solar:map-point-wave-line-duotone" />
              <p>Rabat</p>
            </div>
          </SelectItem>
          <SelectItem value="agadir">
            <div className="flex items-center gap-3">
              <Icon icon="solar:map-point-wave-line-duotone" />
              <p>Agadir</p>
            </div>
          </SelectItem>
          <SelectItem value="fes">
            <div className="flex items-center gap-3">
              <Icon icon="solar:map-point-wave-line-duotone" />
              <p>Fes</p>
            </div>
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default CityPicker;