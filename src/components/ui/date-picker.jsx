"use client";

import { format } from "date-fns";
import { useState } from "react";

import { cn } from "@/lib/utils";
import { Button } from "./button";
import { Calendar } from "./calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

export function DatePicker() {
  const [date, setDate] = useState();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"ghost"}
          className={cn(
            "w-full justify-start text-left group text-black/80 transition-all focus:ring-0 text-base font-medium px-0 hover:bg-white ",
            !date && "text-muted-foreground"
          )}
        >
          {date ? (
            format(date, "PPP")
          ) : (
            <span className="text-black/40 transition-all group-hover:text-black/80">
              Add a date
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
