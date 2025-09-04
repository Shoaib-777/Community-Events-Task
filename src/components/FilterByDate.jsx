import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { Calendar as CalendarIcon } from "lucide-react"; // lucide-react icon
import "react-datepicker/dist/react-datepicker.css";

export default function FilterByDate({ availableDates, selectedDate, onDateChange }) {
  const allowedDates = availableDates.map(d => new Date(d));

  return (
    <div className="flex flex-col gap-2 justify-center items-center">
      {/* <h2 className="text-sm md:text-lg font-medium text-gray-700 text-center">
        Select an available date
      </h2> */}
      <div className="relative w-64 rounded-xl px-2">
        <DatePicker
          selected={selectedDate}
          onChange={(d) => onDateChange(d)}
          filterDate={(d) =>
            allowedDates.some(
              (allowed) => d.toDateString() === allowed.toDateString()
            )
          }
          dateFormat="yyyy-MM-dd"
          placeholderText="Pick a date"
          className="w-full rounded-lg px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-400 font-medium border border-gray-300 shadow-sm min-h-[72px]"
          popperPlacement="bottom-start"
        />
        <CalendarIcon
          className="absolute right-6 top-1/2 -translate-y-1/2 text-blue-600 pointer-events-none"
          size={18}
        />
      </div>
    </div>
  );
}

