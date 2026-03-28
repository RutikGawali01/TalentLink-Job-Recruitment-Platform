import MultiInput from "../FindJobs/MultiInput";
import {
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
  const [value, setValue] = useState([0, 40]);
  const [name, setName] = useState("");

  const handleChange = (type, event) => {
    if (type === "exp") {
      dispatch(updateFilter({ exp: event }));
    } else {
      const value = event.target.value;
      setName(value);
      dispatch(updateFilter({ name: value }));
    }
  };

  /* shared pill style */
  const pill =
    "flex items-center gap-2 px-4 py-3 bg-blue-50/70 border border-blue-200 hover:border-blue-400 hover:bg-blue-50 rounded-xl transition-all duration-150";

  return (
    <div>
      {/* ── Mobile Toggle ── */}
      <div className="flex justify-end">
        {matches && (
          <Button
            onClick={toggle}
            color="brand"
            variant="light"
            radius="xl"
            size="sm"
            m="xs"
          >
            {opened ? "Close" : "Apply Filters"}
          </Button>
        )}
      </div>

      <Collapse in={opened || !matches}>
        <div className="flex flex-wrap items-stretch gap-3 px-1 py-1">

          {/* ── Talent Name ── */}
          <div className={`${pill} w-[19%] max-xl:w-[23%] max-lg:w-[30%] max-md:w-[48%] max-sm:w-full`}>
            <div className="text-blue-500 shrink-0">
              <IconUserCircle size={20} stroke={1.5} />
            </div>
            <Input
              value={name}
              onChange={(e) => handleChange("name", e)}
              variant="unstyled"
              placeholder="Talent Name"
              className="flex-1 [&_input]:!text-sm [&_input]:!text-gray-700 [&_input]:!placeholder-blue-300"
            />
          </div>

          {/* ── Dropdowns ── */}
          {searchFields.map((item, idx) => (
            <div
              key={idx}
              className={`${pill} w-[19%] max-xl:w-[23%] max-lg:w-[30%] max-md:w-[48%] max-sm:w-full`}
            >
              <MultiInput {...item} />
            </div>
          ))}

          {/* ── Experience Slider ── */}
          <div
            className={`flex flex-col justify-center w-[19%] max-xl:w-[23%] max-lg:w-[30%] max-md:w-[48%] max-sm:w-full
              px-4 py-3 bg-blue-50/70 border border-blue-200 hover:border-blue-400 hover:bg-blue-50 rounded-xl transition-all duration-150`}
          >
            <div className="flex justify-between text-xs mb-3">
              <span className="font-semibold text-gray-700">Experience</span>
              <span className="text-blue-600 font-semibold">
                {value[0]}–{value[1]} yrs
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