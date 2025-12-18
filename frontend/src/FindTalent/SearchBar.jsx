import MultiInput from "../FindJobs/MultiInput";
import {Divider, Input, RangeSlider, useMantineTheme} from "@mantine/core"
import React,{useState } from "react"
import {searchFields} from "../assets/Data/TalentData";
import {IconUserCircle} from "@tabler/icons-react"

const SearchBar = () => {
  const theme = useMantineTheme();
  const [value, setValue]  =  useState([1, 100]);
  
  return (
    <div className="flex px-5 py-8 items-center !text-mine-shaft-100  ">
      <div className="flex items-center">
        <div className="text-bright-sun-400 bg-mine-shaft-900 rounded-full p-2  ">
          <IconUserCircle size={20} />
        </div>
        <Input className="[&_input]:!placeholder-mine-shaft-300" variant="unstyled" placeholder="Talent NAme" />
      </div>

        {
          searchFields.map((item, idx) => (
            <React.Fragment key={idx}>
              <div className="w-1/5">
                <MultiInput {...item} />
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
