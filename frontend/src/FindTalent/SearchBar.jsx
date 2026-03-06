import MultiInput from "../FindJobs/MultiInput";
import {
  Divider,
  Input,
  RangeSlider,
  useMantineTheme,
  Button,
  Collapse,
} from "@mantine/core";
import React, { useState } from "react";
import { searchFields } from "../assets/Data/TalentData";
import { IconUserCircle } from "@tabler/icons-react";
import { useDispatch } from "react-redux";
import { updateFilter } from "../Slice/FilterSlice";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";

const SearchBar = () => {
  const matches = useMediaQuery("(max-width: 550px)");
  const theme = useMantineTheme();
  const dispatch = useDispatch();

  const [opened, { toggle }] = useDisclosure(false);
  const [value, setValue] = useState([0, 40]); // Experience range
  const [name, setName] = useState(""); // Talent name

  const handleChange = (type, event) => {
    if (type === "exp") {
      dispatch(updateFilter({ exp: event }));
    } else {
      const value = event.target.value;
      setName(value);
      dispatch(updateFilter({ name: value }));
    }
  };

  return (
    <div>
      {/* Toggle Button For Mobile */}
      <div className="flex justify-end">
        {matches && (
          <Button onClick={toggle} variant="filled" m="xs" radius="lg">
            {opened ? "Close" : "Apply Filters"}
          </Button>
        )}
      </div>

      {/* Collapse for mobile */}
      <Collapse in={opened || !matches}>
        <div className="flex flex-wrap items-stretch gap-4 px-5 py-6 bg-white rounded-2xl">
          
          {/* TALENT NAME */}
          <div
            className="
              w-[19%] 
              max-xl:w-[23%]
              max-lg:w-[30%]
              max-md:w-[48%]
              max-sm:w-full
              flex items-center gap-2 
              px-4 py-3
              bg-tertiary rounded-2xl
            "
          >
            <div className="text-[var(--blue-600)]">
              <IconUserCircle size={24} />
            </div>

            <Input
              value={name}
              onChange={(e) => handleChange("name", e)}
              variant="unstyled"
              placeholder="Talent Name"
              className="flex-1 [&_input]:!placeholder-gray-500"
            />
          </div>

          {/* DROPDOWNS */}
          {searchFields.map((item, idx) => (
            <div
              key={idx}
              className="
                w-[19%] 
                max-xl:w-[23%]
                max-lg:w-[30%]
                max-md:w-[48%]
                max-sm:w-full
                flex items-center 
                px-3 py-3 
                bg-tertiary rounded-2xl
              "
            >
              <MultiInput {...item} />
            </div>
          ))}

          {/* EXPERIENCE */}
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
              <span className="font-medium">Experience</span>
              <span className="text-gray-600">
                {value[0]} - {value[1]} Years
              </span>
            </div>

            <RangeSlider
              min={0}
              max={40}
              minRange={1}
              value={value}
              onChange={setValue}
              onChangeEnd={(e) => handleChange("exp", e)}
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