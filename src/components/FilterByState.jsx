import React, { useState } from "react";
import { ChevronDown, ChevronUp, MapPin } from "lucide-react";


export default function FilterByState({ locations, selectedStates, onStateChange,showDropDown,setShowDropDown }) {
    
  const toggleState = (state) => {
    if (selectedStates.includes(state)) {
      onStateChange(selectedStates.filter((s) => s !== state));
    } else {
      onStateChange([...selectedStates, state]);
    }
  };

  return (
    <div className="w-full bg-white shadow-md rounded-xl p-4 relative">
      <h2 className="text-base md:text-lg font-semibold mb-3 flex items-center gap-2">
        <MapPin className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
        Select States
      </h2>
      <div className="absolute top-5 right-4 ">
        {showDropDown ?(
            <ChevronUp className=" cursor-pointer size-6" onClick={()=>{setShowDropDown(false)}}/>
        ):(
            <ChevronDown className=" cursor-pointer size-6" onClick={()=>{setShowDropDown(true)}}/>
        )}
      </div>

      <div className={`grid grid-cols-2 gap-2 max-h-[140px] overflow-y-auto ${showDropDown ? "block" : "hidden"}`}>
        {locations.map((state, index) => (
          <label
            key={index}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer transition-all ${
              selectedStates.includes(state)
                ? "border-blue-600 bg-blue-50"
                : "border-gray-300 hover:border-blue-400 hover:bg-gray-50"
            }`}
          >
            <input
              type="checkbox"
              value={state}
              checked={selectedStates.includes(state)}
              onChange={() => toggleState(state)}
              className="w-4 h-4 rounded-md text-blue-600 focus:ring-blue-500 cursor-pointer"
            />
            <span
              className={`text-sm md:text-base ${
                selectedStates.includes(state) ? "text-blue-600" : "text-gray-700"
              }`}
            >
              {state}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}

