import {TextInput , Button, useMantineTheme} from "@mantine/core";
import fields from "../assets/Data/Profile";
import SelectInput from "./SelectInput";
import {MonthPickerInput} from "@mantine/dates"
import {useState} from "react"
import {useForm, isNotEmpty} from "@mantine/form";
import {useSelector, useDispatch} from "react-redux"
import {changeProfile} from "../Slice/ProfileSlice"
import {successNotification} from "../Services/NotificationService";

const CertiInput = (props) => {
  const dispatch = useDispatch();
    const theme = useMantineTheme();
    const select = fields;
    const [issueDate,setIssueDate ] = useState();

    const profile  = useSelector((state)=> state.profile);
    const handleSave = ()=> {
        form.validate();
    if(!form.isValid())return;
      let certi =[...profile.certifications];
      certi.push(form.getValues());
      certi[certi.length-1].issueDate = certi[certi.length-1].issueDate.toISOString();
      let updatedProfile = {...profile, certifications: certi};
      props.setEdit(false);
       dispatch(changeProfile(updatedProfile));
    successNotification("Success", "certificate Added successfully");
    }

    const form = useForm({
    mode: 'controlled',
    validateInputOnChange: true,
    initialValues: {
      name: '',
      issuer: '',
      issueDate: new Date(),
      certificateId:'',
    },
    validate:{
      name: isNotEmpty("name is required"),
      issuer: isNotEmpty("issuer is required"),
      issueDate: isNotEmpty("issueDate is required"),
      certificateId: isNotEmpty("certificateId is required"),

    }

  })
  return (
    <div className='flex flex-col gap-3 '>
      <div className="text-lg font-semibold">Add Certificates</div>
      <div className=" flex gap-10 [&>*]:w-1/2">
        <TextInput {...form.getInputProps("name")}  label="Title" withAsterisk placeholder="Enter Title" />
        <SelectInput form={form} name="issuer"  {...select[1]} />
      </div>
      <div className=" flex gap-10 [&>*]:w-1/2">
        {/* <MonthPickerInput {...form.getInputProps("issueDate")} withAsterisk maxDate={new Date()}  label="issued Date" placeholder="Pick date"  onChange={setIssueDate} /> */}
        <TextInput {...form.getInputProps("certificateId")} label="Certificate Id" withAsterisk placeholder="Enter ID" />
        
      </div>
      <div className="flex gap-5 " >
            <Button onClick={handleSave} color="green.8" variant="outline">Save </Button>
            <Button onClick={() => props.setEdit(false)} color={theme.colors.brightSun[4]} variant="outline">Cancel  </Button>
        </div> 
    </div>
  )
}

export default CertiInput
