import SelectInput from "./SelectInput";
import fields from "../assets/Data/Profile";
import { Textarea,   } from "@mantine/core";
import { useState } from "react";
import {MonthPickerInput} from "@mantine/dates"
import { useMantineTheme, PasswordInput,Button, Anchor, Checkbox } from "@mantine/core";

const ExpInput = (props) => {
     const theme = useMantineTheme();
  const select = fields;
  const [desc, setDesc] = useState(`${props.description}`);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [checked , unChecked ] = useState(false)
  return (

    <div className="flex flex-col gap-3 ">
      <div className="text-lg font-semibold">{props.add ? "Add" :"Edit" } Experience</div>
      <div className=" flex gap-10 [&>*]:w-1/2">
        <SelectInput {...select[0]} />
        <SelectInput {...select[1]} />
      </div>
      <SelectInput {...select[2]} />{" "}
      <Textarea withAsterisk
        label="Summary"
        value={desc}
        autosize
        minRows={3}
        placeholder="Enter Summary "
        onChange={(event) => setDesc(event.currentTarget.value)}
      />
      <div className=" flex gap-10 [&>*]:w-1/2">
            {/* <MonthPickerInput withAsterisk maxDate={endDate || undefined}  label="Start Date" placeholder="Pick date" value={startDate} onChange={setStartDate} />
            <MonthPickerInput disabled={checked} withAsterisk minDate={startDate ||  undefined} maxDate={new Date()}   label="end Date" placeholder="Pick date" value={endDate} onChange={setEndDate} />
             */}
      </div>
        <Checkbox checked={checked} autoContrast label= "cuurently working here"/>
        <div className="flex gap-5 " >
            <Button onClick={() => props.setEdit(false)} color={theme.colors.brightSun[4]} variant="outline">Save </Button>
            <Button onClick={() => props.setEdit(false)} color={theme.colors.brightSun[4]} variant="outline">Cancel  </Button>
        </div> 
    </div>
  );
};

export default ExpInput;
