import MultiInput from "./MultiInput";
import { Divider, RangeSlider, useMantineTheme } from "@mantine/core";
import React, { useState } from "react";
import { dropdownData } from "../assets/Data/JobsData";
import { useDispatch } from "react-redux";
import { updateFilter } from "../Slice/FilterSlice";

const SearchBar = () => {
  const theme = useMantineTheme();
  const [value, setValue] = useState([1, 100]);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    dispatch(updateFilter({ salary: event }));
  };

  return (
    
    <div className="grid grid-cols-5 bg-white rounded-2xl px-4 py-4 gap-3
     ">

        {/* DROPDOWNS */}
        {dropdownData.map((dropdownItem, idx) => (
          <div
            key={idx}
            className="flex items-center px-3 py-3  bg-tertiary  rounded-2xl "
          >
            <MultiInput {...dropdownItem} />
          </div>
        ))}

        {/* SALARY */}
        <div className="flex flex-col justify-center px-4 bg-tertiary rounded-2xl">
          <div className="flex justify-between text-xs mb-2">
            <span>Salary</span>
            <span>
              ₹{value[0]} LPA - ₹{value[1]} LPA
            </span>
          </div>

          <RangeSlider
            value={value}
            onChange={setValue}
            min={0}
            max={100}
            onChangeEnd={handleChange}
            color="brand"
            size="xs"
            labelTransitionProps={{
              transition: "skew-down",
              duration: 150,
              timingFunction: "linear",
            }}
          />
        </div>

      </div>
  );
};

export default SearchBar;
