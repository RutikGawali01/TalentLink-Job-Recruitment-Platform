import MultiInput from "./MultiInput";
import { Button, RangeSlider, useMantineTheme, Collapse } from "@mantine/core";
import React, { useState } from "react";
import { dropdownData } from "../assets/Data/JobsData";
import { useDispatch } from "react-redux";
import { updateFilter } from "../Slice/FilterSlice";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";

const SearchBar = () => {
  const matches = useMediaQuery("(max-width: 550px)");

  const theme = useMantineTheme();
  const [value, setValue] = useState([1, 100]);
  const dispatch = useDispatch();
  const [opened, { toggle }] = useDisclosure(false);

  const handleChange = (event) => {
    dispatch(updateFilter({ salary: event }));
  };

  return (
    <div>
      <div className="flex justify-end">
        {matches && (
          <Button onClick={toggle} variant="filled" m={"xs"} radius={"lg"}>
            {opened ? "Close" : "Appply Filters"}
          </Button>
        )}
      </div>
      <Collapse in={opened || !matches}>
        <div className="flex flex-wrap items-center gap-4 px-5 py-6 bg-white rounded-2xl">
          {/* DROPDOWNS */}
          {dropdownData.map((dropdownItem, idx) => (
            <div
              key={idx}
              className="
                  w-[19%] 
                  max-xl:w-[23%]
                  max-lg:w-[30%]
                  max-md:w-[48%]
                  max-sm:w-full
                  flex items-center px-3 py-3 
                  bg-tertiary rounded-2xl "
            >
              <MultiInput {...dropdownItem} />
            </div>
          ))}

          {/* SALARY */}
          <div
            className="
      w-[19%] 
      max-xl:w-[23%]
      max-lg:w-[30%]
      max-md:w-[48%]
      max-sm:w-full
      flex flex-col justify-center 
      px-4 py-3
      bg-tertiary rounded-2xl
    "
          >
            <div className="flex justify-between text-xs mb-2">
              <span className="font-medium">Salary</span>
              <span className="text-gray-600">
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
      </Collapse>
    </div>
  );
};

export default SearchBar;
