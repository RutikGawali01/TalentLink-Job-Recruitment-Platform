import {TextInput , Button, useMantineTheme} from "@mantine/core";
import fields from "../assets/Data/Profile";
import SelectInput from "./SelectInput";
import {MonthPickerInput} from "@mantine/dates"
import {useState} from "react"

const CertiInput = (props) => {
    const theme = useMantineTheme();
    const select = fields;
    const [issueDate,setIssueDate ] = useState();
  return (
    <div className='flex flex-col gap-3 '>
      <div className="text-lg font-semibold">Add Certificates</div>
      <div className=" flex gap-10 [&>*]:w-1/2">
        <TextInput label="Title" withAsterisk placeholder="Enter Title" />
        <SelectInput {...select[1]} />
      </div>
      <div className=" flex gap-10 [&>*]:w-1/2">
        {/* <MonthPickerInput withAsterisk maxDate={new Date()}  label="issued Date" placeholder="Pick date" value={issueDate} onChange={setIssueDate} /> */}
        <TextInput label="Certificate Id" withAsterisk placeholder="Enter ID" />
        
      </div>
      <div className="flex gap-5 " >
            <Button onClick={() => props.setEdit(false)} color={theme.colors.brightSun[4]} variant="outline">Save </Button>
            <Button onClick={() => props.setEdit(false)} color={theme.colors.brightSun[4]} variant="outline">Cancel  </Button>
        </div> 
    </div>
  )
}

export default CertiInput
