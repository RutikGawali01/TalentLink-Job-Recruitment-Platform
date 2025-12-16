import MultiInput from "./MultiInput";
import {Divider, RangeSlider, useMantineTheme} from "@mantine/core"
import React,{useState } from "react"
import {dropdownData} from "../assets/Data/JobsData";

const SearchBar = () => {
  const theme = useMantineTheme();
  const [value, setValue]  =  useState([1, 100]);
  
  return (
    <div className="flex px-5 py-8 gap-3 ">
        {
          dropdownData.map((dropdownItem, idx) => (
            <React.Fragment key={idx}>
              <div className="w-1/5">
                <MultiInput {...dropdownItem} />
              </div>
              <Divider orientation="vertical" />
            </React.Fragment>
          ))
        }

        <div className="w-1/5 [&_.mantine-Slider-label]:!translate-y-10 flex flex-col  gap-3">
          <div className="flex justify-between text-xs ">
            <div>
            Salary
            </div>
            <div>
              &#8377;{value[0]} LPA - &#8377;{value[1]} LPA
            </div>
          </div>
          <RangeSlider
              
              labelTransitionProps={{
                transition:'skew-down',
                duration: 150,
                timingFunction: 'linear',
              }}
          color={theme.colors.brightSun[4]} size="xs" value={value} onChange={setValue}/>
        </div>
      
    </div>
  )
}

export default SearchBar 
