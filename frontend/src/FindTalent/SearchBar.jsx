import MultiInput from "../FindJobs/MultiInput";
import {Divider, Input, RangeSlider, useMantineTheme} from "@mantine/core"
import React,{useState } from "react"
import {searchFields} from "../assets/Data/TalentData";
import {IconUserCircle} from "@tabler/icons-react"
import {useDispatch} from "react-redux"
import {updateFilter} from "../Slice/FilterSlice";

const SearchBar = () => {
  const theme = useMantineTheme();
  const dispatch = useDispatch();
  const [value, setValue]  =  useState([0, 40]);
  const [name, setName] = useState('');

  const handleChange = (name, event) =>{
      if(name == "exp")dispatch(updateFilter({exp:event}));
      else{
        dispatch(updateFilter({name:event.target.value}));
        setName(event.target.value);
      }
  }
     
  return (
    <div className="flex px-5 py-8 items-center !text-mine-shaft-100  ">
      <div className="flex items-center">
        <div className="text-bright-sun-400 bg-mine-shaft-900 rounded-full p-2  ">
          <IconUserCircle size={20} />
        </div>
        <Input defaultValue={name} onChange={(e)=> handleChange("name", e)} className="[&_input]:!placeholder-mine-shaft-300" variant="unstyled" placeholder="Talent NAme" />
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
            Experience (Years)
            </div>
            <div>
              &#8377;{value[0]}  - &#8377;{value[1]} 
            </div>
          </div>
          <RangeSlider min={0} max={40} onChangeEnd={(e)=> handleChange("exp", e)}
              labelTransitionProps={{
                transition:'skew-down',
                duration: 150,
                timingFunction: 'linear',
              }}
              minRange={1}
          color={theme.colors.brightSun[4]} size="xs" value={value} onChange={setValue}/>
        </div>
      
    </div>
  )
}

export default SearchBar 
