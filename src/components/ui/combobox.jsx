import { Check } from "lucide-react";
import * as React from "react";

import { cn } from "../../lib/utils";
import { Button } from "./button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "./command";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

const cities = [
  {
    value: "casablanca",
    label: "Casablanca",
  },
  {
    value: "marrakech",
    label: "Marrakech",
  },
  {
    value: "rabat",
    label: "Rabat",
  },
  {
    value: "fes",
    label: "Fes",
  },
  {
    value: "agadir",
    label: "Agadir",
  },
];

export function CitiesInput() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          role="combobox"
          aria-expanded={open}
          className={`w-full ${
            value ? "text-black" : "text-black/40"
          } justify-between rign outline-none text-lg font-light px-2 hover:bg-white hover:text-black/80`}
        >
          {value
            ? cities.find((framework) => framework.value === value)?.label
            : "Select a city"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput
            placeholder="Search a city"
            className="outline-none border-none focus:ring-0"
          />
          <CommandEmpty>No City found.</CommandEmpty>
          <CommandGroup>
            {cities.map((framework) => (
              <CommandItem
                key={framework.value}
                value={framework.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === framework.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {framework.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
