import MultiInput from "../FindJobs/MultiInput";
import {
  Divider,
  Input,
  RangeSlider,
  useMantineTheme,
} from "@mantine/core";
import React, { useState } from "react";
import { searchFields } from "../assets/Data/TalentData";
import { IconUserCircle } from "@tabler/icons-react";
import { useDispatch } from "react-redux";
import { updateFilter } from "../Slice/FilterSlice";

const SearchBar = () => {
  const theme = useMantineTheme();
  const dispatch = useDispatch();

  const [value, setValue] = useState([0, 40]); // exp range
  const [name, setName] = useState(""); // talent name

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
    <div className="grid grid-cols-5 bg-white rounded-2xl px-4 py-4 gap-3">

      {/* TALENT NAME */}
      <div className="flex items-center gap-2 px-4 bg-tertiary rounded-2xl">
        <div className="text-[var(--blue-600)] p-2">
          <IconUserCircle size={25} />
        </div>
        <Input
          value={name}
          onChange={(e) => handleChange("name", e)}
          className="[&_input]:!placeholder-gray-500"
          variant="unstyled"
          placeholder="Talent Name"
        />
      </div>

      {/* DROPDOWNS */}
      {searchFields.map((item, idx) => (
        <div
          key={idx}
          className="flex items-center px-3 py-3 bg-tertiary rounded-2xl"
        >
          <MultiInput {...item} />
        </div>
      ))}

      {/* EXPERIENCE */}
      <div className="flex flex-col justify-center px-4 bg-tertiary rounded-2xl gap-2">
        <div className="flex justify-between text-xs">
          <span>Experience (Years)</span>
          <span>
            {value[0]} - {value[1]}
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
  );
};

export default SearchBar;
